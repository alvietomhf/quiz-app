import React, { useState } from "react";
import {
  Avatar,
  Box,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@material-ui/core";
import { MoreVert } from "@material-ui/icons";

const UserOnline = ({ id, name, email }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <Box textOverflow="ellipsis" key={id} margin={1}>
        <CardHeader
          style={{ padding: "10px 0" }}
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
                height: "auto",
              }}
              src="https://i.imgur.com/iJq78XH.jpg"
              aria-label="recipe"
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
          subheader={
            <Typography
              style={{
                overflow: "hidden",
                wordBreak: "break-all",
              }}
              variant="inherit"
            >
              {email}
            </Typography>
          }
        />
      </Box>
    </div>
  );
};

export default UserOnline;
