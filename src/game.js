import { spawnAsteroides } from "./systems/spawn.js";
import { crearPlayer } from "./entities/player.js";

export const gameState = {
  asteroids: [],
  player: null,
  bullets: [],
  lastShotTime: 0,

  score: 0,
  lives: 3,
  running: false,
  gameOver: false,
  startTime: null,
  playerHitTime: 0,
  invulnerableTime: 2000,
  canvasW: 0,
  canvasH: 0,
};

export function inicializarJuego(canvasW, canvasH) {
  gameState.canvasW = canvasW;
  gameState.canvasH = canvasH; 
  gameState.asteroids = [];
  gameState.bullets = [];
  gameState.player = crearPlayer(canvasW / 2, canvasH / 2);
  gameState.score = 0;
  gameState.lives = 3;
  gameState.running = true;
  gameState.gameOver = false;
  gameState.startTime = Date.now();
  gameState.lastShotTime = 0;
  gameState.playerHitTime = 0;

  spawnAsteroides(canvasW, canvasH, 8);
}
