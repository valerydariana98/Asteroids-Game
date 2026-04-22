import { gameState, inicializarJuego } from "./game.js";
import { wrapPosicion } from "./utils/math.js";
import { render } from "./render/render.js";
import { checkRespawn } from "./systems/spawn.js";
import { initInput, keys } from "./systems/input.js";
import { disparar } from "./systems/shoot.js";
import { checkBulletAsteroidCollision } from "./systems/collision.js";
import { checkPlayerAsteroidCollision } from "./systems/collision.js";
import { saveHighscore, isHighscore } from "./utils/scores.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

inicializarJuego(canvas.width, canvas.height);
initInput();

function update() {
  const player = gameState.player;

  if (keys["ArrowLeft"]) player.angle -= player.rotationSpeed;
  if (keys["ArrowRight"]) player.angle += player.rotationSpeed;

  if (keys["ArrowUp"]) {
    const thrust = 0.2;
    player.vx += Math.cos(player.angle - Math.PI / 2) * thrust;
    player.vy += Math.sin(player.angle - Math.PI / 2) * thrust;
  }

  player.vx *= 0.98;
  player.vy *= 0.98;
  player.x += player.vx;
  player.y += player.vy;
  wrapPosicion(player, canvas.width, canvas.height);

  if (keys["Space"]) disparar(gameState);

  for (const ast of gameState.asteroids) {
    ast.x += ast.vx;
    ast.y += ast.vy;
    ast.angle += ast.rotationSpeed;
    wrapPosicion(ast, canvas.width, canvas.height);
  }

  for (const bullet of gameState.bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
  }

  gameState.bullets = gameState.bullets.filter(
    (b) => b.x >= 0 && b.x <= canvas.width && b.y >= 0 && b.y <= canvas.height
  );

  checkBulletAsteroidCollision(gameState);
  checkPlayerAsteroidCollision(gameState);
  checkRespawn(canvas.width, canvas.height);

  if (gameState.lives <= 0) {
    gameState.running = false;
    gameState.lives = 0;
    gameState.enteringName = isHighscore(gameState.score);
    gameState.playerName = "";
  }
}

function loop() {
  if (!gameState.running) {
    render(ctx, gameState, canvas);
    return;
  }
  update();
  render(ctx, gameState, canvas);
  requestAnimationFrame(loop);
}

loop();

document.addEventListener("keydown", (e) => {
  if (gameState.enteringName) {
    if (e.key === "Enter" && gameState.playerName.length > 0) {
      saveHighscore(gameState.playerName, gameState.score);
      gameState.enteringName = false;
      render(ctx, gameState, canvas);
    } else if (e.key === "Backspace") {
      gameState.playerName = gameState.playerName.slice(0, -1);
      render(ctx, gameState, canvas);
    } else if (e.key.length === 1 && gameState.playerName.length < 10) {
      gameState.playerName += e.key;
      render(ctx, gameState, canvas);
    }
    return;
  }

  if (e.code === "Enter" && !gameState.running) {
    inicializarJuego(canvas.width, canvas.height);
    loop();
  }
});