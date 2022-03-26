import React from 'react';
import Header from './Header';
import { MemoryRouter } from 'react-router-dom'
import { screen, render} from '@testing-library/react'; 
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import store from "../../store"

global.localStorage.setItem("loginData", '{"profileObj":{"name":"testUser"}}');

const data = [
    {
      title: "Task1",
      description: "description1"
    },
    {
      title: "Task2",
      description: "description2"
    },
    {
      title: "Task3",
      description: "description3"
    }
];

it('renders header', async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data)
        })
    );
    
    render(<Provider store={store}>
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    </Provider>);

    expect(screen.queryByText(/Task Killa/)).toBeInTheDocument();
});

it('renders header with user', async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data)
        })
    );

    render(<Provider store={store}>
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    </Provider>);

    expect(screen.queryByText(/testUser/)).toBeInTheDocument();
});

it('search by title works', async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data)
        })
    );

    render(<Provider store={store}>
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    </Provider>);

    expect(screen.queryByTestId('search')).toBeInTheDocument();
    userEvent.type(screen.queryByTestId('search'), 'Task1');
    expect(store.getState().app.taskList[0].title).toBe('Task1');
});

it('search by descriptopn works', async () => {
    jest.spyOn(global, "fetch").mockImplementation(() =>
        Promise.resolve({
            json: () => Promise.resolve(data)
        })
    );

    render(<Provider store={store}>
        <MemoryRouter>
            <Header />
        </MemoryRouter>
    </Provider>);

    expect(screen.queryByTestId('search')).toBeInTheDocument();
    userEvent.type(screen.queryByTestId('search'), 'description1');
    expect(store.getState().app.taskList[0].description).toBe('description1');
});
