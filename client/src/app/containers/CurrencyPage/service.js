import * as d3pie from "d3pie";
import * as d3 from "d3";

export function sortData(dataInfo) {
    dataInfo.sort((a, b) => {
        if (a.destinationCurrency < b.destinationCurrency) {
            return -1;
        }
        if (a.destinationCurrency > b.destinationCurrency) {
            return 1;
        }
        return 0;
    });
    return dataInfo;
}

export function calculateFullAmountInUSD(arr) {
    const a = [];
    const b = [];
    let prev = null;

    for (let i = 0; i < arr.length; i++) {
        const compare = prev !== null ? prev.destinationCurrency : '';
        if (arr[i].destinationCurrency !== compare) {
            debugger;
            a.push(arr[i].destinationCurrency);
            b.push(arr[i].usdValue);
        } else {
            if (b[b.length - 1]) {
                b[b.length - 1] = b[b.length - 1] + arr[i].usdValue;
            }
        }
        prev = arr[i];
    }
    let counter = 0;
    const fullAmount = [];
    for (let i = 0; i < b.length; i++) {
        fullAmount.push({
            destinationCurrency: a[i],
            frequency: b[i]
        });
        counter = counter + b[i];
    }
    return { fullAmount, counter };
}


export function countItemFrequency(arr) {
    const a = [];
    const b = [];
    let prev = null;

    for (let i = 0; i < arr.length; i++) {
        const compare = prev !== null ? prev.destinationCurrency : '';
        if (arr[i].destinationCurrency !== compare) {
            a.push(arr[i].destinationCurrency);
            b.push(1);

        } else {
            if (b[b.length - 1]) {
                b[b.length - 1]++;
            }
        }
        prev = arr[i];
    }
    const frequencyArray = [];
    for (let i = 0; i < b.length; i++) {
        frequencyArray.push({
            destinationCurrency: a[i],
            frequency: b[i]
        });
    }
    return frequencyArray;
}

export function prepareDataForChart(frequencyCountData, counter) {
    const rows = [];
    for (let i = 0; i < frequencyCountData.length; i++) {
        let row = {};
        row['label'] = frequencyCountData[i].destinationCurrency;
        row['value'] = counter ? Math.round(frequencyCountData[i].frequency * 100) / 100 : frequencyCountData[i].frequency;
        rows.push(row);
    }
    return rows;
}

export function drawPie(parsedJSON, divId, title, type, counter, len) {
    const rows = [];
    for (let i = 0; i < parsedJSON.length; i++) {
        let row = {};
        row['label'] = parsedJSON[i].destinationCurrency;
        row['value'] = counter ? Math.round(parsedJSON[i].frequency * 100) / 100 : parsedJSON[i].frequency;
        rows.push(row);
    }
    const subtitle = counter? `The total amount converted to USD is ${Math.round(counter * 100) / 100}$. Number of requests made : ${len}`: '';
    try {
        if (rows.length > 0) {
            return new d3pie(divId, {
                "header": {
                    "title": {
                        "text": title,
                        "fontSize": 24,
                        "font": "open sans"
                    },
                    "subtitle": {
                        "text": subtitle,
                        "color": "#999999",
                        "fontSize": 18,
                        "font": "open sans"
                    },
                    "titleSubtitlePadding": 9
                },
                "footer": {
                    "color": "#999999",
                    "fontSize": 10,
                    "font": "open sans",
                    "location": "bottom-left"
                },
                "size": {
                    "canvasHeight": 400,
                    "canvasWidth": 590,
                    "pieOuterRadius": "80%"
                },
                "data": {
                    "sortOrder": "value-desc",
                    "smallSegmentGrouping": {
                        "enabled": true,
                        "value": 0,
                        "valueType": "value"
                    },
                    "content": rows
                },
                "labels": {
                    "outer": {
                        "pieDistance": 12
                    },
                    "inner": {
                        "format": type,
                    },
                    "mainLabel": {
                        "fontSize": 14
                    },
                    "percentage": {
                        "color": "#ffffff",
                        "decimalPlaces": 0
                    },
                    "value": {
                        "color": "#adadad",
                        "fontSize": 14
                    },
                    "lines": {
                        "enabled": true
                    },
                    "truncation": {
                        "enabled": true
                    }
                },
                "effects": {
                    "pullOutSegmentOnClick": {
                        "effect": "linear",
                        "speed": 400,
                        "size": 8
                    }
                },
                "misc": {
                    "gradient": {
                        "enabled": true,
                        "percentage": 100
                    }
                },
                "tooltips": {
                    "enabled": true,
                    "type": "placeholder",
                    "string": "{label}: {value}, {percentage}%"
                },
            });
        }
    } catch (e) {
        console.log(e);
    }
}
