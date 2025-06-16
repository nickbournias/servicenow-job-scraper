let seamlessJobsVisible = false;

const companies = {
  seamless: {
    id: 'seamless',
    name: 'Seamless Migrations',
    pillId: 'company-pill1',
    jsonPath: './company-json/seamless.json',
    color: '#F3B700',
    website: 'https://careers.seamlessmigration.com/jobs'
  },
  ares: {
    id: 'glidefast',
    name: 'GlideFast',
    pillId: 'company-pill2',
    jsonPath: './company-json/glidefast.json',
    color: '#65B891',
    website: 'https://glidefast.com/careers'
  },

};


window.onload = () => {
  const status = document.getElementById('updateStatus');
  status.textContent = `Last updated: ${new Date().toLocaleDateString()}`;
  status.style.textAlign = 'right';
  status.style.marginTop = '15px';
  status.style.marginRight = '15px';

  Object.values(companies).forEach(company => {
    document.getElementById(company.pillId).addEventListener('click', () => toggleCompany(company));
  });
};


function toggleCompany(company) {
  const section = document.getElementById(`${company.id}-section`);
  if (section) {
    section.remove();
  } else {
    loadJobs(company);
  }
}


function loadJobs(company) {
  const grid = document.getElementById('job-grid');

  const wrapper = document.createElement('div');
  wrapper.id = `${company.id}-section`;

  // Title
  const title = document.createElement('h1');
  title.textContent = company.name;
  title.style.backgroundColor = company.color;
  title.style.borderRadius = '25px';
  title.style.fontSize = '24px';
  title.style.padding = '10px 20px';
  title.style.display = 'inline-block';
  title.style.maxWidth = '500px';
  title.style.textAlign = 'center';
  title.style.margin = '20px auto';
  title.classList.add('company-title');

  const titleWrapper = document.createElement('div');
  titleWrapper.style.display = 'flex';
  titleWrapper.style.justifyContent = 'center';
  titleWrapper.style.width = '100%';
  titleWrapper.appendChild(title);
  wrapper.appendChild(titleWrapper);

  const companyDiv = document.createElement('div');
  companyDiv.id = `${company.id}-grid`;
  companyDiv.classList.add('grid-container');
  wrapper.appendChild(companyDiv);

  grid.insertBefore(wrapper, grid.firstChild);

  fetch(company.jsonPath)
    .then(res => res.json())
    .then(data => {
      data.jobs.forEach(job => {
        const card = document.createElement('div');
        card.classList.add('job-card');
        card.innerHTML = `
          <strong>${job.title}</strong>
          ${job.location || ''} ${job.remote ? `- ${job.remote}` : ''}
        `;
        card.style.backgroundColor = 'rgba(210, 208, 204, 0.31)';
        card.style.borderColor = 'rgb(100, 101, 101)';
        card.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.2)';
        card.style.cursor = 'pointer';

        const linkToOpen = job.link || company.website || '#';
        card.addEventListener('click', () => {
          window.open(linkToOpen, '_blank');
        });

        companyDiv.appendChild(card);
      });

      const status = document.getElementById('updateStatus');
      status.textContent = `Last updated: ${new Date().toLocaleDateString()}`;
      status.style.textAlign = 'right';
      status.style.marginTop = '15px';
    })
    .catch(err => console.error(`Failed to load ${company.jsonPath}:`, err));
}

