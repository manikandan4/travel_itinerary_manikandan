// index_templates.js

// Timeline and Card Data (for easy future extension)
const timelineData = [
  {
    date: 'Monday, June 16th, 2025',
    subtitle: 'Day One: Arrival & First Impressions',
    timeline: [
      { time: '2:20 PM', desc: '✈️ Flight Landing & Immigration' },
      { time: '3:00 PM', desc: '🚗 Car Rental Pickup (Gate 3)' },
      { time: '4:30 PM', desc: '🏨 Hotel Check-in & Rest' },
      { time: '5:30 PM', desc: '🦅 Eagle Square Visit' },
      { time: '6:45 PM', desc: '🛍️ Shopping Mall Visit' },
      { time: '8:00 PM', desc: '🍽️ Dinner at AROOS DAMASCUS' },
      { time: '9:30 PM', desc: '🌙 Return to Hotel' },
    ],
    cards: [
      {
        icon: '🚗',
        title: 'Airport to Bayview Hotel',
        desc: 'Your arrival journey from Langkawi International Airport to your accommodation at Bayview Hotel.',
        meta: ['3:30 - 4:00 PM', 'June 16', '~30 mins'],
        link: 'routePages/airport_bayview.html',
      },
      {
        icon: '🦅',
        title: 'Hotel to Eagle Square',
        desc: 'Evening visit to the iconic Eagle Square (Dataran Lang) - perfect for sunset photos and local atmosphere.',
        meta: ['5:30 - 5:45 PM', 'June 16', '~15 mins'],
        link: 'routePages/bayview_eaglesquare.html',
      },
      {
        icon: '🛍️',
        title: 'Eagle Square to Shopping Mall',
        desc: 'Quick shopping visit at Langkawi Fair Shopping Mall before dinner - browse local goods and souvenirs.',
        meta: ['6:45 - 7:00 PM', 'June 16', '~15 mins'],
        link: 'routePages/eagle_shopping.html',
      },
      {
        icon: '🍽️',
        title: 'Shopping Mall to Dinner',
        desc: 'Journey to AROOS DAMASCUS restaurant for authentic Middle Eastern cuisine - perfect evening dining experience.',
        meta: ['7:45 - 8:00 PM', 'June 16', '~15 mins'],
        link: 'routePages/shopping_dinner.html',
      },
      {
        icon: '🌙',
        title: 'Dinner to Hotel',
        desc: 'Return journey back to Bayview Hotel after a delicious dinner to end the first day of your Langkawi adventure.',
        meta: ['9:15 - 9:30 PM', 'June 16', '~15 mins'],
        link: 'routePages/dinner_hotel.html',
      },
    ],
  },
  {
    date: 'Tuesday, June 17th, 2025',
    subtitle: 'Day Two: SkyBridge, Paddy Fields & Beach Bliss',
    timeline: [
      { time: '7:45 AM', desc: '🍳 Breakfast at Bayview Hotel' },
      { time: '9:00 AM', desc: '🚗 Bayview Hotel → Skybridge Parking' },
      { time: '10:00 AM – 1:45 PM', desc: '🏞️ SkyBridge, Oriental Village, Cable Car, SkyCab, Eagle Nest Skywalk, 3D Art, Sky Dome, snacks at Skybridge Bistro' },
      { time: '1:50 PM', desc: '🍛 Skybridge Parking → Pia’s the Padi' },
      { time: '2:30 PM', desc: '🍽️ Lunch at Pia’s the Padi' },
      { time: '3:30 PM', desc: '🛏️ Pia’s the Padi → Bayview Hotel' },
      { time: '4:00 – 5:30 PM', desc: '😴 Rest at Bayview Hotel' },
      { time: '5:30 PM', desc: '🏖️ Bayview Hotel → Cenang Mall' },
      { time: '6:15 – 8:00 PM', desc: '🌅 Pantai Cenang & Tengah Beach, shopping' },
      { time: '7:50 PM', desc: '🍹 Cenang Mall → Hidden Langkawi' },
      { time: '8:00 PM', desc: '🍽️ Dinner at Hidden Langkawi' },
      { time: '9:15 PM', desc: '🌙 Hidden Langkawi → Bayview Hotel' },
    ],
    cards: [
      {
        icon: '🚗',
        title: 'Bayview Hotel → Skybridge Parking',
        desc: 'Scenic drive to the SkyBridge adventure base.',
        meta: ['9:00 - 10:00 AM', 'June 17', '~50 mins'],
        link: 'routePages/bayview_skybridge.html',
      },
      {
        icon: '🍛',
        title: 'Skybridge Parking → Pia’s the Padi',
        desc: 'Drive to a scenic paddy field restaurant for lunch.',
        meta: ['1:50 - 2:30 PM', 'June 17', '~35 mins'],
        link: 'routePages/skybridge_padi.html',
      },
      {
        icon: '🛏️',
        title: 'Pia’s the Padi → Bayview Hotel',
        desc: 'Return to hotel for a restful break.',
        meta: ['3:30 - 4:00 PM', 'June 17', '~25 mins'],
        link: 'routePages/padi_bayview.html',
      },
      {
        icon: '🏖️',
        title: 'Bayview Hotel → Cenang Mall',
        desc: 'Head to Pantai Cenang for beach and shopping.',
        meta: ['5:30 - 6:15 PM', 'June 17', '~45 mins'],
        link: 'routePages/bayview_cenangmall.html',
      },
      {
        icon: '🍹',
        title: 'Cenang Mall → Hidden Langkawi',
        desc: 'Short drive to a unique beach bar for dinner.',
        meta: ['7:50 - 8:00 PM', 'June 17', '~10 mins'],
        link: 'routePages/cenangmall_hidden.html',
      },
      {
        icon: '🌙',
        title: 'Hidden Langkawi → Bayview Hotel',
        desc: 'Return to hotel and end of Day 2.',
        meta: ['9:15 - 10:00 PM', 'June 17', '~40 mins'],
        link: 'routePages/hidden_bayview.html',
      },
    ],
  },
  {
    date: 'Wednesday, June 18th, 2025',
    subtitle: 'Day Three: Kilim Geoforest, Waterfall & Local Flavors',
    timeline: [
      { time: '7:45 AM', desc: '🍳 Breakfast at Bayview Hotel' },
      { time: '9:00 AM', desc: '🚗 Bayview Hotel → Tanjung Rhu Mangrove Jetty' },
      { time: '9:45 AM', desc: '🛥️ Arrive at Jetty, prep for boat ride' },
      { time: '10:00 AM', desc: '🌳 Mangrove Boat Ride: Bat Cave, Crocodile Cave, Andaman Sea, Eagle Watching, Monkey Area, Kilim Geopark, Gorilla Mountain, Fish Farm' },
      { time: '1:45 PM', desc: '🛥️ Return to Jetty' },
      { time: '2:00 PM', desc: '🍽️ Jetty → The Kelapa Cafe by TRV Langkawi' },
      { time: '2:15 PM', desc: '🍽️ Lunch at The Kelapa Cafe' },
      { time: '3:30 PM', desc: '🚗 Kelapa Cafe → Durian Perangin Waterfall' },
      { time: '3:45 PM', desc: '💧 Durian Perangin Waterfall: Explore & Snack' },
      { time: '5:30 PM', desc: '🚗 Waterfall → Bayview Hotel (Rest)' },
      { time: '7:00 PM', desc: '🙏 Bayview Hotel → Sri Murugan Temple' },
      { time: '7:15 PM', desc: '🙏 Prayers at Sri Murugan Temple' },
      { time: '8:00 PM', desc: '🍽️ Temple → The Fat Frog Restaurant' },
      { time: '8:20 PM', desc: '🍽️ Dinner at The Fat Frog' },
      { time: '9:30 PM', desc: '🚗 The Fat Frog → Bayview Hotel' },
      { time: '10:00 PM', desc: '🌙 End of Day: Rest at Bayview Hotel' },
    ],
    cards: [
      {
        icon: '🛥️',
        title: 'Bayview Hotel → Tanjung Rhu Mangrove Jetty',
        desc: 'Morning drive to the jetty for Kilim Geoforest Park & Mangrove adventure.',
        meta: ['9:00 - 9:45 AM', 'June 18', '~40 mins'],
        link: 'routePages/bayview_tanjungrhu.html',
      },
      {
        icon: '🌳',
        title: 'Mangrove Boat Ride',
        desc: 'Explore Bat Cave, Crocodile Cave, Andaman Sea, Eagle Watching, Monkey Area, Kilim Geopark, Gorilla Mountain, Fish Farm.',
        meta: ['10:00 AM - 1:45 PM', 'June 18', 'Boat Tour'],
        link: 'routePages/mangrove_boatride.html',
      },
      {
        icon: '🍽️',
        title: 'Jetty → The Kelapa Cafe',
        desc: 'Short drive for lunch at The Kelapa Cafe by TRV Langkawi.',
        meta: ['2:00 - 2:15 PM', 'June 18', '~10 mins'],
        link: 'routePages/jetty_kelapacafe.html',
      },
      {
        icon: '💧',
        title: 'Kelapa Cafe → Durian Perangin Waterfall',
        desc: 'Drive to the scenic Durian Perangin Waterfall for a refreshing break.',
        meta: ['3:30 - 3:45 PM', 'June 18', '~10 mins'],
        link: 'routePages/kelapacafe_waterfall.html',
      },
      {
        icon: '🙏',
        title: 'Bayview Hotel → Sri Murugan Temple',
        desc: 'Evening visit and prayers at Sri Murugan Temple.',
        meta: ['7:00 - 7:15 PM', 'June 18', '~10 mins'],
        link: 'routePages/hotel_murugan.html',
      },
      {
        icon: '🍽️',
        title: 'Temple → The Fat Frog Restaurant',
        desc: 'Dinner at The Fat Frog, a local favorite for relaxing and unwinding.',
        meta: ['8:00 - 8:20 PM', 'June 18', '~15 mins'],
        link: 'routePages/murugan_fatfrog.html',
      },
      {
        icon: '🌙',
        title: 'The Fat Frog → Bayview Hotel',
        desc: 'Return to Bayview Hotel and rest for the night.',
        meta: ['9:30 - 10:00 PM', 'June 18', '~25 mins'],
        link: 'routePages/fatfrog_hotel.html',
      },
    ],
  },
  {
    date: 'Thursday, June 19th, 2025',
    subtitle: 'Day Four: Farewell to Paradise',
    timeline: [
      { time: '7:00 AM', desc: '🍳 Breakfast at Bayview Hotel' },
      { time: '8:00 AM', desc: '🧳 Hotel Checkout' },
      { time: '8:15 AM', desc: '🚗 Bayview Hotel → Langkawi International Airport' },
      { time: '8:45 AM', desc: '🚗 Car Rental Handover at Airport' },
      { time: '9:30 AM', desc: '🛫 Airport Check-in & Departure' },
      { time: '3:15 PM', desc: '🏠 Arrive Johor Bahru' },
    ],
    cards: [
      {
        icon: '🚗',
        title: 'Bayview Hotel → Langkawi International Airport',
        desc: 'Final morning drive from Bayview Hotel to the airport. Time to say goodbye to Langkawi!',
        meta: ['8:15 - 8:45 AM', 'June 19', '~30 mins'],
        link: 'routePages/bayview_airport.html',
      }
    ]
  },
  {
    date: 'SG → JB (16 June Morning)',
    subtitle: 'Sembawang → Woodlands → JB Sentral → Senai Airport',
    timeline: [
      { time: '7:00 AM', desc: '🚕 Start from Sembawang' },
      { time: '8:00 AM', desc: '🚉 Reach Woodlands train checkpoint' },
      { time: '8:30 AM', desc: '🚆 Board KTMB train' },
      { time: '8:45 AM', desc: '🚕 Arrive Johor Bahru, taxi to Senai Airport' },
      { time: '9:45 AM', desc: '🛬 Arrive at Senai Airport' },
      { time: '9:45–10:45 AM', desc: '🍽️ Breakfast at Chutneys & Chai' },
      { time: '11:00 AM', desc: '🛫 Flight check-in (JHB → Langkawi)' },
      { time: '1:25 PM', desc: '🛫 Flight departs' },
      { time: '2:30 PM', desc: '🛬 Arrive Langkawi' },
    ],
    cards: [
      {
        icon: '🚆',
        title: 'SG → JB (16 June Morning)',
        desc: 'Sembawang to Woodlands, KTMB train to JB, taxi to Senai Airport, and breakfast before flight.',
        meta: ['7:00 AM - 11:00 AM', '16 June', 'Multi-modal'],
        link: 'routePages/sg_jb_morning.html',
      }
    ]
  },
  {
    date: 'JB → SG (19 June Evening)',
    subtitle: 'Senai Airport → KOMTAR JBCC → Woodlands → Sembawang',
    timeline: [
      { time: '3:15 PM', desc: '🛬 Arrive JB from Langkawi' },
      { time: '3:45 PM', desc: '🚕 Exit airport' },
      { time: '4:00–5:00 PM', desc: '🚕 Taxi to KOMTAR JBCC' },
      { time: '6:30–7:30 PM', desc: '🍽️ Dinner at POULET' },
      { time: '7:45 PM', desc: '🚉 Arrive JB Sentral, wait for KTMB train' },
      { time: '8:15 PM', desc: '🚆 Board KTMB train to Woodlands' },
      { time: '8:30 PM', desc: '🚉 Arrive Woodlands train checkpoint' },
      { time: '9:30 PM', desc: '🚕 Taxi to Sembawang, reach home' },
    ],
    cards: [
      {
        icon: '🚕',
        title: 'JB → SG (19 June Evening)',
        desc: 'Flight lands in JB, taxi to KOMTAR JBCC, dinner, then KTMB train and taxi home to Sembawang.',
        meta: ['3:15 PM - 9:30 PM', '19 June', 'Multi-modal'],
        link: 'routePages/jb_sg_evening.html',
      }
    ]
  },
  {
    date: 'Travel Companion',
    subtitle: 'Guides, references, and memories for your Langkawi adventure',
    timeline: [],
    cards: [
      {
        icon: '📖',
        title: 'Langkawi Travel Guide & References',
        desc: 'Essential guides, reference links, and a placeholder for your post-trip photos and videos.',
        meta: ['All days', 'Langkawi', 'Guide'],
        link: 'routePages/companion_guide.html',
      }
    ]
  },
];

