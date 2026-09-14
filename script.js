const listings = [
  { id:1, name:'Casio fx-991CW Scientific Calculator', category:'Study', price:50, originalPrice:1500, deposit:300, location:'Block B · 0.6 km', distance:0.6, rating:4.9, reviews:18, owner:'Aarav M.', art:'FX', image:'assets/calculator.jpg', featured:true, description:'Clean, fully working scientific calculator. Ideal for semester exams, labs, and short-term assignments.', availability:'Available today' },
  { id:2, name:'Engineering Mathematics Vol. 1', category:'Study', price:25, originalPrice:600, deposit:150, location:'Library Road · 1.1 km', distance:1.1, rating:4.8, reviews:12, owner:'Ishita K.', art:'MATH', image:'assets/math-book.jpg', description:'Good-condition reference textbook with light highlighting. Great for a single semester or exam prep.', availability:'Available tomorrow' },
  { id:3, name:'Sony WH-1000XM4 Headphones', category:'Electronics', price:250, originalPrice:10000, deposit:900, location:'Hostel C · 0.8 km', distance:0.8, rating:4.9, reviews:25, owner:'Kabir S.', art:'WH', image:'assets/headphones.jpg', featured:true, description:'Noise-cancelling headphones with case and charging cable. Perfect for a project week, travel, or presentations.', availability:'Available today' },
  { id:4, name:'Formal Black Blazer — Size M', category:'Fashion', price:100, originalPrice:2500, deposit:700, location:'Admin Block · 0.9 km', distance:0.9, rating:4.7, reviews:9, owner:'Naina P.', art:'BLAZER', image:'assets/blazer.jpg', description:'Classic black blazer suited for interviews, presentations, viva, and formal college events.', availability:'Available in 2 days' },
  { id:5, name:'Btwin Riverside Bicycle', category:'Mobility', price:200, originalPrice:12000, deposit:1200, location:'North Gate · 1.7 km', distance:1.7, rating:4.6, reviews:14, owner:'Raghav T.', art:'BIKE', image:'assets/bicycle.jpg', description:'Comfortable geared bicycle for campus commuting. Helmet available on request.', availability:'Available today' },
  { id:6, name:'Decathlon Football + Pump', category:'Sports', price:40, originalPrice:800, deposit:250, location:'Sports Complex · 0.4 km', distance:0.4, rating:4.8, reviews:21, owner:'Yash R.', art:'BALL', image:'assets/football.jpg', featured:true, description:'Match-ready football with compact hand pump. Great for weekend games or inter-department practice.', availability:'Available now' },
  { id:7, name:'Logitech MX Master 3S', category:'Electronics', price:150, originalPrice:8000, deposit:800, location:'Tech Block · 0.7 km', distance:0.7, rating:4.9, reviews:11, owner:'Meera A.', art:'MX', image:'assets/mouse.jpg', description:'Ergonomic wireless mouse with USB receiver and Bluetooth. Useful for short coding or design projects.', availability:'Available today' },
  { id:8, name:'Portable Room Heater', category:'Hostel', price:100, originalPrice:2000, deposit:500, location:'Hostel A · 0.5 km', distance:0.5, rating:4.5, reviews:7, owner:'Dev P.', art:'HEAT', image:'assets/heater.jpg', description:'Compact room heater for cold nights. Works well in small rooms. Safety instructions included.', availability:'Available tomorrow' },
  { id:9, name:'Arduino Starter Kit', category:'Electronics', price:100, originalPrice:1500, deposit:650, location:'Innovation Lab · 1.3 km', distance:1.3, rating:4.9, reviews:16, owner:'Sanya G.', art:'UNO', image:'assets/arduino.jpg', description:'Arduino board with sensors, wires, LEDs, breadboard, and basic components for mini projects.', availability:'Available this week' },
  { id:10, name:'White Presentation Shirt — Size L', category:'Fashion', price:30, originalPrice:500, deposit:250, location:'Girls Hostel · 1.0 km', distance:1.0, rating:4.7, reviews:8, owner:'Tanya S.', art:'SHIRT', image:'assets/shirt.jpg', description:'Crisp white formal shirt, freshly cleaned. Useful for interviews, presentations, and formal events.', availability:'Available today' },
  { id:11, name:'Yoga Mat + Carry Strap', category:'Sports', price:30, originalPrice:700, deposit:120, location:'East Gate · 0.9 km', distance:0.9, rating:4.6, reviews:6, owner:'Ananya V.', art:'YOGA', image:'assets/yoga.jpg', description:'Lightweight non-slip yoga mat with carry strap. Clean and ready to use.', availability:'Available today' },
  { id:12, name:'Mini Projector 1080p', category:'Electronics', price:300, originalPrice:8000, deposit:1800, location:'Seminar Hall · 1.4 km', distance:1.4, rating:4.8, reviews:10, owner:'Aditya N.', art:'1080P', image:'assets/projector.jpg', featured:true, description:'Compact projector with HDMI and USB input. Ideal for club presentations, movie nights, and project demos.', availability:'Available Friday' }
];

