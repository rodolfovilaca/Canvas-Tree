import React, { useEffect, useState, useRef } from "react";
import { Line, Group, Shape } from "react-konva";
import IregularPolygon from "./IregularPolygon";
import Base from "./Base";

const vertices = [
  { x: 170, y: 194 },
  { x: 157, y: 183 },
  { x: 165, y: 175 },
  { x: 165, y: 175 },
  { x: 173, y: 47 },
  { x: 182, y: 43 },
  { x: 194, y: 46 },
  { x: 199, y: 177 },
  { x: 205, y: 183 },
  { x: 196, y: 193 },
  { x: 184, y: 197 }
];

export default function MainTrunk({ setShowTooltip, color }) {
  return <IregularPolygon color={color} vertices={vertices} />;
}
