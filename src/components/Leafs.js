import React, { useEffect, useState } from "react";
import { Group } from "react-konva";
import Leaf from "./Leaf";

const leafs = Array.from(Array(1000)).map((item, index) => ({
  key: `leaf-${index}`,
  index
}));

export default function Leafs() {
  const [rotation, setRotation] = useState(0);
  const [selectedNode, setSelectedNode] = useState(null);
  const rotateAll = () => setRotation(30);

  useEffect(() => rotateAll(), [selectedNode]);
  return (
    <Group>
      {leafs.map(item => {
        const x = 400 * Math.random();
        const y = 20 * Math.random();
        let defaultRotation = rotation;
        if (x < 50) {
          defaultRotation = -rotation;
        }
        return (
          <Leaf
            key={item.key}
            item={item}
            rotation={defaultRotation}
            x={x}
            y={y}
            fillLinearGradientColorStops={[
              0,
              Konva.Util.getRandomColor(),
              1,
              Konva.Util.getRandomColor()
            ]}
            selected={item.index === selectedNode}
            setSelectedNode={setSelectedNode}
          />
        );
      })}
    </Group>
  );
}
