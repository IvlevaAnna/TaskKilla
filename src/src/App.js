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
import { useDispatch } from "react-redux";
import { setHistory } from "./appSlice";

function App(props) {
    const { history } = props.history
    const dispatch = useDispatch();
    dispatch(setHistory(props.history));
    return (
        <div className='App'>
            <Switch>
                <Route history={history} exact path='/' component={SignIn} />
                <Route history={history} path='/home' component={SignIn} />
                <Route history={history} path='/error' component={Error} />
                <Route history={history} path='/board'>
                    <React.Fragment >
                        <BoardPage history={history} />
                        <AddCardForm />
                        <EditCardForm />
                    </React.Fragment>
                </Route>
                <Route component={Error} />
            </Switch>
        </div>
    );
}

export default withRouter(App);
