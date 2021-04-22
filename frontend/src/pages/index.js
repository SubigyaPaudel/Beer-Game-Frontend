import React, {useState} from 'react'
import Configuration from '../components/Configuration'
import Footer from '../components/Footer'
import HeroSection from '../components/HeroSection'
import InfoSection from '../components/InfoSection'
import { homeObjOne, homeObjTwo, homeObjThree } from '../components/InfoSection/Data'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'

/**
 * Returns a main component of the landing page
 */
const Home = () => {
    const [isOpen, setIsOpen] = useState(false)

    /**
    * sets isOpen to True if False and vice versa (Used to toggle sidebar)
    */
    const toggle = () => {
        setIsOpen(!isOpen)
    }

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

export default Home
