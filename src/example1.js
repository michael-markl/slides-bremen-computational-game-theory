import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import TeX from "@matejmazur/react-katex";

import example1FlowData from "./example1FlowData.js";
import { Stepper } from "spectacle";
import {
  Flow,
  calcOutflowSteps,
  DynamicFlowSvgDefs,
  FlowEdge,
} from "dynamic-flow-visualization";
import { StopWatch } from "./StopWatch.js";
import { Vertex } from "./ForeignObjectVertex.js";

const transitTime = [200, 200, 200];
const capacity = [20, 10, 10];

const flow = Flow.fromJson(example1FlowData);

const outflowSteps = flow.outflow.map((outflow) =>
  calcOutflowSteps(outflow, { 0: { id: 0, color: "#a00" }, 1: { id: 1, color: "#0a0" } })
);

const sPos = [25, 150];
const vPos = [225, 150];
const tPos = [425, 150];
const s2Pos = [225 - 200 / Math.sqrt(2), 150 + 200 / Math.sqrt(2)];

export const Example1Svg = ({ overrideT = null, svgIdPrefix = "example1-" }) => {
  const width = 450;
  const height = s2Pos[1] + 25;
  if (typeof overrideT == "number") {
    return (
      <SvgContent
        width={width}
        height={sPos[1] + 25}
        svgIdPrefix={svgIdPrefix}
        t={overrideT}
        showStopWatch={false}
      />
    );
  }
  return (
    <Stepper values={[0, 400, 800, 1200]} alwaysVisible>
      {(value, step, isActive) => {
        const [t, setT] = useState(typeof value === "number" ? value : 0);
        useInterval(() => {
          setT((t) => {
            if (t < (value || 0)) return Math.min(value || 0, t + 0.5);
            else if (t > (value || 0)) return Math.max(value || 0, t - 0.5);
            return value || 0;
          });
        }, 1 / 30);
        return (
          <SvgContent
            width={width}
            height={height}
            svgIdPrefix={svgIdPrefix}
            t={t}
            showStopWatch={typeof value == "number"}
          />
        );
      }}
    </Stepper>
  );
};

const SvgContent = ({ width, height, svgIdPrefix, t, showStopWatch }) => {
  const viewOptions = {
    translate: 0,
    multiGroup: false,
    waitingTimeScale: .5,
    strokeWidth: 1,
    svgIdPrefix,
    offset: 40,
    flowScale: 1
  }
  return (
    <div style={{ position: "relative" }}>
      <svg width={width} height={height}>
        <DynamicFlowSvgDefs svgIdPrefix={svgIdPrefix} />
        <FlowEdge
          {...viewOptions}
          outflowSteps={outflowSteps[0]}
          from={sPos}
          to={vPos}
          capacity={capacity[0]}
          transitTime={transitTime[0]}
          queue={flow.queues[0]}
          t={t}
        />
        <FlowEdge
          {...viewOptions}
          outflowSteps={outflowSteps[1]}
          from={vPos}
          to={tPos}
          capacity={capacity[1]}
          transitTime={transitTime[1]}
          queue={flow.queues[1]}
          t={t}
        />
        <FlowEdge
          {...viewOptions}
          visible={t > 1200}
          outflowSteps={outflowSteps[2]}
          from={s2Pos}
          to={vPos}
          capacity={capacity[2]}
          transitTime={transitTime[2]}
          queue={flow.queues[2]}
          t={t}
        />

        <Vertex pos={sPos} label={<TeX>s</TeX>} />
        <Vertex pos={tPos} label={<TeX>t</TeX>} />
        <Vertex pos={vPos} label={<TeX>v</TeX>} />
        <Vertex pos={s2Pos} label={<TeX>s_2</TeX>} visible={t > 1200} />
        <g
          opacity={showStopWatch ? 1 : 0}
          style={{ transition: "opacity 0.2s" }}
        >
          <StopWatch t={t} y={10} x={vPos[0] - 20} size={40} />
        </g>
      </svg>
    </div>
  );
};
