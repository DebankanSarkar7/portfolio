// Embedded Endurance Data
const enduranceData = {
  cyclingStats: {
    totalDistance: '15,234 km',
    totalTime: '523:45:30',
    activities: 156,
    elevation: '45,678 m',
    longestRide: '102.9 km',
    avgSpeed: '16.0 km/h'
  },
  cyclingHighlights: [
    {
      title: 'July Gran Fondo Challenge',
      date: 'July 11, 2026',
      location: 'Kolkata Circuit',
      achievement: '100 km completed in 6h 15m'
    },
    {
      title: '50 km Challenge',
      date: 'Completed',
      location: 'Training Route',
      achievement: '50 km cycling challenge completed'
    },
    {
      title: '25 km Challenge',
      date: 'Completed',
      location: 'Training Route',
      achievement: '25 km cycling challenge completed'
    },
    {
      title: 'Century Ride',
      date: 'Target',
      location: 'Planning',
      achievement: '100 km cycling challenge'
    }
  ],
  gallery: {
    marathons: [
      {
        image: 'images/marathon1.jpg',
        title: 'Kolkata Marathon 2026',
        date: 'January 2026',
        description: 'First marathon completion'
      },
      {
        image: 'images/marathon2.jpg',
        title: 'Mumbai City Marathon',
        date: 'Upcoming',
        description: 'Target: Sub-3 hours'
      },
      {
        image: 'images/marathon3.jpg',
        title: 'Training Run',
        date: 'August 2026',
        description: '32km long run preparation'
      }
    ],
    cycling: [
      {
        image: 'images/cycling1.jpg',
        title: 'Century Ride',
        date: 'July 2026',
        description: '180km through Bengal countryside'
      },
      {
        image: 'images/cycling2.jpg',
        title: 'Hill Climb',
        date: 'June 2026',
        description: 'Darjeeling mountain challenge'
      },
      {
        image: 'images/cycling3.jpg',
        title: 'Group Ride',
        date: 'May 2026',
        description: 'Leading the peloton'
      }
    ],
    medals: [
      {
        image: 'images/medal1.jpg',
        title: 'Marathon Finisher',
        date: 'January 2026',
        description: 'Kolkata Marathon'
      },
      {
        image: 'images/medal2.jpg',
        title: 'Century Rider',
        date: 'July 2026',
        description: '180km achievement'
      },
      {
        image: 'images/medal3.jpg',
        title: 'Hill Climb Champion',
        date: 'June 2026',
        description: 'Darjeeling challenge'
      }
    ]
  },
  upcomingRaces: [
    {
      name: 'Kolkata Marathon 2026',
      date: 'September 15, 2026',
      location: 'Kolkata, India',
      distance: '42.2 km',
      goal: 'Sub-3:00',
      status: 'Training',
      type: 'Running'
    },
    {
      name: 'Mumbai City Marathon',
      date: 'January 15, 2027',
      location: 'Mumbai, India',
      distance: '42.2 km',
      goal: 'Sub-2:55',
      status: 'Registered',
      type: 'Running'
    },
    {
      name: 'Bengal Century Ride',
      date: 'November 10, 2026',
      location: 'Kolkata to Digha',
      distance: '160 km',
      goal: 'Sub-5 hours',
      status: 'Training',
      type: 'Cycling'
    },
    {
      name: 'Delhi Half Marathon',
      date: 'October 20, 2026',
      location: 'New Delhi, India',
      distance: '21.1 km',
      goal: 'Sub-1:20',
      status: 'Training',
      type: 'Running'
    }
  ],
  monthlyAchievements: [
    {
      month: 'August 2026',
      totalDistance: '1,247 km',
      totalTime: '92:45:30',
      longestRun: '32 km',
      avgPace: '5:42/km',
      keyAchievement: 'First 1200+ km month'
    },
    {
      month: 'July 2026',
      totalDistance: '1,156 km',
      totalTime: '85:30:15',
      longestRun: '28 km',
      avgPace: '5:35/km',
      keyAchievement: 'Completed 100 km Gran Fondo in 6h 15m'
    },
    {
      month: 'June 2026',
      totalDistance: '1,089 km',
      totalTime: '79:15:45',
      longestRun: '25 km',
      avgPace: '5:48/km',
      keyAchievement: 'Built strong aerobic base'
    }
  ],
  stravaStats: {
    totalDistance: '8,456 km',
    totalTime: '623:45:30',
    activities: 284,
    elevation: '12,450 m',
    currentStreak: 45
  },
  personalRecords: [
    {
      distance: '1K',
      time: '7:46',
      date: 'Recent',
      pace: '7:46/km'
    },
    {
      distance: '1 Mile',
      time: '13:11',
      date: 'Recent',
      pace: '8:11/mile'
    },
    {
      distance: '2 Mile',
      time: '30:01',
      date: 'Recent',
      pace: '15:00/mile'
    },
    {
      distance: '5K',
      time: '46:19',
      date: 'Recent',
      pace: '9:16/km'
    }
  ]
};

