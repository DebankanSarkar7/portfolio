const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const themeToggle = document.querySelector('.theme-toggle');
const copyEmailButton = document.querySelector('.copy-email');
const scrollProgress = document.querySelector('.topbar-progress');
const techList = document.querySelector('#tech-list');
const enduranceList = document.querySelector('#endurance-list');
const experienceList = document.querySelector('#experience-list');
const skillsList = document.querySelector('#skills-list');
const sections = document.querySelectorAll('section, .hero-copy, .hero-media');

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

async function loadMediumStories() {
  if (!techList || !enduranceList) return;

  try {
    const res = await fetch('/.netlify/functions/medium');
    if (!res.ok) throw new Error('Network response was not ok');

    const data = await res.json();
    const items = Array.isArray(data.items) ? data.items : [];

    if (!items.length) {
      techList.innerHTML = '<article class="medium-card placeholder"><p>No stories found.</p></article>';
      enduranceList.innerHTML = '<article class="medium-card placeholder"><p>No stories found.</p></article>';
      return;
    }

    const techItems = items.filter(item => item.category === 'tech' || item.category === 'both');
    const enduranceItems = items.filter(item => item.category === 'endurance' || item.category === 'both');

    function renderCards(cardList, categorizedItems) {
      if (!categorizedItems.length) {
        return '<article class="medium-card placeholder"><p>No stories in this category yet.</p></article>';
      }
      return categorizedItems.map((item) => `
        <article class="medium-card">
          <span class="medium-date">${item.pubDate}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <a class="medium-link" href="${item.link}" target="_blank" rel="noreferrer">Read on Medium →</a>
        </article>
      `).join('');
    }

    techList.innerHTML = renderCards(techList, techItems);
    enduranceList.innerHTML = renderCards(enduranceList, enduranceItems);
  } catch (error) {
    techList.innerHTML = '';
    enduranceList.innerHTML = '';
    console.error('Medium load error:', error);
  }
}

loadMediumStories();

async function loadExperience() {
  if (!experienceList) return;

  try {
    const res = await fetch('/.netlify/functions/experience');
    if (!res.ok) throw new Error('Network response was not ok');

    const data = await res.json();
    const positions = Array.isArray(data.positions) ? data.positions : [];

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
          ${pos.description ? `<p>${pos.description}</p>` : ''}
        </article>
      `;
    }).join('');

    experienceList.innerHTML = html;
  } catch (error) {
    experienceList.innerHTML = '<article class="experience-card placeholder"><p>Error loading experience data.</p></article>';
    console.error('Experience load error:', error);
  }
}

async function loadSkills() {
  if (!skillsList) return;

  try {
    const res = await fetch('/.netlify/functions/skills');
    if (!res.ok) throw new Error('Network response was not ok');

    const data = await res.json();
    const skills = Array.isArray(data.skills) ? data.skills : [];

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

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }
});
