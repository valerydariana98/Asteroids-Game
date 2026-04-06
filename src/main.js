import { gameState, inicializarJuego } from './game.js';
import { wrapPosicion }                from './utils/math.js';
import { clearCanvas, drawAsteroids }  from './render/render.js';
import { checkRespawn }                from './systems/spawn.js';

const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

inicializarJuego(canvas.width, canvas.height);

function update() {
  for (const ast of gameState.asteroids) {
    ast.x     += ast.vx;
    ast.y     += ast.vy;
    ast.angle += ast.rotationSpeed;
    wrapPosicion(ast, canvas.width, canvas.height);
  }

  checkRespawn(canvas.width, canvas.height);

}

function draw() {
  clearCanvas(ctx, canvas.width, canvas.height);
  drawAsteroids(ctx, gameState.asteroids);
}

function loop() {
  update();
  draw();
  requestAnimationFrame(loop);
}

loop();