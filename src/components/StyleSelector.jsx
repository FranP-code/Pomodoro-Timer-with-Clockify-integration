import React from 'react'

const StyleSelector = () => {
    return (
        <div className="style-selector">
            <h2>Select Style</h2>

            <div className="style-container">
                <span class="checkbox__input">
                    <input id="input-1" type="checkbox"></input>
                    <span className="checkbox_control"></span>
                </span>
                <label for="input-1">
                    <span className="title">Title</span>
                    <span className="times">Times|Times</span>
                </label>
            </div>

            <div className="style-container">
                <span class="checkbox__input">
                    <input id="input-2" type="checkbox"></input>
                    <span className="checkbox_control"></span>
                </span>
                <label for="input-2">
                    <span className="title">Title</span>
                    <span className="times">Times|Times</span>
                </label>
            </div>

            <div className="style-container">
                <span class="checkbox__input">
                    <input id="input-3" type="checkbox"></input>
                    <span className="checkbox_control"></span>
                </span>
                <label for="input-3">
                    <span className="title">Title</span>
                    <span className="times">Times|Times</span>
                </label>
            </div>

            <div className="style-container">
                <span class="checkbox__input">
                    <input id="input-4" type="checkbox"></input>
                    <span className="checkbox_control"></span>
                </span>
                <label for="input-4">
                    <span className="title">Title</span>
                    <span className="times">Times|Times</span>
                </label>
            </div>
        </div>
    )
}

export default StyleSelector
