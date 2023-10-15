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
import {useNavigate} from "react-router-dom";


const OldWebHomePage = () => {

    const navigate = useNavigate();

    const handleUserLogin = () => {
        navigate("/LoginPage")
    }


    return (
        <div>
            <div className="Navbar">
                <div><img className="NavbarLogo" src={WebLogo} alt="https://ibb.co/LdnxQng" /></div>
                <div className="Navbar_Items">
                    <div style={{color: "#AB745A", textDecoration: "underline"}}>Home</div>
                    <div>|</div>
                    <div><a className="NavbarLink" href="#AboutUsLink">Over Ons</a></div>
                    <div>|</div>
                    <div><a className="NavbarLink" href="#ContactLink">Contact</a></div>
                    <div>|</div>
                    <div>Industrieel</div>
                    <div>|</div>
                    <div>Residentieel</div>
                </div>
                <div className="Navbar_info">
                    <div><button onClick={handleUserLogin} className="user_icon_button"><img className="user_icon" src={userIcon} alt="https://ibb.co/P5ZFx1K" /></button></div>
                    <div><img className="info_icon" src={globeIcon} alt="https://ibb.co/wR9CG6h" /></div>
                </div>
            </div>
            <div className="cover"> 
                <span className="Cover_Title">FirnEnergy</span>
                <span className="Cover_Line"></span>
                <span className="Cover_description">Innovatieve energie opslag & energie trading</span>
            </div>
            <div className="BatteryDisplay">
                <div className="BatteryText">
                    <div className="BatteryTitel">Optimaliseer uw batterij</div>
                    <div className="BatteryDesc">Verslim de energie aankoop en verkoop, dankzij FIRN energy koopt u energie aan de laagste prijs en verkoopt u overshot aan de hoogste prijs</div>
                </div>
                <div><img className="BatteryImage" src={batterydisplay} alt="" /></div>
            </div>
            <div className="Properties">
                <table>
                    <tbody>
                        <tr className="flex-row">
                            <td>
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={batteryIcon} alt="" /></div></div>
                                <div className="PropTitle">Duurzame batterijoplossingen</div>
                                <div className="PropDesc">Dankzij de FIRN controller wordt uw batterij efficiënter gebruikt wat dan zorgt voor duurzame en betrouwbare batterij oplossingen.</div>
                            </td>
                            <td>
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={flashIcon} alt="" /></div></div>
                                <div className="PropTitle">Geavanceerd energiemanagement</div>
                                <div className="PropDesc">Met behulp van real time data wordt uw systeem aangestuurd om op ieder moment de meest gepaste beslissing te nemen.</div>
                            </td>
                            <td>
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={snowIcon} alt="" /></div></div>
                                <div className="PropTitle">Geoptimaliseerde winter</div>
                                <div className="PropDesc">Uw batterij wordt automatisch s ’nachts opgeladen om zo aan lage prijzen energie tijdens de dag te kunnen gebruiken.</div>
                            </td>
                        </tr>
                        <tr className="flex-row2">
                            <td>
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={monitorIcon} alt="" /></div></div>
                                <div className="PropTitle">Real time monitoring</div>
                                <div className="PropDesc">Bekijk uw statistieken waar en wanneer u wilt. Ook kunt u geavanceerde grafieken bekijken om een zo gedetailleerd mogelijk beeld van de geleverde prestaties te krijgen.</div>
                            </td>
                            <td>
                                <div className="PropImage"><div className="Circle"><img className="PropBat" src={walletIcon} alt="" /></div></div>
                                <div className="PropTitle">Slimme teruglevering</div>
                                <div className="PropDesc">Aan de hand van wisselende uurprijzen verkoopt de FIRN controller uw opgewekte energie aan de beste tarieven.</div>
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
                <div className="ProfielHeader">
                    <div className="slider"></div>
                    <div className="ProfielTitel">Kies je profiel</div>
                    <div className="slider"></div>
                </div>
                <div className="profielBoxes">
                    <div className="IndustrieelBox" style={{backgroundImage: Industrialdisplay}}>
                        <div className="BoxText">
                            <span className="BoxTitle">Industrieel</span>
                            <span className="BoxSlider"></span>
                            <span className="BoxDesc">Laat jouw zonne-installatie slimmer werken</span>
                        </div>
                        <span className="BoxFollow">Ontdek meer →</span>
                    </div>
                    <div className="ResidentieelBox" style={{backgroundImage: Residentialdisplay}}>
                        <div className="BoxText">
                            <span className="BoxTitle">Residentieel</span>
                            <span className="BoxSlider"></span>
                            <span className="BoxDesc">Bespaar meer met slimme batterij integraties</span>
                        </div>
                        <span className="BoxFollow">Ontdek meer →</span>
                    </div>
                </div>
            </div>
            <div className="AboutUs" id="AboutUsLink">
                <div><img src={controllerImage} alt="" /></div>
                <div className="AboutUsText">
                    <div className="AboutUsTitel">Laat ons jou helpen</div>
                    <div className="AboutUsDesc">FIRN Energy is een toonaangevend bedrijf dat zich richt op het ontwikkelen van geavanceerde batterijoplossingen en energiemanagementsystemen. Wij geloven in de kracht van energieopslag en de impact die het kan hebben op de manier waarop we energie consumeren en beheren. Onze missie is om duurzame en betrouwbare energieopslagoplossingen te bieden die de overgang naar een groenere toekomst ondersteunen.</div>
                </div>
            </div>
            <div className="Contact" id="ContactLink">
                <div className="ProfielHeader">
                    <div className="slider"></div>
                    <div className="ProfielTitel">Contacteer ons</div>
                    <div className="slider"></div>
                </div>
                <div className="ContactInfo">
                    <div className="ContactDesc">Wilt u meer informatie over onze innovatieve batterijoplossingen en energiemanagementsystemen? Neem vandaag nog  
                        contact met ons op en ontdek hoe FIRN Energy uw energiebeheer optimaliseert</div>
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