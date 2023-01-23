import React from "react";
import { Redirect, Switch, Route, Router } from "react-router-dom";
import RouteGuard from "./RouteGuard"
import { history } from '../helper/History'
import Dashboard from "../pages/dashboard/Dashboard";
import HomePage from "../pages/homepage/HomePage"
import LoginPage from "../pages/login/Login"
import Type from "../pages/type/Type";
import Map from "../pages/map/Map";
import TrackedShip from "../pages/map/TrackedShip";
import User from "../pages/users/Users";
import UserAdd from "../pages/users/UserAdd";
import UserEdit from "../pages/users/UserEdit";
import Ships from "../pages/ships/Ships";
function Routes() {

    return (
        <Router history={history}>
            <Switch>
            <Route
                    path="/login"
                    component={LoginPage}
                />
                <RouteGuard
                    exact
                    path="/homepage"
                    component={HomePage}
                />
                <RouteGuard
                    path="/dashboard"
                    component={Dashboard}
                />
                <RouteGuard
                    path="/type"
                    component={Type}
                />
                <RouteGuard
                    path="/users"
                    component={User}
                />
                <RouteGuard
                    path="/user/add"
                    component={UserAdd}
                />
                <RouteGuard
                    path="/user/edit/:id"
                    component={UserEdit}
                />
                 <RouteGuard
                    path="/ships"
                    component={Ships}
                />
                
                <RouteGuard
                path="/map"
                component={Map}
            /><RouteGuard
            path="/tracked-ships"
            component={TrackedShip}
        />
                <Redirect to="/login" />
            </Switch>
        </Router>
    );
}

export default Routes
