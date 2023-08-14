import { log } from '@vtex/api';

export async function processOrder(ctx: any, next: () => Promise<any>) {
  const {
    state: { order },
    clients: { orderClients: orderClients },
  } = ctx;

  // agregar logica de la orden
  const requestBody = ctx.request
  


  log('requestbody con log: ', requestBody);

  console.log('req body consonle ', requestBody)
  console.log('segundo console: ',order,orderClients);

  ctx.response.status = 200;
  ctx.response.body = 'Order processed successfully ?';

  await next();
}