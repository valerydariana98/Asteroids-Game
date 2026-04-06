export function wrapPosicion(obj, canvasW, canvasH) {
  const r = obj.radius ?? 0;
  if (obj.x < -r)          obj.x = canvasW + r;
  if (obj.x > canvasW + r) obj.x = -r;
  if (obj.y < -r)          obj.y = canvasH + r;
  if (obj.y > canvasH + r) obj.y = -r;
}

export function distancia(x1, y1, x2, y2) {
  const dx = x2 - x1;
  const dy = y2 - y1;
  return Math.sqrt(dx * dx + dy * dy);
}

export function colisionCircular(a, b) {
  return distancia(a.x, a.y, b.x, b.y) < a.radius + b.radius;
}

export function degToRad(deg) {
  return (deg * Math.PI) / 180;
}