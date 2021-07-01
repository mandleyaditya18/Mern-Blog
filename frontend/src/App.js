import { Fragment, useContext } from "react";
import NavBar from "./components/Layout/NavBar";
import { Route, Switch } from 'react-router-dom'; 
import AuthFormLayout from "./components/Auth/AuthFormLayout";
import AuthContext from "./store/auth-context";
import WriteBlog from "./components/Blog/WriteBlog";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Fragment>
      <NavBar />
      <Switch>
        <Route path='/home'>
          <h1>Home Page</h1>
        </Route>
        <Route path='/category' exact>
          <h1>Categories</h1>
        </Route>
        {authCtx.isLoggedIn && (
          <Route path='/write'>
            <WriteBlog />
          </Route>
        )}
        {!authCtx.isLoggedIn && (
          <Route path='/auth'>
            <AuthFormLayout />
          </Route>
        )}
      </Switch>

    </Fragment>
  );
}

export default App;