import React from 'react'
import {
    FooterContainer,
    FooterWrap,
    FooterLinksContainer,
    FooterLinksWrapper,
    FooterLinkItems,
    FooterLinkTitle,
    FooterLink
} from './FooterElements'

/**
 * Returns the Footer when called
 */
const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Footer Col 1</FooterLinkTitle>
                                <FooterLink to="/construction">Row 1</FooterLink>
                                <FooterLink to="/construction">Row 2</FooterLink>
                                <FooterLink to="/construction">Row 3</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                            <FooterLinkTitle>Footer Col 2</FooterLinkTitle>
                                <FooterLink to="/construction">Row 1</FooterLink>
                                <FooterLink to="/construction">Row 2</FooterLink>
                                <FooterLink to="/construction">Row 3</FooterLink>
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
