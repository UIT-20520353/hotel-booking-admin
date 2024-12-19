import React from "react";
import type { SVGProps } from "react";

export const UilChartLine: React.FunctionComponent<SVGProps<SVGSVGElement>> = (
  props
) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M7 16a1.5 1.5 0 0 0 1.5-1.5a1 1 0 0 0 0-.15l2.79-2.79h.46l1.61 1.61v.08a1.5 1.5 0 1 0 3 0v-.08L20 9.5A1.5 1.5 0 1 0 18.5 8a1 1 0 0 0 0 .15l-3.61 3.61h-.16L13 10a1.49 1.49 0 0 0-3 0l-3 3a1.5 1.5 0 0 0 0 3m13.5 4h-17V3a1 1 0 0 0-2 0v18a1 1 0 0 0 1 1h18a1 1 0 0 0 0-2"
    ></path>
  </svg>
);
