/*
  Teen Outlet site settings.
  This file keeps the most frequently updated public information in one place
  for future development. The current pages already use these values directly.
*/
window.TEEN_OUTLET_CONFIG = {
  ministryName: 'Teen Outlet Ministries',
  weeklyGathering: 'Wednesdays at 6:30 PM',
  address: '2170 Buck Creek Road, Festus, MO 63028',
  phone: '(636) 725-3351',
  email: 'teenoutlet21@gmail.com',
  facebook: 'https://www.facebook.com/profile.php?id=61590344560767',
  cashTag: '$TeenOutlet21',
  cashAppUrl: 'https://cash.app/$TeenOutlet21'
};

// Visual polish for the approved uploaded artwork and homepage photography.
(() => {
  const style = document.createElement('style');
  style.textContent = `
    .page-home .mission-media .media-card,
    .page-home section[style*="padding-top:90px"] .media-card {
      border-color: transparent !important;
      box-shadow: none !important;
      background: transparent !important;
    }
    .page-home .mission-media .media-card img,
    .page-home section[style*="padding-top:90px"] .media-card img {
      -webkit-mask-image: radial-gradient(ellipse at center, #000 55%, rgba(0,0,0,.96) 68%, rgba(0,0,0,.48) 84%, transparent 100%);
      mask-image: radial-gradient(ellipse at center, #000 55%, rgba(0,0,0,.96) 68%, rgba(0,0,0,.48) 84%, transparent 100%);
    }
    .launchpad-mark,
    .page-hero-launchpad .page-hero-inner {
      overflow: hidden;
    }
    .launchpad-mark img,
    .launchpad-brand-art {
      -webkit-clip-path: inset(0 0 13% 0);
      clip-path: inset(0 0 13% 0);
    }
    .launchpad-mark img { margin-bottom: -13% !important; }
    .launchpad-brand-art { margin-bottom: -5% !important; }
  `;
  document.head.appendChild(style);
})();
