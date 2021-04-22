import React from 'react'
import {FaBars} from 'react-icons/fa'
import Logo from '../../images/beer-box.png'
import {animateScroll as scroll} from 'react-scroll'
import {
    Nav, 
    NavbarContainer, 
    NavLogo, 
    MobileIcon, 
    NavMenu, 
    NavItem, 
    NavLinks,
    NavBtn,
    NavBtnLink
} from './NavbarElements'

/**
 * Returns the Navbar when called
 * @param {func} toggle - Sets the value of isOpen to True if False and vice versa (Here toggle is used to open the sidebar)
 */
const Navbar = ({ toggle }) => {
    /**
     * When called the function will scroll the website to the top 
     * scrollToTop() is a method of animateScroll from 'react-scroll'
     */
    const toggleHome = () => {
        scroll.scrollToTop()
    }

    return (
        <>
            <Nav>
                <NavbarContainer>
                    <NavLogo to='/' onClick={toggleHome}> <img src = {Logo} alt="" width="45px" height="45px"/> </NavLogo>
                    <MobileIcon onClick={toggle}>
                        <FaBars />
                    </MobileIcon>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to="what"
                            smooth={true} 
                            duration={500} 
                            spy={true} 
                            exact='true' 
                            offset={-80}
                            >What It Is</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="how"
                            smooth={true} 
                            duration={500} 
                            spy={true} 
                            exact='true' 
                            offset={-80}
                            > How To Play </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="custom"
                            smooth={true} 
                            duration={500} 
                            spy={true} 
                            exact='true' 
                            offset={-80}
                            > Customizing Games </NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to="example"
                            smooth={true} 
                            duration={500} 
                            spy={true} 
                            exact='true' 
                            offset={-80}
                            >Example Settings</NavLinks>
                        </NavItem>
                    </NavMenu>
                    <NavBtn>
                        <NavBtnLink to="/signup">Host a Game</NavBtnLink>
                    </NavBtn>
                </NavbarContainer>
            </Nav>
        </>
    )
}

export default Navbar
