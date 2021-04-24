import React, {useState} from 'react'
import Video from '../../videos/video.mp4'
import {Button} from '../ButtonElements'
import { 
    HeroContainer,
    HeroBg,
    VideoBg,
    HeroContent,
    HeroH1,
    HeroP,
    HeroBtnWrapper,
    ArrowForward,
    ArrowRight
 } from './HeroElements'

/**
 * Returns the Hero Section which is the video background with welcome text
 */
const HeroSection = () => {

    const [hover, setHover] = useState(false)

    /**
     * When called the function will set the value of bool variable hover to not hover
     * This implies that the value of hover is true when it is over the specified element, else it's false
     * It is used for the Start Playing button to show forward arrow when the user hovers over it
     */
    const onHover = () => {
        setHover(!hover)
    }

    return (
        <HeroContainer>
            <HeroBg>
                <VideoBg autoPlay loop muted src={Video} type='video/mp4' />
            </HeroBg>
            <HeroContent>
                <HeroH1> Beer Game </HeroH1>
                <HeroP>
                    Learn how to defeat the bullwhip effect with our supply chain simulation.
                </HeroP>
                <HeroBtnWrapper>
                    <Button 
                    to="signin" 
                    onMouseEnter={onHover} 
                    onMouseLeave={onHover}
                    primary = 'true'
                    dark = 'true'
                    >
                       Sign In {hover ? <ArrowForward /> : <ArrowRight />}
                    </Button>
                </HeroBtnWrapper>
            </HeroContent>
        </HeroContainer>
    )
}

export default HeroSection