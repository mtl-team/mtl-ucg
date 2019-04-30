// import AES from 'crypto-js/aes';
// import DES from 'crypto-js/tripledes';
const axios = require('axios')
import  {
  readUCGConfig
} from './UCGConfig'

import defaultData from './defaultData'

const URL_PATH = '/umserver/SSOLogin';

function callAction(options) {
  if (!options) return ;
  const { appId } = options;
  const UCGConfig = readUCGConfig(appId);
  if (!UCGConfig) return;
  const {
    host='',
    port='',
    isHttps=false,
    default_tp,
    time_out,
    header: configHeader
  } = UCGConfig;
  const {
    tp = default_tp,
    viewId = "",
    action = "",
    serviceId,
    timeout = time_out,
    params = {},//自定义参数
    header = configHeader,
  } = options;

  let requestData = {
    deviceinfo: {...defaultData.deviceinfo},
    appcontext: {
      ...defaultData.appcontext,
      appid: appId
    },
    serviceid: serviceId || defaultData.serviceid,
    servicecontext: {
      ...defaultData.servicecontext,
      params,
      appid: appId,
      viewid: viewId,
      actionname: action
    }
  };
  const http = isHttps ? 'https://' : 'http://';
  const url = host ? `${http}${host}${port}` : '';
  const _url = url + URL_PATH;
  const dataForm = new FormData();
  dataForm.append('tp', tp)
  dataForm.append('data', JSON.stringify(requestData))
  return (
    new Promise((resolve, reject) => {
      axios({
        timeout: timeout,
        method: "POST",
        url: _url,
        data: dataForm,
        headers: {
          'Content-Type': 'application/json',
          ...header
        },
        // params,
      }).then(function (res) {
        if (options.callback) options.callback(res.data);
        resolve(res.data)
      }).catch(function (err) {
        if (options.callback) options.callback(err);
        reject(err)
      });
    })
  )
}

export function login(params, callback) {
  return callAction({
    action: 'umLogin',
    params,
    callback
  })
}

export default callAction