const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.join(__dirname, 'NutriScan Redesign.html'), 'utf8');

// Find the template script tag
const start = html.indexOf('type="__bundler/template">');
const end = html.indexOf('</script>', start);
const raw = html.slice(start + 'type="__bundler/template">'.length, end).trim();

try {
  const decoded = JSON.parse(raw);
  fs.writeFileSync(path.join(__dirname, 'extracted-template.html'), decoded);
  console.log('Written, length:', decoded.length);
} catch(e) {
  console.log('Error:', e.message);
}
