import React, {Component} from 'react';
import {Route} from 'react-router';
import {Layout} from './components/Layout';

import './custom.css'
import Companies from "./components/Companies";
import Egg from "./components/Egg";

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Companies}/>
                <Route path='/egg' component={Egg}/>
            </Layout>
        );
    }
}
