async function agregarAlCarrito(id: Number, precio: Number, orderFormId: String, index: Number) {
  const url = `/api/checkout/pub/orderForm/${orderFormId}/items`;

  const data = {
    orderItems: [{ quantity: 1, seller: '1113', id: id, index: index, price: precio }]
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": "vtexappkey-correostaging-UZRTJY",
      "X-VTEX-API-AppToken": "FTHNTKOGDEPOQWQKACRPYRLOJKNPUHFLOWTOELGYEENUESMYJWDNSKJQHOEMYGVKLIKLMPCATLJITZNYRZJTURNKJVEORGUMEORVZPNWGWYISQHWJAESJQZUHFTMLZRL"
    },
    body: JSON.stringify(data)
  });

  const body = await response.text();

  console.log(body);
  console.log('INDEX QUE LLEGA A VTEXAPI ACTUALIZADO', index);
  return;
}

export { agregarAlCarrito };