// HTML5 Template for Timeline Item
const timelineTemplate = document.createElement('template');
timelineTemplate.innerHTML = `
  <div class="timeline-item">
    <span class="timeline-svg"></span>
    <span class="timeline-time"></span>
    <span class="timeline-desc"></span>
  </div>
`;

// HTML5 Template for Card
const cardTemplate = document.createElement('template');
cardTemplate.innerHTML = `
  <div class="card route-card">
    <div class="card-icon"></div>
    <h3></h3>
    <p></p>
    <div class="card-meta">
      <span class="time-badge"></span>
      <span class="date-badge"></span>
      <span class="duration"></span>
    </div>
  </div>
`;

// --- GROUP NAVIGATION LOGIC ---
const groupMap = {
  june16: 0,
  june17: 1,
  june18: 2,
  june19: 3,
  sg_jb_morning: 4,
  jb_sg_evening: 5,
  companion: null
};

function showGroupSection(groupKey) {
  document.getElementById('group-selection').style.display = 'none';
  document.getElementById('group-content').style.display = 'block';
  document.getElementById('back-to-groups').style.display = 'inline-block';
  // Hide all sections
  [
    'section-june16', 'section-june17', 'section-june18', 'section-june19', 'section-sg-jb-morning', 'section-jb-sg-evening', 'section-companion'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  // Show selected
  const sectionId = {
    june16: 'section-june16',
    june17: 'section-june17',
    june18: 'section-june18',
    june19: 'section-june19',
    sg_jb_morning: 'section-sg-jb-morning',
    jb_sg_evening: 'section-jb-sg-evening',
    companion: 'section-companion'
  }[groupKey];
  if (sectionId) {
    const el = document.getElementById(sectionId);
    if (el) el.style.display = 'block';
  }
}

function backToGroups() {
  document.getElementById('group-selection').style.display = 'flex';
  document.getElementById('group-content').style.display = 'none';
  document.getElementById('back-to-groups').style.display = 'none';
  // Clear the URL hash so refresh returns to group selection view
  if (window.location.hash && window.location.hash.startsWith('#section-')) {
    if (history.replaceState) {
      history.replaceState(null, null, window.location.pathname);
    } else {
      window.location.hash = '';
    }
  }
}

function goToItinerarySection(sectionId) {
  // Show group content and the correct section
  document.getElementById('group-selection').style.display = 'none';
  document.getElementById('group-content').style.display = 'block';
  document.getElementById('back-to-groups').style.display = 'inline-block';
  [
    'section-june16', 'section-june17', 'section-june18', 'section-june19', 'section-sg-jb-morning', 'section-jb-sg-evening', 'section-companion'
  ].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.style.display = 'none';
  });
  const el = document.getElementById(sectionId);
  if (el) el.style.display = 'block';
}

