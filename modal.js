(() => {
'use strict';

// Patch-note modal styles and behavior are owned by this single file.
const modalStyle = document.createElement('style');
modalStyle.id = 'nexus-patch-modal-style';
modalStyle.textContent = String.raw`/* 모달: 넥서스 패치노트 — 어두운 배경, 금색 포인트, 압축된 카드 목록. */
#nexusPatchDialog {
 --accent:#dfbe83; --g:#dfbe83; --patch-canvas:#0d1015; --patch-card:#171b23; --patch-body:#11151d;
 position:fixed; inset:0; margin:auto; width:min(820px,calc(100vw - 48px)); height:min(750px,calc(100dvh - 64px));
 max-width:none; max-height:none; padding:0; overflow:hidden; border:1px solid #776340; border-radius:16px;
 background:var(--patch-canvas); color:var(--ink); box-shadow:0 30px 110px #000e, 0 0 0 1px #ffffff07;
 font:calc(13px * var(--fs-scale))/1.5 var(--font-body);
}
#nexusPatchDialog[open] { display:flex; flex-direction:column; }
#nexusPatchDialog::backdrop { background:#000c; backdrop-filter:blur(5px); }
#nexusPatchDialog [hidden] { display:none!important; }
#nexusPatchDialog button,#nexusPatchDialog input { font:inherit; }
#nexusPatchDialog button { transition:background .15s,color .15s,border-color .15s; }
#nexusPatchDialog :is(button,input,summary):focus-visible { outline:2px solid var(--accent); outline-offset:2px; }

/* Brand header and compact controls. */
#nexusPatchDialog .patch-heading { display:flex; align-items:center; justify-content:space-between; gap:16px; flex-shrink:0; padding:17px 22px 15px; border-bottom:1px solid #343039; background:linear-gradient(125deg,#242027 0%,#191b22 50%,#11151c 100%); }
#nexusPatchDialog .patch-title { display:flex; align-items:center; gap:12px; min-width:0; }
#nexusPatchDialog .patch-emblem { display:grid; place-items:center; width:42px; height:42px; flex-shrink:0; border:1px solid #8e744c; border-radius:12px; background:linear-gradient(145deg,#4a3b28,#22252f 82%); color:#f1d399; box-shadow:inset 0 1px 0 #ffffff20,0 4px 12px #0005; }
#nexusPatchDialog .patch-emblem svg { width:22px; height:22px; }
#nexusPatchDialog .patch-kicker { display:block; margin-bottom:2px; color:#c5ac82; font:600 9px/1.3 var(--font-mono); letter-spacing:.14em; }
#nexusPatchDialog h2 { color:#f3e3c5; font-size:20px; font-weight:700; line-height:1.18; letter-spacing:-.5px; }
#nexusPatchDialog .patch-subtitle { margin-top:4px; color:#abb1be; font-size:11px; line-height:1.2; }
#patch-close { display:grid; place-items:center; width:33px; height:33px; flex-shrink:0; border:1px solid #484954; border-radius:8px; background:#20222a; color:#c3c8d3; }
#patch-close:hover { border-color:#9a825b; background:#302c2a; color:#f4dba9; }
#nexusPatchDialog .patch-controls { padding:12px 22px 12px; flex-shrink:0; border-bottom:1px solid #313744; background:#12161d; }
#nexusPatchDialog .patch-toolbar { display:flex; align-items:center; gap:8px; margin-bottom:10px; }
#patch-refresh { flex-shrink:0; min-height:36px; padding:5px 11px; border:1px solid #454e5e; border-radius:8px; background:#212834; color:#c7d1e0; font-size:11px!important; font-weight:600!important; }
#patch-refresh:hover:not(:disabled) { background:#303a4c; border-color:#8294b0; color:#fff; }
#nexusPatchDialog .patch-search { flex:1; min-width:0; display:flex; align-items:center; gap:9px; min-height:36px; padding:0 11px; border:1px solid #3e4756; border-radius:8px; background:#0b0f15; transition:border-color .15s,box-shadow .15s; }
#nexusPatchDialog .patch-search:focus-within { border-color:#cba96b; box-shadow:0 0 0 2px #cba96b22; }
#nexusPatchDialog .patch-search svg { width:15px; height:15px; flex-shrink:0; color:#929fb4; }
#nexusPatchDialog .patch-search input { flex:1; width:100%; min-width:0; min-height:34px; border:0; outline:none; background:transparent; color:#edf1f8; font-size:12px; }
#nexusPatchDialog input::placeholder { color:#8b95a6; }
#nexusPatchDialog .patch-filter-row { display:flex; align-items:center; justify-content:space-between; gap:8px 12px; flex-wrap:wrap; }
#nexusPatchDialog .tag-filters { display:flex; align-items:center; gap:5px; flex-wrap:wrap; }
#nexusPatchDialog .tag-filters button { min-height:30px; padding:4px 12px; border:1px solid #3b4351; border-radius:7px; background:#171c25; color:#aeb8c8; font-size:11px; }
#nexusPatchDialog .tag-filters button:hover { background:#242c39; color:#edf2fa; }
#nexusPatchDialog .tag-filters [aria-pressed="true"] { border-color:#b99b69; background:#443829; color:#f6dca8; font-weight:700; box-shadow:inset 0 1px 0 #ffffff10; }
#nexusPatchDialog .tag-filters [data-news="신규히든"][aria-pressed="true"] { border-color:#689d91; background:#1b3936; color:#a4e9d4; }

/* Readable compact list; complete records remain in the full history. */
#nexusPatchDialog .patch-scroll { flex:1; min-height:0; overflow:auto; padding:14px 22px 18px; background:radial-gradient(ellipse at 50% -15%,#19202b 0,transparent 62%),var(--patch-canvas); scrollbar-width:thin; scrollbar-color:#505969 transparent; }
#nexusPatchDialog .result-strip { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:4px 12px; margin-bottom:11px; }
#nexusPatchDialog .result-summary { display:flex; align-items:center; gap:8px; color:#aeb8c8; font-size:11px; }
#nexusPatchDialog .result-summary::before { content:''; width:3px; height:13px; flex-shrink:0; border-radius:2px; background:#ddba7c; box-shadow:0 0 10px #ddba7c35; }
#nexusPatchDialog .empty { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; min-height:200px; padding:25px 20px; border:1px dashed #454e5d; border-radius:12px; background:#161b24; color:#c1c9d7; text-align:center; font-size:13px; line-height:1.6; text-wrap:balance; }
#nexusPatchDialog .empty::before { content:'—'; display:grid; place-items:center; width:42px; height:42px; border:1px solid #555362; border-radius:50%; background:#222735; color:#dcc18e; font-size:19px; }
#patch-notes { display:grid; gap:7px; }
#patch-notes details { --release-tone:#afc7e8; --release-rgb:175,199,232; position:relative; min-width:0; overflow-wrap:anywhere; border:1px solid #343c4a; border-radius:10px; background:linear-gradient(105deg,rgba(var(--release-rgb),.065),transparent 55%),var(--patch-card); box-shadow:0 3px 9px #0003; transition:border-color .15s,background-color .15s,transform .15s; }
#patch-notes details[data-kind="hidden"] { --release-tone:#95d9c3; --release-rgb:149,217,195; }
#patch-notes details[data-kind="version"] { --release-tone:#bfceec; --release-rgb:191,206,236; }
#patch-notes details:hover { border-color:#6c7687; transform:translateY(-1px); }
#patch-notes details[open] { border-color:var(--release-tone); box-shadow:0 0 0 1px rgba(var(--release-rgb),.15),0 12px 28px #0007; transform:none; }
#nexusPatchDialog .note-header { display:block; padding:10px 13px 10px 14px; border-left:3px solid var(--release-tone); border-radius:9px; list-style:none; cursor:pointer; scroll-margin-top:8px; }
#nexusPatchDialog .note-header::marker { content:''; }
#nexusPatchDialog .note-header::-webkit-details-marker { display:none; }
#nexusPatchDialog .note-header:hover { background:rgba(var(--release-rgb),.055); }
#nexusPatchDialog details[open]>.note-header { border-bottom:1px solid #3d4959; border-radius:9px 9px 0 0; background:rgba(var(--release-rgb),.075); }
#nexusPatchDialog .note-heading { display:flex; flex-direction:column; gap:5px; min-width:0; }
#nexusPatchDialog .note-topline { display:flex; align-items:center; flex-wrap:wrap; gap:4px 10px; min-width:0; }
#nexusPatchDialog .note-identity { display:flex; align-items:center; flex:1 1 180px; flex-wrap:wrap; gap:4px 6px; min-width:0; }
#nexusPatchDialog .note-release-badge { display:inline-flex; align-items:center; min-height:23px; padding:2px 8px; border:1px solid rgba(var(--release-rgb),.5); border-radius:6px; background:rgba(var(--release-rgb),.12); color:var(--release-tone); font:700 11px/1.35 var(--font-mono); letter-spacing:.01em; }
#nexusPatchDialog .change-tag { padding:2px 7px; border:1px solid #4c596b; border-radius:5px; background:#293243; color:#d0dbee; font-size:10px; line-height:1.45; }
#nexusPatchDialog .note-meta { flex:0 0 auto; margin-left:auto; text-align:right; white-space:nowrap; }
#nexusPatchDialog time { display:block; color:#a5b1c2; font:10px/1.5 var(--font-mono); font-variant-numeric:tabular-nums; letter-spacing:0; white-space:nowrap; }
#nexusPatchDialog .note-description { display:flex; align-items:baseline; gap:9px; min-width:0; }
#nexusPatchDialog .note-kind-label { flex-shrink:0; color:#9ba9c0; font:9px/1.5 var(--font-mono); letter-spacing:.06em; white-space:nowrap; }
#nexusPatchDialog .release-label { min-width:0; overflow:hidden; color:#e4eaf4; font-size:11.5px; font-weight:500; line-height:1.45; text-overflow:ellipsis; white-space:nowrap; }
/* Rich GitHub issue body; all content is mounted only for the selected note. */
#nexusPatchDialog .note-body { padding:15px 16px; border-radius:0 0 10px 10px; background:var(--patch-body); color:#dce0e8; font-size:12.5px; line-height:1.65; }
#nexusPatchDialog .note-body>*+* { margin-top:8px; }
#nexusPatchDialog .note-body h4 { margin-top:15px; margin-bottom:7px; padding-left:10px; border-left:2px solid #a39377; color:#ede9e2; font-size:14px; }
#nexusPatchDialog .note-body h4:first-child { margin-top:0; }
#nexusPatchDialog .note-body ul,#nexusPatchDialog .note-body ol { padding-left:18px; }
#nexusPatchDialog .note-body li+li { margin-top:4px; }
#nexusPatchDialog .note-body strong { color:var(--ink); font-weight:600; }
#nexusPatchDialog .note-body em { font-style:italic; }
#nexusPatchDialog a { color:var(--accent); }
#nexusPatchDialog .note-body pre { overflow:auto; padding:9px; border-radius:7px; background:var(--bg); }
#nexusPatchDialog .note-body code { padding:2px 4px; border-radius:3px; background:#252a33; font-family:var(--font-mono); }
#nexusPatchDialog .note-body pre code { padding:0; background:none; }
#nexusPatchDialog .note-body blockquote { padding-left:12px; border-left:2px solid var(--line); }
#nexusPatchDialog .note-body hr { border:0; border-top:1px solid var(--line); }
#nexusPatchDialog .note-body table { display:block; overflow:auto; border-collapse:collapse; }
#nexusPatchDialog .note-body th,#nexusPatchDialog .note-body td { padding:4px 7px; border:1px solid var(--line); }
#nexusPatchDialog .plain-body { white-space:pre-wrap; }
#nexusPatchDialog .image-link { display:inline-block; max-width:100%; margin-top:8px; }
#nexusPatchDialog .note-image { display:block; max-width:100%; max-height:440px; width:auto; height:auto; border:1px solid var(--line); border-radius:8px; }
#nexusPatchDialog .image-error { display:block; padding:12px; border:1px dashed var(--line); }

/* Sticky reader controls keep navigation title-free and compact. */
#nexusPatchDialog .patch-reader-nav { display:grid; grid-template-columns:100px minmax(0,1fr) 100px; align-items:center; gap:10px; flex-shrink:0; padding:10px 22px; border-top:1px solid #3c3b3a; background:linear-gradient(110deg,#1d2029,#12161e); box-shadow:0 -6px 20px #0005; }
#nexusPatchDialog .patch-reader-nav button { display:flex; align-items:center; justify-content:center; gap:7px; min-height:33px; border:1px solid #535f72; border-radius:7px; background:#283243; color:#dce6f2; font-size:12px; }
#nexusPatchDialog .patch-reader-nav button:not(:disabled):hover { border-color:#c2a36f; background:#3c3740; color:#f8e3bc; }
#nexusPatchDialog .patch-reader-nav button:disabled { opacity:.4; cursor:not-allowed; }
#nexusPatchDialog .patch-reader-nav button>span { font-size:21px; line-height:1; }
#nexusPatchDialog .patch-reader-current { min-width:0; text-align:center; }
#patch-reader-position { display:block; color:#e3c99e; font:600 11px var(--font-mono); }

/* All responsive changes are kept with the patch-notes feature. */
@media(max-width:767px) { .global-header .gh-left { padding-right:158px; } }
@media(max-width:540px) {
 #nexusPatchDialog { width:calc(100vw - 20px); height:calc(100dvh - 24px); border-radius:13px; }
 #nexusPatchDialog .patch-heading { gap:10px; padding:13px 13px 12px; }
 #nexusPatchDialog .patch-title { gap:9px; }
 #nexusPatchDialog .patch-emblem { width:35px; height:37px; }
 #nexusPatchDialog .patch-emblem svg { width:19px; height:19px; }
 #nexusPatchDialog .patch-kicker { font-size:8px; }
 #nexusPatchDialog h2 { font-size:18px; }
 #nexusPatchDialog .patch-subtitle { font-size:10px; }
 #nexusPatchDialog .patch-controls { padding:10px 12px 11px; }
 #nexusPatchDialog .patch-toolbar { gap:6px; margin-bottom:8px; }
 #nexusPatchDialog .patch-search input { font-size:11px; }
 #patch-refresh { padding-inline:9px; font-size:10px!important; }
 #nexusPatchDialog .tag-filters button { min-height:29px; padding:3px 10px; }
 #nexusPatchDialog .patch-scroll { padding:12px 11px 16px; }
 #nexusPatchDialog .result-strip { margin-bottom:9px; }
 #nexusPatchDialog .note-header { padding:9px 9px 9px 10px; }
 #nexusPatchDialog .note-identity { flex-basis:150px; }
 #nexusPatchDialog .note-release-badge { min-height:22px; font-size:10px; }
 #nexusPatchDialog .note-kind-label { font-size:8px; }
 #nexusPatchDialog .release-label { font-size:11px; }
 #nexusPatchDialog .note-body { padding:12px 11px; }
 #nexusPatchDialog .patch-reader-nav { grid-template-columns:75px minmax(0,1fr) 75px; gap:8px; padding:8px 11px; }
 #nexusPatchDialog .patch-reader-nav button { font-size:11px; }
}
@media(max-width:360px) {
 #nexusPatchDialog .tag-filters button { padding-inline:8px; }
 #nexusPatchDialog .note-description { gap:6px; }
}
@media(prefers-reduced-motion:reduce) {
 #patch-notes details,#nexusPatchDialog button,#nexusPatchDialog .patch-search { transition:none; }
 #patch-notes details:hover { transform:none; }
}`;
document.head.appendChild(modalStyle);

const $ = (id) => document.getElementById('patch-' + id);
const repository = 'nxsbuild/nexus';
const ownerId = 350676179;
const products = { nexus: '넥서스' };
const dateFormat = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Seoul',
  year: 'numeric', month: '2-digit', day: '2-digit',
  hour: '2-digit', minute: '2-digit', hour12: false,
});

function formatPublishedAt(value) {
  const parts = Object.fromEntries(dateFormat.formatToParts(new Date(value))
    .map(({ type, value }) => [type, value]));
  return `${parts.year}.${parts.month}.${parts.day} ${parts.hour}:${parts.minute}`;
}
const refreshInterval = 60_000;

const dialog = document.getElementById('nexusPatchDialog');
const query = (selector) => dialog.querySelector(selector);
const queryAll = (selector) => dialog.querySelectorAll(selector);
const trigger = document.getElementById('btnPatchNotes');
let activeNoteNumber = null;
let notes = [];
const filter = 'nexus';
let searchText = '';

const newsFilters = { nexus: 'all' };
let listScrollTop = 0;
let lastAttempt = 0;
let nextAttempt = 0;
let loading = false;

function element(tag, value, className) {
  const node = document.createElement(tag);
  node.textContent = value;
  if (className) node.className = className;
  return node;
}

function toNote(issue) {
  if (issue.pull_request || issue.user?.id !== ownerId) return null;
  if (/^\[(빌더|공통)(?:\s|\])/u.test(issue.title.trim())) return null;
  if (!issue.body?.trim()) return null;
  const rawTitle = issue.title.trim();
  const hashtags = [...rawTitle.matchAll(/#([^\s#,，|\[\]]+)/gu)].map((tag) => tag[1]);
  const withoutTags = rawTitle.replace(/#[^\s#,，|\[\]]+/gu, '').trim();
  const bracket = /^\[([^\]]+)\]\s*(.*)$/u.exec(withoutTags);
  const classification = (bracket ? bracket[1] : withoutTags).replace(/^넥서스(?:\s+|$)/u, '').trim();
  const versionMatch = /^(v\d[\w.-]*)(?=\s|$)/iu.exec(classification);
  const version = versionMatch?.[1];
  const tags = [...new Set(hashtags)];
  const isHidden = /^신규히든(?:\s|$)/u.test(classification);
  const kind = version ? 'version' : isHidden || tags.includes('신규히든') ? 'hidden' : 'general';
  let remaining = classification;
  if (version) remaining = remaining.slice(version.length).replace(/^\s*업데이트(?:\s+|$)/u, '').trim();
  else if (isHidden) remaining = remaining.replace(/^신규히든(?:\s+업데이트)?(?:\s+|$)/u, '').trim();
  const title = [remaining, bracket ? bracket[2] : ''].filter(Boolean).join(' ').replace(/[\[\]]/g, '').replace(/\s+/gu, ' ').trim();
  const category = version || (kind === 'hidden' ? '신규히든' : '패치노트');
  const name = ['넥서스', category, title].filter(Boolean).join(' ');
  return {
    product: 'nexus', kind, category, version, title, tags, name, body: issue.body.trim(), html: issue.body_html,
    number: issue.number, publishedAt: issue.created_at,
  };
}

const bodyTags = new Set([
  'p', 'ul', 'ol', 'li', 'strong', 'em', 'del', 'code', 'pre', 'blockquote',
  'hr', 'br', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'a',
]);

function httpsUrl(value) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' ? url : null;
  } catch {
    return null;
  }
}

