import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import style from './AddCardForm.module.css'
import { showCardForm, hideCardForm, showMap, hideMap, setTaskList, setUserAddress } from '../../appSlice';
import Map from '../Map/Map';
import { PrioritySelector } from "../PrioritySelector/PrioritySelector";
import { API } from "../../API";

export function AddCardForm() {

    const dispatch = useDispatch()

    function handleClose(e) {
        dispatch(hideMap())
        dispatch(hideCardForm())
        dispatch(setUserAddress(''))
    }

    function disableClose(e) {
        e.stopPropagation();
    }

    const isShown = useSelector((state) => state.app.isCardFormShown)
    const isMapShown = useSelector((state) => state.app.isMapShown)
    const category = useSelector((state) => state.app.category)
    const loc = useSelector((state) => state.app.userAddress)
    const priority = useSelector((state) => state.app.priority)

    const getMinDate = () => {
        let minDate = new Date().toISOString().slice(0, 10)
        let day = +minDate.split('-')[2]
        let month = +minDate.split('-')[1]
        let year = +minDate.split('-')[0]

        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
                if (day === 31) {
                    month += 1
                    day = 1
                }
                else {
                    day += 1
                }
                break
            case 4:
            case 6:
            case 9:
            case 11:
                if (day === 30) {
                    month += 1
                    day = 1
                }
                else {
                    day += 1
                }
                break
            case 12:
                if (day === 31) {
                    year += 1
                    month = 1
                    day = 1
                }
                else {
                    day += 1
                }
                break
            case 2:
                if (year % 4 === 0) {
                    if (day === 29) {
                        month += 1
                        day = 1
                    }
                    else {
                        day += 1
                    }
                }
                else {
                    if (day === 28) {
                        month += 1
                        day = 1
                    }
                    else {
                        day += 1
                    }
                }
        }
        return `${year}-${month}-${day}`
    }

    return (
        <React.Fragment>
            {isShown &&
                <div data-testid="cardAdding" className={style.container} onClick={handleClose}>
                    <div className={style.formContainer} onClick={disableClose}>
                        {isMapShown && <Map></Map>}
                        <form id="addCardForm" data-testid="addCardForm"
                            onSubmit={(e) => {
                                e.preventDefault()

                                const formData = new FormData(document.getElementById('addCardForm'))
                                formData.append('status', category)
                                formData.append('location', loc)
                                formData.append('priority', priority)
                                API.postJson('http://127.0.0.1:8000/api/main_page/', formData)
                                    .then(() => API.getJson('http://127.0.0.1:8000/api/main_page/').then(result => dispatch(setTaskList(result))))

                                dispatch(hideMap())
                                dispatch(hideCardForm())
                            }}
                            className={style.flex}
                        >
                            <div className={style.formLeft}>
                                <PrioritySelector />
                                <input data-testid="addCardFormDeadline" type="date" className={style.inputLeft} name="deadline" min={getMinDate()}></input>
                                <div className={style.locationInput}>
                                    <div className={style.userLoc}>{loc}</div>
                                    <button
                                        data-testid="button"
                                        className={style.btn} onClick={(e) => {
                                            e.preventDefault();
                                            dispatch(showMap())
                                        }}
                                    ><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 321 449" fill="none">
                                            <path d="M160.904 0.833008C72.5739 0.833008 0.903931 65.343 0.903931 144.833C0.903931 272.833 160.904 448.833 160.904 448.833C160.904 448.833 320.904 272.833 320.904 144.833C320.904 65.343 249.234 0.833008 160.904 0.833008ZM160.904 224.833C148.246 224.833 135.872 221.079 125.347 214.047C114.823 207.015 106.62 197.019 101.776 185.325C96.9316 173.63 95.6642 160.762 98.1337 148.347C100.603 135.932 106.699 124.529 115.649 115.578C124.6 106.628 136.003 100.532 148.418 98.0627C160.833 95.5933 173.701 96.8607 185.396 101.705C197.09 106.549 207.086 114.752 214.118 125.277C221.15 135.801 224.904 148.175 224.904 160.833C224.885 177.801 218.137 194.069 206.138 206.067C194.14 218.066 177.872 224.814 160.904 224.833Z" fill="black" />
                                        </svg></button>
                                </div>
                                <input type="file" placeholder="Add file" className={style.inputLeft} name='image'></input>
                            </div>
                            <div className={style.formRight}>
                                <input data-test-id="cardname-input" className={style.inputLeft} placeholder="Add name" name="title"></input>
                                <textarea data-test-id="carddiscription-input" placeholder="Add desription" className={style.background} name="description"></textarea>
                                <button
                                    data-test-id="form-submit"
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
