/* ============================================
   RICK McCAWLEY HUB — App Logic
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons
  if (window.lucide) lucide.createIcons();

  // --- News Overlay ---
  const newsBtn = document.getElementById('newsBtn');
  const newsOverlay = document.getElementById('newsOverlay');
  const newsClose = document.getElementById('newsClose');

  if (newsBtn && newsOverlay) {
    newsBtn.addEventListener('click', () => {
      newsOverlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    newsClose.addEventListener('click', () => {
      newsOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });

    newsOverlay.addEventListener('click', (e) => {
      if (e.target === newsOverlay) {
        newsOverlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // --- Back to Top ---
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe tiles with staggered delay
  document.querySelectorAll('.tile').forEach((tile, i) => {
    tile.style.transitionDelay = `${i * 60}ms`;
    observer.observe(tile);
  });

  // Observe credentials with stagger
  document.querySelectorAll('.credential').forEach((cred, i) => {
    cred.style.transitionDelay = `${i * 80}ms`;
    observer.observe(cred);
  });

  // Observe generic fade-up elements
  document.querySelectorAll('.fade-up').forEach(el => {
    observer.observe(el);
  });

  // --- Credential Counter Animation ---
  const credNumbers = document.querySelectorAll('.cred-number');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  credNumbers.forEach(el => counterObserver.observe(el));

  function animateCounter(el) {
    const text = el.textContent.trim();
    const hasPlus = text.includes('+');
    const hasComma = text.includes(',');
    const cleanNum = parseInt(text.replace(/[^0-9]/g, ''), 10);
    if (isNaN(cleanNum)) return;

    const duration = 1500;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.round(cleanNum * eased);

      let display = hasComma ? current.toLocaleString() : String(current);
      if (hasPlus) display += '+';
      el.textContent = display;

      if (progress < 1) requestAnimationFrame(update);
    }

    el.textContent = hasPlus ? '0+' : '0';
    requestAnimationFrame(update);
  }

  // --- Smooth Scroll for Anchor Links ---
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 48; // account for crawl bar
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // --- Tile Hover Accent Color ---
  document.querySelectorAll('.tile[data-accent]').forEach(tile => {
    const accent = tile.dataset.accent;
    tile.addEventListener('mouseenter', () => {
      tile.style.borderColor = accent;
      tile.style.boxShadow = `0 8px 32px ${accent}20`;
    });
    tile.addEventListener('mouseleave', () => {
      tile.style.borderColor = '';
      tile.style.boxShadow = '';
    });
  });
});
