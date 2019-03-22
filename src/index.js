import React, { useState, useRef, useReducer, useEffect, memo } from "react";
import { render } from "react-dom";
import { Stage, Layer, Group } from "react-konva";
import Base from "./components/Base";
import MainTrunk from "./components/MainTrunk";
import Trunk from "./components/Trunk";
import Tooltip from "./components/Tooltip";
import { reducer, initialState } from "./store";
import debounce from 'lodash/debounce';
import { getPolygonVertices, getAngle, colors, SCALE, INITIAL_STAGE_ATTRS } from "./utils/index";
import "./style.css";

const TrunkLayer = memo(
  ({ child, index, state, dispatch, scaleState, leftHalf, rightHalf, setAttributes }) => {
    const refLayer = useRef(`ref-layer-${child.cpf}`);
    const isLeft = index < state.f.length / 2;
    const maxAngle = state.f.length > 4 ? 120 : 90;
    useEffect(() => {
      const layer = refLayer.current;
      setTimeout(() => {
        console.log(layer.getClientRect(), scaleState);
        layer.cache({
          ...layer.getClientRect(),
          scale: { x: scaleState, y: scaleState }
        });
      }, 5000);
      return () => {};
    }, []);
    return (
      <Layer
        ref={refLayer}
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        // scale={{ x: scaleState, y: scaleState }}
      >
        <Trunk
          dispatch={dispatch}
          color={colors[child.c]}
          vertices={getPolygonVertices(
            isLeft ? leftHalf : rightHalf,
            getAngle(index, state.f.length, maxAngle),
            60
          )}
          children={child.f}
          current={child}
          deltaAngle={isLeft ? -maxAngle / 2 : maxAngle / 2}
          trunkIndex={2}
          setAttributes={setAttributes}
        />
      </Layer>
    );
  }
);

const Content = memo(({ state, ...rest }) => {
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
  return state.f.map((child, index) => {
    return (
      <TrunkLayer
        key={`trunk-layer-${child.cpf}`}
        child={child}
        index={index}
        state={state}
        // dispatch={dispatch}
        // scaleState={scaleState}
        leftHalf={leftHalf}
        rightHalf={rightHalf}
        {...rest}
      />
    );
  });
});

function App() {
  const refStage = useRef("stage");
  const [showTooltip, setShowTooltip] = useState(false);
  console.log("RENDER MAIN APP");

  const [state, dispatch] = useReducer(reducer, initialState);

  const [scaleState, setScaleState] = useState(SCALE);
  // const [scaleState, setScaleState] = useState(SCALE);
  const [attributes, setAttributes] = useState(INITIAL_STAGE_ATTRS);

  useEffect(() => {
    const stage = refStage.current;
    const scaleBy = 1.1;
    const onWheelEvent = e => {
      e.evt.preventDefault();
      var oldScale = stage.scaleX();
  
      var mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
      };
  
      var newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;
      // stage.scale({ x: newScale, y: newScale });
  
      var newPos = {
        x:
          -(mousePointTo.x - stage.getPointerPosition().x / newScale) *
          newScale,
        y:
          -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
      };
      // stage.position(newPos);
      setAttributes({ ...newPos, scaleX: newScale, scaleY: newScale });
      // stage.batchDraw();
    }
    stage.on("wheel", debounce(onWheelEvent, 10));
    console.log(stage.toDataURL());
    return () => {};
  }, []);
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
          )
        }
      >
        -
      </button>
      <Stage
        ref={refStage}
        container={"root"}
        width={window.innerWidth}
        height={window.innerHeight}
        {...attributes}
        draggable
      >
        <Layer x={window.innerWidth / 2} y={window.innerHeight / 2}>
          <Base />
          <MainTrunk color={colors[state.c]} />
        </Layer>
        <Content scaleState={scaleState} state={state} dispatch={dispatch} setAttributes={setAttributes} />
        <Tooltip visible={showTooltip} />
      </Stage>
    </div>
  );
}

render(<App />, document.getElementById("root"));
