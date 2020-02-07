import React, { Suspense } from 'react';

import '../../index.css';

import { BrowserRouter as Router, Route, Switch, RouteComponentProps, NavLink } from 'react-router-dom';
import { ApolloClient } from 'apollo-boost';
import { LoginView } from '../components/user/account/LoginView';
import { RegisterView } from '../components/user/account/RegisterView';
import MeView from '../components/user/account/MeView';
// import FeedPage from './modules/containers/FeedPage';
import PostPage from '../containers/PostPage';
import PostTypePage from '../components/user/Post/PostTypePage';
import PostDetailPage from '../containers/PostDetailPage';
import Spinner from '../components/UI/Spinner/Spinner';

import { ME, LOGIN, REGISTER, FEEDS, TYPE, POST, POSTID, HOME } from './Constants';

const FeedPage = React.lazy(() => import('../containers/FeedPage'));
// const PostDetailPage = React.lazy(() => import('./modules/containers/PostDetailPage'));

type IProps = { client: ApolloClient<any> };

const RoutesWrap: React.FC<IProps> = props => {
    return (
        <Router>
            <div className="header">
                <nav>
                    <h1>Dev's demo</h1>
                    <ul>
                        <li>
                            <NavLink to={REGISTER} className="header-link" activeClassName="header-link-active">
                                Register
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={LOGIN} className="header-link" activeClassName="header-link-active">
                                Login
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={TYPE} className="header-link" activeClassName="header-link-active">
                                New Post
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={FEEDS} className="header-link" activeClassName="header-link-active">
                                Posts
                            </NavLink>
                        </li>
                    </ul>
                </nav>

                <hr />
                <div>
                    <Route component={Routes} client={props.client} />
                </div>
            </div>
        </Router>
    );
};

const Routes: React.FC<RouteComponentProps> = () => {
    return (
        <Suspense fallback={<Spinner />}>
            <Switch>
                <Route exact path={HOME} component={RegisterView} />
                <Route path={LOGIN} component={LoginView} />
                <Route path={REGISTER} component={RegisterView} />
                <Route path={ME} component={MeView} />
                <Route path={FEEDS} component={FeedPage} />
                <Route path={TYPE} component={PostTypePage} />
                <Route exact path={POST} component={PostPage} />
                <Route exact path={POSTID} component={PostDetailPage} />
                {/* <Route path="/posts/:id" render={props => <PostDetailPage client={client} {...props} />} /> */}
            </Switch>
        </Suspense>
    );
};

export default RoutesWrap;
