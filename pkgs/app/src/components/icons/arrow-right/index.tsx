import * as React from "react";

export function ArrowRight({
  width = 36,
  height = 36,
  color = '#222',
}: {
  width?: number;
  height?: number;
  color?: string;
}): React.ReactElement {
  return (
    <svg
      width={`${width}px`}
      height={`${height}px`}
      version="1.1"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      focusable="false"
      role="img">
      <title>Arrow Right</title>
      <desc>Directional indicator: next, continue, proceed.</desc>
      <g
        fill="none"
        fill-rule="evenodd"
        stroke="none"
        stroke-width="1">
        <g transform="translate(-47, -729)">
          <path
            d="M57.4565,749 C56.0425,749 54.9995,750.104 54.9995,751.5 C54.9995,752.895 56.1735,753.975 57.5875,753.975 L78.2885,753.975 L72.5315,759.684 C71.5315,760.67 71.5315,762.271 72.5315,763.26 C73.5325,764.246 75.1515,764.246 76.1515,763.26 L86.1085,753.428 L86.1775,753.357 C86.6845,752.895 86.9995,752.232 86.9995,751.5 C86.9995,750.766 86.6845,750.104 86.1775,749.643 L86.1085,749.572 L76.1515,739.742 C75.1515,738.754 73.5325,738.754 72.5315,739.742 C71.5315,740.729 71.5315,742.33 72.5315,743.316 L78.1575,749 L57.4565,749 Z"
            fill={color}
          />
          <g transform="translate(47, 9)" />
        </g>
      </g>
    </svg>
  );
}
