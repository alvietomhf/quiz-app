import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";
import ReactReadMoreReadLess from "react-read-more-read-less";
import { Link } from "react-router-dom";
import moment from "moment";

const UserFeed = ({
  id,
  dateCreated,
  comments,
  name,
  image,
  caption,
  styleAvatar,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const post = {
    id,
    dateCreated,
    comments,
    name,
    image,
    caption,
    styleAvatar,
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
      <CardMedia
        component="img"
        image={`http://127.0.0.1:8000/assets/images/feed/${image}`}
      />
      <CardContent>
        <Box display="flex" flexDirection="column">
          <div>
            {name}{" "}
            <ReactReadMoreReadLess
              charLimit={200}
              readMoreText={"Read more"}
              readLessText={"Read less"}
              readMoreClassName="read-more-less--more"
              readLessClassName="read-more-less--less"
            >
              {caption}
            </ReactReadMoreReadLess>
          </div>
          <p>{comments.length === 0 ? "No Comments" : "Comments Found"}</p>
          <Link
            style={{ textDecoration: "none", cursor: "pointer" }}
            to={{
              pathname: `${id}`,
              state: {
                post,
              },
            }}
          >
            View comments
          </Link>
        </Box>
      </CardContent>
    </Card>
  );
};

export default UserFeed;
