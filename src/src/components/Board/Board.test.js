import React from 'react';
import Board from './Board';
import { queryByTestId, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from "../../store"
import userEvent from '@testing-library/user-event'
import { fireEvent } from "@testing-library/react";

const data = [
    {
      id: "1",
      title: "Task1",
      description: "description1",
      priority: "high",
      deadline: "2020-05-12"
    },
    {
      id: "2",
      title: "Task2",
      description: "description2",
      priority: "medium",
      deadline: "2021-05-12"
    },
    {
      id: "3",
      title: "Task3",
      description: "description3",
      priority: "low",
      deadline: "2022-05-12"
    },
    {
      id: "4",
      title: "Task4",
      description: "description4",
      priority: "high",
      deadline: "2023-05-12"
    },
    {
      id: "5",
      title: "Task5",
      description: "description5",
      priority: "low",
      deadline: "2024-05-12"
    },
    {
      id: "6",
      title: "Task6",
      description: "description6",
      priority: "medium",
      deadline: "2025-05-12"
    },
    {
      id: "8",
      title: "Task8",
      description: "description8",
      deadline: "2020-05-12"
    },
    {
      id: "9",
      title: "Task9",
      description: "description9",
      deadline: "2020-05-12"
    },
]

it('renders Board page', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        })
    );
    console.log("STORE 1", store.getState());
    render(
        <Provider store={store}>
            <MemoryRouter>
                <Board />
            </MemoryRouter>
        </Provider>
    );

    expect(screen.queryByTestId('priority')).toBeInTheDocument();  
    expect(fetch).toHaveBeenCalledTimes(1);
});

it('search to max works', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        })
    );

    render(
        <Provider store={store}>
            <MemoryRouter>
                <Board />
            </MemoryRouter>
        </Provider>
    );
        
    const target = screen.queryByTestId('priority');
    expect(target).toHaveClass('btn');
    userEvent.click(target);
    expect(target).toHaveClass('toMax');
    expect(fetch).toHaveBeenCalledTimes(2);
});

it('search to min works', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        })
    );

    render(
        <Provider store={store}>
            <MemoryRouter>
                <Board />
            </MemoryRouter>
        </Provider>
    );
        
    const target = screen.queryByTestId('priority');
    userEvent.dblClick(target);
    expect(target).toHaveClass('btn');
    expect(fetch).toHaveBeenCalledTimes(3);
});

it('date filter works', () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(data),
        })
    );

    render(
        <Provider store={store}>
            <MemoryRouter>
                <Board />
            </MemoryRouter>
        </Provider>
    );
        
    const date = screen.queryByTestId('date-filter');
    expect(screen.queryByTestId('date-filter')).toBeInTheDocument();
    fireEvent.change(date, { target: { value: '2020-05-31' } });
    fireEvent.change(date, { target: { value: '' } });
    expect(fetch).toHaveBeenCalledTimes(3);
});
