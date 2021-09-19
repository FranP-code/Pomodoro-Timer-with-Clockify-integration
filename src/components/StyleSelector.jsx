import React from 'react'
import StyleSelectionChildren from './StyleSelectionChildren'

const StyleSelector = (props) => {
    return (
        <div className={`style-selector ${props.displayHidden ? 'style-selector-hidden': 'style-selector-show'}`} >
            <h2>Select Style</h2>
        
            <div className="style-selection-container">
                <StyleSelectionChildren number={1} title={"Title 1"} times={"Times|Times"}/>
                <StyleSelectionChildren number={2} title={"Title 2"} times={"Times|Times"}/>
                <StyleSelectionChildren number={3} title={"Title 3"} times={"Times|Times"}/>
                <StyleSelectionChildren number={4} title={"Title 4"} times={"Times|Times"}/>
            </div>
        </div>
    )
}

export default StyleSelector
