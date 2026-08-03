#!/usr/bin/env python3

from pathlib import Path
from shutil import copyfile

from reportlab.lib import colors
from reportlab.lib.enums import TA_CENTER, TA_LEFT
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import (
    HRFlowable,
    Image,
    KeepTogether,
    PageBreak,
    Paragraph,
    SimpleDocTemplate,
    Spacer,
    Table,
    TableStyle,
)


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "output/pdf/atlas-fuel-sanity-editing-guide.pdf"
PUBLIC_COPY = ROOT / "public/guides/atlas-fuel-sanity-editing-guide.pdf"
LOGO = ROOT / "public/images/logo.png"

GREEN = colors.HexColor("#17A350")
DARK = colors.HexColor("#10231A")
INK = colors.HexColor("#17241C")
MUTED = colors.HexColor("#5D6B63")
PALE = colors.HexColor("#EFF7F1")
LIGHT = colors.HexColor("#F5F7F6")
LINE = colors.HexColor("#DCE5DF")
WHITE = colors.white
AMBER = colors.HexColor("#FFF5D6")


styles = getSampleStyleSheet()
styles.add(ParagraphStyle(
    name="CoverKicker", fontName="Helvetica-Bold", fontSize=10, leading=14,
    textColor=colors.HexColor("#80E1A3"), spaceAfter=8,
))
styles.add(ParagraphStyle(
    name="CoverTitle", fontName="Helvetica-Bold", fontSize=33, leading=34,
    textColor=WHITE, spaceAfter=14,
))
styles.add(ParagraphStyle(
    name="CoverBody", fontName="Helvetica", fontSize=13, leading=19,
    textColor=colors.HexColor("#D8E2DC"), spaceAfter=16,
))
styles.add(ParagraphStyle(
    name="PageTitle", fontName="Helvetica-Bold", fontSize=23, leading=27,
    textColor=DARK, spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="Deck", fontName="Helvetica", fontSize=10.5, leading=15,
    textColor=MUTED, spaceAfter=12,
))
styles.add(ParagraphStyle(
    name="Section", fontName="Helvetica-Bold", fontSize=14, leading=17,
    textColor=DARK, spaceBefore=5, spaceAfter=6,
))
styles.add(ParagraphStyle(
    name="BodySmall", fontName="Helvetica", fontSize=9.2, leading=13.2,
    textColor=INK, spaceAfter=5,
))
styles.add(ParagraphStyle(
    name="BodyTiny", fontName="Helvetica", fontSize=8.3, leading=11.5,
    textColor=INK,
))
styles.add(ParagraphStyle(
    name="CardTitle", fontName="Helvetica-Bold", fontSize=10.5, leading=13,
    textColor=DARK, spaceAfter=3,
))
styles.add(ParagraphStyle(
    name="CardBody", fontName="Helvetica", fontSize=8.8, leading=12.2,
    textColor=MUTED,
))
styles.add(ParagraphStyle(
    name="Number", fontName="Helvetica-Bold", fontSize=16, leading=18,
    textColor=WHITE, alignment=TA_CENTER,
))
styles.add(ParagraphStyle(
    name="TableHead", fontName="Helvetica-Bold", fontSize=8.5, leading=11,
    textColor=WHITE,
))
styles.add(ParagraphStyle(
    name="TableBody", fontName="Helvetica", fontSize=7.7, leading=10.2,
    textColor=INK,
))
styles.add(ParagraphStyle(
    name="TableBodyBold", fontName="Helvetica-Bold", fontSize=7.7, leading=10.2,
    textColor=DARK,
))


def p(text, style="BodySmall"):
    return Paragraph(text, styles[style])


def bullets(items, color=GREEN):
    rows = []
    for item in items:
        rows.append([
            Paragraph("•", ParagraphStyle("bullet", parent=styles["BodySmall"], textColor=color, fontSize=14)),
            p(item),
        ])
    table = Table(rows, colWidths=[5 * mm, 158 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 2),
        ("TOPPADDING", (0, 0), (-1, -1), 1),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 2),
    ]))
    return table


def callout(title, body, fill=PALE):
    table = Table([[p(title, "CardTitle"), p(body, "CardBody")]], colWidths=[42 * mm, 119 * mm])
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), fill),
        ("BOX", (0, 0), (-1, -1), 0.8, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 9),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 9),
    ]))
    return table


