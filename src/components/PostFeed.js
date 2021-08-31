import { Button, CircularProgress, TextareaAutosize } from "@material-ui/core";
import { Form, Formik } from "formik";
import React, { createRef, Fragment } from "react";
import apiFeeds from "../actions/feeds/feedsAction";

const PostFeed = () => {
  const FormikRef = createRef();
  const initialValues = {
    message: "",
    image: "",
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("message", values.message);
    formData.append("image", values.image);
    const response = await apiFeeds.postFeed(formData);
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
        {({ values, setFieldValue, errors, touched, isSubmitting }) => (
          <Fragment>
            <Form>
              <TextareaAutosize
                onChange={(e) => setFieldValue("message", e.target.value)}
                maxRows={4}
                style={{
                  width: "100%",
                  minHeight: 100,
                  border: "1px solid rgba(163, 163, 163, 0.5)",
                  resize: "none",
                  padding: 10,
                  borderRadius: 5,
                  fontFamily: "Nunito",
                  marginBottom: 10,
                }}
                aria-label="maximum height"
                placeholder="Apa yang anda pikirkan?"
              />
              <div style={{ display: "flex" }}>
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
