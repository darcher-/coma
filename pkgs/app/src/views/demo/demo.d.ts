import React, { HTMLAttributes } from "react";

export type Props<T extends HTMLElement> = Partial<HTMLAttributes<T>>;

export interface Attr {
  email_address: Props<HTMLInputElement>;
  first_name: Props<HTMLInputElement>;
  keyboard_user: Props<HTMLInputElement>;
  last_name: Props<HTMLInputElement>;
  legend: Props<HTMLLegendElement>;
  mouse_user: Props<HTMLInputElement>;
  pet_amount: Props<HTMLInputElement>;
  pet_type: Props<HTMLSelectElement>;
  phone_number: Props<HTMLInputElement>;
  submit: Props<HTMLButtonElement>;
  user_message: Props<HTMLDivElement>;
}

export type Text = Record<keyof Attr, string>;

export interface Form {
  form: string | boolean | undefined;
  err: boolean | undefined;
  need: boolean;
  msg: string;
}

export interface Fields {
  fname: Form;
  lname: Form;
  email: Form;
  phone: Form;
  gender: Form;
  over21: Form;
  store: Form;
  remaining: (keyof Fields)[];
  focused: Record<string, string>;
  tracker: React.RefObject<HTMLDivElement> | null;
}

export type Verify = Record<keyof Form, boolean | null>;
export type Msg = Record<keyof Form, string[]>;

export interface State {
  count: number;
}

export type Step = Record<keyof State, number>;
