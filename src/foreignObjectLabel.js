import React from "react"

export const ForeignObjectLabel = ({
    cx,
    cy,
    width = 40,
    height = 40,
    children
}) => (
    <foreignObject x={cx - width / 2} y={cy - height / 2} width={width} height={height}>
        <div style={{ width, height, display: 'grid', justifyContent: 'center', alignItems: 'center' }}>{children}</div>
    </foreignObject>
)
