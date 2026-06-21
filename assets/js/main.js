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

  // NOTE: smooth scrolling to sections now relies on CSS scroll-mt-28 classes
  // on each section, so the browser's native anchor scrolling handles header
  // offset. No additional JS is required here.
});
