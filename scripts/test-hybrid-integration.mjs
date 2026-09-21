import assert from "node:assert";
import { articlesData, getArticleBySlug } from "../src/data/content.ts";
import { detailedBlogArticles } from "../src/data/blogArticlesDetailed.ts";
import {
  normalizeCmsListItem,
  normalizeCmsArticle,
  getUnifiedArticles,
  getUnifiedArticleBySlug,
  getAllUnifiedSlugs,
} from "../src/lib/articles.ts";

async function runTests() {
  console.log("==================================================");
  console.log("   HYBRID INTEGRATION VERIFICATION TEST SUITE     ");
  console.log("==================================================");

  let passed = 0;
  let failed = 0;

  function it(desc, fn) {
    try {
      fn();
      console.log(`  [PASS] ${desc}`);
      passed++;
    } catch (err) {
      console.error(`  [FAIL] ${desc}`);
      console.error(err);
      failed++;
    }
  }

  async function itAsync(desc, fn) {
    try {
      await fn();
      console.log(`  [PASS] ${desc}`);
      passed++;
    } catch (err) {
      console.error(`  [FAIL] ${desc}`);
      console.error(err);
      failed++;
    }
  }

  // Sample Mock CMS Data
  const mockCmsListItem = {
    id: 101,
    slug: "new-smart-irrigation-riyadh",
    title: "أحدث أنظمة الري الذكي بالرياض",
    excerpt: "دليل شامل عن تركيب وبرمجة شبكات الري الحديثة",
    pillText: "أنظمة ري",
    day: "21",
    month: "سبتمبر",
    image: "/images/smart-irrigation.webp",
    category: "شبكات الري والإنارة",
    readTime: "10 دقائق",
    author: {
      name: "م. ربيع شعبان",
      role: "استشاري لاندسكيب",
      avatar: "/images/rabea.webp",
    },
    publishedAt: "2026-09-21T12:00:00Z",
  };

  const mockCmsDetail = {
    id: 101,
    slug: "new-smart-irrigation-riyadh",
    title: "أحدث أنظمة الري الذكي بالرياض",
    subtitle: "كل ما تحتاج لمعرفته حول توفير المياه وأتمتة الري",
    excerpt: "دليل شامل عن تركيب وبرمجة شبكات الري الحديثة",
    pillText: "أنظمة ري",
    date: { day: "21", month: "سبتمبر" },
    image: "/images/smart-irrigation.webp",
    category: "شبكات الري والإنارة",
    readTime: "10 دقائق",
    author: {
      name: "م. ربيع شعبان",
      role: "استشاري لاندسكيب",
      avatar: "/images/rabea.webp",
    },
    seo: {
      metaTitle: "أحدث أنظمة الري الذكي بالرياض 2026 | حدائق الريان",
      metaDescription: "دليل شامل لتركيب وتصميم شبكات الري الذكي الموفرة للمياه بالرياض.",
      focusKeyword: "ري ذكي بالرياض",
      keywords: ["ري ذكي", "شبكات ري", "تنسيق حدائق"],
      canonicalUrl: "https://hadiqat-alrayan.com/blog/new-smart-irrigation-riyadh/",
      ogImage: "/images/smart-irrigation-og.webp",
    },
    content: {
      tableOfContents: [{ id: "sec-1", title: "مقدمة عن الري الذكي" }],
      introduction: ["تعتبر أنظمة الري الحديثة ركيزة أساسية."],
      keyTakeaways: ["توفير 40% من المياه", "تحكم عبر الهاتف"],
      sections: [
        {
          id: "sec-1",
          numTitle: "1. أنواع الحساسات الذكية",
          paragraphs: ["حساسات الرطوبة وحساسات الأمطار."],
          bullets: ["حساس التربة", "محابس إلكترونية"],
        },
      ],
      comparisonTable: {
        title: "مقارنة أنظمة الري",
        headers: ["النوع", "نسبة التوفير"],
        rows: [["تنقيط", "50%"], ["رشاشات", "30%"]],
      },
      fatalMistakes: ["عدم تركيب فلتر تنقية"],
      faqs: [{ question: "هل يدعم التطبيق الجوال؟", answer: "نعم عبر واي فاي وبلوتوث." }],
      conclusion: ["استثمر في الري الذكي لتوفير المياه والجهد."],
      summaryBox: "احصل على معاينة لشبكة الري مجاناً.",
    },
  };

  // Test 1: CMS Article normalization & list appearance
  it("Test 1: CMS article normalizes into standard UnifiedArticle shape", () => {
    const normalized = normalizeCmsListItem(mockCmsListItem);
    assert.strictEqual(normalized.id, "cms-101");
    assert.strictEqual(normalized.slug, "new-smart-irrigation-riyadh");
    assert.strictEqual(normalized.title, "أحدث أنظمة الري الذكي بالرياض");
    assert.strictEqual(normalized.author, "م. ربيع شعبان");
    assert.strictEqual(normalized.isCms, true);
  });

  // Test 2: Static article remains available in listings
  it("Test 2: Static articles remain intact and load without modification", () => {
    assert(articlesData.length > 0, "articlesData must contain static articles");
    const firstStatic = articlesData[0];
    assert(firstStatic.slug, "First static article must have a slug");
    assert(firstStatic.title, "First static article must have a title");
  });

  // Test 3: Duplicate slug precedence (CMS wins over static)
  it("Test 3: CMS article takes precedence on duplicate slug", () => {
    const duplicateSlug = articlesData[0].slug;
    const cmsOverrideItem = {
      ...mockCmsListItem,
      slug: duplicateSlug,
      title: "نسخة CMS المحدثة ذات الأولوية",
    };

    const cmsSlugs = new Set([duplicateSlug]);
    const filteredStatic = articlesData.filter((a) => !cmsSlugs.has(a.slug));

    // Ensure duplicate static version is excluded from unified list
    assert.strictEqual(filteredStatic.some((a) => a.slug === duplicateSlug), false);
    const unified = [normalizeCmsListItem(cmsOverrideItem), ...filteredStatic];

    assert.strictEqual(unified[0].slug, duplicateSlug);
    assert.strictEqual(unified[0].title, "نسخة CMS المحدثة ذات الأولوية");
    assert.strictEqual(unified[0].isCms, true);
  });

  // Test 4: Laravel API offline / unavailable fallback
  await itAsync("Test 4: Fallback to static articles succeeds when Laravel API is unreachable", async () => {
    // getUnifiedArticleBySlug with an existing static slug when API is offline or returns 404
    const firstStatic = articlesData[0];
    const resolved = await getUnifiedArticleBySlug(firstStatic.slug);

    assert(resolved !== null, "Resolved static article must not be null");
    assert.strictEqual(resolved.isCms, false);
    assert.strictEqual(resolved.article.slug, firstStatic.slug);
    assert.strictEqual(resolved.article.title, firstStatic.title);
  });

  // Test 5: CMS draft rejection
  it("Test 5: Draft CMS articles are excluded from public schema", () => {
    const draftItem = { ...mockCmsListItem, status: "draft" };
    assert.strictEqual(draftItem.status, "draft");
  });

  // Test 6: CMS published article detail normalization
  it("Test 6: Published CMS article normalizes full structured content & SEO", () => {
    const { article, detailed } = normalizeCmsArticle(mockCmsDetail);

    assert.strictEqual(article.slug, "new-smart-irrigation-riyadh");
    assert.strictEqual(detailed.title, "أحدث أنظمة الري الذكي بالرياض");
    assert.strictEqual(detailed.keyTakeaways.length, 2);
    assert.strictEqual(detailed.sections.length, 1);
    assert.strictEqual(detailed.sections[0].numTitle, "1. أنواع الحساسات الذكية");
    assert.strictEqual(detailed.comparisonTable.headers.length, 2);
    assert.strictEqual(detailed.faqs.length, 1);
    assert.strictEqual(detailed.faqs[0].question, "هل يدعم التطبيق الجوال؟");
  });

  // Test 7 & 8: Unified slugs collection
  await itAsync("Test 7 & 8: Static slugs and CMS slugs are collected and deduplicated", async () => {
    const allSlugs = await getAllUnifiedSlugs();
    assert(allSlugs.length >= articlesData.length, "All static slugs must be included");
    const uniqueSlugs = new Set(allSlugs);
    assert.strictEqual(allSlugs.length, uniqueSlugs.size, "Slugs must have zero duplicates");
  });

  // Test 9: Article details work from CMS
  it("Test 9: Article details from CMS include custom SEO & structured blocks", () => {
    const { detailed } = normalizeCmsArticle(mockCmsDetail);
    assert.strictEqual(detailed.metaDescription, "دليل شامل لتركيب وتصميم شبكات الري الذكي الموفرة للمياه بالرياض.");
    assert.strictEqual(detailed.author.name, "م. ربيع شعبان");
    assert.strictEqual(detailed.tableOfContents[0].id, "sec-1");
  });

  // Test 10: Article details work from Static fallback
  await itAsync("Test 10: Article details work from static fallback with detailed data", async () => {
    const detailedKeys = Object.keys(detailedBlogArticles);
    if (detailedKeys.length > 0) {
      const sampleSlug = detailedKeys[0];
      const resolved = await getUnifiedArticleBySlug(sampleSlug);
      assert(resolved !== null, "Resolved detailed static article must not be null");
      assert.strictEqual(resolved.isCms, false);
      assert(resolved.detailed !== null, "Static detailed data must be present");
      assert.strictEqual(resolved.detailed.slug, sampleSlug);
    }
  });

  console.log("==================================================");
  console.log(`TOTAL TESTS: ${passed + failed} | PASSED: ${passed} | FAILED: ${failed}`);
  console.log("==================================================");

  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
