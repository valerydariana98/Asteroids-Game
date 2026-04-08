import { gameState, inicializarJuego }  from './game.js';
import { wrapPosicion }                 from './utils/math.js';
import { render }                       from './render/render.js';
import { checkRespawn }                 from './systems/spawn.js';

const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

inicializarJuego(canvas.width, canvas.height);

function update() {
    if (!gameState.asteroids) return;
    
    for (const ast of gameState.asteroids) {
        ast.x     += ast.vx;
        ast.y     += ast.vy;
        ast.angle += ast.rotationSpeed;
        wrapPosicion(ast, canvas.width, canvas.height);
    }

    checkRespawn(canvas.width, canvas.height);
}

function loop() {
    //console.log("loop funciona"); //debug
    update();
    render(ctx, gameState, canvas);
    requestAnimationFrame(loop);
}

loop();