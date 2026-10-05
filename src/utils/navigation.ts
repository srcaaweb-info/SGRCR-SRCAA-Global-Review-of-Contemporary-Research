const POLICY_SLUGS = new Set([
  'editorial-guidelines',
  'reviewer-guidelines',
  'plagiarism-guidelines',
  'withdrawal-policy',
  'legal-policy',
  'academic-publication-policy',
]);

export function cleanAddressBarUrl(paramsToRemove: string[] = []) {
  try {
    const url = new URL(window.location.href);
    url.hash = '';
    paramsToRemove.forEach((p) => url.searchParams.delete(p));
    window.history.replaceState({}, '', url.pathname + url.search);
  } catch {
    // Ignored if history API is restricted
  }
}

export function navigateToSection(sectionId: string) {
  cleanAddressBarUrl(['article', 'view', 'tab']);

  // Dispatch custom event so App.tsx can switch back to 'main' view if currently in 'archive' or 'article' view
  window.dispatchEvent(new CustomEvent('sgrcr-navigate-section', { detail: sectionId }));

  if (!sectionId || sectionId === 'top') {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  if (POLICY_SLUGS.has(sectionId)) {
    window.dispatchEvent(new CustomEvent('sgrcr-select-policy', { detail: sectionId }));
    const policiesEl = document.getElementById('policies');
    if (policiesEl) {
      policiesEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    return;
  }

  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
