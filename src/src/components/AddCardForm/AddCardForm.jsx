import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import style from './AddCardForm.module.css'
import { showCardForm, hideCardForm } from '../../appSlice';
import {PrioritySelector} from "../PrioritySelector/PrioritySelector";

export function AddCardForm() {
    // const [isShown, setIsShown] = useState(true);
    const dispatch = useDispatch()


    function handleClose(e) {
        // setIsShown(false);
        dispatch(hideCardForm())
    }

    function disableClose(e){
        e.stopPropagation();
    }

    const isShown = useSelector((state) => state.app.isCardFormShown)

    return (
        <React.Fragment>
        {isShown &&  <div className={style.container} onClick={handleClose}>
            <div className={style.formContainer} onClick={disableClose}>
                <form className={style.flex}>
                    <div className={style.formLeft}>
                        <PrioritySelector />
                        <input type="date" className={style.inputLeft}></input>
                        <input placeholder="Add location" className={style.inputLeft}></input>
                        <input type="file" placeholder="Add file" className={style.inputLeft}></input>
                    </div>
                    <div className={style.formRight}>
                        <input className={style.inputLeft} placeholder="Add name"></input>
                        <textarea placeholder="Add desription" className={style.background}></textarea>
                        <button className={[style.addButton, style.background].join(" ")}>Add</button>
                    </div>
                </form>
            </div>
        </div>}
        </React.Fragment>
    )
}

export default AddCardForm;
