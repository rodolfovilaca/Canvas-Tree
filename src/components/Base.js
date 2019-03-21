import React from "react";
import { Line, Group } from "react-konva";

export default function Base({ color, points }) {
  return (
    <Group>
      <Line
        points={[125, 186, 125, 183, 155, 183, 240, 183, 240, 186, 185, 220]}
        fill="#358125"
        closed
      />
      <Line
        points={[125, 183, 185, 150, 240, 183, 185, 217]}
        fill="#83de61"
        closed
      />
    </Group>
  );
}
