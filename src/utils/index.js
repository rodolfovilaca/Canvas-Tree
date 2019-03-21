const degToRad = Math.PI / 180;
export const SCALE = 2;
export const DISTANCE_BETWEEN_LEAFS_LEVELS = 15;
export const QUANTITY_LEAFS_PER_LEVEL = 16;

export const colors = {
  0: { dark: "#008ab2", light: "#7ad0f1" },
  1: { dark: "#347f05", light: "#67ce27" },
  2: { dark: "#E48F3A", light: "#FDC844" },
  3: { dark: "#AE341B", light: "#DF4B28" }
};

export function rotateCoordinateInCenter(angle, point) {
  const rotatedPoint = {};
  rotatedPoint.x = point.x * Math.cos(angle) - point.y * Math.sin(angle);
  rotatedPoint.y = point.x * Math.sin(angle) + point.y * Math.cos(angle);
  return rotatedPoint;
}

export function translateInDirection(angle, point, distance = 0) {
  const newAngle = angle < 0 ? Math.abs(angle) + 180 : 180 - angle;
  const result = {};
  result.x = distance * Math.sin(newAngle * degToRad) + point.x;
  result.y = distance * Math.cos(newAngle * degToRad) + point.y;
  return result;
}

export const rotatePoint = ({ x, y }, deg) => {
  const rcos = Math.cos(deg * degToRad),
    rsin = Math.sin(deg * degToRad);
  return { x: x * rcos - y * rsin, y: y * rcos + x * rsin };
};

export function getPolygonVertices(edge, angle, h = 40) {
  const radius = h;

  const bottomLeftVertex = {};
  bottomLeftVertex.x = edge[0].x;
  bottomLeftVertex.y = edge[0].y;

  const topLeftVertex = {};
  topLeftVertex.x =
    bottomLeftVertex.x + radius * Math.sin(angle * degToRad) + 1.8;
  topLeftVertex.y =
    bottomLeftVertex.y - radius * Math.cos(angle * degToRad) + 0.4;

  const topRightVertex = {};
  topRightVertex.x = edge[1].x + Math.sin(angle * degToRad) * radius;
  topRightVertex.y = edge[1].y - radius * Math.cos(angle * degToRad);

  const bottomRightVertex = {};
  bottomRightVertex.x = edge[1].x;
  bottomRightVertex.y = edge[1].y;

  // if (Math.abs(topLeftVertex.x - topRightVertex.x) < 5) {
  //   if (angle > 0) {
  //     topLeftVertex.x =
  //       topLeftVertex.x + Math.abs(topLeftVertex.x - topLeftVertex.x) / 2;
  //   } else {
  //     topRightVertex.x =
  //       topRightVertex.x + Math.abs(topRightVertex.x - topRightVertex.x) / 2;
  //   }
  // } else if (Math.abs(topLeftVertex.x - topRightVertex.x) > 10) {
  //   if (angle > 0) {
  //     topLeftVertex.x =
  //       topLeftVertex.x - Math.abs(topLeftVertex.x - topLeftVertex.x) / 2;
  //   } else {
  //     topRightVertex.x =
  //       topRightVertex.x - Math.abs(topRightVertex.x - topRightVertex.x) / 2;
  //   }
  // }

  // if (Math.abs(topLeftVertex.y - topRightVertex.y) < 5) {
  //   if (angle > 0) {
  //     topLeftVertex.y =
  //       topLeftVertex.y + Math.abs(topLeftVertex.y - topLeftVertex.y) / 2;
  //   } else {
  //     topRightVertex.y =
  //       topRightVertex.y + Math.abs(topRightVertex.y - topRightVertex.y) / 2;
  //   }
  // } else if (Math.abs(topLeftVertex.y - topRightVertex.y) > 10) {
  //   if (angle > 0) {
  //     topLeftVertex.y =
  //       topLeftVertex.y - Math.abs(topLeftVertex.y - topLeftVertex.y) / 2;
  //   } else {
  //     topRightVertex.y =
  //       topRightVertex.y - Math.abs(topRightVertex.y - topRightVertex.y) / 2;
  //   }
  // }

  return [bottomLeftVertex, topLeftVertex, topRightVertex, bottomRightVertex];
}

export function getAngle(index, totalItems, totalAngle, deltaAngle) {
  const delta = totalAngle / (totalItems - 1);
  return (deltaAngle || 0) + (-totalAngle / 2 + delta * index);
}
