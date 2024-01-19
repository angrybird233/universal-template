/**
 * @description 删除数据规则
 */

import { initRequest } from '../../..';
import serverConfig from '../../../server.config';

const backEndUrl = serverConfig()['authorization'];

// 初始值
export const init = undefined;
// 接口地址
export const url = '/data/rule/delete';

export async function fetch<T>(params = {}) {
  const request = initRequest();
  const result = await request.post<AjaxResponse<T>>(
    backEndUrl + '/data/rule/delete',
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      params,
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