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

  // Smooth scroll with header offset for all internal nav links (header + mobile)
  const header = document.querySelector('header.sticky');
  const headerHeight = header ? header.offsetHeight : 0;

  const handleInternalNavClick = event => {
    const href = event.currentTarget.getAttribute('href');
    if (!href || !href.startsWith('#')) return;

    const target = document.querySelector(href);
    if (!target) return;

    event.preventDefault();

    const rect = target.getBoundingClientRect();
    const offset = window.pageYOffset + rect.top - headerHeight + 1; // +1 to avoid being hidden

    window.scrollTo({
      top: offset,
      behavior: 'smooth'
    });
  };

  // Attach to header nav links and mobile menu links
  document.querySelectorAll('header a[href^="#"]').forEach(link => {
    link.addEventListener('click', handleInternalNavClick);
  });

  // Also attach to any other internal links in main if needed
  document.querySelectorAll('main a[href^="#"]').forEach(link => {
    link.addEventListener('click', handleInternalNavClick);
  });
});
