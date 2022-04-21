import React, {useState} from 'react'
import Select from 'react-select'
import {useDispatch} from "react-redux";
import { setPriority} from "../../appSlice";

export const PrioritySelector = (props) => {
    const dispatch = useDispatch()

    const customStyles = {
        control: (styles) => ({
            ...styles,
            "&:hover": {
                borderColor: null,
                boxShadow: null
            },
            borderRadius: 0,
            width: 237,
            paddingLeft: 10,
            paddingRight: 5,
            fontSize: 12,
            letterSpacing: 0.1,
            textTransform: 'uppercase',
            color: '#03305D',
            minHeight: 30,
            borderColor: '#DED2D2',
            boxShadow: 'transparent',
            background: 'rgba(222, 210, 210, 0.2)'
        }),
        option: (styles, {isSelected}) => {
            return {
                ...styles,
                "&:hover": {
                    backgroundColor: 'rgba(222, 210, 210, 0.2)',
                },
                backgroundColor: isSelected ? 'white' : 'rgba(222, 210, 210, 0.2)',
                color: 'black',
                width: 200,
                textAlign: 'left'
            }
        },
        singleValue: (styles) => {
            return {
                ...styles,
                color: '#03305D'
            }
        },
        menu: (styles) => ({
            ...styles,
            width: 200,
        }),
        dropdownIndicator: (styles) => ({
            ...styles,
            padding: 4
        }),
    }

    const selectOption = [
        {value: 'high', label: 'high' },
        {value: 'medium', label: 'medium'},
        {value: 'low', label: 'low'}
    ]

    const [selectedValue, setSelectedValue] = useState(props.priority ? props.priority : '');

    dispatch( setPriority(selectedValue))

    const handleChange = e => {
        setSelectedValue(e.value);
    }


    return (
        <div className={'main'}>
            <Select options={selectOption}
                    styles={customStyles}
                    placeholder={'Select...'}
                    onChange={handleChange}
                    value={selectOption.find(obj => obj.value === selectedValue)}
            />
        </div>
    )
}
