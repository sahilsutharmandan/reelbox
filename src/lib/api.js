const BASE = "https://api.tvmaze.com";

export async function searchShows(query) {
  if (!query) return [];
  const res = await fetch(`${BASE}/search/shows?q=${query}`);
  if (!res.ok) throw new Error("Failed to search shows");
  return res.json();
}

export async function getShow(id) {
  const res = await fetch(`${BASE}/shows/${id}?embed[]=seasons&embed[]=cast`);
  if (!res.ok) throw new Error("Failed to fetch show");
  return res.json();
}

export async function getEpisodesBySeason(seasonId) {
  const res = await fetch(`${BASE}/seasons/${seasonId}/episodes`);
  if (!res.ok) throw new Error("Failed to fetch episodes");
  return res.json();
}

export async function getSchedule(date) {
  const res = await fetch(`${BASE}/schedule?country=US&date=${date}`);
  if (!res.ok) throw new Error("Failed to fetch schedule");
  return res.json();
}

export async function getPerson(id) {
  const res = await fetch(`${BASE}/people/${id}?embed=castcredits`);
  if (!res.ok) throw new Error("Failed to fetch person");
  return res.json();
}
