import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import style from './AddCardForm.module.css'
import { showCardForm, hideCardForm, showMap, hideMap } from '../../appSlice';
import Map from '../Map/Map';
import { PrioritySelector } from "../PrioritySelector/PrioritySelector";

export function AddCardForm() {
    const dispatch = useDispatch()

    function handleClose(e) {
        dispatch(hideMap())
        dispatch(hideCardForm())
    }

    function disableClose(e) {
        e.stopPropagation();
    }

    const isShown = useSelector((state) => state.app.isCardFormShown)
    const isMapShown = useSelector((state) => state.app.isMapShown)

    return (
        <React.Fragment>
            {isShown &&
                <div className={style.container} onClick={handleClose}>
                    <div className={style.formContainer} onClick={disableClose}>
                        {isMapShown && <Map></Map>}
                        <form className={style.flex}>
                            <div className={style.formLeft}>
                                <PrioritySelector />
                                <div className={style.inputLeft}>Tag for select</div>
                                <input type="date" className={style.inputLeft}></input>
                                <button className={style.inputLeft} onClick={(e) => {
                                    e.preventDefault();
                                    dispatch(showMap())
                                }}>Add location</button>
                                <input type="file" placeholder="Add file" className={style.inputLeft}></input>
                            </div>
                            <div className={style.formRight}>
                                <input className={style.inputLeft} placeholder="Add name"></input>
                                <textarea placeholder="Add desription" className={style.background}></textarea>
                                <button className={[style.addButton, style.background].join(" ")}>Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default AddCardForm;