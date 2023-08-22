import { json } from 'co-body';
import fetch from 'node-fetch';

export async function processOrder(ctx: any, next: () => Promise<any>) {
  const {
    clients: { orderClients: orderClients },
  } = await ctx;

  const body = await json(ctx.req);
  const orderId = body.OrderId;
  console.log('Order ID:', orderId);

  ctx.response.status = 200;
  ctx.response.body = 'Order processed successfully';

  console.log(orderClients);

  console.log('Obtener detalles pedido: ', obtenerDetallesPedido(orderId));

  async function obtenerDetallesPedido(orderId: string) {
    const url = `http://servicechanges--correostaging.myvtex.com/api/oms/pvt/orders/${orderId}`;
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'X-VTEX-API-AppKey': 'vtexappkey-correostaging-UZRTJY',
        'X-VTEX-API-AppToken': 'FTHNTKOGDEPOQWQKACRPYRLOJKNPUHFLOWTOELGYEENUESMYJWDNSKJQHOEMYGVKLIKLMPCATLJITZNYRZJTURNKJVEORGUMEORVZPNWGWYISQHWJAESJQZUHFTMLZRL',
      },
    };
  
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  
    const json = await response.json();
    return json;
  }



  await next();
}