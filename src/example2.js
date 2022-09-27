import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import TeX from "@matejmazur/react-katex";
import {
    calcOutflowSteps,
    FlowEdge,
    Flow,
    DynamicFlowSvgDefs,
} from "dynamic-flow-visualization";
import { Vertex } from "./ForeignObjectVertex.js";
import { StopWatch } from "./StopWatch.js";

import example2FlowData from "./example2FlowData.js";
import { Stepper } from "spectacle";

const transitTime = [200, 200, 200];
const capacity = [10, 20, 20];

const flow = Flow.fromJson(example2FlowData);

const outflowSteps = flow.outflow.map((outflow) =>
    calcOutflowSteps(outflow, [{ id: 0, color: "#a00" }, { id: 1, color: "#0a0" }])
);

export const Example2Svg = () => {
    const sPos = [25, 150];
    const dxy = Math.sqrt(200 ** 2 / 2);
    const vPos = [25 + 100, 150 + Math.sqrt(200 ** 2 - 100 ** 2)];
    const tPos = [25 + 200, 150];
    return (
        <Stepper values={[200]} alwaysVisible>
            {(value, step, isActive) => {
                const [t, setT] = useState(typeof value === "number" ? value : 0);
                useInterval(() => {
                    setT((t) => {
                        if (t < (value || 0)) return Math.min(value || 0, t + 0.5);
                        else if (t > (value || 0)) return Math.max(value || 0, t - 0.5);
                        return value || 0;
                    });
                }, 1 / 30);
                const width = 450;
                const height = vPos[1] + 25;
                const svgIdPrefix = "example2-";
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
                                to={tPos}
                                capacity={capacity[0]}
                                transitTime={transitTime[0]}
                                queue={flow.queues[0]}
                                t={t}
                            />
                            <FlowEdge
                                {...viewOptions}
                                outflowSteps={outflowSteps[1]}
                                from={sPos}
                                to={vPos}
                                capacity={capacity[1]}
                                transitTime={transitTime[1]}
                                queue={flow.queues[1]}
                                t={t}
                            />
                            <FlowEdge
                                {...viewOptions}
                                outflowSteps={outflowSteps[2]}
                                from={vPos}
                                to={tPos}
                                capacity={capacity[2]}
                                transitTime={transitTime[2]}
                                queue={flow.queues[2]}
                                t={t}
                            />

                            <Vertex pos={sPos} label={<TeX>s</TeX>} />
                            <Vertex pos={vPos} label={<TeX>v</TeX>} />
                            <Vertex pos={tPos} label={<TeX>t</TeX>} />

                            <StopWatch t={t} x={vPos[0] - 20} size={40} y={10} />
                        </svg>
                    </div>
                );
            }}
        </Stepper>
    );
};