// DOM Elements
const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const navLinks = document.querySelectorAll('.site-nav a');
const themeToggle = document.querySelector('.theme-toggle');
const scrollProgress = document.querySelector('.topbar-progress');
const racesList = document.querySelector('#races-list');
const achievementsList = document.querySelector('#achievements-list');
const stravaStats = document.querySelector('#strava-stats');
const prsList = document.querySelector('#prs-list');
const blogsList = document.querySelector('#blogs-list');
const cyclingStats = document.querySelector('#cycling-stats');
const cyclingHighlightsList = document.querySelector('#cycling-highlights-list');
const marathonsGallery = document.querySelector('#marathons-gallery');
const cyclingGallery = document.querySelector('#cycling-gallery');
const medalsGallery = document.querySelector('#medals-gallery');
const sections = document.querySelectorAll('section, .hero-copy, .hero-media');

// Navigation Toggle
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

// Theme Toggle
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

// Scroll Progress
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  if (scrollProgress) {
    scrollProgress.style.width = `${progress}%`;
  }
});

// Reveal on Scroll
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

// Load Upcoming Races
function loadRaces() {
  if (!racesList) return;

  try {
    const races = enduranceData.upcomingRaces || [];

    if (!races.length) {
      racesList.innerHTML = '<div class="race-card placeholder"><p>No upcoming races scheduled.</p></div>';
      return;
    }

    const html = races.map((race) => `
      <article class="race-card">
        <div class="race-header">
          <h3>${race.name}</h3>
          <div class="race-badges">
            <span class="race-type ${race.type.toLowerCase()}">${race.type}</span>
            <span class="race-status ${race.status.toLowerCase()}">${race.status}</span>
          </div>
        </div>
        <div class="race-details">
          <div class="race-detail">
            <span class="race-label">Date</span>
            <span class="race-value">${race.date}</span>
          </div>
          <div class="race-detail">
            <span class="race-label">Location</span>
            <span class="race-value">${race.location}</span>
          </div>
          <div class="race-detail">
            <span class="race-label">Distance</span>
            <span class="race-value">${race.distance}</span>
          </div>
          <div class="race-detail">
            <span class="race-label">Goal</span>
            <span class="race-value goal">${race.goal}</span>
          </div>
        </div>
      </article>
    `).join('');

    racesList.innerHTML = html;
  } catch (error) {
    racesList.innerHTML = '<div class="race-card placeholder"><p>Error loading race data.</p></div>';
    console.error('Races load error:', error);
  }
}

// Load Monthly Achievements
function loadAchievements() {
  if (!achievementsList) return;

  try {
    const achievements = enduranceData.monthlyAchievements || [];

    if (!achievements.length) {
      achievementsList.innerHTML = '<div class="achievement-card placeholder"><p>No achievement data available.</p></div>';
      return;
    }

    const html = achievements.map((achievement) => `
      <article class="achievement-card">
        <div class="achievement-header">
          <h3>${achievement.month}</h3>
          <span class="achievement-highlight">${achievement.keyAchievement}</span>
        </div>
        <div class="achievement-stats">
          <div class="achievement-stat">
            <span class="stat-number">${achievement.totalDistance}</span>
            <span class="stat-label">Total Distance</span>
          </div>
          <div class="achievement-stat">
            <span class="stat-number">${achievement.totalTime}</span>
            <span class="stat-label">Total Time</span>
          </div>
          <div class="achievement-stat">
            <span class="stat-number">${achievement.longestRun}</span>
            <span class="stat-label">Longest Run</span>
          </div>
          <div class="achievement-stat">
            <span class="stat-number">${achievement.avgPace}</span>
            <span class="stat-label">Avg Pace</span>
          </div>
        </div>
      </article>
    `).join('');

    achievementsList.innerHTML = html;
  } catch (error) {
    achievementsList.innerHTML = '<div class="achievement-card placeholder"><p>Error loading achievement data.</p></div>';
    console.error('Achievements load error:', error);
  }
}

