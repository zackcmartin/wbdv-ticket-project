import React from 'react'

import Login from './Login'
import Register from './Register'
import Profile from './Profile'
import ProfileView from './ProfileView'
import Users from './Users'

import StubHubController from '../components/StubHubController'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

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
                </div>
            </Router>
        )
    }
}

///:courseId/modules/:moduleId/lessons/:lessonId/topics/:topicId

export default RoutingPage;