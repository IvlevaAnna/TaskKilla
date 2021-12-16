import React, { useEffect, useState } from 'react'
import s from './Board.module.css'
import { BoardCard } from "../BoardCard/BoardCard";
import { useSelector, useDispatch } from 'react-redux'
import { showCardForm, setCategory, setTaskList, setDateFilter } from '../../appSlice';
import { API } from "../../API";


export const Board = () => {
    const dispatch = useDispatch()
    let tasks = useSelector((state) => state.app.taskList)
    const dateFilter = useSelector((state) => state.app.dateFilter)

    const selectedCard = useSelector((state) => state.app.selectedCard)


    useEffect(() => {
        API.getJson('http://127.0.0.1:8000/api/main_page/').then(result => dispatch(setTaskList(result)))
    }, [])

    useEffect(() => {
        console.log("new list is", tasks)
    }, [tasks])

    useEffect(() => {
        if (dateFilter === '') {
            API.getJson('http://127.0.0.1:8000/api/main_page/')
                .then(result => dispatch(setTaskList(result)))
        }
        else if (dateFilter !== null) {
            API.getJson('http://127.0.0.1:8000/api/main_page/')
                .then(result => dispatch(setTaskList(result.filter(task => task.deadline < dateFilter))))
        }

    }, [dateFilter])

    function dropHandler(e, newStatus) {
        e.preventDefault();
        API.patchJson(`http://127.0.0.1:8000/api/main_page/${selectedCard.id}/`, { status: newStatus }).then(() =>
            API.getJson('http://127.0.0.1:8000/api/main_page/').then(result => dispatch(setTaskList(result))))
    }

    function dragOverHangdler(e) {
        e.preventDefault();
    }

    const [sortMarker, setSortMarker] = useState(false)

    const sortTaskList = () => {
        console.log(sortMarker)
        if (sortMarker) {
            API.getJson('http://127.0.0.1:8000/api/main_page/')
                .then(result => dispatch(setTaskList(result.sort(compareToMin))))
        }
        else {
            API.getJson('http://127.0.0.1:8000/api/main_page/')
                .then(result => dispatch(setTaskList(result.sort(compareToMax))))
        }
        setSortMarker(!sortMarker)
    }

    const compareToMin = (a, b) => {
        let priorityA = a.priority
        let priorityB = b.priority

        switch (priorityA) {
            case 'high':
                priorityA = 0
                break
            case 'medium':
                priorityA = 1
                break
            case 'low':
                priorityA = 2
                break
            default:
                priorityA = 3
        }

        switch (priorityB) {
            case 'high':
                priorityB = 0
                break
            case 'medium':
                priorityB = 1
                break
            case 'low':
                priorityB = 2
                break
            default:
                priorityB = 3
        }

        if ( priorityA < priorityB) {
            return -1
        }
        if ( priorityA > priorityB) {
            return 1
        }
        return 0
    }

    const compareToMax = (a, b) => {
        let priorityA = a.priority
        let priorityB = b.priority

        switch (priorityA) {
            case 'high':
                priorityA = 3
                break
            case 'medium':
                priorityA = 2
                break
            case 'low':
                priorityA = 1
                break
            default:
                priorityA = 0
        }

        switch (priorityB) {
            case 'high':
                priorityB = 3
                break
            case 'medium':
                priorityB = 2
                break
            case 'low':
                priorityB = 1
                break
            default:
                priorityB = 0
        }

        if ( priorityA < priorityB) {
            return -1
        }
        if ( priorityA > priorityB) {
            return 1
        }
        return 0
    }

    return (
        <div className={s.container}>
            <div className={s.filters}>
                <button type={"button"} className={s.priority}>
                    <div className={s.priority}>
                        <div>Priority</div>
                        <button className={sortMarker ? `${s.btn} ${s.toMax}` : `${s.btn}`} onClick={sortTaskList}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                <rect width="20" height="20" fill="url(#pattern0)" />
                                <defs>
                                    <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                        <use xlinkHref="#image0_563:52" transform="scale(0.0333333)" />
                                    </pattern>
                                    <image id="image0_563:52" width="30" height="30" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAh0lEQVRIie3WPQqAMAyG4RfvYNH738RFFF108Dh1MEJ0aEHrL/mgCDb4GNoh8ME0QP0E7GUdSpbwRww22GCDDTbYYIN/AldAB7hAjZOapANgyzLYjQrXw56TPS+1yZIDg3x4AkoF7/eKlDBsu1qffvcudBSnorvT65JOY/gt6BoH9MRv+vsyA6HTKO6WiZQPAAAAAElFTkSuQmCC" />
                                </defs>
                            </svg>
                        </button>
                    </div>
                </button>
                <div className={s.filter}>
                    <label form='filter'>Date</label>
                    <input type='date' id='filter' className={s.inpt} onChange={(e) => dispatch(setDateFilter(e.target.value))} />
                </div>
            </div>
            <div className={s.columns}>
                <div className={s.column}
                    onDragOver={(e) => dragOverHangdler(e)}
                    onDrop={(e) => dropHandler(e, "ToDo")}
                >
                    <div className={s.status}>To Do</div>
                    {
                        tasks?.map((task) => {
                            if (task.status === 'ToDo') {
                                return <BoardCard task={task} />
                            }
                        })
                    }
                    <button className={s.add} onClick={() => {
                        dispatch(showCardForm());
                        dispatch(setCategory("ToDo"));
                    }}>+ Add new card</button>
                </div>
                <div className={s.column}
                    onDragOver={(e) => dragOverHangdler(e)}
                    onDrop={(e) => dropHandler(e, "InProgress")}
                >
                    <div className={s.status}>In Progress</div>
                    {
                        tasks?.map((task) => {
                            if (task.status === 'InProgress') {
                                return <BoardCard task={task} />
                            }
                        })
                    }
                    <button className={s.add} onClick={() => {
                        dispatch(showCardForm());
                        dispatch(setCategory("InProgress"));
                    }}>+ Add new card</button>
                </div>
                <div className={s.column}
                    onDragOver={(e) => dragOverHangdler(e)}
                    onDrop={(e) => dropHandler(e, "Done")}
                >
                    <div className={s.status}>Done</div>
                    {
                        tasks?.map((task) => {
                            if (task.status === 'Done') {
                                return <BoardCard task={task} />
                            }
                        })
                    }
                    <button className={s.add} onClick={() => {
                        dispatch(showCardForm());
                        dispatch(setCategory("Done"));
                    }}>+ Add new card</button>
                </div>
            </div>
        </div>
    )
}
