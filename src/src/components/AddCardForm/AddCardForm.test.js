import {MemoryRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../../store";
import AddCardForm from "./AddCardForm";
import {showCardForm, hideCardForm} from "../../appSlice";
import userEvent from '@testing-library/user-event'

jest.mock('../Map/Map', () => () => 'MapComponent');

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

    it('Correct name', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddCardForm/>
                </MemoryRouter>
            </Provider>
        )
        store.dispatch(showCardForm())

        const name = screen.getByPlaceholderText('Add name')
        expect(name).toBeInTheDocument()

        userEvent.type(name, 'test')
        expect(name).toHaveDisplayValue('test');
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

    it('Open map', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <AddCardForm/>
                </MemoryRouter>
            </Provider>
        )

        store.dispatch(showCardForm())
        const button = screen.getByTestId('button')
        userEvent.click(button)

        expect(screen.getByText(/MapComponent/)).toBeInTheDocument()
    })
})
