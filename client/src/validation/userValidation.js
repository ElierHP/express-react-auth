import * as yup from "yup";

export let userSchema = yup.object().shape({
  name: yup.string().required().min(3).max(15),
  password: yup.string().required().min(6).max(20),
});
