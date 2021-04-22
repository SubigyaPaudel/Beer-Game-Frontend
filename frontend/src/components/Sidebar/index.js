import React from 'react'
import { 
    SidebarContainer, 
    Icon, 
    CloseIcon,
    SidebarWrapper,
    SidebarMenu,
    SidebarLink,
    SideBtnWrap,
    SidebarRoute
} from './SidebarElements'

/**
 * Returns the Sidebar when called
 * @param {bool} isOpen - variable which indicates if the sidebar is to be displayed or not (displayed: when clicking bar icon, hide: when clicking on sidebar container, nav link or close icon)
 * @param {func} toggle - Sets the value of isOpen to True if False and vice versa (Here toggle is used to close the sidebar)
 */
const Sidebar = ({ isOpen, toggle}) => {
    return (
        <SidebarContainer isOpen={isOpen} onClick={toggle}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarMenu>
                    <SidebarLink to = "what" onClick={toggle}>What It Is</SidebarLink>
                    <SidebarLink to = "how" onClick={toggle}>How To Play</SidebarLink>
                    <SidebarLink to = "custom" onClick={toggle}>Customizing Games</SidebarLink>
                    <SidebarLink to = "example" onClick={toggle}>Example Settings</SidebarLink>
                </SidebarMenu>
                <SideBtnWrap>
                    <SidebarRoute to ="/signup">Host A Game</SidebarRoute>
                </SideBtnWrap>
            </SidebarWrapper>
        </SidebarContainer>
    )
}

export default Sidebar
