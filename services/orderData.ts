async function addOrderData(id: Number,orderFormId: String, productId: String, customId: String) {

  
    const urlCustomData = `/api/checkout/pub/orderForm/${orderFormId}/customData/${customId}`;  //el guarantee1 se debe recibir como prop, ya q si hay una garantía incluida pasa a ser guarantee2
  
    const customData = {
      "guaranteeId": "TEST DESDE FUNCION",
      "productId": `${productId}`
    }
    
    console.log('URL Y DATA:',urlCustomData, customData, id); 

    console.log('FUNCION ACTUALIZADA!!!!!!!!!');

    const responseCustomData = await fetch(urlCustomData, {
      method: "PUT",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "X-VTEX-API-AppKey": "vtexappkey-andromedapartnerar-SWKPPD",
        "X-VTEX-API-AppToken": "RWDEYHADEUMJLEXLZPSFZZEKTMPIKUCJVQHWLYUGJOWCKCUNKHASWGOSSSKMSRTKSCOVWAAAULWLCCARRBYCTJNPCPETNIORUMJHOZQKHZXKJDPQSTUQTRQJOYSHVHMM"
      },
      body: JSON.stringify(customData)
    });
     const bodyCustomData = await responseCustomData.text();


     console.log('body custom data:', bodyCustomData);
     
    
    return;
  }
  
  export { addOrderData };
  