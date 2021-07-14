import { useContext, useRef } from 'react';
import { Grid, TextField, Button, makeStyles } from "@material-ui/core";
import AuthContext from '../../store/auth-context';
import useHttp from '../../hooks/use-http';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    label: {
        marginTop: '1em',
        marginBottom: '0em'
    },
    form: {
        minWidth: '40%'
    }
}));

const WriteBlog = props => {
    const authCtx = useContext(AuthContext);
    const classes = useStyles();
    const history = useHistory();

    const { sendRequest: uploadBlog, responseData: blogResponse} = useHttp();

    const titleRef = useRef();
    const imageRef = useRef();
    const blogRef = useRef();
    const categoryRef = useRef();

    const upload = async (blogData) => {
        try {
            await uploadBlog({
                url: 'http://localhost:5000/write',
                method: 'post',
                data: blogData
            })
            console.log(blogResponse);
            history.push('/home');
        }
        catch (error) {
            console.log('Blog Upload Error: ' + error);
        }
        
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const title = titleRef.current.value;
        const image = imageRef.current.value;
        const blog = blogRef.current.value;
        const category = categoryRef.current.value;
        const author = authCtx.name;
        const blogData = { title, image, blog, category, author };
        upload(blogData);
    }

    return (
        <Grid container>
            <Grid container item alignItems='center' direction='column' style={{padding: 10}}>
                <h1>Write a Blog</h1>
                <div style={{height: 10}} />
                <form onSubmit={submitHandler} className={classes.form}>
                    <h3 className={classes.label}>Title</h3>
                    <TextField 
                        label='Title' 
                        margin='normal'
                        variant='outlined'
                        fullWidth={true} 
                        inputRef={titleRef} 
                    />
                    <h3 className={classes.label}>Image URL</h3>
                    <TextField 
                        label='Image URL' 
                        margin='normal'
                        variant='outlined'
                        fullWidth={true} 
                        inputRef={imageRef} 
                    />
                    <h3 className={classes.label}>Category</h3>
                    <TextField 
                        label='Category' 
                        margin='normal'
                        variant='outlined'
                        fullWidth={true} 
                        inputRef={categoryRef} 
                    />
                    <h3 className={classes.label}>Your Blog</h3>
                    <TextField
                        label='Your Blog'
                        multiline
                        rows={10}
                        rowsMax={10} 
                        margin='normal'
                        variant='outlined'
                        fullWidth={true} 
                        inputRef={blogRef} 
                    />
                    <div style={{height: 20}} />
                    <Button color='secondary' variant='contained' fullWidth={true} type='submit'>
                        Submit
                    </Button>
                </form>
            </Grid>
        </Grid>
    );
}

export default WriteBlog;