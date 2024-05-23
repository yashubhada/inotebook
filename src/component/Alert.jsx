import React from 'react'

const Alert = (props) => {
    const capitalize = (word) => {
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <>
            {props.alert && <div className={`my-alert my-alert-${props.alert.type}`}>
                {props.alert.type === 'success' ? <i className="fa-solid fa-circle-check text-success"></i> : <i className="fa-solid fa-circle-xmark text-danger"></i>}
                <p>{capitalize(props.alert.msg)}</p>
            </div>}
        </>
    )
}

export default Alert
