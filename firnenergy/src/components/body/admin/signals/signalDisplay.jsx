import { useEffect, useState } from "react"
import './signalDisplay.css'

import Measurement from '../../../../api/measurements';
import loaderGIF from '../../../../Images/firn-embleem-animation.gif';

const SignalDisplay = () => {

    const measurementApi = Measurement();

    const [loading, setLoading] = useState(false);

    const [serialNr, setSerialNr] = useState(null);
    const [nodeId, setNodeId] = useState(null);
    const [powerSetpoint, setPowerSetpoint] = useState("");
    const [policy, setPolicy] = useState("");
    const [body, setBody] = useState("");
    const [signalSet, setSignalSet] = useState(false);
    const [hasSerialNrAndNodeId, setHasSerialNrAndNodeId] = useState(false);
    const [Signals, setSignals] = useState([]);
    const [Message, setMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const [droppedText, setDroppedText] = useState('');

    const handleSetSignal = (event) => {
        event.preventDefault();
        var { serialNr, nodeId } = document.forms[0];

        setSerialNr(serialNr.value);
        setNodeId(nodeId.value);

    }

    const handleSendSignals = async () => {
        setLoading(true);
        setIsError(false);
        let response = "";
        try {
            const accessToken = localStorage.getItem('jwtToken');
            response = await measurementApi.setSignal(accessToken, serialNr, nodeId, Signals);

            setLoading(false)
        } catch (error) {
            setIsError(true);
            setLoading(false);
        }

        setMessage(response);
            
        // setLoading(false)
    }

    const handleSetExtraData = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const datum = formData.get("datum");
        const power = formData.get("power");
        const policy = formData.get("policy");

        const dateObject = new Date(datum);
        dateObject.setHours(dateObject.getHours());
        const year = dateObject.getFullYear();
        const month = dateObject.getMonth() + 1; // Adding 1 to adjust for 0-based months
        const day = dateObject.getDate();
        const hour = dateObject.getHours();
        const minute = dateObject.getMinutes();
        const arr = {'Year': year, 'Month': month, 'Day': day, 'Hour': hour, 'Minutes': minute, 'Seconds': 0, 'Power': power, 'Policy': policy}

        setSignals((Signals) => [...Signals, arr]);

        //make api call

        // 
    }

    const handleSetSignalsViaTextArea = () => {

        try {
            const pieces = droppedText.split('},{');

            const formattedPieces = pieces.map((piece) => {
                // Remove the braces at the beginning and end of each piece
                piece = piece.replace('{', '').replace('}', '');
                // Split the piece by comma to get individual data points
                const dataPoints = piece.split(',');
                return dataPoints;
            });
    
            for (let index = 0; index < formattedPieces.length; index++) {
                const element = formattedPieces[index];
    
                const [day, month, year] = element[0].split('/').map(Number);
                const [hours, minutes, seconds] = element[1].split(':').map(Number);
    
                const dateObject = new Date(year, month - 1, day, hours, minutes, seconds);
                //herrekening
                dateObject.setHours(dateObject.getHours());
    
                const arr = {'Year': dateObject.getFullYear(), 'Month': dateObject.getMonth() + 1, 'Day': dateObject.getDate(), 'Hour': dateObject.getHours(), 'Minutes': dateObject.getMinutes(), 'Seconds': dateObject.getSeconds(), 'Power': element[2], 'Policy': element[3]}
                setSignals((Signals) => [...Signals, arr]);
            }
        }catch(error) {
            console.log(error)
        }
        

        
    }

    const handleRemoveSelectedSignals = async (event) => {
        event.preventDefault();

        const formData = new FormData(event.target);
        const removenumber = formData.get("removenumber") - 1;

        let array = [...Signals];

        if (removenumber >= 0 && removenumber < array.length) {
            array.splice(removenumber, 1); // Removing the element at the specified index
            setSignals(array); // Setting the updated array in state
        } else {
            // Handle the case where the index is out of range
            console.error("Invalid index for removal");
        }
    }

    useEffect(() => {
        if (serialNr != null && nodeId != null) {
            setHasSerialNrAndNodeId(true);
        }
    }, [serialNr, nodeId])

    const handleRemoveAllSignals = () => {
        setSignals([])
    }

    

    return (
        <>
            <div>
                {loading ? (<div className='overlay block-interactions'><div className="loading-container"><img className='loading-gif' src={loaderGIF} alt="" /></div></div>) : <></> }
                {hasSerialNrAndNodeId ? 
                    <div>
                        <div>SerialNr: {serialNr}</div>
                        <div>NodeId: {nodeId}</div>
                        <div>-------------------------------</div>
                        <div className="SignalInput">
                            <div style={{marginRight: "100px"}}>
                                <form className="SignalInputForm" onSubmit={handleSetExtraData}>
                                    <div>
                                        {/* <label >Jaar: </label>
                                        <input type="text" name="year" required />
                                        <label >Maand: </label>
                                        <input type="text" name="month" required />
                                        <label >Dag: </label>
                                        <input type="text" name="day" required /> */}
                                        <input
                                            className="SignalInputFields"
                                            type="datetime-local"
                                            name="datum" // make sure this is set to "datum"
                                            required
                                        />
                                        (Kies een tijd UTC+2)
                                    </div>
                                    <div >
                                        {/* <label >Uur: </label>
                                        <input type="text" name="hour" required />
                                        <label >Minuten: </label>
                                        <input type="text" name="min" required />
                                        <label >Seconden: </label>
                                        <input type="text" name="sec" required /> */}
                                    </div>
                                    <div >
                                        <label >PowerSetPoint_W</label>
                                        <input className="SignalInputFields" type="text" name="power" required />
                                    </div>
                                    <div >
                                        <label >Policy</label>
                                        <input className="SignalInputFields" type="text" name="policy" required />
                                    </div>
                                    <button type="submit" className="Signalsbtn btn-color-green">Add Signal</button>
                                </form>
                            </div>
                            <div style={{display: "flex", flexFlow: "column"}}>
                                <textarea
                                    style={{width: "600px", height: "100px"}}
                                    value={droppedText}
                                    onChange={(e) => setDroppedText(e.target.value)}
                                />
                                <button onClick={handleSetSignalsViaTextArea} className="Signalsbtn btn-color-green" type="submit">Add Signals via text</button>
                                <div>format:
                                    <p>&#123;20/11/2023,20:00:00,4000,2&#125;,&#123;20/11/2023,21:00:00,0,1&#125;,&#123;20/11/2023,22:00:00,2000,2&#125;</p>
                                    <p>&#123;dd/mm/yyyy,hh:mm:ss,SetPoint,Policy&#125;</p>
                                </div>
                            </div>
                            
                            
                        </div>
                        <div>
                            <button className="Signalsbtn btn-color-red" onClick={handleRemoveAllSignals}>Remove all Signals</button>
                            <br />
                            <form onSubmit={handleRemoveSelectedSignals}>
                                <button type="submit" className="Signalsbtn btn-color-red">Remove Signal</button>
                                <input type="number" name="removenumber"/>
                            </form>
                            
                        </div>
                        
                        <div className="SignalDisplay" style={{paddingLeft: 15}}>{`Signals: [`}{Signals.map((signal, index) => 
                            <div key={index} className="SignalDisplay" style={{paddingLeft: 15}}>{`{ date: ${signal.Day}/${signal.Month}/${signal.Year} tijd: ${signal.Hour}:${signal.Minutes}:${signal.Seconds}, powerSetPoint_W: ${signal.Power}, policy: ${signal.Policy} }`}</div>
                        )}
                        {`]`}</div>
                        <button onClick={handleSendSignals}>Send Signals to Battery</button>
                        <div className={isError ? "message-color-red" : "message-color-green"}>{Message}</div>
                    </div>
                : 
                    <form onSubmit={handleSetSignal}>
                        <div >
                            <label style={{marginRight: 15}}>serialNr:</label>
                            <input type="text" name="serialNr" required />
                        </div>
                        <div >
                            <label style={{marginRight: 22}}>nodeId:</label>
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