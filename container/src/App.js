import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core/styles";
import React, { lazy, Suspense, useState } from "react";

import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthLazy = lazy(() => import("./components/AuthApp"));
const MarketingLazy = lazy(() => import("./components/MarketingApp"));

const generateClassName = createGenerateClassName({
    productionPrefix: "co"
});

export default () => {
    const [isSignedIn, setIsSignedIn] = useState(false);

    return (
        <BrowserRouter>
            <StylesProvider generateClassName={ generateClassName }>
                <div>
                    <Header onSignOut={ () => setIsSignedIn(false) } isSignedIn={ isSignedIn } />

                    <Suspense fallback={ <Progress /> }>
                        <Switch>
                            <Route path="/auth">
                                <AuthLazy onSignIn={ () => setIsSignedIn(true) } />
                            </Route>

                            <Route path="/" component={ MarketingLazy } />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
}