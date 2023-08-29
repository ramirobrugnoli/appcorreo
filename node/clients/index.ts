import { IOClients } from '@vtex/api'


import orderClients from './orderClients'
import AndromedaClient from './AndromedaClient'
import GetOrders from './getOrders'
// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get orderClients() {
    return this.getOrSet('order', orderClients)
  }

  public get andromeda() {
    return this.getOrSet('andromeda', AndromedaClient)
  }

  public get getOrders() {
    return this.getOrSet('getorders', GetOrders)
  }
}

