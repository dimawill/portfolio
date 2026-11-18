import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = process.cwd();
const contentDir = path.join(root, 'src/content/pocs');
const files = readdirSync(contentDir).filter((file) => file.endsWith('.md'));
const expectedCategories = [
  'solutions-architecture',
  'data-engineering',
  'ml-engineering',
  'ai-genai',
];

function frontmatter(source) {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  assert.ok(match, 'PoC markdown must have YAML frontmatter');
  return match[1];
}

test('each portfolio category has at least one PoC', () => {
  assert.ok(files.length >= 4);
  const categories = files.map((file) => {
    const content = readFileSync(path.join(contentDir, file), 'utf8');
    return frontmatter(content).match(/^category:\s*(.+)$/m)?.[1];
  });
  for (const category of expectedCategories) {
    assert.ok(categories.includes(category), `missing PoC for ${category}`);
  }
});

test('PoC markdown includes required fields, narrative sections, and an existing image', () => {
  const fields = ['title', 'category', 'summary', 'awsServices', 'repoUrl', 'demoUrl', 'image', 'date'];
  for (const file of files) {
    const content = readFileSync(path.join(contentDir, file), 'utf8');
    const metadata = frontmatter(content);
    for (const field of fields) assert.match(metadata, new RegExp(`^${field}:`, 'm'), `${file} is missing ${field}`);
    for (const heading of ['Problem', 'Architecture', 'Results']) assert.match(content, new RegExp(`^## ${heading}$`, 'm'));
    const image = metadata.match(/^image:\s*(.+)$/m)?.[1];
    assert.ok(image?.startsWith('/images/'), `${file} image must be under public/images`);
    assert.ok(existsSync(path.join(root, 'public', image.slice(1))), `${file} references a missing image`);
  }
});

test('Astro build outputs the homepage and one generated detail page per PoC', () => {
  const homepage = readFileSync(path.join(root, 'dist/index.html'), 'utf8');
  assert.match(homepage, /Dima Williams/);
  for (const label of ['Solutions Architecture', 'Data Engineering', 'ML Engineering', 'AI \/ GenAI']) {
    assert.ok(homepage.includes(label), `homepage is missing ${label}`);
  }
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const detail = readFileSync(path.join(root, `dist/pocs/${slug}/index.html`), 'utf8');
    const card = homepage.match(new RegExp(`<a class="project-card" href="[^"]*/pocs/${slug}/">([\\s\\S]*?)<\\/a>`))?.[1];
    assert.ok(card, `${file} has no homepage card`);
    assert.doesNotMatch(detail, /PLACEHOLDER POC/);
    assert.doesNotMatch(card, /PLACEHOLDER POC/);
    assert.match(detail, /Problem/);
    assert.match(detail, /Architecture/);
    assert.match(detail, /Results/);
  }
});


test('published PoC pages show one repository link and honest deployment status', () => {
  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const metadata = frontmatter(readFileSync(path.join(contentDir, file), 'utf8'));
    const repoUrl = metadata.match(/^repoUrl:\s*(.+)$/m)?.[1];
    const detail = readFileSync(path.join(root, `dist/pocs/${slug}/index.html`), 'utf8');
    const links = [...detail.matchAll(/<a\b[^>]*\bhref="([^"]+)"[^>]*>/g)];
    assert.equal(links.filter((match) => match[1] === repoUrl).length, 1, `${slug} must link to the repository once`);
    assert.match(detail, /View repository/);
    assert.match(detail, /Pending deployment/);
    assert.match(detail, /not deployed or hosted/);
    assert.doesNotMatch(detail, /Live demo|not been published|proposed repository/);
  }
});

test('homepage links use Dima’s real contact and company URLs', () => {
  const homepage = readFileSync(path.join(root, 'dist/index.html'), 'utf8');
  assert.match(homepage, /href="mailto:williams\.dima@gmail\.com"/);
  assert.match(homepage, /href="https:\/\/github\.com\/dimawill"/);
  assert.match(homepage, /href="https:\/\/www\.linkedin\.com\/in\/dima-williams\/"/);
  assert.match(homepage, /href="https:\/\/www\.cloudheightsolutions\.com\/"/);
  assert.doesNotMatch(homepage, /hello@example\.com|your-profile|your-username/);
});

test('Astro defaults target the dimawill GitHub Pages project URL and allow overrides', () => {
  const config = readFileSync(path.join(root, 'astro.config.mjs'), 'utf8');
  assert.match(config, /process\.env\.SITE_URL \\|\\| 'https:\/\/dimawill\.github\.io'/);
  assert.match(config, /process\.env\.PUBLIC_BASE_PATH \\|\\| '\/portfolio'/);
});

test('GitHub Pages deploy switches to a public CNAME when present', () => {
  const workflow = readFileSync(path.join(root, '.github/workflows/deploy.yml'), 'utf8');
  assert.ok(workflow.includes('if [[ -f public/CNAME ]];'));
  assert.ok(workflow.includes("export SITE_URL=\"https://$(tr -d '[:space:]' < public/CNAME)\""));
  assert.ok(workflow.includes('export PUBLIC_BASE_PATH="/"'));
});