let activeCategory = 'All';
let searchTerm = '';
let sortMode = 'recommended';

const listingGrid = document.getElementById('listingGrid');
const emptyState = document.getElementById('emptyState');
const listingSearch = document.getElementById('listingSearch');
const heroSearch = document.getElementById('heroSearch');
const sortSelect = document.getElementById('sortSelect');
const categoryFilters = document.getElementById('categoryFilters');
const toast = document.getElementById('toast');

function escapeHtml(value) {
  return String(value).replace(/[&<>'"]/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', "'":'&#039;', '"':'&quot;' }[char]));
}

function filteredListings() {
  let result = listings.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const haystack = `${item.name} ${item.category} ${item.owner} ${item.location} ${item.description}`.toLowerCase();
    const matchesSearch = !searchTerm || haystack.includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  if (sortMode === 'price-low') result.sort((a,b) => a.price - b.price);
  if (sortMode === 'rating') result.sort((a,b) => b.rating - a.rating);
  if (sortMode === 'distance') result.sort((a,b) => a.distance - b.distance);
  if (sortMode === 'recommended') result.sort((a,b) => Number(b.featured) - Number(a.featured) || b.rating - a.rating);
  return result;
}

function artClass(category) {
  return category.toLowerCase().replace(/[^a-z]/g,'');
}

function renderListings() {
  const result = filteredListings();
  listingGrid.innerHTML = result.map(item => `
    <article class="listing-card">
      <div class="item-art ${artClass(item.category)}" style="background-image:url('${item.image || 'assets/calculator.jpg'}')">
        <span class="image-tint"></span>
        <span class="art-symbol">${escapeHtml(item.art)}</span>
        ${item.featured ? '<span class="badge">Popular</span>' : ''}
        <span class="art-label">${escapeHtml(item.category)}</span>
      </div>
      <div class="card-body">
        <div class="card-category">${escapeHtml(item.category)}</div>
        <h3 class="card-title">${escapeHtml(item.name)}</h3>
        <div class="card-meta"><span>${escapeHtml(item.location)}</span><span>★ ${item.rating}</span></div>
        <div class="card-footer">
          <div><div class="price">₹${item.price}<span>/day</span></div><div class="original-price">₹${item.originalPrice.toLocaleString('en-IN')}</div></div>
          <button class="card-action" data-view="${item.id}">View item</button>
        </div>
      </div>
    </article>
  `).join('');
  emptyState.classList.toggle('hidden', result.length !== 0);
}

function setSearch(value) {
  searchTerm = value.trim();
  listingSearch.value = value;
  renderListings();
}

listingSearch.addEventListener('input', e => setSearch(e.target.value));
sortSelect.addEventListener('change', e => { sortMode = e.target.value; renderListings(); });

categoryFilters.addEventListener('click', e => {
  const button = e.target.closest('[data-category]');
  if (!button) return;
  activeCategory = button.dataset.category;
  document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('active', chip === button));
  renderListings();
});

document.getElementById('heroSearchBtn').addEventListener('click', () => {
  setSearch(heroSearch.value);
  document.getElementById('browse').scrollIntoView({ behavior:'smooth', block:'start' });
});
heroSearch.addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('heroSearchBtn').click();
});

document.getElementById('clearFilters').addEventListener('click', () => {
  activeCategory = 'All'; searchTerm = ''; sortMode='recommended';
  listingSearch.value = ''; heroSearch.value=''; sortSelect.value='recommended';
  document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.category === 'All'));
  renderListings();
});

function openModal(id) { document.getElementById(id).classList.remove('hidden'); document.body.style.overflow='hidden'; }
function closeModal(id) { document.getElementById(id).classList.add('hidden'); if (!document.querySelector('.modal-backdrop:not(.hidden)')) document.body.style.overflow=''; }

document.getElementById('openList').addEventListener('click', () => openModal('listModal'));
document.getElementById('openListCta').addEventListener('click', () => openModal('listModal'));
document.getElementById('openLogin').addEventListener('click', () => openModal('loginModal'));

