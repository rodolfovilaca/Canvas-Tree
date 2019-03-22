import React, { useEffect, useState, useRef } from "react";
import Konva from "konva";
import { Path } from "react-konva";
import { rotatePoint } from "../utils";

export default function Leaf({
  selected,
  setSelectedNode,
  rotation,
  x,
  y,
  item,
  deltaAngle,
  color,
  leafScale,
  ...rest
}) {
  const [position, setPosition] = useState({
    offsetX: 0,
    offsetY: 0
  });
  const ref = useRef("leaf");
  const [opacity, setOpacity] = useState(0.5);
  const [scale, setScale] = useState(leafScale);
  useEffect(() => {
    ref.current.on("mouseenter", ev => {
      setOpacity(1);
      setScale(prevState => prevState + 0.2);
    });
    ref.current.on("mouseleave", ev => {
      setOpacity(0.5);
      setScale(prevState => prevState - 0.2);
    });
    return () => {};
  }, []);

  useEffect(() => {
    const node = ref.current;
    const { height, width } = node.getClientRect();
    // const centerPoint = { x: 0, y: -height / 2 };
    // const current = rotatePoint(centerPoint, Konva.getAngle(node.rotation()));
    // const rotated = rotatePoint(centerPoint, Konva.getAngle(rotation));
    // const dx = rotated.x - current.x;
    // const dy = rotated.y - current.y;
    // setPosition({
    //   x: x + dx,
    //   y: y + dy,
    //   rotation
    // });

    // console.log(height, width)
    setPosition({
      offsetY: 19 / 2,
      offsetX: 8 / 2,
      rotation
    });

    // node.setOffsetY(height / 2);
    // node.setOffsetX(width / 2);
    // node.rotation(rotation);
    // node.draw();

    return () => {};
  }, []);
  return (
    <Path
      ref={ref}
      x={x}
      y={y}
      scale={{ x: scale, y: scale }}
      opacity={opacity}
      {...position}
      fillLinearGradientStartPoint={{ x: 5.5, y: 5 }}
      fillLinearGradientEndPoint={{ x: 0, y: 5 }}
      data="M 4.496 19.631 L 8.59 15.557 L 8.59 7.875 L 4.496 0.542 L 0.411 7.875 L 0.423 15.673 L 4.496 19.631 Z "
      {...rest}
    />
  );
}
