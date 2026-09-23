import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded images as static files
const uploadsDir = path.resolve(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) fs.mkdirSync(uploadsDir);
app.use('/uploads', express.static(uploadsDir));

// Multer storage config — saves files to server/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadsDir),
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) && allowed.test(file.mimetype);
    if (ok) cb(null, true);
    else cb(new Error('Only image files are allowed!'));
  },
});

// Initialize SQLite Database
const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err);
  } else {
    console.log('Connected to SQLite database.');
    db.serialize(() => {
      // Members table (kept for DB integrity)
      db.run(`CREATE TABLE IF NOT EXISTS members (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT, business TEXT, status TEXT, date TEXT
      )`);

      // Activity table
      db.run(`CREATE TABLE IF NOT EXISTS activity (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        action TEXT, target TEXT, time TEXT
      )`);

      // News table
      db.run(`CREATE TABLE IF NOT EXISTS news (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT, excerpt TEXT, content TEXT, date TEXT, author TEXT
      )`);

      // Gallery table
      db.run(`CREATE TABLE IF NOT EXISTS gallery (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        filename TEXT,
        caption TEXT,
        url TEXT,
        uploaded_at TEXT
      )`);

      // Site content table — stores editable page text
      db.run(`CREATE TABLE IF NOT EXISTS site_content (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        key TEXT UNIQUE,
        value TEXT,
        label TEXT,
        section TEXT
      )`, () => {
        // Seed default content if empty
        db.get("SELECT count(*) as count FROM site_content", (err, row) => {
          if (row && row.count === 0) {
            const defaults = [
              // General
              ['site_name',   'Eastern Maring Business & Traders Association', 'Organisation Name',   'General'],
              ['short_name',  'EMBTA',                                          'Short Name',          'General'],
              ['motto',       '"Combine, Syndicate a Trust"',                   'Motto',               'General'],
              ['headline',    'Connecting Businesses. Strengthening Communities.', 'Home Headline',    'General'],
              ['support_text','Building connections, encouraging collaboration and supporting business and community development.', 'Supporting Text', 'General'],
              // Contact
              ['phone',       '+91 98765 43210',                                'Phone Number',        'Contact'],
              ['email',       'embtaoffice@gmail.com',                          'Email Address',       'Contact'],
              ['office_hours','Monday – Friday, 9AM – 5PM',                    'Office Hours',        'Contact'],
              ['address',     'Rilram Centre (RRC), P.O. PALLEL, P.S. TENGNOUPAL, DISTRICT TENGNOUPAL, MANIPUR - 795135', 'Full Address', 'Contact'],
              // About
              ['about_subtitle', 'The Eastern Maring Business & Traders Association is the constitutional collective representing regional enterprises, commerce facilitators, and grassroots entrepreneurs.', 'About Page Subtitle', 'About'],
              ['who_we_are_lead', 'An apex institutional body established to combine commercial strength and syndicate mutual trust.', 'Who We Are Lead Text', 'About'],
              ['who_we_are_body', 'The Eastern Maring Business & Traders Association (EMBTA) serves as the primary representative forum for merchant guilds, logistics syndicates, small manufacturers, and retail operators in the region.', 'Who We Are Body Text', 'About'],
            ];
            const stmt = db.prepare("INSERT OR IGNORE INTO site_content (key, value, label, section) VALUES (?, ?, ?, ?)");
            defaults.forEach(([key, value, label, section]) => stmt.run(key, value, label, section));
            stmt.finalize();
          }
        });
      });

      // Seed activity if empty
      db.get("SELECT count(*) as count FROM activity", (err, row) => {
        if (row && row.count === 0) {
          const stmt = db.prepare("INSERT INTO activity (action, target, time) VALUES (?, ?, ?)");
          stmt.run("System initialised", "EMBTA Admin Portal", "Just now");
          stmt.finalize();
        }
      });
    });
  }
});

// ─── API Routes ───────────────────────────────────────────────

// Dashboard Stats (counts from real DB)
app.get('/api/stats', (req, res) => {
  db.get("SELECT count(*) as newsCount FROM news", (err, newsRow) => {
    db.get("SELECT count(*) as galleryCount FROM gallery", (err2, galleryRow) => {
      res.json([
        { label: 'Published News', value: String(newsRow?.newsCount ?? 0), change: '', positive: true },
        { label: 'Gallery Images', value: String(galleryRow?.galleryCount ?? 0), change: '', positive: true },
        { label: 'Active Sessions', value: '1', change: '', positive: true },
        { label: 'Website Status', value: 'Live', change: '✓', positive: true },
      ]);
    });
  });
});

