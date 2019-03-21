import React, { useState, useRef, useReducer, useEffect } from "react";
import Konva from "konva";
import { render } from "react-dom";
import { Stage, Layer, Group } from "react-konva";
import Leaf from "./components/Leaf";
import Base from "./components/Base";
import MainTrunk from "./components/MainTrunk";
import Trunk from "./components/Trunk";
import Tooltip from "./components/Tooltip";
import Leafs from "./components/Leafs";
import IregularPolygon from "./components/IregularPolygon";
import { reducer, initialState } from "./store";
import { getPolygonVertices, getAngle, colors, SCALE } from "./utils/index";
import "./style.css";

// import { data } from "./mockData";

function App() {
  const refStage = useRef("stage");
  const [showTooltip, setShowTooltip] = useState(false);

  const expectedVertices = [
    { x: 170, y: 15 },
    { x: 180, y: 16 },
    { x: 190, y: 50 },
    { x: 178, y: 50 }
  ];
  const parentVertices = [{ x: 175, y: 50 }, { x: 185, y: 50 }];

  const leftHalf = [{ x: 173, y: 47 }, { x: 182, y: 43 }];
  const rightHalf = [{ x: 182, y: 43 }, { x: 194, y: 46 }];
  const full = [{ x: 173, y: 47 }, { x: 194, y: 46 }];

  const children = Array.from(Array(4)).map((item, index) => ({}));

  // const generatedVertices = getPolygonVertices(parentVertices, -15);
  // console.log(generatedVertices);

  const angleSeed = 180;
  const [state, dispatch] = useReducer(reducer, initialState);
  // useEffect(
  //   () =>
  //     setTimeout(
  //       () =>
  //         dispatch({
  //           type: "drilldown",
  //           payload: state.f[0]
  //         }),
  //       3000
  //     ),
  //   []
  // );
  return (
    <Stage ref={refStage} width={window.innerWidth} height={window.innerHeight}>
      <Layer
        scale={{ x: SCALE, y: SCALE }}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
      >
        <Base />
        {state.f.map((child, index) => {
          const isLeft = index < state.f.length / 2;
          return (
            <Trunk
              dispatch={dispatch}
              current={child}
              color={colors[child.c]}
              vertices={getPolygonVertices(
                isLeft ? leftHalf : rightHalf,
                getAngle(index, state.f.length, 90),
                90
              )}
              children={child.f}
              deltaAngle={isLeft ? -45 : 45}
            />
          );
        })}
        <MainTrunk color={colors[state.c]} setShowTooltip={setShowTooltip} />
      </Layer>
      <Tooltip visible={showTooltip} />
    </Stage>
  );
}

render(<App />, document.getElementById("root"));
