let UCGConfig = {

};
const defCon = {
  default_tp: 'none',
  time_out: 5000,
  header: {}
}
export function writeUCGConfig(appId, config, callback) {
  if (!!appId && typeof appId === 'string') {
    UCGConfig[appId] = {
      ...defCon,
      ...config,
      appId
    };
    callback && callback({
      code: 0,
      msg: 'success',
      result: config
    })
  } else {
    callback && callback({
      code: 1,
      msg: "appId不能为空，或者不是string",
      result: null
    })
  }
}

export function readUCGConfig(appId, callback) {
  if (!!appId && typeof appId === 'string') {
    const config = UCGConfig[appId];
    if (config) {
      callback && callback({
        code: 0,
        msg: 'success',
        result: config
      })
    }else {
      callback && callback({
        code: 1,
        msg: '不存在此配置',
        result: config
      })
    }
    return config
  } else {
    callback && callback({
      code: 1,
      msg: "appId不能为空，或者不是string",
      result: null
    })
    return null
  }
}