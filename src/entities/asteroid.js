/**
 * entities/asteroid.js
 * Define la estructura de datos del asteroide y su función de creación.
 */

// ─── Configuración por tamaño ─────────────────────────────────────────────────

export const ASTEROID_CONFIG = {
  grande: {
    radius: 60,
    numVertices: 12,
    speedMin: 0.4,
    speedMax: 1.2,
  },
  mediano: {
  radius: 40,
  numVertices: 9,
  speedMin: 0.8,
  speedMax: 1.8,
},
  pequeno: {
    radius: 20,
    numVertices: 7,
    speedMin: 1.2,
    speedMax: 2.5,
  },
};

// ─── Generación de vértices irregulares ──────────────────────────────────────

/**
 * Genera vértices en coordenadas locales (relativas al centro del asteroide).
 * Cada vértice tiene un ángulo ligeramente desviado y un radio irregular
 * entre el 60% y 100% del radio base, dando la forma rocosa característica.
 *
 * @param {number} radius       - Radio base en px
 * @param {number} numVertices  - Cantidad de puntos del polígono
 * @returns {{ x: number, y: number }[]}
 */
function generarVertices(radius, numVertices) {
  const vertices = [];

  for (let i = 0; i < numVertices; i++) {
    const anguloBase = (i / numVertices) * Math.PI * 2;
    // Variación angular: ±mitad del espacio entre vértices
    const variacion = ((Math.random() - 0.5) * Math.PI * 2) / numVertices;
    const angulo = anguloBase + variacion;

    // Radio irregular: entre 60% y 100% del radio base
    const r = radius * (0.6 + Math.random() * 0.4);

    vertices.push({
      x: Math.cos(angulo) * r,
      y: Math.sin(angulo) * r,
    });
  }

  return vertices;
}

// ─── Función principal ────────────────────────────────────────────────────────

/**
 * Crea un objeto asteroide con todas sus propiedades.
 *
 * @param {number} x                      - Posición X en el canvas (px)
 * @param {number} y                      - Posición Y en el canvas (px)
 * @param {'grande' | 'pequeno'} size     - Tamaño del asteroide
 * @returns {Asteroid}
 *
 * @example
 * const a = crearAsteroide(100, 200, 'grande');
 * // { x: 100, y: 200, vx: -0.8, vy: 0.5, size: 'grande', radius: 60, vertices: [...] }
 */
export function crearAsteroide(x, y, size = 'grande') {
  const config = ASTEROID_CONFIG[size];
  const { radius, numVertices, speedMin, speedMax } = config;

  const speed = speedMin + Math.random() * (speedMax - speedMin);
  const movAngle = Math.random() * Math.PI * 2;

  // Rotación visual: los pequeños giran más rápido que los grandes
  const rotMax = size === 'grande' ? 0.01 : 0.025;

  return {
    x,
    y,
    vx: Math.cos(movAngle) * speed,
    vy: Math.sin(movAngle) * speed,
    size,
    radius,
    vertices:      generarVertices(radius, numVertices),
    angle:         Math.random() * Math.PI * 2,   // orientación visual inicial
    rotationSpeed: (Math.random() - 0.5) * 2 * rotMax, // rad/frame, puede ser ± 
  };
}

/**
 * @typedef {Object} Asteroid
 * @property {number}                      x        - Centro X en el canvas (px)
 * @property {number}                      y        - Centro Y en el canvas (px)
 * @property {number}                      vx       - Velocidad horizontal (px/frame)
 * @property {number}                      vy       - Velocidad vertical   (px/frame)
 * @property {'grande' | 'pequeno'}        size     - Tamaño del asteroide
 * @property {number}                      radius        - Radio de colisión (px)
 * @property {{ x: number, y: number }[]} vertices      - Forma en coords locales
 * @property {number}                      angle         - Rotación visual actual (rad)
 * @property {number}                      rotationSpeed - Velocidad de giro (rad/frame)
 */