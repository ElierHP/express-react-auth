import * as yup from "yup";

export let schema = yup.object().shape({
  name: yup.string().required(),
  password: yup.string().required().min(6).max(20),
});
