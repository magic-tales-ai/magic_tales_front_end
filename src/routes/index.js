import React, { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Routes as SwitchRoute, Route } from 'react-router-dom';

// Routes
import { authProtectedRoutes, publicRoutes } from './routes';

// Layouts
import Layout from "../layouts/GeneralLayout/";

// Selectors
import { selectAuth } from '../redux/auth/selectors';

/**
 * Main Route component
 */
const Routes = () => {
    const { user } = useSelector(selectAuth)

    return (
        // rendering the router with layout
            <React.Fragment>
            <Suspense fallback = {<div></div>} >
                <SwitchRoute>
                    {/* public routes */}
                    {!user?.get('id') && publicRoutes.map((route, idx) =>
                        <Route 
                            path={route.path} 
                            layout={Layout} 
                            element={
                                <Layout>
                                    { route.component }
                                </Layout>
                            }
                            key={idx} 
                            isAuthProtected={false} 
                        />
                    )}

                    {/* private/auth protected routes */}
                    {user?.get('id') && authProtectedRoutes.map((route, idx) =>
                        <Route 
                            path={route.path} 
                            layout={Layout} 
                            element={
                                <Layout>
                                    {route.component}
                                </Layout>
                            }
                            key={idx} 
                            isAuthProtected={true}  />
                    )}
                </SwitchRoute>
                </Suspense>
            </React.Fragment>
    );
}

export default Routes;