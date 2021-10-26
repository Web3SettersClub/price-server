import { RouteOptions } from 'fastify';

interface queryProps {
  from: 'chain' | 'market',
  token: string;
}

export const marketRoutes: RouteOptions[] = [
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
      const {token, from } = req.query as queryProps;
      res.send('market get route');
    }
  }
];