def steps(items):
    rows = []
    for index, (title, body) in enumerate(items, 1):
        number = Table([[p(str(index), "Number")]], colWidths=[10 * mm], rowHeights=[10 * mm])
        number.setStyle(TableStyle([
            ("BACKGROUND", (0, 0), (-1, -1), GREEN),
            ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
            ("LEFTPADDING", (0, 0), (-1, -1), 0),
            ("RIGHTPADDING", (0, 0), (-1, -1), 0),
            ("TOPPADDING", (0, 0), (-1, -1), 0),
            ("BOTTOMPADDING", (0, 0), (-1, -1), 0),
        ]))
        rows.append([number, [p(title, "CardTitle"), p(body, "CardBody")]])
    table = Table(rows, colWidths=[14 * mm, 147 * mm], hAlign="LEFT")
    table.setStyle(TableStyle([
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 0),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 7),
    ]))
    return table


def content_table(headers, rows, widths):
    data = [[p(header, "TableHead") for header in headers]]
    for row in rows:
        data.append([
            p(value, "TableBodyBold" if column == 0 else "TableBody")
            for column, value in enumerate(row)
        ])
    table = Table(data, colWidths=widths, repeatRows=1, hAlign="LEFT")
    table.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), DARK),
        ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, LIGHT]),
        ("GRID", (0, 0), (-1, -1), 0.5, LINE),
        ("VALIGN", (0, 0), (-1, -1), "TOP"),
        ("LEFTPADDING", (0, 0), (-1, -1), 6),
        ("RIGHTPADDING", (0, 0), (-1, -1), 6),
        ("TOPPADDING", (0, 0), (-1, -1), 6),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 6),
    ]))
    return table


def page_intro(title, deck):
    return [p(title, "PageTitle"), p(deck, "Deck"), HRFlowable(width="100%", thickness=1, color=LINE, spaceAfter=11)]


def first_page(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setFillColor(DARK)
    canvas.rect(0, 0, width, height, stroke=0, fill=1)
    canvas.setFillColor(GREEN)
    canvas.rect(0, height - 8 * mm, width, 8 * mm, stroke=0, fill=1)
    canvas.setFillColor(colors.HexColor("#163728"))
    canvas.circle(width - 12 * mm, 35 * mm, 62 * mm, stroke=0, fill=1)
    canvas.restoreState()


def later_pages(canvas, doc):
    canvas.saveState()
    width, height = A4
    canvas.setStrokeColor(LINE)
    canvas.line(24 * mm, height - 15 * mm, width - 24 * mm, height - 15 * mm)
    canvas.setFont("Helvetica-Bold", 7.5)
    canvas.setFillColor(DARK)
    canvas.drawString(24 * mm, height - 11 * mm, "ATLAS FUEL - SANITY EDITING GUIDE")
    canvas.setFont("Helvetica", 7.5)
    canvas.setFillColor(MUTED)
    canvas.drawRightString(width - 24 * mm, 11 * mm, f"Page {doc.page}")
    canvas.restoreState()


story = []

# Cover
if LOGO.exists():
    logo = Image(str(LOGO), width=54 * mm, height=30.4 * mm)
    logo_card = Table([[logo]], colWidths=[64 * mm], rowHeights=[38 * mm])
    logo_card.setStyle(TableStyle([
        ("BACKGROUND", (0, 0), (-1, -1), WHITE),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("ALIGN", (0, 0), (-1, -1), "CENTER"),
        ("LEFTPADDING", (0, 0), (-1, -1), 5),
        ("RIGHTPADDING", (0, 0), (-1, -1), 5),
        ("TOPPADDING", (0, 0), (-1, -1), 5),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 5),
    ]))
    story.extend([Spacer(1, 23 * mm), logo_card, Spacer(1, 17 * mm)])
