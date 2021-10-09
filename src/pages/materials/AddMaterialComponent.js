import { Field, Form, Formik } from "formik";
import React, { Fragment, useRef, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { buildFormData } from "../../components/BuildFormData";
import { CameraAlt } from "@material-ui/icons";
import apiMaterials from "../../actions/materials/materials";

const AddMaterialComponent = ({ open, handleClose }) => {
  const [semester, setSemester] = useState("");
  const initialValues = {
    subject: "",
    competence: "",
    class: "",
    semester: "",
    meet: "",
    description: "",
    image_banner: "",
  };
  // const [errors, setErrors] = useState({});
  const FormikRef = useRef();
  const inputHandler = (event, editor) => {
    FormikRef.current.setFieldValue("description", editor.getData());
  };

  const onChangeSemester = (e) => {
    setSemester(e.target.value);
    FormikRef.current.setFieldValue("semester", e.target.value);
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
    await apiMaterials
      .postMaterials(formData)
      .then((res) => {
        console.log(res.data.status);
        handleClose();
        window.location.reload();
        FormikRef.current.setSubmitting(false);
      })
      .catch((err) => {
        // setErrors(err.response.data);
        console.log(err.response.data);
      });
    FormikRef.current.resetForm();
  };

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={handleClose}
      aria-labelledby="material-add"
    >
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={FormikRef}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <Fragment>
              <DialogTitle id="material-add">Tambah Materi</DialogTitle>
              <DialogContent dividers>
                <Box display="flex" flexDirection="column">
                  <Field
                    as={TextField}
                    variant="outlined"
                    style={{ marginTop: 15 }}
                    label="Mata Pelajaran"
                    name="subject"
                  />
                  <Field
                    as={TextField}
                    style={{ marginTop: 15 }}
                    variant="outlined"
                    label="Kompetensi"
                    name="competence"
                  />
                  <Grid container style={{ margin: "15px 0" }}>
                    <Grid item lg="auto" xs={12} sm="auto">
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="Kelas"
                        type="number"
                        name="class"
                        style={{ width: 130 }}
                      />
                    </Grid>
                    <Grid item lg="auto" xs={12} sm="auto">
                      {/* <Field
                        as={TextField}
                        variant="outlined"
                        label="Semester"
                        name="semester"
                        style={{ width: 130, marginLeft: 15 }}
                      /> */}
                      <FormControl
                        variant="outlined"
                        style={{ width: 130, marginLeft: 15 }}
                      >
                        <InputLabel id="semester-label">Semester</InputLabel>
                        <Select
                          labelId="semester-label"
                          id="semester-simple-select-outlined"
                          value={semester}
                          onChange={onChangeSemester}
                          label="Semester"
                        >
                          <MenuItem value="">
                            <em>None</em>
                          </MenuItem>
                          <MenuItem value={"I"}>I</MenuItem>
                          <MenuItem value={"II"}>II</MenuItem>
                          <MenuItem value={"III"}>III</MenuItem>
                          <MenuItem value={"IV"}>IV</MenuItem>
                          <MenuItem value={"V"}>V</MenuItem>
                          <MenuItem value={"VI"}>VI</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                    <Grid item lg="auto" xs={12}>
                      <Field
                        as={TextField}
                        variant="outlined"
                        label="Pertemuan"
                        type="number"
                        name="meet"
                        style={{ width: 130, marginLeft: 15 }}
                      />
                    </Grid>
                  </Grid>
                  <CKEditor
                    id="inputText"
                    editor={ClassicEditor}
                    onChange={inputHandler}
                  />
                  <div
                    style={{
                      margin: "15px 0",
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
                      Upload Image
                      <input
                        type="file"
                        name="image_banner"
                        hidden
                        accept="image/*"
                        onChange={(event) => {
                          onChangeImage(event, "image_banner");
                        }}
                      />
                    </Button>
                    {values.image_banner ? (
                      <div>
                        {`Image Found`}
                        <Button
                          color="secondary"
                          style={{
                            cursor: "pointer",
                            marginLeft: 5,
                          }}
                          onClick={() => setFieldValue("", "image_banner")}
                        >
                          Remove
                        </Button>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </Box>
              </DialogContent>
              <DialogActions>
                <Button color="primary" type="submit">
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

export default AddMaterialComponent;
