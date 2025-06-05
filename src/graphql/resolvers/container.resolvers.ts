import { containerService } from '../../services/container.service';

export const containerResolvers = {
  Query: {
    containers: async (_root: any, _params: any, context: any) => {
      try {
        if (!context.user) throw new Error('No autenticado');
        return await containerService.getAllContainers();
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Query containers:', error.message);
        } else {
          console.error('Error desconocido en Query containers:', error);
        }
        throw new Error('Error al obtener los contenedores');
      }
    },

    container: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user) throw new Error('No autenticado');
        const container = await containerService.getContainerById(params.id);
        if (!container) throw new Error('Contenedor no encontrado');
        return container;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Query container:', error.message);
        } else {
          console.error('Error desconocido en Query container:', error);
        }
        throw new Error('Error al obtener el contenedor');
      }
    },
  },

  Mutation: {
    createContainer: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }
        return await containerService.createContainer(params.input);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation createContainer:', error.message);
        } else {
          console.error('Error desconocido en Mutation createContainer:', error);
        }
        throw new Error('Error al crear el contenedor');
      }
    },

    updateContainer: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }
        return await containerService.updateContainer(params.id, params.input);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation updateContainer:', error.message);
        } else {
          console.error('Error desconocido en Mutation updateContainer:', error);
        }
        throw new Error('Error al actualizar el contenedor');
      }
    },

    deleteContainer: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }

        const result = await containerService.deleteContainer(params.id);
        return result !== null;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation deleteContainer:', error.message);
        } else {
          console.error('Error desconocido en Mutation deleteContainer:', error);
        }
        throw new Error('Error al eliminar el contenedor');
      }
    },
  },
};