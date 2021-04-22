import React from 'react'
import Logo from '../../images/beer-box.png'
import Supplychainpic from '../../images/supply-chain.png'
import Bullwhipeffectpic from '../../images/bullwhip-effect.png'
import  {animateScroll as scroll} from 'react-scroll'
import {
    Learn,
    LearnContainer,
    LearnTopContainer,
    LearnTopItem,
    LearnIcon,
    Title,
    LearnHead,
    Learntext,
    Image,
    Margin,
    ParagraphMargin,
    ImgwithText,
    ImgText
} from '../Learnmore/LearnElements'

/**
 * Returns the Navbar when called
 * @param {func} toggle - Sets the value of isOpen to True if False and vice versa (Here toggle is used to open the sidebar)
 */
const Learnmore = ({toggle}) => {

    const toggleHome = () => {
        scroll.scrollToTop()
    }

    return(
        <>


       
            <LearnContainer>
                <Learn>
                    <LearnTopContainer>
                        <LearnIcon to='/' onClick={toggleHome}> <img src = {Logo} alt="" width="45px" height="45px" /> </LearnIcon>
                        <LearnTopItem>
                            Supply Chain
                        </LearnTopItem>
                    
                    </LearnTopContainer>
                </Learn>
                
                <Title>Beer Distribution Game</Title>
                <Learntext>The Beer Distribution Game will help you to learn how a supply chain partner can highly influence the entire supply chain, what is the bullwhip effect and how to defeat it.
                </Learntext>
                <Image><img src ={Supplychainpic} alt="" width="1000px" height="200px"/></Image>
                <Margin></Margin>

                <LearnHead>What's Supply Chain?</LearnHead>
                <Learntext>
                    Network of different organizations that somehow work together buying and selling products to each other.
                </Learntext>
                <Margin></Margin>

                <LearnHead>How to play The Beer Distribution Game</LearnHead>
                <Learntext>The game is based on supply chain and involves 4 players where each
                    player represents one of the four main companies that built a network in the chain i.e the factory, the distributor, the wholesaler, the retailer.
                    In case, if there's only 3 players in the game, one role will be taken by the computer automatically.</Learntext>
                <ParagraphMargin></ParagraphMargin>
                <Learntext>Every week the retailer receives orders from the consumer without any time delay.
                    The retailer places an order to wholesaler and receives previously ordered beer from the wholesaler as well.
                    The wholesaler does the same with the distributor and the distributor with the factory(manufacturer).
                    There's order delay in upstream and shipment delay in downstream of the supply chain, which means when you order a beer in week 2 you will get it after both the order and shipment dealy. Exceptionally, the manufacturer has some lower delay and there's no delay between the consumer and the retailer.
                </Learntext>
                <ParagraphMargin></ParagraphMargin>
                <Learntext>The objective of the game is to receive orders and deliver the items back
                    to the consumer, in a way the maximizes profits and minimizes the total
                    cumulative cost of all stages based the given information. There is a cost for holding the inventory, a cost for
                    not satisfying demand so called a ”back order” which is basically a cost that
                    is incurred until the demand for the product is satisfied. To sum, one for the number of beers that the company have on stock
                    and the other for the number of beers run out of inventory.</Learntext>
                <Margin></Margin>
                
                <LearnHead>Game Terminology</LearnHead>
                <Learntext>Inventory: The amount of beer you have on stock after receiving the beer you ordered after shipping the current delivery.</Learntext>
                <Learntext>Backlog: Demand you could not fulfill(= "negative" inventory).</Learntext>
                <Learntext>Demand: Amount of beer you have to deliver this week(= amount of beer your successor ordered 2 weeks ago).</Learntext>
                <Learntext>Inc. Shipment: Amount of product you receive this week(= amount of beer you ordered 4 weeks ago).</Learntext>
                <Margin></Margin>

                <LearnHead>Bullwhip Effect</LearnHead>
                <Margin></Margin>
                <ImgText>
                    Concept for explaining inventory fluctuaction or inefficient asset allocation as a result of demand changes as you move further up the supply chain.
                    The bullwhip effect ultimately causes the upstream manufacturers to have increased uncertainty which results in lower forecast accuracies leading to higher inventories.
                    <ImgwithText><img src ={Bullwhipeffectpic} alt="" width="600px" height="140px"></img>
                </ImgwithText>
                </ImgText>
                <Learntext> As you can see from the image, end customers have whip handles and move in a way that increases supply chain by making some movement in demand.
                    The bullwhip effect causes the companies to lose money due to the excess inventory and lost sales opportunities. 
                    As you playing the beer distribution game, you will experience somthing very similar to this!
                </Learntext>
                <Margin></Margin>
                
            </LearnContainer>
        
        </>
    )
}

export default Learnmore