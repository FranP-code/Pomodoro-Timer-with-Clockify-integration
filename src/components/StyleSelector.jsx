import React from 'react'
import StyleSelectionChildren from './StyleSelectionChildren'

const StyleSelector = (props) => {
    return (
        <div className={`style-selector ${props.displayHidden ? 'style-selector-hidden': 'style-selector-show'}`} >
            <h2>Select Style</h2>
        
            <div className="style-selection-container">
                <StyleSelectionChildren number={1} title={"Can I play, Daddy?"} times={"10 min. | 5 min. | 15 min."} style={props.style} setStyle={props.setStyle}/>
                <StyleSelectionChildren number={2} title={"Regular"} times={"25 min. | 5 min. | 15 min."} style={props.style} setStyle={props.setStyle}/>
                <StyleSelectionChildren number={3} title={"Creative work"} times={"50 min. | 10 min. | 20 min."} style={props.style} setStyle={props.setStyle}/>
                <StyleSelectionChildren number={4} title={"Last minute delivery"} times={"90 min. | 15 min. | 30 min."} style={props.style} setStyle={props.setStyle}/>
            </div>
        </div>
    )
}

export default StyleSelector