story.extend([
    p("CLIENT EDITING GUIDE", "CoverKicker"),
    p("Update the Atlas Fuel website with confidence", "CoverTitle"),
    p("A plain-English guide to finding content, editing every field, managing the Store Locator map, previewing changes and publishing safely.", "CoverBody"),
    Spacer(1, 11 * mm),
    Table([
        [p("SANITY STUDIO", "TableHead"), p("LIVE WEBSITE", "TableHead")],
        [p("atlasfuel.sanity.studio", "CardBody"), p("atlas-fuel-website.vercel.app", "CardBody")],
    ], colWidths=[76 * mm, 76 * mm], style=TableStyle([
        ("BACKGROUND", (0, 0), (-1, 0), GREEN),
        ("BACKGROUND", (0, 1), (-1, 1), colors.HexColor("#183B2B")),
        ("BOX", (0, 0), (-1, -1), 0.7, colors.HexColor("#4B725D")),
        ("INNERGRID", (0, 0), (-1, -1), 0.5, colors.HexColor("#4B725D")),
        ("LEFTPADDING", (0, 0), (-1, -1), 10),
        ("RIGHTPADDING", (0, 0), (-1, -1), 10),
        ("TOPPADDING", (0, 0), (-1, -1), 8),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 8),
    ])),
    Spacer(1, 25 * mm),
    p("The one rule to remember: your change is not public until you press Publish.", "CoverBody"),
    PageBreak(),
])

# 2
story.extend(page_intro("Start here: every edit is three steps", "The admin panel now opens with a Start Here guide. Use this same workflow for pages, menus, news, locations, colors and fonts."))
story.extend([
    steps([
        ("Find the correct document", "Open <b>Website Content</b> for pages, or <b>Website Settings</b> for header, footer, contact details, colors and fonts."),
        ("Open the numbered section", "Field groups match the order of sections on the website. Change only the text, image, link or list item you need."),
        ("Preview, then Publish", "Use <b>Preview &amp; Edit Website</b> for a visual check. Press the green <b>Publish</b> button when ready."),
    ]),
    Spacer(1, 5 * mm),
    callout("Draft versus public", "A draft is visible in Studio but not on the public website. Publish sends the change live. Normal updates should appear within about one minute.", AMBER),
    Spacer(1, 5 * mm),
    p("The four areas in the top menu", "Section"),
    content_table(
        ["Area", "Use it for"],
        [
            ("Start Here", "Quick instructions, Store Locator steps, and this PDF download."),
            ("Website Content", "Homepage, About, Services, Fuel Stations, Store Locator, Careers, News and other pages."),
            ("Preview & Edit Website", "See the website beside the editor and select visible content."),
            ("Media", "Browse uploaded images and files. Usually upload from the page field instead."),
        ],
        [47 * mm, 114 * mm],
    ),
    PageBreak(),
])

# 3
story.extend(page_intro("Where to find website-wide content", "These settings affect many or all pages. Change them once here instead of hunting through individual pages."))
story.extend([
    content_table(
        ["What you want to edit", "Open in Studio", "Important note"],
        [
            ("Logo, phone, email, address", "Site Details, Logo and Top Bar", "Used in the header and other shared areas."),
            ("Header navigation", "Header and Mega Menu", "Edit labels, links, dropdown text, images and sub-links."),
            ("Footer", "Footer", "Edit description, columns, social links, legal links and copyright."),
            ("Call-to-action banners", "Call to Action Banner", "Shared CTA wording, button and destination."),
            ("SEO defaults", "SEO Defaults", "Default browser title, description, social image and metadata."),
            ("Colors", "Website Colors and Fonts", "Primary, dark, backgrounds, text and muted colors."),
            ("Fonts", "Website Colors and Fonts", "Choose supported heading/body families and weights."),
            ("Form messages", "Form Messages and Recipients", "Labels, success/error messages and recipients."),
            ("Cookie notice", "Cookie Consent", "Banner text, policy link and button labels."),
        ],
        [42 * mm, 51 * mm, 68 * mm],
    ),
    Spacer(1, 6 * mm),
    callout("Header or footer change not showing?", "Confirm you edited the shared setting, pressed Publish, and refreshed the website. Do not create a duplicate settings document."),
    PageBreak(),
])

