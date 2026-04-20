import { crearBala } from '../entities/bullet.js';

export function disparar(gameState) {

  const now = Date.now();
  const cooldown = 200; 

  if (now - gameState.lastShotTime < cooldown) return;

  gameState.lastShotTime = now;

  const player = gameState.player;

  const offset = 30;
  const shootAngle = player.angle - Math.PI / 2;

  const x = player.x + Math.cos(shootAngle) * offset;
  const y = player.y + Math.sin(shootAngle) * offset;

  const bala = crearBala(x, y, shootAngle);

  gameState.bullets.push(bala);
}