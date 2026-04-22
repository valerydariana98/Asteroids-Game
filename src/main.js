import { gameState, inicializarJuego } from "./game.js";
import { wrapPosicion } from "./utils/math.js";
import { render } from "./render/render.js";
import { checkRespawn } from "./systems/spawn.js";
import { initInput, keys } from "./systems/input.js";
import { disparar } from "./systems/shoot.js";
import { checkBulletAsteroidCollision } from "./systems/collision.js";
import { checkPlayerAsteroidCollision } from "./systems/collision.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

inicializarJuego(canvas.width, canvas.height);
initInput();

function update() {
  const player = gameState.player;

  // Rotación
  if (keys["ArrowLeft"]) {
    player.angle -= player.rotationSpeed;
  }
  if (keys["ArrowRight"]) {
    player.angle += player.rotationSpeed;
  }

  // ← NUEVO: empuje hacia adelante
  if (keys["ArrowUp"]) {
    const thrust = 0.2;
    player.vx += Math.cos(player.angle - Math.PI / 2) * thrust;
    player.vy += Math.sin(player.angle - Math.PI / 2) * thrust;
  }

  // ← NUEVO: aplicar velocidad + fricción + wrap
  player.vx *= 0.98;
  player.vy *= 0.98;
  player.x += player.vx;
  player.y += player.vy;
  wrapPosicion(player, canvas.width, canvas.height);

  if (keys["Space"]) {
    disparar(gameState);
  }

  // Asteroides (sin cambios)
  for (const ast of gameState.asteroids) {
    ast.x += ast.vx;
    ast.y += ast.vy;
    ast.angle += ast.rotationSpeed;
    wrapPosicion(ast, canvas.width, canvas.height);
  }

  // Balas (sin cambios)
  for (const bullet of gameState.bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
  }

  gameState.bullets = gameState.bullets.filter(
    (bullet) =>
      bullet.x >= 0 &&
      bullet.x <= canvas.width &&
      bullet.y >= 0 &&
      bullet.y <= canvas.height,
  );

  checkBulletAsteroidCollision(gameState);
  checkPlayerAsteroidCollision(gameState);
  checkRespawn(canvas.width, canvas.height);

  if (gameState.lives <= 0) {
    gameState.running = false;
    gameState.lives = 0;
  }
}

function loop() {
  //console.log("loop funciona"); //debug

  if (!gameState.running) {
    //console.log("GAME OVER");
    render(ctx, gameState, canvas);
    return;
  }

  update();
  render(ctx, gameState, canvas);
  requestAnimationFrame(loop);
}

loop();
