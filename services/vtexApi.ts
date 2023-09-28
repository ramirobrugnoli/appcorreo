async function agregarAlCarrito(id: Number, precio: Number, orderFormId: String, index: Number, productId: String) {
  const url = `/api/checkout/pub/orderForm/${orderFormId}/items`;

  const urlCustomData = `/api/checkout/pub/orderForm/${orderFormId}/customData/guarantee1`;  //el guarantee1 se debe recibir como prop, ya q si hay una garantía incluida pasa a ser guarantee2

  const customData = {
    guaranteeId: id,
    productId: productId
  }
  
  console.log(urlCustomData, customData);

  const data = {
    orderItems: [{ quantity: 1, seller: 'GEv2', id: id, index: index, price: precio }]
  };

  console.log('ID QUE LLEGO A ADD TO CART:', id);

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


  const responseCustomData = await fetch(urlCustomData, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "X-VTEX-API-AppKey": "vtexappkey-andromedapartnerar-SWKPPD",
      "X-VTEX-API-AppToken": "RWDEYHADEUMJLEXLZPSFZZEKTMPIKUCJVQHWLYUGJOWCKCUNKHASWGOSSSKMSRTKSCOVWAAAULWLCCARRBYCTJNPCPETNIORUMJHOZQKHZXKJDPQSTUQTRQJOYSHVHMM"
    },
    body: JSON.stringify(customData)
  });
   const bodyCustomData = await responseCustomData.text();
   console.log(bodyCustomData);
  
  
  console.log('INDEX QUE LLEGA A VTEXAPI ACTUALIZADO', index);
  return;
}

export { agregarAlCarrito };