function renderTimeline(timelineArr, container) {
  timelineArr.forEach(item => {
    const node = timelineTemplate.content.cloneNode(true);
    // Add SVG based on desc or time (simple icon logic)
    const svgSpan = node.querySelector('.timeline-svg');
    let svg = '';
    if (item.desc.includes('Flight')) svg = `<svg viewBox='0 0 32 32' width='32' height='32'><path d='M2 16l28-6-6 8 6 8-28-6v-4z' fill='#74b9ff'/></svg>`;
    else if (item.desc.includes('Car') || item.desc.includes('drive')) svg = `<svg viewBox='0 0 32 32' width='32' height='32'><rect x='4' y='14' width='24' height='10' rx='4' fill='#00cec9'/><circle cx='9' cy='26' r='2' fill='#636e72'/><circle cx='23' cy='26' r='2' fill='#636e72'/></svg>`;
    else if (item.desc.includes('Hotel')) svg = `<svg viewBox='0 0 32 32' width='32' height='32'><rect x='6' y='12' width='20' height='12' rx='3' fill='#ffe082'/><rect x='12' y='18' width='4' height='6' fill='#b2d8d8'/></svg>`;
    else if (item.desc.includes('Eagle')) svg = `<svg viewBox='0 0 32 32' width='32' height='32'><ellipse cx='16' cy='24' rx='12' ry='4' fill='#b2d8d8'/><path d='M8 20l8-8 8 8' stroke='#fd79a8' stroke-width='2' fill='none'/></svg>`;
    else if (item.desc.includes('Shopping')) svg = `<svg viewBox='0 0 32 32' width='32' height='32'><rect x='8' y='12' width='16' height='12' rx='3' fill='#fdcb6e'/><rect x='12' y='8' width='8' height='6' rx='2' fill='#fd79a8'/></svg>`;
    else if (item.desc.includes('Dinner') || item.desc.includes('Lunch') || item.desc.includes('Breakfast')) svg = `<svg viewBox='0 0 32 32' width='32' height='32'><ellipse cx='16' cy='24' rx='10' ry='4' fill='#ffe082'/><rect x='12' y='8' width='8' height='10' rx='3' fill='#00cec9'/></svg>`;
    else if (item.desc.includes('Beach')) svg = `<svg viewBox='0 0 32 32' width='32' height='32'><ellipse cx='16' cy='28' rx='12' ry='3' fill='#b2d8d8'/><circle cx='24' cy='10' r='5' fill='#ffe082'/></svg>`;
    else if (item.desc.includes('Rest') || item.desc.includes('break')) svg = `<svg viewBox='0 0 32 32' width='32' height='32'><rect x='8' y='16' width='16' height='8' rx='3' fill='#b2d8d8'/><rect x='12' y='8' width='8' height='8' rx='2' fill='#636e72'/></svg>`;
    else if (item.desc.includes('SkyBridge') || item.desc.includes('Cable Car')) svg = `<svg viewBox='0 0 32 32' width='32' height='32'><rect x='6' y='20' width='20' height='6' rx='2' fill='#74b9ff'/><rect x='12' y='8' width='8' height='12' rx='3' fill='#00cec9'/></svg>`;
    else svg = `<svg viewBox='0 0 32 32' width='32' height='32'><circle cx='16' cy='16' r='12' fill='#b2d8d8'/></svg>`;
    svgSpan.innerHTML = svg;
    node.querySelector('.timeline-time').textContent = item.time;
    node.querySelector('.timeline-desc').textContent = item.desc;
    container.appendChild(node);
  });
}

