import React from "react";
import { Avatar, Box, CardHeader, Typography } from "@material-ui/core";

const UserOnline = ({ id, name, lastSeen, avatar }) => {
  return (
    <div>
      <Box textOverflow="ellipsis" key={id} marginX={1}>
        <CardHeader
          style={{ padding: "10px 0" }}
          avatar={
            <Avatar
              src={
                avatar === "" || avatar === null
                  ? ""
                  : `http://13.212.71.204:8000/assets/images/avatar/${avatar}`
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
