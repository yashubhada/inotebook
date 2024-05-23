import React from 'react'
import redCross from '../images/red-cross.png'
import greenCheck from '../images/green-check.png'

const Alert = (props) => {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <>
            {props.alert && <div className={`my-alert my-alert-${props.alert.type}`}>
                <img src={props.alert.type === 'success' ? greenCheck : redCross} alt='Icon'/>
                <p>{capitalize(props.alert.msg)}</p>
            </div>}
        </>
    )
}

export default Alert
