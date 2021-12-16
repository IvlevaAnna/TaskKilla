import {
    Route,
    Switch,
    Redirect,
    withRouter
} from "react-router-dom"
import './App.css';
import { SignIn } from "./components/SignIn/SignIn";
import { BoardPage } from "./components/BoardPage/BoardPage";
import { Error } from "./components/Error/Error";
import AddCardForm from './components/AddCardForm/AddCardForm';
import React from "react";
import EditCardForm from "./components/EditCardForm/EditCardForm";

function App(props) {
    const { history } = props.history

    return (
        <div className='App'>
            <Switch>
                <Route history={history} path='/home' component={SignIn} />
                <Route history={history} path='/error' component={Error} />
                <Route history={history} path='/board'>
                    <React.Fragment>
                        <BoardPage />
                        <AddCardForm />
                        <EditCardForm />
                    </React.Fragment>
                </Route>
                <Route path="*">
                    <Error />
                </Route>
                <Redirect from='/' to='/board' />
            </Switch>
        </div>
    );
}

export default withRouter(App);
