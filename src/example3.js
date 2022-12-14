import React, { useState } from "react";
import { useInterval } from "usehooks-ts";
import TeX from "@matejmazur/react-katex";
import {
    FlowEdge,
    DynamicFlowSvgDefs,
    Flow,
    elemRank,
    calcOutflowSteps
} from "dynamic-flow-visualization";
import { ForeignObjectLabel } from "./foreignObjectLabel.js";
import { d } from "./pathData.js";
import { Vertex } from "./ForeignObjectVertex.js";
import { StopWatch } from "./StopWatch.js";

import example3FlowData from "./example3FlowData.js";
import { Stepper } from "spectacle";
import { Axes } from "./predictorFigures";
import { Tex } from "./tex";

const transitTime = [200, 200, 200, 400, 200];
const capacity = [20, 10, 20, 20, 20];

const flow = Flow.fromJson(example3FlowData);

const outflowSteps = flow.outflow.map((outflow) =>
    calcOutflowSteps(outflow, [{ id: 0, color: "#a00" }, { id: 1, color: "#0a0" }])
);

const sPos = [25, 250];
const v1Pos = [25 + 200, 250];
const tPos = [25 + 400, 250];
const v3Pos = [25, 250 + 200];
const v4Pos = [25 + 400, 250 + 200];

export const Example3Svg = ({
    demo = false,
    svgIdPrefix = "example3-",
    overrideT = null,
    width = 1000,
    height = 250 + 200 + 25,
}) => {
    if (typeof overrideT == "number") {
        return (
            <SvgContent
                width={width}
                height={height}
                diagramVisible={true}
                svgIdPrefix={svgIdPrefix}
                t={overrideT}
                mode={MODE.TIMESERIES}
            />
        );
    }
    const steps = demo ? [8 * 200] : [0, 200, 400, 599, 601, 800, 8 * 200];
    return (
        <Stepper values={steps} alwaysVisible>
            {(value, step, isActive) => {
                const [t, setT] = useState(typeof value === "number" ? value : 0);
                useInterval(() => {
                    setT((t) => {
                        if (t < (value || 0)) return Math.min(value || 0, t + 0.5);
                        else if (t > (value || 0)) return Math.max(value || 0, t - 0.5);
                        return value || 0;
                    });
                }, 1 / 30);
                const svgIdPrefix2 = svgIdPrefix + (demo ? "demo-" : "");
                return (
                    <SvgContent
                        mode={demo ? MODE.DEMO : MODE.DEFAULT}
                        width={width}
                        height={height}
                        diagramVisible={demo || typeof value == "number"}
                        svgIdPrefix={svgIdPrefix2}
                        t={t}
                    />
                );
            }}
        </Stepper>
    );
};

const MODE = {
    DEFAULT: "default",
    DEMO: "demo",
    TIMESERIES: "timeseries",
};

const SvgContent = ({
    width,
    height,
    mode = MODE.DEFAULT,
    svgIdPrefix,
    t,
    diagramVisible,
}) => {
    const diagram = {
        [MODE.DEFAULT]: (
            <QueueDiagram
                svgIdPrefix={svgIdPrefix}
                x={600}
                y={100}
                width={350}
                t={t}
                queue={flow.queues[1]}
                visible={diagramVisible}
            />
        ),
        [MODE.DEMO]: (
            <QueueDiagram
                svgIdPrefix={svgIdPrefix}
                x={600}
                y={120}
                width={350}
                t={t}
                queue={flow.queues[1]}
                visible={diagramVisible}
            />
        ),
        [MODE.TIMESERIES]: null,
    };

    const stopWatch = {
        [MODE.DEFAULT]: <StopWatch t={t} x={v1Pos[0] - 20} size={40} y={5} />,
        [MODE.DEMO]: <StopWatch t={t} x={v1Pos[0] - 20} size={40} y={100} />,
        [MODE.TIMESERIES]: <StopWatch t={t} x={-100} y={330} size={40} />,
    };

    const transformNet = {
        [MODE.DEFAULT]: "scale(0.9) translate(50)",
        [MODE.DEMO]: "scale(0.9) translate(50)",
        [MODE.TIMESERIES]: "scale(0.6) translate(100)",
    };

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
        <div
            style={{
                position: "relative",
                textAlign: "center",
                transform: mode == MODE.DEMO ? "scale(0.7)" : "",
                transformOrigin: mode == MODE.TIMESERIES ? "top left" : "top",
            }}
        >
            <svg width={width} height={height}>
                <g transform={transformNet[mode]}>
                    <DynamicFlowSvgDefs svgIdPrefix={svgIdPrefix} />
                    <FlowEdge
                        {...viewOptions}
                        outflowSteps={outflowSteps[0]}
                        from={sPos}
                        to={v1Pos}
                        capacity={capacity[0]}
                        transitTime={transitTime[0]}
                        queue={flow.queues[0]}
                        t={t}
                    />
                    <FlowEdge
                        {...viewOptions}
                        outflowSteps={outflowSteps[1]}
                        from={v1Pos}
                        to={tPos}
                        capacity={capacity[1]}
                        transitTime={transitTime[1]}
                        queue={flow.queues[1]}
                        t={t}
                    />
                    <FlowEdge
                        {...viewOptions}
                        outflowSteps={outflowSteps[2]}
                        from={sPos}
                        to={v3Pos}
                        capacity={capacity[2]}
                        transitTime={transitTime[2]}
                        queue={flow.queues[2]}
                        t={t}
                    />
                    <FlowEdge
                        {...viewOptions}
                        outflowSteps={outflowSteps[3]}
                        from={v3Pos}
                        to={v4Pos}
                        capacity={capacity[3]}
                        transitTime={transitTime[3]}
                        queue={flow.queues[3]}
                        t={t}
                    />
                    <FlowEdge
                        {...viewOptions}
                        outflowSteps={outflowSteps[4]}
                        from={v4Pos}
                        to={tPos}
                        capacity={capacity[4]}
                        transitTime={transitTime[4]}
                        queue={flow.queues[4]}
                        t={t}
                    />

                    <Vertex pos={sPos} label={<TeX>s</TeX>} />
                    <Vertex pos={v1Pos} label={<TeX>u</TeX>} />
                    <Vertex pos={tPos} label={<TeX>t</TeX>} />
                    <Vertex pos={v3Pos} label={<TeX>v</TeX>} />
                    <Vertex pos={v4Pos} label={<TeX>w</TeX>} />

                    {stopWatch[mode]}
                </g>
                {diagram[mode]}
            </svg>
        </div>
    );
};

