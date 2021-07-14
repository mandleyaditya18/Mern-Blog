import { Grid, makeStyles } from "@material-ui/core";
import axios from "axios";
import { useEffect, useState } from "react";

const useStyles = makeStyles((theme) => ({
    img: {
        width: '100%',
        height: '80%',
        marginTop: '10%',
        objectFit: 'contain'
    },
    root: {
        width: '80%',
        margin: 'auto'
    },
    text: {
        display: 'flex',
        justifyContent: 'flex-start'
    },
    grid: {
        marginTop: 10,
        marginBottom: 10,
        maxHeight: 600,
        border: 0,
        borderRadius: 3,
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    }
}));

const Home = props => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getBlogsHandler = async () => {
            try {
                const res = await axios.get('http://localhost:5000/home');
                const data = await res.data;
                setBlogs(data);
            }
            catch (error) {
                console.log('Something went wrong', error);
            }           
        }

        getBlogsHandler();
    }, []);

    const classes = useStyles();

    if (blogs) {
        return (
            <Grid container className={classes.root}>
                {blogs.map((blog) => (
                <Grid container item direction='column' key={blog._id} className={classes.grid}>
                    <Grid container item xs={12} sm={4}>
                        <img src={blog.image} alt={blog.title} className={classes.img} />
                    </Grid>
                    <Grid container item xs={12} sm={8} direction='column' style={{padding: 10}}>
                        <h1 style={{textAlign: 'center'}}>{blog.title}</h1>
                        <h4 style={{textAlign: 'right'}}>~{blog.author}</h4>
                        <p className={classes.text}>{blog.blog}</p>
                    </Grid>
                </Grid>
                ))}
            </Grid>
        )
    }
    else {
        return null;
    }
}

export default Home;