import { IOClients } from '@vtex/api'

import orderClients from './orderClients'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get orderClients() {
    return this.getOrSet('order', orderClients)
  }
}
