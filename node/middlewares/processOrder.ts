export async function processOrder(ctx: Context, next: () => Promise<any>) {

  const {
    clients: { orderClients: orderClients },
  } = ctx;

  // Acceder al cuerpo de la solicitud
  const requestBody = await ctx.request;

  console.log('REQ BODY ************************* ', requestBody);
  console.log('segundo console: ', orderClients);

  ctx.response.status = 200;
  ctx.response.body = 'Order processed successfully ?';

  await next();
}
