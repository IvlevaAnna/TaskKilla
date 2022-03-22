import React from 'react';
import BoardPage from './BoardPage';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "../../store"


it('renders board page with login user', () => {
    global.localStorage.setItem("isLogin", true);

    global.localStorage.setItem("loginData", '{"profileObj":{"name":"testUser"}}');

    render(
        <Provider store={store}>
            <MemoryRouter>
                <BoardPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.queryByText('Task Killa')).toBeInTheDocument();
    localStorage.clear();
});

it('do not render without login user', () => {
    global.localStorage.setItem("isLogin", false);

    global.localStorage.setItem("loginData", '{"profileObj":{"name":""}}');

    render(
        <Provider store={store}>
            <MemoryRouter>
                <BoardPage />
            </MemoryRouter>
        </Provider>
    );
    expect(screen.queryByText('Tasк Killa')).not.toBeInTheDocument();
    localStorage.clear();
});

class LocalStorageMock {
    constructor() {
        this.store = {};
    }

    clear() {
        this.store = {};
    }

    getItem(key) {
        return this.store[key] || null;
    }

    setItem(key, value) {
        this.store[key] = String(value);
    }

    removeItem(key) {
        delete this.store[key];
    }
}

global.localStorage = new LocalStorageMock;