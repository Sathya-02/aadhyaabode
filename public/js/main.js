document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu toggle
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');

  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close menu on link click (mobile)
    mobileMenu.querySelectorAll('a[href^="#"]').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Property filter
  const filterPills = document.querySelectorAll('.filter-pill');
  const cards = document.querySelectorAll('.abode-card');

  if (filterPills.length && cards.length) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', () => {
        const filter = pill.getAttribute('data-filter');

        // Active style
        filterPills.forEach(p => {
          p.classList.remove('bg-teal-600', 'text-white', 'border-teal-600');
          p.classList.add('border-slate-300', 'text-slate-700');
        });
        pill.classList.add('bg-teal-600', 'text-white', 'border-teal-600');
        pill.classList.remove('border-slate-300', 'text-slate-700');

        // Filter cards
        cards.forEach(card => {
          const type = card.getAttribute('data-type');
          const show = filter === 'all' || filter === type;
          card.classList.toggle('hidden', !show);
        });
      });
    });
  }

  // Gallery arrows & lightbox
  const galleryTrack = document.querySelector('.gallery-track');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const leftArrows = document.querySelectorAll('.gallery-arrow-left');
  const rightArrows = document.querySelectorAll('.gallery-arrow-right');

  if (galleryTrack && galleryItems.length) {
    const scrollByAmount = () => {
      const firstItem = galleryItems[0];
      const itemWidth = firstItem.getBoundingClientRect().width;
      // scroll roughly 1.5 cards per click for overlap
      return itemWidth * 1.5;
    };

    leftArrows.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: -scrollByAmount(), behavior: 'smooth' });
      });
    });

    rightArrows.forEach(btn => {
      btn.addEventListener('click', () => {
        galleryTrack.scrollBy({ left: scrollByAmount(), behavior: 'smooth' });
      });
    });

    // Lightbox
    const lightbox = document.getElementById('gallery-lightbox');
    const lightboxImg = document.getElementById('gallery-lightbox-image');
    const closeBtn = lightbox ? lightbox.querySelector('button') : null;

    const openLightbox = (src, alt) => {
      if (!lightbox || !lightboxImg) return;
      lightboxImg.src = src;
      lightboxImg.alt = alt || '';
      lightbox.classList.remove('hidden');
      lightbox.classList.add('flex');
    };

    const closeLightbox = () => {
      if (!lightbox || !lightboxImg) return;
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
      lightboxImg.src = '';
      lightboxImg.alt = '';
    };

    galleryItems.forEach(item => {
      item.addEventListener('click', () => {
        const src = item.getAttribute('data-gallery-image');
        const alt = item.getAttribute('data-gallery-alt');
        if (src) openLightbox(src, alt);
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener('click', closeLightbox);
    }

    if (lightbox) {
      lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
          closeLightbox();
        }
      });

      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
          closeLightbox();
        }
      });
    }
  }
});
