const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

(async () => {
  try {
    // 1. Fetch HTML
    const { data: html } = await axios.get('https://glidefast.com/careers');

    // 2. Load HTML into Cheerio
    const $ = cheerio.load(html);
    const jobs = [];

    $('.position-item').each((i, el) => {
      const title = $(el).find('.title').text().trim();
      console.log(title);
      const link = 'https://glidefast.com' + $(el).find('a').attr('href');
      console.log(link);

      jobs.push({ title, link });
    });

    // 4. Add timestamp
    const result = {
      lastUpdated: new Date().toISOString(),
      jobs,
    };

    // 5. Save to JSON
    fs.writeFileSync(
      '/Users/nick/Documents/02. Main/nickbournias.com/apps/servicenow-job-scraper/company-json/glidefast.json',
      JSON.stringify(result, null, 2)
    );

    console.log('Scraping complete. Saved to seamless.json');
  } catch (error) {
    console.error('Error scraping site:', error.message);
  }
})();
