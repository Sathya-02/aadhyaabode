document.addEventListener('DOMContentLoaded', () => {

  // ─── Mobile menu toggle ──────────────────────────────────────────────────
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // ─── Hero carousel ───────────────────────────────────────────────────────
  const carousel = document.getElementById('hero-carousel');
  if (carousel) {
    const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
    const dots   = Array.from(document.querySelectorAll('.hero-dot'));
    const prevBtn = document.getElementById('hero-prev');
    const nextBtn = document.getElementById('hero-next');
    let current = 0;
    let timer   = null;

    function showSlide(idx) {
      // Clamp index
      const next = ((idx % slides.length) + slides.length) % slides.length;

      // Hide current
      slides[current].style.opacity = '0';
      slides[current].style.zIndex  = '0';
      if (dots[current]) dots[current].classList.remove('active');

      // Show next
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

    // Init: make sure first slide is visible and rest hidden via inline style
    slides.forEach((s, i) => {
      s.style.transition = 'opacity 0.8s ease-in-out';
      s.style.opacity    = i === 0 ? '1' : '0';
      s.style.zIndex     = i === 0 ? '1' : '0';
    });
    if (dots[0]) dots[0].classList.add('active');

    // Dot clicks
    dots.forEach((dot, i) => {
      dot.addEventListener('click', () => {
        showSlide(i);
        startAuto(); // reset timer on manual nav
      });
    });

    // Arrow buttons
    if (prevBtn) prevBtn.addEventListener('click', () => { showSlide(current - 1); startAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { showSlide(current + 1); startAuto(); });

    // Swipe — only horizontal swipes change slide; vertical falls through to page scroll
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

    // Pause auto-slide while user hovers (desktop)
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);
    carousel.addEventListener('focusin',    stopAuto);
    carousel.addEventListener('focusout',   startAuto);

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
