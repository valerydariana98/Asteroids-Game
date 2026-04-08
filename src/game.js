import { spawnAsteroides } from './systems/spawn.js';

export const gameState = {
  asteroids: [],
  player:    null,
  bullets: [],

  score:   0,
  lives:   3,
  running: false,
  startTime: null,
};

export function inicializarJuego(canvasW, canvasH) {
  gameState.asteroids = [];
  gameState.bullets   = [];
  gameState.player      = null;
  
  gameState.score     = 0;
  gameState.lives     = 3;
  gameState.running   = true;
  gameState.startTime = Date.now();

  spawnAsteroides(canvasW, canvasH, 8);
}