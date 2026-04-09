/**
 * render/render.js
 * Centraliza todo el dibujado del juego en el canvas.
 * Cada función recibe el contexto 2D y los datos necesarios del gameState.
 */

export function render(ctx, gameState, canvas){
  clearCanvas(ctx, canvas.width, canvas.height);

  drawAsteroids(ctx, gameState.asteroids);
  drawPlayer(ctx, gameState.player);
  //drawBullets(ctx, gameState.bullets);
  //drawUI(ctx, gameState);
}

// Core 

export function clearCanvas(ctx, width, height) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

// Player

export function drawPlayer(ctx, player) {
  const {x, y} = player;
  
  ctx.beginPath();

  // punta arriba
  ctx.moveTo(x, y - 20);

  // esquina izquierda
  ctx.lineTo(x - 15, y + 20);

  // esquina derecha
  ctx.lineTo(x + 15, y + 20);

  ctx.closePath();

  ctx.beginPath();

  // punta arriba
  ctx.moveTo(x, y - 20);

  // esquina izquierda
  ctx.lineTo(x - 15, y + 20);

  // esquina derecha
  ctx.lineTo(x + 15, y + 20);

  ctx.closePath();

  ctx.fillStyle = "white";
  ctx.fill();
  
  ctx.fillStyle = "white";
  ctx.fill();
}

// Asteroides

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

export function drawAsteroids(ctx, asteroids) {
  if (!asteroids) return;
  
  for (const asteroid of asteroids) {
    drawAsteroid(ctx, asteroid);
  }
}

