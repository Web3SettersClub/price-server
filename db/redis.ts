import { Redis } from "ioredis";

export const BASE_DB = 1;

// mode: 'EX' for seconds and 'PX' for milliseconds

export const set = async (redis: Redis, key: string, value: string, mode?: 'EX' | 'PX', time?: number, db = BASE_DB) => {
  return new Promise((reslove, reject) => {
    redis.select(db, (selectErr) => {
      if (selectErr) reject(selectErr);
      redis.set(key, value, mode, time).then(res => {
        reslove(res);
      }).catch(setErr => {
        reject(setErr);
      });
    })
  });
}

export const get = async (redis: Redis, key: string, db = BASE_DB) => {
  return new Promise<string | null>((reslove, reject) => {
    redis.select(db, (selectErr) => {
      if (selectErr) reject(selectErr);
      redis.get(key).then(res => {
        reslove(res);
      }).catch(getErr => {
        reject(getErr);
      });
    })
  })
}

export const del = async (redis: Redis, key: string, db = BASE_DB) => {
  return new Promise<number>((reslove, reject) => {
    redis.select(db, (selectErr) => {
      if (selectErr) reject(selectErr);
      redis.del(key).then(res => {
        reslove(res);
      }).catch(delErr => {
        reject(delErr);
      })
    })
  })
}