# 4
story.extend(page_intro("Where to find pages and sections", "Website Content follows the site structure. Each page has numbered groups that follow the visible top-to-bottom section order."))
story.extend([
    content_table(
        ["Studio document", "Main sections you can edit"],
        [
            ("Home Page", "Hero, intro, services, about, statistics, quote, community, latest news and CTA."),
            ("About Page", "Hero, story, values, safety, core values, culture, excellence and CTA."),
            ("Services Page", "Hero, service cards, capabilities, industries and CTA."),
            ("Fuel Stations Page", "Hero, intro, benefits, fuel types, network, gallery and CTA."),
            ("Store Locator and Map", "Hero, interactive map, store markers/details, contact offices and CTA."),
            ("Fuel Transportation", "Hero, overview, fleet, team, excellence, gallery and CTA."),
            ("Careers", "Hero, introduction, benefits, open roles, recruitment/contact and CTA."),
            ("News", "Listing page text, filters, empty state and CTA. Articles are separate News Posts."),
            ("Contact", "Hero, contact details, form text, map/location and CTA."),
            ("Community / Racing", "Each page has its own hero, story/content sections, media and CTA."),
            ("Legal pages", "Privacy Policy, Disclaimer and Terms text."),
        ],
        [49 * mm, 112 * mm],
    ),
    Spacer(1, 5 * mm),
    p("Service detail pages", "Section"),
    p("Mining, Marine, Agriculture, Retailers, Onsite Bulk Diesel and Local Fuel Distributors each have their own document. Edit the matching page rather than changing the Services overview.", "BodySmall"),
    PageBreak(),
])

# 5
story.extend(page_intro("Text, links, lists and buttons", "Most fields explain themselves. This page covers the few controls that commonly confuse new editors."))
story.extend([
    content_table(
        ["Field type", "How to edit it safely"],
        [
            ("Short text", "Click the field and replace the wording. Keep headings concise so layouts remain balanced."),
            ("Long text", "Use paragraphs. Avoid pasting heavily formatted text from Word; paste as plain text when possible."),
            ("Rich text", "Use the toolbar for headings, bold, lists and links. Do not use a heading only to make text look larger."),
            ("URL / link", "Internal links normally start with /, for example /contact. External links use the full https:// address."),
            ("Button", "A button usually needs both a label and a link. If either is empty, the website may hide it."),
            ("Toggle", "Green/on means enabled. Use visibility toggles to show or hide an optional item."),
            ("List / array", "Use Add item. Drag items to reorder. Open an item to edit its details."),
            ("Slug", "The page/article URL. Avoid changing a published slug unless the web developer is handling redirects."),
        ],
        [43 * mm, 118 * mm],
    ),
    Spacer(1, 5 * mm),
    callout("Intentionally blank fields", "Some fields use safe website fallback content when no CMS value exists. To guarantee your new wording appears, fill the field and Publish."),
    Spacer(1, 5 * mm),
    callout("Removing an item", "Only remove a list item when you want it removed from the website. Do not delete a main page document; those documents are protected single pages."),
    PageBreak(),
])

# 6
story.extend(page_intro("Images, video, colors and fonts", "Every media and visual setting exposed by the website can be edited in its matching field."))
story.extend([
    p("Images", "Section"),
    bullets([
        "Click the image field, choose <b>Upload</b> or select an existing asset.",
        "Use a sharp, landscape image for heroes and wide sections. Avoid screenshots or tiny images.",
        "Complete <b>Alternative text</b>: describe what is visible in one short sentence.",
        "Use crop/hotspot controls when available so the important subject stays visible on mobile.",
    ]),
    Spacer(1, 3 * mm),
    p("Video", "Section"),
    bullets([
        "Use the page's video field or URL field. Paste the complete URL where requested.",
        "Add a poster/cover image when available so the section looks polished before playback.",
        "Keep files compressed. Very large video uploads slow editing and page loading.",
    ]),
    Spacer(1, 3 * mm),
    p("Colors and fonts", "Section"),
    bullets([
        "Open <b>Website Colors and Fonts</b>. Choose from the provided font options.",
        "Enter colors using the picker or a six-digit hex value such as <b>#17A350</b>.",
        "Preview before publishing. A global color or font change affects the entire website.",
    ]),
    Spacer(1, 4 * mm),
    callout("Best image practice", "Upload one clean source image and reuse it from the media library when appropriate. Do not upload the same file repeatedly."),
    PageBreak(),
])

