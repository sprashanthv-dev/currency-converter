const apiMapping: any = {
  "GET_RATE_BETWEEN_CURRENCY_PAIRS": "convert"
}

const apiErrorMessages = {
  API_ENDPOINT_NULL_UNDEFINED_EMPTY: 'Api endpoint cannot be null or undefined or empty',
  API_ENDPOINT_NOT_FOUND: 'Api endpoint not found!'
}

export const EXCHANGE_RATES_CNST = {
  API_MAPPING: apiMapping,
  API_ERROR_MESSAGES: apiErrorMessages,
  BASE_URL: 'https://free.currconv.com/api/v7'
}