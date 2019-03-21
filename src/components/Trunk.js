import React, { useEffect, useState, useRef } from "react";
import Konva from "konva";
import { Shape, Group } from "react-konva";
import IregularPolygon from "./IregularPolygon";
import chunk from "lodash/chunk";
import Leaf from "./Leaf";
import {
  getAngle,
  getPolygonVertices,
  colors,
  translateInDirection,
  DISTANCE_BETWEEN_LEAFS_LEVELS,
  QUANTITY_LEAFS_PER_LEVEL,
  rotateCoordinateInCenter,
  isLeaf as leaf
} from "../utils/index";

export default function Trunk({
  dispatch,
  current,
  deltaAngle,
  vertices,
  color,
  children = [],
  trunkIndex
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
  let perLevel = QUANTITY_LEAFS_PER_LEVEL;
  console.log(trunkIndex);
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
        // if (leaf(current.f[0]))
        //   console.log(chunk(current.f, QUANTITY_LEAFS_PER_LEVEL));
        // console.log(perLevel);
        if (isLeaf && indexLeaf % perLevel === 0) {
          perLevel += 2*level;
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
        
        const angle = getAngle(
          isLeaf ? indexLeaf : index,
          isLeaf ? perLevel : children.length,
          isLeaf ? 200 : 90,
          deltaAngle || 0
        );

        const coordinates = translateInDirection(
          angle,
          // rotatedCoordinate,
          {
            x: Math.round((topLeftVertex.x + topRightVertex.x) / 2),
            y: Math.round((topLeftVertex.y + topRightVertex.y) / 2)
          },
          DISTANCE_BETWEEN_LEAFS_LEVELS * level
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
            vertices={getPolygonVertices(
              parentEdge,
              angle,
              Math.ceil((60 + child.f.length * 0.2)/trunkIndex)
            )}
            children={child.f}
            current={child}
            deltaAngle={angle}
            trunkIndex={trunkIndex + 1}
          />
        );
      })}
    </Group>
  );
}
