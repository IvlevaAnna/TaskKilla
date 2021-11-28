import React, { useState } from 'react'
import s from './BoardCard.module.css'

export const BoardCard = () => {
    const [isActive, setActive] = useState(false);

    const toggleClass = () => {
        console.log(isActive)
        setActive(!isActive)
        return isActive
    }

    return (
        <div className={s.card} onClick={toggleClass}>
            <div className={s.cardLeft}>
                <div className={s.highPriority}></div>
                <div className={isActive ?`${s.title} ${s.mb14}` : `${s.title} ${s.mb56}`}>Home business advertising ideas</div>
                <div className={isActive ? s.visible : s.hidden}>
                    <div className={s.text}>
                        Successful businesses know the importance of building and maintaining good working. Successful businesses know the importance of building and maintaining good working. Successful businesses know the importance of building and maintaining good working.
                    </div>
                    <img className={s.image} src="https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"/>
                    <div className={s.location}>Location: 101 Anywhere, Apt 34</div>
                    <div className={s.deadline}>Dead line: 20/11/2021</div>
                </div>
            </div>
            <div className={s.cardRight}>
                <button className={s.btn} type={"button"}>
                    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.37112 7.125L14.6085 2.1495C14.857 1.91378 14.9969 1.59391 14.9972 1.26026C14.9975 0.926607 14.8583 0.606504 14.6101 0.370367C14.362 0.134231 14.0253 0.00140589 13.6741 0.00111123C13.3229 0.000816571 12.9859 0.133077 12.7374 0.368796L7.5 5.3443L2.26263 0.368796C2.01407 0.13266 1.67694 0 1.32542 0C0.973897 0 0.636771 0.13266 0.388207 0.368796C0.139642 0.604932 0 0.925202 0 1.25915C0 1.5931 0.139642 1.91337 0.388207 2.1495L5.62557 7.125L0.388207 12.1005C0.139642 12.3366 0 12.6569 0 12.9909C0 13.3248 0.139642 13.6451 0.388207 13.8812C0.636771 14.1173 0.973897 14.25 1.32542 14.25C1.67694 14.25 2.01407 14.1173 2.26263 13.8812L7.5 8.90571L12.7374 13.8812C12.9859 14.1173 13.3231 14.25 13.6746 14.25C14.0261 14.25 14.3632 14.1173 14.6118 13.8812C14.8604 13.6451 15 13.3248 15 12.9909C15 12.6569 14.8604 12.3366 14.6118 12.1005L9.37112 7.125Z" fill="black" fillOpacity="0.3"/>
                    </svg>
                </button>
                <button className={s.btn} type={"button"}>
                    <svg width="23" height="6" viewBox="0 0 23 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M2.875 6C4.46282 6 5.75 4.65685 5.75 3C5.75 1.34315 4.46282 0 2.875 0C1.28718 0 0 1.34315 0 3C0 4.65685 1.28718 6 2.875 6ZM11.5 6C13.0878 6 14.375 4.65685 14.375 3C14.375 1.34315 13.0878 0 11.5 0C9.91221 0 8.62502 1.34315 8.62502 3C8.62502 4.65685 9.91221 6 11.5 6ZM23 3C23 4.65685 21.7128 6 20.125 6C18.5372 6 17.25 4.65685 17.25 3C17.25 1.34315 18.5372 0 20.125 0C21.7128 0 23 1.34315 23 3Z" fill="#CDCCCA"/>
                    </svg>
                </button>
            </div>
        </div>
    )
}
