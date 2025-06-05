import { userService } from '../../services/user.service';

export const userResolvers = {
  Query: {
    users: async (_root: any, _params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }

        const users = await userService.getUsers();
        return users.map(user => ({
          ...user.toObject(),
          id: user.id.toString(),
          role: user.roles[0]?.name || "client",
        }));
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Query users:', error.message);
        } else {
          console.error('Error desconocido en Query users:', error);
        }
        throw new Error('Error al obtener los usuarios');
      }
    },

    user: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user) throw new Error('No autenticado');

        const user = await userService.findById(params.id);
        if (!user) throw new Error('Usuario no encontrado');

        return {
          ...user.toObject(),
          id: user.id.toString(),
          role: user.roles[0]?.name || "client",
        };
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Query user:', error.message);
        } else {
          console.error('Error desconocido en Query user:', error);
        }
        throw new Error('Error al obtener el usuario');
      }
    },
  },

  Mutation: {
    createUser: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }

        const user = await userService.createUser(params.input);
        return {
          ...user.toObject(),
          id: user.id.toString(),
          role: user.roles[0]?.name || null,
        };
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation createUser:', error.message);
        } else {
          console.error('Error desconocido en Mutation createUser:', error);
        }
        throw new Error('Error al crear el usuario');
      }
    },

    updateUser: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }

        const user = await userService.updateUser(params.id, params.input);
        if (!user) throw new Error('Usuario no encontrado');

        return {
          ...user.toObject(),
          id: user.id.toString(),
          role: user.roles[0]?.name || "client",
        };
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation updateUser:', error.message);
        } else {
          console.error('Error desconocido en Mutation updateUser:', error);
        }
        throw new Error('Error al actualizar el usuario');
      }
    },

    deleteUser: async (_root: any, params: any, context: any) => {
      try {
        if (!context.user || !context.user.roles.includes('admin')) {
          throw new Error('No autorizado');
        }

        const result = await userService.deleteUser(params.id);
        return result !== null;
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error en Mutation deleteUser:', error.message);
        } else {
          console.error('Error desconocido en Mutation deleteUser:', error);
        }
        throw new Error('Error al eliminar el usuario');
      }
    },
  },
};