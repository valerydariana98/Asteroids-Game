export function crearBala(x, y, angle) {
  const speed = 7;

  return {
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    angle,     
    length: 12,
    radius: 3  
  };
}