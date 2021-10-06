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

const UserOnline = ({ id, name, lastSeen, avatar, goToUserProfile }) => {
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
      <Box textOverflow="ellipsis" key={id} marginX={1}>
        <CardHeader
          style={{ padding: "10px 0" }}
          // action={
          //   <div>
          //     <IconButton
          //       onClick={handleClick}
          //       aria-label="more"
          //       aria-controls="long-menu"
          //       aria-haspopup="true"
          //     >
          //       <MoreVert />
          //     </IconButton>
          //     <Menu
          //       anchorEl={anchorEl}
          //       open={open}
          //       keepMounted
          //       onClose={handleClose}
          //     >
          //       <MenuItem onClick={goToUserProfile}>See Profile</MenuItem>
          //     </Menu>
          //   </div>
          // }
          avatar={
            <Avatar
              src={
                avatar === "" || avatar === null
                  ? ""
                  : `http://192.168.0.9:8000/assets/images/avatar/${avatar}`
              }
              aria-label="recipe"
            />
          }
          title={
            <div
              style={{
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                width: 220,
                overflow: "hidden",
              }}
            >
              <Typography variant="inherit">{name}</Typography>
            </div>
          }
          subheader={
            <Typography variant="inherit" color="textSecondary">
              {lastSeen}
            </Typography>
          }
        />
      </Box>
    </div>
  );
};

export default UserOnline;
