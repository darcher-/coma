import { Attr, Step, Text } from "./types";

export const _props: Attr = {
  email_address: {
    id: "email-address",
    placeholder: "john@doe.co",
  },
  first_name: {
    id: "first-name",
    placeholder: "John",
  },
  keyboard_user: {
    id: "keyboard-user",
  },
  last_name: {
    id: "last-name",
    placeholder: "Doe",
  },
  legend: {
    id: "form-title",
  },
  mouse_user: {
    id: "mouse-user",
  },
  pet_amount: {
    id: "pet-amount",
  },
  pet_type: {
    id: "pet-type",
  },
  phone_number: {
    id: "phone-number",
    placeholder: "1-987-012-3456",
  },
  submit: {
    id: "form-submit",
  },
  user_message: {
    id: "user-message",
  },
};

export const _copy: Partial<Text> = {
  email_address: "Email",
  first_name: "Fist name",
  keyboard_user: "Keyboard",
  last_name: "Last name",
  legend: "User information",
  mouse_user: "Mouse",
  pet_amount: "Multiple pets",
  pet_type: "Type of pet",
  phone_number: "Phone",
  submit: "Save",
};

export const _msg: Partial<Text> = {
  email_address: "Email",
  first_name: "Fist name",
  keyboard_user: "Keyboard",
  last_name: "Last name",
  legend: "User information",
  mouse_user: "Mouse",
  pet_amount: "Multiple pets",
  pet_type: "Type of pet",
  phone_number: "Phone",
  submit: "Save",
};

export const _state: Step = {
  count: 0,
};
