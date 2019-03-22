import React, { useEffect, useState, useRef } from "react";
import { Group } from "react-konva";
import IregularPolygon from "./IregularPolygon";
import Leaf from "./Leaf";
import {
  getAngle,
  getPolygonVertices,
  colors,
  translateInDirection,
  DISTANCE_BETWEEN_LEAFS_LEVELS,
  QUANTITY_LEAFS_PER_LEVEL,
  isLeaf as leaf
} from "../utils/index";

export default function Trunk({
  dispatch,
  current,
  deltaAngle,
  vertices,
  color,
  children = [],
  setAttributes,
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
  return (
    <Group>
      <IregularPolygon
        onClick={() => {
          setAttributes()
          dispatch({
            type: "drilldown",
            payload: current
          });
        }}
        color={color}
        vertices={vertices}
      />
      {children.map((child, index) => {
        const isLeaf = child.f.length === 0;
        let leafScale = 1;
        let ADJUSTED_DISTANCE_BETWEEN_LEAFS_LEVELS = DISTANCE_BETWEEN_LEAFS_LEVELS;
        if (current.f.length > 50) {
          leafScale = 0.8;
          ADJUSTED_DISTANCE_BETWEEN_LEAFS_LEVELS =
            ADJUSTED_DISTANCE_BETWEEN_LEAFS_LEVELS - 2;
        }
        if (isLeaf && indexLeaf % perLevel === 0) {
          perLevel += 2 * level;
          level += 1;
          indexLeaf = 0;
        }

        const angle = getAngle(
          isLeaf ? indexLeaf : index,
          isLeaf ? perLevel : children.length,
          isLeaf ? 240 : 90,
          deltaAngle || 0
        );

        const coordinates = translateInDirection(
          angle,
          {
            x: Math.round((topLeftVertex.x + topRightVertex.x) / 2),
            y: Math.round((topLeftVertex.y + topRightVertex.y) / 2)
          },
          ADJUSTED_DISTANCE_BETWEEN_LEAFS_LEVELS * level
        );

        indexLeaf += 1;
        return isLeaf ? (
          <Leaf
            key={child.cpf}
            x={coordinates.x}
            y={coordinates.y}
            item={child}
            rotation={angle}
            deltaAngle={deltaAngle}
            leafScale={leafScale}
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
              Math.ceil((60 + child.f.length * 0.2) / trunkIndex)
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
