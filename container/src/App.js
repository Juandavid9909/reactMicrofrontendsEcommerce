import { BrowserRouter, Route, Switch } from "react-router-dom";
import { createGenerateClassName, StylesProvider } from "@material-ui/core/styles";
import React, { lazy, Suspense } from "react";

import Header from "./components/Header";
import Progress from "./components/Progress";

const AuthLazy = lazy(() => import("./components/AuthApp"));
const MarketingLazy = lazy(() => import("./components/MarketingApp"));

const generateClassName = createGenerateClassName({
    productionPrefix: "co"
});

export default () => {
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={ generateClassName }>
                <div>
                    <Header />

                    <Suspense fallback={ <Progress /> }>
                        <Switch>
                            <Route path="/auth" component={ AuthLazy } />

                            <Route path="/" component={ MarketingLazy } />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    );
}