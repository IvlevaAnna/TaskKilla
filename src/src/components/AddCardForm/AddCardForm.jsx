import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import style from './AddCardForm.module.css'
import {showCardForm, hideCardForm, showMap, hideMap, setTaskList} from '../../appSlice';
import Map from '../Map/Map';
import { PrioritySelector } from "../PrioritySelector/PrioritySelector";
import { API} from "../../API";

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
    const category = useSelector((state) => state.app.category)
    const loc = useSelector((state) => state.app.userAddress)
    const priority = useSelector((state) => state.app.priority)

    return (
        <React.Fragment>
            {isShown &&
                <div className={style.container} onClick={handleClose}>
                    <div className={style.formContainer} onClick={disableClose}>
                        {isMapShown && <Map></Map>}
                        <form id="addCardForm"
                            onSubmit={(e) => {
                            e.preventDefault()

                            const formData = new FormData(document.getElementById('addCardForm'))
                            formData.append('status', category)
                            formData.append('location', loc)
                            formData.append('priority', priority)
                            API.postJson('http://127.0.0.1:8000/api/main_page/', formData)
                                .then(() => API.getJson('http://127.0.0.1:8000/api/main_page/').then( result => dispatch(setTaskList(result))))

                            dispatch(hideMap())
                            dispatch(hideCardForm())
                        }}
                            className={style.flex}
                        >
                            <div className={style.formLeft}>
                                <PrioritySelector />
                                <input type="date" className={style.inputLeft} name="deadline"></input>
                                <div className={style.locationInput}>
                                    <div>{loc}</div>
                                    <button className={style.btn} onClick={(e) => {
                                        e.preventDefault();
                                        dispatch(showMap())
                                    }}
                                    >Add</button>
                                </div>
                                <input type="file" placeholder="Add file" className={style.inputLeft} name='image'></input>
                            </div>
                            <div className={style.formRight}>
                                <input className={style.inputLeft} placeholder="Add name" name="title"></input>
                                <textarea placeholder="Add desription" className={style.background} name="description"></textarea>
                                <button
                                    className={[style.addButton, style.background].join(" ")}>
                                    Add</button>
                            </div>
                        </form>
                    </div>
                </div>
            }
        </React.Fragment>
    )
}

export default AddCardForm;