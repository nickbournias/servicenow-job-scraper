# Job Listings Aggregator

This is a web-based job listing aggregator that scrapes job postings from company career pages and displays them in an interactive and responsive UI. Each company’s jobs are fetched from a pre-scraped JSON file and rendered dynamically when selected via clickable UI filters.

## 🔧 Features

* Clickable UI "pills" to filter and toggle job listings by company
* Dynamically loaded job sections with custom styling
* Scraped job data stored in static JSON files
* Clean, responsive layout using CSS Grid and Flexbox
* Graceful error handling and dynamic UI updates

## 🚀 How to Use

1. Open `https://nickbournias.github.io/servicenow-job-scraper` in a browser.
2. Click a company pill to load its job listings.
3. The jobs appear at the top of the list and can be toggled on or off.
4. Each card links directly to the official job posting.

## 🛠️ Technologies Used

### Frontend

* **HTML/CSS/JavaScript** – Core web technologies for layout, logic, and dynamic DOM updates
* **CSS Grid & Flexbox** – For responsive layout and styling
* **Vanilla JS** – Used to fetch JSON data and dynamically generate job cards

### Backend (Scraping)

* **Node.js**
* **Axios** – For fetching HTML from remote websites
* **Cheerio** – For parsing and traversing HTML to extract job data
* **fs (File System)** – For writing JSON files to disk

## 📦 Setup for Scraping (Optional)

To run the scrapers locally:

```bash
npm install axios cheerio
node scrapeSeamless.js
node scrapeGlideFast.js
```

This will create or update JSON files with job data that can be loaded by the frontend.

## 📝 License

This project is for educational and portfolio use only. Use responsibly and respect each website's terms of service when scraping data.
