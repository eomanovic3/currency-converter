import Cookies from 'universal-cookie';

class CookiesWrapper {
    constructor() {
        this.cookies = new Cookies();
    }

    setCookie = (key, value) => {
        this.cookies.set(key, value, { path: '/' });
    };

    getCookie = key => this.cookies.get(key, { path: '/' });

    removeCookie = key => {
        this.cookies.remove(key, { path: '/' });
    };
}

export default new CookiesWrapper();
