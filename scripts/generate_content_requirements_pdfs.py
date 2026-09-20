import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, Image, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas

LOGO_PATH = os.path.abspath("public/assets/embta-logo.png")
OUTPUT_DIR = os.path.abspath("docs/content-requirements")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Custom Institutional Palette
NAVY_PRIMARY = colors.HexColor("#00152a")
NAVY_LIGHT = colors.HexColor("#102a43")
EMBTA_GREEN = colors.HexColor("#1b873f")
EMBTA_GREEN_LIGHT = colors.HexColor("#24a14d")
EMBTA_RED = colors.HexColor("#c92a2a")
SLATE_TEXT = colors.HexColor("#243342")
BG_ALT_ROW = colors.HexColor("#f4f8fc")
BORDER_COLOR = colors.HexColor("#cbd5e1")

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super(NumberedCanvas, self).__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_header_footer(num_pages)
            super(NumberedCanvas, self).showPage()
        super(NumberedCanvas, self).save()

    def draw_header_footer(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748b"))

        # Running Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 750, "EMBTA Official Portal — Content Transition & Update Guide")
            self.setStrokeColor(BORDER_COLOR)
            self.setLineWidth(0.5)
            self.line(54, 744, 558, 744)

        # Running Footer
        self.setStrokeColor(BORDER_COLOR)
        self.setLineWidth(0.5)
        self.line(54, 45, 558, 45)
        self.drawString(54, 32, "© 2026 Eastern Maring Business & Traders Association. All rights reserved.")
        self.drawRightString(558, 32, f"Page {self._pageNumber} of {page_count}")
        self.restoreState()

def build_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        name='DocTitle',
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        textColor=NAVY_PRIMARY,
        spaceAfter=4
    ))
    styles.add(ParagraphStyle(
        name='DocSubtitle',
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16,
        textColor=EMBTA_GREEN,
        spaceAfter=12
    ))
    styles.add(ParagraphStyle(
        name='SectionH1',
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=NAVY_LIGHT,
        spaceBefore=14,
        spaceAfter=6,
        keepWithNext=True
    ))
    styles.add(ParagraphStyle(
        name='BodyNorm',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=SLATE_TEXT,
        spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        name='TableHead',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=colors.white
    ))
    styles.add(ParagraphStyle(
        name='TableCell',
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=SLATE_TEXT
    ))
    styles.add(ParagraphStyle(
        name='TableCellBold',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=NAVY_PRIMARY
    ))
    styles.add(ParagraphStyle(
        name='AlertBox',
        fontName='Helvetica-Oblique',
        fontSize=8.5,
        leading=12,
        textColor=colors.HexColor("#7f1d1d")
    ))
    return styles

def create_header_block(title, subtitle, page_badge="OFFICIAL BRIEFING"):
    styles = build_styles()
    header_data = []

    logo_img = None
    if os.path.exists(LOGO_PATH):
        try:
            logo_img = Image(LOGO_PATH, width=55, height=55)
        except Exception:
            logo_img = None

    text_cell = [
        Paragraph(f"<b>EASTERN MARING BUSINESS & TRADERS ASSOCIATION (EMBTA)</b>", ParagraphStyle('SubHeader', fontName='Helvetica-Bold', fontSize=8.5, textColor=EMBTA_GREEN)),
        Paragraph(title, styles['DocTitle']),
        Paragraph(subtitle, styles['DocSubtitle']),
    ]

    if logo_img:
        t = Table([[logo_img, text_cell]], colWidths=[65, 439])
        t.setStyle(TableStyle([
            ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
            ('LEFTPADDING', (0,0), (-1,-1), 0),
            ('RIGHTPADDING', (0,0), (-1,-1), 0),
            ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ]))
        return t
    else:
        return text_cell

