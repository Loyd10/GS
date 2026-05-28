
    const header = document.getElementById('siteHeader');
    const menuBtn = document.getElementById('menuBtn');
    const mobileLinks = document.querySelectorAll('.mobile-panel a');

    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 24);
    });

    menuBtn.addEventListener('click', () => {
      const isOpen = document.body.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', String(isOpen));
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
        menuBtn.setAttribute('aria-expanded', 'false');
      });
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = `${Math.min(index * 60, 240)}ms`;
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
