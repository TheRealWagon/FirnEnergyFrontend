import { useEffect, useState } from "react"

import Measurement from '../../../../api/measurements';

const SignalDisplay = () => {

    const measurementApi = Measurement();

    const [serialNr, setSerialNr] = useState(null);
    const [nodeId, setNodeId] = useState(null);
    const [powerSetpoint, setPowerSetpoint] = useState("");
    const [policy, setPolicy] = useState("");
    const [body, setBody] = useState("");
    const [signalSet, setSignalSet] = useState(false);
    const [hasSerialNrAndNodeId, setHasSerialNrAndNodeId] = useState(false);
    const [Signals, setSignals] = useState([]);

    const handleSetSignal = (event) => {
        event.preventDefault();
        var { serialNr, nodeId } = document.forms[0];

        setSerialNr(serialNr.value);
        setNodeId(nodeId.value);

    }

    const handleSendSignals = async () => {
        const accessToken = localStorage.getItem('jwtToken');
        const response = await measurementApi.setSignal(accessToken, serialNr, nodeId, Signals);
        console.log(response);
    }

    const handleSetExtraData = async (event) => {
        event.preventDefault();

        var {year, month, day, hour, min, sec, power, policy} = document.forms[0];

        const arr = {'Year': year.value, 'Month': month.value, 'Day': day.value, 'Hour': hour.value, 'Minutes': min.value, 'Seconds': sec.value, 'Power': power.value, 'Policy': policy.value}

        setSignals((Signals) => [...Signals, arr]);

        //make api call

        // 
    }

    useEffect(() => {
        if (serialNr != null && nodeId != null) {
            setHasSerialNrAndNodeId(true);
        }
    }, [serialNr, nodeId])


    return (
        <>
            <div>
                {hasSerialNrAndNodeId ? 
                    <div>
                        <div>SerialNr: {serialNr}</div>
                        <div>NodeId: {nodeId}</div>
                        <div>-------------------------------</div>
                        <form onSubmit={handleSetExtraData}>
                            <div >
                                <label >Jaar: </label>
                                <input type="text" name="year" required />
                                <label >Maand: </label>
                                <input type="text" name="month" required />
                                <label >Dag: </label>
                                <input type="text" name="day" required />
                            </div>
                            <div >
                                <label >Uur: </label>
                                <input type="text" name="hour" required />
                                <label >Minuten: </label>
                                <input type="text" name="min" required />
                                <label >Seconden: </label>
                                <input type="text" name="sec" required />
                            </div>
                            <div >
                                <label >powerSetPoint_W</label>
                                <input type="text" name="power" required />
                            </div>
                            <div >
                                <label >policy</label>
                                <input type="text" name="policy" required />
                            </div>
                            <button type="submit">Add Signal</button>
                        </form>
                        <div style={{paddingLeft: 15}}>{`Signals: [`}{Signals.map((signal, index) => 
                            <div style={{paddingLeft: 15}}>{`{ date: ${signal.Day}/${signal.Month}/${signal.Year} tijd: ${signal.Hour}:${signal.Minutes}:${signal.Seconds}, powerSetPoint_W: ${signal.Power}, policy: ${signal.Policy} }`}</div>
                        )}
                        {`]`}</div>
                        <button onClick={handleSendSignals}>Send Signals to Battery</button>
                    </div>
                : 
                    <form onSubmit={handleSetSignal}>
                        <div >
                            <label >serialNr</label>
                            <input type="text" name="serialNr" required />
                        </div>
                        <div >
                            <label >nodeId</label>
                            <input type="text" name="nodeId" required />
                        </div>
                        <button type="submit">Set Signal</button>
                    </form>
                }
                
            </div>
        </>


    )
    
}


export default SignalDisplay