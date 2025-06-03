import { userService } from '../services';
import { candleService } from '../services/candle.service';
import { authService } from '../services/auth.service';
import { shopcartService } from '../services/shop_cart.service';
import { fraganceService } from '../services';
import { containerService } from '../services';

export const resolvers = {
  Query: {

    // User Queries
    users: async (_root: any, _params: any, context: any) => {
    if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
    }

    const users = await userService.getUsers();

    return users.map(user => ({
        ...user.toObject(),
        id: user.id.toString(),
        role: user.roles[0]?.name || "client", 
    }));
    },
    
    user: async (_root: any, params: any, context: any) => {
    if (!context.user) throw new Error('Not authenticated');

    const user = await userService.findById(params.id);

    if (!user) 
    throw new Error(`User with ID ${params.id} not found`);
    

    return {
        ...user.toObject(),
        id: user.id.toString(),
        role: user.roles[0]?.name || "client", 
    };
    },

    // Candle Queries
    candle: async (_root: any, params: any, context: any) => {
    if (!context.user) throw new Error('Not authenticated');

    const candle = await candleService.getCandleById(params.id);

    if (!candle) throw new Error(`Candle with ID ${params.id} not found`);

    return {
        ...candle.toObject(),
        id: candle.id.toString(), 
        id_container: candle.id_container.toString(), 
        id_fragance: candle.id_fragance.toString(),   
    };
    },

    // Cart Queries
    cart: async (_root: any, _params: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      return await shopcartService.getOrCreateCart(context.user.id);  
    },

    // Fragance Queries
    fragances: async (_root: any, _params: any, context: any) => {
        if (!context.user) throw new Error('Not authenticated');
        return await fraganceService.getAllFragances();
    },
    fragance: async (_root: any, params: any, context: any) => {
        if (!context.user) throw new Error('Not authenticated');
        return await fraganceService.getFraganceById(params.id);
    },

    // Container Queries
    containers: async (_root: any, _params: any, context: any) => {
        if (!context.user) throw new Error('Not authenticated');
        return await containerService.getAllContainers();
    },
    container: async (_root: any, params: any, context: any) => {
        if (!context.user) throw new Error('Not authenticated');
        return await containerService.getContainerById(params.id);
    }
  },

  Mutation: {

    // User Mutations
    createUser: async (_root: any, params: any, context: any) => {
    if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
    }

    const user = await userService.createUser(params.input);

    return {
        ...user.toObject(),
        id: user.id.toString(), 
        role: user.roles[0]?.name || null, 
    };
    },

    updateUser: async (_root: any, params: any, context: any) => {
    if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
    }

    const user = await userService.updateUser(params.id, params.input);

    if (!user) throw new Error(`User with ID ${params.id} not found`);
    

    return {
        ...user.toObject(),
        id: user.id.toString(),
        role: user.roles[0]?.name || "client", 
    };
    },

    deleteUser: async (_root: any, params: any, context: any) => {
      if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
      }
      
      const result = await userService.deleteUser(params.id);  
      return result !== null;
    },

    // Cart Mutations
    addToCart: async (_root: any, params: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      return await shopcartService.addItemToCart(context.user.id, params.input);  
    },
    removeFromCart: async (_root: any, params: any, context: any) => {
      if (!context.user) throw new Error('Not authenticated');
      return await shopcartService.removeItemFromCart(context.user.id, params.candleId);  
    },

    // Container Mutations
    createContainer: async (_root: any, params: any, context: any) => {
        if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
        }
        return await containerService.createContainer(params.input);
    },
    updateContainer: async (_root: any, params: any, context: any) => {
        if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
        }
        return await containerService.updateContainer(params.id, params.input);
    },

    deleteContainer: async (_root: any, params: any, context: any) => {
    if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
    }

    const result = await containerService.deleteContainer(params.id);

    return result !== null;
    },

    // Fragance Mutations
    createFragance: async (_root: any, params: any, context: any) => {
        if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
        }
        return await fraganceService.createFragance(params.input);
    },
    updateFragance: async (_root: any, params: any, context: any) => {
        if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
        }
        return await fraganceService.updateFragance(params.id, params.input);
    },
    deleteFragance: async (_root: any, params: any, context: any) => {
    if (!context.user || !context.user.roles.includes('admin')) {
        throw new Error('Not authorized');
    }

    const result = await fraganceService.deleteFragance(params.id);
    return result !== null;
    },

    // Candle Mutations
    createCandle: async (_root: any, params: any, context: any) => {
    if (!context.user) throw new Error('Not authenticated');

    return await candleService.createCandle(params.input);
    }
  },

};