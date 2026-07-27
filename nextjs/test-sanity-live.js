#!/usr/bin/env node

/**
 * SANITY LIVE TEST - Compare Sanity data with website HTML
 *
 * Usage:
 *   node test-sanity-live.js
 *
 * What it does:
 *   1. Fetches data from Sanity
 *   2. Fetches HTML from local website
 *   3. Checks if Sanity data appears in HTML
 *   4. Reports mismatches
 */

const { createClient } = require('next-sanity');

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'g84jdio4',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
});

const BASE_URL = 'http://localhost:3000';

async function fetchHTML(path) {
  try {
    const res = await fetch(`${BASE_URL}${path}`);
    return await res.text();
  } catch (error) {
    return null;
  }
}

async function testHomepage() {
  console.log('\n🏠 TESTING HOMEPAGE...\n');

  // Fetch from Sanity
  const sanityData = await client.fetch(`*[_type == "homePage"][0]{
    "eyebrow": heroSection.eyebrow,
    "title1": heroSection.titleLine1,
    "title2": heroSection.titleLine2,
    "description": heroSection.description,
    "aboutHeading": aboutSection.heading
  }`);

  // Fetch HTML
  const html = await fetchHTML('/');

  if (!html) {
    console.log('❌ Cannot fetch website. Is dev server running?');
    console.log('   Run: npm run dev');
    return;
  }

  // Test each field
  const tests = [
    { field: 'Hero Eyebrow', value: sanityData.eyebrow },
    { field: 'Hero Title Line 1', value: sanityData.title1 },
    { field: 'Hero Title Line 2', value: sanityData.title2 },
    { field: 'About Heading', value: sanityData.aboutHeading }
  ];

  let passed = 0;
  let failed = 0;

  tests.forEach(test => {
    if (!test.value) {
      console.log(`⚠️  ${test.field}: No data in Sanity`);
      return;
    }

    const found = html.includes(test.value);
    if (found) {
      console.log(`✅ ${test.field}: "${test.value}"`);
      passed++;
    } else {
      console.log(`❌ ${test.field}: "${test.value}" NOT FOUND in HTML`);
      failed++;
    }
  });

  console.log(`\n📊 Results: ${passed} passed, ${failed} failed`);
}

async function testSiteSettings() {
  console.log('\n⚙️  TESTING SITE SETTINGS...\n');

  const settings = await client.fetch(`*[_type == "siteSettings"][0]{ phone, email }`);
  const html = await fetchHTML('/');

  if (!html) return;

  const tests = [
    { field: 'Phone', value: settings.phone },
    { field: 'Email', value: settings.email }
  ];

  tests.forEach(test => {
    if (!test.value) {
      console.log(`⚠️  ${test.field}: No data in Sanity`);
      return;
    }

    const found = html.includes(test.value);
    console.log(`${found ? '✅' : '❌'} ${test.field}: "${test.value}"`);
  });
}

async function testNews() {
  console.log('\n📰 TESTING NEWS...\n');

  const posts = await client.fetch(`*[_type == "newsPost"][0...3]{ title, "slug": slug.current }`);
  const html = await fetchHTML('/');

  if (!html) return;

  console.log(`Found ${posts.length} news posts in Sanity`);

  posts.forEach(post => {
    const found = html.includes(post.title);
    console.log(`${found ? '✅' : '❌'} "${post.title}"`);
  });
}

async function main() {
  console.log('═══════════════════════════════════════════');
  console.log('🔍 SANITY LIVE CONNECTION TEST');
  console.log('═══════════════════════════════════════════');
  console.log(`\n📡 Testing connection to: ${BASE_URL}`);
  console.log(`📦 Sanity Project: g84jdio4`);
  console.log(`📊 Dataset: production\n`);

  try {
    await testHomepage();
    await testSiteSettings();
    await testNews();

    console.log('\n═══════════════════════════════════════════');
    console.log('✨ TEST COMPLETE');
    console.log('═══════════════════════════════════════════\n');
    console.log('💡 TIP: Edit a field in Sanity, wait 60 sec, run again\n');

  } catch (error) {
    console.log('\n❌ ERROR:', error.message);
    console.log('\nMake sure:');
    console.log('1. Dev server running: npm run dev');
    console.log('2. Sanity env vars set in .env.local');
  }
}

main();
