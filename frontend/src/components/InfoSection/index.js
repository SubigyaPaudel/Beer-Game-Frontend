import React from 'react'
import {Button} from '../ButtonElements';
import {
    InfoContainer,
    InfoWrapper,
    InfoRow,
    Column1,
    Column2,
    TextWrapper,
    TopLine,
    Heading,
    Subtitle,
    BtnWrap,
    ImgWrap,
    Img
} from './InfoElements';

/**
 * This is generic template for Info Sections which returns the info section filled with the passed props
 */
const InfoSection = ({
    lightBg,
    id, 
    imgStart, 
    topLine, 
    lightText,
    headline, 
    darkText, 
    description, 
    buttonLabel, 
    img, 
    alt,
    primary,
    dark,
    direct
    }) => {
    return (
        <>
          <InfoContainer lightBg={lightBg} id={id}>
              <InfoWrapper>
                  <InfoRow imgStart={imgStart}>
                      <Column1>
                        <TextWrapper>
                            <TopLine> {topLine} </TopLine>
                            <Heading lightText={lightText}> {headline} </Heading>
                            <Subtitle darkText={darkText}> {description} </Subtitle>
                            <BtnWrap>
                                <Button to={direct}
                                smooth={true}
                                duration={500}
                                spy={true}
                                exact="true"
                                offset={-80}
                                primary = {primary ? 1 : 0}
                                dark = {dark ? 1 : 0}
                                > {buttonLabel} </Button>
                            </BtnWrap>
                        </TextWrapper>
                      </Column1>
                      <Column2>
                        <ImgWrap>
                            <Img src={img} alt={alt}/>
                        </ImgWrap>
                      </Column2>
                  </InfoRow>
              </InfoWrapper>
          </InfoContainer>  
        </>
    )
}

export default InfoSection
