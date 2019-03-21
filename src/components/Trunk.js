import React, { useEffect, useState, useRef } from "react";
import Konva from "konva";
import { Shape, Group } from "react-konva";
import IregularPolygon from "./IregularPolygon";
import Leaf from "./Leaf";
import {
  getAngle,
  getPolygonVertices,
  colors,
  translateInDirection,
  DISTANCE_BETWEEN_LEAFS_LEVELS,
  QUANTITY_LEAFS_PER_LEVEL,
  rotateCoordinateInCenter
} from "../utils/index";

export default function Trunk({
  dispatch,
  current,
  deltaAngle,
  vertices,
  color,
  children = []
}) {
  const [
    bottomLeftVertex,
    topLeftVertex,
    topRightVertex,
    bottomRightVertex
  ] = vertices;
  const parentEdge = [topLeftVertex, topRightVertex];
  let level = 0;
  let indexLeaf = 0;
  return (
    <Group>
      <IregularPolygon
        onClick={() =>
          dispatch({
            type: "drilldown",
            payload: current
          })
        }
        color={color}
        vertices={vertices}
      />
      {children.map((child, index) => {
        const isLeaf = child.f.length === 0;
        console.log(current.f.length);
        if (isLeaf && (index + 1) % QUANTITY_LEAFS_PER_LEVEL === 0) {
          level += 1;
          indexLeaf = 0;
        }

        const rotatedCoordinate = rotateCoordinateInCenter(
          isLeaf ? level * 0 : 0,
          {
            x: Math.round((topLeftVertex.x + topRightVertex.x) / 2),
            y: Math.round((topLeftVertex.y + topRightVertex.y) / 2)
          }
        );

        const coordinates = translateInDirection(
          deltaAngle,
          rotatedCoordinate,
          DISTANCE_BETWEEN_LEAFS_LEVELS * level
        );

        const angle = getAngle(
          isLeaf ? indexLeaf : index,
          isLeaf ? QUANTITY_LEAFS_PER_LEVEL : children.length,
          isLeaf ? 360 : 200,
          deltaAngle || 0
        );
        indexLeaf += 1;
        return isLeaf ? (
          <Leaf
            key={child.cpf}
            x={coordinates.x}
            y={coordinates.y}
            // x={Math.round((topLeftVertex.x + topRightVertex.x) / 2)}
            // y={Math.round((topLeftVertex.y + topRightVertex.y) / 2)}
            item={child}
            rotation={angle}
            deltaAngle={deltaAngle}
            fillLinearGradientColorStops={[
              0,
              colors[child.c].light,
              0.1,
              colors[child.c].dark
            ]}
          />
        ) : (
          <Trunk
            key={child.cpf}
            color={colors[child.c]}
            dispatch={dispatch}
            current={child}
            vertices={getPolygonVertices(
              parentEdge,
              angle,
              60 + child.f.length * 0.5
            )}
            children={child.f}
            deltaAngle={angle}
          />
        );
      })}
    </Group>
  );
}
// index, totalItems, totalAngle, deltaAngle
