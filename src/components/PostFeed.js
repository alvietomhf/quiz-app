import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { useRef, Fragment, useState } from "react";
import apiFeeds from "../actions/feeds/feedsAction";
import { CameraAlt } from "@material-ui/icons";

const PostFeed = ({ setFeeds }) => {
  const FormikRef = useRef();
  const [errorEntries, setErrorEntries] = useState([]);
  const initialValues = {
    message: "",
    image: "",
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("image", values.image);
    await apiFeeds
      .postFeed(formData)
      .then(() => {
        apiFeeds.indexFeed().then((res) => {
          setFeeds(res.data.data);
        });
        FormikRef.current.setSubmitting(false);
        FormikRef.current.resetForm();
      })
      .catch((error) => {
        const errors = error.response.data.data;
        setErrorEntries(errors);
      });
  };

  const onChangeImage = (e) => {
    let files = e.target.files || e.dataTransfer.files;
    if (!files.length) return;
    FormikRef.current.setFieldValue("image", files[0]);
  };

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        innerRef={FormikRef}
      >
        {({ values, touched, isSubmitting }) => (
          <Fragment>
            <Form>
              <Field
                as={TextField}
                multiline
                rows={4}
                fullWidth
                style={{ margin: "5px 0" }}
                placeholder="Apa yang anda pikirkan?"
                name="message"
                variant="outlined"
                error={errorEntries.message && touched.message}
              />
              <div style={{ display: "flex", margin: "10px 0" }}>
                <div>
                  <Button
                    startIcon={<CameraAlt />}
                    component="label"
                    color="primary"
                  >
                    Gambar
                    <input type="file" hidden onChange={onChangeImage} />
                  </Button>
                  <Typography
                    variant="caption"
                    style={{ marginLeft: 5 }}
                    gutterBottom
                  >
                    {values.image && "Image Found"}
                  </Typography>
                </div>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={isSubmitting}
                  style={{ padding: "5px 25px", marginLeft: "auto" }}
                >
                  {isSubmitting ? (
                    <CircularProgress size="24" color="primary" />
                  ) : (
                    "Post"
                  )}
                </Button>
              </div>
            </Form>
          </Fragment>
        )}
      </Formik>
    </Fragment>
  );
};

export default PostFeed;
