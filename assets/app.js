(() => {
  const body = document.body;

  const trapFocus = (container, event) => {
    const focusable = container.querySelectorAll('a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])');
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const modal = document.getElementById('privacy-modal');
  const modalOpeners = document.querySelectorAll('[data-open-modal]');
  const modalCloseBtn = modal?.querySelector('.modal-close');

  const openModal = () => {
    if (!modal) return;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  };

  modalOpeners.forEach((btn) => btn.addEventListener('click', openModal));
  modalCloseBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });

  const drawer = document.querySelector('.mobile-drawer');
  const openDrawerBtn = document.querySelector('.mobile-menu-btn');
  const closeDrawerBtn = document.querySelector('.drawer-close');

  const openDrawer = () => {
    if (!drawer) return;
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    body.style.overflow = 'hidden';
    closeDrawerBtn?.focus();
  };

  const closeDrawer = () => {
    if (!drawer) return;
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    body.style.overflow = '';
  };

  openDrawerBtn?.addEventListener('click', openDrawer);
  closeDrawerBtn?.addEventListener('click', closeDrawer);
  drawer?.addEventListener('click', (e) => { if (e.target === drawer) closeDrawer(); });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
      closeDrawer();
    }
    if (event.key === 'Tab') {
      if (modal?.classList.contains('open')) trapFocus(modal.querySelector('.modal-content'), event);
      if (drawer?.classList.contains('open')) trapFocus(drawer.querySelector('.drawer-panel'), event);
    }
  });

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const btn = item.querySelector('.faq-question');
    btn?.addEventListener('click', () => {
      faqItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-question')?.setAttribute('aria-expanded', 'false');
        }
      });
      const active = item.classList.toggle('active');
      btn.setAttribute('aria-expanded', active ? 'true' : 'false');
    });
  });

  const revealTargets = document.querySelectorAll('.reveal, .progress > span');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      if (entry.target.classList.contains('reveal')) entry.target.classList.add('visible');
      if (entry.target.dataset.width) entry.target.style.width = entry.target.dataset.width;
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.2 });

  revealTargets.forEach((el) => observer.observe(el));
})();
