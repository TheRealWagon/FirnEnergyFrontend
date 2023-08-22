import axios from 'axios';

const baseURL = "https://authentication.eniris.be/";

const Measurement = () => {

    //currentFlowData
    const FlowData = async (accessToken, date) => {

        let day = date.getDate() + 4;
        let month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }

        let data = JSON.stringify([
            {
                "type": "previous",
                "time": [
                    `${year}-${month}-${day}T00:00:00Z`
                ],
                "retentionPolicy": "rp_one_m",
                "fields": [
                    "actualPowerTot_W",
                    "childrenConsumedPower_W",
                    "childrenProducedPower_W",
                    "childrenStoragePower_W"
                ],
                "measurement": "submeteringMetrics",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-Inepro-3-3"
                }
            }
        ]);

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            const response = await axios.post(corsProxy + config.url, data, config);
            return response.data; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }

    //QuickView Yield & Consumption
    const QuickViewData = async (accessToken, date) => {

        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }

        const yesterday = new Date(date)
        yesterday.setDate(yesterday.getDate() - 1)

        let yesterdayDay = yesterday.getDate();
        let yesterdayMonth = yesterday.getMonth() + 1;
        const yesterdayYear = yesterday.getFullYear();

        if (yesterdayDay < 10) {
            yesterdayDay = `0${yesterdayDay}`;
        }
        if (yesterdayMonth < 10) {
            yesterdayMonth = `0${yesterdayMonth}`;
        }

        let data = JSON.stringify([
            {
                "type": "range",
                "time": [
                    `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T22:00:00Z`,
                    `${year}-${month}-${day}T21:59:59Z`
                ],
                "operator": "sum",
                "retentionPolicy": "rp_ten_m",
                "fields": [
                    "sum_childrenProducedEnergyDeltaTot_Wh", //yield today
                    "sum_childrenConsumedEnergyDeltaTot_Wh" //Consumption today
                ],
                "measurement": "submeteringMetrics",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-Inepro-3-3"
                }
            }
        ]);
        //importedEnergyDeltaTot_Wh

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            const response = await axios.post(corsProxy + config.url, data, config);
            return response.data; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }

    //BarChart data Import / Production / Consumption / Self-Consumption
    const BarChartData = async (accessToken, date) => {

        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        const yesterday = new Date(date)
        yesterday.setDate(yesterday.getDate() - 1)

        let yesterdayDay = yesterday.getDate();
        let yesterdayMonth = yesterday.getMonth() + 1;
        const yesterdayYear = yesterday.getFullYear();

        if (yesterdayDay < 10) {
            yesterdayDay = `0${yesterdayDay}`;
        }
        if (yesterdayMonth < 10) {
            yesterdayMonth = `0${yesterdayMonth}`;
        }


        let data = JSON.stringify([
            {
                "type": "range",
                "time": [
                    `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T22:00:00Z`,
                    `${year}-${month}-${day}T21:59:59Z`
                ],
                "retentionPolicy": "rp_ten_m",
                "fields": [
                    "sum_childrenProducedEnergyDeltaTot_Wh",    //Solar Production
                    "sum_importedEnergyDeltaTot_Wh",            //Import from grid
                    "sum_childrenConsumedEnergyDeltaTot_Wh",    //Consumption
                    "sum_autoconsumedEnergyDeltaTot_Wh"         //Consumed from Solar Production
                ],
                "measurement": "submeteringMetrics",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-Inepro-3-3"
                }
            }
        ]);

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            const response = await axios.post(corsProxy + config.url, data, config);
            const temp = response['data'][0]['series'][0]['values'];
            let ProductionArray = []
            let ConsumptionArray = []
            let ConsumedFromPvArray = []
            let ImportFromGrid = []
            const result = []
            for (let index = 0; index < Object.keys(temp).length; index++) {
                const element = temp[index];
                ProductionArray[index] = [element[0], element[1]];
                ImportFromGrid[index] = [element[0], element[2]];
                ConsumptionArray[index] = [element[0], element[3]];
                ConsumedFromPvArray[index] = [element[0], element[4]];
            }
            ProductionArray = Sum_Per_Hour(ProductionArray)
            ImportFromGrid = Sum_Per_Hour(ImportFromGrid)
            ConsumptionArray = Sum_Per_Hour(ConsumptionArray)
            ConsumedFromPvArray = Sum_Per_Hour(ConsumedFromPvArray)
            for (let index = 0; index < Object.keys(ProductionArray).length; index++) {
                result[index] = { "Name": `${index}:00:00`, "Solar production": (ProductionArray[index] / 1000).toFixed(2), "Import from grid": (ImportFromGrid[index] / 1000).toFixed(2), "Consumption": (ConsumptionArray[index] / 1000).toFixed(2), "Consumed from PV": (ConsumedFromPvArray[index] / 1000).toFixed(2) }
            }
            return result; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }

    //QuickView Earnings per uur
    const QuickViewDataRevenue = async (accessToken, date) => {

        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }

        const yesterday = new Date(date)
        yesterday.setDate(yesterday.getDate() - 1)

        let yesterdayDay = yesterday.getDate();
        let yesterdayMonth = yesterday.getMonth() + 1;
        const yesterdayYear = yesterday.getFullYear();

        if (yesterdayDay < 10) {
            yesterdayDay = `0${yesterdayDay}`;
        }
        if (yesterdayMonth < 10) {
            yesterdayMonth = `0${yesterdayMonth}`;
        }

        let data = JSON.stringify([
            {
                "type": "range",
                "time": [
                    `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T22:00:00Z`,
                    `${year}-${month}-${day}T21:59:59Z`
                ],
                "retentionPolicy": "rp_ten_m",
                "fields": [
                    "sum_exportedEnergyDeltaTot_Wh" //Teruglevering net
                ],
                "measurement": "submeteringMetrics",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-Inepro-3-3"
                }
            }
        ]);

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            const response = await axios.post(corsProxy + config.url, data, config);
            //   console.log(response['data'][0]['series'][0]['values'])
            const result = Sum_Per_Hour(response['data'][0]['series'][0]['values']);
            const PriceData = await QuickViewDataPrice(accessToken, date);
            let Revenue = [];
            // let Revenue = 0;
            for (let index = 0; index < Object.keys(result).length; index++) {
                const multiplication = (result[index] / 1000) * PriceData[index][1];
                Revenue[index] = multiplication;
            }
            return Revenue;
            //   return response.data; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }

    
    const getBuyPrice = async (accessToken, date) => {

        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }

        const yesterday = new Date(date)
        yesterday.setDate(yesterday.getDate() - 1)

        let yesterdayDay = yesterday.getDate();
        let yesterdayMonth = yesterday.getMonth() + 1;
        const yesterdayYear = yesterday.getFullYear();

        if (yesterdayDay < 10) {
            yesterdayDay = `0${yesterdayDay}`;
        }
        if (yesterdayMonth < 10) {
            yesterdayMonth = `0${yesterdayMonth}`;
        }

        let data = JSON.stringify([
            {
                "type": "range",
                "time": [
                    `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T22:00:00Z`,
                    `${year}-${month}-${day}T21:59:59Z`
                ],
                "retentionPolicy": "rp_ten_m",
                "fields": [
                    "buyPrice_perkWh" //aankoop prijs
                ],
                "measurement": "planning",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-Inepro-3-3"
                }
            }
        ]);

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            const response = await axios.post(corsProxy + config.url, data, config);
            //   const result = Sum_Per_Hour(response)

            return response['data'][0]['series'][0]['values'];
            //   return response.data; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }
    //QuickView Earnings Hourly price
    const QuickViewDataPrice = async (accessToken, date) => {

        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }

        const yesterday = new Date(date)
        yesterday.setDate(yesterday.getDate() - 1)

        let yesterdayDay = yesterday.getDate();
        let yesterdayMonth = yesterday.getMonth() + 1;
        const yesterdayYear = yesterday.getFullYear();

        if (yesterdayDay < 10) {
            yesterdayDay = `0${yesterdayDay}`;
        }
        if (yesterdayMonth < 10) {
            yesterdayMonth = `0${yesterdayMonth}`;
        }

        let data = JSON.stringify([
            {
                "type": "range",
                "time": [
                    `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T22:00:00Z`,
                    `${year}-${month}-${day}T21:59:59Z`
                ],
                "retentionPolicy": "rp_ten_m",
                "fields": [
                    "sellPrice_perkWh" //verkoop prijs
                ],
                "measurement": "planning",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-Inepro-3-3"
                }
            }
        ]);

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            const response = await axios.post(corsProxy + config.url, data, config);
            //   const result = Sum_Per_Hour(response)
            return response['data'][0]['series'][0]['values'];
            //   return response.data; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }

    //BarChartRevenue
    const BarChartRevenueData = async (accessToken, date) => {
        
        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();
        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }

        const yesterday = new Date(date)
        yesterday.setDate(yesterday.getDate() - 1)

        let yesterdayDay = yesterday.getDate();
        let yesterdayMonth = yesterday.getMonth() + 1;
        const yesterdayYear = yesterday.getFullYear();

        if (yesterdayDay < 10) {
            yesterdayDay = `0${yesterdayDay}`;
        }
        if (yesterdayMonth < 10) {
            yesterdayMonth = `0${yesterdayMonth}`;
        }

        let data = JSON.stringify([
            {
                "type": "range",
                "time": [
                    `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T22:00:00Z`,
                    `${year}-${month}-${day}T21:59:59Z`
                ],
                "retentionPolicy": "rp_ten_m",
                "fields": [
                    "buyPrice_perkWh" //aankoop prijs
                ],
                "measurement": "planning",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-Inepro-3-3"
                }
            }
        ]);

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            
            const BuyPricePerHourContainer = await axios.post(corsProxy + config.url, data, config);
            const BuyPricePerHour = BuyPricePerHourContainer['data'][0]['series'][0]['values'];
            const variablePricePerHour = 0.26
            const EarningsPerHour = await QuickViewDataRevenue(accessToken, date);
            const ImportAndConsumptionContainer = await getImportAndConsumption(accessToken, date);
            const ImportAndConsumption = ImportAndConsumptionContainer['data'][0]['series'][0]['values'];

            let ImportPerHour = [];
            let ConsumptionPerHour = [];

            for (let index = 0; index < Object.keys(ImportAndConsumption).length; index++) {
                const element = ImportAndConsumption[index];
                ImportPerHour[index] = [element[0], element[1] / 1000];
                ConsumptionPerHour[index] = [element[0], element[2] / 1000];
            }

            ImportPerHour = Sum_Per_Hour(ImportPerHour);
            ConsumptionPerHour = Sum_Per_Hour(ConsumptionPerHour);

            const RevenuePerHour = []

            for (let index = 0; index < Object.keys(ConsumptionPerHour).length; index++) {
                RevenuePerHour[index] = {"Name": `${index}:00:00`, "Fed to grid": (EarningsPerHour[index]).toFixed(2), "FirnController Profit": ((ConsumptionPerHour[index] * variablePricePerHour) - (ImportPerHour[index] * BuyPricePerHour[index][1])).toFixed(2)};
            }

            return RevenuePerHour;
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }


    //Battery Percentage
    const BatteryPercentage = async (accessToken, date) => {

        let day = date.getDate() + 4;
        let month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }

        let data = JSON.stringify([
            {
                "type": "previous",
                "time": [
                    `${year}-${month}-${day}T01:00:00Z`
                ],
                "retentionPolicy": "rp_one_m",
                "fields": [
                    "stateOfCharge_frac"
                ],
                "measurement": "batteryMetrics",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-10-GoodWe-GW10K-BT-9010KBTU225W0011-BatteryInput1"
                }
            }
        ]);

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            const response = await axios.post(corsProxy + config.url, data, config);
            return response.data; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }


    const BatteryPercentageRange = async (accessToken, date) => {

        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }

        const yesterday = new Date(date)
        yesterday.setDate(yesterday.getDate() - 1)

        let yesterdayDay = yesterday.getDate();
        let yesterdayMonth = yesterday.getMonth() + 1;
        const yesterdayYear = yesterday.getFullYear();

        if (yesterdayDay < 10) {
            yesterdayDay = `0${yesterdayDay}`;
        }
        if (yesterdayMonth < 10) {
            yesterdayMonth = `0${yesterdayMonth}`;
        }

        let data = JSON.stringify([
            {
                "type": "range",
                "time": [
                    `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T22:00:00Z`,
                    `${year}-${month}-${day}T21:59:59Z`
                ],
                "retentionPolicy": "rp_one_m",
                "fields": [
                    "stateOfCharge_frac"
                ],
                "measurement": "batteryMetrics",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-10-GoodWe-GW10K-BT-9010KBTU225W0011-BatteryInput1"
                }
            }
        ]);

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            const response = await axios.post(corsProxy + config.url, data, config);
            const result = response.data[0]['series'][0]['values']
            const endArray = []
            for (let index = 0; index < Object.keys(result).length; index++) {
                if (result[index][1] >= 0.2) {
                    result[index][1] = Math.floor(result[index][1] * 100)
                } else {
                    result[index][1] = 20
                }
                let time = result[index][0].split('T')[1]
                time = time.split('.')[0];
                let hour = time.split(':')[0]
                hour = parseInt(hour)
                if (hour >= 22) {
                    hour = hour - 22
                } else {
                    hour = hour + 2
                }
                time = `${hour}:${time.split(':')[1]}:${time.split(':')[2]}`
                endArray[index] = { "Name": `${time}`, "Battery percentage": result[index][1] };
            }
            return endArray; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }

    }

    // Function to sum up all data into 1 hour segments
    const Sum_Per_Hour = (data) => {

        let checkNumber = 22;
        let sum = 0;
        let result = [];
        let plan = 0
        for (let index = 0; index < Object.keys(data).length; index++) {
            const element = data[index];
            const time = element[0].split('T')[1]

            const timecheck = parseInt(time.split(':')[0]);
            if (checkNumber === 24) {
                checkNumber = 0;
            }
            if (timecheck === checkNumber) {
                sum = sum + element[1];
            } else {
                result[plan] = sum
                checkNumber++;
                plan++;
                index--;
                sum = 0;
            }
            if (index + 1 === Object.keys(data).length) {
                result[plan] = sum
                checkNumber++;
                sum = 0;
            }
        }
        return result;

    }

    const getImportAndConsumption = async (accessToken, date) => {

        let day = date.getDate();
        let month = date.getMonth() + 1;
        const year = date.getFullYear();

        if (day < 10) {
            day = `0${day}`;
        }
        if (month < 10) {
            month = `0${month}`;
        }
        const yesterday = new Date(date)
        yesterday.setDate(yesterday.getDate() - 1)

        let yesterdayDay = yesterday.getDate();
        let yesterdayMonth = yesterday.getMonth() + 1;
        const yesterdayYear = yesterday.getFullYear();

        if (yesterdayDay < 10) {
            yesterdayDay = `0${yesterdayDay}`;
        }
        if (yesterdayMonth < 10) {
            yesterdayMonth = `0${yesterdayMonth}`;
        }


        let data = JSON.stringify([
            {
                "type": "range",
                "time": [
                    `${yesterdayYear}-${yesterdayMonth}-${yesterdayDay}T22:00:00Z`,
                    `${year}-${month}-${day}T21:59:59Z`
                ],
                "retentionPolicy": "rp_ten_m",
                "fields": [   
                    "sum_importedEnergyDeltaTot_Wh",            //Import from grid
                    "sum_childrenConsumedEnergyDeltaTot_Wh"    //Consumption
                ],
                "measurement": "submeteringMetrics",
                "conditions": {
                    "nodeId": "dIViYcFwFkSSGRZV-Inepro-3-3"
                }
            }
        ]);

        const corsProxy = 'https://thingproxy.freeboard.io/fetch/';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'https://middleware-new.eniris.be/v1/influx/get-measurement-data',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            data: data
        };

        try {
            const response = await axios.post(corsProxy + config.url, data, config);

            return response; // Return the data after successful response
        } catch (error) {
            console.log(error);
            throw error; // Rethrow the error to handle it in HandleLoginEvent if needed
        }
    }

    return {
        FlowData,
        BatteryPercentage,
        QuickViewDataRevenue,
        QuickViewData,
        BarChartData,
        BatteryPercentageRange,
        getBuyPrice,
        getImportAndConsumption,
        BarChartRevenueData,
    }


}

export default Measurement;