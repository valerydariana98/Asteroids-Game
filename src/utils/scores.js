const STORAGE_KEY = "asteroids_highscores";
const MAX_SCORES = 3;

export function getHighscores() {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveHighscore(name, score) {
  const scores = getHighscores();
  scores.push({ name: name.trim().toUpperCase() || "AAA", score });
  scores.sort((a, b) => b.score - a.score);
  const top = scores.slice(0, MAX_SCORES);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(top));
  return top;
}

export function isHighscore(score) {
  const scores = getHighscores();
  if (scores.length < MAX_SCORES) return true;
  return score > scores[scores.length - 1].score;
}