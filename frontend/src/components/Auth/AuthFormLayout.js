import { Fragment, useContext } from "react";
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { Route, useHistory } from 'react-router-dom';
import coverImg from '../../assets/jess-bailey-y7GlIdTUOvo-unsplash.jpg';
import logo from '../../assets/logo.png';
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpForm";
import useHttp from "../../hooks/use-http";
import AuthContext from "../../store/auth-context";

const useStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
    },
}));

const AuthFormLayout = props => {
    const history = useHistory();
    const authCtx = useContext(AuthContext);

    const classes = useStyles();
    const { sendRequest: login, responseData: loginResponse} = useHttp();
    const { sendRequest: signup, responseData: signupResponse} = useHttp();

    const loginHandler = async (loginData) => {
        try {
            await login({
                url: 'http://localhost:5000/login',
                method: 'post',
                data: loginData
            })

            const expirationTime = new Date(new Date().getTime() + (+loginResponse.expiresIn * 1000));
            const user = { 
                name: loginResponse.user.name, 
                username: loginResponse.user.username,
                _id: loginResponse.user._id,
                email: loginResponse.user.email 
            }
            authCtx.login(loginResponse.token, expirationTime.toISOString(), user);
            history.replace('/');
            console.log(loginResponse);
        }
        catch (error) {
            history.replace('/auth/login');
            console.log('Login Error: ' + error);
        }
    }

    const signupHandler = async (signupData) => {
        try {
            await signup({
                url: 'http://localhost:5000/register',
                method: 'post',
                data: signupData
            })
            
            console.log(signupResponse);
        }
        catch (error) {
            history.replace('/auth/signup');
            console.log('Signup Error: ' + error);
        }
    }

    return (
        <Fragment>
            <Grid container style={{ minHeight: '93.5vh' }}>
                <Grid item xs={12} sm={6}>
                    <img src={coverImg} className={classes.img} alt='brand' />
                </Grid>
                <Grid container item xs={12} sm={6} alignItems='center' direction='column' justify='space-between' style={{padding: 10}}>
                    <div />
                    <div style={{ display: 'flex', flexDirection: 'column', maxWidth: 400, minWidth: 400 }}>
                        <Grid container justify='center'>
                            <img src={logo} width={150} alt='logo' />
                        </Grid>
                        <Route path='/auth/login' exact>
                            <LoginForm formOnSubmit={loginHandler} />
                        </Route>
                        <Route path='/auth/signup' exact>
                            <SignUpForm formOnSubmit={signupHandler} />
                        </Route>
                    </div>
                    <div />
                </Grid>
            </Grid>
        </Fragment>
    );
};

export default AuthFormLayout;