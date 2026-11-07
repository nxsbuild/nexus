(() => {
'use strict';

// ── 01 · 패치노트 스타일 ──
const modalStyle = document.createElement('style');
modalStyle.id = 'nexus-patch-modal-style';
modalStyle.textContent = String.raw`/* 패치노트 모달 */
#nexusPatchDialog {
 --accent:#dfbe83; --g:#dfbe83; --patch-canvas:#0d1015; --patch-body:#11151d;
 position:fixed; inset:0; margin:auto; width:min(820px,calc(100vw - 48px)); height:min(690px,calc(100dvh - 50px));
 max-width:none; max-height:none; padding:0; overflow:hidden; border:1px solid #776340; border-radius:16px;
 background:var(--patch-canvas); color:var(--ink); box-shadow:0 30px 110px #000e, 0 0 0 1px #ffffff07;
 font:calc(13px * var(--fs-scale))/1.5 var(--font-body);
}
#nexusPatchDialog[open] { display:flex; flex-direction:column; }
#nexusPatchDialog::backdrop { background:#000c; backdrop-filter:blur(5px); }
#nexusPatchDialog [hidden] { display:none!important; }
#nexusPatchDialog button,#nexusPatchDialog input,#nexusPatchDialog select { font:inherit; }
#nexusPatchDialog button { transition:background .15s,color .15s,border-color .15s; }
#nexusPatchDialog :is(button,input,select,summary):focus-visible { outline:2px solid var(--accent); outline-offset:2px; }

/* 헤더 */
#nexusPatchDialog .patch-heading { display:flex; align-items:center; justify-content:space-between; gap:12px; flex-shrink:0; padding:10px 22px; border-bottom:1px solid #343039; background:linear-gradient(125deg,#242027 0%,#191b22 50%,#11151c 100%); }
#nexusPatchDialog .patch-title { display:flex; align-items:center; gap:12px; min-width:0; }
#nexusPatchDialog .patch-emblem { display:grid; place-items:center; width:34px; height:34px; flex-shrink:0; border:1px solid #8e744c; border-radius:12px; background:linear-gradient(145deg,#4a3b28,#22252f 82%); color:#f1d399; box-shadow:inset 0 1px 0 #ffffff20,0 4px 12px #0005; }
#nexusPatchDialog .patch-emblem svg { width:19px; height:19px; }
#nexusPatchDialog .patch-kicker { display:block; margin-bottom:2px; color:#c5ac82; font:600 9px/1.3 var(--font-mono); letter-spacing:.14em; }
#nexusPatchDialog h2 { color:#f3e3c5; font-size:18px; font-weight:700; line-height:1.18; letter-spacing:-.5px; }
#patch-close { display:grid; place-items:center; width:33px; height:33px; flex-shrink:0; border:1px solid #484954; border-radius:8px; background:#20222a; color:#c3c8d3; }
#patch-close:hover { border-color:#9a825b; background:#302c2a; color:#f4dba9; }
#nexusPatchDialog .patch-controls { padding:10px 22px; flex-shrink:0; border-bottom:1px solid #313744; background:#12161d; }
#nexusPatchDialog .patch-toolbar { display:flex; align-items:center; gap:8px; margin-bottom:8px; }
#patch-refresh { flex-shrink:0; min-height:36px; padding:5px 11px; border:1px solid #454e5e; border-radius:8px; background:#212834; color:#c7d1e0; font-size:11px!important; font-weight:600!important; }
#patch-refresh:hover:not(:disabled) { background:#303a4c; border-color:#8294b0; color:#fff; }
#nexusPatchDialog .patch-search { flex:1; min-width:0; display:flex; align-items:center; gap:9px; min-height:36px; padding:0 11px; border:1px solid #3e4756; border-radius:8px; background:#0b0f15; transition:border-color .15s,box-shadow .15s; }
#nexusPatchDialog .patch-search:focus-within { border-color:#cba96b; box-shadow:0 0 0 2px #cba96b22; }
#nexusPatchDialog .patch-search svg { width:15px; height:15px; flex-shrink:0; color:#929fb4; }
#nexusPatchDialog .patch-search input { flex:1; width:100%; min-width:0; min-height:34px; border:0; outline:none; background:transparent; color:#edf1f8; font-size:12px; }
#nexusPatchDialog input::placeholder { color:#8b95a6; }
#nexusPatchDialog .patch-periodbar { display:grid; grid-template-columns:minmax(0,1fr) auto minmax(0,1fr); align-items:center; gap:8px; min-width:0; margin-bottom:9px; }
#nexusPatchDialog .patch-range { min-width:0; overflow:hidden; color:#c1ad90; font-size:10px; white-space:nowrap; font-variant-numeric:tabular-nums; }
#nexusPatchDialog .patch-periodtabs { display:flex; align-items:center; justify-content:center; gap:16px; white-space:nowrap; }
#nexusPatchDialog .patch-periodtabs button { padding:4px 1px 5px; border:0; border-bottom:2px solid transparent; border-radius:0; background:transparent; color:#aaa49b; font-size:11px; line-height:1.25; transition:none; }
#nexusPatchDialog .patch-periodtabs button[aria-pressed="true"] { border-bottom-color:#dfbe83; color:#f6dfb0; font-weight:700; }
#nexusPatchDialog .patch-periodtabs button:hover { color:#f6dfb0; }
#nexusPatchDialog .patch-version { justify-self:end; max-width:100%; min-width:106px; min-height:30px; padding:4px 8px; border:1px solid #5b5349; border-radius:7px; background:#242128; color:#f0dfbf; font-size:11px; cursor:pointer; }
#nexusPatchDialog .patch-month { display:grid; gap:12px; min-width:0; }
#nexusPatchDialog .patch-month-head { margin:0 0 2px; padding:0 1px 7px; border-bottom:1px solid #514634; color:#d8c39e; font-size:12px; font-weight:650; }
#nexusPatchDialog .patch-month-releases { display:grid; gap:20px; min-width:0; }
#nexusPatchDialog .patch-filter-row { display:flex; align-items:center; justify-content:center; gap:8px 12px; flex-wrap:wrap; }
#nexusPatchDialog .tag-filters { display:flex; align-items:center; justify-content:center; gap:5px; flex-wrap:wrap; }
#nexusPatchDialog .tag-filters button { min-height:30px; padding:4px 12px; border:1px solid #3b4351; border-radius:7px; background:#171c25; color:#aeb8c8; font-size:11px; }
#nexusPatchDialog .tag-filters button:hover { background:#242c39; color:#edf2fa; }
#nexusPatchDialog .tag-filters [aria-pressed="true"] { border-color:#b99b69; background:#443829; color:#f6dca8; font-weight:700; box-shadow:inset 0 1px 0 #ffffff10; }
#nexusPatchDialog .tag-filters [data-news="new"][aria-pressed="true"] { border-color:#689d91; background:#1b3936; color:#a4e9d4; }

/* 목록 */
#nexusPatchDialog .patch-scroll { flex:1; min-height:0; overflow:auto; padding:14px 22px 18px; background:radial-gradient(ellipse at 50% -15%,#19202b 0,transparent 62%),var(--patch-canvas); scrollbar-width:thin; scrollbar-color:#505969 transparent; }
#nexusPatchDialog .result-strip { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:4px 12px; margin-bottom:11px; }
#nexusPatchDialog .result-summary { display:flex; align-items:center; gap:8px; color:#aeb8c8; font-size:11px; }
#nexusPatchDialog .result-summary::before { content:''; width:3px; height:13px; flex-shrink:0; border-radius:2px; background:#ddba7c; box-shadow:0 0 10px #ddba7c35; }
#nexusPatchDialog .empty { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; min-height:200px; padding:25px 20px; border:1px dashed #454e5d; border-radius:12px; background:#161b24; color:#c1c9d7; text-align:center; font-size:13px; line-height:1.6; text-wrap:balance; }
#nexusPatchDialog .empty::before { content:'—'; display:grid; place-items:center; width:42px; height:42px; border:1px solid #555362; border-radius:50%; background:#222735; color:#dcc18e; font-size:19px; }
#patch-notes { display:grid; gap:23px; }
#nexusPatchDialog .release { min-width:0; }
#nexusPatchDialog .release-head { display:flex; align-items:end; justify-content:space-between; flex-wrap:wrap; gap:8px 14px; margin-bottom:11px; padding:4px 2px 12px; border-bottom:1px solid #514634; }
#nexusPatchDialog .release-heading { min-width:0; padding-left:12px; border-left:3px solid #dfbe83; }
#nexusPatchDialog .release-kicker { display:block; margin-bottom:3px; color:#cdb184; font:700 9px/1.3 var(--font-mono); letter-spacing:.13em; }
#nexusPatchDialog .release-title { margin:0; color:#f3e3c5; font-size:19px; font-weight:700; line-height:1.3; letter-spacing:-.025em; overflow-wrap:anywhere; }
#nexusPatchDialog .release-meta { display:flex; align-items:center; gap:10px; padding-bottom:2px; color:#b7aa94; font-size:10px; white-space:nowrap; }
#nexusPatchDialog .release-meta time { margin:0; color:inherit; }
#nexusPatchDialog .release-items { display:grid; gap:8px; min-width:0; }
#patch-notes details { --release-tone:#dfbe83; --release-rgb:223,190,131; min-width:0; overflow-wrap:anywhere; border:1px solid #464344; border-radius:9px; background:linear-gradient(120deg,rgba(var(--release-rgb),.035),transparent 72%),#171b23; box-shadow:inset 0 1px #ffffff06; transition:border-color .15s,background .15s; }
#patch-notes details[data-tone="fix"] { --release-tone:#cc858e; --release-rgb:204,133,142; }
#patch-notes details[data-tone="improve"] { --release-tone:#aeb8c4; --release-rgb:174,184,196; }
#patch-notes details:hover { border-color:#766a59; background:linear-gradient(120deg,rgba(var(--release-rgb),.065),transparent 72%),#1e2229; }
#patch-notes details[open] { border-color:#8e7b5e; background:#191c24; }
#nexusPatchDialog .note-header { display:block; padding:12px 14px; border-left:3px solid var(--release-tone); border-radius:8px; list-style:none; cursor:pointer; scroll-margin-top:8px; }
#nexusPatchDialog .note-header::marker { content:''; }
#nexusPatchDialog .note-header::-webkit-details-marker { display:none; }
#nexusPatchDialog details[open]>.note-header { border-bottom:1px solid #494850; border-radius:8px 8px 0 0; background:rgba(var(--release-rgb),.035); }
#nexusPatchDialog .note-topline { display:flex; align-items:flex-start; justify-content:space-between; gap:8px 12px; min-width:0; }
#nexusPatchDialog .release-label { display:-webkit-box; -webkit-box-orient:vertical; -webkit-line-clamp:2; flex:1 1 0; min-width:0; overflow:hidden; overflow-wrap:anywhere; color:#f1eee8; font-size:13.5px; font-weight:650; line-height:1.45; }
#nexusPatchDialog .note-description { display:flex; align-items:center; flex-wrap:wrap; gap:5px 9px; margin-top:7px; min-width:0; }
#nexusPatchDialog .note-kinds { display:inline-flex; align-items:center; flex-wrap:wrap; gap:4px 9px; min-width:0; }
#nexusPatchDialog .note-kind-unit { display:inline-flex; align-items:center; gap:7px; white-space:nowrap; }
#nexusPatchDialog .note-kind-separator { color:#8b8070; font:600 10px/1 var(--font-mono); }
#nexusPatchDialog .note-kind-label { flex-shrink:0; font:600 9px/1.5 var(--font-mono); letter-spacing:.055em; white-space:nowrap; }
#nexusPatchDialog .note-kind-label[data-kind="update"] { color:#dfbe83; }
#nexusPatchDialog .note-kind-label[data-kind="new"] { color:#a0d5c9; }
#nexusPatchDialog .note-kind-label[data-kind="fix"] { color:#ff9297; }
#nexusPatchDialog .note-kind-label[data-kind="improve"] { color:#c4cbd4; }
#nexusPatchDialog .note-kind-label[data-kind="general"] { color:#cbbba1; }
#nexusPatchDialog .change-tag { padding:2px 7px; border:1px solid #4c596b; border-radius:5px; background:#293243; color:#d0dbee; font-size:10px; line-height:1.45; }
#nexusPatchDialog time { display:block; color:#a5b1c2; font:10px/1.5 var(--font-mono); font-variant-numeric:tabular-nums; letter-spacing:0; white-space:nowrap; }
#nexusPatchDialog .note-excerpt { display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden; margin:9px 0 0; color:#b8b7b4; font-size:11.5px; line-height:1.55; }
/* 상세 본문 */
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

/* 상세 컨트롤 */
#nexusPatchDialog .patch-reader-nav { display:grid; grid-template-columns:100px minmax(0,1fr) 100px; align-items:center; gap:10px; flex-shrink:0; padding:10px 22px; border-top:1px solid #3c3b3a; background:linear-gradient(110deg,#1d2029,#12161e); box-shadow:0 -6px 20px #0005; }
#nexusPatchDialog .patch-reader-nav button { display:flex; align-items:center; justify-content:center; gap:7px; min-height:33px; border:1px solid #535f72; border-radius:7px; background:#283243; color:#dce6f2; font-size:12px; }
#nexusPatchDialog .patch-reader-nav button:not(:disabled):hover { border-color:#c2a36f; background:#3c3740; color:#f8e3bc; }
#nexusPatchDialog .patch-reader-nav button:disabled { opacity:.4; cursor:not-allowed; }
#nexusPatchDialog .patch-reader-nav button>span { font-size:21px; line-height:1; }
#nexusPatchDialog .patch-reader-current { min-width:0; text-align:center; }
#patch-reader-position { display:block; color:#e3c99e; font:600 11px var(--font-mono); }

/* 반응형 */
@media(max-width:540px) {
 #nexusPatchDialog { width:calc(100vw - 20px); height:min(690px,calc(100dvh - 24px)); border-radius:13px; }
 #nexusPatchDialog .patch-heading { gap:10px; padding:13px 13px 12px; }
 #nexusPatchDialog .patch-title { gap:9px; }
 #nexusPatchDialog .patch-emblem { width:35px; height:37px; }
 #nexusPatchDialog .patch-emblem svg { width:19px; height:19px; }
 #nexusPatchDialog .patch-kicker { font-size:8px; }
 #nexusPatchDialog h2 { font-size:18px; }
 #nexusPatchDialog .patch-controls { padding:9px 12px; }
 #nexusPatchDialog .patch-periodbar { gap:4px; margin-bottom:8px; }
 #nexusPatchDialog .patch-range { font-size:9px; letter-spacing:-.035em; }
 #nexusPatchDialog .patch-periodtabs { gap:7px; }
 #nexusPatchDialog .patch-periodtabs button { font-size:10px; padding:4px 0 5px; }
 #nexusPatchDialog .patch-version { min-width:77px; max-width:90px; min-height:28px; padding:3px 4px; font-size:10px; }
 #nexusPatchDialog .patch-toolbar { gap:6px; margin-bottom:8px; }
 #nexusPatchDialog .patch-search input { font-size:11px; }
 #patch-refresh { padding-inline:9px; font-size:10px!important; }
 #nexusPatchDialog .tag-filters button { min-height:29px; padding:3px 10px; }
 #nexusPatchDialog .patch-scroll { padding:12px 11px 16px; }
 #nexusPatchDialog .result-strip { margin-bottom:9px; }
 #nexusPatchDialog .note-header { padding:10px 10px 10px 11px; }
 #nexusPatchDialog .release-title { font-size:17px; }
 #nexusPatchDialog .release-meta { font-size:9.5px; }
 #nexusPatchDialog .note-kind-label { font-size:8px; }
 #nexusPatchDialog .release-label { font-size:12.5px; }
 #nexusPatchDialog .note-excerpt { font-size:11px; }
 #nexusPatchDialog .note-body { padding:12px 11px; }
 #nexusPatchDialog .patch-reader-nav { grid-template-columns:75px minmax(0,1fr) 75px; gap:8px; padding:8px 11px; }
 #nexusPatchDialog .patch-reader-nav button { font-size:11px; }
}
@media(max-width:360px) {
 #nexusPatchDialog .tag-filters button { padding-inline:8px; }
 #nexusPatchDialog .note-description { gap:4px 6px; }
}
@media(prefers-reduced-motion:reduce) {
 #patch-notes details,#nexusPatchDialog button,#nexusPatchDialog .patch-search { transition:none; }
}`;
document.head.appendChild(modalStyle);

// ── 02 · 모달 연결·공통 상태 ──
const $ = (id) => document.getElementById('patch-' + id);
const repository = 'nxsbuild/nexus';
const ownerId = 350676179;
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
const statusLabel = { update: 'VERSION UPDATE', new: 'NEW HIDDEN', fix: 'BUG FIX', improve: 'IMPROVEMENT', general: 'PATCH NOTE' };

const dialog = document.getElementById('nexusPatchDialog');
const query = (selector) => dialog.querySelector(selector);
const trigger = document.getElementById('btnPatchNotes');
let activeNoteNumber = null;
let notes = [];
let searchText = '';

let chosenKind = 'all';
let chosenPeriod = 'latest';
let chosenVersion = '';
let versionManuallySelected = false;
let renderedMonth = '';
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

// ── 03 · GitHub 이슈 분류·본문 처리 ──
function toNote(issue) {
  if (!issue || issue.pull_request || issue.user?.id !== ownerId) return null;
  const rawTitle = String(issue.title || '').trim();
  if (!rawTitle || /^\[(?:빌더|공통)(?:\s|\])/u.test(rawTitle)) return null;
  const body = String(issue.body || '').trim();
  const tags = [...new Set([...rawTitle.matchAll(/#([^\s#,，|\[\]]+)/gu)].map((match) => match[1]))];
  const withoutTags = rawTitle.replace(/#[^\s#,，|\[\]]+/gu, '').trim();
  const prefix = /^(?:\s*\[[^\]]+\]\s*)+/u.exec(withoutTags)?.[0] || '';
  const classification = ([...prefix.matchAll(/\[([^\]]+)\]/gu)].map((match) => match[1]).join(' ') || withoutTags)
    .replace(/^넥서스(?:\s+|$)/u, '').trim();
  // 대괄호에 적은 변경 유형으로만 분류하며, #태그는 검색과 표시용으로 독립 처리한다.
  const version = classification.match(/\b(v\d+[\w.-]*)\b/iu)?.[0] || '';
  const kinds = [];
  if (/(?:신규\s*기능|신규\s*히든|new[\s_-]*hidden|new[\s_-]*mode|newmode)/iu.test(classification)) kinds.push('new');
  if (/(?:오류\s*수정|버그\s*수정|bug[\s_-]*fix)/iu.test(classification)) kinds.push('fix');
  if (/(?:개선\s*사항|개선|improvement)/iu.test(classification)) kinds.push('improve');
  if (!kinds.length) kinds.push(version ? 'update' : 'general');
  const heading = body.split(/\r?\n/gu)
    .map((line) => /^\s{0,3}#{1,6}\s+(.+?)\s*#*\s*$/u.exec(line)?.[1] || '')
    .find((line) => line && !/^(?:변경\s*사항|업데이트\s*내용|상세\s*내용|공지\s*사항)$/u.test(line.trim()));
  const remaining = classification.replace(/\b[vV]\d+[\w.-]*\b/gu, '')
    .replace(/(?:신규\s*기능|신규\s*히든|new[\s_-]*hidden|오류\s*수정|버그\s*수정|개선\s*사항|개선|업데이트)/giu, '').trim();
  const issueTitle = withoutTags.slice(prefix.length).replace(/\s+/gu, ' ').trim();
  const bodyLine = body.split(/\r?\n/gu).map((line) => line.trim())
    .find((line) => line && !/^(?:[-*+]\s+|\| |---|```|!\[)/u.test(line)) || '';
  const title = (heading || issueTitle || remaining || bodyLine || withoutTags).replace(/^#{1,6}\s+/u, '').trim();
  return {
    kinds, version, tags, title, body, html: issue.body_html || '',
    number: issue.number, publishedAt: issue.created_at,
    name: ['넥서스', version || (kinds.includes('new') ? '신규히든' : '패치노트'), title].join(' '),
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
  const duplicateTitles = new Set([note.title, note.name, note.name + ' 안내']);
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

// ── 04 · 검색·필터·버전별 표시 ──
// 작성일은 한국시간(KST)을 기준으로 이번 달과 이전 달을 구분한다.
const monthKey = (value) => formatPublishedAt(value).slice(0, 7);
const baseVersion = (note) => {
  const match = /^v(\d+)(?:[a-z]+)?$/iu.exec(note.version || '');
  return match ? `V${match[1]}` : (note.version || '').replace(/^v/iu, 'V');
};
function byMonth(items) {
  const months = new Map();
  for (const note of items) {
    const key = monthKey(note.publishedAt);
    if (key && !months.has(key)) months.set(key, []);
    if (key) months.get(key).push(note);
  }
  return [...months].sort(([a], [b]) => b.localeCompare(a)).map(([month, items]) => ({ month, items }));
}
function periodNotes() {
  const current = monthKey(new Date());
  return notes.filter((note) => {
    const key = monthKey(note.publishedAt);
    return key && (chosenPeriod === 'latest' ? key === current : key < current);
  });
}
function updatePeriodControls() {
  const current = monthKey(new Date());
  const [year, month] = current.split('.').map(Number);
  $('month-range').textContent = chosenPeriod === 'latest'
    ? `${year}년 ${month}월`
    : `${year}년 ${month}월 이전`;
  query('.patch-periodtabs [aria-pressed="true"]')?.setAttribute('aria-pressed', 'false');
  query(`.patch-periodtabs [data-period="${chosenPeriod}"]`).setAttribute('aria-pressed', 'true');
  const versions = [...new Set(periodNotes().map(baseVersion).filter(Boolean))].sort((a, b) => {
    const av = /^V(\d+)$/iu.exec(a), bv = /^V(\d+)$/iu.exec(b);
    if (av && bv) return Number(bv[1]) - Number(av[1]);
    if (av) return -1;
    if (bv) return 1;
    return b.localeCompare(a);
  });
  if (!versionManuallySelected || !versions.includes(chosenVersion)) {
    chosenVersion = versions[0] || '';
    versionManuallySelected = false;
  }
  const select = $('version');
  const options = versions.map((version) => {
    const option = element('option', version);
    option.value = version;
    return option;
  });
  if (!options.length) {
    const option = element('option', '등록된 버전 없음');
    option.value = '';
    option.disabled = true;
    options.push(option);
  }
  select.replaceChildren(...options);
  select.value = chosenVersion;
  select.disabled = !versions.length;
  renderedMonth = current;
}
function selectedNotes() {
  const matches = periodNotes().filter((note) =>
    chosenVersion && baseVersion(note) === chosenVersion &&
    (chosenKind === 'all' || note.kinds.includes(chosenKind)) &&
    [note.name, ...note.tags, note.body, ...note.kinds.map((kind) => statusLabel[kind])]
      .join(' ').toLocaleLowerCase().includes(searchText));
  // 월별 역순·기본 버전 역순을 상세보기 이전/다음 이동에도 적용한다.
  return byMonth(matches).flatMap(({ items }) => groupByRelease(items).flatMap((group) => group.items));
}

function updateFeedStatus() {
  const count = selectedNotes().length;
  $('result-summary').textContent = (chosenPeriod === 'latest' ? '최신 내역' : '이전 내역') + ' · ' + count + '건';
  const status = $('feed-status');
  status.textContent = searchText ? '검색어와 일치하는 소식이 없습니다.'
    : chosenKind === 'new' ? '등록된 신규히든 소식이 없습니다.'
    : chosenKind === 'fix' ? '등록된 오류수정 소식이 없습니다.'
    : chosenKind === 'improve' ? '등록된 개선사항이 없습니다.'
    : chosenKind === 'update' ? '등록된 업데이트가 없습니다.'
    : '등록된 패치노트가 없습니다.';
  status.hidden = count > 0;
}

// 문자 접미사(a, b 등)는 같은 기본 버전 그룹으로 묶는다. 대소문자는 구분하지 않는다.
function groupByRelease(items) {
  const groups = [];
  const byVersion = new Map();
  for (const note of items) {
    const numericRelease = /^v(\d+)(?:[a-z]+)?$/iu.exec(note.version || '');
    const releaseVersion = numericRelease ? `V${numericRelease[1]}` : note.version.replace(/^v/iu, 'V');
    const key = releaseVersion ? releaseVersion.toLocaleLowerCase() : '__unversioned__';
    let group = byVersion.get(key);
    if (!group) {
      group = { version: releaseVersion, publishedAt: note.publishedAt, items: [] };
      byVersion.set(key, group);
      groups.push(group);
    }
    group.items.push(note);
    if (new Date(note.publishedAt) > new Date(group.publishedAt)) group.publishedAt = note.publishedAt;
  }
  // GitHub 이슈 작성 순서와 관계없이 기본 버전 번호가 큰 그룹을 먼저 표시한다.
  groups.sort((a, b) => {
    const aVersion = /^V(\d+)$/iu.exec(a.version || '');
    const bVersion = /^V(\d+)$/iu.exec(b.version || '');
    if (aVersion && bVersion) return Number(bVersion[1]) - Number(aVersion[1]);
    if (aVersion) return -1;
    if (bVersion) return 1;
    return Date.parse(b.publishedAt) - Date.parse(a.publishedAt);
  });
  for (const group of groups) {
    group.items.sort((a, b) => (Date.parse(b.publishedAt) - Date.parse(a.publishedAt)) || (b.number - a.number));
  }
  return groups;
}

function shortDescription(note) {
  const lines = note.body.split(/\r?\n/gu);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || /^(?:#{1,6}\s|```|~~~|\||---|!\[|<img)/u.test(trimmed)) continue;
    const plain = trimmed.replace(/!\[([^\]]*)\]\([^)]+\)/gu, '$1')
      .replace(/\[([^\]]+)\]\([^)]+\)/gu, '$1')
      .replace(/^[-*+]\s+|^\d+[.)]\s+/u, '')
      .replace(/[`*_~]/gu, '').replace(/<[^>]*>/gu, '').trim();
    if (plain && plain !== note.title && !/^(?:변경\s*사항|업데이트\s*내용|상세\s*내용|공지\s*사항)$/u.test(plain)) return plain;
  }
  return '';
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
  updatePeriodControls();
  const selected = selectedNotes();
  const active = selected.find((note) => note.number === activeNoteNumber);
  if (!active) activeNoteNumber = null;
  const displayNotes = active ? [active] : selected;
  const makeRelease = (group) => {
    const section = element('section', '', 'release');
    const header = element('header', '', 'release-head');
    const heading = element('div', '', 'release-heading');
    heading.append(element('span', 'UPDATE', 'release-kicker'));
    heading.append(element('h3', group.version ? 'Nexus ' + group.version : '기타 업데이트', 'release-title'));
    const meta = element('div', '', 'release-meta');
    const date = element('time', formatPublishedAt(group.publishedAt).split(' ')[0]);
    date.dateTime = group.publishedAt;
    meta.append(date, element('span', group.items.length + '개 항목'));
    header.append(heading, meta);
    const items = element('div', '', 'release-items');
    const cards = group.items.map((note) => {
      const card = document.createElement('details');
      card.dataset.number = note.number;
      card.dataset.tone = note.kinds.includes('fix') ? 'fix' : note.kinds.includes('improve') ? 'improve' : 'default';
      card.open = note.number === activeNoteNumber;
      const summary = element('summary', '', 'note-header');
      const top = element('div', '', 'note-topline');
      top.append(element('span', note.title, 'release-label'));
      const date = element('time', formatPublishedAt(note.publishedAt));
      date.dateTime = note.publishedAt;
      top.append(date);
      summary.append(top);
      const description = element('div', '', 'note-description');
      const kinds = element('span', '', 'note-kinds');
      note.kinds.forEach((kind, index) => {
        const unit = element('span', '', 'note-kind-unit');
        if (index) unit.append(element('span', '·', 'note-kind-separator'));
        const status = element('span', statusLabel[kind], 'note-kind-label');
        status.dataset.kind = kind;
        unit.append(status);
        kinds.append(unit);
      });
      description.append(kinds);
      for (const tag of note.tags) description.append(element('span', '#' + tag, 'change-tag'));
      summary.append(description);
      const excerpt = shortDescription(note);
      if (excerpt && !card.open) summary.append(element('p', excerpt, 'note-excerpt'));
      summary.addEventListener('click', (event) => { event.preventDefault(); toggleReader(note.number); });
      card.append(summary);
      if (card.open && note.body) card.append(renderBody(note));
      return card;
    });
    items.append(...cards);
    section.append(header, items);
    return section;
  };
  const releases = chosenPeriod === 'latest' ? groupByRelease(displayNotes).map(makeRelease) :
    byMonth(displayNotes).map(({ month, items }) => {
      const archive = element('section', '', 'patch-month');
      const [year, monthNumber] = month.split('.');
      archive.append(element('h3', `${year}년 ${Number(monthNumber)}월`, 'patch-month-head'));
      const children = element('div', '', 'patch-month-releases');
      children.append(...groupByRelease(items).map(makeRelease));
      archive.append(children);
      return archive;
    });
  $('notes').replaceChildren(...releases);
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

// ── 05 · GitHub 목록 새로고침 ──
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

// ── 06 · 모달 이벤트 연결 ──
query('.tag-filters').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-news]');
  if (!button || chosenKind === button.dataset.news) return;
  chosenKind = button.dataset.news;
  query('.tag-filters [aria-pressed="true"]').setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-pressed', 'true');
  resetReader();
  renderNotes();
});
query('.patch-periodtabs').addEventListener('click', (event) => {
  const button = event.target.closest('button[data-period]');
  if (!button || button.dataset.period === chosenPeriod) return;
  chosenPeriod = button.dataset.period;
  chosenVersion = '';
  versionManuallySelected = false;
  resetReader(); renderNotes();
});
$('version').addEventListener('change', (event) => {
  chosenVersion = event.target.value;
  versionManuallySelected = true;
  resetReader(); renderNotes();
});
$('note-search').addEventListener('input', () => {
  searchText = $('note-search').value.trim().toLocaleLowerCase();
  resetReader();
  renderNotes();
});

function refreshIfDue() {
  if (!dialog.open || document.hidden) return;
  if (monthKey(new Date()) !== renderedMonth) { chosenVersion = ''; versionManuallySelected = false; resetReader(); renderNotes(); }
  if (Date.now() - lastAttempt >= refreshInterval) void refreshNotes();
}

trigger.addEventListener('click', () => {
  dialog.showModal();
  trigger.setAttribute('aria-expanded', 'true');
  chosenVersion = '';
  versionManuallySelected = false;
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
