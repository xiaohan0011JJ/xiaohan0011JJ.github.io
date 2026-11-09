'use strict';

const citations = {
  cscwd: `@inproceedings{zhang2025integrating,
  title={Integrating IRT and Knowledge Graphs for the Selection of Cybersecurity Talent},
  author={Zhang, Lvyang and Lu, Wen and Zhao, Yang and Yuan, Weihan and Zhai, Lidong},
  booktitle={2025 28th International Conference on Computer Supported Cooperative Work in Design (CSCWD)},
  pages={2430--2435},
  year={2025},
  publisher={IEEE},
  doi={10.1109/CSCWD64889.2025.11033228}
}`,
  applsci: `@article{yuan2023dcags,
  title={DCAGS-IoT: Dynamic Cross-Domain Authentication Scheme Using Group Signature in IoT},
  author={Yuan, Weihan and Li, Xiaoya and Li, Mingyue and Zheng, Liudong},
  journal={Applied Sciences},
  volume={13},
  number={10},
  pages={5847},
  year={2023},
  doi={10.3390/app13105847}
}`
};

const themeButton = document.getElementById('theme-toggle');
const nav = document.getElementById('site-nav');
const menuButton = document.getElementById('menu-toggle');
const toast = document.getElementById('toast');
let toastTimer;

function updateThemeButton() {
  const dark = document.documentElement.dataset.theme === 'dark';
  themeButton.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
  themeButton.setAttribute('aria-pressed', String(dark));
}

try {
  const saved = localStorage.getItem('weihan-theme');
  if (saved === 'light' || saved === 'dark') document.documentElement.dataset.theme = saved;
} catch (_) {
  // The website remains usable if browser storage is disabled.
}
updateThemeButton();

themeButton.addEventListener('click', () => {
  const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.dataset.theme = next;
  try { localStorage.setItem('weihan-theme', next); } catch (_) {}
  updateThemeButton();
});

menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.site-nav a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Open navigation');
}));

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2100);
}

async function copyCitation(text) {
  if (navigator.clipboard?.writeText) {
    try { await navigator.clipboard.writeText(text); return true; } catch (_) {}
  }
  // Older browsers / file://: offer the citation in a selectable dialog.
  window.prompt('Copy this BibTeX citation:', text);
  return false;
}

document.querySelectorAll('.bib-button').forEach((button) => {
  button.addEventListener('click', async () => {
    const citation = citations[button.dataset.bib];
    if (!citation) return;
    const copied = await copyCitation(citation);
    if (copied) showToast('BibTeX citation copied');
  });
});

const copyright = document.getElementById('copyright-year');
if (copyright) copyright.textContent = String(new Date().getFullYear());

// Progressive enhancement: sections stay visible even if IntersectionObserver is unavailable.
if ('IntersectionObserver' in window) {
  const links = Array.from(document.querySelectorAll('.site-nav a'));
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (!entry.isIntersecting) continue;
      links.forEach((link) => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  }, {rootMargin: '-15% 0px -70% 0px'});
  document.querySelectorAll('main section[id]').forEach((section) => observer.observe(section));
}
