import { Redirect, Router, Route, Switch } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core/styles";
import React, { lazy, Suspense, useState, useEffect } from "react";
import { createBrowserHistory } from "history";

import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthLazy = lazy(() => import("./components/AuthApp"));
const DashboardLazy = lazy(() => import("./components/DashboardApp"));
const MarketingLazy = lazy(() => import("./components/MarketingApp"));

const generateClassName = createGenerateClassName({
    productionPrefix: "co"
});

const history = createBrowserHistory();

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    useEffect(() => {
        if(isSignedIn) {
            history.push("/dashboard");
        }
        else {
            history.push("/");
        }
    }, [isSignedIn]);

    return (
        <Router history={ history }>
            <StylesProvider generateClassName={ generateClassName }>
                <div>
                    <Header onSignOut={ () => setIsSignedIn(false) } isSignedIn={ isSignedIn } />

                    <Suspense fallback={ <Progress /> }>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={ () => setIsSignedIn(true) } />
                            </Route>

                            <Route path="/dashboard">
                                { !isSignedIn && <Redirect to="/auth" /> }
                                
                                <DashboardLazy />
                            </Route>

                            <Route path="/" component={ MarketingLazy } />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    );
}