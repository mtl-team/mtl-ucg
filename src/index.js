import callAction, { login } from './ucg-sdk/callAction';
import callService from './ucg-sdk/callService';
import { writeUCGConfig, readUCGConfig } from './ucg-sdk/UCGConfig';



let apilist = [
  {
    api: 'ucgAction',
    fn: {
      callAction: callAction,
      callService: callService,
      login: login,
      writeUCGConfig: writeUCGConfig,
      readUCGConfig: readUCGConfig
    }
  }
]

for (let api of apilist) {
  mtl.register(api)
}