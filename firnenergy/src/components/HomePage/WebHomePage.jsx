import "./homePage.css"
import React, { useRef, useEffect, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';


import CoverImage from '../../Images/majestic-mountain-peak-back-lit-by-sunset-generated-by-ai 1.png'
import FirnLogoHorWhite from '../../Images/firn-hor-white 1.png';
import FirnController from '../../Images/finis-removebg-preview.png';

import userIcon from '../../Images/6522516.png'
import WebLogo from '../../Images/firnenergyLogo.png'
import globeIcon from '../../Images/icons8-world-100.png'
import batteryIcon from '../../Images/battery_611153.png'
import batterydisplay from "../../Images/batterijdisplaytest-PhotoRoom.png-PhotoRoom.png"
import Coverdisplay from "../../Images/Runway 2023-07-11T13_43_48.777Z Expand Image.jpg"
import Industrialdisplay from '../../Images/interior-large-logistics-warehouse-ai-generative.jpg'
import Residentialdisplay from "../../Images/aerial-view-new-houses-bridgwater-somerset-uk.jpg"
import flashIcon from '../../Images/flash_4083922.png'
import snowIcon from "../../Images/snowflake_2529995.png"
import monitorIcon from "../../Images/monitor_1150587.png"
import walletIcon from "../../Images/icons8-wallet-100.png"
import phoneIcon from "../../Images/icons8-phone-100.png";
import mailIcon from "../../Images/icons8-mail-100.png"
import controllerImage from "../../Images/finis-removebg-preview.png"
import {useNavigate} from "react-router-dom";


const WebHomePage = () => {

    smoothscroll.polyfill();

    const plansRef = useRef(null);
    const topRef = useRef(null);

    const handleScroll = (e) => {
        
        if (e.deltaY > 0 && plansRef.current) {
            const yOffset = plansRef.current.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: yOffset, behavior: 'smooth' });
        } else if (e.deltaY < 0 && topRef.current) {
            // Scroll up
            const yOffset = topRef.current.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({ top: yOffset, behavior: 'smooth' });
        }
    };

    useEffect(() => {

        window.addEventListener('wheel', handleScroll);
        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('wheel', handleScroll);
        };
    }, []);


    return (
        <div style={{overflowX: "hidden"}}>
            <div ref={topRef} className="HomePage-Overlay">
                <div className="HomePage-Navbar">
                    <div className="HomePage-Navbar-Logo"><img className="HomePage-Navbar-Logo" src={FirnLogoHorWhite} alt="FirnLogoWhiteHor" /></div>
                    <div className="HomePage-Navbar-Items">
                        <div className="HomePage-Navbar-Items-About">About</div>
                        <div className="HomePage-Navbar-Items-Plans">Plans</div>
                        <div className="HomePage-Navbar-Items-Contact">Contact</div>
                        <div className="HomePage-Navbar-Items-Dashboard">
                            <div className="HomePage-Navbar-Items-Dashboard-Button">
                                <div className="HomePage-Navbar-Items-Dashboard-Text">Dashboard</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="HomePage-Overlay-Content">
                    <div className="HomePage-Overlay-Content-Element">
                        <div className="HomePage-Overlay-Text">
                            <div className="HomePage-Overlay-Text-Title">Firn <span className="HomePage-Overlay-Text-Title-Color">Energy</span></div>
                            <div className="HomePage-Overlay-Text-Desc">Smart energy saving technologie. Maximize your savings thanks to the smartgridOne controller</div>
                            <div className="HomePage-Overlay-Text-Button">
                                <div><button>Contact us</button></div>
                            </div>
                        </div>
                    </div>
                    <div className="HomePage-Overlay-Content-Element">
                        <img className="HomePage-Overlay-Picture" src={FirnController} alt="" />
                    </div>
                </div>
                <div class="scroll-indicator">
                    <span class="arrow"></span>
                </div>
            </div>
            <div ref={plansRef} className="HomePage-Plans">

            </div>
            <div className="HomePage-Contact">

            </div>
        

        </div>
        
            
    )

}

export default WebHomePage;