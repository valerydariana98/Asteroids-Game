import { spawnAsteroides } from './systems/spawn.js';
import { crearPlayer } from './entities/player.js';

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
  gameState.player = crearPlayer(
  canvasW / 2,
  canvasH / 2
  );
  
  gameState.score     = 0;
  gameState.lives     = 3;
  gameState.running   = true;
  gameState.startTime = Date.now();

  spawnAsteroides(canvasW, canvasH, 8);
}