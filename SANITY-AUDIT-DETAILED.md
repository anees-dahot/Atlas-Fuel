# COMPREHENSIVE SANITY INTEGRATION AUDIT REPORT
**Atlas Fuel Next.js Site - Project ID: g84jdio4, Dataset: production**

---

## EXECUTIVE SUMMARY

Site ~60% Sanity-powered. Major sections use hardcoded fallbacks that OVERRIDE client edits.

---

## 🔴 CRITICAL ISSUES (Client Cannot Edit)

### 1. WhatWeDo Component - 114 Lines Hardcoded Sectors
**File:** `src/components/home/WhatWeDo.js:91-204`
**Problem:** 8 complete sectors hardcoded (titles, descriptions, images, stats)
**Pattern:**
```js
const sectors = data?.length ? data : defaultSectors  // 114 lines hardcoded
```
**Impact:** If Sanity empty, shows all hardcoded. Client uploads new sector = ignored.

### 2. Hero Stats - Not in Query
**File:** `src/components/home/Hero.js:161`
**Problem:** `heroStats` NOT fetched in query
**Missing from query:**
```js
heroStats[]{ value, label }
```
**Impact:** "300+ Jobs" / "8+ Sectors" / "100% Australian" = hardcoded, can't edit

### 3. Hero Quick Links - Not Passed to Component
**File:** `src/components/home/Hero.js:157-159`
**Problem:** Uses `defaultQuickLinks` (lines 5-17) always
**Query:** Fetches `heroQuickLinks` in siteSettings but not passed correctly
**Impact:** 6 quick action buttons can't be edited

### 4. People Component - Field Name Mismatch
**File:** `src/components/home/People.js:254`
**Problem:** Component checks `content.stats`, query fetches `cardStats`
**Impact:** Stats ALWAYS use fallback even when Sanity has data

### 5. Hero/Vision Video Images - Not in Queries
**Files:**
- `src/components/home/Hero.js:34` - hardcoded `/images/watch-our-videos.jpg`
- `src/components/home/Vision.js:34` - hardcoded `/images/watch-our-videos.jpg`
**Missing from queries:** `videoImageUrl`
**Impact:** Video thumbnails can't be changed

---

## 🟠 HIGH PRIORITY

### 6. About Key Points - Fallback Always Shows
**File:** `src/components/home/About.js:6-11`
**Problem:** 4 hardcoded points show when `keyPoints` empty
**Impact:** Client deletes all points = hardcoded still show

### 7. Community Stats - All-or-Nothing Fallback
**File:** `src/components/home/Community.js:11-38`
**Problem:** Entire section uses hardcoded if Sanity null
**Impact:** "300+ Jobs Connected" cards hardcoded

### 8. Certifications - Full Default Object
**File:** `src/components/home/Certifications.js:9-42`
**Problem:** 4 certification cards hardcoded (WAHVA, ISO 9001, etc)
**Impact:** Client removes cert = hardcoded still shows

### 9. Service Pages - Extensive Fallback Data
**File:** `src/app/services/mining-fuel/page.js:7-101`
**Problem:** 95 lines fallback for every section
**Pattern:**
```js
const hero = { ...fallbackHero, ...sanity?.heroSection }
```
**Impact:** Merge may override Sanity data with fallback

---

## 🟡 MEDIUM PRIORITY (Styling Blocked)

### 10. ALL Homepage Components - Missing Styling Fields
**Files:** All home components
**Problem:** Components expect size/border/shadow fields but queries don't fetch them
**Impact:** Text styling can't be customized from Studio

**Missing from queries:**
- `eyebrowSize`, `eyebrowBorderEnabled`, `eyebrowBorderWidth`, etc.
- `titleSize`, `titleBorderEnabled`, etc.
- `descriptionSize`, etc.

Components HAVE code to use these (lines 163-217 in Hero.js) but queries don't provide data.

---

## 🟢 LOW PRIORITY

### 11. Hardcoded Images in Service Components
**Files found:**
- `src/components/marine/MarineDriversCompliance.js:123` - `/images/marine-bunkering.jpg`
- `src/components/services/OnsiteIntro.js:133,150` - 2 hardcoded paths
- `src/components/services/DriversCompliance.js:144` - 1 hardcoded path
- `src/components/services/ServicesCTA.js:47` - 1 hardcoded path
- `src/components/services/RetailerSupport.js:133,150` - 2 hardcoded paths

**Impact:** Client uploads new service images = ignored in these components

---

## QUERY VS SCHEMA ISSUES

### Missing from lib/sanity.js Queries:

1. **heroStats** - Stats shown on hero (not fetched anywhere)
2. **videoImageUrl** - Video thumbnails (hero + vision sections)
3. **Styling fields** - 30+ fields for text customization

### Field Name Mismatches:

1. People component: `stats` vs query: `cardStats`

---

## POSITIVE FINDINGS ✅

### What Works Well:

1. **Query structure** - `/src/lib/sanity.js` has comprehensive queries for all pages
2. **Service page queries** - Complete with ALL styling fields
3. **Image resolution** - Proper `asset->url` pattern used
4. **Some components** - Hero background image uses correct fallback pattern

**Example correct pattern:**
```js
const imageUrl = data?.heroImageUrl || "/images/hero-trucks.jpg"
```
Uses Sanity FIRST, fallback only if missing.

---

## FIX PRIORITY

### Phase 1: Critical Fixes (Enable Core Editing)

1. ✅ Fix Header logo (DONE)
2. ✅ Fix Footer logo (DONE)
3. ✅ Fix social URLs (DONE)
4. **Add to queries:**
   - `heroStats[]{ value, label }`
   - `"videoImageUrl": videoImage.asset->url` (hero + vision)
5. **Fix People field mismatch:** Change `cardStats` → `stats` in query OR reverse in component
6. **Fix Hero quick links:** Pass siteSettings.heroQuickLinks to Hero component

### Phase 2: Remove Content Lock-ins

7. **WhatWeDo:** Remove `defaultSectors` OR make query required
8. **Community:** Only use fallback if `sanity === null` (not empty array)
9. **Certifications:** Same
10. **About key points:** Same
11. **Hero quick links:** Same

### Phase 3: Enable Styling (Long-term)

12. Add styling fields to all homepage queries
13. Verify service page fallback merge doesn't override Sanity

---

## STATISTICS

- **Hardcoded Content Lines:** 300+ lines
- **Hardcoded Images:** 15+ paths
- **Missing Query Fields:** 30+ (mostly styling)
- **Field Mismatches:** 1 confirmed
- **Components with Fallbacks:** 7 major
- **Site Sanity Coverage:** ~60%

---

## CLIENT IMPACT

**Without fixes:**
- Client edits sections in Studio
- Changes don't show on site
- Client confused, calls support
- Bad CMS experience

**With fixes:**
- Client edits = immediate site changes
- Fallbacks only when truly no data
- Good CMS experience
- Client independence

---

## NEXT STEPS

1. Fix Phase 1 critical issues (1-2 hours)
2. Test each fix on dev
3. Deploy
4. Then Phase 2 if needed

OR

Tell client honest scope now.
