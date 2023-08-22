import './bodyContainer.css'
import Auth from './auth/auth'
import CurrentFlow from './currentFlow/currentFlow'
import Authenticate from "../../api/authenticate"
import Measurement from '../../api/measurements'
import { useEffect, useState } from 'react'
import Charts from './charts/charts'
import loaderGIF from '../../Images/firn-embleem-animation.gif'
import QuickView from './QuickViewDetails/QuickView';
import User from '../../api/user';
import { useNavigate } from 'react-router-dom';


const Body = ({darkMode}) => {
    //API's
    const userApi = User();
    const navigate = useNavigate();
    const measurementApi = Measurement();

    //variable state's
    const [loading, setLoading] = useState(true);

    //Data
    // const [currentFlowData, setCurrentFlowData] = useState([]);
    // const [quickViewData, setQuickViewData] = useState();
    const [barChartData, setBarChartData] = useState();
    

    //CurrentflowDataStates
    const [SolarW, setSolarW] = useState('');
    const [BatteryW, setBatteryW] = useState('');
    const [GridW, setGridW] = useState('');
    const [HomeW, setHomeW] = useState('');
    const [BatteryP, setBatteryP] = useState(0);

    //QuickViewData
    const [YieldToday, setYieldToday] = useState('');
    const [ConsumptionToday, setConsumptionToday] = useState('');
    const [RevenueToday, setRevenueToday] = useState('');
    const [foundFlowData, setfoundFlowData] = useState(false);

    // CurrentFlowData
    useEffect(() => {
        const temp = () => {
            const date = new Date();

            console.log("CurrentFlowData")

            const GetCurrentFlowDataTemp = async() => {
                setLoading(true)

                const AccessToken = await GetAccessToken();
                await GetCurrentFlowData(AccessToken, date);

                setLoading(false)
            }
            GetCurrentFlowDataTemp();
        }
        temp();

        const intervalId = setInterval(temp, 60 * 1000);

        return () => clearInterval(intervalId);
    }, [])

    //QuickViewData
    useEffect(() => {
        const temp = () => {
            const date = new Date();

            console.log("QuickViewData")

            const GetQuickViewDataTemp = async() => {
                setLoading(true)

                const AccessToken = await GetAccessToken();
                await GetQuickViewData(AccessToken, date);

                setLoading(false)
            }
            GetQuickViewDataTemp();
        }
        temp();

        const QuickintervalId = setInterval(temp, 15 * 60 * 1000);

        return () => clearInterval(QuickintervalId);
    }, [])

    //BarChartData
    useEffect(() => {
        const temp = () => {
            const date = new Date();

            console.log("BarChartData")

            const GetBarChartDataTemp = async() => {
                setLoading(true)

                const AccessToken = await GetAccessToken();
                await GetBarChartData(AccessToken, date);

                setLoading(false)
            }
            GetBarChartDataTemp();
        }
        temp();

        const BARintervalId = setInterval(temp, 15 * 60 * 1000);

        return () => clearInterval(BARintervalId);
    }, []);

    //Gets the access token from the back-end
    const GetAccessToken = async () => {
        const JwtToken = localStorage.getItem('jwtToken');
        try {
            const AccessToken = await userApi.GetAccessToken(JwtToken);
            return AccessToken.data;
        } catch (error) {
            console.log(error)
            localStorage.removeItem('jwtToken');
            navigate('/');
        }
    }

    const GetCurrentFlowData = async (AccessToken, date) => {

        const Data = await measurementApi.FlowData(AccessToken, date);
        setGridW(Math.round(Data[0]['series'][0]['values'][0][1]));
        setHomeW(Math.round(Data[0]['series'][0]['values'][0][2]));
        setSolarW(Math.round(Data[0]['series'][0]['values'][0][3]));
        setBatteryW(Math.round(Data[0]['series'][0]['values'][0][4]));

        const dataBattery = await measurementApi.BatteryPercentage(AccessToken, date);
        setBatteryP(dataBattery[0]['series'][0]['values'][0][1]);
    }

    const GetQuickViewData = async (AccessToken, date) => {
        const FoundFlowData = false

        const QuickViewEarnings = await measurementApi.BarChartRevenueData(AccessToken, date);
        let total = 0
        for (let index = 0; index < Object.keys(QuickViewEarnings).length; index++) {
            const element = parseFloat(QuickViewEarnings[index]['Fed to grid']) + parseFloat(QuickViewEarnings[index]['FirnController Profit']);
            total = total + parseFloat(element);
        }
        total = total.toFixed(2);
        setRevenueToday(total)
        const QuickViewdata = await measurementApi.QuickViewData(AccessToken, date);
        setYieldToday((QuickViewdata[0]['series'][0]['values'][0][1] / 1000).toFixed(2));
        setConsumptionToday((QuickViewdata[0]['series'][0]['values'][0][2] / 1000).toFixed(2));

        setfoundFlowData(true);
    }           

    const GetBarChartData = async (AccessToken, date) => {

        const result = await measurementApi.BarChartData(AccessToken, date)
        setBarChartData(result);
        
    }

    const requestBarChartData = async (dataToRequest) => {

        const date = new Date();

        if (dataToRequest === "BarChartConsumptionData") {
            const AccessToken = await GetAccessToken();
            // let result = 1;
            // switch (timePeriod) {
                

            //     case "day":
                    
            //         result = await measurementApi.BarChartData(AccessToken, date);

            //         break;

            //     case "month":

            //         result = await measurementApi.BarChartData(AccessToken, date);

            //         break;
                
            //     case "year":

            //         result = await measurementApi.BarChartData(AccessToken, date);

            //         break;
                
            //     default:
            //         break;
            // }


            const result = await measurementApi.BarChartData(AccessToken, date);
            setBarChartData(result);
        } else if (dataToRequest === "BarChartBatteryData") {
            const AccessToken = await GetAccessToken();
            const result = await measurementApi.BatteryPercentageRange(AccessToken, date);
            setBarChartData(result);
        } else if (dataToRequest === "BarChartRevenueData") {
            const AccessToken = await GetAccessToken();
            const result = await measurementApi.BarChartRevenueData(AccessToken, date);
            setBarChartData(result);
        }
    }

    const ToggleLoading = (bool) => {
        setLoading(bool)
    }


    return (
        <>
            <div className={`Body-Container ${darkMode ? 'Body-Container-Dark' : 'Body-Container-Light'}`}>
                {/* {logout && (<div className='Logout-Background'><div className='logout-Container'><div className='logout-Label'>Do you wish to logout?</div><div className='logout-button-Container'><button className='logout-button'>logout</button><button className='logout-button'>back</button></div></div></div>) } */}
                {loading ? (<div className='overlay block-interactions'><div className="loading-container"><img className='loading-gif' src={loaderGIF} alt="" /></div></div>) : <></> }
                <div className='Body-First-Row'>
                    <div><CurrentFlow darkMode={darkMode} SOLARW={SolarW} GRIDW={GridW} BATTERYW={BatteryW} HOMEW={HomeW} BATTERYP={BatteryP}></CurrentFlow></div>
                    <div><QuickView foundFlowData={foundFlowData} YieldToday={YieldToday} BatteryP={BatteryP} ConsumptionToday={ConsumptionToday} RevenueToday={RevenueToday}/></div>
                </div>
                <div className='Body-Second-row'>
                    <div className='Charts-Container'><Charts Data={barChartData} darkMode={darkMode} requestBarChartData={requestBarChartData} ToggleLoading={ToggleLoading}></Charts></div>
                </div>
            </div>
        </>
    )
}

export default Body;