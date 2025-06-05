import { candleService } from '../../services/candle.service';

export const candleResolvers = {
  Query: {
    candle: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user) throw new Error('No autenticado');

        const candle = await candleService.getCandleById(params.id);
        if (!candle) throw new Error('Error al buscar la vela');

        return {
          ...candle.toObject(),
          id: candle.id.toString(),
          id_container: candle.id_container.toString(),
          id_fragance: candle.id_fragance.toString(),
        };
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Query candle:', error.message);
        } else {
          console.error('Error desconocido en Query candle:', error);
        }
        throw new Error('Error al buscar la vela');
      }
    },
  },

  Mutation: {
    createCandle: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user) throw new Error('No autenticado');

        return await candleService.createCandle(params.input);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation createCandle:', error.message);
        } else {
          console.error('Error desconocido en Mutation createCandle:', error);
        }
        throw new Error('Error al crear la vela');
      }
    },
  },
};