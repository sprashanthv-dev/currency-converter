import { CountryFlagConfig } from "../interfaces/country-flag-config"
import { ErrorPageConfig } from "../interfaces/error-page-config"
import { LoaderConfig } from "../interfaces/loader-config"

const apiMapping: any = {
  "GET_RATE_BETWEEN_CURRENCY_PAIRS": "convert"
}

const apiErrorMessages = {
  API_ENDPOINT_NULL_UNDEFINED_EMPTY: 'Api endpoint cannot be null or undefined or empty',
  API_ENDPOINT_NOT_FOUND: 'Api endpoint not found!',
  SERVER_DOWN: 'Api server is down. Please try again later!'
}

const delimiterSymbols = {
  UNDERSCORE: "_",
  HYPHEN: "-",
  COMMA: ",",
  BLANK_SPACE: "",
  DOT: "."
}

const loaderOptions = {
  MASTER: "master",
  NON_MASTER: "non-master",
  START_LOADER: "start",
  STOP_LOADER: "stop",
  LOADER_TEXT: "Fetching Live Exchange Rates ..."
}

const startMasterLoaderConfig: LoaderConfig = {
  loaderName: "",
  loaderType: loaderOptions.MASTER,
  operationType: loaderOptions.START_LOADER
}

const stopMasterLoaderConfig: LoaderConfig = {
  loaderName: "",
  loaderType: loaderOptions.MASTER,
  operationType: loaderOptions.STOP_LOADER
}

const staticPageNames = {
  "NOT_FOUND": "not-found",
  "SERVER_ERROR": "server-error"
}

const staticPageMessages = {
  "NOT_FOUND": "We couldn't find the page you are looking for. It may be temporarily unavailable, moved or no longer exists. Check the URL you entered for any mistakes and try again.",
  "SERVER_ERROR": "Woops! Something went wrong :( It's always a good time for a coffee break. We should be back up soon by the time you finish your coffee :)"
}

const errorPageConfig: ErrorPageConfig[] = [
  {
    errorCode: 404,
    imageSrc: "../../../assets/404.png",
    imageCredit: "Romson Preechawit on Unsplash",
    message: staticPageMessages.NOT_FOUND
  },
  {
    errorCode: 500,
    imageSrc: "../../../assets/500.png",
    imageCredit: "傅甬 华 on Unsplash",
    message: staticPageMessages.SERVER_ERROR
  }
]

const countryFlagConfig: CountryFlagConfig = {
  flagBasePath: './../../../../assets/flags',
  imageFormat: 'png'
}

const currencyDropDownNames = {
  SOURCE_CURRENCY: 'source',
  DEST_CURRENCY: 'dest'
}

export const EXCHANGE_RATES_CNST = {
  API_MAPPING: apiMapping,
  API_ERROR_MESSAGES: apiErrorMessages,
  LOADER_OPTIONS: loaderOptions,
  START_MASTER_LOADER_CONFIG: startMasterLoaderConfig,
  STOP_MASTER_LOADER_CONFIG: stopMasterLoaderConfig,
  ERROR_PAGE_CONFIGS: errorPageConfig,
  BASE_URL: 'https://free.currconv.com/api/v7',
  FLAG_CONFIG: countryFlagConfig,
  CURRENCY_DROPDOWN_NAMES: currencyDropDownNames,
  DELIMITER_SYMBOLS: delimiterSymbols
}