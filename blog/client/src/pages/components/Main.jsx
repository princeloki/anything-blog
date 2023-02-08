import React from 'react';
import Item from './Item'
import {useState} from 'react'

function Main(props){
    // const [items, setItems] = useState([{}])
    return(
        <div className='body-section'>
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
            <Item />
        </div>
    )
}

export default Main