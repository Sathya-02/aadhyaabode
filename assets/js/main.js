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

  // ─── Hero auto-slide carousel ────────────────────────────────────────────
  const carousel   = document.getElementById('hero-carousel');
  const dotsWrap   = document.getElementById('hero-dots');
  if (carousel && dotsWrap) {
    const slides   = Array.from(carousel.querySelectorAll('[data-slide]'));
    const dots     = Array.from(dotsWrap.querySelectorAll('[data-dot]'));
    let current    = 0;
    let timer      = null;

    function goTo(idx) {
      slides[current].classList.remove('opacity-100');
      slides[current].classList.add('opacity-0');
      dots[current].classList.remove('active');

      current = (idx + slides.length) % slides.length;

      slides[current].classList.remove('opacity-0');
      slides[current].classList.add('opacity-100');
      dots[current].classList.add('active');
    }

    function startTimer() {
      timer = setInterval(() => goTo(current + 1), 4000);
    }

    function resetTimer() {
      clearInterval(timer);
      startTimer();
    }

    // Dot click
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        goTo(parseInt(dot.dataset.dot, 10));
        resetTimer();
      });
    });

    // Touch swipe support
    let touchStartX = 0;
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });
    carousel.addEventListener('touchend', e => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) {
        goTo(dx < 0 ? current + 1 : current - 1);
        resetTimer();
      }
    }, { passive: true });

    // Pause on hover (desktop)
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
  const track     = document.querySelector('.gallery-track');
  const leftArrow = document.querySelector('.gallery-arrow-left');
  const rightArrow= document.querySelector('.gallery-arrow-right');
  if (track && leftArrow && rightArrow) {
    const scrollBy = 340;
    leftArrow.addEventListener('click',  () => track.scrollBy({ left: -scrollBy, behavior: 'smooth' }));
    rightArrow.addEventListener('click', () => track.scrollBy({ left:  scrollBy, behavior: 'smooth' }));
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
