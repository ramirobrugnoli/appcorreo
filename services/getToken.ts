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

export { getToken };
