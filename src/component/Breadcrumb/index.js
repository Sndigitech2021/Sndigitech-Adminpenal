import React from 'react'

const index = (props) => {
    const {
        pageTitle,
    } = props;
    return (
        <div className="header">
            <h3>{pageTitle ? pageTitle : 'Default'}</h3>
            <p>
                <span>Home </span>
                <span>/</span>
                <span> {pageTitle ? pageTitle : 'Default'} </span>
            </p>
        </div>
    )
}

export default index;
