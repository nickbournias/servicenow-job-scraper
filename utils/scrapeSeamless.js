const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
  try {
    // 1. Fetch HTML
    const { data: html } = await axios.get('https://careers.seamlessmigration.com/jobs');

    // 2. Load HTML into Cheerio
    const $ = cheerio.load(html);
    const jobs = [];

    // 3. Traverse HTML - Update selectors as needed
    $('.block-grid-item').each((i, el) => {
      const title = $(el).find('.company-link-style').text().trim();
      const spans = $(el).find('div.text-md span');

      let location = '';
      let remote = '';

      if (spans.length === 1) {
        location = spans.first().text().trim();
      } else if (spans.length >= 2) {
        location = spans.first().text().trim();
        remote = spans.last().text().trim();
      }

      jobs.push({ title, location, remote });
    });

    // 4. Add timestamp
    const result = {
      lastUpdated: new Date().toISOString(),
      jobs,
    };

    // 5. Save to JSON
    fs.writeFileSync(
      '/Users/nick/Documents/02. Main/nickbournias.com/apps/servicenow-job-scraper/public/company-json/seamless.json',
      JSON.stringify(result, null, 2)
    );

    console.log('Scraping complete. Saved to seamless.json');
  } catch (error) {
    console.error('Error scraping site:', error.message);
  }
})();
