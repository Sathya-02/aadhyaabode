document.addEventListener('DOMContentLoaded', () => {

  // ─── Smooth scroll for ALL internal anchor links (incl. hero CTAs) ────────
  // Uses JS scrollIntoView so it works regardless of CSS scroll-behavior
  // support or Tailwind CDN preflight overrides. The header is h-28 = 112px.
  const HEADER_HEIGHT = 112;

  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const top = target.getBoundingClientRect().top + window.scrollY - HEADER_HEIGHT;
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  // Intercept every <a href="#..."> on the page
  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href').slice(1); // strip leading #
    if (!hash) return;
    const target = document.getElementById(hash);
    if (!target) return;
    e.preventDefault();
    smoothScrollTo(hash);
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('hidden');
  });

  // ─── Mobile menu toggle ──────────────────────────────────────────────────
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // ─── Hero carousel ───────────────────────────────────────────────────────
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    const slides  = Array.from(carousel.querySelectorAll('.hero-slide'));
    const dots    = Array.from(document.querySelectorAll('.hero-dot'));
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    let current = 0;
    let timer   = null;

    function showSlide(idx) {
      const next = ((idx % slides.length) + slides.length) % slides.length;
      slides[current].style.opacity = '0';
      slides[current].style.zIndex  = '0';
      if (dots[current]) dots[current].classList.remove('active');
      current = next;
      slides[current].style.opacity = '1';
      slides[current].style.zIndex  = '1';
      if (dots[current]) dots[current].classList.add('active');
    }

    function startAuto() {
      stopAuto();
      if (slides.length < 2) return;
      timer = setInterval(() => showSlide(current + 1), 4000);
    }

    function stopAuto() {
      if (timer) { clearInterval(timer); timer = null; }
    }

    // Init
    slides.forEach((s, i) => {
      s.style.transition = 'opacity 0.8s ease-in-out';
      s.style.opacity    = i === 0 ? '1' : '0';
      s.style.zIndex     = i === 0 ? '1' : '0';
    });
    if (dots[0]) dots[0].classList.add('active');

    dots.forEach((dot, i) => dot.addEventListener('click', () => { showSlide(i); startAuto(); }));
    if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(current + 1); startAuto(); });

    // Swipe support
    let txStart = 0, tyStart = 0;
    carousel.addEventListener('touchstart', e => {
      txStart = e.touches[0].clientX;
      tyStart = e.touches[0].clientY;
    }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - txStart;
      const dy = e.changedTouches[0].clientY - tyStart;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        showSlide(dx < 0 ? current + 1 : current - 1);
        startAuto();
      }
    }, { passive: true });

    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    startAuto();
  }

  // ─── Property filter ─────────────────────────────────────────────────────
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards       = document.querySelectorAll('.abode-card');
  if (filterPills.length && cards.length) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filter = pill.dataset.filter;
        filterPills.forEach(p => {
          p.classList.remove('bg-teal-600', 'text-white', 'border-teal-600');
          p.classList.add('border-slate-300', 'text-slate-700');
        });
        pill.classList.add('bg-teal-600', 'text-white', 'border-teal-600');
        pill.classList.remove('border-slate-300', 'text-slate-700');
        cards.forEach(card => {
          card.classList.toggle('hidden', filter !== 'all' && card.dataset.type !== filter);
        });
      });
    });
  }

  // ─── Gallery scroll arrows + lightbox ────────────────────────────────────
  const track      = document.querySelector('.gallery-track');
  const leftArrow  = document.querySelector('.gallery-arrow-left');
  const rightArrow = document.querySelector('.gallery-arrow-right');
  if (track && leftArrow && rightArrow) {
    const scrollAmount = 340;
    leftArrow.addEventListener('click',  () => track.scrollBy({ left: -scrollAmount, behavior: 'smooth' }));
    rightArrow.addEventListener('click', () => track.scrollBy({ left:  scrollAmount, behavior: 'smooth' }));
  }

  const lightbox      = document.getElementById('gallery-lightbox');
  const lightboxImg   = document.getElementById('gallery-lightbox-image');
  const lightboxClose = lightbox && lightbox.querySelector('button');
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = item.dataset.galleryImage || '';
      lightboxImg.alt = item.dataset.galleryAlt   || '';
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
    });
  });
  lightboxClose && lightboxClose.addEventListener('click', () => {
    lightbox.classList.add('hidden');
    lightbox.classList.remove('flex');
    lightboxImg.src = '';
  });
  lightbox && lightbox.addEventListener('click', e => {
    if (e.target === lightbox) {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      lightboxImg.src = '';
    }
  });

});