// Activity Feed
app.get('/api/activity', (req, res) => {
  db.all("SELECT * FROM activity ORDER BY id DESC LIMIT 10", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// ── NEWS ──
app.get('/api/news', (req, res) => {
  db.all("SELECT * FROM news ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/news', (req, res) => {
  const { title, excerpt, content, date, author } = req.body;
  const stmt = db.prepare("INSERT INTO news (title, excerpt, content, date, author) VALUES (?, ?, ?, ?, ?)");
  stmt.run([title, excerpt, content, date, author], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    db.run("INSERT INTO activity (action, target, time) VALUES (?, ?, ?)", ["News published", title, "Just now"]);
    res.json({ id: this.lastID, title, excerpt, content, date, author });
  });
  stmt.finalize();
});

// ── GALLERY ──
app.get('/api/gallery', (req, res) => {
  db.all("SELECT * FROM gallery ORDER BY id DESC", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

app.post('/api/gallery', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });
  const { caption } = req.body;
  const url = `http://localhost:5000/uploads/${req.file.filename}`;
  const uploaded_at = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  db.run(
    "INSERT INTO gallery (filename, caption, url, uploaded_at) VALUES (?, ?, ?, ?)",
    [req.file.filename, caption || '', url, uploaded_at],
    function (err) {
      if (err) return res.status(400).json({ error: err.message });
      db.run("INSERT INTO activity (action, target, time) VALUES (?, ?, ?)", ["Image uploaded", caption || req.file.originalname, "Just now"]);
      res.json({ id: this.lastID, filename: req.file.filename, caption, url, uploaded_at });
    }
  );
});

app.delete('/api/gallery/:id', (req, res) => {
  db.get("SELECT * FROM gallery WHERE id = ?", [req.params.id], (err, row) => {
    if (!row) return res.status(404).json({ error: 'Not found' });
    const filePath = path.join(uploadsDir, row.filename);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
    db.run("DELETE FROM gallery WHERE id = ?", [req.params.id], (err2) => {
      if (err2) return res.status(400).json({ error: err2.message });
      res.json({ success: true });
    });
  });
});

// ── SITE CONTENT ──

// Get all content rows (grouped)
app.get('/api/content', (req, res) => {
  db.all("SELECT * FROM site_content ORDER BY section, id", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json(rows);
  });
});

// Update a content field by key
app.put('/api/content/:key', (req, res) => {
  const { value } = req.body;
  db.run("UPDATE site_content SET value = ? WHERE key = ?", [value, req.params.key], function (err) {
    if (err) return res.status(400).json({ error: err.message });
    db.run("INSERT INTO activity (action, target, time) VALUES (?, ?, ?)", ["Page content updated", req.params.key, "Just now"]);
    res.json({ success: true, key: req.params.key, value });
  });
});

// Helper: replace a single-quoted value on the exact field name line
function setField(fileText, fieldName, newValue) {
  const escaped = newValue.replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  const lines = fileText.split('\n');
  const updated = lines.map(line => {
    const trimmed = line.trimStart();
    // Match exact field name at start of trimmed line
    if (trimmed.startsWith(fieldName + ':') || trimmed.startsWith(fieldName + ' :')) {
      const indent = line.slice(0, line.length - trimmed.length);
      const hasComma = trimmed.trimEnd().endsWith(',');
      return `${indent}${fieldName}: '${escaped}'${hasComma ? ',' : ''}`;
    }
    return line;
  });
  return updated.join('\n');
}

// Write all content changes back to the actual source files
app.post('/api/content/apply', (req, res) => {
  db.all("SELECT key, value FROM site_content", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });

    const c = {};
    rows.forEach(r => { c[r.key] = r.value; });

    try {
      // ── Write siteConfig.ts ──
      const siteConfigSrc = path.resolve(__dirname, '../src/data/siteConfig.ts');
      let sc = fs.readFileSync(siteConfigSrc, 'utf8');

      if (c['site_name'])    sc = setField(sc, 'name', c['site_name']);
      if (c['short_name'])   sc = setField(sc, 'shortName', c['short_name']);
      if (c['motto'])        sc = setField(sc, 'motto', c['motto']);
      if (c['headline'])     sc = setField(sc, 'headline', c['headline']);
      if (c['support_text']) sc = setField(sc, 'supportingText', c['support_text']);
      if (c['phone'])        sc = setField(sc, 'phone', c['phone']);
      if (c['email']) {
        sc = setField(sc, 'email', c['email']);
        sc = setField(sc, 'formRecipientEmail', c['email']);
      }
      if (c['office_hours']) sc = setField(sc, 'officeHours', c['office_hours']);
      if (c['address'])      sc = setField(sc, 'address', c['address']);

      fs.writeFileSync(siteConfigSrc, sc, 'utf8');
      console.log('siteConfig.ts updated successfully');

      // ── Write aboutData.ts ──
      const aboutSrc = path.resolve(__dirname, '../src/data/aboutData.ts');
      let ab = fs.readFileSync(aboutSrc, 'utf8');

      if (c['about_subtitle'])  ab = setField(ab, 'subtitle', c['about_subtitle']);
      if (c['who_we_are_lead']) ab = setField(ab, 'lead', c['who_we_are_lead']);
      if (c['who_we_are_body']) ab = setField(ab, 'body', c['who_we_are_body']);

      fs.writeFileSync(aboutSrc, ab, 'utf8');
      console.log('aboutData.ts updated successfully');

      db.run("INSERT INTO activity (action, target, time) VALUES (?, ?, ?)",
        ["Site content applied", "siteConfig.ts & aboutData.ts", "Just now"]);

      res.json({ success: true, message: 'Changes written. Vite will hot-reload automatically.' });
    } catch (writeErr) {
      console.error('File write error:', writeErr);
      res.status(500).json({ error: writeErr.message });
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
