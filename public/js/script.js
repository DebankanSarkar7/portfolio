const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const themeToggle = document.querySelector('.theme-toggle');
const copyEmailButton = document.querySelector('.copy-email');
const scrollProgress = document.querySelector('.topbar-progress');
const techList = document.querySelector('#tech-list');
const experienceList = document.querySelector('#experience-list');
const skillsList = document.querySelector('#skills-list');
const sections = document.querySelectorAll('section, .hero-copy, .hero-media');

// Embedded LinkedIn Data
const linkedInData = {
  positions: [
    {
      company: 'Tata Consultancy Services',
      title: 'Data Engineer',
      description: `<ul>
<li>Designed and developed enterprise-scale data platforms on AWS using S3, Lambda, Glue, and Python</li>
<li>Integrated diverse business platforms into centralized cloud data platforms through robust ETL pipelines</li>
<li>Optimized SQL databases for downstream API and application consumption, improving data accessibility</li>
<li>Implemented real-time data pipelines using PySpark, AWS DMS, SQS, CloudWatch, DynamoDB, and RDS</li>
<li>Conducted comprehensive data analysis to design cost-effective, high-performance data pipelines</li>
</ul>`,
      location: 'Kolkata',
      startDate: 'Apr 2025',
      endDate: 'Present'
    }
  ],
  skills: [
    'Amazon Athena',
    'AWS Lambda',
    'Extract, Transform, Load (ETL)',
    'SQL',
    'Amazon S3',
    'Data Engineering',
    'PySpark',
    'Amazon Web Services (AWS)',
    'Software Development',
    'Git',
    'Computer Science',
    'Python (Programming Language)',
    'Operating Systems',
    'Networking',
    'Engineering',
    'Communication',
    'English'
  ]
};

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!expanded));
    navToggle.classList.toggle('open');
    siteNav.classList.toggle('open');
  });
}

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (siteNav.classList.contains('open')) {
      siteNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
});

if (themeToggle) {
  const savedTheme = localStorage.getItem('portfolioTheme');
  if (savedTheme) {
    document.body.dataset.theme = savedTheme;
    themeToggle.textContent = savedTheme === 'light' ? '☀️' : '🌙';
  }

  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'light' ? 'dark' : 'light';
    document.body.dataset.theme = nextTheme;
    localStorage.setItem('portfolioTheme', nextTheme);
    themeToggle.textContent = nextTheme === 'light' ? '☀️' : '🌙';
  });
}

if (copyEmailButton) {
  copyEmailButton.addEventListener('click', async () => {
    const email = copyEmailButton.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      copyEmailButton.textContent = 'Copied!';
      setTimeout(() => {
        copyEmailButton.textContent = 'Copy email';
      }, 1800);
    } catch (error) {
      console.error('Copy failed', error);
    }
  });
}

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.2,
});

sections.forEach((section) => {
  revealObserver.observe(section);
});

function loadMediumStories() {
  if (!techList) return;

  try {
    // Embedded sample Medium data - tech only
    const mediumData = {
      tech: [
        {
          title: 'Modern Data Architecture for Real Workload',
          description: 'Why the best platforms combine low-latency queries with strong governance and disciplined ingestion.',
          pubDate: 'Aug 5, 2026',
          link: 'https://medium.com/@debankansarkar'
        },
        {
          title: 'Observability That Doesn\'t Sleep',
          description: 'From alerting rules to incident narratives, everything is built to keep the pipeline moving.',
          pubDate: 'Jul 28, 2026',
          link: 'https://medium.com/@debankansarkar'
        },
        {
          title: 'Building Resilient Data Pipelines',
          description: 'Lessons from production failures and how to design systems that recover gracefully.',
          pubDate: 'Jul 10, 2026',
          link: 'https://medium.com/@debankansarkar'
        }
      ]
    };

    function renderCards(items) {
      if (!items.length) {
        return '<article class="medium-card placeholder"><p>No stories in this category yet.</p></article>';
      }
      return items.map((item) => `
        <article class="medium-card">
          <span class="medium-date">${item.pubDate}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a class="medium-link" href="${item.link}" target="_blank" rel="noreferrer">Read on Medium →</a>
        </article>
      `).join('');
    }

    techList.innerHTML = renderCards(mediumData.tech);
  } catch (error) {
    techList.innerHTML = '<article class="medium-card placeholder"><p>Error loading tech stories.</p></article>';
    console.error('Medium load error:', error);
  }
}

function loadExperience() {
  if (!experienceList) return;

  try {
    const positions = linkedInData.positions || [];

    if (!positions.length) {
      experienceList.innerHTML = '<article class="experience-card placeholder"><p>No experience data found.</p></article>';
      return;
    }

    const html = positions.map((pos) => {
      const dateRange = pos.endDate === 'Present'
        ? `${pos.startDate} - Present`
        : `${pos.startDate} - ${pos.endDate}`;

      return `
        <article class="experience-card">
          <div class="experience-header">
            <h3>${pos.title}</h3>
          </div>
          <div class="experience-company">${pos.company}</div>
          <div class="experience-dates">${dateRange}</div>
          ${pos.location ? `<div class="experience-location">${pos.location}</div>` : ''}
          ${pos.description ? `<div class="experience-description">${pos.description}</div>` : ''}
        </article>
      `;
    }).join('');

    experienceList.innerHTML = html;
  } catch (error) {
    experienceList.innerHTML = '<article class="experience-card placeholder"><p>Error loading experience data.</p></article>';
    console.error('Experience load error:', error);
  }
}

function loadSkills() {
  if (!skillsList) return;

  try {
    const skills = linkedInData.skills || [];

    if (!skills.length) {
      skillsList.innerHTML = '<span class="skill-tag placeholder">No skills found.</span>';
      return;
    }

    const html = skills.map((skill) => `<span class="skill-tag">${skill}</span>`).join('');
    skillsList.innerHTML = html;
  } catch (error) {
    skillsList.innerHTML = '<span class="skill-tag placeholder">Error loading skills.</span>';
    console.error('Skills load error:', error);
  }
}

loadExperience();
loadSkills();
loadMediumStories();

// Load data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadExperience();
  loadSkills();
  loadMediumStories();
});

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }
});
