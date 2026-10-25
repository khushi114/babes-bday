import test from 'node:test'
import assert from 'node:assert'
import fs from 'node:fs'
import path from 'node:path'

test('Website contains all required story chapters and sections with concise copy', () => {
  const contentConfigPath = path.resolve('src/contentConfig.ts')
  const content = fs.readFileSync(contentConfigPath, 'utf8')

  // Verify personal names & nicknames
  assert.ok(content.includes('Parthiv'), 'Must contain Parthiv')
  assert.ok(content.includes('babesssss'), 'Must contain babesssss')
  assert.ok(content.includes('your happiness'), 'Must contain your happiness')

  // Verify real story milestones
  assert.ok(content.includes('Ganpati Visarjan'), 'Must contain Ganpati Visarjan')
  assert.ok(content.includes('two weeks'), 'Must contain two weeks')
  assert.ok(content.includes('crossed paths'), 'Must contain crossed paths')

  // Verify key quote
  assert.ok(
    content.includes('Maybe the universe was waiting for the right moment to bring us together'),
    'Must contain core quote'
  )

  // Verify updated concise chapters
  assert.ok(content.includes('Before We Found Each Other'), 'Must have Chapter 1: Before We Found Each Other')
  assert.ok(content.includes('That Ganpati Visarjan Day'), 'Must have Chapter 2: That Ganpati Visarjan Day')
  assert.ok(content.includes('Two Weeks, Yet So Familiar'), 'Must have Chapter 3: Two Weeks, Yet So Familiar')

  // Verify new first hug and first kiss moment
  assert.ok(content.includes('Two Firsts, A Thousand Feelings ♡'), 'Must have Two Firsts, A Thousand Feelings title')
  assert.ok(content.includes('Our first hug'), 'Must contain our first hug')
  assert.ok(content.includes('our first kiss'), 'Must contain our first kiss')

  // Verify 3 envelopes
  assert.ok(content.includes('Open when you miss me'), 'Must have envelope 1')
  assert.ok(content.includes('Open when you need comfort'), 'Must have envelope 2')
  assert.ok(content.includes('Open when you wonder how we happened'), 'Must have envelope 3')

  // Verify secret surprise text
  assert.ok(
    content.includes('Babesssss, there is one more little thing hidden here for you'),
    'Must have surprise clue'
  )
  assert.ok(
    content.includes('Follow the little stars ♡'),
    'Must have secret star trail button'
  )
  assert.ok(
    content.includes('Only for Parthiv ♡'),
    'Must have sealed secret letter'
  )

  // Verify concise birthday wish section
  assert.ok(
    content.includes('One birthday. A thousand possibilities. A universe full of wishes.'),
    'Must have birthday wish heading'
  )
  assert.ok(
    content.includes('Make a wish, babesssss.'),
    'Must have concise wish text'
  )

  // Verify Gift Boutique and 6 Gifts
  assert.ok(
    content.includes('Okay, birthday boy... your happiness has a few surprises for you! 🎀'),
    'Must have Gift Boutique heading'
  )
  assert.ok(
    content.includes('Your little collection of surprises'),
    'Must have collection progress title'
  )
  assert.ok(content.includes('A Little Letter From Me'), 'Must have Gift 1: Letter')
  assert.ok(content.includes('A Universe Just for You'), 'Must have Gift 2: Universe')
  assert.ok(content.includes('Your Emergency Hug'), 'Must have Gift 3: Hug')
  assert.ok(content.includes('Our Precious Firsts'), 'Must have Gift 4: Firsts')
  assert.ok(content.includes('A Wish for Your New Year'), 'Must have Gift 5: Wish')
  assert.ok(content.includes('One Last Little Surprise'), 'Must have Gift 6: Mystery')
  assert.ok(content.includes('One last thing from your happiness ♡'), 'Must have final gift reveal button')

  const appTsxContent = fs.readFileSync(path.resolve('src/App.tsx'), 'utf8')
  assert.ok(appTsxContent.includes('SectionGiftBoutique'), 'App.tsx must mount SectionGiftBoutique')
  assert.ok(fs.existsSync(path.resolve('src/components/SectionGiftBoutique.tsx')), 'SectionGiftBoutique.tsx must exist')

  // Verify photo gallery remains completely removed
  assert.strictEqual(
    content.includes('Our Little Memory Universe'),
    false,
    'Photo gallery section heading must remain completely removed'
  )
  assert.strictEqual(
    fs.existsSync(path.resolve('src/components/SectionSixMemories.tsx')),
    false,
    'SectionSixMemories component must remain deleted'
  )
  const appTsx = fs.readFileSync(path.resolve('src/App.tsx'), 'utf8')
  assert.strictEqual(
    appTsx.includes('SectionSixMemories'),
    false,
    'App.tsx must not reference SectionSixMemories'
  )
})

test('Production build output files exist and are valid', () => {
  const distHtml = path.resolve('dist/index.html')
  assert.ok(fs.existsSync(distHtml), 'dist/index.html must exist')
  const htmlContent = fs.readFileSync(distHtml, 'utf8')
  assert.ok(htmlContent.includes('A Little Universe Made For Parthiv ♡'), 'dist HTML must contain page title')
})
