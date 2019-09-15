/**
 *
 * Asynchronously loads the component for CurrencySelect
 *
 */

import loadable from "../../utils/loadable";

export default loadable(() => import("./index"));
