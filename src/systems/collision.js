import { fragmentarAsteroide } from "./spawn.js";

export function checkBulletAsteroidCollision(gameState) {
  const bullets = gameState.bullets;
  const asteroids = gameState.asteroids;

  const newBullets = [];
  const destroyedIndexes = new Set();
  const hitBullets = new Set();

  for (let i = 0; i < asteroids.length; i++) {
    const asteroid = asteroids[i];

    for (let j = 0; j < bullets.length; j++) {
      const bullet = bullets[j];
      const dx = bullet.x - asteroid.x;
      const dy = bullet.y - asteroid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bullet.radius + asteroid.radius) {
        destroyedIndexes.add(i);
        hitBullets.add(j);
        gameState.score += 10;
        break;
      }
    }
  }

  const sortedIndexes = [...destroyedIndexes].sort((a, b) => b - a);
  for (const index of sortedIndexes) {
    fragmentarAsteroide(asteroids[index], index);
  }

  for (let j = 0; j < bullets.length; j++) {
    if (!hitBullets.has(j)) {
      newBullets.push(bullets[j]);
    }
  }

  gameState.bullets = newBullets;
}

export function checkPlayerAsteroidCollision(gameState) {
  const player = gameState.player;
  const asteroids = gameState.asteroids;

  const now = Date.now();

  if (now - gameState.playerHitTime < gameState.invulnerableTime) {
    return;
  }

  const playerRadius = 20;

  for (const asteroid of asteroids) {
    const dx = player.x - asteroid.x;
    const dy = player.y - asteroid.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance < playerRadius + asteroid.radius) {
      gameState.lives = Math.max(0, gameState.lives - 1);
      gameState.playerHitTime = now;
      respawnPlayer(gameState);
      console.log("player golpeado, vidas:", gameState.lives);
      return;
    }
  }
}

function respawnPlayer(gameState) {
  const player = gameState.player;

  player.x = gameState.canvasW / 2;
  player.y = gameState.canvasH / 2;

  player.vx = 0;
  player.vy = 0;
  player.angle = 0;
}