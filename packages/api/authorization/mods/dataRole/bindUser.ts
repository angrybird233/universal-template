/**
 * @description 用户批量绑定角色
 */

import { initRequest } from '../../..';
import serverConfig from '../../../server.config';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/role/data/bindUser';

export async function fetch<T>(data = {}) {
  const request = initRequest();
  const result = await request.post<AjaxResponse<T>>(
    backEndUrl + '/role/data/bindUser',
    {
      headers: {
        'Content-Type': 'application/json',
      },
      data,
    },
  );
  if (result) {
    if (!result.success) {
      throw new Error(JSON.stringify(result));
    } else {
      return result.data;
    }
  } else {
    throw new Error(JSON.stringify({ message: '接口未响应' }));
  }
}