# 7
story.extend(page_intro("Store Locator: add or edit a marker", "Each item in Store Locations and Map Markers controls one map pin, its detail card and the dialog shown when a visitor selects the pin."))
story.extend([
    steps([
        ("Open the document", "Go to <b>Website Content - Store Locator and Map</b>."),
        ("Open section 3", "Select <b>Store Locations and Map Markers</b>, then open an existing store or click <b>Add item</b>."),
        ("Enter the store details", "Add the name, badge, short summary, image, address, phone, email, hours, directions link and feature list."),
        ("Add coordinates", "Enter decimal <b>Latitude</b> and <b>Longitude</b>. Keep <b>Show Marker on Map</b> switched on."),
        ("Publish and test", "Press Publish, open Store Locator, select the pin and check the dialog, directions, phone and email links."),
    ]),
    Spacer(1, 3 * mm),
    callout("Current Kwinana coordinates", "Latitude: <b>-32.2358956</b> &nbsp;&nbsp; Longitude: <b>115.7805562</b>. Copy both exactly, including the minus sign on latitude.", AMBER),
    Spacer(1, 4 * mm),
    p("How to get coordinates for a new store", "Section"),
    bullets([
        "Open the store in Google Maps or Apple Maps and place the pin on the correct entrance/building.",
        "Copy the decimal latitude and longitude shown by the map service.",
        "A Perth-area latitude is normally negative. Swapping the two values places the marker in the wrong country.",
    ]),
    PageBreak(),
])

# 8
story.extend(page_intro("Store Locator: what every field controls", "Use this reference when a marker or dialog is incomplete."))
story.extend([
    content_table(
        ["Field", "Where it appears / what it does"],
        [
            ("Name", "Marker accessibility label, dialog title and location detail card."),
            ("Badge", "Small label above the dialog title, such as Atlas Fuel Station."),
            ("Summary", "Short introduction inside the marker dialog."),
            ("Image", "Large visual at the top of the marker dialog."),
            ("Address", "Dialog and detail card address."),
            ("Latitude / Longitude", "Exact pin position. Both are required for the marker."),
            ("Show Marker on Map", "Turn off to keep store details visible without showing a pin."),
            ("Phone / Email / Hours", "Contact rows in the dialog and details section."),
            ("Directions Link", "Destination opened by Get Directions. If blank, coordinates are used automatically."),
            ("Features", "Chips such as Diesel, AdBlue, Fleet Cards or 24/7 access."),
            ("Default Zoom", "Section 2 map setting. Higher numbers show a closer view."),
            ("Map labels", "Section 2 loading, hint, accessibility and unavailable messages."),
            ("Dialog labels", "Section 3 close button, phone, email, hours and directions wording."),
        ],
        [47 * mm, 114 * mm],
    ),
    Spacer(1, 5 * mm),
    callout("Marker missing?", "Check that Show Marker on Map is on, latitude and longitude are both filled, and the document is Published."),
    PageBreak(),
])

# 9
story.extend(page_intro("News, products and repeatable content", "Items such as articles and products are managed separately from the page that lists them."))
story.extend([
    p("Publish a news article", "Section"),
    steps([
        ("Open News Posts", "In Website Content, open the News collection and create a new post."),
        ("Complete the article", "Add title, slug, publication date, category, excerpt, main image and article body."),
        ("Check the listing", "Publish the post. It should appear on the News page and may appear in Latest News sections."),
    ]),
    Spacer(1, 3 * mm),
    p("Products and reusable records", "Section"),
    bullets([
        "Open the matching collection and edit the existing record when updating content.",
        "Create a new record only when adding a genuinely new item.",
        "Complete required title, image, description, links and status/visibility fields.",
        "Check both the listing card and the detail page after publishing.",
    ]),
    Spacer(1, 5 * mm),
    callout("Page text versus item content", "Edit the News page document for headings, filters and empty messages. Edit a News Post for the actual article. The same distinction applies to other listing pages."),
    Spacer(1, 5 * mm),
    callout("Dates", "Use the real publication date and time. Future dates may affect where and when an item appears."),
    PageBreak(),
])

# 10
story.extend(page_intro("Preview, publish and confirm", "A quick check prevents almost every client-side editing problem."))
story.extend([
    p("Before publishing", "Section"),
    bullets([
        "Read the changed heading and paragraph once for spelling and spacing.",
        "Check image crop and alternative text.",
        "Open every changed button/link and confirm the destination.",
        "For lists, confirm item order and that no accidental blank item remains.",
        "For Store Locator, select every changed marker and check the full dialog.",
    ]),
    Spacer(1, 4 * mm),
    p("After publishing", "Section"),
    steps([
        ("Wait briefly", "The site normally refreshes automatically. Allow up to about one minute."),
        ("Open the exact live page", "Use a fresh tab and refresh once. Check desktop and a narrow/mobile window for important changes."),
        ("Correct safely", "If something is wrong, return to the same document, fix the field and Publish again."),
    ]),
    Spacer(1, 4 * mm),
    callout("Do not see Publish?", "You may have no changes, may be viewing history, or may not have publishing permission. Return to the current document and confirm you are signed into the correct Sanity account.", AMBER),
    PageBreak(),
])

