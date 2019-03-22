import React, { useEffect, useState, useRef } from "react";
import { Shape, Group, Container, Context } from "react-konva";

export default function IregularPolygon({ vertices, color, onClick }) {
  const refDark = useRef();
  const refLight = useRef();
  useEffect(() => {
    const nodeDark = refDark.current;
    const nodeLight = refLight.current;
    nodeDark.on("click", ev => {
      ev.cancelBubble = true;
      onClick();
    });
    nodeLight.on("click", ev => {
      ev.cancelBubble = true;
      onClick();
    });
  }, []);
  const lightPart = vertices.slice(vertices.length / 2 - 1);
  const darkPart = [vertices[vertices.length - 1], ...vertices.slice(0, vertices.length / 2)]
  return (
    <Group>
      <Shape
        ref={refDark}
        fill={color.dark}
        sceneFunc={(context, shape) => {
          context.beginPath();
          darkPart.forEach((item, index) => {
            if (index) {
              context.lineTo(item.x, item.y);
            } else {
              context.moveTo(item.x, item.y);
            }
          });
          context.closePath();
          context.fillStrokeShape(shape);
        }}
      />
      <Shape
        ref={refLight}
        fill={color.light}
        sceneFunc={(context, shape) => {
          context.beginPath();
          lightPart.forEach((item, index) => {
            if (index) {
              context.lineTo(item.x, item.y);
            } else {
              context.moveTo(item.x, item.y);
            }
          });
          context.closePath();
          context.fillStrokeShape(shape);
        }}
      />
    </Group>
  );
}
