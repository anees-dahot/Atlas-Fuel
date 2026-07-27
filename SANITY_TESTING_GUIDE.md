# SANITY CHANGES VERIFICATION GUIDE

Quick ways verify Sanity changes showing on website.

---

## METHOD 1: Auto Test API (Fastest) ⚡

**Created:** `/api/sanity-test` endpoint

### How Use:

1. **Start dev server:**
   ```bash
   cd nextjs
   npm run dev
   ```

2. **Visit test endpoint:**
   ```
   http://localhost:3000/api/sanity-test
   ```

3. **Make change in Sanity Studio:**
   - Edit any field
   - Publish

4. **Wait 60 seconds**

5. **Refresh test endpoint**
   - See if new value appears in JSON response

### What It Tests:
- Homepage hero text
- Homepage about section
- Site settings (phone, email)
- News posts
- MegaMenu

**Example Response:**
```json
{
  "summary": {
    "total": 5,
    "passed": 5,
    "failed": 0,
    "status": "🎉 ALL TESTS PASSED"
  },
  "tests": [
    {
      "name": "Homepage Hero",
      "status": "✅ CONNECTED",
      "data": {
        "heroEyebrow": "On-Site Fuel Stations",
        "heroTitle1": "Welcome to",
        "heroTitle2": "ATLAS FUEL"
      }
    }
  ]
}
```

---

## METHOD 2: Browser DevTools (Manual) 🔍

### Quick Check Any Page:

1. **Open page in browser**

2. **Open DevTools** (F12 or Cmd+Opt+I)

3. **Go to Console tab**

4. **Look for Sanity logs:**
   ```
   [Sanity] homePage loaded, sections: heroSection, aboutSection, ...
   ```

5. **Type in console:**
   ```javascript
   // See all Sanity data loaded on page
   window.__NEXT_DATA__.props.pageProps
   ```

6. **Check if your edited field there**

---

## METHOD 3: Direct Sanity Query (Advanced) 🛠️

### Test specific field changed:

1. **Visit Sanity Vision** (query tool):
   ```
   https://atlasfuel.sanity.studio/vision
   ```

2. **Run query:**
   ```groq
   *[_type == "homePage"][0]{
     "eyebrow": heroSection.eyebrow,
     "title1": heroSection.titleLine1
   }
   ```

3. **Compare result with website**

---

## METHOD 4: Quick Visual Test 👀

### Test common fields (2 min):

**Homepage:**
1. Edit hero eyebrow: `heroSection.eyebrow`
2. Change to: "TEST - DELETE THIS"
3. Publish
4. Wait 60 sec
5. Visit homepage → see if "TEST - DELETE THIS" appears
6. Change back → publish → verify reverts

**Site Settings:**
1. Edit phone: `+61 8 6377 7644` → `+61 8 TEST TEST`
2. Publish
3. Wait 60 sec
4. Check header top bar → see if TEST appears
5. Change back

**News:**
1. Edit news post title
2. Publish
3. Wait 60 sec
4. Visit `/news` → check if new title shows

---

## METHOD 5: Cache Bypass (Instant Check) 🚀

### Skip 60 sec wait:

**Option A: Clear Next.js cache**
```bash
# In nextjs folder
rm -rf .next
npm run dev
# Now changes appear instantly (no cache)
```

**Option B: Force refresh**
```
Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
```

**Option C: Reduce revalidate time (dev only)**

Edit `nextjs/src/lib/sanity.js`:
```javascript
// Change from:
{ next: { revalidate: 86400 } }

// To:
{ next: { revalidate: 10 } }  // 10 seconds
```

Now changes show in 10 sec instead 60 sec.

---

## AUTOMATED TEST SCRIPT

### Want script test all fields?

Create `test-sanity.js`:

```javascript
// Run: node test-sanity.js
const fetch = require('node-fetch');

const tests = [
  {
    name: "Homepage Hero",
    url: "http://localhost:3000",
    lookFor: "Welcome to"  // Text from Sanity
  },
  {
    name: "About Page",
    url: "http://localhost:3000/about",
    lookFor: "Unrivalled"  // Text from Sanity
  }
];

async function runTests() {
  for (const test of tests) {
    const res = await fetch(test.url);
    const html = await res.text();
    const found = html.includes(test.lookFor);
    console.log(`${test.name}: ${found ? '✅ PASS' : '❌ FAIL'}`);
  }
}

runTests();
```

---

## TROUBLESHOOTING

### Changes not showing?

**Check:**
1. ✅ Published in Sanity (not just saved)
2. ✅ Waited 60+ seconds
3. ✅ Hard refresh browser (Cmd+Shift+R)
4. ✅ Check `/api/sanity-test` - does JSON show new value?
   - YES → cache issue, clear browser
   - NO → Sanity query issue

### Still not working?

**Debug steps:**
```bash
# 1. Check Sanity connection
curl http://localhost:3000/api/sanity-test

# 2. Restart dev server
npm run dev

# 3. Check console logs
# Look for: [Sanity] homePage loaded
```

---

## QUICK REFERENCE

| Method | Speed | Effort | Best For |
|--------|-------|--------|----------|
| Auto Test API | ⚡⚡⚡ | Low | Quick verify |
| DevTools Console | ⚡⚡ | Medium | Debug specific field |
| Visual Test | ⚡ | High | Final check |
| Sanity Vision | ⚡⚡⚡ | Low | Query testing |

**Recommended:** Use Auto Test API for daily work. Fast & reliable.

---

## EXAMPLE WORKFLOW

**Testing hero text change:**

```bash
# 1. Edit in Sanity Studio
heroSection.eyebrow = "NEW TEXT HERE"
→ Publish

# 2. Check API (instant)
curl http://localhost:3000/api/sanity-test | grep "NEW TEXT"

# 3. If found in API, check website
open http://localhost:3000
# Wait 60 sec, hard refresh

# 4. Verify visually
# Should see "NEW TEXT HERE" in hero
```

Done. 2 min total.
