import { AppBar, Toolbar, Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png';
import AuthContext from '../../store/auth-context';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    navlink: {
        textDecoration: 'none',
        color: 'white'
    }
  }));

const NavBar = () => {
    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;

    const logoutHandler = () => {
        authCtx.logout();
    };

    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static" color="secondary" >
                <Toolbar>
                    <img src={logo} width={60} height={60} alt='logo' style={{paddingRight: 10}}/>
                    <Typography variant="h4" className={classes.title}>
                        MERN-Blog
                    </Typography>
                    
                    <Button color="inherit">
                        <NavLink to="/home" className={classes.navlink}>HOME</NavLink>
                    </Button>
                    <Button color="inherit">
                        <NavLink to="/category" className={classes.navlink}>CATEGORIES</NavLink>
                    </Button>
                    {isLoggedIn && (
                        <Button color="inherit">
                            <NavLink to="/write" className={classes.navlink}>WRITE A BLOG</NavLink>
                        </Button>
                    )}
                    {!isLoggedIn && (
                        <Button color="inherit">
                            <NavLink to="/auth/login" className={classes.navlink}>LOGIN</NavLink>
                        </Button>
                    )}
                    {isLoggedIn && (
                        <Button color="inherit" onClick={logoutHandler}>
                            LOGOUT
                        </Button>
                    )}

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavBar;