import { Button, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { useState, Fragment } from "react";
import Layout from "../../../components/Layout";
import * as Yup from "yup";
import axios from "axios";

const AddQuizPageAlt = () => {
  const initialValues = {
    title: "",
    image: "",
  };

  const validationSchema = Yup.object().shape({
    image: Yup.string().required("Required"),
  });

  // const transformInToFormObject = (data) => {
  //   let formData = new FormData();
  //   for (let key in data) {
  //     if (Array.isArray(data[key])) {
  //       data[key].forEach((obj, index) => {
  //         let keyList = Object.keys(obj);
  //         keyList.forEach((keyItem) => {
  //           let keyName = [key, "[", index, "]", ".", keyItem].join("");
  //           formData.append(keyName, obj[keyItem]);
  //         });
  //       });
  //     } else if (typeof data[key] === "object") {
  //       for (let innerKey in data[key]) {
  //         formData.append(`${key}.${innerKey}`, data[key][innerKey]);
  //       }
  //     } else {
  //       formData.append(key, data[key]);
  //     }
  //   }
  //   return formData;
  // };

  const onSubmit = async (values) => {
    // const data = transformInToFormObject(values);
    const formData = new FormData();
    // formData.append("title", values.title);
    // formData.append("image", values.image);
    for (let value in values) {
      formData.append(value, values[value]);
    }
    // axios.post("http://127.0.0.1:8000/api/storedata", formData, {
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    // });

    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    // console.log(values);
  };

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Field
              as={TextField}
              name="title"
              label="title"
              variant="outlined"
            />
            <div>
              <Button variant="outlined" component="label">
                Tambahkan Gambar
                <input
                  type="file"
                  name="image"
                  hidden
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                />
              </Button>
              {values.image.name}
            </div>
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </Form>
        )}
      </Formik>
    </Fragment>
  );
};

export default Layout(AddQuizPageAlt);
