import React from "react";
import LaTex from "@matejmazur/react-katex";

export const Tex = (template, ...values) => {
  return <LaTex>{String.raw(template, ...values)}</LaTex>;
};

export const BTex = (template, ...values) => {
  return <LaTex block>{String.raw(template, ...values)}</LaTex>;
};
