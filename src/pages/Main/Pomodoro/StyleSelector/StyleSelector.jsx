import './style-selector.css'

import React from 'react'

const StyleSelector = (props) => {

    const data = [
        {
            title: "Can I play, Daddy?",
            times: [10, 5, 15]
        },
        {
            title: "Regular",
            times: [25, 5, 15]
        },
        {
            title: "Creative work",
            times: [50, 10, 20]
        },
        {
            title: "Last minute delivery",
            times: [90, 15, 30]
        }
    ]

    return (
        <div className={props.darkMode ? 'style-selector-container dark-mode-component' : 'style-selector-container'}>
            <div className={`style-selector ${props.displayHidden ? 'style-selector-hidden': 'style-selector-show'}`} >
                <h2>Select Style</h2>
            
                <div className="style-selection-container">
                    {
                        data.map((obj, index) => (
                            <div 
                                key={obj.title}
                                className="style-container"
                            >
                                <span class="checkbox__input"
                                    onClick = { (e) => {
                                        props.setStyle(obj)
                                    }}
                                >
                                    <input
                                        id={`input-${index}`}
                                        type="checkbox"
                                        checked={ props.style.title === obj.title ? true : false}
                                    />
                                    <span className="checkbox_control"></span>
                                </span>
                                <label for={`input-${index}`} onClick = { (e) => {
                                        props.setStyle(obj)
                                    }}
>
                                    <span className="title">{obj.title}</span>
                                    <span className="times">
                                        {
                                            obj.times.map((subObj, index) => (
                                                index !== obj.times.length - 1 ?
                                                    `${subObj} min. | `
                                                :
                                                `${subObj} min.`
                                            ))
                                        }
                                    </span>
                                </label>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default StyleSelector
