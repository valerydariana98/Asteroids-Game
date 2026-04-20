export function checkBulletAsteroidCollision(gameState) {
  const bullets = gameState.bullets;
  const asteroids = gameState.asteroids;

  const newBullets = [];
  const newAsteroids = [];

  for (const asteroid of asteroids) {
    let destroyed = false;

    for (const bullet of bullets) {

      const dx = bullet.x - asteroid.x;
      const dy = bullet.y - asteroid.y;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bullet.radius + asteroid.radius) {
        destroyed = true;
        gameState.score += 10;
        break;
      }
    }

    if (!destroyed) {
      newAsteroids.push(asteroid);
    }
  }

  for (const bullet of bullets) {
    let hit = false;

    for (const asteroid of asteroids) {
      const dx = bullet.x - asteroid.x;
      const dy = bullet.y - asteroid.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < bullet.radius + asteroid.radius) {
        hit = true;
        break;
      }
    }

    if (!hit) {
      newBullets.push(bullet);
    }
  }

  gameState.asteroids = newAsteroids;
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

      console.log("player golpeado");

      return;
    }
  }
}
