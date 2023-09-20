import React, { useEffect, useState } from "react";
import './charts.css'
import {
    ResponsiveContainer,
    AreaChart,
    BarChart,
    Legend,
    Bar,
    XAxis,
    YAxis,
    Area,
    Tooltip,
    CartesianGrid,
    ReferenceDot,
} from "recharts";
import './charts.css';

const Charts = ({Data, darkMode, requestBarChartData, ToggleLoading}) => {
    const [data, setData] = useState();
    const [showSolarProd, setShowSolarProd] = useState(true);
    const [showConsumption, setShowConsumption] = useState(true);
    const [showImportFromGrid, setShowImportFromGrid] = useState(true);
    const [showConsumedFromPv, setShowConsumedFromPv] = useState(true);
    const [axisColors, setAxisColors] = useState("black");
    const [toolTipStyle, setToolTipStyle] = useState("black");
    const [legendStyle, setLegendStyle] = useState();
    const [activeHeader, setActiveHeader] = useState("ConsumptionProduction");
    const [ConsumptionProductionHeaderStyle, setConsumptionProductionHeaderStyle] = useState(true);
    const [BatteryStyle, setBatteryStyle] = useState(false);
    const [RevenueStyle, setRevenueStyle] = useState(false);
    const [dayStyle, setDayStyle] = useState(true);
    const [monthStyle, setMonthStyle] = useState(false);
    const [yearStyle, setYearStyle] = useState(false);
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [actualDate, setActualDate] = useState(new Date());
    const [allowRightArrow, setAllowRightArrow] = useState(false);
    const arr = {"SolarProd": setShowSolarProd, "Consumed": setShowConsumption, "Import": setShowImportFromGrid, "FromPv": setShowConsumedFromPv}

    //Updates the data if changed
    useEffect(() => {

        setData(Data)

    }, [Data])
    
    //hides the bar by clicking on the legend
    const ShowOrHideData = (val) => {
        const methode = arr[val['payload'].id]
        methode(val.inactive);
    }

    //checks for darkmode
    useEffect(() => {

        darkMode ? setAxisColors("white") : setAxisColors("black");
        darkMode ? setToolTipStyle({borderRadius: "25px", color: "white", backgroundColor: "#181A18", border: "solid white 1px"}) : setToolTipStyle({borderRadius: "25px"});

        // darkMode ? setLegendStyle({color: "white"}) : setLegendStyle({color: "black"});

    }, [darkMode]);

    //checks for darkmode and applies styles
    const LegendStyle = (entry) => {

        if (entry.inactive) {   
            if (darkMode) {
                return({color: "white", opacity: "0.5"})
            } else {
                return({color: "black", opacity: "0.5"})
            }
        } else {
            if (darkMode) {
                return( {color: "white"});
            } else {
                return( {color: "black"});
            }
        }
        
    }   

    //this is the tooltip constructor
    const CustomConsumptionToolTip = ({ active, payload, label}) => {

        const colors = {"SolarProd": ["#ff8057", "#ffd17f"], "Consumed": ["#c069e4", "#6c32fb"], "Import": ["#f46286", "#ec2871"], "FromPv": ["#06d3ba", "#189cd8"], "BatteryPercent": ["#8ad7b2", "#22df83"], "FedToGrid": ["#06d3ba", "#189cd8"], "FirnControllerProfit": ["#020024", "#090979"]}
        const parentStyle = darkMode? {borderRadius: "25px", color: "white", backgroundColor: "#181A18", border: "solid white 2px", padding: "5px 10px 15px 15px"} : {background: "white", borderRadius: "25px", padding: "5px 10px 15px 15px", border: "black solid 2px"}
        if (active && payload && payload.length) {
            return (
                <div style={parentStyle}>
                    <p>{label}</p>
                    {payload.map((item) => <div style={{padding: "3px 0px",display: "flex", flexFlow: "row nowrap", alignItems: "center"}}><div style={{width: "15px", height: "15px", marginLeft: "-5px", marginRight: "5px", borderRadius: "50%", background: `linear-gradient(0deg, ${colors[item.id][0]}, ${colors[item.id][1]})`}}></div><div style={{width: '165px'}}>{item.dataKey}:</div><div>{item.value}</div><div>{item.unit}</div></div>)}
                </div>
            )
        }
    }

    
    useEffect(() => {

        if (dayStyle) {
            setDate(new Date().toISOString().split('T')[0]);
            setActualDate(new Date());
        } else if (monthStyle) {
            const newDate = (new Date().toISOString().split('T')[0]).split("-");
            setDate(`${newDate[0]}-${newDate[1]}`);
            setActualDate(new Date());
        } else {
            const newDate = (new Date().toISOString().split('T')[0]).split("-");
            setDate(`${newDate[0]}`);
            setActualDate(new Date());
        }

    }, [dayStyle, monthStyle, yearStyle])


    //see which header is active and activate the correct graph and request correct data
    const ConsumptionProductionClick = async () => {
        ToggleLoading(true)
        setConsumptionProductionHeaderStyle(true)
        setBatteryStyle(false)
        setRevenueStyle(false)

        //request consumptiondata
        await requestBarChartData("BarChartConsumptionData");
        ToggleLoading(false)
    }
    const BatteryClick = async () => {
        ToggleLoading(true)
        setConsumptionProductionHeaderStyle(false)
        setBatteryStyle(true)
        setRevenueStyle(false)
        
        //request battery data
        await requestBarChartData("BarChartBatteryData");
        ToggleLoading(false)
    }
    const RevenueClick = async () => {
        ToggleLoading(true)
        setConsumptionProductionHeaderStyle(false)
        setBatteryStyle(false)
        setRevenueStyle(true)

        //request revenue data
        await requestBarChartData("BarChartRevenueData");
        ToggleLoading(false)
    }
    const DayClick = async() => {
        ToggleLoading(true)

        setDayStyle(true)
        setMonthStyle(false)
        setYearStyle(false)

        //request data for day actualdate

        if (ConsumptionProductionHeaderStyle) {
            await requestBarChartData("BarChartConsumptionData");
        } else if (BatteryStyle) {
            await requestBarChartData("BarChartBatteryData");
        } else {
            await requestBarChartData("BarChartRevenueData");
        }

        

        ToggleLoading(false)
    }
    const MonthClick = () => {
        ToggleLoading(true)

        setDayStyle(false)
        setMonthStyle(true)
        setYearStyle(false)


        //request data per day actualdate

        ToggleLoading(false)
    }
    const YearClick = () => {
        ToggleLoading(true)

        setDayStyle(false)
        setMonthStyle(false)
        setYearStyle(true)

        //request data per month actualdate


        ToggleLoading(false)
    }
    const HandleBeforeClick = () => {

        if (dayStyle) {
            let newDate = actualDate;
            newDate.setDate(newDate.getDate() - 1);

            setDate(newDate.toISOString().split('T')[0]);
            setActualDate(newDate);
            setAllowRightArrow(true);

            //request data



        } else if (monthStyle) {
            let newDate = actualDate;
            newDate.setMonth(newDate.getMonth() - 1);

            const tempDate = (newDate.toISOString().split('T')[0]).split("-");
            setDate(`${tempDate[0]}-${tempDate[1]}`);
            setActualDate(newDate);
            setAllowRightArrow(true);
        } else {
            let newDate = actualDate;
            newDate.setFullYear(newDate.getFullYear() - 1);

            const tempDate = (newDate.toISOString().split('T')[0]).split("-");
            setDate(`${tempDate[0]}`);
            setActualDate(newDate);
            setAllowRightArrow(true);
        }

    }
    const HandleAfterClick = () => {

        if (allowRightArrow) {
            if (dayStyle) {
                const todayDate = new Date();
                let newDate = actualDate;
                newDate.setDate(newDate.getDate() + 1);
    
                setDate(newDate.toISOString().split('T')[0])
                setActualDate(newDate);

                if (newDate.getDate() === todayDate.getDate() && newDate.getMonth() === todayDate.getMonth() && newDate.getFullYear() === todayDate.getFullYear()) {
                    setAllowRightArrow(false);
                }
            } else if (monthStyle) {
                const todayDate = new Date();
                let newDate = actualDate;
                newDate.setMonth(newDate.getMonth() + 1);
    
                const tempDate = (newDate.toISOString().split('T')[0]).split("-");
                setDate(`${tempDate[0]}-${tempDate[1]}`);
                setActualDate(newDate);

                if (newDate.getMonth() === todayDate.getMonth() && newDate.getFullYear() === todayDate.getFullYear()) {
                    setAllowRightArrow(false);
                }
            } else {
                const todayDate = new Date();
                let newDate = actualDate;
                newDate.setFullYear(newDate.getFullYear() + 1);
    
                const tempDate = (newDate.toISOString().split('T')[0]).split("-");
                setDate(`${tempDate[0]}`);
                setActualDate(newDate);

                if (newDate.getFullYear() === todayDate.getFullYear()) {
                    setAllowRightArrow(false);
                }
            }
        }

    }


    return (
        <div className="Graphs">
            <div className="Graph-Headers">
                <button className="Graph-Title" onClick={ConsumptionProductionClick}><div className={ConsumptionProductionHeaderStyle ? "activeCons" : "inactiveCons"}>Consumption & Production</div></button>
                <button className="Graph-Title" onClick={BatteryClick}><div className={BatteryStyle ? "activeBattery" : "inactiveBattery"}>Battery</div></button>
                <button className="Graph-Title" onClick={RevenueClick}><div className={RevenueStyle ? "activeRevenue" : "inactiveRevenue"}>Revenue</div></button>
                <div className="TimeFrame-Container">
                    <div className="TimePeriodButtons"><button onClick={DayClick} style={dayStyle ? {backgroundColor: "#007dff", color:"white"} : {}}>Day</button><button onClick={MonthClick} style={monthStyle ? {backgroundColor: "#007dff", color:"white"} : {}} id="TimeFrame-Button-Middle">Month</button><button onClick={YearClick} style={yearStyle ? {backgroundColor: "#007dff", color:"white"} : {}}>Year</button></div>
                    <div className="TimeFrame-Time"><button onClick={HandleBeforeClick} className="TimeFrame-Time-Arrow Time-Frame-Time-Arrow-Left">{"<"}</button><button className="TimeFrame-Time-TimeDisplay">{date}</button><button onClick={HandleAfterClick} style={allowRightArrow ? {} : {opacity: 0.5, cursor: "default"}} className="TimeFrame-Time-Arrow Time-Frame-Time-Arrow-Right">{">"}</button></div>
                </div>
            </div>
            {/* ConsumptionAndProduction Chart */}
            {ConsumptionProductionHeaderStyle ? 
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart width={730} height={250} data={data}>
                    <defs>
                        <linearGradient id={`SolarProductionColor`} x1='0' y1='0' x2='0' y2='100%' spreadMethod='reflect'>
                            <stop offset='0' stopColor='#ffd17f' />
                            <stop offset='1' stopColor='#ff8057' />
                        </linearGradient>
                        <linearGradient id={`ConsumptionColor`} x1='0' y1='0' x2='0' y2='100%' spreadMethod='reflect'>
                            <stop offset='0' stopColor='#c069e4' />
                            <stop offset='1' stopColor='#6c32fb' />
                        </linearGradient>
                        <linearGradient id={`ImportFromGridColor`} x1='0' y1='0' x2='0' y2='100%' spreadMethod='reflect'>
                            <stop offset='0' stopColor='#f46286' />
                            <stop offset='1' stopColor='#ec2871' />
                        </linearGradient>
                        <linearGradient id={`ConsumedFromPV`} x1='0' y1='0' x2='0' y2='100%' spreadMethod='reflect'>
                            <stop offset='0' stopColor='#06d3ba' />
                            <stop offset='1' stopColor='#189cd8' />
                        </linearGradient>
                    </defs>
                        <CartesianGrid strokeDasharray="0 0" />
                        <XAxis interval={1} dataKey="Name" stroke={axisColors}/>
                        <YAxis unit={"kWh"} scale={"linear"} tickFormatter={(value) => value.toFixed(0)} interval={1} stroke={axisColors}/>
                        <Tooltip contentStyle={toolTipStyle} isAnimationActive={true} content={<CustomConsumptionToolTip/>}/>
                        <Legend onClick={(value) => ShowOrHideData(value)} formatter={(value, entry, index) => <span style={LegendStyle(entry)}>{value}</span>}/>
                        <Bar id="SolarProd" dataKey="Solar production" fill={`url(#SolarProductionColor)`} legendType="circle" unit={"kWh"} hide={showSolarProd ? false : true}/>
                        <Bar id="Consumed" dataKey="Consumption" fill={`url(#ConsumptionColor)`} legendType="circle" unit={"kWh"} hide={showConsumption ? false : true}/>
                        <Bar id="Import" dataKey="Import from grid" fill={`url(#ImportFromGridColor)`} legendType="circle" unit={"kWh"} hide={showImportFromGrid ? false : true}/>
                        <Bar id="FromPv" dataKey="Consumed from PV" fill={`url(#ConsumedFromPV)`} legendType="circle" unit={"kWh"} hide={showConsumedFromPv ? false : true}/>
                    </BarChart>
                </ResponsiveContainer>
            : <></>}
            {/* BatteryChart */}
            {BatteryStyle ? 
                <ResponsiveContainer width="100%" height={300}>
                    <AreaChart width={730} height={250} data={data}>
                    <defs>
                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8ad7b2" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#22df83" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Name" stroke={axisColors} tickFormatter={(value) => `${value.split(":")[0]}:00:00`} interval={50}/>
                        <YAxis stroke={axisColors} unit={"%"} />
                        <Tooltip content={<CustomConsumptionToolTip/>}/>
                        <Legend iconType="plainline" />
                        <Area id="BatteryPercent" type={"monotone"} dataKey="Battery percentage" stroke="#22df83" fillOpacity={1} unit={"%"} legendType="circle" fill="url(#colorUv)"/>
                        {/* hide={showSolarProd ? false : true} */}
                    </AreaChart>
                </ResponsiveContainer>
            : <></>}
            {RevenueStyle ? 
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart width={730} height={250} data={data}>
                    <defs>
                        <linearGradient id={`FedToGridColor`} x1='0' y1='0' x2='0' y2='100%' spreadMethod='reflect'>
                            <stop offset='0' stopColor='#06d3ba' />
                            <stop offset='1' stopColor='#189cd8' />
                        </linearGradient>
                        <linearGradient id={`FirnControllerProfitColor`} x1='0' y1='0' x2='0' y2='100%' spreadMethod='reflect'>
                            <stop offset='0' stopColor='#0e578b' />
                            <stop offset='1' stopColor='#189cd8' />
                        </linearGradient>
                    </defs>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="Name" stroke={axisColors} interval={1}/>
                        <YAxis unit={"€"} stroke={axisColors}/>
                        <Tooltip contentStyle={toolTipStyle} isAnimationActive={true} content={<CustomConsumptionToolTip/>}/>
                        <Legend iconType="circle"/>
                        <Bar id="FedToGrid" stackId={'a'} unit={'€'} dataKey="Fed to grid" fill={`url(#FedToGridColor)`} />
                        <Bar id="FirnControllerProfit" stackId={'a'} unit={'€'} dataKey="FirnController Profit" fill={`url(#FirnControllerProfitColor)`} />
                    </BarChart>
                </ResponsiveContainer>
            : <></>}
        </div>
    )
}

// 
export default Charts;