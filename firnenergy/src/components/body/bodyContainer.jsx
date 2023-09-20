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
    const [loading, setLoading] = useState(false);

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

    const [NodeIdList, setNodeIdList] = useState(null);

    useEffect(() => {

        //Initialize nodeId list

        const getReturnList = async() => {
            const accessToken = GetAccessToken();
            const returnList = await measurementApi.initialize(accessToken);

            setNodeIdList(returnList.data)
        }
        getReturnList();

    }, [])


    // CurrentFlowData
    useEffect(() => {

        if (NodeIdList != null) {
            const temp = () => {
                const date = new Date();
    
                console.log("CurrentFlowData")
    
                const GetCurrentFlowDataTemp = async() => {
                    setLoading(true)
    
                    const AccessToken = GetAccessToken();
                    await GetCurrentFlowData(AccessToken, date);

                    setLoading(false)
                }
                GetCurrentFlowDataTemp();
            }
            temp();
    
            const intervalId = setInterval(temp, 60 * 1000);
    
            return () => clearInterval(intervalId);
        } 
    }, [NodeIdList])

    // QuickViewData
    useEffect(() => {

        if (NodeIdList != null) {
        
            const temp = () => {
                const date = new Date();
    
                console.log("QuickViewData")
    
                const GetQuickViewDataTemp = async() => {
                    setLoading(true)
    
                    const AccessToken = GetAccessToken();
                    await GetQuickViewData(AccessToken, date);
    
                    setLoading(false)
                }
                GetQuickViewDataTemp();
            }
            temp();
        
            const QuickintervalId = setInterval(temp, 15 * 60 * 1000);

            return () => clearInterval(QuickintervalId);
        }

    }, [NodeIdList])

    // BarChartData
    useEffect(() => {
        if (NodeIdList != null) {

            const temp = () => {
                const date = new Date();
    
                console.log("BarChartData")
    
                const GetBarChartDataTemp = async() => {
                    setLoading(true)
    
                    const AccessToken = GetAccessToken();
                    await GetBarChartData(AccessToken, date);
    
                    setLoading(false)
                }
                GetBarChartDataTemp();
            }
            temp();
    
            const BARintervalId = setInterval(temp, 15 * 60 * 1000);
    
            return () => clearInterval(BARintervalId);
        }
    }, [NodeIdList]);

    //Gets the access token from the back-end
    const GetAccessToken = () => {
        const JwtToken = localStorage.getItem('jwtToken');
        if (JwtToken) {
            return JwtToken;
        } else {
            localStorage.removeItem('jwtToken');
            navigate('/');
        }
    }

    const GetCurrentFlowData = async (AccessToken, date) => {

        const data = await measurementApi.getCurrentFlowData(AccessToken, date, NodeIdList.currentFlowDataNodeId);

        const columns = data[0].columns
        const indexes = {}

        for (let index = 0; index < columns.length; index++) {
            const element = columns[index];

            if (element === "actualPowerTot_W") {
                indexes["Grid"] = index;
            } else if (element === "childrenConsumedPower_W") {
                indexes["Consumption"] = index;
            } else if (element === "childrenProducedPower_W") {
                indexes["Production"] = index;
            } else if (element === "childrenStoragePower_W") {
                indexes["Battery"] = index;
            }
        }
        const values = data[0].values[0]
        setGridW(Math.round(values[indexes["Grid"]]));
        setHomeW(Math.round(values[indexes["Consumption"]]));
        setSolarW(Math.round(values[indexes["Production"]]));
        setBatteryW(Math.round(values[indexes["Battery"]]));

        const BatteryData = await measurementApi.getBatteryPercentage(AccessToken, date, NodeIdList.batteryPercentageDataNodeId);
        const BattVal = BatteryData[0].values[0]

        setBatteryP(BattVal[1])
    }

    const GetQuickViewData = async (AccessToken, date) => {
        // const FoundFlowData = false

        const result = await measurementApi.getBarChartRevenueData(AccessToken, date, NodeIdList.currentFlowDataNodeId);
        let total = 0
        for (let index = 0; index < Object.keys(result).length; index++) {
            const element = parseFloat(result[index]['Fed to grid']) + parseFloat(result[index]['FirnController Profit']);
            total = total + parseFloat(element);
        }
        total = total.toFixed(2);
        setRevenueToday(total)

        const QuickViewdata = await measurementApi.getQuickViewData(AccessToken, date, NodeIdList.quickViewDataNodeId);
        const QuickViewDataValues = QuickViewdata[0].values[0]

        setYieldToday((QuickViewDataValues[1] / 1000).toFixed(1));
        setConsumptionToday((QuickViewDataValues[2] / 1000).toFixed(1));

        setfoundFlowData(true);
    }           

    const GetBarChartData = async (AccessToken, date) => {

        const result = await measurementApi.getBarChartData(AccessToken, date, NodeIdList.barChartDataNodeId);
        setBarChartData(result);
        
    }

    const requestBarChartData = async (dataToRequest) => {

        const date = new Date();

        if (dataToRequest === "BarChartConsumptionData") {
            const AccessToken = GetAccessToken();
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


            const result = await measurementApi.getBarChartData(AccessToken, date, NodeIdList.barChartDataNodeId);
            setBarChartData(result);
        } else if (dataToRequest === "BarChartBatteryData") {
            const AccessToken = GetAccessToken();
            const result = await measurementApi.getBatteryPercentageRange(AccessToken, date, NodeIdList.batteryPercentageDataNodeId);
            setBarChartData(result);
        } else if (dataToRequest === "BarChartRevenueData") {
            const AccessToken = GetAccessToken();
            const result = await measurementApi.getBarChartRevenueData(AccessToken, date, NodeIdList.currentFlowDataNodeId);
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