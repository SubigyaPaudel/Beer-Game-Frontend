import React, {useState} from 'react'
import Configuration from '../components/Configuration'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import {useSelector} from 'react-redux';
import { Redirect } from 'react-router'

/**
 * Returns a main component of the landing page
 */
const Home = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {user} = useSelector(state => state.auth);

    /**
    * sets isOpen to True if False and vice versa (Used to toggle sidebar)
    */
    const toggle = () => {
        setIsOpen(!isOpen)
    }
    if(user !== null){
        switch(user.authenticatedUser.role){
            case '3':
                return <Redirect to = '/player'/>
            case '2':
                return <Redirect to = '/instructor'/>
        }
    }else{
        return (
            <>
                <Sidebar isOpen={isOpen} toggle={toggle}/>
                <Navbar toggle={toggle} />
                <HeroSection/>
                <InfoSection {...homeObjOne}/>
                <InfoSection {...homeObjTwo}/>
                <InfoSection {...homeObjThree}/>
                <Configuration />
                <Footer />
            </>
        )

    }  
}

export default Home
