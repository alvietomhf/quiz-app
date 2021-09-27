import React, { useRef, useState } from "react";
import { Fragment } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import * as Yup from "yup";
import DatePicker from "../../../components/DatePickers";
import { buildFormData } from "../../../components/BuildFormData";
import apiQuiz from "../../../actions/quiz/quiz";
import moment from "moment";
import { CameraAlt } from "@material-ui/icons";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import axios from "axios";

const AddEssayComponent = ({ open, handleClose }) => {
  const [selectedDate, setSelectedDate] = useState();
  const [editorState, setEditorState] = useState(EditorState.createEmpty());
  const FormikRef = useRef();
  const onEditorStateChange = (editorState) => {
    console.log(editorState);
    setEditorState(editorState);
  };
  const uploadImageCallBack = (file) => {
    return new Promise((resolve, reject) => {
      var data = new FormData();
      data.append("image", file);

      var config = {
        method: "post",
        url: "https://api.imgur.com/3/image",
        headers: {
          Authorization: "Client-ID 7cb8f0c2c3c7cc0",
        },
        data: data,
      };

      axios(config)
        .then((response) => {
          resolve(console.log(JSON.stringify(response.data)));
        })
        .catch((error) => {
          reject(console.log(error));
        });
    });
  };
  const initialValues = {
    title: "",
    deadline: "",
    banner: "",
    comment: "",
    questions: [
      {
        id: "",
        question: "",
        file: "",
      },
    ],
    type: "essay",
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Required"),
    deadline: Yup.date().required("Required"),
  });

  const onChangeDate = (values) => {
    const date = moment(values).format("YYYY-MM-DD HH:mm");
    setSelectedDate(date);
    FormikRef.current.setFieldValue("deadline", date);
    console.log(date);
  };

  const onChangeImage = (e, index) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue(index, files[0]);
  };

  const jsonToFormData = (data) => {
    const formData = new FormData();
    buildFormData(formData, data);
    return formData;
  };

  const onSubmit = async (values) => {
    const formData = jsonToFormData(values);
    for (var pair of formData.entries()) {
      console.log(pair[0] + ", " + pair[1]);
    }
    await apiQuiz.postQuiz(formData);
    FormikRef.current.resetForm();
    handleClose();
    window.location.reload();
    FormikRef.current.setSubmitting(false);
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="essay-add"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={FormikRef}
        validationSchema={validationSchema}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          resetForm,
          setFieldValue,
        }) => (
          <Form>
            <Fragment>
              <DialogTitle id="essay-add">Tambah Esai</DialogTitle>
              <DialogContent dividers>
                <Box>
                  <Field
                    as={TextField}
                    variant="outlined"
                    style={{ display: "none" }}
                    name="id"
                  />
                  <Field
                    as={TextField}
                    variant="outlined"
                    label="title"
                    name="title"
                    error={errors.title && touched.title}
                    helperText={<ErrorMessage name="title" />}
                  />
                  <DatePicker
                    onChangeDate={onChangeDate}
                    selectedDate={selectedDate}
                    name="deadline"
                    label="Deadline"
                    style={{ width: "fit-content" }}
                    error={errors.deadline && touched.deadline}
                    helperText={<ErrorMessage name="deadline" />}
                  />
                  <div
                    style={{
                      marginBottom: 10,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="outlined"
                      component="label"
                      size="large"
                      style={{
                        marginRight: 10,
                      }}
                      startIcon={<CameraAlt />}
                    >
                      Upload Banner
                      <input
                        type="file"
                        name="banner"
                        hidden
                        accept="image/*"
                        onChange={(event) => {
                          onChangeImage(event, "banner");
                        }}
                      />
                    </Button>
                    {values.banner ? (
                      <div>
                        {`Image Found`}
                        <Button
                          color="secondary"
                          style={{
                            cursor: "pointer",
                            marginLeft: 5,
                          }}
                          onClick={() => setFieldValue("", "banner")}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                  <FieldArray name="questions">
                    <Fragment>
                      <Field
                        as={TextField}
                        variant="outlined"
                        style={{ display: "none" }}
                        name="questions[0].id"
                      />
                      {/* <Field
                        as={TextField}
                        variant="outlined"
                        label="Pertanyaan"
                        name="questions[0].question"
                      /> */}
                      <Editor
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          history: { inDropdown: true },
                          image: {
                            uploadCallback: uploadImageCallBack,
                            alt: { present: true, mandatory: true },
                          },
                        }}
                      />
                      {/* <Field
                        as={Editor}
                        editorState={editorState}
                        onEditorStateChange={onEditorStateChange}
                        toolbar={{
                          inline: { inDropdown: true },
                          list: { inDropdown: true },
                          textAlign: { inDropdown: true },
                          link: { inDropdown: true },
                          history: { inDropdown: true },
                          image: {
                            uploadCallback: uploadImageCallBack,
                            alt: { present: true, mandatory: true },
                          },
                        }}
                        name="questions[0].question"
                      /> */}
                    </Fragment>
                  </FieldArray>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={() => resetForm()} color="secondary">
                  Reset
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  autoFocus
                >
                  Tambah
                </Button>
              </DialogActions>
            </Fragment>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddEssayComponent;
