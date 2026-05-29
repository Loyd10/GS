const header = document.getElementById('siteHeader');
const toggle = document.querySelector('.menu-toggle');
const links = document.querySelectorAll('.nav-links a');
const revealEls = document.querySelectorAll('.reveal');
const bannerImg = document.querySelector('.banner img');
const legalTabs = document.querySelectorAll('[data-legal-filter]');
const legalCards = document.querySelectorAll('[data-legal-card]');

const setHeader = () => {
  header.classList.toggle('scrolled', window.scrollY > 12);
};
setHeader();
window.addEventListener('scroll', setHeader, { passive: true });

if (toggle) {
  toggle.addEventListener('click', () => {
    const open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', String(open));
  });
}

links.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.16 });

revealEls.forEach(el => observer.observe(el));

const sections = [...document.querySelectorAll('main section[id]')];
const navMap = new Map([...links].map(link => [link.getAttribute('href').slice(1), link]));

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    links.forEach(link => link.classList.remove('active'));
    const active = navMap.get(entry.target.id);
    if (active) active.classList.add('active');
  });
}, { rootMargin: '-42% 0px -48% 0px' });

sections.forEach(section => sectionObserver.observe(section));

const setParallax = () => {
  if (!bannerImg) return;
  const rect = bannerImg.parentElement.getBoundingClientRect();
  const windowH = window.innerHeight || 1;
  const progress = Math.max(-1, Math.min(1, (rect.top + rect.height / 2 - windowH / 2) / windowH));
  bannerImg.style.setProperty('--parallax', `${progress * -34}px`);
};

setParallax();
window.addEventListener('scroll', setParallax, { passive: true });

legalTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const filter = tab.dataset.legalFilter;
    legalTabs.forEach(item => item.classList.remove('active'));
    tab.classList.add('active');

    legalCards.forEach(card => {
      const visible = filter === 'all' || card.dataset.legalCard === filter;
      card.classList.toggle('is-hidden', !visible);
    });
  });
});
