import { client } from '@/lib/sanity';

/**
 * TEST ENDPOINT - Check if Sanity changes showing on website
 * Visit: http://localhost:3000/api/sanity-test
 */
export async function GET() {
  const tests = [];

  try {
    // Test 1: Homepage Hero
    const homeData = await client.fetch(`*[_type == "homePage"][0]{
      "heroEyebrow": heroSection.eyebrow,
      "heroTitle1": heroSection.titleLine1,
      "heroTitle2": heroSection.titleLine2,
      "heroDesc": heroSection.description
    }`);

    tests.push({
      name: "Homepage Hero",
      status: homeData?.heroEyebrow ? "✅ CONNECTED" : "❌ MISSING",
      data: homeData
    });

    // Test 2: About Section
    const aboutData = await client.fetch(`*[_type == "homePage"][0]{
      "aboutHeading": aboutSection.heading,
      "aboutBody": aboutSection.body
    }`);

    tests.push({
      name: "Homepage About",
      status: aboutData?.aboutHeading ? "✅ CONNECTED" : "❌ MISSING",
      data: aboutData
    });

    // Test 3: Site Settings
    const settings = await client.fetch(`*[_type == "siteSettings"][0]{
      phone, email, address
    }`);

    tests.push({
      name: "Site Settings",
      status: settings?.phone ? "✅ CONNECTED" : "❌ MISSING",
      data: settings
    });

    // Test 4: News Posts
    const news = await client.fetch(`*[_type == "newsPost"] | order(publishedAt desc)[0...3]{
      title, "slug": slug.current
    }`);

    tests.push({
      name: "News Posts",
      status: news?.length > 0 ? `✅ CONNECTED (${news.length} posts)` : "❌ MISSING",
      data: news
    });

    // Test 5: MegaMenu
    const menu = await client.fetch(`*[_type == "megaMenu"][0]{
      "navItems": navItems[0...3].label
    }`);

    tests.push({
      name: "MegaMenu",
      status: menu?.navItems?.length > 0 ? "✅ CONNECTED" : "❌ MISSING",
      data: menu
    });

    // Summary
    const passed = tests.filter(t => t.status.includes("✅")).length;
    const failed = tests.filter(t => t.status.includes("❌")).length;

    return Response.json({
      summary: {
        total: tests.length,
        passed,
        failed,
        status: failed === 0 ? "🎉 ALL TESTS PASSED" : "⚠️ SOME TESTS FAILED"
      },
      tests,
      instructions: {
        howToTest: [
          "1. Edit field in Sanity Studio",
          "2. Save & publish in Sanity",
          "3. Wait 60 seconds (revalidation time)",
          "4. Refresh this endpoint: /api/sanity-test",
          "5. Check if new value appears in 'data' field"
        ],
        quickCheck: "Compare 'data' values with what you see on website",
        cacheNote: "Site revalidates every 60 seconds. Changes may take up to 1 min to appear."
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
      status: "❌ SANITY CONNECTION FAILED"
    }, { status: 500 });
  }
}
