/**
 *
 * Asynchronously loads the component for CurrencySelectWidget
 *
 */

import loadable from "../../utils/loadable";

export default loadable(() => import("./index"));
