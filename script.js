/* Progressive enhancements. Profile and publication content is plain HTML. */
(() => {
  const filters = document.querySelector('.year-filters');
  const publications = [...document.querySelectorAll('.publication')];
  const filterStatus = document.querySelector('#filter-status');
  let selectedYear = 'all';
  function filterPublications(year) {
    selectedYear = year;
    let visible = 0;
    publications.forEach(paper => {
      paper.hidden = year !== 'all' && paper.dataset.year !== year;
      if (!paper.hidden) visible++;
    });
    filters.querySelectorAll('button').forEach(button => {
      const active = button.dataset.year === year;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    filterStatus.textContent = `Showing ${visible} publications${year === 'all' ? '' : ` from ${year}`}.`;
  }
  filters.hidden = false;
  filters.addEventListener('click', event => {
    const button = event.target.closest('button[data-year]');
    if (button) filterPublications(button.dataset.year);
  });
  function revealHashPaper() {
    const id = location.hash.slice(1);
    const paper = publications.find(item => item.id === id);
    if (paper?.hidden) {
      filterPublications('all');
      paper.scrollIntoView({ block: 'start' });
    }
  }
  window.addEventListener('hashchange', revealHashPaper);
  document.querySelectorAll('.news-item a[href^="#paper-"]').forEach(link => {
    link.addEventListener('click', () => {
      if (selectedYear !== 'all') filterPublications('all');
    });
  });
  revealHashPaper();
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const sections = navLinks.map(link => document.querySelector(link.getAttribute('href')));
  function updateNavigation() {
    const threshold = document.querySelector('.site-header').offsetHeight + 70;
    let current = sections[0];
    sections.forEach(section => {
      if (section.getBoundingClientRect().top <= threshold) current = section;
    });
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5) current = sections[sections.length - 1];
    navLinks.forEach(link => {
      const active = link.getAttribute('href') === `#${current.id}`;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  let pending = false;
  window.addEventListener('scroll', () => {
    if (pending) return;
    pending = true;
    requestAnimationFrame(() => { updateNavigation(); pending = false; });
  }, { passive: true });
  updateNavigation();
  const figureDialog = document.querySelector('#figure-dialog');
  const bibDialog = document.querySelector('#bib-dialog');
  if (typeof figureDialog.showModal !== 'function') return;
  [figureDialog, bibDialog].forEach(dialog => {
    dialog.querySelector('[data-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      const rect = dialog.getBoundingClientRect();
      if (event.target === dialog && (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom)) dialog.close();
    });
    dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));
  });
  function openDialog(dialog) {
    dialog.showModal();
    document.body.classList.add('dialog-open');
  }
  function plainClick(event) {
    return event.button === 0 && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey;
  }
  document.querySelectorAll('[data-figure]').forEach(link => {
    link.addEventListener('click', event => {
      if (!plainClick(event)) return;
      event.preventDefault();
      const figure = document.querySelector('#dialog-figure');
      figure.src = link.href;
      figure.alt = link.querySelector('img').alt;
      document.querySelector('#figure-dialog-title').textContent = `${link.dataset.figure} · Framework`;
      document.querySelector('#dialog-caption').textContent = link.dataset.caption;
      document.querySelector('#dialog-paper').href = link.dataset.paper;
      openDialog(figureDialog);
    });
  });
  let resetCopyTimer;
  const copyButton = document.querySelector('#copy-bib');
  document.querySelectorAll('[data-bib]').forEach(link => {
    link.addEventListener('click', event => {
      if (!plainClick(event)) return;
      const template = document.querySelector(`#bib-${link.dataset.bib}`);
      if (!template) return;
      event.preventDefault();
      document.querySelector('#bib-content').textContent = template.content.textContent.trim();
      document.querySelector('#bib-dialog-title').textContent = `${document.querySelector(`#paper-${link.dataset.bib} [data-figure]`).dataset.figure} · BibTeX`;
      document.querySelector('#bib-download').href = link.href;
      document.querySelector('#bib-download').download = `${link.dataset.bib}.bib`;
      copyButton.querySelector('span').textContent = 'Copy citation';
      document.querySelector('#copy-status').textContent = '';
      clearTimeout(resetCopyTimer);
      openDialog(bibDialog);
    });
  });
  copyButton.addEventListener('click', async () => {
    const citation = document.querySelector('#bib-content').textContent;
    const label = copyButton.querySelector('span');
    let success = false;
    try {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(citation);
      success = true;
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = citation;
      textarea.style.cssText = 'position:fixed;left:0;top:0;opacity:0;';
      bibDialog.append(textarea);
      textarea.select();
      try { success = document.execCommand('copy'); } catch { /* Selection fallback below. */ }
      textarea.remove();
      copyButton.focus();
    }
    label.textContent = success ? 'Copied!' : 'Select citation to copy';
    document.querySelector('#copy-status').textContent = success ? 'Citation copied to clipboard.' : 'Clipboard access is unavailable. Select the citation text to copy it.';
    if (!success) {
      const range = document.createRange();
      range.selectNodeContents(document.querySelector('#bib-content'));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
    resetCopyTimer = setTimeout(() => { label.textContent = 'Copy citation'; }, 2500);
  });
})();
