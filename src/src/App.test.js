import React from 'react';
import App from './App';
import { MemoryRouter } from 'react-router-dom'
import { screen, render } from '@testing-library/react';
import { Provider } from 'react-redux'
import store from "./store"


it('renders error page', () => {
    render(<Provider store={store}>
        <MemoryRouter initialEntries={['/123123']}>
            <App />
        </MemoryRouter>
    </Provider>);

    expect(screen.queryByTestId('error-page')).toBeInTheDocument();
});

it('renders board page', () => {
    render(<Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    </Provider>);

    expect(screen.getByText(/Welcome/)).toBeInTheDocument()
});

it('renders board page', () => {
    render(<Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
            <App />
        </MemoryRouter>
    </Provider>);

    expect(screen.queryByTestId('error-page')).not.toBeInTheDocument();
});
