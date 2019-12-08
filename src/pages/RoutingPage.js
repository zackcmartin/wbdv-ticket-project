import React from 'react'

import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import ProfileView from './ProfileView'
import Users from './Users'

import StubHubController from '../components/StubHubController'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'
import TicketPage from "./TicketPage";
import Search from "./Search";
import Details from "./Details"

class RoutingPage extends React.Component {
    render() {
        return( 
            <Router>
                <div>
                    <Route
                        exact
                        path="/"
                        component={Login}/>

                    <Route
                        exact
                        path="/register"
                        component={Register}/>

                    <Route
                        exact
                        path="/profile"
                        component={Profile}/>
                    <Route
                        path="/profile/:username"
                        component={ProfileView}/>
                    <Route
                        path="/users"
                        component={Users}/>

                        <Route path="/ticket"
                        component={TicketPage}/>
                        <Route path={"/search"}
                               component={Search} />
                               <Route path="/details"
                                      component={Details} />

                </div>
            </Router>
        )
    }
}

///:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId

export default RoutingPage;
