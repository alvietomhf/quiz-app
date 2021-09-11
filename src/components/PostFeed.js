import {
  Button,
  CircularProgress,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { createRef, Fragment, useState } from "react";
import apiFeeds from "../actions/feeds/feedsAction";

const PostFeed = ({ setFeeds }) => {
  const [message, setMessage] = useState("");
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
              <TextareaAutosize
                onChange={(e) =>
                  isSubmitting ? "" : setFieldValue("message", e.target.value)
                }
                maxRows={4}
                style={{
                  width: "100%",
                  minHeight: 100,
                  border: `1px solid ${
                    isError ? "red" : "rgba(163, 163, 163, 0.5)"
                  }`,
                  resize: "none",
                  padding: 10,
                  borderRadius: 5,
                  fontFamily: "Nunito",
                  marginBottom: 5,
                }}
                value={values.message}
                aria-label="maximum height"
                placeholder="Apa yang anda pikirkan?"
              />
              <Typography
                style={{ margin: "5px 0" }}
                variant="caption"
                color={isError ? "error" : "primary"}
              >
                {message}
              </Typography>
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
                  {isSubmitting ? <CircularProgress size="24" /> : "Post"}
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
