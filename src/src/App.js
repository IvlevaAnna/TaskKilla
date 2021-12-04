import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"
import './App.css';
import {SignIn} from "./components/SignIn/SignIn";
import { BoardPage } from "./components/BoardPage/BoardPage";
import AddCardForm from './components/AddCardForm/AddCardForm';
import React from "react";

function App(props) {
    const { history } = props.history

    return (
        <div className='App'>
            <Switch>
                <Route history={history} path='/home' component={SignIn} />
                <Route history={history} path='/board'>
                    <React.Fragment>
                        <BoardPage/>
                        <AddCardForm/>
                    </React.Fragment>
                </Route>
                <Redirect from='/' to='/board'/>
            </Switch>
        </div>
    );
}

export default withRouter(App);
