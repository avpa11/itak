import React from 'react';

export default function Square(props) {
    return (
        <button className="square" id={props.id} onClick={props.onClick}>
            {props.value}
        </button>
    )
}