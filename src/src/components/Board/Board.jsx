import React, {useEffect, useState} from 'react'
import s from './Board.module.css'
import { BoardCard } from "../BoardCard/BoardCard";
import { useSelector, useDispatch } from 'react-redux'
import { showCardForm, setCategory, setTaskList } from '../../appSlice';
import { API } from "../../API";


export const Board = () => {
    const dispatch = useDispatch()
    const tasks = useSelector((state) => state.app.taskList)

    useEffect(() => {
        API.getJson('http://127.0.0.1:8000/api/main_page/').then( result => dispatch(setTaskList(result)))
    }, [])

    useEffect(() => {
        console.log("new list is", tasks)
    }, [tasks])

    return (
        <div className={s.container}>
            <div className={s.filters}>
                <button type={"button"} className={s.priority}>
                    <div className={s.priority}>
                        <div>Priority</div>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="20" height="20" fill="url(#pattern0)"/>
                            <defs>
                                <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                                    <use xlinkHref="#image0_563:52" transform="scale(0.0333333)"/>
                                </pattern>
                                <image id="image0_563:52" width="30" height="30" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAABmJLR0QA/wD/AP+gvaeTAAAAh0lEQVRIie3WPQqAMAyG4RfvYNH738RFFF108Dh1MEJ0aEHrL/mgCDb4GNoh8ME0QP0E7GUdSpbwRww22GCDDTbYYIN/AldAB7hAjZOapANgyzLYjQrXw56TPS+1yZIDg3x4AkoF7/eKlDBsu1qffvcudBSnorvT65JOY/gt6BoH9MRv+vsyA6HTKO6WiZQPAAAAAElFTkSuQmCC"/>
                            </defs>
                        </svg>
                    </div>
                </button>
                <div className={s.filter}>
                    <label form='filter'>Date</label>
                    <input type='date' id='filter' className={s.inpt}/>
                </div>
            </div>
            <div className={s.columns}>
                <div className={s.column}>
                    <div className={s.status}>To Do</div>
                    {
                        tasks?.map((task) => {
                            if(task.status === 'ToDo') {
                                return <BoardCard task={task}/>
                            }
                        })
                    }
                    <button className={s.add} onClick={() => {
                        dispatch(showCardForm());
                        dispatch(setCategory("ToDo"));
                    }}>+ Add new card</button>
                </div>
                <div className={s.column}>
                    <div className={s.status}>In Progress</div>
                    {
                        tasks?.map((task) => {
                            if(task.status === 'InProgress') {
                                return <BoardCard task={task}/>
                            }
                        })
                    }
                    <button className={s.add} onClick={() => {
                        dispatch(showCardForm());
                        dispatch(setCategory("InProgress"));
                    }}>+ Add new card</button>                
                </div>
                <div className={s.column}>
                    <div className={s.status}>Done</div>
                    {
                        tasks?.map((task) => {
                            if(task.status === 'Done') {
                                return <BoardCard task={task}/>
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
