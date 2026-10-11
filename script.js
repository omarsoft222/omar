// Edit this list to change the properties shown on the site.
const LISTINGS = [
  { title: "Modern family home", address: "12 Oak Avenue", location: "suburbs", type: "house", price: 525000, beds: 4, baths: 3, sqft: 2400, status: "For sale", hue: 150 },
  { title: "City-view apartment", address: "88 Central Plaza, Unit 14B", location: "downtown", type: "apartment", price: 389000, beds: 2, baths: 2, sqft: 1100, status: "New", hue: 210 },
  { title: "Waterfront villa", address: "5 Harbor Drive", location: "waterfront", type: "villa", price: 1250000, beds: 5, baths: 4, sqft: 4100, status: "Featured", hue: 190 },
  { title: "Cozy starter home", address: "47 Maple Lane", location: "suburbs", type: "house", price: 315000, beds: 3, baths: 2, sqft: 1500, status: "For sale", hue: 35 },
  { title: "Downtown loft", address: "210 Market Street, Loft 3", location: "downtown", type: "apartment", price: 465000, beds: 1, baths: 1, sqft: 950, status: "For sale", hue: 260 },
  { title: "Lakeside retreat", address: "9 Shoreline Road", location: "waterfront", type: "house", price: 690000, beds: 3, baths: 2, sqft: 2000, status: "Open house", hue: 175 },
];

const fmtPrice = (n) => n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

// Simple illustrated placeholder; swap for <img src="..."> when you have real photos.
function houseArt(hue, type) {
  const sky = `hsl(${hue} 45% 82%)`, wall = `hsl(${hue} 30% 96%)`, roof = `hsl(${hue} 35% 35%)`, ground = `hsl(${hue} 30% 65%)`;
  const building = type === "apartment"
    ? `<rect x="110" y="40" width="100" height="140" fill="${wall}"/>` +
      [60, 90, 120, 150].map(y => [125, 152, 179].map(x => `<rect x="${x}" y="${y}" width="16" height="18" fill="${roof}" opacity=".55"/>`).join("")).join("")
    : `<polygon points="80,100 160,48 240,100" fill="${roof}"/><rect x="95" y="100" width="130" height="80" fill="${wall}"/>` +
      `<rect x="148" y="135" width="24" height="45" fill="${roof}"/><rect x="108" y="115" width="26" height="22" fill="${roof}" opacity=".5"/><rect x="186" y="115" width="26" height="22" fill="${roof}" opacity=".5"/>` +
      (type === "villa" ? `<rect x="225" y="125" width="60" height="55" fill="${wall}"/><rect x="240" y="140" width="30" height="20" fill="${roof}" opacity=".5"/>` : "");
  return `<svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Illustration of a ${type}">
    <rect width="320" height="200" fill="${sky}"/><circle cx="265" cy="45" r="18" fill="hsl(45 90% 70%)"/>
    <rect y="175" width="320" height="25" fill="${ground}"/>${building}</svg>`;
}

function renderListings(items) {
  const grid = document.getElementById("listings-grid");
  if (!items.length) {
    grid.innerHTML = `<p class="empty">No properties match your search. <a href="#contact">Tell me what you're looking for</a> and I'll find it.</p>`;
    return;
  }
  grid.innerHTML = items.map(l => `
    <article class="listing">
      <div class="listing-img">${houseArt(l.hue, l.type)}<span class="badge">${l.status}</span></div>
      <div class="listing-body">
        <p class="price">${fmtPrice(l.price)}</p>
        <h3>${l.title}</h3>
        <p class="muted" style="margin:0">${l.address}</p>
        <ul class="meta"><li>${l.beds} bd</li><li>${l.baths} ba</li><li>${l.sqft.toLocaleString()} sq ft</li></ul>
      </div>
    </article>`).join("");
}

renderListings(LISTINGS);

// Search filter
document.getElementById("search-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const loc = f.get("location"), type = f.get("type"), max = Number(f.get("price"));
  const results = LISTINGS.filter(l =>
    (loc === "all" || l.location === loc) &&
    (type === "all" || l.type === type) &&
    (!max || l.price <= max));
  renderListings(results);
  document.getElementById("results-note").textContent =
    results.length === LISTINGS.length ? "Showing all properties." : `Showing ${results.length} of ${LISTINGS.length} properties.`;
  document.getElementById("listings").scrollIntoView();
});

// Mobile nav
const toggle = document.querySelector(".nav-toggle");
const links = document.getElementById("nav-links");
toggle.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});
links.addEventListener("click", (e) => {
  if (e.target.tagName === "A") { links.classList.remove("open"); toggle.setAttribute("aria-expanded", "false"); }
});

// Contact form: validates, then opens the visitor's email app.
// To receive messages without email apps, point the form at a service like Formspree.
const CONTACT_EMAIL = "hello@example.com";
document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target, status = document.getElementById("form-status");
  if (!form.checkValidity()) {
    status.className = "form-status error";
    status.textContent = "Please fill in your name, a valid email, and a message.";
    return;
  }
  const f = new FormData(form);
  const body = `Name: ${f.get("name")}\nEmail: ${f.get("email")}\nPhone: ${f.get("phone")}\nInterested in: ${f.get("interest")}\n\n${f.get("message")}`;
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Website inquiry: " + f.get("interest"))}&body=${encodeURIComponent(body)}`;
  status.className = "form-status ok";
  status.textContent = "Thanks! Your email app should open with your message ready to send.";
  form.reset();
});

document.getElementById("year").textContent = new Date().getFullYear();
