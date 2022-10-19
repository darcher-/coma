import { HTMLAttributes } from "react";

export type Props<T extends HTMLElement> = Partial<HTMLAttributes<T>>;

export interface Attr {
  // TODO: lookup why TYPE has no HREF
  anchor: Props<HTMLAnchorElement> & { href: string };
  summary: Props<HTMLParagraphElement>;
  title: Props<HTMLHeadingElement>;
}

export type Text = Record<keyof Attr, string>;

export interface State {
  count: number;
}

export type Step = Record<keyof State, number>;
