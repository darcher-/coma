import * as React from "react";

export function CheckboxOption({
  width = 24,
  height = 24,
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
      height={height}
      viewBox="0 0 24 24"
      width={width}
      fill={color}
      xmlns="http://www.w3.org/2000/svg">
      {checked ? <path d="M9 9h6v6H9z" /> : null}
      <path d="M19 17V7c0-1.103-.897-2-2-2H7c-1.103 0-2 .897-2 2v10c0 1.103.897 2 2 2h10c1.103 0 2-.897 2-2zM7 7h10l.002 10H7V7z" />
    </svg>
  );
}
