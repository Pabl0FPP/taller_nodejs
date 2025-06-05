import { fraganceService } from '../../services/fragance.service';

export const fraganceResolvers = {
  Query: {
    fragances: async (_root: any, _params: any, context: any) => {
      try {
        if (!context.user) throw new Error('No autenticado');
        return await fraganceService.getAllFragances();
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Query fragances:', error.message);
        } else {
          console.error('Error desconocido en Query fragances:', error);
        }
        throw new Error('Error al obtener las fragancias');
      }
    },

    fragance: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user) throw new Error('No autenticado');
        const fragance = await fraganceService.getFraganceById(params.id);
        if (!fragance) throw new Error('Fragancia no encontrada');
        return fragance;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Query fragance:', error.message);
        } else {
          console.error('Error desconocido en Query fragance:', error);
        }
        throw new Error('Error al obtener la fragancia');
      }
    },
  },

  Mutation: {
    createFragance: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }
        return await fraganceService.createFragance(params.input);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation createFragance:', error.message);
        } else {
          console.error('Error desconocido en Mutation createFragance:', error);
        }
        throw new Error('Error al crear la fragancia');
      }
    },

    updateFragance: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }
        return await fraganceService.updateFragance(params.id, params.input);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation updateFragance:', error.message);
        } else {
          console.error('Error desconocido en Mutation updateFragance:', error);
        }
        throw new Error('Error al actualizar la fragancia');
      }
    },

    deleteFragance: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }

        const result = await fraganceService.deleteFragance(params.id);
        return result !== null;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation deleteFragance:', error.message);
        } else {
          console.error('Error desconocido en Mutation deleteFragance:', error);
        }
        throw new Error('Error al eliminar la fragancia');
      }
    },
  },
};