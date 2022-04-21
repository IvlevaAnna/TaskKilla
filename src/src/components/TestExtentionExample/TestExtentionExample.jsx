import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setTaskList } from '../../appSlice';
import { API } from "../../API";


export const TestExtentionExample = () => {
    const dispatch = useDispatch()
    let tasks = useSelector((state) => state.app.taskList)

    useEffect(() => {
        API.getJson('http://cs33699-django-n2mwk.tw1.ru/api/main_page/').then(result => dispatch(setTaskList(result)))
    }, [tasks])

    return (
        <div data-testid="test-component">{
            tasks?.map((task) => {
                return <div key={task.title}>{task.title}</div>
            })
        }</div>
    )
}

export default TestExtentionExample;
