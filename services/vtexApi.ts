async function agregarAlCarrito(id: Number, precio: Number, orderFormId: String, index: Number, productId: String) {
  const url = `/api/checkout/pub/orderForm/${orderFormId}/items`;

  const data = {
    orderItems: [{ quantity: 1, seller: 'GEv2', id: id, index: index, price: precio }]
  };

  console.log('ID QUE LLEGO A ADD TO CART:', id, productId);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": "vtexappkey-andromedapartnerar-SWKPPD",
      "X-VTEX-API-AppToken": "RWDEYHADEUMJLEXLZPSFZZEKTMPIKUCJVQHWLYUGJOWCKCUNKHASWGOSSSKMSRTKSCOVWAAAULWLCCARRBYCTJNPCPETNIORUMJHOZQKHZXKJDPQSTUQTRQJOYSHVHMM"
    },
    body: JSON.stringify(data)
  });

  const body = await response.text();
  console.log(body);


  console.log('INDEX QUE LLEGA A VTEXAPI ACTUALIZADO', index);
  return;
}

export { agregarAlCarrito };
