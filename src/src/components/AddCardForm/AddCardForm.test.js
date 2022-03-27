import {MemoryRouter} from "react-router-dom";
import {render, screen} from "@testing-library/react";
import {Provider} from "react-redux";
import store from "../../store";
import AddCardForm from "./AddCardForm";
import {showCardForm} from "../../appSlice";

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

        expect(screen.getByTestId('addCardForm')).not.toBeInTheDocument()
    })

})
