// Sistema de colisiones.
// Detecta interacciones entre balas, asteroides y jugador.
/**
 * systems/collision.js
 * Detección de colisiones bala-asteroide y nave-asteroide.
 * Usa colisionCircular() de utils/math.js.
 * TODO: implementación conjunta en semana 2.
 */

import { colisionCircular } from '../utils/math.js';
import { fragmentarAsteroide } from './spawn.js';
import { gameState } from '../game.js';

// export function checkBulletAsteroidCollisions() { ... }
// export function checkShipAsteroidCollisions() { ... }