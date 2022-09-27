import React from "react";
import { Vertex as OriginalVertex } from "dynamic-flow-visualization";

export const Vertex = ({
    pos,
    width = 40,
    height = 40,
    label,
    visible = true
}) => (
    <>
        <OriginalVertex label="" pos={pos} radius={width / 2} strokeWidth={1} visible={visible} />
        <foreignObject x={pos[0] - width / 2} y={pos[1] - height / 2} width={width} height={height} style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s" }}>
            <div style={{ width, height, display: 'grid', justifyContent: 'center', alignItems: 'center' }}>{label}</div>
        </foreignObject>
    </>
)
