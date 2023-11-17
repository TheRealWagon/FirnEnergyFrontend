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

const Profiel = ( {profiel}) => {
    const navigate = useNavigate()
    const location = useLocation()
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
                    text : `<h2>FIRN Energie Storage</h2>
                        <p>
                    De industriële energie opslag is het buffervat om uw eigen verbruik te optimaliseren en
                    optimaal van uw eigen energie gebruik te kunnen maken.</p>
                    <ul><li>MODULAIR SYTEEM van 40kWh tot 4000kWh</li>
                    <li>In technische ruimte of ENERGY CONTAINER</li>
                    </ul>
                    `
                } ,
                {
                    image : screenDisplay ,
                    text : `<h2>FIRN laadpalen</h2>
                    <p>
                        De TellToCharge laadpalen integreren in het totaal systeem is een evidentie. 
                    </p>
                    <h2>FIRN energiemetingen</h2>
                        <p>
                    Energie productie en verbruiken meten en visualiseren blijft altijd
                    een basis van een energie management systeem.
                    </p>
                    <h2>FIRN visualisatie </h2>
                    <p>
                    Energie productie en verbruiken meten en visualiseren, 
                    besparingen in kaart brengen zijn mogelijk via een app en
                    Website.</p>
                    `
                }
            ]
        } ,
        horeca : {
            titel : 'Horeca' , 
            link : '/Horeca' ,
            text : [
                {
                    image : finis , 
                    text : `<p>Iedereen heeft vorig jaar de enorme extra druk gevoeld door de ENERGIEPRIJZEN in deze reeds zware HORECA sector.
                    Met de DAY AHEAD uurprijzen werkt U altijd aan de ALLERLAAGSTE ENERGIE UURPRIJZEN. Meestal is er in de HORECA sector veel meer verbruik dan met zonnepanelen kan gemaakt worden en verbruiksprofiel loopt meestal niet samen met wanneer er zon is => energiemanagement – aankoop op lage uren en energiestorage zorgen voor enorme besparingen!
                    DE 30% ECOLOGIESTEUN voor KMO helpt zeker bij deze investeringen :</p>
                    <h2>FIRN energy aanbod</h2>
                    <ul><li>FIRN Energie Management Systeem</li></ul>
                    <p>
                    Werkt op de DAY AHEAD energie prijs per uur
                    Automatische aankoop in de winter op de lage uurprijzen
                    als er niet voldoende productie is van de zonnepanelen
                    Bij overschot in de zomer energie verkopen aan dure
                    uurprijzen i.p.v. bijna gratis weg te geven.
                    </p>
                    <p>
                    Grotere verbruikers sturen in functie van energieprijzen en eigen productie of energieopslag.< br/>
                    Verbruik en opslag sturen via AI voorspelde eigen verbruik/productie/uurprijzen
                    </p>
                    `
                } ,
                {
                    image : batterydisplay , 
                    text : `<h2>FIRN Energie Storage</h2>
                    <p>
                    De energie opslag is het buffervat om uw eigen verbruik te optimaliseren en
                    optimaal van uw eigen energie gebruik te kunnen maken
                    <br />
                    De veel grotere opslagcapaciteit dan standaard thuisbatterijen zorgt dat u een modulair en uitbreidbaar opslag systeem hebt aangepast aan de typisch veel grotere verbruikers op een landbouwbedrijf.
                    </p>
                    <h2>FIRN omvormers</h2>
                    <p>
                    Retrofit of hybride omvormers. Indien u al zonnepanelen hebt kunnen we 
                    naadloos alles integreren in uw bestaande installatie via een retrofit omvormer.  
                    Met een hybride omvormer kan alles in 1 systeem.</p> 
                    `
                } ,
                {
                    image : screenDisplay ,
                    text : `<h2>FIRN laadpalen</h2>
                    <p>
                    De elektrische wagens worden in sneltempo de grootste energieverbruikers in de
woning. De TellToCharge laadpalen integreren in het totaal systeem is een evidentie. 
                    </p>
                    <h2>FIRN energiemetingen</h2>
                        <p>
                    Energie productie en verbruiken meten en visualiseren blijft altijd
                    een basis van een energie management systeem.
                    </p>
                    <h2>FIRN visualisatie </h2>
                    <p>
                    Energie productie en verbruiken meten en visualiseren, 
                    besparingen in kaart brengen zijn mogelijk via een app en
                    Website.</p>
                    `
                }
            ]
        } ,
        landbouw : {
            titel : 'Landbouw' , 
            link : '/Landbouw' ,
            text : [
                {
                    image : finis , 
                    text : `<p>De energiekost is ook een zware dobber voor de LANDBOUWSECTOR. Gelukkig is er wel de VLIF steun mogelijk voor de energie opslag : 40% (50% voor jonge landbouwers).</p>
                    <h2>FIRN energy aanbod</h2>
                    <ul><li>FIRN Energie Management Systeem</li></ul>
                    <p>Grotere verbruikers sturen in functie van energieprijzen en eigen productie of energieopslag.<br />
                    Verbruik en opslag sturen via AI voorspelde eigen verbruik/productie/uurprijzen.<br />
                    Energie Trading (goedkoop aankopen en duur verkopen met de energieopslag) wordt niet toegelaten voor de VLIF steun, maar met de FIRN controller kunnen we een SPECIFIEKE GEBRUIKSMODE voor de LANDBOUW invoeren.</p>
                    `
                } ,
                {
                    image : batterydisplay , 
                    text : `<h2>FIRN Energie Storage</h2>
                    <p>
                    De energie opslag is het buffervat om uw eigen verbruik te optimaliseren en
                    optimaal van uw eigen energie gebruik te kunnen maken
                    <br />
                    De veel grotere opslagcapaciteit dan standaard thuisbatterijen zorgt dat u een modulair en uitbreidbaar opslag systeem hebt aangepast aan de typisch veel grotere verbruikers op een landbouwbedrijf.
                    </p>
                    <h2>FIRN omvormers</h2>
                    <p>
                    Retrofit of hybride omvormers. Indien u al zonnepanelen hebt kunnen we 
                    naadloos alles integreren in uw bestaande installatie via een retrofit omvormer.  
                    Met een hybride omvormer kan alles in 1 systeem.</p> 
                    `
                } ,
                {
                    image : screenDisplay ,
                    text : `<h2>FIRN laadpalen</h2>
                    <p>
                    De elektrische wagens worden nemen ook zijn intrede in de landbouwsector.
                    Misschien ook nog in de toekomst voor de zwaardere machines. Met de
                    Teltocharge laadpalen kunnen we alles ook hiervoor in het totaalsysteem integreren.
                    </p>
                    <h2>FIRN energiemetingen</h2>
                        <p>
                    Energie productie en verbruiken meten en visualiseren blijft altijd
                    een basis van een energie management systeem.
                    </p>
                    <h2>FIRN visualisatie </h2>
                    <p>
                    Energie productie en verbruiken meten en visualiseren, 
                    besparingen in kaart brengen zijn mogelijk via een app en
                    Website.</p>
                    `
                }
            ]
        } ,
        residentieel : {
            titel : 'Residentieel' , 
            link : '/Residentieel' ,
            text : [
                {
                    image : finis , 
                    text : `<p>Hebt u verwarming via warmtepomp, een Elektrische wagen, een hoger verbruik dan gemiddeld door zwembad of jacuzzi? Toch nog hoog verbruik in de winter indien zonnepanelen weinig produceren? Te kleine thuisbatterij van 10kWh voor uw wagen van 50kWh op te laden?</p>
                    <p>FIRN energy aanbod :<br />
                    Systeem<br />
                    <ul><li>FIRN Energie Management</li></ul>
                    </p>
                    <p> 
                    Werkt op de DAY AHEAD energie prijs per uur
                    Automatische aankoop in de winter op de lage uurprijzen
                    als er niet voldoende productie is van de zonnepanelen
                    Bij overschot in de zomer energie verkopen aan dure
                    uurprijzen i.p.v. bijna gratis weg te geven.
                    </p>
                    <p>Grotere verbruikers sturen in functie van energieprijzen en eigen productie of energieopslag.</p>
                    <p>
                    Verbruik en opslag sturen via AI voorspelde eigen verbruik/productie/uurprijzen</p>
                    `
                } ,
                {
                    image : batterydisplay , 
                    text : `<h2>FIRN Energie Storage</h2>
                    <p>
                    De energie opslag is het buffervat om op de variabele energieprijzen
                    te kunnen inwerken en het eigen verbruik te optimaliseren. 
                    </p>
                    <p>
                    De grotere opslagcapaciteit dan standaard thuisbatterijen zorgt dat u altijd optimaal goedkoop kunt aankopen of duur verkopen. Voldoende capaciteit voor EV’s en andere grotere verbruikers, maar aan een veel lagere kost dan een standaard thuisbatterij.
                    </p>
                    <h2>FIRN omvormers</h2>
                    <p>Retrofit of hybride omvormers. Indien u al zonnepanelen hebt kunnen we 
                    naadloos alles integreren in uw bestaande installatie via een retrofit omvormer.  
                    Met een hybride omvormer kan alles in 1 systeem.</p>
                    `
                } ,
                {
                    image : screenDisplay , 
                    text : `
                    <h2>FIRN laadpalen</h2>
                    <p>
                    De elektrische wagens worden in sneltempo de grootste energieverbruikers in de
                    woning. De TellToCharge laadpalen integreren in het totaal systeem is een evidentie. 
                    </p>
                    <h2>FIRN energiemetingen</h2>
                    <p>
                    Energie productie en verbruiken meten en visualiseren blijft altijd
                    een basis van een energie management systeem.</p>
                    <h2>FIRN visualisatie</h2>
                    <p>
                    Energie productie en verbruiken meten en visualiseren, 
                    besparingen in kaart brengen zijn mogelijk via een app en
                    Website.</p>
                    `
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
                    <div className="Phone-Remove"><img className="info_icon" src={globeIcon} alt="https://ibb.co/wR9CG6h" /></div>
                </div>
            </div>
            <div className="Navbar">
                <div className="Navbar_Items">
                    {
                        Object.keys(profielData).map(( c , k) => {
                            
                            let active = location.pathname === profielData[c].link ? 'navBarActive' : ''
                            return <div><a className={`NavbarLink ${active}`} onClick={() => navigate(profielData[c].link)}>{profielData[c].titel}</a></div>
                        })
                    }
                </div>
            
            </div>
            <div className="Contact">
                <div className="ProfielHeader">
                    <div className="slider"></div>
                    <div className="ProfielTitel">{profielData[profiel].titel}</div>
                    <div className="slider"></div>
                </div>
                {
                    profielData[profiel].text.map( (c , i) => {

                        if(i % 2 === 0) {
                            return <div className="ProfielBlock">
                                    <div><img className="ControllerImageResized" src={c.image} alt="" width={500}/></div>
                                    <div className="AboutUsText">
                                        <div className="AboutUsDesc">{parse(c.text)}</div>
                                    </div>
                                </div>
                        } else {
                            return <div className="ProfielBlock">
                                    <div className="AboutUsText">
                                        <div className="AboutUsDesc">{parse(c.text)}</div>
                                    </div>
                                    <div><img className="ControllerImageResized" src={c.image} alt="" width={500}/></div>
                                </div>
                        }
                        
                    })
                }
                
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

export default Profiel