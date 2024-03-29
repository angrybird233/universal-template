// @ts-ignore
import { MMKV } from 'react-native-mmkv';
import * as utils from '@mono-app/utils';
import { StorageToken } from '../constant';

class StorageService {
  private static instance: StorageService;

  storage: MMKV;

  constructor() {
    this.storage = new MMKV();
  }

  static getInstance() {
    if (!StorageService.instance) {
      StorageService.instance = new StorageService();
    }

    return StorageService.instance;
  }

  get confirmed(): boolean {
    if (StorageService.getInstance().storage.getAllKeys().includes(StorageToken.Confirmed)) {
      return StorageService.getInstance().storage.getBoolean(StorageToken.Confirmed) ?? false;
    }
    return false;
  }

  get signedIn(): boolean {
    if (StorageService.getInstance().storage.getAllKeys().includes(StorageToken.SignedIn)) {
      return StorageService.getInstance().storage.getBoolean(StorageToken.SignedIn) ?? false;
    }
    return false;
  }

  get token(): Token {
    if (StorageService.getInstance().storage.getAllKeys().includes(StorageToken.Token)) {
      const tokenStr = StorageService.getInstance().storage.getString(StorageToken.Token);
      try {
        return tokenStr ? JSON.parse(tokenStr) : {};
      } catch (error) {
        console.error(error);
        return {};
      }
    }
    return {};
  }

  get userInfo(): UserInfo {
    if (StorageService.getInstance().storage.getAllKeys().includes(StorageToken.UserInfo)) {
      const userInfoStr = StorageService.getInstance().storage.getString(StorageToken.UserInfo);
      try {
        return userInfoStr ? JSON.parse(userInfoStr) : {};
      } catch (error) {
        console.error(error);
        return {};
      }
    }
    return {};
  }

  updateStorage<T>(key: string, value: T) {
    try {
      const type = typeof value;

      switch (type) {
        case 'object':
          const oldValue = StorageService.getInstance().storage.getString(key);
          if (oldValue) {
            const oldObj: Obj = JSON.parse(oldValue);
            StorageService.getInstance().storage.set(
              key,
              JSON.stringify(utils.object.removeEmpty({ ...oldObj, ...value })),
            );
          } else {
            StorageService.getInstance().storage.set(
              key,
              JSON.stringify(utils.object.removeEmpty({ ...(value as Obj) })),
            );
          }
          break;

        case 'string':
        case 'number':
        case 'boolean':
          StorageService.getInstance().storage.set(key, value as unknown as string | number | boolean);
          break;
      }
    } catch (error) {
      console.error(error);
    }
  }

  getStorage(key: string) {
    const value = StorageService.getInstance().storage.getString(key);
    try {
      return JSON.parse(value);
    } catch (error) {
      return value;
    }
  }

  deleteStorage(key: StorageToken) {
    StorageService.getInstance().storage.delete(key);
  }

  signOut() {
    StorageService.getInstance().deleteStorage(StorageToken.SignedIn);
    StorageService.getInstance().deleteStorage(StorageToken.UserInfo);
    StorageService.getInstance().deleteStorage(StorageToken.Token);
  }
}

export const storageService = StorageService.getInstance();
