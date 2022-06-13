
const getDogs = async ({ uri, numberOfDogs, apiKey }) => {
  const fetchUri = `${uri}?limit=${numberOfDogs}${!!apiKey ? "&api_key=" + apiKey : ""}`;
  if (!fetchUri) {
    throw new Error("URI is a required parameter");
  }
  try {
    const headers = !apiKey ? {} : {'x-api-key': apiKey};
    const dogApiResponse = await fetch(fetchUri, {
        method: 'GET',
        headers,
    });
    if (dogApiResponse.status !== 200) {
      return [];
    }
    return dogApiResponse.json();
  } catch (error) {
    console.warn(error);
    window.alert("Please stablish an internet conection first");
  }
};
