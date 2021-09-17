import {
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import React, { createRef, Fragment, useState } from "react";
import apiFeeds from "../actions/feeds/feedsAction";

const PostFeed = ({ setFeeds, setMessage }) => {
  const [isError, setError] = useState(false);
  const FormikRef = createRef();
  const initialValues = {
    message: "",
    image: "",
  };

  const onSubmit = async (values) => {
    //Post Data Feeds
    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("image", values.image);
    const response = await apiFeeds
      .postFeed(formData)
      .then((res) => {
        // console.log(response.data.data.status);
        FormikRef.current.setSubmitting(false);
        FormikRef.current.resetForm();
        setMessage(res.data.message);
      })
      .catch((error) => {
        setError(true);
        setMessage(error.response.data.message);
        setTimeout(() => {
          setError(false);
          setMessage("");
        }, 2000);
      });

    //Fetch Data Feeds
    const responseFeeds = await apiFeeds.indexFeed();
    const data = responseFeeds.data.data;
    setFeeds(data);
    console.log(response);
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
        {({ values, setFieldValue, isSubmitting }) => (
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
                errors={isError}
                variant="outlined"
              />
              <Typography
                style={{ margin: "5px 0" }}
                variant="caption"
                color={isError ? "error" : "primary"}
              ></Typography>
              <div style={{ display: "flex", margin: "10px 0" }}>
                <div>
                  <Button variant="outlined" component="label">
                    Tambahkan File
                    <input type="file" hidden onChange={onChangeImage} />
                  </Button>
                  {values.image.name}
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