// Load Strava Stats
function loadStravaStats() {
  if (!stravaStats) return;

  try {
    const stats = enduranceData.stravaStats;

    const html = `
      <div class="strava-stat-card">
        <span class="strava-stat-number">${stats.totalDistance}</span>
        <span class="strava-stat-label">Total Distance</span>
      </div>
      <div class="strava-stat-card">
        <span class="strava-stat-number">${stats.totalTime}</span>
        <span class="strava-stat-label">Total Time</span>
      </div>
      <div class="strava-stat-card">
        <span class="strava-stat-number">${stats.activities}</span>
        <span class="strava-stat-label">Activities</span>
      </div>
      <div class="strava-stat-card">
        <span class="strava-stat-number">${stats.elevation}</span>
        <span class="strava-stat-label">Elevation Gain</span>
      </div>
      <div class="strava-stat-card">
        <span class="strava-stat-number">${stats.currentStreak}</span>
        <span class="strava-stat-label">Day Streak</span>
      </div>
    `;

    stravaStats.innerHTML = html;
  } catch (error) {
    stravaStats.innerHTML = '<div class="strava-stat-card placeholder"><p>Error loading Strava stats.</p></div>';
    console.error('Strava stats load error:', error);
  }
}

// Load Personal Records
function loadPRs() {
  if (!prsList) return;

  try {
    const prs = enduranceData.personalRecords || [];

    if (!prs.length) {
      prsList.innerHTML = '<div class="pr-card placeholder"><p>No PR data available.</p></div>';
      return;
    }

    const html = prs.map((pr) => `
      <article class="pr-card">
        <div class="pr-distance">${pr.distance}</div>
        <div class="pr-time">${pr.time}</div>
        <div class="pr-details">
          <span class="pr-pace">${pr.pace}</span>
          <span class="pr-date">${pr.date}</span>
        </div>
      </article>
    `).join('');

    prsList.innerHTML = html;
  } catch (error) {
    prsList.innerHTML = '<div class="pr-card placeholder"><p>Error loading PR data.</p></div>';
    console.error('PRs load error:', error);
  }
}

// Load Endurance Blogs from Medium RSS
function loadEnduranceBlogs() {
  if (!blogsList) return;

  try {
    // Use a CORS proxy to fetch Medium RSS feed
    const rssUrl = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@debankansarkar';
    
    fetch(rssUrl)
      .then(response => response.json())
      .then(data => {
        if (data.status !== 'ok') {
          throw new Error('RSS feed error');
        }
        
        const items = data.items || [];
        const endurancePosts = [];
        
        // Filter for endurance-related posts - stricter matching
        const enduranceKeywords = ['endurance', 'running', 'marathon', 'training', 'fitness', 'pace', 'distance', 'strava', 'athlete', 'tempo', 'threshold'];
        const excludeKeywords = ['devops', 'aws', 'cloud', 'data', 'pipeline', 'api', 'docker', 'kubernetes', 'git', 'python', 'sql'];
        
        items.forEach(item => {
          const title = item.title || '';
          const link = item.link || '';
          const pubDate = item.pubDate || '';
          const description = item.description || '';
          const categories = item.categories || [];
          
          // Check if post is endurance-related and not tech-related
          const titleLower = title.toLowerCase();
          const descLower = description.toLowerCase();
          const catsLower = categories.map(c => c.toLowerCase()).join(' ');
          
          // Must contain endurance keyword
          const hasEnduranceKeyword = enduranceKeywords.some(keyword => 
            titleLower.includes(keyword) || 
            descLower.includes(keyword) ||
            catsLower.includes(keyword)
          );
          
          // Must NOT contain exclude keywords
          const hasExcludeKeyword = excludeKeywords.some(keyword => 
            titleLower.includes(keyword) || 
            descLower.includes(keyword)
          );
          
          if (hasEnduranceKeyword && !hasExcludeKeyword) {
            const date = pubDate ? new Date(pubDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '';
            const cleanDescription = description.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 135);
            
            endurancePosts.push({
              title,
              link,
              pubDate: date,
              description: cleanDescription.length ? cleanDescription + '...' : 'Read more on Medium.'
            });
          }
        });
        
        if (endurancePosts.length === 0) {
          blogsList.innerHTML = '<article class="blog-card placeholder"><p>No endurance blogs found yet. Write your first endurance post on Medium!</p></article>';
          return;
        }
        
        const html = endurancePosts.slice(0, 6).map(blog => `
          <article class="blog-card">
            <span class="blog-date">${blog.pubDate}</span>
            <h3>${blog.title}</h3>
            <p>${blog.description}</p>
            <a class="blog-link" href="${blog.link}" target="_blank" rel="noreferrer">Read on Medium →</a>
          </article>
        `).join('');
        
        blogsList.innerHTML = html;
      })
      .catch(error => {
        console.error('Medium RSS fetch error:', error);
        // Fallback to direct Medium link
        blogsList.innerHTML = `
          <article class="blog-card">
            <h3>Read on Medium</h3>
            <p>Check out my endurance-related posts on Medium, tagged with #endurance, #running, #marathon, and more.</p>
            <a class="blog-link" href="https://medium.com/@debankansarkar" target="_blank" rel="noreferrer">Visit Medium Profile →</a>
          </article>
        `;
      });
  } catch (error) {
    blogsList.innerHTML = '<article class="blog-card placeholder"><p>Error loading blog data.</p></article>';
    console.error('Blogs load error:', error);
  }
}

