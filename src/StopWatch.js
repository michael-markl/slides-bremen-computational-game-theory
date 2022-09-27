import React from "react";
import { d } from "./pathData";

export const StopWatch = ({ t, y, x, size }) => {
  const cx = x + size / 2;
  const cy = y + size / 2;
  return (
    <>
      <path
        d={d.M(cx, y) + d.v(-5) + d.h(-3) + d.h(6)}
        fill="none"
        stroke="black"
        strokeWidth={size / 20}
      />
      <path
        transform={`rotate(30 ${cx} ${cy})`}
        d={d.M(cx, y) + d.v(-3) + d.h(-2) + d.h(4)}
        fill="none"
        stroke="black"
        strokeWidth={size / 20}
      />
      <circle cx={cx} cy={cy} r={size / 2} stroke="none" fill="white" />
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((degree) => (
        <line
          key={degree}
          transform={`rotate(${degree} ${cx} ${cy})`}
          x1={cx}
          x2={cx}
          y1={y}
          y2={y + size / 10}
          stroke="gray"
        />
      ))}
      <circle cx={cx} cy={cy} r={size / 15} fill="black" />
      <circle cx={cx} cy={cy} r={size / 2} stroke="black" fill="none" />
      <line
        transform={`rotate(${(t / 200) * 360} ${cx} ${cy})`}
        x1={cx}
        x2={cx}
        y1={cy}
        y2={y + size / 6}
        stroke="black"
      />
    </>
  );
};
