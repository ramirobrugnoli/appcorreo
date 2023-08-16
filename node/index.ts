import type { ClientsConfig, ServiceContext, RecorderState, ParamsContext} from '@vtex/api';
import { LRUCache, method, Service } from '@vtex/api';
import { Clients } from './clients';
import { processOrder } from './middlewares/processOrder';
/* import { validateOrder } from './middlewares/validateOrder' */

const TIMEOUT_MS = 800

//URL: https://correostaging.vtexcommercestable.com.br/api/add-to-cart-button-guarantee/orderNotification  -- https://servicechanges--correostaging.myvtex.com/0.0/orderNotification/

const memoryCache = new LRUCache<string, any>({ max: 5000 })

metrics.trackCache('status', memoryCache)

// This is the configuration for clients available in `ctx.clients`.
const clients: ClientsConfig<Clients> = {
  // We pass our custom implementation of the clients bag, containing the Status client.
  implementation: Clients,
  options: {
    // All IO Clients will be initialized with these options, unless otherwise specified.
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
    // This key will be merged with the default options and add this cache to our Status client.
    orderClients: {
      memoryCache,
    },
  },
}

declare global {
  // We declare a global Context type just to avoid re-writing ServiceContext<Clients, State> in every handler and resolver
  type Context = ServiceContext<Clients, State>

  // The shape of our State object found in `ctx.state`. This is used as state bag to communicate between middlewares.
  interface State extends RecorderState {
    order: Object
  }
}

// Export a service that defines route handlers and client options.
export default new Service<Clients, State, ParamsContext>({

  clients,

  routes: {

    orderNotification: method({

      POST: [processOrder],

    }),

  },

});
