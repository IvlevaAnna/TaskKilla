import {MemoryRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../../store";
import AddCardForm from "./AddCardForm";
import {showCardForm, hideCardForm} from "../../appSlice";
import userEvent from '@testing-library/user-event'
import React from 'react'

jest.mock('../Map/Map', () => () => 'SomeComponent');

describe('Add card from tests', () => {
    it('Open add card form', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddCardForm/>
                </MemoryRouter>
            </Provider>
        )

        store.dispatch(showCardForm())

        expect(screen.getByTestId('addCardForm')).toBeInTheDocument()
    })
    it('Hide add card form', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddCardForm/>
                </MemoryRouter>
            </Provider>
        )
        
        const button = screen.getByTestId('button')
        userEvent.click(button)
        store.dispatch(hideCardForm())

        expect(() => screen.getByTestId('addCardForm')).toThrow('Unable to find an element');
    })

    it('Handle close', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddCardForm/>
                </MemoryRouter>
            </Provider>
        )
        store.dispatch(showCardForm())

        const cardAdd = screen.getByTestId('cardAdding')
        expect(cardAdd).toBeInTheDocument()

        userEvent.click(cardAdd)
        expect(() => screen.getByTestId('addCardForm')).toThrow('Unable to find an element');
    })

    it('Correct description', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddCardForm/>
                </MemoryRouter>
            </Provider>
        )
        store.dispatch(showCardForm())

        const description = screen.getByPlaceholderText('Add desription')
        expect(description).toBeInTheDocument()

        userEvent.type(description, "test")
        expect(description).toHaveDisplayValue("test");
    })

    it('Handle submit', () => {
        jest.spyOn(global, "fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve()
            })
        );
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddCardForm/>
                </MemoryRouter>
            </Provider>
        )
        store.dispatch(showCardForm())

        const addCardForm = screen.getByText('Add')
        expect(addCardForm).toBeInTheDocument()

        userEvent.click(addCardForm)
        expect(() => screen.getByTestId('addCardForm')).toThrow('Unable to find an element');
    })
})