document.addEventListener('click', e => {
  const close = e.target.closest('[data-close]');
  if (close) closeModal(close.dataset.close);
  if (e.target.classList.contains('modal-backdrop')) closeModal(e.target.id);
  const view = e.target.closest('[data-view]');
  if (view) openDetail(Number(view.dataset.view));
  const rent = e.target.closest('[data-rent]');
  if (rent) reserveItem(Number(rent.dataset.rent));
});

document.addEventListener('keydown', e => { if (e.key === 'Escape') document.querySelectorAll('.modal-backdrop:not(.hidden)').forEach(m => closeModal(m.id)); });

function openDetail(id) {
  const item = listings.find(x => x.id === id);
  if (!item) return;
  document.getElementById('detailContent').innerHTML = `
    <div class="detail-top">
      <div class="detail-art ${artClass(item.category)}" style="background-image:url('${item.image || 'assets/calculator.jpg'}')"><span class="image-tint"></span><span>${escapeHtml(item.art)}</span></div>
      <div class="detail-info">
        <div class="card-category">${escapeHtml(item.category)} · ${escapeHtml(item.availability)}</div>
        <h2 id="detailTitle" class="card-title">${escapeHtml(item.name)}</h2>
        <div class="card-meta"><span>★ ${item.rating} (${item.reviews} reviews)</span><span>${escapeHtml(item.location)}</span></div>
        <div class="detail-price">₹${item.price}<span>/ day</span> <del>₹${item.originalPrice.toLocaleString('en-IN')}</del></div><div class="deposit-note">₹${item.deposit} refundable deposit</div>
        <ul class="detail-list"><li>College ID verified owner: ${escapeHtml(item.owner)}</li><li>Clear return and damage policy</li><li>Pickup on campus</li></ul>
        <p class="modal-subtitle">${escapeHtml(item.description)}</p>
        <div class="date-row"><label>Start date<input id="startDate" type="date"></label><label>Return date<input id="endDate" type="date"></label></div>
        <div class="rent-summary"><span>Estimated rental</span><strong id="rentTotal">₹${item.price} + ₹${item.deposit} deposit</strong></div>
        <button class="primary-button full" data-rent="${item.id}">Reserve this item</button>
      </div>
    </div>
  `;
  const start = document.getElementById('startDate');
  const end = document.getElementById('endDate');
  const today = new Date();
  const min = today.toISOString().slice(0,10);
  start.min = min; end.min = min;
  start.value = min;
  end.value = min;
  function updateTotal() {
    const a = new Date(start.value), b = new Date(end.value);
    const days = start.value && end.value && b >= a ? Math.max(1, Math.ceil((b-a)/86400000)) : 1;
    document.getElementById('rentTotal').textContent = `₹${item.price * days} + ₹${item.deposit} deposit`;
  }
  start.addEventListener('change', () => { if (end.value < start.value) end.value = start.value; end.min = start.value; updateTotal(); });
  end.addEventListener('change', updateTotal);
  openModal('detailModal');
}

function reserveItem(id) {
  const item = listings.find(x => x.id === id);
  closeModal('detailModal');
  showToast(`Demo reservation request sent for ${item.name}.`);
}

document.getElementById('listForm').addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(e.currentTarget);
  const newItem = {
    id: Date.now(),
    name: data.get('name'),
    category: data.get('category'),
    price: Math.max(1, Number(data.get('rentalPrice'))),
    originalPrice: Number(data.get('purchasePrice')),
    deposit: Number(data.get('deposit')),
    location: `${data.get('location')} · 0.2 km`,
    distance: 0.2,
    rating: 5.0,
    reviews: 0,
    owner: 'You',
    art: 'NEW',
    image: 'assets/projector.jpg',
    description: data.get('description'),
    availability: 'Available today'
  };
  listings.unshift(newItem);
  e.currentTarget.reset();
  activeCategory='All'; searchTerm=''; sortMode='recommended'; listingSearch.value=''; sortSelect.value='recommended';
  document.querySelectorAll('.filter-chip').forEach(chip => chip.classList.toggle('active', chip.dataset.category === 'All'));
  renderListings();
  closeModal('listModal');
  showToast('Your demo listing is now live on CampusShare.');
  document.getElementById('browse').scrollIntoView({ behavior:'smooth' });
});

document.getElementById('loginForm').addEventListener('submit', e => {
  e.preventDefault();
  e.currentTarget.reset();
  closeModal('loginModal');
  showToast('Welcome back — demo login successful.');
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => toast.classList.remove('show'), 3000);
}

renderListings();
