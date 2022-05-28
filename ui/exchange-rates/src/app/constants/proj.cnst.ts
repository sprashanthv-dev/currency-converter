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
  BLANK_SPACE: ""
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

export const EXCHANGE_RATES_CNST = {
  API_MAPPING: apiMapping,
  API_ERROR_MESSAGES: apiErrorMessages,
  LOADER_OPTIONS: loaderOptions,
  START_MASTER_LOADER_CONFIG: startMasterLoaderConfig,
  STOP_MASTER_LOADER_CONFIG: stopMasterLoaderConfig,
  BASE_URL: 'https://free.currconv.com/api/v7',
  DELIMITER_SYMBOLS: delimiterSymbols
}