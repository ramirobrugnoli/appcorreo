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


    let orderDetails: any;


    try {
      let orderInfo: { [key: number]: any } = {};
      let orderNumber = 1;

      while (true) {
        try {
          console.log('ORDER NUMBER WHILE', orderNumber);
          orderDetails = await ctx.clients.getOrders.getOrders(
            `${orderId.split('-')[0]}-0${orderNumber}`
          );

          console.log('ORDERS ID TESTING', `${orderId.split('-')[0]}-0${orderNumber}`);

/*           let orderitems = orderDetails.items;
          let orderOwner = orderDetails.clientProfileData;

          console.log('Items vendidos:', orderitems);
          console.log('Order profile info:', orderOwner);
          console.log('Obtener detalles pedido nuevo:', orderDetails); */

          orderInfo[orderNumber] = orderDetails.items;
          orderNumber++;
        } catch (detallesError) {
          if (detallesError.statusCode === 404) {
            break;
          } else {
            console.error('Error obteniendo detalles del pedido:'/* , detallesError */);
            break;
          }
        }
      }
      
      console.log('order info completo:', orderInfo);
      
      

    } catch (detallesError) {
      console.error('Error obteniendo detalles del pedido:'/* , detallesError */);
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


/* async function registSell(tokenBlister, orderInfo) {
  const url = "https://api-marketplace.staging.andromedalatam.com/api/v1/sales/extendedwarranty";

   const data = {
    coberturas: [
      {
        cobertura_id: '2046',
        articulo: 'celular',
        marca: 'samsumg',
        categ_articulo_id: '130',
        garantia_fabrica: '6',
        suma_asegurada: '40000',
        vfv: '41285.30',
      },
      {
        cobertura_id: '2047',
        articulo: 'Licuadora',
        marca: 'philips',
        categ_articulo_id: '132',
        garantia_fabrica: '12',
        suma_asegurada: '9500',
        vfv: '9600',
      },
    ],
    factura: 'FB-0001-00000082',
    apellido: 'Apellido Beneficiario',
    nombres: 'Nombre Beneficiario',
    doc_tipo: 'DNI',
    doc_numero: '31232148',
    domicilio: 'Domicilio beneficiario',
    cp: '7600',
    localidad: 'caba',
    codigo_provincia: 'AR-A',
    telefono: '4323423',
    email: 'sarasa@sarasa.com',
    SitIVA: 'CF',
  };

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Authorization": `Bearer ${tokenBlister}`,
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
} */