function renderBody(note) {
  const body = element('div', '', 'note-body');
  if (!note.html) {
    body.append(element('p', note.body, 'plain-body'));
    return body;
  }

  const template = document.createElement('template');
  template.innerHTML = note.html;
  const attachments = note.body.match(/https:\/\/github\.com\/user-attachments\/assets\/[a-f0-9-]{36}/gi) ?? [];
  const duplicateTitles = new Set([note.name, note.name + ' 안내']);
  const duplicateHeading = [...template.content.children].find((node) => /^H[1-6]$/.test(node.tagName));

  function append(parent, node) {
    if (node.nodeType === Node.TEXT_NODE) {
      parent.append(node.textContent);
      return;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return;
    const tag = node.tagName.toLowerCase();
    if (['script', 'style', 'iframe', 'object'].includes(tag)) return;
    if (node === duplicateHeading && duplicateTitles.has(node.textContent.trim())) return;

    if (tag === 'img') {
      const src = httpsUrl(node.getAttribute('src'));
      if (!src) return;
      // Use the stable attachment URL instead of GitHub's expiring signed URL.
      const attachment = attachments.find((url) => src.pathname.includes(url.split('/').pop()));
      const imageUrl = attachment ?? src.href;
      const alt = node.getAttribute('alt');
      const image = element('img', '', 'note-image');
      image.alt = alt && alt.toLowerCase() !== 'image' ? alt : note.name + ' 첨부 이미지';
      image.loading = 'lazy';
      image.decoding = 'async';
      image.referrerPolicy = 'no-referrer';
      image.addEventListener('error', () => {
        image.hidden = true;
        link.append(element('span', '이미지를 불러오지 못했습니다. 원본 보기 ↗', 'image-error'));
      }, { once: true });
      image.src = imageUrl;
      const link = element('a', '', 'image-link');
      link.href = imageUrl;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.append(image);
      parent.append(link);
      return;
    }

    const isHeading = /^h[1-6]$/.test(tag);
    const href = tag === 'a' && !node.querySelector('img') ? httpsUrl(node.getAttribute('href')) : null;
    const allowed = isHeading || (bodyTags.has(tag) && (tag !== 'a' || href));
    const output = allowed ? document.createElement(isHeading ? 'h4' : tag) : parent;
    if (href) {
      output.href = href.href;
      output.rel = 'noopener noreferrer';
    }
    for (const child of node.childNodes) append(output, child);
    if (allowed) parent.append(output);
  }

  for (const node of template.content.childNodes) append(body, node);
  return body;
}

function selectedNotes() {
  return notes.filter((note) => note.product === filter &&
    (newsFilters[filter] === 'all' || (newsFilters[filter] === '신규히든' ? note.kind === 'hidden' : note.kind !== 'hidden')) &&
    [note.name, ...note.tags, note.body].join(' ').toLocaleLowerCase().includes(searchText));
}

function notePreview(note) {
  if (note.title) return note.title;
  const content = note.body
    .replace(/!\[[^\]]*\]\([^)]*\)/gu, ' ')
    .replace(/\[([^\]]+)\]\([^)]*\)/gu, '$1')
    .replace(/[`*_>#|~]/gu, ' ')
    .split(/\r?\n/gu).map((line) => line.trim()).find(Boolean) || '';
  return content.replace(/\s+/gu, ' ').slice(0, 120);
}

function updateFeedStatus() {
  const selected = selectedNotes();
  const status = $('feed-status');
  $('result-summary').textContent = '전체 기간 · ' + products[filter] + ' · ' + selected.length + '건';
  status.textContent = searchText ? '검색어와 일치하는 소식이 없습니다.'
    : newsFilters.nexus === '신규히든' ? '등록된 신규히든 소식이 없습니다.'
    : newsFilters.nexus === 'updates' ? '등록된 업데이트가 없습니다.'
    : '등록된 패치노트가 없습니다.';
  status.hidden = selected.length > 0;
}

function scrollToReaderTop() {
  const scroll = query('.patch-scroll');
  scroll.scrollTop = 0;
}

function focusCard(number) {
  const summary = query('details[data-number="' + number + '"] > summary');
  summary?.focus({ preventScroll: true });
  return summary;
}

function toggleReader(number) {
  if (activeNoteNumber === number) {
    activeNoteNumber = null;
    renderNotes();
    query('.patch-scroll').scrollTop = listScrollTop;
    focusCard(number);
  } else {
    if (activeNoteNumber === null) listScrollTop = query('.patch-scroll').scrollTop;
    activeNoteNumber = number;
    renderNotes();
    scrollToReaderTop();
    focusCard(number);
  }
}

function resetReader() {
  activeNoteNumber = null;
  listScrollTop = 0;
  query('.patch-scroll').scrollTop = 0;
}

function renderNotes() {
  queryAll('[data-news-product]').forEach((group) => {
    group.hidden = group.dataset.newsProduct !== filter;
  });
  const selected = selectedNotes();
  // A reader shows just one note; closing it restores the full, unpaginated list.
  const active = selected.find((note) => note.number === activeNoteNumber);
  if (!active) activeNoteNumber = null;
  const displayNotes = active ? [active] : selected;
  $('notes').replaceChildren(...displayNotes.map((note) => {
    const card = document.createElement('details');
    card.dataset.number = note.number;
    card.dataset.kind = note.kind;
    card.open = note.number === activeNoteNumber;
    const heading = element('div', '', 'note-heading');
    const topLine = element('div', '', 'note-topline');
    const identity = element('div', '', 'note-identity');
    identity.append(element('span', note.category, 'note-release-badge'));
    for (const tag of note.tags) identity.append(element('span', '#' + tag, 'change-tag'));
    const meta = element('div', '', 'note-meta');
    const date = element('time', formatPublishedAt(note.publishedAt));
    date.dateTime = note.publishedAt;
    meta.append(date);
    topLine.append(identity, meta);
    heading.append(topLine);
    const description = element('div', '', 'note-description');
    description.append(element('span', note.kind === 'hidden' ? 'NEW HIDDEN' : note.kind === 'version' ? 'VERSION UPDATE' : 'PATCH NOTE', 'note-kind-label'));
    const preview = notePreview(note);
    if (preview) description.append(element('span', preview, 'release-label'));
    heading.append(description);
    const header = element('summary', '', 'note-header');
    header.append(heading);
    header.addEventListener('click', (event) => {
      event.preventDefault();
      toggleReader(note.number);
    });
    card.append(header);
    if (card.open) card.append(renderBody(note));
    return card;
  }));
  updateFeedStatus();
  syncReaderNavigation();
}

function syncReaderNavigation() {
  const selected = selectedNotes();
  const index = selected.findIndex((note) => note.number === activeNoteNumber);
  $('reader-nav').hidden = index < 0;
  if (index < 0) return;
  $('prev').disabled = index === 0;
  $('next').disabled = index === selected.length - 1;
  $('reader-position').textContent = (index + 1) + ' / ' + selected.length;
  $('prev').title = '이전 패치노트';
  $('next').title = '다음 패치노트';
}

function moveReader(direction) {
  const selected = selectedNotes();
  const index = selected.findIndex((note) => note.number === activeNoteNumber);
  const targetIndex = index + direction;
  if (index < 0 || targetIndex < 0 || targetIndex >= selected.length) return;
  activeNoteNumber = selected[targetIndex].number;
  renderNotes();
  scrollToReaderTop();
  focusCard(activeNoteNumber);
}
$('prev').addEventListener('click', () => moveReader(-1));
$('next').addEventListener('click', () => moveReader(1));

async function refreshNotes() {
  if (loading) return;
  if (Date.now() < nextAttempt) {
    $('feed-status').textContent = 'GitHub 요청 한도에 도달했습니다. ' + formatPublishedAt(nextAttempt) + ' 이후 다시 확인합니다.';
    $('feed-status').hidden = false;
    return;
  }
  loading = true;
  $('refresh').disabled = true;
  $('refresh').textContent = '확인 중…';
  $('notes').setAttribute('aria-busy', 'true');
  lastAttempt = Date.now();
  const updated = [];

  try {
    const url = new URL('https://api.github.com/repos/' + repository + '/issues');
    url.search = new URLSearchParams({
      creator: 'nxsbuild', state: 'all', sort: 'created', direction: 'desc', per_page: '100',
    });
    for (let page = 1; ; page++) {
      url.searchParams.set('page', page);
      const response = await fetch(url, {
        headers: { Accept: 'application/vnd.github.full+json' },
        cache: 'no-cache',
        signal: AbortSignal.timeout(10_000),
      });
      if (!response.ok) {
        const retryAfter = Number(response.headers.get('retry-after')) * 1000;
        const reset = Number(response.headers.get('x-ratelimit-reset')) * 1000;
        const rateLimited = response.status === 403 || response.status === 429;
        if (rateLimited) nextAttempt = Math.max(Date.now() + (retryAfter || refreshInterval), reset);
        throw new Error('GitHub Issues returned ' + response.status);
      }
      const issues = await response.json();
      updated.push(...issues.map(toNote).filter(Boolean));
      if (!response.headers.get('link')?.includes('rel="next"')) break;
    }
    notes = updated;
    renderNotes();
  } catch {
    const status = $('feed-status');
    status.textContent = '패치노트를 갱신하지 못했습니다. 잠시 후 자동으로 다시 확인합니다.';
    status.hidden = false;
  } finally {
    loading = false;
    $('refresh').disabled = false;
    $('refresh').textContent = '새로고침';
    $('notes').removeAttribute('aria-busy');
  }
}

queryAll('[data-news-product]').forEach((group) => {
  group.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-news]');
    const product = group.dataset.newsProduct;
    if (!button || button.dataset.news === newsFilters[product]) return;
    group.querySelector('[aria-pressed="true"]').setAttribute('aria-pressed', 'false');
    button.setAttribute('aria-pressed', 'true');
    newsFilters[product] = button.dataset.news;
    resetReader();
    renderNotes();
  });
});
$('note-search').addEventListener('input', () => {
  searchText = $('note-search').value.trim().toLocaleLowerCase();
  resetReader();
  renderNotes();
});

function refreshIfDue() {
  if (dialog.open && !document.hidden && Date.now() - lastAttempt >= refreshInterval) void refreshNotes();
}

trigger.addEventListener('click', () => {
  dialog.showModal();
  trigger.setAttribute('aria-expanded', 'true');
  renderNotes();
  if (!lastAttempt) { $('feed-status').textContent = '패치노트를 불러오는 중입니다.'; $('feed-status').hidden = false; }
  void refreshNotes();
});
$('close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => {
  trigger.setAttribute('aria-expanded', 'false');
  trigger.focus({ preventScroll: true });
});
let backdropPointer = false;
function outside(event) {
  const rect = dialog.getBoundingClientRect();
  return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
}
dialog.addEventListener('pointerdown', (event) => { backdropPointer = event.target === dialog && outside(event); });
dialog.addEventListener('click', (event) => { if (backdropPointer && event.target === dialog && outside(event)) dialog.close(); backdropPointer = false; });
// Keep background app shortcuts from receiving modal keyboard events; native Escape still closes it.
dialog.addEventListener('keydown', (event) => event.stopPropagation());
$('refresh').addEventListener('click', () => void refreshNotes());
window.addEventListener('focus', refreshIfDue);
setInterval(refreshIfDue, refreshInterval);
document.addEventListener('visibilitychange', refreshIfDue);
window.addEventListener('online', refreshIfDue);

})();
