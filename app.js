
(() => {
  const doc = document.documentElement;
  const loader = document.querySelector('.site-loader');
  window.addEventListener('load', () => {
    window.setTimeout(() => loader?.classList.add('is-hidden'), 350);
  });
  window.setTimeout(() => loader?.classList.add('is-hidden'), 1800);

  const header = document.querySelector('[data-header]');
  const syncHeader = () => header?.classList.toggle('is-scrolled', window.scrollY > 16);
  syncHeader();
  window.addEventListener('scroll', syncHeader, { passive: true });

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  toggle?.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    nav?.classList.toggle('is-open', !open);
    toggle.setAttribute('aria-label', open ? 'Open menu' : 'Close menu');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    toggle?.setAttribute('aria-expanded', 'false');
    nav.classList.remove('is-open');
  }));

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: .12, rootMargin: '0px 0px -45px' });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  document.querySelectorAll('[data-current-year]').forEach(node => {
    node.textContent = new Date().getFullYear();
  });

  const toast = document.querySelector('[data-toast]');
  let toastTimer;
  const showToast = message => {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('is-visible');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('is-visible'), 2200);
  };

  document.querySelectorAll('[data-copy-cashtag]').forEach(button => {
    button.addEventListener('click', async () => {
      const tag = '$TeenOutlet21';
      try {
        await navigator.clipboard.writeText(tag);
        showToast(`${tag} copied to your clipboard.`);
      } catch (error) {
        const temp = document.createElement('textarea');
        temp.value = tag;
        temp.style.position = 'fixed';
        temp.style.opacity = '0';
        document.body.appendChild(temp);
        temp.select();
        document.execCommand('copy');
        temp.remove();
        showToast(`${tag} copied to your clipboard.`);
      }
    });
  });

  const specialEvents = [
    { name: 'The Heart of Worship', date: '2026-08-30T17:00:00-05:00', label: 'Sunday, August 30 · 5:00 PM' },
    { name: 'You Belong Here', date: '2026-09-02T19:00:00-05:00', label: 'Wednesday, September 2 · 7:00 PM' },
    { name: 'Costume Party', date: '2026-10-17T18:00:00-05:00', label: 'Saturday, October 17 · 6:00 PM' }
  ];

  const nextWednesday = () => {
    const now = new Date();
    const target = new Date(now);
    const daysUntil = (3 - now.getDay() + 7) % 7;
    target.setDate(now.getDate() + daysUntil);
    target.setHours(18, 30, 0, 0);
    if (target <= now) target.setDate(target.getDate() + 7);
    return { name: 'Teen Outlet Youth Night', date: target.toISOString(), label: 'Wednesday at 6:30 PM' };
  };

  const updateCountdown = () => {
    const nameNode = document.querySelector('[data-next-event-name]');
    if (!nameNode) return;
    const now = new Date();
    const candidates = specialEvents.filter(event => new Date(event.date) > now);
    candidates.push(nextWednesday());
    candidates.sort((a, b) => new Date(a.date) - new Date(b.date));
    const event = candidates[0];
    const target = new Date(event.date);
    const difference = Math.max(0, target - now);
    const days = Math.floor(difference / 86400000);
    const hours = Math.floor((difference % 86400000) / 3600000);
    const minutes = Math.floor((difference % 3600000) / 60000);
    nameNode.textContent = event.name;
    document.querySelector('[data-next-event-date]').textContent = event.label;
    document.querySelector('[data-countdown-days]').textContent = String(days).padStart(2, '0');
    document.querySelector('[data-countdown-hours]').textContent = String(hours).padStart(2, '0');
    document.querySelector('[data-countdown-minutes]').textContent = String(minutes).padStart(2, '0');
  };
  updateCountdown();
  setInterval(updateCountdown, 60000);
})();
