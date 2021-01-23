import React from 'react';

export default function Square(props) {
    return (
        <button className="square" id={props.id} onClick={props.onClick}>
            {props.value}
            {/* <img src="https://upload.wikimedia.org/wikipedia/en/e/e0/WPVG_icon_2016.svg" alt="Test" style={{width: 'inherit'}} /> */}
        </button>
    )
}