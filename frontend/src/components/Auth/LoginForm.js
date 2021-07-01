import { Fragment, useRef } from "react";
import { TextField, Button, InputAdornment } from '@material-ui/core';
import { Person, Lock } from '@material-ui/icons';
import { useHistory } from "react-router-dom";

const LoginForm = props => {
    const userRef = useRef();
    const passRef = useRef();

    const history = useHistory();

    const registerHandler = () => {
        const path = `/auth/signup`;
        history.push(path);
    }

    const submitHandler = event => {
        event.preventDefault();

        const username = userRef.current.value;
        const password = passRef.current.value;

        const data = { username, password };
        props.formOnSubmit(data);
    }

    return (
        <Fragment>
            <form onSubmit={submitHandler}>
                <TextField 
                    label='Username' 
                    margin='normal'
                    fullWidth={true} 
                    inputRef={userRef}
                    InputProps={{ startAdornment: (
                        <InputAdornment position='start'>
                            <Person />
                        </InputAdornment>
                    )}} 
                />
                <TextField
                    type='password' 
                    label='Password' 
                    margin='normal' 
                    fullWidth={true}
                    inputRef={passRef}
                    InputProps={{ startAdornment: (
                        <InputAdornment position='start'>
                            <Lock />
                        </InputAdornment>
                    )}} 
                />
                <div style={{height: 20}} />
                <Button color='secondary' variant='contained' fullWidth={true} type='submit'>
                    Login
                </Button>
            </form>
            <div style={{height: 20}} />
            <Button onClick={registerHandler}>Register here</Button>               
        </Fragment>
    );
};

export default LoginForm;