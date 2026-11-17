const KEY = 'lendwise.loanApplication.v1';

export function loadDraft() {
  try { return JSON.parse(localStorage.getItem(KEY)) || null; } catch { return null; }
}

export function saveDraft(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Quota exceeded (large previews): retry without file previews so text data is never lost.
    try {
      const strip = (f) => (f ? { ...f, dataUrl: null } : f);
      const data = { ...state.data, idProof: strip(state.data.idProof), addressProof: strip(state.data.addressProof), incomeProof: strip(state.data.incomeProof) };
      localStorage.setItem(KEY, JSON.stringify({ ...state, data }));
    } catch { /* storage unavailable */ }
  }
}

export function clearDraft() {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
