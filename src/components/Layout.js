import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import BubbleChartIcon from "@material-ui/icons/BubbleChart";
import HomeIcon from "@material-ui/icons/Home";
import IconButton from "@material-ui/core/IconButton";
import { Avatar, Button, Hidden } from "@material-ui/core";
import PropTypes from "prop-types";
import Collapse from "@material-ui/core/Collapse";
import AssignmentIcon from "@material-ui/icons/Assignment";
import AssistantPhotoIcon from "@material-ui/icons/AssistantPhoto";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { logOut } from "../actions/auth/authAction";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import { withRouter } from "react-router-dom";
import {
  Archive,
  BrandingWatermark,
  PeopleAlt,
  VolumeUp,
} from "@material-ui/icons";
import ReactHowler from "react-howler";
import Backsound from "../assets/sound/backsound.mp3";

const Layout = (Component, namePage = "BION") => {
  const Navbar = (props) => {
    console.clear();
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const history = useHistory();
    const [playBacksound, setPlayBacksound] = useState(true);
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const [dropDownTugas, setdropDownTugas] = useState(false);

    const handleDrawerToggle = () => {
      setMobileOpen(!mobileOpen);
    };

    const handleLogOut = () => {
      setAnchorEl(null);
      dispatch(logOut);
    };

    const handleDropDownTugas = () => {
      setdropDownTugas(!dropDownTugas);
    };

    const itemsList = [
      {
        text: "Home",
        icon: <HomeIcon color="primary" />,
        onClick: () => history.push("/"),
      },
      {
        text: "Tujuan",
        icon: <AssistantPhotoIcon color="primary" />,
        onClick: () => history.push("/tujuan"),
      },
      {
        text: "Anggota",
        icon: <PeopleAlt color="primary" />,
        onClick: () => history.push("/users"),
      },
      {
        text: "Materi",
        icon: <Archive color="primary" />,
        onClick: () => history.push("/materi"),
      },
      {
        text: "Petunjuk",
        icon: <HelpOutlineIcon color="primary" />,
        onClick: () => history.push("/petunjuk"),
      },
      {
        text: "Identitas Materi",
        icon: <BrandingWatermark color="primary" />,
        onClick: () => history.push("/identitasmateri"),
      },
      {
        text: "Pengembang",
        icon: <BubbleChartIcon color="primary" />,
        onClick: () => history.push("/pengembang"),
      },
    ];

    const tugasDropDownList = [
      {
        text: "Quiz",
        icon: <FiberManualRecordIcon />,
        onClick: () => history.push("/quiz"),
      },
      {
        text: "Essay",
        icon: <FiberManualRecordIcon />,
        onClick: () => history.push("/essay"),
      },
      auth.data.user.role === "siswa" && {
        text: "Hasil Siswa",
        icon: <FiberManualRecordIcon />,
        onClick: () => history.push("/hasil"),
      },
    ];

    const DrawerList = () => {
      return (
        <>
          <div className={classes.toolbar} />
          <Divider />
          <List>
            {itemsList.map((item) => {
              const { text, icon, onClick } = item;
              return (
                <ListItem button key={text} onClick={onClick}>
                  {icon && <ListItemIcon>{icon}</ListItemIcon>}
                  <ListItemText primary={text} />
                </ListItem>
              );
            })}
          </List>
          <ListItem button onClick={handleDropDownTugas}>
            <ListItemIcon>
              <AssignmentIcon color="primary" />
            </ListItemIcon>
            <ListItemText primary="Tugas" />
            {dropDownTugas ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          <Collapse in={dropDownTugas} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {tugasDropDownList.map((item) => {
                const { text, icon, onClick } = item;
                return (
                  <ListItem button key={text} onClick={onClick}>
                    {icon && <ListItemIcon>{icon}</ListItemIcon>}
                    <ListItemText primary={text} />
                  </ListItem>
                );
              })}
            </List>
          </Collapse>
        </>
      );
    };

    const container =
      window !== undefined ? () => window().document.body : undefined;

    const handleMenu = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <div className={classes.root}>
        <ReactHowler src={Backsound} playing={playBacksound} volume={0.2} />
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar}>
          <div style={{ display: "flex" }}>
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" noWrap>
                {namePage}
              </Typography>
            </Toolbar>
            <Toolbar style={{ marginLeft: "auto" }}>
              {auth.isAuthenticated && auth.data.token && (
                <div>
                  <IconButton
                    className={classes.accountCircle}
                    aria-label="account of current user"
                    aria-controls="menu-appbar"
                    aria-haspopup="true"
                    onClick={handleMenu}
                    color="inherit"
                  >
                    {auth.data.user.avatar === "" ||
                    auth.data.user.avatar == null ? (
                      <AccountCircle />
                    ) : (
                      <Avatar
                        alt="Profile Icon"
                        src={`${window.env.API_URL_ASSETS}/images/avatar/${auth.data.user.avatar}`}
                      />
                    )}
                  </IconButton>
                  <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    anchorOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    keepMounted
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                    open={open}
                    onClose={handleClose}
                  >
                    <MenuItem
                      onClick={() => {
                        setAnchorEl(null);
                        history.push("/profile");
                      }}
                    >
                      Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogOut}>Logout</MenuItem>
                  </Menu>
                </div>
              )}
            </Toolbar>
          </div>
        </AppBar>
        <nav className={classes.drawer} aria-label="mailbox folders">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <DrawerList />
              <Button
                style={{ marginTop: 16 }}
                onClick={() => setPlayBacksound(!playBacksound)}
                color="inherit"
                startIcon={<VolumeUp />}
              >
                {playBacksound ? "Stop" : "Play"} Audio
              </Button>
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <DrawerList
                setPlayBacksound={setPlayBacksound}
                playBacksound={playBacksound}
              />
              <Button
                style={{ marginTop: 16 }}
                onClick={() => setPlayBacksound(!playBacksound)}
                color="inherit"
                startIcon={<VolumeUp />}
              >
                {playBacksound ? "Stop" : "Play"} Audio
              </Button>
            </Drawer>
          </Hidden>
        </nav>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Component {...props} />
        </main>
      </div>
    );
  };

  const drawerWidth = 240;

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
      width: drawerWidth,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

  Navbar.propTypes = {
    window: PropTypes.func,
  };

  return withRouter(Navbar);
};

export default Layout;
