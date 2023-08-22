import './QuickView.css'
import SunIcon from '../../../Images/sun.png'
import BatteryIcon from '../../../Images/battery.png'
import BoltIcon from '../../../Images/bolt.png'
import CoinIcon from '../../../Images/coin.png'
import CashIcon from '../../../Images/cash.png'
import GearIcon from '../../../Images/gear.png'
import ArrowIcon from '../../../Images/icons8-arrow-100.png';
import PcIcon from '../../../Images/computer-dynamic-color.png';
import React, { useEffect, useState } from "react";

const QuickView = ({foundFlowData, YieldToday, BatteryP, ConsumptionToday, RevenueToday}) => {
    const [battCharge, setBattCharge] = useState(0);

    useEffect(() => {
        if (BatteryP >= 0.2) {
            const battpercentage = Math.floor(BatteryP * 100)
            setBattCharge(battpercentage)
        } else {
            setBattCharge(20)
        }
    }, [BatteryP])

    return (

        <div className='QuickViewDetails'>
            <div className='QuickViewDetails-Left-Side'>
                <div className='QuickViewDetails-Item'>
                    <div className='QuickViewDetails-Item-Image-container'><img className='QuickViewDetails-Item-Image' width="17%" height="auto" src={SunIcon} alt="" /></div>
                    <span className='QuickViewDetails-Item-Title'>Yield today</span>
                    <span className='QuickViewDetails-Item-Value'>{YieldToday} kWh</span>
                </div>
                <div className='QuickViewDetails-Item'>
                    <div className='QuickViewDetails-Item-Image-container'><img className='QuickViewDetails-Item-Image' src={BatteryIcon} alt="" /></div>
                    <span className='QuickViewDetails-Item-Title'>Battery charge</span>
                    <span className='QuickViewDetails-Item-Value'>{battCharge} %</span>
                </div>
                <div className='QuickViewDetails-Item'>
                    <div className='QuickViewDetails-Item-Image-container'><img className='QuickViewDetails-Item-Image' width="17%" height="auto" src={BoltIcon} alt="" /></div>
                    <span className='QuickViewDetails-Item-Title' style={{fontSize: '90%'}}>Consumption today</span>
                    <span className='QuickViewDetails-Item-Value'>{ConsumptionToday} kWh</span>
                </div>
            </div>
            <div className='QuickViewDetails-Right-Side'>
                <div className='QuickViewDetails-Item'>
                    <div className='QuickViewDetails-Item-Image-container'><img className='QuickViewDetails-Item-Image' width="17%" height="auto" src={CoinIcon} alt="" /></div>
                    <span className='QuickViewDetails-Item-Title'>
                        <span>Earnings today</span> 
                        <span className='QuickViewDetails-Item-Under-Titel'>Energy back to grid</span>
                    </span>
                    <span className='QuickViewDetails-Item-Value'>€ {RevenueToday}</span>
                </div>
                <div className='QuickViewDetails-Item'>
                    <a className='QuickViewDetails-Link' href="https://insights.eniris.be/#/login">
                        <div className='QuickViewDetails-Item-Image-container'><img className='QuickViewDetails-Item-Image' width="17%" height="auto" src={PcIcon} alt="" /></div>
                        <span className='QuickViewDetails-Item-Title'>
                            <span>Advanced view</span>
                            <span className='QuickViewDetails-Item-Under-Titel'>Our partner Eniris</span>
                        </span>
                        <span className='QuickViewDetails-Item-Value'><img width={35} src={ArrowIcon} alt="" /></span>
                    </a>
                </div>
                <div className='QuickViewDetails-Item'>
                    <div className='QuickViewDetails-Item-Image-container'><img className='QuickViewDetails-Item-Image' width="17%" height="auto" src={GearIcon} alt="" /></div>
                    <span className='QuickViewDetails-Item-Title'>{foundFlowData ? <div>Status <span className='Title_Online'>Online</span></div> : <div>Status <span className='Title_Offline'>Offline</span></div>}</span>
                    <span className='QuickViewDetails-Item-Value'>{foundFlowData ? <div className='Status_Online'></div> : <div className='Status_Offline'></div>}</span>
                </div>
                {/* <div className='QuickViewDetails-Item'>
                    <img className='test-quick-image' width="17%" height="auto" src={GearIcon} alt="" />
                    <span className='test-quick-title'></span>
                    <span className='test-quick-val'></span>
                </div> */}
            </div>
        </div>

    )
}



export default QuickView;