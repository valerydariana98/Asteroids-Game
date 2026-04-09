import { spawnAsteroides } from './systems/spawn.js';

export const gameState = {
  asteroids: [],
  player: {x:0, y:0, angle:0},
  bullets: [],

  score:   0,
  lives:   3,
  running: false,
  startTime: null,
};

export function inicializarJuego(canvasW, canvasH) {
  gameState.asteroids = [];
  gameState.bullets   = [];
  gameState.player    = {x: canvasW/2, y: canvasH/2, angle:0};
  
  gameState.score     = 0;
  gameState.lives     = 3;
  gameState.running   = true;
  gameState.startTime = Date.now();

  spawnAsteroides(canvasW, canvasH, 8);
}