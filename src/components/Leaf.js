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
  ...rest
}) {
  // const [currentX, setCurrentX] = useState(x);
  // const [currentY, setCurrentY] = useState(y);
  // const [offsetX, setOffsetX] = useState(0);
  // const [offsetY, setOffsetY] = useState(0);
  const [position, setPosition] = useState({
    offsetX: 0,
    offsetY: 0
  });
  const [opacity, setOpacity] = useState(0.5)
  const [currentRotation, setCurrentRotation] = useState(deltaAngle);
  const ref = useRef("leaf");
  useEffect(() => {
    ref.current.on("mouseenter", ev => {
      ref.current.setOpacity(1);
      ref.current.draw();
    });
    ref.current.on("mouseleave", ev => {
      ref.current.setOpacity(0.5);
      ref.current.draw();
    });
    return () => {};
  }, []);

  useEffect(() => {
    const node = ref.current;
    // const centerPoint = { x: 0, y: -height / 2 };
    // const current = rotatePoint(centerPoint, currentRotation);
    // const rotated = rotatePoint(centerPoint, rotation);
    // console.log(deltaAngle, rotation);
    // const dx = rotated.x - current.x;
    // const dy = rotated.y - current.y;
    // setCurrentX(prevState => prevState - dx);
    // setCurrentY(prevState => prevState - dy);
    // setCurrentRotation(rotation);

    // console.log(node);
    const { height, width } = node.getClientRect();
    setPosition({
      offsetY: height / 2,
      offsetX: width / 2
    });
    // console.log(node.setOffsetX(3));
    // console.log(node.getOffsetX());
    // setOffsetX(width / 2);
    // setOffsetY(height / 2);
    // setCurrentX(node.getX() + width / 2);
    // setCurrentY(node.getY() + height / 2);

    node.rotate(rotation);
    return () => {};
  }, [rotation]);
  // useEffect(
  //   () => {
  //     ref.current.rotate(rotation);
  //     return () => {};
  //   },
  //   [currentRotation]
  // );
  return (
    <Path
      ref={ref}
      x={x}
      y={y}
      // x={currentX}
      // y={currentY}
      // offsetY={offsetY}
      // offsetX={offsetX}
      // rotation={deltaAngle}
      opacity={opacity}
      {...position}
      stroke="white"
      strokeWidth={1}
      fillLinearGradientStartPoint={{ x: 5.5, y: 5 }}
      fillLinearGradientEndPoint={{ x: 0, y: 5 }}
      data="M 4.496 19.631 L 8.59 15.557 L 8.59 7.875 L 4.496 0.542 L 0.411 7.875 L 0.423 15.673 L 4.496 19.631 Z "
      {...rest}
    />
  );
}
