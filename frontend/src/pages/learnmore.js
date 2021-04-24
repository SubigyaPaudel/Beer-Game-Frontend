import React from 'react'
import Learnmore from '../components/Learnmore'
import {useEffect} from 'react';

const LearnMore = () =>{

    useEffect(() => {
        document.querySelector('body').style.backgroundColor = 'white';
    }, []);
    
    return(
        <>
                <Learnmore/>
           
        </>
    )
}

export default LearnMore