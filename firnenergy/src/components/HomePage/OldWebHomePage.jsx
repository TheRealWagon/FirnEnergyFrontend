import "./OldhomePage.css"

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
import beurs from '../../Images/beurs.png'
import {useNavigate} from "react-router-dom";
import '../../translations/i18n';
import { useTranslation  } from 'react-i18next';
import "/node_modules/flag-icons/css/flag-icons.min.css";

const languages = [
    { lang : 'nl' , label : 'Nederlands' , flag : 'be' },
    { lang : 'fr' , label : 'Français' , flag : 'fr'}]


const OldWebHomePage = () => {

    const { t , i18n } = useTranslation();
    
    const navigate = useNavigate();

    const handleUserLogin = () => {
        navigate("/LoginPage")
    }


    return (
        <div className="HomePageBody">
            <div className="Navbar">
                <div className="NavbarImage"><img className="NavbarLogo" src={WebLogo} alt="https://ibb.co/LdnxQng" /></div>
                <div className="Navbar_Items">
                    <div>{t('menu.home')}</div>
                    <div>|</div>
                    <div><a className="NavbarLink" href="#AboutUsLink">{t('menu.aboutUs')}</a></div>
                    <div>|</div>
                    <div><a className="NavbarLink" href="#ContactLink">{t('menu.contact')}</a></div>
                    <div>|</div>
                    {/* <div className="Phone-Remove">|</div> */}
                    {/*<div className="Phone-Remove">Industrieel</div>
                    <div className="Phone-Remove">|</div>
                    <div className="Phone-Remove">Residentieel</div>*/}
                    <div className="NavbarLink"><a className="NavbarLink" href="#Profielen">{t('menu.profiles')}</a></div>
                </div>
                <div className="Navbar_info">
                    <div className="Phone-Remove"><button onClick={handleUserLogin} className="user_icon_button"><img className="user_icon" src={userIcon} alt="https://ibb.co/P5ZFx1K" /></button></div>
                    {
                        //<div className="Phone-Remove"><img className="info_icon" src={globeIcon} alt="https://ibb.co/wR9CG6h" /></div>
                    }
                    {languages.map((l,c) => {
                        return <span onClick={() => i18n.changeLanguage(l.lang)} title={`${l.label}`} className={`lang fi fi-${l.flag}`}></span>
                    })}
                </div>
            </div>
            <div className="cover"> 
                <span className="Cover_Title">{t('title')}</span>
                <span className="Cover_Line"></span>
                <span className="Cover_description">{t('subtitle')}</span>
            </div>
            <div className="BatteryDisplay">
                <div className="BatteryText">
                    <div className="BatteryTitel">{t('info.title')}</div>
                    <div className="BatteryDesc">{t('info.subtext')}</div>
                </div>
                <div><img className="BatteryImage" src={batterydisplay} alt="" /></div>
            </div>
            <div className="Properties">
                <table>
                    <tbody>
                        <tr className="flex-row">
                            <td className="Property">
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={batteryIcon} alt="" /></div></div>
                                <div className="PropTitle">{t('info.blocks.0.title')}</div>
                                <div className="PropDesc">{t('info.blocks.0.text')}</div>
                            </td>
                            <td className="Property">
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={flashIcon} alt="" /></div></div>
                                <div className="PropTitle">{t('info.blocks.1.title')}</div>
                                <div className="PropDesc">{t('info.blocks.1.text')}</div>
                            </td>
                            <td className="Property">
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={snowIcon} alt="" /></div></div>
                                <div className="PropTitle">{t('info.blocks.2.title')}</div>
                                <div className="PropDesc">{t('info.blocks.2.text')}</div>
                            </td>
                        </tr>
                        <tr className="flex-row2">
                            <td className="Property">
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={monitorIcon} alt="" /></div></div>
                                <div className="PropTitle">{t('info.blocks.3.title')}</div>
                                <div className="PropDesc">{t('info.blocks.3.text')}</div>
                            </td>
                            <td className="Property">
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={walletIcon} alt="" /></div></div>
                                <div className="PropTitle">{t('info.blocks.4.title')}</div>
                                <div className="PropDesc">{t('info.blocks.4.text')}</div>
                            </td>
                            <td className="notVisible">
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src="" alt="" /></div></div>
                                <div className="PropTitle"></div>
                                <div className="PropDesc"></div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                
            </div>
            <div className="profiel">
                <img className='imgcenter' src={beurs} width='500' />
            </div>
            <div className="profiel">
                <div className="ProfielHeader">
                    <div className="slider"></div>
                    <div className="ProfielTitel">{t('profiles.choose')}</div>
                    <div className="slider"></div>
                </div>
                <div className="profielBoxes" id="Profielen">
                    <div className="IndustrieelBox boxAll" style={{backgroundImage: Industrialdisplay}}>
                        <div className="BoxText">
                            <span className="BoxTitle">{t('profiles.blocks.0.title')}</span>
                            <span className="BoxSlider"></span>
                            <span className="BoxDesc">{t('profiles.blocks.0.subtitle')}</span>
                        </div>
                        <span className="BoxFollow" onClick={() => navigate('/Industrie')}>{t('profiles.discoverMore')} →</span>
                    </div>
                    <div className="ResidentieelBox boxAll" style={{backgroundImage: Residentialdisplay}}>
                        <div className="BoxText">
                            <span className="BoxTitle">{t('profiles.blocks.1.title')}</span>
                            <span className="BoxSlider"></span>
                            <span className="BoxDesc">{t('profiles.blocks.1.subtitle')}</span>
                        </div>
                        <span className="BoxFollow" onClick={() => navigate('/Residentieel')}>{t('profiles.discoverMore')} →</span>
                    </div>
                    <div className="HorecaBox boxAll" style={{backgroundImage: Horecadisplay}}>
                        <div className="BoxText">
                            <span className="BoxTitle">{t('profiles.blocks.2.title')}</span>
                            <span className="BoxSlider"></span>
                            <span className="BoxDesc">{t('profiles.blocks.2.subtitle')}</span>
                        </div>
                        <span className="BoxFollow" onClick={() => navigate('/Horeca')}>{t('profiles.discoverMore')} →</span>
                    </div>
                    <div className="LandbouwBox boxAll" style={{backgroundImage: Landbouwdisplay}}>
                        <div className="BoxText">
                            <span className="BoxTitle">{t('profiles.blocks.3.title')}</span>
                            <span className="BoxSlider"></span>
                            <span className="BoxDesc">{t('profiles.blocks.3.subtitle')}</span>
                        </div>
                        <span className="BoxFollow" onClick={() => navigate('/Landbouw')}>{t('profiles.discoverMore')} →</span>
                    </div>
                </div>
            </div>
            <div className="AboutUs" id="AboutUsLink">
                <div><img className="ControllerImageResized" src={controllerImage} alt="" /></div>
                <div className="AboutUsText">
                    <div className="AboutUsTitel">{t('help.title')}</div>
                    <div className="AboutUsDesc">{t('help.subtext')}</div>
                </div>
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

export default OldWebHomePage;