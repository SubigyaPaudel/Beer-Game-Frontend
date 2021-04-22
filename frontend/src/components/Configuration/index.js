import React from 'react';
import Icon1 from '../../images/svg-4.svg'
import Icon2 from '../../images/svg-5.svg'
import Icon3 from '../../images/svg-6.svg'
import {
    ConfigurationContainer,
    ConfigurationH1,
    ConfigurationWrapper,
    ConfigurationCard,
    ConfigurationIcon,
    ConfigurationH2,
    ConfigurationP
} from './ConfigurationElements'

/**
 * Returns the Configuration Cards when called (Example Settings)
 */
const Configuration = () => {
    return (
        <ConfigurationContainer id="example">
            <ConfigurationH1> Example Settings </ConfigurationH1>
            <ConfigurationWrapper>
                <ConfigurationCard>
                    <ConfigurationIcon src={Icon1}/>
                    <ConfigurationH2>Change delay time</ConfigurationH2>
                    <ConfigurationP>Set the delay time between supply-chain partners.</ConfigurationP>
                </ConfigurationCard>
                <ConfigurationCard>
                    <ConfigurationIcon src={Icon2}/>
                    <ConfigurationH2>Modify playtime</ConfigurationH2>
                    <ConfigurationP>Change the total number of weeks to be played.</ConfigurationP>
                </ConfigurationCard>
                <ConfigurationCard>
                    <ConfigurationIcon src={Icon3}/>
                    <ConfigurationH2>Custom Demand Pattern</ConfigurationH2>
                    <ConfigurationP>Set the demand for each week as needed.</ConfigurationP>
                </ConfigurationCard>
            </ConfigurationWrapper>
        </ConfigurationContainer>
    )
}

export default Configuration
