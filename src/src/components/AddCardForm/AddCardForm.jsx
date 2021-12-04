import React, { useEffect, useState } from 'react';
import style from './AddCardForm.module.css'

export function AddCardForm() {
    const [isShown, setIsShown] = useState(true);

    function handleClose(e) {
        setIsShown(false);
    }

    function disableClose(e){
        e.stopPropagation();
    }

    return (
        <React.Fragment>
        {isShown &&  <div className={style.container} onClick={handleClose}>
            <div className={style.formContainer} onClick={disableClose}>
                <form className={style.flex}>
                    <div className={style.formLeft}>
                        <div className={style.inputLeft}>Tag for select</div>
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