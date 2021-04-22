import styled from 'styled-components'
import { Link as LinkR} from 'react-router-dom'

export const LearnContainer = styled.div`
    color: #fff;
`
export const Learn = styled.nav`
    background: #000;
    height: 80px;
    display: felx;
    font-size: 1rem;
    top: 0;
    position: sticky;

    @media screen and (max-width: 960px) {
        transition: 0.8s all ease;
    }
`

export const LearnTopContainer = styled.div`
    display: flex;
    height: 80;
    width: 100%;
    padding: 0 24px;
`
export const LearnTopItem = styled.ul`
    color: #fff;
    margin-top: 16px;
    margin-left: 30px;
    font-size: 2rem;
    height: 80px;
`

export const LearnIcon = styled(LinkR)`
    justify-self: flex-start;
    cursor: pointer;
    display: felx;
    text-algin: center;
    margin-left: 32px;
    margin-top: 16px;
    text-decoration: none;
`

export const Title = styled.h1`
    color: #000;
    font-size: 32px;
    margin-left: 10px;
    margin-top: 10px;
`

export const LearnHead = styled.h2`
    color: #00a500;
    font-size: 26px;
    margin-left: 20px;
    margin-top: 10px;
`
export const Learntext = styled.p`
    color: #000;
    font-size: 18px;
    margin-left: 40px;
    margin-top: 2px;
    margin-right: 18px;
`
export const Image = styled.div`
    color: #fff;
    align-items: center;
    margin-left:70px;
    margin-top:2px;
`
export const Margin = styled.div`
    height: 30px;
`
export const ParagraphMargin = styled.div`
    height: 10px;
`
export const ImgwithText = styled.div`
    color: #fff;
    align-items: center;
    margin-left: -600px;
    margin-top: -120px;
`

export const ImgText = styled.p`
    color: #000;
    font-size: 18px;
    margin-left: 600px;
    margin-top: 2px;
    margin-right: 18px;
`