import { crearAsteroide } from "../entities/asteroid.js";
import { gameState } from "../game.js";
import { distancia } from "../utils/math.js";

const DISTANCIA_MINIMA_NAVE = 150;

const MAX_INTENTOS = 20;

function posicionEnBorde(canvasW, canvasH) {
  const borde = Math.floor(Math.random() * 4);
  switch (borde) {
    case 0:
      return { x: Math.random() * canvasW, y: 0 }; // arriba
    case 1:
      return { x: Math.random() * canvasW, y: canvasH }; // abajo
    case 2:
      return { x: 0, y: Math.random() * canvasH }; // izquierda
    default:
      return { x: canvasW, y: Math.random() * canvasH }; // derecha
  }
}

function posicionSeguraEnBorde(canvasW, canvasH) {
  const cx = canvasW / 2;
  const cy = canvasH / 2;

  let pos;
  let intentos = 0;

  do {
    pos = posicionEnBorde(canvasW, canvasH);
    intentos++;
  } while (
    distancia(pos.x, pos.y, cx, cy) < DISTANCIA_MINIMA_NAVE &&
    intentos < MAX_INTENTOS
  );

  return pos;
}

export function spawnAsteroides(canvasW, canvasH, cantidad = 6) {
  for (let i = 0; i < cantidad; i++) {
    const { x, y } = posicionSeguraEnBorde(canvasW, canvasH);
    gameState.asteroids.push(crearAsteroide(x, y, "grande"));
  }
}

export function checkRespawn(canvasW, canvasH, cantidad = 4) {
  if (gameState.asteroids.length > 0) return;

  for (let i = 0; i < cantidad; i++) {
    const { x, y } = posicionSeguraEnBorde(canvasW, canvasH);
    gameState.asteroids.push(crearAsteroide(x, y, "grande"));
  }
}

export function fragmentarAsteroide(asteroid, index) {
  gameState.asteroids.splice(index, 1);

  const elapsed = (Date.now() - gameState.startTime) / 1000;

  if (asteroid.size === "grande") {
    const fragmentSize = elapsed >= 30 ? "mediano" : "pequeno";

    // Separar los fragmentos en direcciones opuestas
    const offset = asteroid.radius * 0.6;
    const angle = Math.random() * Math.PI * 2;

    const frag1 = crearAsteroide(
      asteroid.x + Math.cos(angle) * offset,
      asteroid.y + Math.sin(angle) * offset,
      fragmentSize,
    );
    const frag2 = crearAsteroide(
      asteroid.x - Math.cos(angle) * offset,
      asteroid.y - Math.sin(angle) * offset,
      fragmentSize,
    );

    // Heredar velocidad del padre + impulso propio
    frag1.vx += asteroid.vx;
    frag1.vy += asteroid.vy;
    frag2.vx += asteroid.vx;
    frag2.vy += asteroid.vy;

    gameState.asteroids.push(frag1);
    gameState.asteroids.push(frag2);
  }

  if (asteroid.size === "mediano") {
    const offset = asteroid.radius * 0.6;
    const angle = Math.random() * Math.PI * 2;

    const frag1 = crearAsteroide(
      asteroid.x + Math.cos(angle) * offset,
      asteroid.y + Math.sin(angle) * offset,
      "pequeno",
    );
    const frag2 = crearAsteroide(
      asteroid.x - Math.cos(angle) * offset,
      asteroid.y - Math.sin(angle) * offset,
      "pequeno",
    );

    frag1.vx += asteroid.vx;
    frag1.vy += asteroid.vy;
    frag2.vx += asteroid.vx;
    frag2.vy += asteroid.vy;

    gameState.asteroids.push(frag1);
    gameState.asteroids.push(frag2);
  }
}