function renderCards(cardsArr, container) {
  cardsArr.forEach(card => {
    const node = cardTemplate.content.cloneNode(true);
    node.querySelector('.card-icon').textContent = card.icon;
    node.querySelector('h3').textContent = card.title;
    node.querySelector('p').textContent = card.desc;
    const meta = node.querySelectorAll('.card-meta span');
    meta[0].textContent = card.meta[0];
    meta[1].textContent = card.meta[1];
    meta[2].textContent = card.meta[2];
    if (card.link && card.link.trim() !== '') {
      node.querySelector('.card').onclick = () => window.location.href = card.link;
      node.querySelector('.card').classList.remove('card-disabled');
    } else {
      node.querySelector('.card').onclick = null;
      node.querySelector('.card').classList.add('card-disabled');
      node.querySelector('.card').style.cursor = 'not-allowed';
      node.querySelector('.card').title = 'Details coming soon';
    }
    container.appendChild(node);
  });
}

document.addEventListener('DOMContentLoaded', function() {
  const dateSections = document.querySelectorAll('.date-section');
  timelineData.forEach((day, i) => {
    if (!dateSections[i]) return;
    // Timeline
    const timelineDiv = dateSections[i].querySelector('.trip-timeline');
    if (timelineDiv) {
      timelineDiv.innerHTML = '';
      renderTimeline(day.timeline, timelineDiv);
    }
    // Cards
    const cardGrid = dateSections[i].querySelector('.card-grid');
    if (cardGrid) {
      cardGrid.innerHTML = '';
      renderCards(day.cards, cardGrid);
    }
  });

  // Hide all group content by default
  document.getElementById('group-content').style.display = 'none';
  // Group card click
  document.querySelectorAll('#group-selection .card').forEach(card => {
    card.onclick = function() {
      showGroupSection(this.dataset.group);
    };
  });
  // Back button
  document.getElementById('back-to-groups').onclick = backToGroups;
  // Show group selection by default
  document.getElementById('group-selection').style.display = 'flex';

  // Listen for hash navigation to a section (for back-to-itinerary)
  const hash = window.location.hash;
  if (hash && hash.startsWith('#section-')) {
    goToItinerarySection(hash.replace('#', ''));
    // Optionally scroll into view for accessibility
    setTimeout(() => {
      const el = document.getElementById(hash.replace('#', ''));
      if (el) el.scrollIntoView({behavior: 'smooth'});
    }, 100);
  }

  // Hamburger Menu Toggle Functionality
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinksWrapper = document.querySelector('.nav-links-wrapper');

  if (mobileNavToggle && navLinksWrapper) {
      mobileNavToggle.addEventListener('click', () => {
          const isExpanded = mobileNavToggle.getAttribute('aria-expanded') === 'true' || false;
          mobileNavToggle.setAttribute('aria-expanded', !isExpanded);
          navLinksWrapper.classList.toggle('active');
          // Optional: Change icon on toggle
          const icon = mobileNavToggle.querySelector('i');
          if (navLinksWrapper.classList.contains('active')) {
              icon.classList.remove('fa-bars');
              icon.classList.add('fa-times');
          } else {
              icon.classList.remove('fa-times');
              icon.classList.add('fa-bars');
          }
      });
  }
});
