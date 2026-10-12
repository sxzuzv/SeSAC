/**
 * Google News 최신 기사를 검색해 Gmail로 전송합니다.
 * 아래 설정값만 원하는 내용으로 바꾸세요.
 */
const KEYWORD = '키워드';
const RECIPIENT_EMAIL = 'your-email@gmail.com';
const ARTICLE_COUNT = 10;
const LANGUAGE = 'ko';
const COUNTRY = 'KR';

function sendGoogleNews() {
  validateSettings();

  const rssUrl =
    'https://news.google.com/rss/search?q=' + encodeURIComponent(KEYWORD) +
    '&hl=' + LANGUAGE +
    '&gl=' + COUNTRY +
    '&ceid=' + COUNTRY + ':' + LANGUAGE;

  const response = UrlFetchApp.fetch(rssUrl, {
    muteHttpExceptions: true,
    headers: { 'User-Agent': 'Mozilla/5.0' }
  });

  if (response.getResponseCode() !== 200) {
    throw new Error('Google News 요청 실패: HTTP ' + response.getResponseCode());
  }

  const document = XmlService.parse(response.getContentText());
  const channel = document.getRootElement().getChild('channel');
  const items = channel.getChildren('item').slice(0, ARTICLE_COUNT);

  if (items.length === 0) {
    throw new Error('검색된 기사가 없습니다. KEYWORD를 확인해 주세요.');
  }

  const articles = items.map(function (item) {
    return {
      title: item.getChildText('title'),
      link: item.getChildText('link'),
      publishedAt: item.getChildText('pubDate')
    };
  });

  const subject = '[Google 뉴스] ' + KEYWORD + ' 최신 기사';
  const htmlBody = buildHtmlBody(articles);
  const plainBody = buildPlainBody(articles);

  MailApp.sendEmail({
    to: RECIPIENT_EMAIL,
    subject: subject,
    body: plainBody,
    htmlBody: htmlBody
  });
}

function buildHtmlBody(articles) {
  const rows = articles.map(function (article, index) {
    const date = Utilities.formatDate(
      new Date(article.publishedAt),
      Session.getScriptTimeZone(),
      'yyyy-MM-dd HH:mm'
    );

    return '<li style="margin-bottom:16px">' +
      '<a href="' + escapeHtml(article.link) + '">' +
      '<strong>' + escapeHtml(article.title) + '</strong></a><br>' +
      '<span style="color:#666">' + date + '</span>' +
      '</li>';
  }).join('');

  return '<h2>“' + escapeHtml(KEYWORD) + '” 최신 뉴스</h2>' +
    '<ol>' + rows + '</ol>' +
    '<p style="color:#777;font-size:12px">Google News RSS 검색 결과입니다.</p>';
}

function buildPlainBody(articles) {
  const lines = articles.map(function (article, index) {
    return (index + 1) + '. ' + article.title + '\n' + article.link;
  });

  return '“' + KEYWORD + '” 최신 뉴스\n\n' + lines.join('\n\n');
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function validateSettings() {
  if (!KEYWORD.trim()) {
    throw new Error('KEYWORD를 입력해 주세요.');
  }

  if (RECIPIENT_EMAIL === 'your-email@gmail.com' || !RECIPIENT_EMAIL.includes('@')) {
    throw new Error('RECIPIENT_EMAIL을 실제 Gmail 주소로 변경해 주세요.');
  }

  if (!Number.isInteger(ARTICLE_COUNT) || ARTICLE_COUNT < 1) {
    throw new Error('ARTICLE_COUNT는 1 이상의 정수여야 합니다.');
  }
}