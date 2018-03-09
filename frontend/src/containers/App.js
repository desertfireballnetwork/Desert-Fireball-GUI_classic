import React, {Component} from 'react';
import {connect} from 'react-redux';
import { Switch, Route, Redirect } from 'react-router'
import classnames from 'classnames';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import MainApp from 'routes/app/'
import Page404 from 'routes/404/'
import Page500 from 'routes/500/'
import PageForgotPassword from 'routes/forgot-password/'
import PageLogin from 'routes/login/'
// = styles =
// 3rd
import 'styles/bootstrap.scss';
// custom
import 'styles/layout.scss';
import 'styles/theme.scss';
import 'styles/ui.scss';
import 'styles/app.scss';

import lightTheme from './themes/lightTheme';
import darkTheme from './themes/darkTheme';
import grayTheme from './themes/grayTheme';


class App extends Component {
    render() {
        const {match, location, layoutBoxed, navCollapsed, navBehind, fixedHeader, sidebarWidth, theme} = this.props;
        let materialUITheme;

        switch (theme) {
            case 'gray':
                materialUITheme = grayTheme;
                break;
            case 'dark':
                materialUITheme = darkTheme;
                break;
            default:
                materialUITheme = lightTheme;
        }

        const isRoot = location.pathname === '/' ? true : false;

        if (isRoot) {
            return (<Redirect to={'/app/dashboard'}/>);
        }

        return (
            <MuiThemeProvider muiTheme={getMuiTheme(materialUITheme)}>
                <div id="app-inner">
                    <div className="preloaderbar hide"><span className="bar"/></div>
                    <div
                        className={classnames('app-main full-height', {
                            'fixed-header': fixedHeader,
                            'nav-collapsed': navCollapsed,
                            'nav-behind': navBehind,
                            'layout-boxed': layoutBoxed,
                            'theme-gray': theme === 'gray',
                            'theme-dark': theme === 'dark',
                            'sidebar-sm': sidebarWidth === 'small',
                            'sidebar-lg': sidebarWidth === 'large'
                        })
                        }>
                        <Switch>
                            <Route path={`${match.url}app`} component={MainApp}/>
                            <Route exact path="/404" component={Page404}/>
                            <Route exact path="/500" component={Page500}/>
                            <Route exact path="/forgot-password" component={PageForgotPassword}/>
                            <Route exact path="/login" component={PageLogin}/>
                        </Switch>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = (state, ownProps) => ({
    layoutBoxed: state.settings.layoutBoxed,
    navCollapsed: state.settings.navCollapsed,
    navBehind: state.settings.navBehind,
    fixedHeader: state.settings.fixedHeader,
    sidebarWidth: state.settings.sidebarWidth,
    theme: state.settings.theme,
});

module.exports = connect(
    mapStateToProps
)(App);
