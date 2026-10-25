// 보험금 청구 판단기 - Google Apps Script 웹앱
// 파비콘(북마크·탭에 보이는 영수증 아이콘) 설정
// 1) 아이콘 PNG를 구글 드라이브에 올리고, 공유를 '링크가 있는 모든 사용자(뷰어)'로 바꿉니다.
// 2) 파일 링크 .../file/d/여기가_파일ID/view 의 '파일ID'를 아래 따옴표 안에 붙여 넣습니다.
// 비워 두면 아이콘 없이 동작합니다.
const FAVICON_FILE_ID = '1Mw7qph-_txiXx2oIcvz3FzlxyDqOvCMx';
// 드라이브 대신 직접 이미지 주소(https로 시작하고 .png 등으로 끝나야 함)를 쓰려면 여기에 넣습니다.
const FAVICON_URL = '';

function faviconUrl_() {
  if (FAVICON_URL) return FAVICON_URL;
  if (FAVICON_FILE_ID) return 'https://drive.google.com/thumbnail?id=' + FAVICON_FILE_ID + '&sz=s256&.png';
  return '';
}

function doGet() {
  const out = HtmlService.createHtmlOutputFromFile('index')
    .setTitle('보험금 청구 판단기')
    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
  const icon = faviconUrl_();
  if (icon) out.setFaviconUrl(icon);
  return out;
}

// 저장된 데이터 불러오기 (사용자 속성에 조각으로 나눠 저장)
function loadData() {
  const p = PropertiesService.getUserProperties();
  const n = Number(p.getProperty('n') || 0);
  let s = '';
  for (let i = 0; i < n; i++) s += p.getProperty('d' + i) || '';
  return s;
}

// 데이터 저장 (속성 하나당 용량 제한 때문에 8000자씩 나눔)
function saveData(json) {
  const p = PropertiesService.getUserProperties();
  const old = Number(p.getProperty('n') || 0);
  const CH = 8000, parts = [];
  for (let i = 0; i < json.length; i += CH) parts.push(json.slice(i, i + CH));
  const obj = { n: String(parts.length) };
  parts.forEach((x, i) => { obj['d' + i] = x; });
  p.setProperties(obj);
  for (let i = parts.length; i < old; i++) p.deleteProperty('d' + i);
}
// 저장된 데이터 불러오기 (사용자 속성에 조각으로 나눠 저장)
function loadData() {
  const p = PropertiesService.getUserProperties();
  const n = Number(p.getProperty('n') || 0);
  let s = '';
  for (let i = 0; i < n; i++) s += p.getProperty('d' + i) || '';
  return s;
}

// 데이터 저장 (속성 하나당 용량 제한 때문에 8000자씩 나눔)
function saveData(json) {
  const p = PropertiesService.getUserProperties();
  const old = Number(p.getProperty('n') || 0);
  const CH = 8000, parts = [];
  for (let i = 0; i < json.length; i += CH) parts.push(json.slice(i, i + CH));
  const obj = { n: String(parts.length) };
  parts.forEach((x, i) => { obj['d' + i] = x; });
  p.setProperties(obj);
  for (let i = parts.length; i < old; i++) p.deleteProperty('d' + i);
}
