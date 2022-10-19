import * as React from "react";

export function RadioOption({
  width = 18,
  height = 18,
  color = "rgb(0 0 0 / .85)",
  checked = false,
}: {
  width?: number;
  height?: number;
  color?: string;
  checked: boolean;
}): React.ReactElement {
  return (
    <svg
      fill="none"
      viewBox="0 0 20 20"
      height={`${height}px`}
      width={`${width}px`}
      xmlns="http://www.w3.org/2000/svg"
      focusable={false}
      role="img">
      {checked ? (
        <path
          d="M10 15C12.7614 15 15 12.7614 15 10C15 7.23858 12.7614 5 10 5C7.23858 5 5 7.23858 5 10C5 12.7614 7.23858 15 10 15Z"
          fill={color}
          stroke="#fff"
          strokeWidth={checked ? 2 : 0}
        />
      ) : null}
      <path
        d="M10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2ZM3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10Z"
        fill={color}
        stroke={color}
        strokeWidth={1}
      />
    </svg>
  );
}
