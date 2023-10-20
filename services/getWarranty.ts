async function getWarranty(token: String, categoryId: String) {

    const url = `https://api-marketplace.staging.andromedalatam.com/api/v1/coverage/extendedwarranty?IDCategoria=${categoryId}`;


    console.log('url en warranty:', url);
    console.log('token en get warranty:', token);

    const options = {
        method: "GET",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${token}`,
        },
    };

    const response = await fetch(url, options);
    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log('json en funcion:', json);
    return json;
}

export { getWarranty };
