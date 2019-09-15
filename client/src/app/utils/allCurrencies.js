import EUR from './currencyImages/EUR.png';
import USD from './currencyImages/USD.png';
import AED from './currencyImages/AED.png';

export default function getAllCurrencies() {
    return[
        {key: Math.random(), label: 'Euro', value: 'EUR', image: EUR},
        {key: Math.random(), label: 'US Dollar', value: 'USD', image: USD},
        {key: Math.random(), label: 'United Arab Emirates Dirham', value: 'AED', image: AED},
    ];
}
