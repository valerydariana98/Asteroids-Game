import { crearAsteroide }  from '../entities/asteroid.js';
import { gameState }       from '../game.js';
import { distancia }       from '../utils/math.js';

const DISTANCIA_MINIMA_NAVE = 150;

const MAX_INTENTOS = 20;


/**
 * Elige aleatoriamente uno de los cuatro bordes y devuelve
 * una coordenada sobre ese borde.
 *
 * Bordes:
 *   0 → arriba    (y = 0,         x aleatorio)
 *   1 → abajo     (y = canvasH,   x aleatorio)
 *   2 → izquierda (x = 0,         y aleatorio)
 *   3 → derecha   (x = canvasW,   y aleatorio)
 *
 * @param {number} canvasW
 * @param {number} canvasH
 * @returns {{ x: number, y: number }}
 */
function posicionEnBorde(canvasW, canvasH) {
  const borde = Math.floor(Math.random() * 4);
  switch (borde) {
    case 0: return { x: Math.random() * canvasW, y: 0        };  // arriba
    case 1: return { x: Math.random() * canvasW, y: canvasH  };  // abajo
    case 2: return { x: 0,       y: Math.random() * canvasH  };  // izquierda
    default: return { x: canvasW, y: Math.random() * canvasH };  // derecha
  }
}

/**
 * Devuelve una posición en borde que respete la distancia mínima
 * respecto al centro del canvas (posición inicial de la nave).
 * Reintenta hasta MAX_INTENTOS veces; si no lo logra, usa el último intento.
 *
 * @param {number} canvasW
 * @param {number} canvasH
 * @returns {{ x: number, y: number }}
 */
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

/**
 * Genera `cantidad` asteroides grandes en los bordes del canvas
 * y los añade a gameState.asteroids.
 * Se llama UNA VEZ al iniciar el juego, desde inicializarJuego().
 *
 * @param {number} canvasW
 * @param {number} canvasH
 * @param {number} [cantidad=6]
 */
export function spawnAsteroides(canvasW, canvasH, cantidad = 6) {
  for (let i = 0; i < cantidad; i++) {
    const { x, y } = posicionSeguraEnBorde(canvasW, canvasH);
    gameState.asteroids.push(crearAsteroide(x, y, 'grande'));
  }
}

/**
 * Comprueba si el campo de asteroides está vacío.
 * Si es así, lanza una nueva oleada desde los bordes.
 * Se llama cada frame desde el loop principal.
 *
 * @param {number} canvasW
 * @param {number} canvasH
 * @param {number} [cantidad=4]
 */
export function checkRespawn(canvasW, canvasH, cantidad = 4) {
  if (gameState.asteroids.length > 0) return;

  for (let i = 0; i < cantidad; i++) {
    const { x, y } = posicionSeguraEnBorde(canvasW, canvasH);
    gameState.asteroids.push(crearAsteroide(x, y, 'grande'));
  }
}

/**
 * Fragmenta un asteroide grande en 2 pequeños al recibir un impacto.
 * Si el asteroide es pequeño, simplemente lo elimina.
 * Muta gameState.asteroids directamente.
 *
 * @param {import('../entities/asteroid').Asteroid} asteroid - El asteroide impactado
 * @param {number} index - Su posición en gameState.asteroids
 */
export function fragmentarAsteroide(asteroid, index) {
  gameState.asteroids.splice(index, 1);

  const elapsed = (Date.now() - gameState.startTime) / 1000;

  if (asteroid.size === 'grande') {
    const fragmentSize = elapsed >= 30 ? 'mediano' : 'pequeno';
    gameState.asteroids.push(crearAsteroide(asteroid.x, asteroid.y, fragmentSize));
    gameState.asteroids.push(crearAsteroide(asteroid.x, asteroid.y, fragmentSize));
  }

  if (asteroid.size === 'mediano') {
    gameState.asteroids.push(crearAsteroide(asteroid.x, asteroid.y, 'pequeno'));
    gameState.asteroids.push(crearAsteroide(asteroid.x, asteroid.y, 'pequeno'));
  }

}