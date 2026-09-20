# EMBTA Official Website: Master Content Update & Transition Guide

> **Official Association**: Eastern Maring Business & Traders Association (EMBTA)  
> **Official Motto**: *“Combine, Syndicate a Trust”*  
> **Live Site URL**: [https://embtaoffice-source.github.io/EMBTA/](https://embtaoffice-source.github.io/EMBTA/)  
> **GitHub Repository**: [https://github.com/embtaoffice-source/EMBTA](https://github.com/embtaoffice-source/EMBTA)

---

## 📑 PDF Checklists Generated

The following downloadable, print-ready PDF specification documents are located in this folder (`docs/content-requirements/`):

1. `00_EMBTA_MASTER_CONTENT_UPDATE_GUIDE.pdf` — Full association audit manual & technical transition guide.
2. `01_HOME_PAGE_CONTENT_REQUIREMENTS.pdf` — Home page headlines, ticker, wings, values, and metrics.
3. `02_ABOUT_PAGE_CONTENT_REQUIREMENTS.pdf` — Mission, vision, founding history, milestones, and objectives.
4. `03_EXECUTIVE_PROFILE_CONTENT_REQUIREMENTS.pdf` — 6 constitutional portfolios, photo specs, bios, and address.
5. `04_GALLERY_MEDIA_CONTENT_REQUIREMENTS.pdf` — Photos by sector, YouTube links, captions, and categories.
6. `05_NEWS_GAZETTE_CONTENT_REQUIREMENTS.pdf` — Official bulletins, circulars, press statements, and tags.
7. `06_CONTACT_DESK_CONTENT_REQUIREMENTS.pdf` — Secretariat address, phone, emails, hours, and form routing.

---

## 🛠️ Page-by-Page Requirements Summary

### 1. HOME PAGE (`/`)
* **File to Update**: `src/data/siteConfig.ts` & `src/pages/HomePage.tsx`
* **Details Needed from EMBTA**:
  - [ ] **Official Motto**: Confirm *“Combine, Syndicate a Trust”* or provide revised text.
  - [ ] **Gazette Announcement Bar**: Current alert/ticker message displayed across the top banner.
  - [ ] **Establishment Year**: Confirm foundational year (replaces `ESTD. 2022`).
  - [ ] **Key Statistics**: Actual count of registered merchants, fleet transporters, and operational trade nodes.
  - [ ] **4 Wings Scope**: Confirmation of titles, operational duties, and appointed wing leaders:
    - Traders & Merchants Guild
    - Transporters & Logistics Wing
    - Timber & Forestry Trade Wing
    - Enterprise & Services Wing
  - [ ] **Welcome Address**: Formal opening remarks from the Council.

---

### 2. ABOUT EMBTA (`/about`)
* **File to Update**: `src/data/aboutData.ts`
* **Details Needed from EMBTA**:
  - [ ] **Official Mission Statement**: Verbatim mission text from registered constitution (replaces `[Official Mission]`).
  - [ ] **Official Vision Statement**: Strategic vision roadmap for 2026–2030 (replaces `[Official Vision]`).
  - [ ] **Founding History**: Authentic historical account of how and why the association was created (replaces `[Association History]` and `[Founding Information]`).
  - [ ] **Timeline Milestones**: 3–5 milestone years and achievements (e.g. registration date, key government pacts).
  - [ ] **Statutory Objectives**: Formal list of constitutional objectives (replaces demo OBJ-01 through OBJ-05).

---

### 3. EXECUTIVE PROFILE (`/executive`)
* **File to Update**: `src/data/executiveData.ts` & photos in `public/assets/executives/`
* **Details Needed from EMBTA**:
  - [ ] **Tenure Term**: Confirm active term (e.g. `2024–2026` or `2026–2028`).
  - [ ] **Executive Council Message**: Signed presidential communiqué to members.
  - [ ] **6 Constitutional Portfolios**:
    1. **President**: Full legal name, bio, photo.
    2. **Vice President**: Full legal name, bio, photo.
    3. **General Secretary**: Full legal name, bio, photo.
    4. **Assistant General Secretary**: Full legal name, bio, photo.
    5. **Treasurer**: Full legal name, bio, photo.
    6. **Executive Member**: Full legal name, bio, photo.
* **Photo Standards**: 800 x 800 px square, neutral studio background, formal attire or formal traditional dress.

---

### 4. GALLERY (`/gallery`)
* **File to Update**: `src/data/galleryData.ts` & media in `public/assets/gallery/`
* **Details Needed from EMBTA**:
  - [ ] **YouTube Videos**: URLs of authentic association assemblies or speeches (replaces demo `aqz-KE-bpKQ`).
  - [ ] **Photographs**: Original high-resolution photographs categorized by:
    - Meetings & Conventions
    - Transport & Highway Logistics
    - Business, Trade Fairs & Markets
    - Community Welfare & Consultations
  - [ ] **Captions**: Title, date (Month Year), and brief description for each photograph.

---

### 5. NEWS & GAZETTE (`/news`)
* **File to Update**: `src/data/newsData.ts` & images in `public/assets/news/`
* **Details Needed from EMBTA**:
  - [ ] **Press Releases**: Authentic statements on freight agreements, checkpoint accords, or trade policies.
  - [ ] **Statutory Circulars**: Notices regarding annual membership registration and credentials.
  - [ ] **Event Announcements**: Details of upcoming general body meetings or workshops.
  - [ ] **Article Structure**: Headline, date, author, category, executive summary, body paragraphs, and banner image.

---

### 6. CONTACT DESK (`/contact`)
* **File to Update**: `src/data/siteConfig.ts` & `src/pages/ContactPage.tsx`
* **Details Needed from EMBTA**:
  - [ ] **Physical Address**: Exact secretariat office location (replaces `[Association Address]`).
  - [ ] **Official Telephone**: Primary office landline / mobile (replaces `[Official Phone Number]`).
  - [ ] **Official Email**: Primary and department email addresses (replaces `[Official Email Address]`).
  - [ ] **Chamber Hours**: Days and operating timings (replaces `[Office Hours]`).
  - [ ] **Emergency Transit Hotline**: 24/7 highway grievance emergency contact.
  - [ ] **Form Submission Target**: Email address or webhook to receive contact inquiries.

---

## 🚀 How to Apply Updates & Deploy

1. Collect the required information and images.
2. Edit the corresponding TypeScript file in `src/data/`.
3. Test locally:
   ```bash
   npm run build
   ```
4. Commit and push:
   ```bash
   git add .
   git commit -m "update: add authentic EMBTA content and executive profiles"
   git push origin main
   ```
5. GitHub Actions will automatically rebuild and deploy to GitHub Pages within 60 seconds!
