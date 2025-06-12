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
        link: 'airport_bayview.html',
      },
      {
        icon: '🦅',
        title: 'Hotel to Eagle Square',
        desc: 'Evening visit to the iconic Eagle Square (Dataran Lang) - perfect for sunset photos and local atmosphere.',
        meta: ['5:30 - 5:45 PM', 'June 16', '~15 mins'],
        link: 'bayview_eaglesquare.html',
      },
      {
        icon: '🛍️',
        title: 'Eagle Square to Shopping Mall',
        desc: 'Quick shopping visit at Langkawi Fair Shopping Mall before dinner - browse local goods and souvenirs.',
        meta: ['6:45 - 7:00 PM', 'June 16', '~15 mins'],
        link: 'eagle_shopping.html',
      },
      {
        icon: '🍽️',
        title: 'Shopping Mall to Dinner',
        desc: 'Journey to AROOS DAMASCUS restaurant for authentic Middle Eastern cuisine - perfect evening dining experience.',
        meta: ['7:45 - 8:00 PM', 'June 16', '~15 mins'],
        link: 'shopping_dinner.html',
      },
      {
        icon: '🌙',
        title: 'Dinner to Hotel',
        desc: 'Return journey back to Bayview Hotel after a delicious dinner to end the first day of your Langkawi adventure.',
        meta: ['9:15 - 9:30 PM', 'June 16', '~15 mins'],
        link: 'dinner_hotel.html',
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
        link: 'bayview_skybridge.html',
      },
      {
        icon: '🍛',
        title: 'Skybridge Parking → Pia’s the Padi',
        desc: 'Drive to a scenic paddy field restaurant for lunch.',
        meta: ['1:50 - 2:30 PM', 'June 17', '~35 mins'],
        link: 'skybridge_padi.html',
      },
      {
        icon: '🛏️',
        title: 'Pia’s the Padi → Bayview Hotel',
        desc: 'Return to hotel for a restful break.',
        meta: ['3:30 - 4:00 PM', 'June 17', '~25 mins'],
        link: 'padi_bayview.html',
      },
      {
        icon: '🏖️',
        title: 'Bayview Hotel → Cenang Mall',
        desc: 'Head to Pantai Cenang for beach and shopping.',
        meta: ['5:30 - 6:15 PM', 'June 17', '~45 mins'],
        link: 'bayview_cenangmall.html',
      },
      {
        icon: '🍹',
        title: 'Cenang Mall → Hidden Langkawi',
        desc: 'Short drive to a unique beach bar for dinner.',
        meta: ['7:50 - 8:00 PM', 'June 17', '~10 mins'],
        link: 'cenangmall_hidden.html',
      },
      {
        icon: '🌙',
        title: 'Hidden Langkawi → Bayview Hotel',
        desc: 'Return to hotel and end of Day 2.',
        meta: ['9:15 - 10:00 PM', 'June 17', '~40 mins'],
        link: 'hidden_bayview.html',
      },
    ],
  },
];

// HTML5 Template for Timeline Item
const timelineTemplate = document.createElement('template');
timelineTemplate.innerHTML = `
  <div class="timeline-item">
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

function renderTimeline(timelineArr, container) {
  timelineArr.forEach(item => {
    const node = timelineTemplate.content.cloneNode(true);
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
    node.querySelector('.card').onclick = () => window.location.href = card.link;
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
});
