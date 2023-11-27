import { React } from 'react'
import {useNavigate , useLocation } from "react-router-dom";
import "../HomePage/OldhomePage.css"
import parse from 'html-react-parser'
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
import Horecadisplay from "../../Images/Horeca.jpg"
import Landbouwdisplay from "../../Images/Landbouw.jpg"
import finis from '../../Images/finis-removebg-preview.png'
import screenDisplay from '../../Images/Schermafbeelding 2023-08-16 164524slanted.png'
import '../../translations/i18n';
import { useTranslation  } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";

const languages = [
    { lang : 'nl' , label : 'Nederlands' , flag : 'be' },
    { lang : 'fr' , label : 'Français' , flag : 'fr' }]

const Profiel = ( {profiel}) => {
    const navigate = useNavigate()
    const location = useLocation()
    const { t , i18n } = useTranslation();
    
    const handleUserLogin = () => {
        navigate("/LoginPage")
    }

    const profielData = {
        industrie : {
            titel : 'KMO & Industrie' , 
            link : '/Industrie' ,
            text : [
                {
                    image : batterydisplay , 
                } ,
                {
                    image : screenDisplay
                }
            ]
        } ,
        horeca : {
            titel : 'Horeca' , 
            link : '/Horeca' ,
            text : [
                {
                    image : finis ,
                } ,
                {
                    image : batterydisplay , 
                } ,
                {
                    image : screenDisplay ,
                }
            ]
        } ,
        landbouw : {
            titel : 'Landbouw' , 
            link : '/Landbouw' ,
            text : [
                {
                    image : finis , 
                } ,
                {
                    image : batterydisplay , 
                } ,
                {
                    image : screenDisplay ,
                }
            ]
        } ,
        residentieel : {
            titel : 'Residentieel' , 
            link : '/Residentieel' ,
            text : [
                {
                    image : finis , 
                } ,
                {
                    image : batterydisplay , 
                } ,
                {
                    image : screenDisplay , 
                } , {
                    image : WebLogo
                }
            ]
        }
    }
    return (
        <div className="HomePageBody">
            <div className="Navbar">
                <div><img className="NavbarLogo" src={WebLogo} alt="https://ibb.co/LdnxQng" /></div>
                <div className="Navbar_Items">
                    <div><a className="NavbarLink" onClick={() => navigate('/')}>Home</a></div>
                    <div>|</div>
                    <div><a className="NavbarLink" href="#AboutUsLink">Over ons</a></div>
                    <div>|</div>
                    <div><a className="NavbarLink" href="#ContactLink">Contact</a></div>
                    <div className="Phone-Remove">|</div>
                    {/*<div className="Phone-Remove">Industrieel</div>
                    <div className="Phone-Remove">|</div>
                    <div className="Phone-Remove">Residentieel</div>
                    <div className="NavbarLink"><a className="NavbarLink" onClick={() => navigate('/#Profielen')}>Profielen</a></div>*/}
                </div>
                <div className="Navbar_info">
                    <div className="Phone-Remove"><button onClick={handleUserLogin} className="user_icon_button"><img className="user_icon" src={userIcon} alt="https://ibb.co/P5ZFx1K" /></button></div>
                    {languages.map((l,c) => {
                        return <span onClick={() => i18n.changeLanguage(l.lang)} title={`${l.label}`} className={`lang fi fi-${l.flag}`}></span>
                    })}
                </div>
            </div>
            <div className="Navbar">
                <div className="Navbar_Items">
                    {
                        Object.keys(profielData).map(( c , k) => {
                            let active = location.pathname === profielData[c].link ? 'navBarActive' : ''
                            return <div><a className={`NavbarLink ${active}`} onClick={() => navigate(profielData[c].link)}>{t(`profielData.${c}.titel`)}</a></div>
                        })
                    }
                </div>
            
            </div>
            <div className="Contact">
                <div className="ProfielHeader">
                    <div className="slider"></div>
                    {
                    //{t(`profielData.${profielData[profiel].titel}.titel`)}
                    }
                    <div className="ProfielTitel">{t(`profielData.${profiel}.titel`)}</div>
                    <div className="slider"></div>
                </div>
                {
                    profielData[profiel].text.map( (c , i) => {

                        if(i % 2 === 0) {
                            return <div className="ProfielBlock">
                                    <div className='ProfielBlockImage'><img className="ControllerImageResized" src={c.image} alt="" width={500}/></div>
                                    <div className="AboutUsText">
                                        <div className="AboutUsDesc">{parse(t(`profielData.${profiel}.text.${i}`))}
                                        </div>
                                    </div>
                                </div>
                        } else {
                            return <div className="ProfielBlock">
                                    <div className="AboutUsText">
                                        <div className="AboutUsDesc">{parse(t(`profielData.${profiel}.text.${i}`))}</div>
                                    </div>
                                    <div className='ProfielBlockImage'><img className="ControllerImageResized" src={c.image} alt="" width={500}/></div>
                                </div>
                        }
                        
                    })
                }
                
            </div>
            
            
            <div className="Contact" id="ContactLink">
                <div className="ProfielHeader">
                    <div className="slider"></div>
                    <div className="ProfielTitel">{t('contact.title')}</div>
                    <div className="slider"></div>
                </div>
                <div className="ContactInfo">
                    <div className="ContactDesc">{t('contact.subtext')}</div>
                    <div className="ContactButtons">
                        <div className="PhoneButton"><img className="ContactImage" src={phoneIcon} alt="" /><div>+32 56 19 88 77</div></div>
                        <div className="EmailButton"><img className="ContactImage" src={mailIcon} alt="" /><div>Sales@firnenergy.com</div></div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profiel