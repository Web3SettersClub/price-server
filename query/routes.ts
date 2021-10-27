import { RouteOptions } from 'fastify';
import { generateLogData, postEvent } from '../utils';
import { queryInAroundTime, queryLastest } from './hander';

interface queryProps {
  from: 'chain' | 'market',
  token: string;
  times?: string[];
}

export const queryRoutes: RouteOptions[] = [
  {
    method: 'GET',
    url: '/',
    schema: {
      querystring: {
        from: { type: 'string' },
        token: { type: 'string' }
      }
    },
    handler: async (req, res) => {
      const { token, from, times } = req.query as queryProps;
      if (!times || times.length == 0) {
        const data = await queryLastest(from, token);
        const [error, price] = data;
        if (error != null) {
          await postEvent({
            text: JSON.stringify(generateLogData(req, res)),
            title: 'query lastest error',
            alertType: 'warning'
          });
          return res.send({
            code: 0,
            data: {
              price: [0],
              message: error
            }
          })
        } else {
          return res.send({
            code: 1,
            data: {
              price: [price],
              message: '',
            }
          })
        };
      } else {
        const pirces = await Promise.all(times.map(time => queryInAroundTime(from, token, time)));
        return res.send({
          code: 1,
          data: {
            price: pirces,
            messgae: '',
          }
        })
      }
    }
  }
];