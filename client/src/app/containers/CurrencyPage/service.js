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

export function prepareDataForChart(frequencyCountData) {
    const rows = [];
    for (let i = 0; i < frequencyCountData.length; i++) {
        let row = {};
        row['label'] = frequencyCountData[i].destinationCurrency;
        row['value'] = frequencyCountData[i].frequency;
        rows.push(row);
    }
    return rows;
}

export function drawPie(parsedJSON, divId, title) {
    const rows = [];
    for (let i = 0; i < parsedJSON.length; i++) {
        let row = {};
        row['label'] = parsedJSON[i].destinationCurrency;
        row['value'] = parsedJSON[i].frequency;
        rows.push(row);
    }
    console.log(divId);
    return new d3pie(divId, {
        "header": {
            "title": {
                "text": title,
                "fontSize": 24,
                "font": "open sans"
            },
            "subtitle": {
                "text": "",
                "color": "#999999",
                "fontSize": 12,
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
            "content": rows
        },
        "labels": {
            "outer": {
                "pieDistance": 12
            },
            "inner": {
                "hideWhenLessThanPercentage": 3
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
        }
    });
}


export function drawBar() {
//
//     var margin = {top: 20, right: 20, bottom: 70, left: 40},
//         width = 600 - margin.left - margin.right,
//         height = 300 - margin.top - margin.bottom;
//
// // Parse the date / time
//     var	parseDate = d3.timeFormat("%Y-%m").parse;
//
//     var x = d3.scaleLinear().range([height, 0]);
//     var xAxis = d3.scaleLinear().range([height, 0]);
//
//     var y = d3.scaleLinear().range([height, 0]);
//     var yAxis = d3.scaleLinear().range([height, 0]);
//
//     var svg = d3.select("#content").append("svg")
//         .attr("width", width + margin.left + margin.right)
//         .attr("height", height + margin.top + margin.bottom)
//         .append("g")
//         .attr("transform",
//             "translate(" + margin.left + "," + margin.top + ")");
//
//     d3.csv("bar-data.csv", function(error, data) {
//
//         data.forEach(function(d) {
//             d.date = parseDate(d.date);
//             d.value = +d.value;
//         });
//
//         x.domain(data.map(function(d) { return d.date; }));
//         y.domain([0, d3.max(data, function(d) { return d.value; })]);
//
//         svg.append("g")
//             .attr("class", "x axis")
//             .attr("transform", "translate(0," + height + ")")
//             .call(xAxis)
//             .selectAll("text")
//             .style("text-anchor", "end")
//             .attr("dx", "-.8em")
//             .attr("dy", "-.55em")
//             .attr("transform", "rotate(-90)" );
//
//         svg.append("g")
//             .attr("class", "y axis")
//             .call(yAxis)
//             .append("text")
//             .attr("transform", "rotate(-90)")
//             .attr("y", 6)
//             .attr("dy", ".71em")
//             .style("text-anchor", "end")
//             .text("Value ($)");
//
//         svg.selectAll("bar")
//             .data(data)
//             .enter().append("rect")
//             .style("fill", "steelblue")
//             .attr("x", function(d) { return x(d.date); })
//             .attr("width", x.rangeBand())
//             .attr("y", function(d) { return y(d.value); })
//             .attr("height", function(d) { return height - y(d.value); });
//
//     });

}
