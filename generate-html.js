const fs = require('fs');

const content = fs.readFileSync('README.md', 'utf8');

function extractBlock(lang) {
  const regex = new RegExp(`"""${lang}\\n([\\s\\S]*?)"""end`, 'm');
  const match = content.match(regex);
  return match ? match[1].trim().split('\n') : [];
}

const enLines = extractBlock('en');
const zhLines = extractBlock('zh-tw');

let html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Translation Compare</title>
  <style>
    table { width: 100%; border-collapse: collapse; }
    td, th { border: 1px solid #ccc; padding: 8px; vertical-align: top; }
    th { background-color: #f0f0f0; }
  </style>
</head>
<body>
<h1>Translation Comparison</h1>
<table>
<tr><th>English</th><th>Traditional Chinese</th></tr>
`;

const maxLines = Math.max(enLines.length, zhLines.length);
for (let i = 0; i < maxLines; i++) {
  html += `<tr><td>${enLines[i] || ''}</td><td>${zhLines[i] || ''}</td></tr>\n`;
}

html += '</table></body></html>';

fs.writeFileSync('index.html', html);