// Load Cycling Stats
function loadCyclingStats() {
  if (!cyclingStats) return;

  try {
    const stats = enduranceData.cyclingStats;

    const html = `
      <div class="cycling-stat-card">
        <span class="cycling-stat-number">${stats.totalDistance}</span>
        <span class="cycling-stat-label">Total Distance</span>
      </div>
      <div class="cycling-stat-card">
        <span class="cycling-stat-number">${stats.totalTime}</span>
        <span class="cycling-stat-label">Total Time</span>
      </div>
      <div class="cycling-stat-card">
        <span class="cycling-stat-number">${stats.activities}</span>
        <span class="cycling-stat-label">Activities</span>
      </div>
      <div class="cycling-stat-card">
        <span class="cycling-stat-number">${stats.elevation}</span>
        <span class="cycling-stat-label">Elevation Gain</span>
      </div>
      <div class="cycling-stat-card">
        <span class="cycling-stat-number">${stats.longestRide}</span>
        <span class="cycling-stat-label">Longest Ride</span>
      </div>
      <div class="cycling-stat-card">
        <span class="cycling-stat-number">${stats.avgSpeed}</span>
        <span class="cycling-stat-label">Avg Speed</span>
      </div>
    `;

    cyclingStats.innerHTML = html;
  } catch (error) {
    cyclingStats.innerHTML = '<div class="cycling-stat-card placeholder"><p>Error loading cycling stats.</p></div>';
    console.error('Cycling stats load error:', error);
  }
}

// Load Cycling Highlights
function loadCyclingHighlights() {
  if (!cyclingHighlightsList) return;

  try {
    const highlights = enduranceData.cyclingHighlights || [];

    if (!highlights.length) {
      cyclingHighlightsList.innerHTML = '<div class="cycling-highlight-card placeholder"><p>No cycling highlights yet.</p></div>';
      return;
    }

    const html = highlights.map((highlight) => `
      <article class="cycling-highlight-card">
        <div class="highlight-header">
          <h3>${highlight.title}</h3>
          <span class="highlight-date">${highlight.date}</span>
        </div>
        <div class="highlight-location">${highlight.location}</div>
        <div class="highlight-achievement">${highlight.achievement}</div>
      </article>
    `).join('');

    cyclingHighlightsList.innerHTML = html;
  } catch (error) {
    cyclingHighlightsList.innerHTML = '<div class="cycling-highlight-card placeholder"><p>Error loading cycling highlights.</p></div>';
    console.error('Cycling highlights load error:', error);
  }
}

// Load Gallery
function loadGallery() {
  if (!marathonsGallery || !cyclingGallery || !medalsGallery) return;

  try {
    const gallery = enduranceData.gallery;

    const renderGalleryCards = (items) => {
      if (!items.length) {
        return '<div class="gallery-card placeholder"><p>No photos yet.</p></div>';
      }
      return items.map((item) => `
        <article class="gallery-card">
          <div class="gallery-image-container">
            <div class="gallery-placeholder">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/>
              </svg>
              <span>Add Photo</span>
            </div>
          </div>
          <div class="gallery-info">
            <h4>${item.title}</h4>
            <span class="gallery-date">${item.date}</span>
            <p class="gallery-description">${item.description}</p>
          </div>
        </article>
      `).join('');
    };

    marathonsGallery.innerHTML = renderGalleryCards(gallery.marathons);
    cyclingGallery.innerHTML = renderGalleryCards(gallery.cycling);
    medalsGallery.innerHTML = renderGalleryCards(gallery.medals);
  } catch (error) {
    console.error('Gallery load error:', error);
  }
}

// Gallery Tab Switching
function setupGalleryTabs() {
  const tabs = document.querySelectorAll('.gallery-tab');
  const galleries = {
    marathons: document.querySelector('#marathons-gallery'),
    cycling: document.querySelector('#cycling-gallery'),
    medals: document.querySelector('#medals-gallery')
  };

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      // Hide all galleries
      Object.values(galleries).forEach(gallery => {
        if (gallery) gallery.style.display = 'none';
      });

      // Show selected gallery
      const tabName = tab.dataset.tab;
      if (galleries[tabName]) {
        galleries[tabName].style.display = 'grid';
      }
    });
  });

  // Show marathons by default
  if (galleries.marathons) galleries.marathons.style.display = 'grid';
  if (galleries.cycling) galleries.cycling.style.display = 'none';
  if (galleries.medals) galleries.medals.style.display = 'none';
}

// Load all data when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadRaces();
  loadAchievements();
  loadStravaStats();
  loadPRs();
  loadEnduranceBlogs();
  loadCyclingStats();
  loadCyclingHighlights();
  loadGallery();
  setupGalleryTabs();
});