/* script.js - Pure JavaScript (no frameworks) */

(function(){
  const navLinks = document.querySelectorAll('a[data-scroll]');
  const mobileToggle = document.querySelector('[data-mobile-toggle]');
  const mobileMenu = document.querySelector('[data-mobile-menu]');

  // Mobile menu
  if (mobileToggle && mobileMenu){
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('is-open');
      mobileToggle.setAttribute('aria-expanded', String(isOpen));
    });

    mobileMenu.addEventListener('click', (e) => {
      const link = e.target.closest('a[data-scroll]');
      if (!link) return;
      mobileMenu.classList.remove('is-open');
      mobileToggle.setAttribute('aria-expanded', 'false');
    });
  }

  // Smooth scroll with slight offset
  function scrollToSection(id){
    const el = document.getElementById(id);
    if (!el) return;
    const header = document.querySelector('.nav');
    const offset = header ? header.offsetHeight + 10 : 70;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  navLinks.forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const id = a.getAttribute('href')?.replace('#','');
      if (id) scrollToSection(id);
    });
  });

  // Reveal animations
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    for (const entry of entries){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    }
  }, { threshold: 0.14 });

  revealEls.forEach(el => io.observe(el));

  // Progress bars
  const progressEls = document.querySelectorAll('[data-progress]');
  const progressIO = new IntersectionObserver((entries) => {
    for (const entry of entries){
      if (!entry.isIntersecting) continue;
      const bar = entry.target.querySelector('.progress-fill');
      const pct = entry.target.getAttribute('data-progress');
      if (bar && pct){
        bar.style.width = pct + '%';
      }
      progressIO.unobserve(entry.target);
    }
  }, { threshold: 0.25 });

  progressEls.forEach(el => progressIO.observe(el));

  // Contact form validation + UX
  const form = document.querySelector('#contactForm');
  const statusEl = document.querySelector('[data-form-status]');

  if (form){
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]')?.value?.trim();
      const email = form.querySelector('[name="email"]')?.value?.trim();
      const message = form.querySelector('[name="message"]')?.value?.trim();

      const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || '');

      if (!name){
        setStatus('Please enter your name.', 'error');
        return;
      }
      if (!emailOk){
        setStatus('Please enter a valid email address.', 'error');
        return;
      }
      if (!message || message.length < 10){
        setStatus('Message should be at least 10 characters.', 'error');
        return;
      }

      setStatus('Message sent successfully! (Demo UX)', 'success');
      form.reset();
    });
  }

  function setStatus(msg, type){
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.style.color = type === 'success' ? 'rgba(0,229,255,.95)' : 'rgba(255,120,120,.95)';
  }

  // Resume download button
  const resumeBtn = document.querySelector('[data-download-resume]');
  if (resumeBtn){
    resumeBtn.addEventListener('click', () => {
      const link = document.createElement('a');
      link.href = 'resume.pdf'; // placeholder file name
      link.download = 'V_M_Arasu_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
  }
})();

