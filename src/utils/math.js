// Funciones matemáticas auxiliares.
// Cálculos de distancia, ángulos, random, etc.
/**
 * Aplica wrap de pantalla: si el objeto sale del canvas,
 * reaparece en el lado opuesto.
 * Modifica el objeto directamente (muta x e y).
 *
 * @param {{ x: number, y: number, radius: number }} obj
 * @param {number} canvasW
 * @param {number} canvasH
 */
export function wrapPosicion(obj, canvasW, canvasH) {
  const r = obj.radius ?? 0;
  if (obj.x < -r)          obj.x = canvasW + r;
  if (obj.x > canvasW + r) obj.x = -r;
  if (obj.y < -r)          obj.y = canvasH + r;
  if (obj.y > canvasH + r) obj.y = -r;
}

/**
 * Calcula la distancia euclidiana entre dos puntos.
 *
 * @param {number} x1
 * @param {number} y1
 * @param {number} x2
 * @param {number} y2
 * @returns {number}
 */
export function distancia(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 * Comprueba colisión circular entre dos objetos.
 * Ambos deben tener { x, y, radius }.
 *
 * @param {{ x: number, y: number, radius: number }} a
 * @param {{ x: number, y: number, radius: number }} b
 * @returns {boolean}
 */
export function colisionCircular(a, b) {
  return distancia(a.x, a.y, b.x, b.y) < a.radius + b.radius;
}
/**
 * Convierte grados a radianes.
 * @param {number} deg
 * @returns {number}
 */
export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}