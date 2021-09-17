import React, { createRef, useState, Fragment } from "react";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  TextareaAutosize,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link, useHistory } from "react-router-dom";
import moment from "moment";
import apiFeeds from "../actions/feeds/feedsAction";
import { Form, Formik } from "formik";

const UserFeed = ({
  id,
  dateCreated,
  comments,
  name,
  image,
  caption,
  styleAvatar,
  setFeeds,
  userID,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const history = useHistory();
  const post = {
    id,
    dateCreated,
    comments,
    name,
    image,
    caption,
  };
  const [message, setMessage] = useState("");
  const [isError, setError] = useState(false);
  const FormikRef = createRef();
  const initialValues = {
    message: "",
  };

  const onSubmit = async (values) => {
    //Post Data Feeds
    const formData = new FormData();
    formData.append("message", values.message);
    const response = await apiFeeds
      .postFeedComments(formData, id)
      .then((res) => {
        FormikRef.current.setSubmitting(false);
        FormikRef.current.resetForm();
      })
      .catch((error) => {
        setError(true);
        setTimeout(() => {
          setError(false);
        }, 2000);
      });

    //Fetch Data Feeds
    const responseFeeds = await apiFeeds.indexFeed();
    const data = responseFeeds.data.data;
    setFeeds(data);
    console.log(response);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <Card style={{ marginBottom: 20 }}>
      <CardHeader
        style={{ padding: 15 }}
        action={
          <div>
            <IconButton
              onClick={handleClick}
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
            >
              <MoreVert />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              keepMounted
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>See Profile</MenuItem>
            </Menu>
          </div>
        }
        avatar={
          <Avatar
            style={{
              width: 40,
              height: 40,
            }}
            aria-label="recipe"
            className={styleAvatar}
          />
        }
        title={
          <Typography
            style={{
              overflow: "hidden",
              wordBreak: "break-all",
            }}
            variant="body2"
          >
            {name}
            <br />
          </Typography>
        }
        subheader={moment(dateCreated).fromNow()}
      />
      {image !== null ? (
        <CardMedia
          component="img"
          image={`http://192.168.0.8:8000/assets/images/feed/${image}`}
          style={{ maxHeight: 440 }}
        />
      ) : (
        ""
      )}
      <CardContent>
        <Box display="flex" flexDirection="column">
          <ReactReadMoreReadLess
            charLimit={200}
            readMoreText={"Read more"}
            readLessText={"Read less"}
            readMoreClassName="read-more-less--more"
            readLessClassName="read-more-less--less"
          >
            {caption}
          </ReactReadMoreReadLess>
        </Box>
      </CardContent>
      <Formik onSubmit={onSubmit} initialValues={initialValues}>
        {({ values, setFieldValue, isSubmitting }) => (
          <Fragment>
            <Form>
              <div style={{ display: "flex", padding: "0 15px" }}>
                <TextareaAutosize
                  onChange={(e) =>
                    isSubmitting ? "" : setFieldValue("message", e.target.value)
                  }
                  maxRows={4}
                  style={{
                    width: "90%",
                    minHeight: 30,
                    border: "1px solid rgba(163, 163, 163, 0.5)",
                    resize: "none",
                    padding: 10,
                    borderRadius: 5,
                    fontFamily: "Nunito",
                    marginBottom: 5,
                  }}
                  value={values.message}
                  aria-label="maximum height"
                  placeholder="Tulis komentar anda..."
                />
                <Button
                  style={{ margin: "0 5px" }}
                  color="primary"
                  type="submit"
                >
                  Post
                </Button>
              </div>
            </Form>
          </Fragment>
        )}
      </Formik>
      <div style={{ padding: "0 15px 15px 15px" }}>
        {comments.length === 0 ? (
          "No comments yet"
        ) : (
          <div>
            {comments.slice(0, 2).map((comment) => (
              <div
                key={comment.id}
                style={{ display: "flex", alignItems: "center" }}
              >
                <Link
                  to={`users/${comment.user.id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Typography variant="subtitle1" style={{ margin: "0 2px" }}>
                    {comment.user.name}
                  </Typography>
                </Link>
                <Typography
                  variant="subtitle2"
                  color="textSecondary"
                  style={{ margin: "0 2px" }}
                >
                  {comment.message}
                </Typography>
              </div>
            ))}
            {comments.length >= 2 && (
              <Link
                style={{ textDecoration: "none", cursor: "pointer" }}
                to={{
                  pathname: `/posts/${id}`,
                  state: {
                    post,
                  },
                }}
              >
                View comments
              </Link>
            )}
          </div>
        )}
      </div>
    </Card>
  );
};

export default UserFeed;
