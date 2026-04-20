import { gameState, inicializarJuego }  from './game.js';
import { wrapPosicion }                 from './utils/math.js';
import { render }                       from './render/render.js';
import { checkRespawn }                 from './systems/spawn.js';
import { initInput, keys }              from './systems/input.js';
import { disparar }                     from './systems/shoot.js';

const canvas = document.getElementById('gameCanvas');
const ctx    = canvas.getContext('2d');

canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

inicializarJuego(canvas.width, canvas.height);
initInput();

function update() {
    //console.log("entra update");
    //console.log(keys);

    const player = gameState.player;

    if (keys["ArrowLeft"]) {
        player.angle -= player.rotationSpeed;
    }

    if (keys["ArrowRight"]) {
        player.angle += player.rotationSpeed;
    }

    if (keys["Space"]) {
    disparar(gameState);
    }

    //console.log(player.angle);
    
    for (const ast of gameState.asteroids) {
        ast.x     += ast.vx;
        ast.y     += ast.vy;
        ast.angle += ast.rotationSpeed;
        wrapPosicion(ast, canvas.width, canvas.height);
    }

    for (const bullet of gameState.bullets) {
    bullet.x += bullet.vx;
    bullet.y += bullet.vy;
    }

    gameState.bullets = gameState.bullets.filter(bullet => {
    return (
        bullet.x >= 0 &&
        bullet.x <= canvas.width &&
        bullet.y >= 0 &&
        bullet.y <= canvas.height
    );
    });

    checkRespawn(canvas.width, canvas.height);
}

function loop() {
    //console.log("loop funciona"); //debug
    update();
    render(ctx, gameState, canvas);
    requestAnimationFrame(loop);
}

loop();

