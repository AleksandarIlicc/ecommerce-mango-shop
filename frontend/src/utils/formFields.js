export const loginFields = [
  {
    label: "Email address",
    type: "email",
    id: "email",
    name: "email",
    placeholder: "Enter email",
    required: true,
  },
  {
    label: "Password",
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Enter password",
    required: true,
  },
];

export const registerFields = [
  {
    label: "Full name",
    type: "text",
    id: "name",
    name: "name",
    placeholder: "Enter name",
  },
  {
    label: "Email address",
    type: "email",
    id: "email",
    name: "email",
    placeholder: "Enter email",
  },
  {
    label: "Password",
    type: "password",
    id: "password",
    name: "password",
    placeholder: "Enter password",
  },
  {
    label: "Confirm password",
    type: "password",
    id: "password2",
    name: "password2",
    placeholder: "Confirm password",
  },
];

export const initialLoginData = {
  email: "",
  password: "",
};

export const initialRegisterData = {
  name: "",
  email: "",
  password: "",
  password2: "",
};
