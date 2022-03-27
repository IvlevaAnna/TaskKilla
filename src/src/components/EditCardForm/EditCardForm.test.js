import {MemoryRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../../store";
import EditCardForm from "./EditCardForm";
import {showEditForm, hideEditForm} from "../../appSlice";
import userEvent from '@testing-library/user-event'

describe('Edit card from tests', () => {
    it('Open edit card form', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EditCardForm/>
                </MemoryRouter>
            </Provider>
        )

        store.dispatch(showEditForm())

        expect(screen.getByTestId('editCardForm')).toBeInTheDocument()
    })
    it('Hide edit card form', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EditCardForm/>
                </MemoryRouter>
            </Provider>
        )

        store.dispatch(hideEditForm())

        expect(() => screen.getByTestId('editCardForm')).toThrow('Unable to find an element');
    })

    it('Handle close', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EditCardForm/>
                </MemoryRouter>
            </Provider>
        )
        store.dispatch(showEditForm())

        const cardEdit = screen.getByTestId('cardEditing')
        expect(cardEdit).toBeInTheDocument()

        userEvent.click(cardEdit)
        expect(() => screen.getByTestId('editCardForm')).toThrow('Unable to find an element');
    })

    it('Correct description', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EditCardForm/>
                </MemoryRouter>
            </Provider>
        )
        store.dispatch(showEditForm())

        const description = screen.getByPlaceholderText('Add desription')
        expect(description).toBeInTheDocument()

        userEvent.type(description, "test")
        expect(description).toHaveDisplayValue("test");
    })

    it('Handle submit', () => {
        render(
            <Provider store={store}>
                <MemoryRouter>
                    <EditCardForm/>
                </MemoryRouter>
            </Provider>
        )
        store.dispatch(showEditForm())

        const editCardForm = screen.getByText('Edit')
        expect(editCardForm).toBeInTheDocument()

        userEvent.click(editCardForm)
        expect(() => screen.getByTestId('editCardForm')).toThrow('Unable to find an element');
    })
})
