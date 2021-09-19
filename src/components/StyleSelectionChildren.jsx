import React from 'react'

const StyleSelectionChildren = (props) => {
    return (
        <div className="style-container">
            <span class="checkbox__input">
                <input id={`input-${props.number}`} type="checkbox"></input>
                <span className="checkbox_control"></span>
            </span>
            <label for={`input-${props.number}`}>
                <span className="title">{props.title}</span>
                <span className="times">{props.times}</span>
            </label>
        </div>
    )
}

export default StyleSelectionChildren
