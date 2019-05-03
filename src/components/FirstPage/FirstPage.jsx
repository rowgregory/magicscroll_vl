import React from 'react';
import '../FirstPage/assets/styles.css';

const FirstPage = props => {

    return (
        <>

            <div className='first-page' id={props.id} onClick={event => props.onClick(event)}></div>

        </>
    )
}
export default FirstPage;

