import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("Required field"),
  code: yup.string().required("Required field"),
  capital: yup.string().required("Required field"),
  lat: yup.number().required("Required field"),
  lng: yup.number().required("Required field"),
  area: yup.number().required("Required field"),
  population: yup.number().required("Required field"),
  year: yup.number().required("Required field"),
  img: yup.string().required("Required field"),

  createdOn: yup.date().default(function () {
    return new Date();
  }),
});

export default schema;
