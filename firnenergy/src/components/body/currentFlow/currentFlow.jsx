import './currentFlow.css'
import Solar_Icon from '../../../Images/Solar_Icon.png'
import Battery_Icon from '../../../Images/Battery_Icon.png'
import Grid_Icon from '../../../Images/Grid_Icon.png'
import Home_Icon from '../../../Images/Home_Icon.png'
import React, { useEffect, useState } from "react";
import Solar_White_Icon from '../../../Images/Solar_White_icon.png'
import Grid_White_Icon from '../../../Images/Grid_White_Icon.png'
import Battery_White_Icon from '../../../Images/battery_white_icon.png'
import Home_White_Icon from '../../../Images/Home_White_Icon.png'

const CurrentFlow = ({darkMode, SOLARW, GRIDW, HOMEW, BATTERYW, BATTERYP}) => {
    // Values: "Import" = X > 0, "Export" = X < 0, "Static" = X == 0
    const [SOLAR_BATT, setSOLAR_BATT] = useState(false);
    const [SOLAR_GRID, setSOLAR_GRID] = useState(false);
    const [SOLAR_HOME, setSOLAR_HOME] = useState(false);
    const [GRID_BATT, setGRID_BATT] = useState(false);
    const [GRID_HOME, setGRID_HOME] = useState(false);
    const [BATT_GRID, setBATT_GRID] = useState(false);
    const [BATT_HOME, setBATT_HOME] = useState(false);
    const [BatteryPercentage, setBatteryPercentage] = useState(0);

    useEffect(() => {
        if (BATTERYP >= 0.2) {
            const battpercentage = Math.floor(BATTERYP * 100)
            setBatteryPercentage(battpercentage)
        } else {
            setBatteryPercentage(20)
        }
        
        setSOLAR_BATT(false)
        setSOLAR_GRID(false)
        setSOLAR_HOME(false)
        setGRID_BATT(false)
        setGRID_HOME(false)
        setBATT_GRID(false)
        setBATT_HOME(false)

        switch (true) {
            case GRIDW > 0:
                switch (true) {
                    case HOMEW - GRIDW < 0:
                        switch(true) {
                            case SOLARW === 0:
                                //Grid -> Home
                                setGRID_HOME(true)
                                //Grid -> Batt
                                setGRID_BATT(true)
                                break;
                            case SOLARW > 0:
                                //Solar -> Batt
                                setSOLAR_BATT(true)
                                //Grid -> Home
                                setGRID_HOME(true)
                                //Grid -> Batt
                                setGRID_BATT(true)
                                break;
                        }
                        break;
                    case HOMEW - GRIDW === 0:
                        switch(true) {
                            case SOLARW === 0:
                                //Grid -> Home
                                setGRID_HOME(true)
                                break;
                            case SOLARW > 0:
                                //Solar -> Batt
                                setSOLAR_BATT(true)
                                //Grid -> Home
                                setGRID_HOME(true)
                                break;
                        }
                        break;
                    case HOMEW - GRIDW > 0:
                        switch(true) {
                            case SOLARW === 0:
                                //Grid -> Home
                                setGRID_HOME(true)
                                //Batt -> Home
                                setBATT_HOME(true)
                                break;
                            case SOLARW > 0:
                                switch (true) {
                                    case SOLARW + GRIDW < HOMEW:
                                        //solar -> home
                                        setSOLAR_HOME(true)
                                        //grid -> home
                                        setGRID_HOME(true)
                                        //batt -> home
                                        setBATT_HOME(true)
                                        break;
                                    case SOLARW + GRIDW === HOMEW:
                                        //solar -> home
                                        setSOLAR_HOME(true)
                                        //grid -> home
                                        setGRID_HOME(true)
                                        break;

                                    case SOLARW + GRIDW > HOMEW:
                                        //solar -> batt
                                        setSOLAR_BATT(true)
                                        //solar -> home
                                        setSOLAR_HOME(true)
                                        //grid -> home
                                        setGRID_HOME(true)
                                        break;
                                }
                                break;
                        }
                        break;
                }
                break;
            case GRIDW === 0:
                switch(true) {
                    case SOLARW === 0:
                        switch(true) {
                            case HOMEW === 0:
                                //niets
                                break;
                            case HOMEW > 0:
                                //Batt -> home
                                setBATT_HOME(true)
                                break;
                        }
                        break;
                    case SOLARW > 0:
                        switch(true) {
                            case HOMEW - SOLARW < 0:
                                //solar -> batt
                                setSOLAR_BATT(true)
                                //solar -> home
                                setSOLAR_HOME(true)
                                break;
                            case HOMEW - SOLARW === 0:
                                //solar -> home
                                setSOLAR_HOME(true)
                                break;
                            case HOMEW - SOLARW > 0:
                                //solar -> home
                                setSOLAR_HOME(true)
                                //batt -> home
                                setBATT_HOME(true)
                                break;
                        }
                        break;
                }
                break;
            case GRIDW < 0:
                const GRIDWABS = Math.abs(GRIDW);
                switch(true) {
                    case HOMEW === 0:
                        switch(true) {
                            case SOLARW === 0:
                                //batt -> grid
                                setBATT_GRID(true)
                                break;
                            case SOLARW > 0:
                                switch(true) {
                                    case SOLARW - GRIDWABS < 0:
                                        //batt -> grid
                                        setBATT_GRID(true)
                                        //solar -> grid
                                        setSOLAR_GRID(true)
                                        break;
                                    case SOLARW - GRIDWABS === 0:
                                        //solar -> grid
                                        setSOLAR_GRID(true)
                                        break;
                                    case SOLARW - GRIDWABS > 0:
                                        //solar -> grid
                                        setSOLAR_GRID(true)
                                        //solar -> batt
                                        setSOLAR_BATT(true)
                                        break;
                                }
                                break;
                        }
                        break;
                    case HOMEW > 0:
                        switch(true) {
                            case SOLARW === 0:
                                //batt -> grid
                                setBATT_GRID(true)
                                //batt -> home
                                setBATT_HOME(true)

                                break;
                            case SOLARW > 0:
                                switch(true) {
                                    case SOLARW - HOMEW < 0:
                                        //solar -> home
                                        setSOLAR_HOME(true)
                                        //batt -> home
                                        setBATT_HOME(true)
                                        //batt -> grid
                                        setBATT_GRID(true)
                                        break;
                                    case SOLARW - HOMEW === 0:
                                        //Batt -> grid
                                        setBATT_GRID(true)
                                        //solar -> home
                                        setSOLAR_HOME(true)
                                        break;
                                    case SOLARW - HOMEW > 0:
                                        switch(true) {
                                            case BATTERYW < 0:
                                                //solar -> home
                                                setSOLAR_HOME(true)
                                                //batt -> grid
                                                setBATT_GRID(true)
                                                //solar -> grid
                                                setSOLAR_GRID(true)
                                                break;
                                            case BATTERYW === 0:
                                                //solar -> home
                                                setSOLAR_HOME(true)
                                                //solar -> grid
                                                setSOLAR_GRID(true)
                                                break;
                                            case BATTERYW > 0:
                                                //solar -> home
                                                setSOLAR_HOME(true)
                                                //solar -> batt
                                                setSOLAR_BATT(true)
                                                //solar -> grid
                                                setSOLAR_GRID(true)
                                                break;
                                        }
                                        break;
                                }
                                break;
                        }
                        break;
                }
                break;
            default:
                break;
        }


    }, [BATTERYP, GRIDW, HOMEW]);
    
  return (
    <>
        <div className="CurrentFlow-Container">
            <div className='SOLAR'>
                <div className='CurrentFlow-Outer-Circle SOLAR-Circle'>
                    <div className='CurrentFlow-Inner-Circle'>
                        <img className='SOLAR-icon' src={darkMode ? Solar_White_Icon : Solar_Icon} alt="" />
                        <div>{SOLARW} W</div>
                    </div>
                </div>
            </div>
            <div className='GRID'>
                <div className='CurrentFlow-Outer-Circle GRID-Circle'>
                    <div className='CurrentFlow-Inner-Circle'>
                        <img className='SOLAR-icon' src={darkMode ? Grid_White_Icon : Grid_Icon} alt="" />
                        <div>{Math.abs(GRIDW)} W</div>
                    </div>
                </div>
            </div>
            <div className='BATTERY'>
                <div className='CurrentFlow-Outer-Circle BATTERY-Circle'>
                    <div className='CurrentFlow-Inner-Circle'>
                        <div className='CurrentFlow-BATTERY-Percentage'>
                            <img className='BATTERY-icon' src={darkMode ? Battery_White_Icon : Battery_Icon} alt="" />
                            <div className='BATTERY-percentage'>{BatteryPercentage}%</div>
                        </div>
                        <div>{Math.abs(BATTERYW)} W</div>
                    </div>
                </div>
            </div>
            <div className='HOME'>
                <div className='CurrentFlow-Outer-Circle HOME-Circle'>
                    <div className='CurrentFlow-Inner-Circle'>
                        <img className='SOLAR-icon' src={darkMode ? Home_White_Icon : Home_Icon} alt="" />
                        <div>{HOMEW} W</div>
                    </div>
                </div>
            </div>
            <div>
                <svg className='BATTER-GRID-Line' xmlns="http://www.w3.org/2000/svg" viewBox='0 0 450 500'>
                    <defs>
                        <linearGradient id="horizontal-line" x1="0%" y1="0%" x2="100%" y2="0%" gradientUnits='userSpaceOnUse'>
                            <stop offset="0%" stopColor="#65D8A0" />
                            <stop offset="40%" stopColor="#76CF9E" />
                            <stop offset="60%" stopColor="#F88C8C" />
                        </linearGradient>
                        <linearGradient id="vertical-line" x1="0%" y1="0%" x2="0%" y2="100%" gradientUnits='userSpaceOnUse'>
                            <stop offset="0%" stopColor="#DABB50" />
                            <stop offset="40%" stopColor="#D9B857" />
                            <stop offset="60%" stopColor="#CE80EA" />
                        </linearGradient>
                        <linearGradient id="solargrid-line" gradientUnits="userSpaceOnUse" x1="230" y1="151.5" x2="300.6" y2="245">
                            <stop offset="10%" stopColor="#DABB50" />
                            <stop offset="50%" stopColor="#e0b15d" />
                            <stop offset="90%" stopColor="#F88C8C" />
                        </linearGradient>
                        <linearGradient id="solarbatt-line" gradientUnits="userSpaceOnUse" x1="220" y1="151.5" x2="148" y2="245">
                            <stop offset="10%" stopColor="#DABB50" />
                            <stop offset="50%" stopColor="#b6c469" />
                            <stop offset="90%" stopColor="#65D8A0" />
                        </linearGradient>
                        <linearGradient id="batthome-line" gradientUnits="userSpaceOnUse" x1="148" y1="255" x2="220" y2="349">
                            <stop offset="10%" stopColor="#65d8a0" />
                            <stop offset="50%" stopColor="#85beb6" />
                            <stop offset="90%" stopColor="#ce80ea" />
                        </linearGradient>
                        <linearGradient id="homegrid-line" gradientUnits="userSpaceOnUse" x1="230" y1="349" x2="300.6" y2="255">
                            <stop offset="10%" stopColor="#ce80ea" />
                            <stop offset="50%" stopColor="#e486b9" />
                            <stop offset="90%" stopColor="#f88c8c" />
                        </linearGradient>
                        {/* BATTERY | GIRD MARKERS */}
                            {/* BATTERY TO GRID MARKER */}
                            <marker
                                id="BATT_GRID"
                                markerWidth="10"
                                markerHeight="10"
                                refX="10"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#65D8A0; #F88C8C"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>
                            {/* GRID TO BATTERY MARKER */}
                            <marker
                                id="GRID_BATT"
                                markerWidth="10"
                                markerHeight="10"
                                refX="0"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#F88C8C; #65D8A0"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>

                        {/* SOLAR | HOME MARKERS */}
                            {/* SOLAR TO HOME MARKER */}
                            <marker
                                id="SOLAR_HOME"
                                markerWidth="10"
                                markerHeight="10"
                                refX="10"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#DABB50; #CE80EA"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>

                            {/* HOME TO SOLAR MARKER */}
                            <marker
                                id="HOME_SOLAR"
                                markerWidth="10"
                                markerHeight="10"
                                refX="0"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#CE80EA; #DABB50"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>
                        {/* SOLAR | GRID MARKERS */}
                            {/* SOLAR TO GRID MARKER */}
                            <marker
                                id="SOLAR_GRID"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#DABB50; #e0b15d; #F88C8C"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>
                            {/* GRID TO SOLAR MARKER */}
                            <marker
                                id="GRID_SOLAR"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#F88C8C; #e0b15d; #DABB50"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>
                        {/* SOLAR | BATTERY MARKERS */}
                            {/* SOLAR TO BATTERY MARKER */}
                            <marker
                                id="SOLAR_BATT"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#DABB50; #b6c469; #65D8A0"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                                
                            </marker>
                            {/* BATTERY TO SOLAR MARKER */}
                            <marker
                                id="BATT_SOLAR"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#65D8A0; #b6c469; #DABB50"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>

                        {/* HOME | BATTERY MARKERS */}
                            {/* BATTERY TO HOME MARKER */}
                            <marker
                                id="BATT_HOME"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#65d8a0; #85beb6; #ce80ea"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>
                            {/* HOME TO BATTERY MARKER */}
                            <marker
                                id="HOME_BATT"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#ce80ea; #85beb6; #65d8a0"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>

                        {/* HOME | GRID MARKERS */}
                            {/* HOME TO GRID MARKER */}
                            <marker
                                id="HOME_GRID"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#ce80ea; #e486b9; #f88c8c"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>
                            {/* GRID TO HOME MARKER */}
                            <marker
                                id="GRID_HOME"
                                markerWidth="10"
                                markerHeight="10"
                                refX="5"
                                refY="5"
                                orient="auto"
                            >
                                <circle cx="5" cy="5" r="3">
                                    <animate
                                        attributeName="fill"
                                        values="#f88c8c; #e486b9; #ce80ea"
                                        dur="5s"
                                        repeatCount="indefinite"
                                    />
                                </circle>
                            </marker>
                    </defs>






                    {/* BATTERY | GRID LINE */}
                    {BATT_GRID | GRID_BATT ? <line x1="33%" y1="50%" x2="66.8%" y2="50%" stroke="url(#horizontal-line)" strokeWidth="2" /> : <></>}
                    {/* BATTERY to GRID */}
                    {BATT_GRID ? <line x1="33%" y1="50%" x2="66.8%" y2="50%" stroke="url(#horizontal-line)" strokeWidth="1.3" markerEnd="url(#BATT_GRID)">
                        <animate attributeName="x2" from="36%" to="66.8%" dur="5s" repeatCount="indefinite" />
                    </line> : <></>}
                    {/* GRID to BATTERY */}
                    {GRID_BATT ? <line x1="66.8%" y1="50%" x2="33%" y2="50%" stroke="url(#horizontal-line)" strokeWidth="1.3" markerEnd="url(#GRID_BATT)">
                        <animate attributeName="x2" from="66.8%" to="36%" dur="5s" repeatCount="indefinite" />
                    </line> : <></>}
                    {/* SOLAR | HOME LINE */}
                    {SOLAR_HOME ? <line x1="50%" y1="30.4%" x2="50%" y2="69.8%" stroke="url(#vertical-line)" strokeWidth="2" /> : <></>}
                    {/* SOLAR to HOME */}
                    {SOLAR_HOME ? <line x1="50%" y1="30.4%" x2="50%" y2="69.8%" stroke="url(#vertical-line)" strokeWidth="1.3" markerEnd="url(#SOLAR_HOME)">
                        <animate attributeName="y2" from="32.5%" to="69.8%" dur="5s" repeatCount="indefinite" />
                    </line> : <></>}
                    {/* HOME to SOLAR */}
                    {/* <line x1="50%" y1="69.8%" x2="50%" y2="30.4%" stroke="url(#vertical-line)" strokeWidth="1.3" markerEnd="url(#HOME_SOLAR)">
                        <animate attributeName="y2" from="69.8%" to="32.5%" dur="5s" repeatCount="indefinite" />
                    </line> */}


                    {/* SOLAR | GRID LINE */}
                    {SOLAR_GRID ? <path d="M230,151.5 L230,210 C230,245 230,245 260,245 L300.6,245" fill="none" stroke="url(#solargrid-line)" strokeWidth="2"/> : <></>}
                    {SOLAR_GRID ? <path d="M230,153 L230,210 C230,245 230,245 260,245 L293.6,245" fill="none" stroke="transparent" strokeWidth="2" id="SOLARGRID"/> : <></>}
                    {/* <path d="M293.6,245 L260,245 C230,245 230,245 230,210 L230,153" fill="none" stroke="transparent" strokeWidth="2" id="GRIDSOLAR"/> */}
                    {/* SOLAR to GRID */}
                    {SOLAR_GRID ? <path d="M0,0" fill="none" stroke="url(#SOLAR_GRID)" strokeWidth="1.3" markerEnd="url(#SOLAR_GRID)">
                        <animateMotion dur="5s" repeatCount="indefinite">
                            <mpath href="#SOLARGRID" />
                        </animateMotion>
                    </path> : <></>}
                    {/* GRID to SOLAR */}
                    {/* <path d="M0,0" fill="none" stroke="url(#GRID_SOLAR)" strokeWidth="1.3" markerEnd="url(#GRID_SOLAR)">
                        <animateMotion dur="5s" repeatCount="indefinite">
                            <mpath href="#GRIDSOLAR" />
                        </animateMotion>
                    </path> */}


                    {/* SOLAR | BATTERY LINE */}
                    {SOLAR_BATT ? <path d="M220,151.5 L220,210 C220,245 220,245 188,245 L148,245" fill="none" stroke="url(#solarbatt-line)" strokeWidth="2"/> : <></>}
                    {SOLAR_BATT ? <path d="M220,153 L220,210 C220,245 220,245 188,245 L155,245" fill="none" stroke="transparent" strokeWidth="2" id="SOLARBATT"/> : <></>}
                    {/* <path d="M155,245 L188,245 C220,245 220,245 220,210 L220,153" fill="none" stroke="transparent" strokeWidth="2" id="BATTSOLAR"/> */}
                    {/* SOLAR to BATTERY */}
                    {SOLAR_BATT ? <path d="M0,0" fill="none" stroke="url(#SOLAR_BATT)" strokeWidth="1.3" markerEnd="url(#SOLAR_BATT)">
                        <animateMotion dur="5s" repeatCount="indefinite">
                            <mpath href="#SOLARBATT" />
                        </animateMotion>
                    </path> : <></>}
                    {/* BATTERY to SOLAR */}
                    {/* <path d="M0,0" fill="none" stroke="url(#BATT_SOLAR)" strokeWidth="1.3" markerEnd="url(#BATT_SOLAR)">
                        <animateMotion dur="5s" repeatCount="indefinite">
                            <mpath href="#BATTSOLAR" />
                        </animateMotion>
                    </path> */}

                    {/* BATTERY | HOME LINE */}
                    {BATT_HOME ? <path d="M148,255 L188,255 C220,255 220,255 220,290.5 L220,349" fill="none" stroke="url(#batthome-line)" strokeWidth="2"/> : <></>}
                    {BATT_HOME ? <path d="M155,255 L188,255 C220,255 220,255 220,290.5 L220,345.5" fill="none" stroke="transparent" strokeWidth="2" id="BATTHOME"/> : <></>}
                    {/* <path d="M220,345.5 L220,290.5 C220,255 220,255 188,255 L155,255" fill="none" stroke="transparent" strokeWidth="2" id="HOMEBATT"/> */}
                    {/* BATTERY to HOME */}
                    {BATT_HOME ? <path d="M0,0" fill="none" stroke="url(#BATT_HOME)" strokeWidth="1.3" markerEnd="url(#BATT_HOME)">
                        <animateMotion dur="5s" repeatCount="indefinite">
                            <mpath href="#BATTHOME" />
                        </animateMotion>
                    </path> : <></>}
                    {/* HOME to BATTERY */}
                    {/* <path d="M0,0" fill="none" stroke="url(#HOME_BATT)" strokeWidth="1.3" markerEnd="url(#HOME_BATT)">
                        <animateMotion dur="5s" repeatCount="indefinite">
                            <mpath href="#HOMEBATT" />
                        </animateMotion>
                    </path> */}

                    {/* HOME | GRID LINE */}
                    {GRID_HOME ? <path d="M230,349 L230,290.5 C230,255 230,255 260,255 L300.6,255" fill="none" stroke="url(#homegrid-line)" strokeWidth="2"/> : <></>}
                    {GRID_HOME ? <path d="M293.6,255 L260,255 C230,255 230,255 230,290.5 L230,345.5" fill="none" stroke="transparent" strokeWidth="2" id="GRIDHOME"/> : <></>}
                    {/* <path d="M230,345.5 L230,290.5 C230,255 230,255 260,255 L293.6,255" fill="none" stroke="transparent" strokeWidth="2" id="HOMEGRID"/> */}
                    {/* HOME to GRID */}
                    {/* <path d="M0,0" fill="none" stroke="url(#HOME_GRID)" strokeWidth="1.3" markerEnd="url(#HOME_GRID)">
                        <animateMotion dur="5s" repeatCount="indefinite">
                            <mpath href="#HOMEGRID" />
                        </animateMotion>
                    </path> */}
                    {/* GRID to HOME */}
                    {GRID_HOME ? <path d="M0,0" fill="none" stroke="url(#GRID_HOME)" strokeWidth="1.3" markerEnd="url(#GRID_HOME)">
                        <animateMotion dur="5s" repeatCount="indefinite">
                            <mpath href="#GRIDHOME" />
                        </animateMotion>
                    </path> : <></>}
                </svg>
            </div>
        </div>
    </>
);};

export default CurrentFlow;