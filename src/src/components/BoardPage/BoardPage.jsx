import React from 'react'
import { Header } from "../Header/Header";
import { Board } from "../Board/Board";
import { useSelector } from 'react-redux';
import { Error } from '../Error/Error';

export const BoardPage = () => {
    const isLogin = localStorage.getItem('isLogin')
    return (
        <div>{!isLogin ? <Error /> :
            <div>
                <Header />
                <Board />
            </div>}
        </div>
    )
}
