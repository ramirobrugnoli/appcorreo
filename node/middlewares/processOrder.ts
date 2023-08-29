import { json } from 'co-body';
import fetch from 'node-fetch';

export async function processOrder(ctx: Context, next: () => Promise<any>) {
  try {
    const body = await json(ctx.req);
    const orderId = body.OrderId;

    let tokenBlister: any;

    try {
      tokenBlister = await getToken();
      console.log('Token Blister:', tokenBlister);
    } catch (tokenError) {
      console.error('Error obteniendo token:', tokenError);
    }

    console.log('Order ID:', orderId);

    ctx.response.status = 200;
    ctx.response.body = 'Order processed successfully';

    let orderDetails:any;


    try {
      orderDetails = await ctx.clients.getOrders.getOrders(orderId);
      let orderitems = orderDetails.items;
      console.log('Items vendidos:', orderitems);
      console.log('Obtener detalles pedido nuevo: ', orderDetails);
    } catch (detallesError) {
      console.error('Error obteniendo detalles del pedido:', detallesError);
    }
  } catch (error) {
    console.error('Error general en el proceso:', error);
  }

  await next();
}

async function getToken() {
  const url = "https://api-marketplace.staging.andromedalatam.com/api/v1/login";

  const formData = {
    username: "QG6UlMAnnK",
    password: "dMV9xPTQ1k",
  };

  const options = {
    method: "POST",
    body: new URLSearchParams(formData).toString(),
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`HTTP error! Status: ${response.status}`);
  }

  const json = await response.json();
  return json;
}
