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

export const shippingFields = [
  {
    label: "Full Name",
    type: "text",
    id: "fullName",
    name: "fullName",
    placeholder: "Enter full name",
    required: true,
  },
  {
    label: "Address",
    type: "text",
    id: "address",
    name: "address",
    placeholder: "Enter address",
    required: true,
  },
  {
    label: "City",
    type: "text",
    id: "city",
    name: "city",
    placeholder: "Enter city",
    required: true,
  },
  {
    label: "Postal Code",
    type: "text",
    id: "postalCode",
    name: "postalCode",
    placeholder: "Enter postal code",
    required: true,
  },
  {
    label: "Country",
    type: "text",
    id: "country",
    name: "country",
    placeholder: "Enter country",
    required: true,
  },
];

export const paymentFields = [
  {
    htmlFor: "paypal",
    label: "PayPal",
    type: "radio",
    id: "paypal",
    name: "paymentMethod",
    value: "paypal",
    imgSrc: "https://img.icons8.com/fluency/48/000000/paypal.png",
    required: true,
  },
  {
    htmlFor: "stripe",
    label: "Stripe",
    type: "radio",
    id: "stripe",
    name: "paymentMethod",
    value: "stripe",
    imgSrc: "https://img.icons8.com/fluency/48/000000/stripe.png",
    required: true,
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

export const initialShippingData = {
  fullName: "",
  address: "",
  city: "",
  postalCode: "",
  country: "",
};

export const initialPaymentData = {
  paymentMethod: "",
};
