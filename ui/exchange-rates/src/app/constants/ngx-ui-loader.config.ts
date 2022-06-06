import { NgxUiLoaderConfig } from 'ngx-ui-loader';
import { EXCHANGE_RATES_CNST } from './proj.cnst';

export const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  "bgsColor": "#334257",
  "fgsColor": "#334257",
  "bgsType": "square-jelly-box",
  "fgsType": "square-jelly-box",
  "fgsSize": 40,
  "overlayColor": "rgb(238,238,238)",
  "hasProgressBar": true,
  "pbThickness": 5,
  "text": EXCHANGE_RATES_CNST.LOADER_OPTIONS.LOADER_TEXT,
  "textColor": "#334257",
  "pbColor": "#334257"
}