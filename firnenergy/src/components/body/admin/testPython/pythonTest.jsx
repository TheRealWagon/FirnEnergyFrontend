import Measurement from '../../../../api/measurements';





const PythonTest = () => {


    const measurementApi = Measurement();

    const runPython = async () => {
        await measurementApi.testPython();
    }

    return (
        <>
            <button onClick={runPython}>Test python</button>
        </>
    )
}

export default PythonTest;