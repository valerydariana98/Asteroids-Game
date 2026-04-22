/**
 * render/render.js
 * Centraliza todo el dibujado del juego en el canvas.
 * Cada función recibe el contexto 2D y los datos necesarios del gameState.
 */
import { getHighscores } from "../utils/scores.js";

export function render(ctx, gameState, canvas) {
  clearCanvas(ctx, canvas.width, canvas.height);

  drawAsteroids(ctx, gameState.asteroids);
  drawBullets(ctx, gameState.bullets);
  drawPlayerWithBlink(ctx, gameState);  
  drawHUD(ctx, gameState); 

  if (!gameState.running) {
    drawGameOver(ctx, gameState, canvas);
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



function drawPlayerWithBlink(ctx, gameState) {
  const now = Date.now();
  const elapsed = now - gameState.playerHitTime;
  const isInvulnerable = elapsed < gameState.invulnerableTime;

  if (isInvulnerable) {
    const blink = Math.floor(elapsed / 150) % 2 === 0;
    if (!blink) return;
  }

  drawPlayer(ctx, gameState.player);
}

function drawHUD(ctx, gameState) {
  ctx.fillStyle = "white";
  ctx.font = "16px monospace";
  ctx.textAlign = "left";
  ctx.fillText(`SCORE: ${gameState.score}`, 20, 30);

  const maxLives = 3;
  const iconSize = 10;
  const spacing = 28;
  const startX = 20;
  const startY = 55;

  for (let i = 0; i < maxLives; i++) {
    const x = startX + i * spacing;
    const alive = i < gameState.lives;

    ctx.save();
    ctx.translate(x + iconSize, startY);

    ctx.beginPath();
    ctx.moveTo(0, -iconSize);
    ctx.lineTo(-iconSize * 0.65, iconSize * 0.8);
    ctx.lineTo(iconSize * 0.65, iconSize * 0.8);
    ctx.closePath();

    ctx.fillStyle = alive ? "white" : "rgba(255,255,255,0.15)";
    ctx.fill();
    ctx.restore();
  }
}

function drawGameOver(ctx, gameState, canvas) {
  const cx = canvas.width / 2;
  const cy = canvas.height / 2;

  ctx.fillStyle = "rgba(0,0,0,0.65)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.textAlign = "center";

  if (gameState.enteringName) {
    ctx.fillStyle = "white";
    ctx.font = "bold 36px monospace";
    ctx.fillText("¡NUEVO HIGHSCORE!", cx, cy - 60);

    ctx.font = "20px monospace";
    ctx.fillStyle = "#aaaaaa";
    ctx.fillText(`SCORE: ${gameState.score}`, cx, cy - 20);

    ctx.font = "16px monospace";
    ctx.fillStyle = "#666";
    ctx.fillText("ingresa tu nombre:", cx, cy + 20);

    const inputText = gameState.playerName + (Date.now() % 800 < 400 ? "|" : " ");
    ctx.fillStyle = "white";
    ctx.font = "bold 28px monospace";
    ctx.fillText(inputText, cx, cy + 60);

    ctx.font = "13px monospace";
    ctx.fillStyle = "#555";
    ctx.fillText("[ ENTER ] confirmar", cx, cy + 100);

  } else {

    ctx.fillStyle = "white";
    ctx.font = "bold 48px monospace";
    ctx.fillText("GAME OVER", cx, cy - 80);

    ctx.font = "18px monospace";
    ctx.fillStyle = "#aaaaaa";
    ctx.fillText(`SCORE: ${gameState.score}`, cx, cy - 45);

    drawHighscores(ctx, cx, cy);

    ctx.font = "13px monospace";
    ctx.fillStyle = "#555";
    ctx.fillText("[ ENTER ] reiniciar", cx, cy + 130);
  }
}

function drawHighscores(ctx, cx, cy) {
  const scores = getHighscores();

  ctx.font = "bold 16px monospace";
  ctx.fillStyle = "#ffcc00";
  ctx.fillText("— HIGHSCORES —", cx, cy + 10);

  if (scores.length === 0) {
    ctx.font = "14px monospace";
    ctx.fillStyle = "#555";
    ctx.fillText("sin records aún", cx, cy + 40);
    return;
  }

  const medals = [1, 2, 3];

  scores.forEach((entry, i) => {
    const y = cy + 40 + i * 28;
    ctx.font = "15px monospace";
    ctx.fillStyle = i === 0 ? "#ffcc00" : "#aaaaaa";
    ctx.fillText(
      `${medals[i]}  ${entry.name.padEnd(10)}  ${entry.score}`,
      cx, y
    );
  });
}
