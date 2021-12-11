import React from 'react'
import { Header } from "../Header/Header";
import { Board } from "../Board/Board";
import AddCardForm from "../AddCardForm/AddCardForm";

export const BoardPage = () => {
    return (
        <div>
            <Header />
            <Board />
        </div>
    )
}
