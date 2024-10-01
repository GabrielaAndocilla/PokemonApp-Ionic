import { IonRouterOutlet, IonSplitPane } from '@ionic/react';
import { FC } from 'react';
import { Redirect, Route, useLocation, withRouter } from 'react-router';
import Menu from './components/Menu';
import { useAuth } from './contexts/authentication';
import { CreatePokemonPage } from './pages/CreatePokemonPage';
import CustomPokemonList from './pages/CustomPokemonList';
import Home from './pages/Home';
import Login from './pages/Login';
import PokemonDetailPage from './pages/PokemonDetailPage';
import PokemonListPage from './pages/PokemonsListPage';
import SignUp from './pages/SignUp';

interface PrivateRouteProps {
  component: React.ComponentType<any>;
  isAuthenticated: boolean;
  [rest: string]: any;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

const AuthRoute: FC<PrivateRouteProps> = ({
  component: Component,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      exact
      render={(props) =>
        isAuthenticated ? <Redirect to="/pokemons" /> : <Component {...props} />
      }
    />
  );
};

export const Routing: FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  const shouldShowMenu = ['/login', '/signUp', '/'].includes(location.pathname);
  return (
    <IonSplitPane contentId="main">
      {!shouldShowMenu && <Menu />}
      <IonRouterOutlet id="main">
        <AuthRoute
          path="/"
          exact
          component={Home}
          isAuthenticated={isAuthenticated}
        />
        <AuthRoute
          path="/login"
          component={Login}
          exact
          isAuthenticated={isAuthenticated}
        />
        <AuthRoute
          path="/signUp"
          component={SignUp}
          exact
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/pokemons"
          component={PokemonListPage}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/pokemon/:name"
          component={PokemonDetailPage}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/pokemon/create"
          component={CreatePokemonPage}
          isAuthenticated={isAuthenticated}
        />
        <PrivateRoute
          path="/pokemon/edit/:id"
          component={CreatePokemonPage}
          isAuthenticated={isAuthenticated}
          exact
        />
        <PrivateRoute
          path="/pokemon/all"
          component={CustomPokemonList}
          isAuthenticated={isAuthenticated}
        />
      </IonRouterOutlet>
    </IonSplitPane>
  );
};

const RoutingWithRouter = withRouter(Routing);
export default RoutingWithRouter;
