import { Attr, Step, Text } from "./types";

export const _props: Attr = {
  anchor: {
    className: "view-action",
    href: '/demo',
  },
  summary: {
    className: "view-summary",
  },
  title: {
    className: "view-title",
  },
};

export const _copy: Text = {
  anchor: "Go to Demo",
  summary: "A library to enhance activeElement indication for keyboard users.",
  title: "Welcome to Coma!",
};

export const _state: Step = {
  count: 0,
}

