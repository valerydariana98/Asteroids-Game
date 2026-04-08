/**
 * render/render.js
 * Centraliza todo el dibujado del juego en el canvas.
 * Cada función recibe el contexto 2D y los datos necesarios del gameState.
 */

export function render(ctx, gameState, canvas){
  clearCanvas(ctx, canvas.width, canvas.height);

  drawAsteroids(ctx, gameState.asteroids);
  //drawPlayer(ctx, gameState.player);
  //drawBullets(ctx, gameState.bullets);
  //drawUI(ctx, gameState);
}

// Core 

/**
 * Limpia el canvas y pinta el fondo negro.
 * @param {CanvasRenderingContext2D} ctx
 * @param {number} width
 * @param {number} height
 */
export function clearCanvas(ctx, width, height) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

// Asteroides

/**
 * Dibuja un unico asteroide usando sus vertices locales.
 * Traslada el origen al centro del asteroide y traza el poligono.
 * @param {CanvasRenderingContext2D} ctx
 * @param {import('../entities/asteroid').Asteroid} asteroid
 */
export function drawAsteroid(ctx, asteroid) {
  const { x, y, angle, vertices } = asteroid;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);         // rotación visual acumulada cada frame

  ctx.beginPath();
  ctx.moveTo(vertices[0].x, vertices[0].y);
  for (let i = 1; i < vertices.length; i++) {
    ctx.lineTo(vertices[i].x, vertices[i].y);
  }
  ctx.closePath();

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.restore();
}

/**
 * Dibuja todos los asteroides del array.
 * @param {CanvasRenderingContext2D} ctx
 * @param {import('../entities/asteroid').Asteroid[]} asteroids
 */
export function drawAsteroids(ctx, asteroids) {
  if (!asteroids) return;
  
  for (const asteroid of asteroids) {
    drawAsteroid(ctx, asteroid);
  }
}

