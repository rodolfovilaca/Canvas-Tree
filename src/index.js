import React, { useState, useRef, useReducer, useEffect, memo } from "react";
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

const Content = memo(({ state, dispatch }) => {
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
  return (
    <Group>
      <Base />
      {state.f.map((child, index) => {
        const isLeft = index < state.f.length / 2;
        return (
          <Trunk
            dispatch={dispatch}
            color={colors[child.c]}
            vertices={getPolygonVertices(
              isLeft ? leftHalf : rightHalf,
              getAngle(index, state.f.length, 90),
              60
            )}
            children={child.f}
            current={child}
            deltaAngle={isLeft ? -45 : 45}
            trunkIndex={2}
          />
        );
      })}
      <MainTrunk color={colors[state.c]} />
    </Group>
  );
});

function App() {
  const refStage = useRef("stage");
  const refLayer = useRef("layer");
  const [showTooltip, setShowTooltip] = useState(false);

  // const generatedVertices = getPolygonVertices(parentVertices, -15);
  // console.log(generatedVertices);

  const angleSeed = 180;
  const [state, dispatch] = useReducer(reducer, initialState);
  const [scaleState, setScaleState] = useState(SCALE);
  // useEffect(() => Object.keys(refLayer.current).length > 0 && refLayer.current.setScale({ x: scaleState, y: scaleState }), [scaleState]);

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
    <div>
      <button onClick={() => setScaleState(prevState => prevState + 1)}>
        +
      </button>
      {scaleState}
      <button
        onClick={() =>
          setScaleState(prevState =>
            prevState > 1 ? prevState - 1 : prevState
          )}
      >
        -
      </button>
      <Stage
        ref={refStage}
        width={window.innerWidth}
        height={window.innerHeight} 
      >
        <Layer
          ref={refLayer}
          x={window.innerWidth / 2}
          y={window.innerHeight / 2}
          scale={{ x: scaleState, y: scaleState }}
        >
          <Content state={state} dispatch={dispatch} />
        </Layer>
        <Tooltip visible={showTooltip} />
      </Stage>
    </div>
  );
}

render(<App />, document.getElementById("root"));
