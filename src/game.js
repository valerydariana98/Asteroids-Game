import { spawnAsteroides } from './systems/spawn.js';

export const gameState = {
  asteroids: [],
  startTime: null,

  ship:    null,
  bullets: [],

  score:   0,
  lives:   3,
  running: false,
};

export function inicializarJuego(canvasW, canvasH) {
  gameState.asteroids = [];
  gameState.bullets   = [];
  gameState.ship      = null;
  gameState.score     = 0;
  gameState.lives     = 3;
  gameState.running   = true;
  gameState.startTime = Date.now();

  spawnAsteroides(canvasW, canvasH, 8);
}