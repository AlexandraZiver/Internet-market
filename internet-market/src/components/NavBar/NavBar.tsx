import React from "react";
import Badge, { BadgeProps } from "@mui/material/Badge";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { styled } from "@mui/material/styles";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { IS_AUTH, IS_REGISTER } from "../../constants";
import { UserStoreInterface } from "../../store/UserStore";

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: -3,
    top: 13,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const NavBar: React.FC<{ user: UserStoreInterface }> = ({ user }: { user: UserStoreInterface }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === IS_AUTH;

  const loginClick = () => {
    const targetPath = isLogin ? IS_REGISTER : IS_AUTH;
    navigate(targetPath);
  };

  const singOut = () => {
    user.setIsAuth(false);
    navigate(IS_AUTH);
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu
          </Typography>
          <Button color="inherit">Store</Button>
          {user.isAuth ? (
            <>
              <Button color="inherit">Profile</Button>
              <Button
                color="inherit"
                onClick={() => {
                  singOut();
                }}>
                Out Sign{" "}
              </Button>
              <IconButton aria-label="cart">
                <StyledBadge badgeContent={0} color="secondary">
                  <ShoppingCartIcon />
                </StyledBadge>
              </IconButton>
            </>
          ) : (
            <Button
              color="inherit"
              onClick={() => {
                loginClick();
              }}>
              {isLogin ? "Sing Up" : "Log in"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
