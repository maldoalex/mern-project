import React, {Suspense} from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';

// import Users from './user/pages/Users';
// import NewMoment from './moments/pages/NewMoment';
// import UserMoments from './moments/pages/UserMoments';
// import UpdateMoment from './moments/pages/UpdateMoment';
// import UserAuthenticate from './user/pages/UserAuthenticate';
import MainNavigation from './shared/components/Navigation/MainNavigation';
import { AuthContext } from './shared/context/AuthContext';
import { useAuth } from './shared/hooks/auth-hook';
import LoadingSpinner from './shared/components/UIElements/LoadingSpinner';

const Users = React.lazy(() => import('./user/pages/Users'));
const NewMoment = React.lazy(() => import('./moments/pages/NewMoment'));
const UserMoments = React.lazy(() => import('./moments/pages/UserMoments'));
const UpdateMoment = React.lazy(() => import('./moments/pages/UpdateMoment'));
const UserAuthenticate = React.lazy(() => import('./user/pages/UserAuthenticate'));

const App = () => {
  const {token, login, logout, userId} = useAuth();

  let routes;

  if (token) {
    routes = (
      <Switch>
        <Route path="/" exact>
          <Users />
        </Route>
        <Route path="/:userId/moments" exact>
          <UserMoments />
        </Route>
        <Route path="/moments/new" exact>
          <NewMoment />
        </Route>
        <Route path="/moments/:momentId">
          <UpdateMoment />
        </Route>
        <Redirect to="/" />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route path='/' exact>
          <Users />
        </Route>
        <Route path="/:userId/moments" exact>
          <UserMoments />
        </Route>
        <Route path='/auth' exact>
         <UserAuthenticate />
        </Route>
        <Redirect to='/auth' />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider 
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login, 
        logout: logout
      }}>
      <Router>
        <MainNavigation />
          <main>
            <Suspense
              fallback={
                <div className='center'>
                  <LoadingSpinner />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
