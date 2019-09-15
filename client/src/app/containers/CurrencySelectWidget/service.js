export function filterCountryCurrencies(dataInfo) {
    const options = [];
    for (const prop in dataInfo) {
        if (Object.prototype.hasOwnProperty.call(dataInfo, prop)) {
            options.push({label:dataInfo[prop].currencyName, value: dataInfo[prop].id});
        }
    }
    return options;
}
