/**
 * render/render.js
 * Centraliza todo el dibujado del juego en el canvas.
 * Cada función recibe el contexto 2D y los datos necesarios del gameState.
 */

export function render(ctx, gameState, canvas){
  clearCanvas(ctx, canvas.width, canvas.height);

  drawAsteroids(ctx, gameState.asteroids);
  drawPlayer(ctx, gameState.player);
  drawBullets(ctx, gameState.bullets);
  //drawUI(ctx, gameState);

  if (!gameState.running) {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";
    ctx.fillText("GAME OVER", canvas.width / 2, canvas.height / 2);
  }
}

// Core 

export function clearCanvas(ctx, width, height) {
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
}

// Player

export function drawPlayer(ctx, player) {
  const {x, y, angle} = player;
  
  ctx.save();

  ctx.translate(x, y);
  ctx.rotate(angle);
 
  ctx.beginPath();
  ctx.moveTo(0, -30);
  ctx.lineTo(-20, 30);
  ctx.lineTo(20, 30);
  ctx.closePath();

  ctx.fillStyle = "white";
  ctx.fill();

  ctx.restore(); 
}

// Bullets
export function drawBullets(ctx, bullets) {
  for (const bullet of bullets) {

    ctx.save();

    ctx.translate(bullet.x, bullet.y);
    ctx.rotate(bullet.angle);

    ctx.beginPath();


    ctx.moveTo(-bullet.length / 2, 0);
    ctx.lineTo(bullet.length / 2,0);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.restore();
  }
}

// Asteroides

export function drawAsteroid(ctx, asteroid) {
  const { x, y, angle, vertices } = asteroid;

  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);         

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
  for (const asteroid of asteroids) {
    drawAsteroid(ctx, asteroid);
  }
}

