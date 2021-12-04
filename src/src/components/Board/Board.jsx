import React from 'react'
import s from './Board.module.css'

export const Board = () => {
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
                    <div className={s.add}>+ Add new card</div>
                </div>
                <div className={s.column}>
                    <div className={s.status}>In Progress</div>
                    <div className={s.add}>+ Add new card</div>
                </div>
                <div className={s.column}>
                    <div className={s.status}>Done</div>
                    <div className={s.add}>+ Add new card</div>
                </div>
            </div>
        </div>
    )
}