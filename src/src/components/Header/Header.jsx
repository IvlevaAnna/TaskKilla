import React, { useEffect } from 'react'
import s from './Header.module.css'
import user from '../../img/User.png'
import logout from '../../img/logout.png'
import { useSelector, useDispatch } from 'react-redux'
import { useState } from 'react'
import { setIsUserLogin, setTaskList } from '../../appSlice';
import { API } from "../../API";
import { GoogleLogout } from 'react-google-login';
import { useGoogleLogout } from 'react-google-login'


export const Header = (props) => {
    const dispatch = useDispatch()

    const tasks = useSelector((state) => state.app.taskList)

    const userGoogle = useSelector((state) => state.app.googleUser)

    const history = useSelector((state) => state.app.history)

    const [storageGoogle, setStorageGoogle] = useState(JSON.parse(localStorage.getItem('loginData')))

    const responseGoogle = (response) => {
        localStorage.removeItem("loginData");
        localStorage.removeItem("isLogin");
        history.push('/home')
    }

    let [searchWord, setSearchWord] = useState("");

    function filterList(searchItem, searchList) {
        if (searchItem === '') {
            API.getJson('http://127.0.0.1:8000/api/main_page/')
                .then(result => dispatch(setTaskList(result)))
        }
        else if (searchItem) {
            var regexp = new RegExp("^" + searchItem, 'g');
            API.getJson('http://127.0.0.1:8000/api/main_page/').then(result => dispatch(setTaskList(result.filter(
                (item => item.title.search(regexp) >= 0 || item.description.search(regexp) >= 0)
            ))))
        }
    }

    useEffect(() => {
        filterList(searchWord, tasks);
    }, [searchWord])

    return (
        <div className={s.header}>
            <div className={s.container}>
                <div className={s.header_left}>
                    <div className={s.logo}>Task Killa</div>
                    <div className={s.search}>
                        <button type={"button"} className={s.btn}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.6935 17.9925L15.1596 13.4586C16.2511 12.0054 16.8404 10.2367 16.8384 8.4192C16.8384 3.77688 13.0615 0 8.4192 0C3.77688 0 0 3.77688 0 8.4192C0 13.0615 3.77688 16.8384 8.4192 16.8384C10.2367 16.8404 12.0054 16.2511 13.4586 15.1596L17.9925 19.6935C18.222 19.8986 18.5213 20.0081 18.829 19.9995C19.1367 19.9909 19.4295 19.8648 19.6472 19.6472C19.8648 19.4295 19.9909 19.1367 19.9995 18.829C20.0081 18.5213 19.8986 18.222 19.6935 17.9925ZM2.40549 8.4192C2.40549 7.2298 2.75818 6.06711 3.41898 5.07816C4.07977 4.08921 5.01899 3.31842 6.11785 2.86325C7.21671 2.40809 8.42587 2.289 9.59242 2.52104C10.759 2.75308 11.8305 3.32583 12.6715 4.16686C13.5126 5.00789 14.0853 6.07944 14.3174 7.24598C14.5494 8.41253 14.4303 9.62169 13.9751 10.7205C13.52 11.8194 12.7492 12.7586 11.7602 13.4194C10.7713 14.0802 9.6086 14.4329 8.4192 14.4329C6.82485 14.431 5.29635 13.7968 4.16897 12.6694C3.0416 11.5421 2.4074 10.0135 2.40549 8.4192Z" fill="black" />
                            </svg>
                        </button>
                        <input type='text' placeholder='Search task...' className={s.inpt} onChange={(e) => setSearchWord(e.target.value)} />
                    </div>
                </div>
                <div className={s.header_right}>
                    <div className={s.username}>{storageGoogle.profileObj.name}</div>
                    <div className={s.userphoto}>
                        <img src={storageGoogle.profileObj.imageUrl} />
                    </div>
                    <div className={s.btn}>
                        <img src={logout} />
                        <GoogleLogout
                            className={s.btnLogout}
                            clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                            buttonText="Logout"
                            onLogoutSuccess={responseGoogle}
                        >
                        </GoogleLogout>
                    </div>
                </div>
            </div>
        </div >
    )
}
