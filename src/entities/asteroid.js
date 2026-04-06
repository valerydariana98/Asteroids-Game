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

function generarVertices(radius, numVertices) {
  const vertices = [];

  for (let i = 0; i < numVertices; i++) {
    const anguloBase = (i / numVertices) * Math.PI * 2;
    const variacion = ((Math.random() - 0.5) * Math.PI * 2) / numVertices;
    const angulo = anguloBase + variacion;
    const r = radius * (0.6 + Math.random() * 0.4);

    vertices.push({
      x: Math.cos(angulo) * r,
      y: Math.sin(angulo) * r,
    });
  }

  return vertices;
}

export function crearAsteroide(x, y, size = 'grande') {
  const config = ASTEROID_CONFIG[size];
  const { radius, numVertices, speedMin, speedMax } = config;

  const speed = speedMin + Math.random() * (speedMax - speedMin);
  const movAngle = Math.random() * Math.PI * 2;
  const rotMax = size === 'grande' ? 0.01 : 0.025;

  return {
    x,
    y,
    vx: Math.cos(movAngle) * speed,
    vy: Math.sin(movAngle) * speed,
    size,
    radius,
    vertices: generarVertices(radius, numVertices),
    angle: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 2 * rotMax,
  };
}