# 11
story.extend(page_intro("Troubleshooting: the fast checklist", "Use these checks in order before reporting a problem."))
story.extend([
    content_table(
        ["Problem", "Check this first"],
        [
            ("Change is not on the website", "Was Publish pressed? Wait one minute, then refresh the exact page."),
            ("Wrong page changed", "Confirm the browser URL and the Studio document title match."),
            ("Button is missing", "Confirm both button label and link are filled."),
            ("Image is missing", "Select/upload the image, add alt text, and Publish."),
            ("Map marker is missing", "Fill both coordinates and enable Show Marker on Map."),
            ("Marker is in the wrong place", "Check values were not swapped and preserve the minus sign in latitude."),
            ("Dialog lacks information", "Open the same store item and complete its summary, image and contact fields."),
            ("Header/footer did not change", "Edit Website Settings, not an individual page."),
            ("News is not listed", "Confirm the News Post is Published and its date/category are correct."),
            ("Layout looks broken", "Shorten oversized headings, remove blank list items, and check image crop."),
        ],
        [50 * mm, 111 * mm],
    ),
    Spacer(1, 6 * mm),
    callout("When asking for help", "Send the Studio document name, field/section name, live page URL, what you expected, and a screenshot. This avoids back-and-forth and makes the issue easy to reproduce."),
    PageBreak(),
])

# 12
story.extend(page_intro("One-page editing checklist", "Keep this page nearby for day-to-day updates."))
story.extend([
    content_table(
        ["Before", "Edit", "Publish", "Verify"],
        [[
            "Open the exact live page and decide what must change.",
            "Find the matching document and numbered section.",
            "Preview the change, then press Publish.",
            "Wait briefly, refresh and test links/media/map pins.",
        ]],
        [40.25 * mm] * 4,
    ),
    Spacer(1, 8 * mm),
    p("Never forget", "Section"),
    bullets([
        "Website Content = pages and their visible sections.",
        "Website Settings = header, footer, shared details, colors and fonts.",
        "A listing page and its individual items are usually separate documents.",
        "A Store Locator pin needs latitude, longitude and Show Marker on Map enabled.",
        "Draft is private. Publish is public.",
    ]),
    Spacer(1, 7 * mm),
    callout("Studio", "https://atlasfuel.sanity.studio/"),
    Spacer(1, 3 * mm),
    callout("Website", "https://atlas-fuel-website.vercel.app/"),
    Spacer(1, 9 * mm),
    Table([[p("YOU ARE READY", "TableHead"), p("Find it. Edit it. Preview it. Publish it. Check it.", "CardTitle")]], colWidths=[43 * mm, 118 * mm], style=TableStyle([
        ("BACKGROUND", (0, 0), (0, 0), GREEN),
        ("BACKGROUND", (1, 0), (1, 0), PALE),
        ("BOX", (0, 0), (-1, -1), 0.8, GREEN),
        ("VALIGN", (0, 0), (-1, -1), "MIDDLE"),
        ("LEFTPADDING", (0, 0), (-1, -1), 11),
        ("RIGHTPADDING", (0, 0), (-1, -1), 11),
        ("TOPPADDING", (0, 0), (-1, -1), 11),
        ("BOTTOMPADDING", (0, 0), (-1, -1), 11),
    ])),
])


OUTPUT.parent.mkdir(parents=True, exist_ok=True)
PUBLIC_COPY.parent.mkdir(parents=True, exist_ok=True)
doc = SimpleDocTemplate(
    str(OUTPUT),
    pagesize=A4,
    rightMargin=24 * mm,
    leftMargin=24 * mm,
    topMargin=22 * mm,
    bottomMargin=18 * mm,
    title="Atlas Fuel Sanity Editing Guide",
    author="Atlas Fuel",
    subject="Client guide for editing the Atlas Fuel website in Sanity Studio",
)
doc.build(story, onFirstPage=first_page, onLaterPages=later_pages)
copyfile(OUTPUT, PUBLIC_COPY)
print(OUTPUT)
print(PUBLIC_COPY)
