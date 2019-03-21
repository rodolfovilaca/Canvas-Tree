import React, { useEffect, useState, useRef } from "react";
import { Tag, Label, Text, Layer, Group } from "react-konva";

export default function Tooltip({ visible }) {
  const ref = useRef("stage");
  const [position, setPosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    ref.current.parent.on("mousemove", ev =>
      setPosition(ev.currentTarget.getPointerPosition())
    );
  }, []);

  return (
    <Layer ref={ref} x={position.x} y={position.y} visible={visible}>
      <Label opacity={0.75}>
        <Tag
          fill="#ffffff"
          pointerDirection="right"
          pointerWidth={10}
          pointerHeight={10}
          lineJoin="round"
          shadowColor="grey"
          shadowBlur={10}
          shadowOffset={10}
          shadowOpacity={0.5}
        />
        <Text
          text="TESTE"
          fontFamily="Calibri"
          fontSize={18}
          padding={5}
          fill="#000000"
        />
      </Label>
    </Layer>
  );
}
