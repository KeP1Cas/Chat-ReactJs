import React, { useContext } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { Button, Grid } from "@material-ui/core";
import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "../utils/consts";
import { Context } from "..";
import { useAuthState } from "react-firebase-hooks/auth";

const NavBar = () => {
  const {auth} = useContext(Context)
  const [user] = useAuthState(auth);

  return (
    <AppBar color={"secondary"} style={{background: '#ab000d'}} position="fixed">
      <Toolbar variant={'dense'}>
        <Grid container justify={"flex-end"}>
          {user ? (
            <Button onClick={() => auth.signOut()} variant={"outlined"}>Выйти</Button>
          ) : (
            <NavLink to={LOGIN_ROUTE}>
              <Button style={{textDecoration: 'underline #ab000d'}} variant={"outlined"}>Логин</Button>
            </NavLink>
          )}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
