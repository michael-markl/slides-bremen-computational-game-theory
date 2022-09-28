import React from "react";
import { createRoot } from "react-dom/client";
import { Presentation } from "./Presentation";
const root = createRoot(document.getElementById("root"))
root.render(<Presentation />);

if (module.hot)
  module.hot.accept()