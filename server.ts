import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { createServer as createViteServer } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const PUBLIC_VIDEOS_DIR = path.join(process.cwd(), 'public', 'videos');
const META_FILE = path.join(PUBLIC_VIDEOS_DIR, 'videos-meta.json');

// Ensure videos directory exists
if (!fs.existsSync(PUBLIC_VIDEOS_DIR)) {
  fs.mkdirSync(PUBLIC_VIDEOS_DIR, { recursive: true });
}

function getVideosMeta(): Record<string, { url?: string; name?: string; updatedAt?: number }> {
  try {
    if (fs.existsSync(META_FILE)) {
      return JSON.parse(fs.readFileSync(META_FILE, 'utf-8'));
    }
  } catch (err) {
    console.warn('Failed to read videos-meta.json:', err);
  }
  return {};
}

function saveVideosMeta(meta: Record<string, { url?: string; name?: string; updatedAt?: number }>) {
  try {
    fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2), 'utf-8');
  } catch (err) {
    console.warn('Failed to save videos-meta.json:', err);
  }
}

async function startServer() {
  const app = express();
  app.use(express.json());

  // Static serving for public/videos with Range request support
  app.use('/videos', express.static(PUBLIC_VIDEOS_DIR, {
    acceptRanges: true,
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.mp4')) {
        res.setHeader('Content-Type', 'video/mp4');
      } else if (filePath.endsWith('.webm')) {
        res.setHeader('Content-Type', 'video/webm');
      }
    }
  }));

  // Fallback alias resolver for /videos/:file before 404
  app.get('/videos/:file', (req, res, next) => {
    try {
      const requestedFile = req.params.file;
      const parsed = path.parse(requestedFile);
      const meta = getVideosMeta();

      // Check if requestedFile is a tutorial ID (e.g. win-adobe-cc.mp4 -> recordedName adobe-windows.mp4)
      const recordedName = meta[parsed.name]?.name;
      if (recordedName) {
        const customPath = path.join(PUBLIC_VIDEOS_DIR, recordedName);
        if (fs.existsSync(customPath)) {
          return res.sendFile(customPath, {
            acceptRanges: true,
            headers: {
              'Content-Type': recordedName.endsWith('.webm') ? 'video/webm' : 'video/mp4',
            },
          });
        }
      }

      // Check if requestedFile is a recorded name that matches an ID
      for (const [id, m] of Object.entries(meta)) {
        if (m.name === requestedFile || m.name === parsed.base) {
          for (const ext of ['.mp4', '.webm', '.mov']) {
            const idPath = path.join(PUBLIC_VIDEOS_DIR, `${id}${ext}`);
            if (fs.existsSync(idPath)) {
              return res.sendFile(idPath, {
                acceptRanges: true,
                headers: {
                  'Content-Type': ext === '.webm' ? 'video/webm' : 'video/mp4',
                },
              });
            }
          }
        }
      }
    } catch (e) {
      console.warn('Video fallback lookup error:', e);
    }
    next();
  });

  // Explicit 404 handler for /videos so missing video files don't return index.html via Vite SPA fallback
  app.use('/videos', (req, res) => {
    res.status(404).json({ error: 'Video file not found' });
  });

  // GET /api/videos - returns list of all available server-hosted videos & links
  app.get('/api/videos', (req, res) => {
    try {
      const meta = getVideosMeta();
      const files = fs.existsSync(PUBLIC_VIDEOS_DIR) ? fs.readdirSync(PUBLIC_VIDEOS_DIR) : [];
      const fileIds = new Set<string>();

      for (const file of files) {
        if (file === 'videos-meta.json') continue;
        const parsed = path.parse(file);
        if (['.mp4', '.webm', '.mov', '.ogg'].includes(parsed.ext.toLowerCase())) {
          fileIds.add(parsed.name);
          // Check if this filename matches any meta entry's recorded name
          for (const [id, m] of Object.entries(meta)) {
            if (m.name === file || m.name === parsed.base) {
              fileIds.add(id);
            }
          }
        }
      }

      res.json({
        hostedVideos: Array.from(fileIds),
        videoLinks: meta,
      });
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  });

  // GET /api/videos/:id - streams a specific video file with byte-range support
  app.get('/api/videos/:id', (req, res) => {
    const cleanId = req.params.id.replace(/[^a-zA-Z0-9_-]/g, '');
    const meta = getVideosMeta();

    // Check if there is an external URL redirect
    if (meta[cleanId]?.url) {
      return res.redirect(meta[cleanId].url!);
    }

    for (const ext of ['.mp4', '.webm', '.mov', '.ogg']) {
      const filePath = path.join(PUBLIC_VIDEOS_DIR, `${cleanId}${ext}`);
      if (fs.existsSync(filePath)) {
        return res.sendFile(filePath, {
          acceptRanges: true,
          headers: {
            'Content-Type': ext === '.webm' ? 'video/webm' : 'video/mp4',
          },
        });
      }
    }

    // Also check if stored by its recorded meta filename (e.g. adobe-windows.mp4)
    const recordedName = meta[cleanId]?.name;
    if (recordedName) {
      const customPath = path.join(PUBLIC_VIDEOS_DIR, recordedName);
      if (fs.existsSync(customPath)) {
        return res.sendFile(customPath, {
          acceptRanges: true,
          headers: {
            'Content-Type': recordedName.endsWith('.webm') ? 'video/webm' : 'video/mp4',
          },
        });
      }
    }

    res.status(404).json({ error: 'Video file not found' });
  });

  // POST /api/videos/upload-chunk - chunked binary upload for reliably uploading files of any size
  const CHUNKS_DIR = path.join(PUBLIC_VIDEOS_DIR, '.upload-temp');
  if (!fs.existsSync(CHUNKS_DIR)) {
    fs.mkdirSync(CHUNKS_DIR, { recursive: true });
  }

  app.post('/api/videos/upload-chunk', (req, res) => {
    const id = req.query.id as string;
    const filename = (req.query.filename as string) || `${id}.mp4`;
    const chunkIndex = parseInt(req.query.chunkIndex as string, 10);
    const totalChunks = parseInt(req.query.totalChunks as string, 10);

    if (!id || isNaN(chunkIndex) || isNaN(totalChunks)) {
      return res.status(400).json({ error: 'Missing required chunk parameters' });
    }

    const cleanId = id.replace(/[^a-zA-Z0-9_-]/g, '');
    const tempFile = path.join(CHUNKS_DIR, `${cleanId}.part`);

    // If first chunk, remove any leftover partial file
    if (chunkIndex === 0 && fs.existsSync(tempFile)) {
      try {
        fs.unlinkSync(tempFile);
      } catch {}
    }

    const writeStream = fs.createWriteStream(tempFile, { flags: chunkIndex === 0 ? 'w' : 'a' });
    req.pipe(writeStream);

    writeStream.on('finish', () => {
      // If this is the last chunk, finalize the file
      if (chunkIndex === totalChunks - 1) {
        const ext = path.extname(filename) || '.mp4';
        const targetPath = path.join(PUBLIC_VIDEOS_DIR, `${cleanId}${ext}`);

        try {
          fs.renameSync(tempFile, targetPath);
        } catch {
          fs.copyFileSync(tempFile, targetPath);
          try {
            fs.unlinkSync(tempFile);
          } catch {}
        }

        // Record metadata
        const meta = getVideosMeta();
        meta[cleanId] = {
          name: filename,
          updatedAt: Date.now(),
        };
        saveVideosMeta(meta);

        // Also save friendly filename alias copy if different
        if (filename && filename !== `${cleanId}${ext}`) {
          const aliasPath = path.join(PUBLIC_VIDEOS_DIR, filename);
          try {
            fs.copyFileSync(targetPath, aliasPath);
          } catch (e) {
            console.warn('Could not copy alias file:', e);
          }
        }

        // Also copy to dist/videos if dist exists
        const distVideosDir = path.join(process.cwd(), 'dist', 'videos');
        if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
          if (!fs.existsSync(distVideosDir)) {
            fs.mkdirSync(distVideosDir, { recursive: true });
          }
          try {
            fs.copyFileSync(targetPath, path.join(distVideosDir, `${cleanId}${ext}`));
            if (filename && filename !== `${cleanId}${ext}`) {
              fs.copyFileSync(targetPath, path.join(distVideosDir, filename));
            }
          } catch {}
        }

        return res.json({
          success: true,
          completed: true,
          id: cleanId,
          url: `/api/videos/${cleanId}`,
          filename,
        });
      }

      // Intermediate chunk finished successfully
      res.json({
        success: true,
        completed: false,
        chunkIndex,
        totalChunks,
      });
    });

    writeStream.on('error', (err) => {
      console.error('Chunk upload error:', err);
      res.status(500).json({ error: err.message });
    });
  });

  // POST /api/videos/upload - binary stream upload for a video file (legacy / small file fallback)
  app.post('/api/videos/upload', (req, res) => {
    const id = req.query.id as string;
    const filename = (req.query.filename as string) || `${id}.mp4`;

    if (!id) {
      return res.status(400).json({ error: 'Missing tutorial id' });
    }

    const cleanId = id.replace(/[^a-zA-Z0-9_-]/g, '');
    const ext = path.extname(filename) || '.mp4';
    const targetPath = path.join(PUBLIC_VIDEOS_DIR, `${cleanId}${ext}`);

    const writeStream = fs.createWriteStream(targetPath);

    req.pipe(writeStream);

    writeStream.on('finish', () => {
      // Record metadata
      const meta = getVideosMeta();
      meta[cleanId] = {
        name: filename,
        updatedAt: Date.now(),
      };
      saveVideosMeta(meta);

      // Also save friendly filename alias copy if different from cleanId.ext
      if (filename && filename !== `${cleanId}${ext}`) {
        const aliasPath = path.join(PUBLIC_VIDEOS_DIR, filename);
        try {
          fs.copyFileSync(targetPath, aliasPath);
        } catch (e) {
          console.warn('Could not copy alias file:', e);
        }
      }

      // Also copy to dist/videos if dist exists
      const distVideosDir = path.join(process.cwd(), 'dist', 'videos');
      if (fs.existsSync(path.join(process.cwd(), 'dist'))) {
        if (!fs.existsSync(distVideosDir)) {
          fs.mkdirSync(distVideosDir, { recursive: true });
        }
        try {
          fs.copyFileSync(targetPath, path.join(distVideosDir, `${cleanId}${ext}`));
          if (filename && filename !== `${cleanId}${ext}`) {
            fs.copyFileSync(targetPath, path.join(distVideosDir, filename));
          }
        } catch {}
      }

      res.json({
        success: true,
        id: cleanId,
        url: `/api/videos/${cleanId}`,
        filename,
      });
    });

    writeStream.on('error', (err) => {
      console.error('Video upload error:', err);
      res.status(500).json({ error: err.message });
    });
  });

  // POST /api/videos/link - save an external video link (e.g. YouTube, Vimeo, CDN)
  app.post('/api/videos/link', (req, res) => {
    const { id, url, name } = req.body;
    if (!id || !url) {
      return res.status(400).json({ error: 'id and url required' });
    }
    const cleanId = id.replace(/[^a-zA-Z0-9_-]/g, '');
    const meta = getVideosMeta();
    meta[cleanId] = {
      url,
      name: name || 'External Video Link',
      updatedAt: Date.now(),
    };
    saveVideosMeta(meta);
    res.json({ success: true, id: cleanId, meta: meta[cleanId] });
  });

  // DELETE /api/videos/:id - delete a hosted video
  app.delete('/api/videos/:id', (req, res) => {
    const cleanId = req.params.id.replace(/[^a-zA-Z0-9_-]/g, '');
    let deleted = false;

    for (const ext of ['.mp4', '.webm', '.mov', '.ogg']) {
      const filePath = path.join(PUBLIC_VIDEOS_DIR, `${cleanId}${ext}`);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        deleted = true;
      }
    }

    const meta = getVideosMeta();
    if (meta[cleanId]) {
      delete meta[cleanId];
      saveVideosMeta(meta);
      deleted = true;
    }

    res.json({ success: true, deleted });
  });

  // Health check endpoint
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', serverTime: new Date().toISOString() });
  });

  // Vite middleware for development vs static production serve
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