const QueueDiagram = ({ x, y, t, width, queue, visible, svgIdPrefix }) => {
    const timeScale = 1 / 5;
    const valueScale = 1 / 50;
    const bartheta = t * timeScale;
    const barthetaPlus2 = (t + 200) * timeScale;
    const padding = 10;
    const height = 300;
    const origin = [0, height];
    let queueD = React.useMemo(() => {
        let path = d.M(...origin);
        for (let i = 1; i < 11; i++) {
            path += d.l(
                (queue.times[i] - queue.times[i - 1]) * timeScale,
                (queue.values[i - 1] - queue.values[i]) * valueScale
            );
        }
        return path;
    }, [queue]);

    const currGrad = queue.gradient(elemRank(queue.times, t));
    const m = (-currGrad * valueScale) / timeScale;
    const curQueue = origin[1] - queue.eval(t) * valueScale;
    const predD =
        d.M(bartheta, curQueue) + d.L(width, curQueue + m * (width - bartheta));
    return (
        <g
            strokeWidth={1.5}
            fill="none"
            transform={`translate(${x} ${y})`}
            opacity={visible ? 1 : 0}
            style={{ transition: "opacity 0.2s" }}
        >
            <line
                stroke="lightgray"
                x1={bartheta}
                y1={padding}
                x2={bartheta}
                y2={height}
            />
            <ForeignObjectLabel cx={bartheta} cy={0}>
                <span
                    style={{
                        fontSize: "0.7em",
                        opacity: t <= 0 ? 0 : 1,
                        transition: "opacity 0.2s",
                    }}
                >
                    {Tex`\bar\theta`}
                </span>
            </ForeignObjectLabel>
            <line
                stroke="lightgray"
                x1={barthetaPlus2}
                y1={padding}
                x2={barthetaPlus2}
                y2={height}
            />
            <ForeignObjectLabel cx={barthetaPlus2} cy={0}>
                <span
                    style={{
                        fontSize: "0.7em",
                        opacity: t <= 0 ? 0 : 1,
                        transition: "opacity 0.2s",
                    }}
                >
                    {Tex`\bar\theta + 1`}
                </span>
            </ForeignObjectLabel>
            <Axes origin={origin} width={width} padding={padding} />
            <line
                stroke="lightgray"
                strokeDasharray={4}
                x1={0}
                x2={width}
                y1={origin[1] - 4000 * valueScale}
                y2={origin[1] - 4000 * valueScale}
            />
            <ForeignObjectLabel
                cx={-10}
                cy={origin[1] - 4000 * valueScale}
            >{Tex`2`}</ForeignObjectLabel>
            <mask id={`${svgIdPrefix}hide-queue-mask`}>
                <rect
                    x={0}
                    y={0}
                    width={bartheta}
                    height={height}
                    fill="white"
                    stroke="none"
                />
            </mask>
            <path
                d={queueD}
                stroke="black"
                mask={`url(#${svgIdPrefix}hide-queue-mask)`}
            />
            <path d={predD} stroke="red" strokeDasharray={4} />

            <rect
                x={width - 110}
                width={110}
                y={15}
                height={60}
                fill="white"
                stroke="lightgray"
                strokeWidth={1}
                rx={5}
                ry={5}
            />
            <line stroke="black" x1={width - 100} x2={width - 80} y1={30} y2={30} />
            <ForeignObjectLabel cx={width - 40} cy={30}>
                <span style={{ fontSize: "0.8em" }}>{Tex`q_{ut}^f`}</span>
            </ForeignObjectLabel>
            <line
                stroke="red"
                strokeDasharray={4}
                x1={width - 100}
                x2={width - 80}
                y1={55}
                y2={55}
            />
            <ForeignObjectLabel cx={width - 40} cy={55} width={200}>
                <span
                    style={{ fontSize: "0.8em" }}
                >{Tex`\hat q_{ut}(\,\boldsymbol\cdot\,;\bar\theta; f)`}</span>
            </ForeignObjectLabel>
        </g>
    );
};
