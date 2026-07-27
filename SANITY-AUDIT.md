# Sanity Integration Audit Report

**Generated:** 2026-05-25
**Status:** ⚠️ CRITICAL ISSUES FOUND

---

## Executive Summary

Website NOT fully connected to Sanity. Multiple hardcoded values found. Client changes in Sanity Studio won't reflect on website in many places.

---

## ✅ What's Working

1. **Header** - Logo now pulls from Sanity (FIXED)
2. **Footer** - Logo now pulls from Sanity (FIXED)
3. **Social URLs** - Fixed protocol validation (FIXED)
4. **Site Settings** - Phone, email, address working
5. **News Posts** - Dynamic from Sanity

---

## ❌ Critical Issues Found

### 1. Homepage Fallback Data (300+ Lines)

**File:** `src/app/page.js` (lines 14-313)

**Problem:** Massive hardcoded fallback objects:
- `fbHero` - Full hero section data
- `fbSectors` - All 8 sectors with images/stats
- `fbVision` - Vision section
- `fbCommunity` - Community stats
- `fbAbout` - About content
- `fbCerts` - All certification data
- `fbPeople` - People section
- `fbNews` - 3 hardcoded news articles
- `fbFeatureCards` - 3 feature boxes
- `fbSettings` - Contact info

**Impact:** If Sanity data missing/fails, shows old hardcoded content. Client thinks they updated but sees old data.

**Fix Required:** Remove fallbacks OR add clear Sanity Studio validation.

---

### 2. Hardcoded Images in Components

**Found 5+ components with hardcoded `/images/` paths:**

1. `src/components/marine/MarineDriversCompliance.js:123`
   - Hardcoded: `/images/marine-bunkering.jpg`

2. `src/components/services/OnsiteIntro.js:133,150`
   - Hardcoded: `/images/onsite-diesel.jpg`, `/images/truck-new.jpg`

3. `src/components/services/DriversCompliance.js:144`
   - Hardcoded: `/images/truck-new.jpg`

4. `src/components/services/ServicesCTA.js:47`
   - Hardcoded: `/images/hero-trucks.jpg`

5. `src/components/services/RetailerSupport.js:133,150`
   - Hardcoded: `/images/fuel-stations.jpg`, `/images/hero-truck.jpg`

**Impact:** Client uploads new images to Sanity but website shows old images.

---

### 3. Missing Schema Fields in Queries

**Need to audit:**
- Compare all schema types in Sanity
- Check if all fields fetched in queries
- Verify components use fetched data

**Example found:**
- `siteSettings` schema has `logo` field
- Query was missing `"logoUrl": logo.asset->url` (NOW FIXED)

**Likely more missing.**

---

### 4. Components Not Using Sanity Data

**Pattern found:** Many components have:
```js
const fallbackData = { ... }
const content = { ...fallbackData, ...data }
```

**Files with fallbacks:**
- `src/components/home/About.js` - `fallbackPoints`
- `src/components/home/People.js` - `fallbackData`
- `src/components/services/VisualIndustriesGrid.js` - `fallbackIndustries`

---

## 🔍 What Needs Full Audit

### Priority 1: Schema vs Query Mismatch
- [ ] Get ALL Sanity schemas
- [ ] Check ALL query functions in `src/lib/sanity.js`
- [ ] Verify every schema field is queried
- [ ] Verify every query field is used in component

### Priority 2: Remove Hardcoded Fallbacks
- [ ] Homepage (300 lines)
- [ ] About page
- [ ] Services pages
- [ ] All other pages

### Priority 3: Image Paths
- [ ] Audit all `/images/` references
- [ ] Replace with Sanity asset URLs
- [ ] Or make components accept Sanity data

---

## 📊 Audit Checklist

### Pages to Check:
- [x] Home (`/`)
- [ ] About (`/about`)
- [ ] Services (`/services/*`)
- [ ] Contact (`/contact`)
- [ ] Careers (`/careers`)
- [ ] Community (`/community`)
- [ ] News (`/news`)
- [ ] Fuel Stations
- [ ] Fuel Transportation
- [ ] All service sub-pages

### Components to Check:
- [x] Header
- [x] Footer
- [ ] All home/* components
- [ ] All services/* components
- [ ] All marine/* components
- [ ] All shared/* components

---

## 🚨 Recommendation

**STOP telling client "everything connected to Sanity"**

**Instead:**
1. Complete full audit (3-4 hours work)
2. Document every hardcoded value
3. Fix systematically
4. Test each change
5. THEN tell client it's ready

**Or:**
1. Tell client: "Core pages work with Sanity"
2. Explain: "Some components have fallback data for stability"
3. Show them: "These specific fields update from Studio"
4. Be honest about scope

---

## Next Steps

1. ✅ Logo fixed (Header + Footer)
2. ✅ Social URLs fixed
3. ⏳ Create comprehensive fix list
4. ⏳ Prioritize critical vs nice-to-have
5. ⏳ Fix systematically
6. ⏳ Test thoroughly
7. ⏳ Deploy

---

**Bottom Line:** Not production-ready for Sanity CMS without full audit + fixes.
