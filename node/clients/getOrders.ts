import type { IOContext, IOResponse, InstanceOptions } from '@vtex/api'
import { ACCOUNT, ExternalClient } from '@vtex/api'

const baseURL = `http://${ACCOUNT}.vtexcommercestable.com.br/api`

const routes = {
  getOrders: (orderId: string) => `${baseURL}/oms/pvt/orders/${orderId}`
}

export default class GetOrders extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(baseURL, ctx, {
      ...options,
      headers: {
        'X-Vtex-Use-Https': 'true',
        'X-VTEX-API-AppKey': 'vtexappkey-correostaging-UZRTJY',
        'X-VTEX-API-AppToken': 'FTHNTKOGDEPOQWQKACRPYRLOJKNPUHFLOWTOELGYEENUESMYJWDNSKJQHOEMYGVKLIKLMPCATLJITZNYRZJTURNKJVEORGUMEORVZPNWGWYISQHWJAESJQZUHFTMLZRL'
      },
    })
  }

  public async getOrders(
    orderId: string,
  ): Promise<IOResponse<string>> {
    return this.http.get(routes.getOrders(orderId))
  }
}
