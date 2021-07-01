import { Fragment, useRef } from "react";
import { TextField, Button, InputAdornment } from '@material-ui/core';
import { Person, Lock, AlternateEmail } from '@material-ui/icons'; 
import { useHistory } from "react-router-dom";

const SignUpForm = props => {
    const nameRef = useRef();
    const emailRef = useRef();
    const userRef = useRef();
    const passRef = useRef();

    const history = useHistory();

    const loginRedirectHandler = () => {
        const path = '/auth/login';
        history.push(path);
    }

    const submitHandler = event => {
        event.preventDefault();

        const name = nameRef.current.value;
        const email = emailRef.current.value;
        const username = userRef.current.value;
        const password = passRef.current.value;

        const data = {name, email, username, password};
        props.formOnSubmit(data);
    }

    return (
        <Fragment>
            <form onSubmit={submitHandler}>
                <TextField 
                    label='Name' 
                    margin='normal'
                    fullWidth={true}
                    inputRef={nameRef} 
                    InputProps={{ startAdornment: (
                        <InputAdornment position='start'>
                            <Person />
                        </InputAdornment>
                    )}} 
                />
                <TextField 
                    label='Email' 
                    margin='normal'
                    fullWidth={true}
                    inputRef={emailRef} 
                    InputProps={{ startAdornment: (
                        <InputAdornment position='start'>
                            <AlternateEmail />
                        </InputAdornment>
                    )}} 
                />
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
                    Signup
                </Button>
            </form>
            <div style={{height: 20}} />
            <Button onClick={loginRedirectHandler}>Already have an account - Login Here</Button>               
        </Fragment>
    );
};

export default SignUpForm;