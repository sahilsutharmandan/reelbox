const WATCHLIST_KEY = "reelbox_watchlist";

function getItem(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function setItem(key, value) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage full */
  }
}

export function getWatchlist() {
  return getItem(WATCHLIST_KEY, []);
}

export function addToWatchlist(show) {
  const list = getWatchlist();
  if (list.some((s) => s.id === show.id)) return list;
  const updated = [...list, show];
  setItem(WATCHLIST_KEY, updated);
  return updated;
}

export function removeFromWatchlist(showId) {
  const list = getWatchlist().filter((s) => s.id !== showId);
  setItem(WATCHLIST_KEY, list);
  return list;
}

export function isInWatchlist(showId) {
  return getWatchlist().some((s) => s.id === showId);
}

export function getProgress() {
  return getItem("reelbox_progress", {});
}

export function setProgress(showId, watched, total) {
  const progress = getProgress();
  progress[showId] = { watched, total };
  setItem("reelbox_progress", progress);
  return progress;
}
