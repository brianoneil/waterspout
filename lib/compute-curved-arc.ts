import type { ICurvedArc } from "@/interfaces/curved-arc.interface";
import type { IPoint } from "@/interfaces/points.interface";

function computeCurvedArc(width: number, height: number): ICurvedArc {
  const x = width / 2;
  const y = Math.max(height, 0.0001);
  const w = Math.sqrt(x * x + y * y);
  const phi = Math.atan2(x, y);
  const radius = w / 2 / Math.cos(phi);
  const centerX = width / 2;
  const centerY = radius;
  const startAngle = Math.atan2(0 - centerY, 0 - centerX);
  const endAngle = Math.atan2(0 - centerY, width - centerX);
  return {
    center: { x: centerX, y: centerY } as IPoint,
    radius,
    startAngle,
    endAngle,
  };
}

export { computeCurvedArc };