def create_table(header_cols, rows_data, col_widths):
    styles = build_styles()
    data = []
    
    # Header row
    h_row = [Paragraph(col, styles['TableHead']) for col in header_cols]
    data.append(h_row)

    # Content rows
    for row in rows_data:
        r_row = []
        for i, cell in enumerate(row):
            if i == 0:
                r_row.append(Paragraph(cell, styles['TableCellBold']))
            else:
                r_row.append(Paragraph(cell, styles['TableCell']))
        data.append(r_row)

    t = Table(data, colWidths=col_widths, repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), NAVY_PRIMARY),
        ('ALIGN', (0,0), (-1,-1), 'LEFT'),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
        ('GRID', (0,0), (-1,-1), 0.5, BORDER_COLOR),
        ('ROWBACKGROUNDS', (0,1), (-1,-1), [colors.white, BG_ALT_ROW]),
    ]))
    return t

# -------------------------------------------------------------
# 1. HOME PAGE PDF
# -------------------------------------------------------------
def generate_home_pdf():
    pdf_path = os.path.join(OUTPUT_DIR, "01_HOME_PAGE_CONTENT_REQUIREMENTS.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = build_styles()
    story = []

    story.append(create_header_block("Home Page Content Requirements", "Route: / — Digital Portal Gateway & Business Network Showcase"))
    story.append(HRFlowable(width="100%", thickness=1.5, color=EMBTA_GREEN, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("1. Executive Overview", styles['SectionH1']))
    story.append(Paragraph(
        "The Home Page is the primary public entry point of the EMBTA digital portal. It introduces the association, highlights the 4 operational wings, displays institutional core values, and features dynamic previews of news bulletins and media gallery assets. All demo text and metric placeholders must be replaced with authorized data.",
        styles['BodyNorm']
    ))

    story.append(Paragraph("2. Required Details Checklist & File Mapping", styles['SectionH1']))
    
    headers = ["Item to Provide", "Current Code Placeholder", "Required Real Information", "File to Update", "Status"]
    rows = [
        [
            "Official Motto & Slogan",
            '"Combine, Syndicate a Trust"',
            "Confirm or replace with the official ratified motto of the association.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
        [
            "Gazette Ticker Announcement",
            "Welcome to the official digital portal...",
            "High-priority alert / announcement banner text displayed at top of portal.",
            "src/pages/HomePage.tsx",
            "[  ] Pending"
        ],
        [
            "Foundational Year (ESTD)",
            "ESTD. 2022 / [Established Year]",
            "Exact year of official incorporation/formal inauguration.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
        [
            "Hero Headline & Narrative",
            '"Connecting Businesses. Strengthening Communities."',
            "Authoritative introductory summary paragraph describing EMBTA's mission and scope.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
        [
            "Key Statistics & Metrics",
            "4 Key Wings, Regional Apex, 2022",
            "Verified operational metrics: e.g. Number of registered merchant members, fleet vehicles, or active market hubs.",
            "src/pages/HomePage.tsx",
            "[  ] Pending"
        ],
        [
            "4 Operational Wings Details",
            "TMG, TLW, TFW, ESW",
            "Confirm or update titles, descriptions, and designated wing convenors/coordinators.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
        [
            "Welcome to EMBTA Address",
            "General narrative",
            "Official statement from the President / Executive Council welcoming visitors.",
            "src/pages/HomePage.tsx",
            "[  ] Pending"
        ],
        [
            "4 Institutional Core Values",
            "Trust, Unity, Advocacy, Development",
            "Formal confirmation of the 4 constitutional pillars of association practice.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
    ]
    story.append(create_table(headers, rows, [95, 95, 155, 105, 54]))

    story.append(Spacer(1, 14))
    story.append(Paragraph("3. Technical Instruction for Webmaster", styles['SectionH1']))
    story.append(Paragraph(
        "Open <code>src/data/siteConfig.ts</code> and update the respective string properties. For structural updates to the hero metric counters, modify the metric card elements in <code>src/pages/HomePage.tsx</code>.",
        styles['BodyNorm']
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {pdf_path}")

# -------------------------------------------------------------
# 2. ABOUT EMBTA PDF
# -------------------------------------------------------------
def generate_about_pdf():
    pdf_path = os.path.join(OUTPUT_DIR, "02_ABOUT_PAGE_CONTENT_REQUIREMENTS.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = build_styles()
    story = []

    story.append(create_header_block("About EMBTA Content Requirements", "Route: /about — History, Mission, Vision, Charter & Objectives"))
    story.append(HRFlowable(width="100%", thickness=1.5, color=EMBTA_GREEN, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("1. Executive Overview", styles['SectionH1']))
    story.append(Paragraph(
        "The About page establishes legal standing, historical context, constitutional mission, and strategic objectives. Every section currently uses official placeholders ([Official Mission], [Official Vision], [Association History], [Founding Information]) to prevent fabrication.",
        styles['BodyNorm']
    ))

    story.append(Paragraph("2. Required Details Checklist & File Mapping", styles['SectionH1']))
    headers = ["Section", "Current Placeholder", "Required Information from EMBTA", "File to Update", "Status"]
    rows = [
        [
            "Constitutional Mission",
            "[Official Mission]",
            "Exact, verbatim mission statement ratified in the EMBTA constitution/charter.",
            "src/data/aboutData.ts",
            "[  ] Pending"
        ],
        [
            "Strategic Vision",
            "[Official Vision]",
            "Official long-term vision statement (e.g. Vision 2026–2030 roadmap).",
            "src/data/aboutData.ts",
            "[  ] Pending"
        ],
        [
            "Association Founding History",
            "[Association History], [Founding Information]",
            "Historical narrative detailing how and why EMBTA was founded, key founding elders/leaders, and foundational conventions.",
            "src/data/aboutData.ts",
            "[  ] Pending"
        ],
        [
            "Historical Milestones (Timeline)",
            "[Established Year], Phase II, Phase III",
            "Chronological list of milestone years and achievements: e.g. statutory registration date, freight agreements, trade corridor expansions.",
            "src/data/aboutData.ts",
            "[  ] Pending"
        ],
        [
            "Statutory Purpose",
            "4 Demo Purpose Cards",
            "Review and replace demo tags (Business Connection, Collaboration, Community Engagement, Sustainable Growth) with official charter mandates.",
            "src/data/aboutData.ts",
            "[  ] Pending"
        ],
        [
            "Formal Objectives (OBJ-01 to 05)",
            "5 Demo Objectives",
            "Specific constitutional objectives from the bylaws (e.g. dispute arbitration protocols, fair pricing standards, micro-finance liaison).",
            "src/data/aboutData.ts",
            "[  ] Pending"
        ],
        [
            "Statutory Registration Number",
            "EMBTA/ADM-2026",
            "Official government societies/trade association registration certificate number.",
            "src/data/aboutData.ts",
            "[  ] Pending"
        ],
    ]
    story.append(create_table(headers, rows, [95, 95, 155, 105, 54]))

    story.append(Spacer(1, 14))
    story.append(Paragraph("3. Technical Instruction for Webmaster", styles['SectionH1']))
    story.append(Paragraph(
        "Edit <code>src/data/aboutData.ts</code>. All values under <code>mission.content</code>, <code>vision.content</code>, <code>background.milestones</code>, and <code>objectives</code> are centralized in this single TypeScript data file.",
        styles['BodyNorm']
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {pdf_path}")

# -------------------------------------------------------------
# 3. EXECUTIVE PROFILE PDF
# -------------------------------------------------------------
def generate_executive_pdf():
    pdf_path = os.path.join(OUTPUT_DIR, "03_EXECUTIVE_PROFILE_CONTENT_REQUIREMENTS.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = build_styles()
    story = []

    story.append(create_header_block("Executive Profile Content Requirements", "Route: /executive — Constitutional Directorate & Leadership Directory"))
    story.append(HRFlowable(width="100%", thickness=1.5, color=EMBTA_GREEN, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("1. Executive Overview", styles['SectionH1']))
    story.append(Paragraph(
        "The Executive Profile page showcases the governing directorate of EMBTA across 6 constitutional portfolios. In accordance with strict guidelines, no executive names or biographies have been fabricated.",
        styles['BodyNorm']
    ))

    story.append(Paragraph("2. Required Details Checklist & File Mapping", styles['SectionH1']))
    headers = ["Constitutional Role", "Current Placeholder", "Required Details Needed", "File to Update", "Status"]
    rows = [
        [
            "President",
            "[Name], [Biography]",
            "Full legal name, high-resolution portrait photograph, official biography, tenured term, and key oversight areas.",
            "src/data/executiveData.ts",
            "[  ] Pending"
        ],
        [
            "Vice President",
            "[Name], [Biography]",
            "Full legal name, official portrait, biography, operational wing coordination responsibilities.",
            "src/data/executiveData.ts",
            "[  ] Pending"
        ],
        [
            "General Secretary",
            "[Name], [Biography]",
            "Full legal name, official portrait, biography, secretariat administration and official notice responsibilities.",
            "src/data/executiveData.ts",
            "[  ] Pending"
        ],
        [
            "Assistant General Secretary",
            "[Name], [Biography]",
            "Full legal name, official portrait, biography, membership registry and documentation roles.",
            "src/data/executiveData.ts",
            "[  ] Pending"
        ],
        [
            "Treasurer",
            "[Name], [Biography]",
            "Full legal name, official portrait, biography, fiscal audit and subscription custody duties.",
            "src/data/executiveData.ts",
            "[  ] Pending"
        ],
        [
            "Executive Member",
            "[Name], [Biography]",
            "Full legal name, official portrait, biography, community outreach and grassroots merchant liaison duties.",
            "src/data/executiveData.ts",
            "[  ] Pending"
        ],
        [
            "Executive Council Communique",
            "Sample address",
            "Official formal address / message signed by the President & General Secretary to the general membership.",
            "src/data/executiveData.ts",
            "[  ] Pending"
        ],
    ]
    story.append(create_table(headers, rows, [95, 95, 155, 105, 54]))

    story.append(Spacer(1, 14))
    story.append(Paragraph("3. Photo Specifications for Executives", styles['SectionH1']))
    story.append(Paragraph(
        "• <b>Dimensions:</b> 800 x 800 px (square, 1:1 aspect ratio)<br/>"
        "• <b>Format:</b> PNG or high-quality JPG<br/>"
        "• <b>Style:</b> Professional studio portrait, sharp formal business attire or formal traditional Maring cultural dress on neutral background.<br/>"
        "• <b>Storage Location:</b> Place images into <code>public/assets/executives/</code> (e.g. <code>president.png</code>, <code>general-secretary.png</code>).",
        styles['BodyNorm']
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {pdf_path}")

# -------------------------------------------------------------
# 4. GALLERY MEDIA PDF
# -------------------------------------------------------------
def generate_gallery_pdf():
    pdf_path = os.path.join(OUTPUT_DIR, "04_GALLERY_MEDIA_CONTENT_REQUIREMENTS.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = build_styles()
    story = []

    story.append(create_header_block("Gallery Media Content Requirements", "Route: /gallery — Public Information Media Wall & Video Streams"))
    story.append(HRFlowable(width="100%", thickness=1.5, color=EMBTA_GREEN, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("1. Executive Overview", styles['SectionH1']))
    story.append(Paragraph(
        "The Media Gallery houses high-resolution photographic and video documentation of association summits, highway inspections, guild meetings, and community townhalls. It currently uses labeled sample photos and a demo YouTube embed (aqz-KE-bpKQ).",
        styles['BodyNorm']
    ))

    story.append(Paragraph("2. Required Details Checklist & File Mapping", styles['SectionH1']))
    headers = ["Media Category", "Current State", "Real Media Assets Needed", "File to Update", "Status"]
    rows = [
        [
            "YouTube Video Embeds",
            "Demo video (aqz-KE-bpKQ)",
            "Official YouTube video URL(s) of association general meetings, presidential addresses, or symposium recordings.",
            "src/data/galleryData.ts",
            "[  ] Pending"
        ],
        [
            "Meetings & Assemblies",
            "Demo stock images",
            "Original photos of executive council meetings, stakeholder roundtables, and tripartite summits with transport officers.",
            "src/data/galleryData.ts",
            "[  ] Pending"
        ],
        [
            "Highway & Transport Operations",
            "Demo stock images",
            "Original photos of cargo checkpoints, fleet vehicle inspections, and transport wing logistics operations.",
            "src/data/galleryData.ts",
            "[  ] Pending"
        ],
        [
            "Business & Market Fairs",
            "Demo stock images",
            "Original photos of local market stalls, timber depots, merchandise expos, and vendor capacity-building workshops.",
            "src/data/galleryData.ts",
            "[  ] Pending"
        ],
        [
            "Community Outreach",
            "Demo stock images",
            "Original photos of village elder consultations, public welfare handovers, and community development projects.",
            "src/data/galleryData.ts",
            "[  ] Pending"
        ],
        [
            "Media Metadata",
            "Sample dates/captions",
            "Exact event date (Month, Year), official descriptive caption, and secretariat clearance for each media item.",
            "src/data/galleryData.ts",
            "[  ] Pending"
        ],
    ]
    story.append(create_table(headers, rows, [95, 95, 155, 105, 54]))

    story.append(Spacer(1, 14))
    story.append(Paragraph("3. Technical Instruction for Adding Gallery Items", styles['SectionH1']))
    story.append(Paragraph(
        "Save real photo files into <code>public/assets/gallery/</code>. Then open <code>src/data/galleryData.ts</code> and add or update entries in the <code>galleryData</code> array specifying <code>title</code>, <code>category</code>, <code>date</code>, <code>url</code>, and <code>description</code>.",
        styles['BodyNorm']
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {pdf_path}")

# -------------------------------------------------------------
# 5. NEWS & GAZETTE PDF
# -------------------------------------------------------------
def generate_news_pdf():
    pdf_path = os.path.join(OUTPUT_DIR, "05_NEWS_GAZETTE_CONTENT_REQUIREMENTS.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = build_styles()
    story = []

    story.append(create_header_block("News & Gazette Content Requirements", "Route: /news & /news/:slug — Public Announcements & Bulletins"))
    story.append(HRFlowable(width="100%", thickness=1.5, color=EMBTA_GREEN, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("1. Executive Overview", styles['SectionH1']))
    story.append(Paragraph(
        "The News & Gazette section publishes official communiques, regulatory circulars, market updates, and press releases. All current 5 articles are clearly designated as demo templates.",
        styles['BodyNorm']
    ))

    story.append(Paragraph("2. Required Details Checklist & File Mapping", styles['SectionH1']))
    headers = ["Bulletin Type", "Current State", "Real News Content Needed", "File to Update", "Status"]
    rows = [
        [
            "Official Gazette Bulletins",
            "Demo accord story",
            "Authentic press releases issued by the EMBTA General Secretariat regarding policies, agreements, or tariffs.",
            "src/data/newsData.ts",
            "[  ] Pending"
        ],
        [
            "Statutory Member Notices",
            "Demo registration circular",
            "Actual circulars regarding annual membership renewal, membership fees, ID cards, and compliance deadlines.",
            "src/data/newsData.ts",
            "[  ] Pending"
        ],
        [
            "Trade & Highway Advisories",
            "Demo timber advisory",
            "Authentic advisories regarding highway security, cargo transit rules, toll updates, or monsoon road conditions.",
            "src/data/newsData.ts",
            "[  ] Pending"
        ],
        [
            "Upcoming Events",
            "Demo symposium story",
            "Details of upcoming general body meetings, elections, regional trade fairs, or capacity workshops.",
            "src/data/newsData.ts",
            "[  ] Pending"
        ],
        [
            "Article Details Required",
            "Placeholder structures",
            "For each article: (1) Headline, (2) Date, (3) Issuing Officer/Wing, (4) Executive Summary, (5) Full multi-paragraph body text, (6) Banner image.",
            "src/data/newsData.ts",
            "[  ] Pending"
        ],
    ]
    story.append(create_table(headers, rows, [95, 95, 155, 105, 54]))

    story.append(Spacer(1, 14))
    story.append(Paragraph("3. Technical Instruction for Publishing Real Articles", styles['SectionH1']))
    story.append(Paragraph(
        "Open <code>src/data/newsData.ts</code>. Add new <code>NewsArticle</code> objects to the array. Ensure <code>slug</code> is lowercase with hyphens (e.g. <code>annual-general-meeting-2026</code>) and set <code>isDemo: false</code> when real official articles are published.",
        styles['BodyNorm']
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {pdf_path}")

# -------------------------------------------------------------
# 6. CONTACT DESK PDF
# -------------------------------------------------------------
def generate_contact_pdf():
    pdf_path = os.path.join(OUTPUT_DIR, "06_CONTACT_DESK_CONTENT_REQUIREMENTS.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = build_styles()
    story = []

    story.append(create_header_block("Contact Desk Content Requirements", "Route: /contact — Secretariat Coordinates & Public Inquiries"))
    story.append(HRFlowable(width="100%", thickness=1.5, color=EMBTA_GREEN, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("1. Executive Overview", styles['SectionH1']))
    story.append(Paragraph(
        "The Contact Desk connects traders, transport operators, and government authorities directly with the EMBTA Secretariat. All contact coordinates currently utilize standardized placeholders to avoid publishing inaccurate data.",
        styles['BodyNorm']
    ))

    story.append(Paragraph("2. Required Details Checklist & File Mapping", styles['SectionH1']))
    headers = ["Coordinate Field", "Current Placeholder", "Real Information Needed", "File to Update", "Status"]
    rows = [
        [
            "Secretariat Address",
            "[Association Address]",
            "Full physical office address: Building name, wing/floor, street, city/town, district, state, PIN code.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
        [
            "Official Phone Numbers",
            "[Official Phone Number]",
            "Primary office telephone, trader helpline, and executive secretariat mobile contact numbers.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
        [
            "Official Email Addresses",
            "[Official Email Address]",
            "Primary email (e.g. secretariat@embta.org) and inquiry routing emails (e.g. contact@embta.org).",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
        [
            "Public Chamber Hours",
            "[Office Hours]",
            "Exact operating days and office hours when secretariat chambers are open to members and the public.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
        [
            "Emergency Transit Hotline",
            "[Emergency Desk Phone]",
            "24/7 emergency contact number for drivers and transporters facing highway transit bottlenecks or cargo disputes.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
        [
            "Form Dispatch Destination",
            "Frontend simulated delay",
            "Designated email address or webhook endpoint to receive submissions from the website contact form.",
            "src/pages/ContactPage.tsx",
            "[  ] Pending"
        ],
        [
            "Social Media Channels",
            "Placeholder links",
            "Official URLs for WhatsApp community channel, Facebook page, Telegram group, or YouTube channel.",
            "src/data/siteConfig.ts",
            "[  ] Pending"
        ],
    ]
    story.append(create_table(headers, rows, [95, 95, 155, 105, 54]))

    story.append(Spacer(1, 14))
    story.append(Paragraph("3. Technical Instruction for Webmaster", styles['SectionH1']))
    story.append(Paragraph(
        "Edit <code>src/data/siteConfig.ts</code> under the <code>contact</code> object. Updating this single file automatically synchronizes contact coordinates across the Contact Desk page, Global Header, and Global Footer.",
        styles['BodyNorm']
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {pdf_path}")

# -------------------------------------------------------------
# 7. MASTER COMPREHENSIVE UPDATE MANUAL PDF
# -------------------------------------------------------------
def generate_master_pdf():
    pdf_path = os.path.join(OUTPUT_DIR, "00_EMBTA_MASTER_CONTENT_UPDATE_GUIDE.pdf")
    doc = SimpleDocTemplate(pdf_path, pagesize=letter, leftMargin=54, rightMargin=54, topMargin=54, bottomMargin=54)
    styles = build_styles()
    story = []

    story.append(create_header_block("Master Content Transition & Update Manual", "Complete Guide for Updating EMBTA Website from Demo to Real Association Data"))
    story.append(HRFlowable(width="100%", thickness=1.5, color=EMBTA_GREEN, spaceBefore=4, spaceAfter=12))

    story.append(Paragraph("1. Purpose of this Document", styles['SectionH1']))
    story.append(Paragraph(
        "This master specification document provides the Executive Council and Secretariat of the Eastern Maring Business & Traders Association (EMBTA) with a complete audit checklist of all authorized information, legal credentials, photographs, and documents required to transition the live website from demo templates to 100% verified, authentic content.",
        styles['BodyNorm']
    ))

    story.append(Paragraph("2. Page-by-Page Content Audit Summary", styles['SectionH1']))
    headers = ["Page / Route", "Key Placeholders to Replace", "Primary File to Update", "Action Required"]
    rows = [
        [
            "Home Page (/)",
            "Motto, headline, ESTD year, 4 wings descriptions, metric statistics.",
            "src/data/siteConfig.ts",
            "Supply verified member count & wing details."
        ],
        [
            "About EMBTA (/about)",
            "[Official Mission], [Official Vision], [Association History], milestones.",
            "src/data/aboutData.ts",
            "Copy verbatim text from registered constitution."
        ],
        [
            "Executive Profile (/executive)",
            "[Name] & [Biography] for 6 portfolios, plus executive portraits.",
            "src/data/executiveData.ts",
            "Submit 6 executive bios + 800x800 px photos."
        ],
        [
            "Media Gallery (/gallery)",
            "Demo photos, demo YouTube video (aqz-KE-bpKQ).",
            "src/data/galleryData.ts",
            "Provide real event photos and YouTube links."
        ],
        [
            "News Bulletins (/news)",
            "5 demo articles, sample dates, placeholder authors.",
            "src/data/newsData.ts",
            "Draft real official press statements."
        ],
        [
            "Contact Desk (/contact)",
            "[Association Address], [Phone], [Email], [Office Hours].",
            "src/data/siteConfig.ts",
            "Confirm official secretariat phone and address."
        ],
        [
            "Global Footer",
            "Centralized address, phone, email, registration details.",
            "src/data/siteConfig.ts",
            "Auto-updates when siteConfig.ts is edited."
        ],
    ]
    story.append(create_table(headers, rows, [90, 150, 120, 144]))

    story.append(Spacer(1, 14))
    story.append(Paragraph("3. Technical Architecture & File Directory Structure", styles['SectionH1']))
    story.append(Paragraph(
        "The website is architected so that <b>no content is hardcoded across component files</b>. All content is organized in clean, structured TypeScript data modules in the <code>src/data/</code> directory:",
        styles['BodyNorm']
    ))
    story.append(Paragraph(
        "• <code>src/data/siteConfig.ts</code> — Association name, logo, contact coordinates, 4 wings, core values, navigation.<br/>"
        "• <code>src/data/aboutData.ts</code> — Mission, vision, timeline milestones, purpose, and objectives.<br/>"
        "• <code>src/data/executiveData.ts</code> — The 6 executive portfolios, council address, responsibilities.<br/>"
        "• <code>src/data/galleryData.ts</code> — Media gallery items, YouTube embeds, categories.<br/>"
        "• <code>src/data/newsData.ts</code> — Articles, publication dates, excerpts, body paragraphs, and tags.",
        styles['BodyNorm']
    ))

    story.append(Spacer(1, 10))
    story.append(Paragraph("4. Step-by-Step Deployment Workflow for Real Updates", styles['SectionH1']))
    story.append(Paragraph(
        "<b>Step 1:</b> Fill out the checklist in each page's specific PDF document.<br/>"
        "<b>Step 2:</b> Gather executive photographs and event photos into <code>public/assets/</code>.<br/>"
        "<b>Step 3:</b> Update the corresponding file in <code>src/data/</code>.<br/>"
        "<b>Step 4:</b> Test locally with <code>npm run build</code>.<br/>"
        "<b>Step 5:</b> Commit and push to GitHub (<code>git commit -am 'update: live content' && git push origin main</code>).<br/>"
        "<b>Step 6:</b> GitHub Actions will automatically rebuild and publish the live site within 60 seconds.",
        styles['BodyNorm']
    ))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Generated: {pdf_path}")

if __name__ == "__main__":
    generate_master_pdf()
    generate_home_pdf()
    generate_about_pdf()
    generate_executive_pdf()
    generate_gallery_pdf()
    generate_news_pdf()
    generate_contact_pdf()
    print("\nAll 7 PDF Content Requirement documents successfully created!")
