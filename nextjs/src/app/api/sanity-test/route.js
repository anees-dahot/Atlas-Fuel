import {fetchSanity} from '@/lib/sanity'

export const dynamic = 'force-dynamic'

export async function GET() {
  const tests = [];

  try {
    // Test 1: Homepage Hero
    const homeData = await fetchSanity({query: `*[_id == "homePage"][0]{
      "heroEyebrow": heroSection.eyebrow,
      "heroTitle1": heroSection.titleLine1,
      "heroTitle2": heroSection.titleLine2,
      "heroDesc": heroSection.description
    }`, tags: ['homePage'], stega: false});

    tests.push({
      name: "Homepage Hero",
      status: homeData?.heroEyebrow ? "CONNECTED" : "MISSING",
      data: homeData
    });

    // Test 2: About Section
    const aboutData = await fetchSanity({query: `*[_id == "homePage"][0]{
      "aboutHeading": aboutSection.heading,
      "aboutBody": aboutSection.body
    }`, tags: ['homePage'], stega: false});

    tests.push({
      name: "Homepage About",
      status: aboutData?.aboutHeading ? "CONNECTED" : "MISSING",
      data: aboutData
    });

    // Test 3: Site Settings
    const settings = await fetchSanity({query: `*[_id == "siteSettings"][0]{
      phone, email, address
    }`, tags: ['siteSettings'], stega: false});

    tests.push({
      name: "Site Settings",
      status: settings?.phone ? "CONNECTED" : "MISSING",
      data: settings
    });

    // Test 4: News Posts
    const news = await fetchSanity({query: `*[_type == "newsPost"] | order(publishedAt desc)[0...3]{
      title, "slug": slug.current
    }`, tags: ['newsPost'], stega: false});

    tests.push({
      name: "News Posts",
      status: news?.length > 0 ? `CONNECTED (${news.length} posts)` : "MISSING",
      data: news
    });

    // Test 5: MegaMenu
    const menu = await fetchSanity({query: `*[_id == "megaMenu"][0]{
      "navItems": navItems[0...3].label
    }`, tags: ['megaMenu'], stega: false});

    tests.push({
      name: "MegaMenu",
      status: menu?.navItems?.length > 0 ? "CONNECTED" : "MISSING",
      data: menu
    });

    // Summary
    const passed = tests.filter(t => t.status.startsWith("CONNECTED")).length;
    const failed = tests.filter(t => t.status === "MISSING").length;

    return Response.json({
      summary: {
        total: tests.length,
        passed,
        failed,
        status: failed === 0 ? "ALL TESTS PASSED" : "SOME TESTS FAILED"
      },
      tests,
      instructions: {
        howToTest: [
          "1. Edit field in Sanity Studio",
          "2. Save & publish in Sanity",
          "3. Refresh the website or wait for the live-content event",
          "4. Refresh this endpoint: /api/sanity-test",
          "5. Check if new value appears in 'data' field"
        ],
        quickCheck: "Compare 'data' values with what you see on website",
        cacheNote: "Published changes use Sanity live events, with webhook and timed revalidation fallbacks."
      },
      timestamp: new Date().toISOString()
    }, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store'
      }
    });

  } catch (error) {
    return Response.json({
      error: error.message,
      status: "SANITY CONNECTION FAILED"
    }, { status: 500 });
  }
}
