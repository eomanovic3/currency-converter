export function filterCountryCurrencies(dataInfo) {
    const options = [];
    for (const prop in dataInfo) {
        if (Object.prototype.hasOwnProperty.call(dataInfo, prop)) {
            if(dataInfo[prop].id === 'eu'){
                options.push({label:dataInfo[prop].currencyName, value: 'EUR'});
            } else {
                options.push({label: dataInfo[prop].currencyName, value: dataInfo[prop].id});
            }
        }
    }
    return options;
}
