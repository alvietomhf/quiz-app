import React, { createRef, useState } from "react";
import { Fragment } from "react";
import { Button, Paper, TextField } from "@material-ui/core";
import Layout from "../../../components/Layout";
import { Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "../../../components/DatePickers";
import { formatDate } from "../../../components/formatDatePost";

const EssayPage = () => {
  const [selectedDate, setSelectedDate] = useState();
  const FormikRef = createRef();
  const initialValues = {
    title: "",
    deadline: "",
    questions: [
      {
        question: "",
        image: "",
      },
    ],
    type: "essay",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
  });

  const onChangeDate = (values) => {
    setSelectedDate(values);
    const date = formatDate(values);
    FormikRef.current.setFieldValue("deadline", date);
    console.log(date);
  };

  const onSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Fragment>
      <Paper>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          innerRef={FormikRef}
          validationSchema={validationSchema}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                variant="outlined"
                label="title"
                name="title"
              />
              <DatePicker
                onChangeDate={onChangeDate}
                selectedDate={selectedDate}
                name="deadline"
              />
              <FieldArray name="questions">
                <Fragment>
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="Pertanyaan"
                    name="questions[0].question"
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="gambar"
                    name="questions[0].image"
                  />
                </Fragment>
              </FieldArray>
              <Button type="submit" variant="contained" color="primary">
                Add Essay
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Fragment>
  );
};

export default Layout(EssayPage);
