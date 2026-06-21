document.addEventListener('DOMContentLoaded', () => {

  // ─── Smooth scroll helper (offsets the sticky header dynamically) ─────────
  //
  // WHY: CSS `scroll-padding-top` / Tailwind `scroll-mt-*` can be unreliable
  // when the sticky header height changes across breakpoints or when the
  // Tailwind CDN loads styles asynchronously.  This delegate listens on the
  // entire document for *any* anchor click whose href starts with "#", reads
  // the actual rendered header height at click-time, and scrolls with
  // window.scrollTo() so the target lands below the header.
  //
  function getHeaderHeight() {
    const header = document.querySelector('header');
    return header ? header.getBoundingClientRect().height : 0;
  }

  function smoothScrollTo(targetId) {
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;

    const headerH  = getHeaderHeight();
    const targetTop = target.getBoundingClientRect().top + window.scrollY;
    const offset    = 16; // extra breathing room in px

    window.scrollTo({
      top:      Math.max(0, targetTop - headerH - offset),
      behavior: 'smooth',
    });
  }

  // Delegate: catch all anchor clicks on the page
  document.addEventListener('click', e => {
    const link = e.target.closest('a[href^="#"]');
    if (!link) return;
    const hash = link.getAttribute('href');
    if (!hash || hash === '#') return;

    e.preventDefault();
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu) mobileMenu.classList.add('hidden');

    smoothScrollTo(hash);

    // Update the URL hash without jumping
    history.pushState(null, '', hash);
  });

  // Handle direct page load with a hash in the URL
  if (window.location.hash) {
    // Small delay to let the page fully render + Tailwind styles apply
    setTimeout(() => smoothScrollTo(window.location.hash), 120);
  }

  // ─── Mobile menu toggle ──────────────────────────────────────────────────
  const toggleBtn  = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // ─── Hero carousel: auto-slide + prev/next arrows + dots + swipe ─────────
  const carousel = document.getElementById('hero-carousel');
  const dotsWrap = document.getElementById('hero-dots');
  const prevBtn  = document.getElementById('hero-prev');
  const nextBtn  = document.getElementById('hero-next');

  if (carousel && dotsWrap) {
    const slides = Array.from(carousel.querySelectorAll('[data-slide]'));
    const dots   = Array.from(dotsWrap.querySelectorAll('[data-dot]'));
    let current  = 0;
    let timer    = null;

    function goTo(idx) {
      slides[current].classList.remove('opacity-100');
      slides[current].classList.add('opacity-0');
      dots[current].classList.remove('active');

      current = (idx + slides.length) % slides.length;

      slides[current].classList.remove('opacity-0');
      slides[current].classList.add('opacity-100');
      dots[current].classList.add('active');
    }

    function startTimer() { timer = setInterval(() => goTo(current + 1), 4500); }
    function resetTimer()  { clearInterval(timer); startTimer(); }

    if (prevBtn) prevBtn.addEventListener('click', () => { goTo(current - 1); resetTimer(); });
    if (nextBtn) nextBtn.addEventListener('click', () => { goTo(current + 1); resetTimer(); });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.dot, 10));
        resetTimer();
      });
    });

    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { goTo(dx < 0 ? current + 1 : current - 1); resetTimer(); }
    }, { passive: true });

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft')  { goTo(current - 1); resetTimer(); }
      if (e.key === 'ArrowRight') { goTo(current + 1); resetTimer(); }
    });

    carousel.addEventListener('mouseenter', () => clearInterval(timer));
    carousel.addEventListener('mouseleave', startTimer);

    startTimer();
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
    const scrollAmt = 340;
    leftArrow.addEventListener('click',  () => track.scrollBy({ left: -scrollAmt, behavior: 'smooth' }));
    rightArrow.addEventListener('click', () => track.scrollBy({ left:  scrollAmt, behavior: 'smooth' }));
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

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      lightboxImg.src = '';
    });
  }

  if (lightbox) {
    lightbox.addEventListener('click', e => {
      if (e.target === lightbox) {
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        lightboxImg.src = '';
      }
    });
  }

});
