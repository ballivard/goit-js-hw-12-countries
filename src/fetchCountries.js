const fetchCountries = async (searchQuery) => {
    const DATA_URL = 'https://restcountries.eu/rest/v2/name/'
    let url = `${DATA_URL}${searchQuery}`
    try {
      const res = await fetch(url);
      return await res.json();
    } 
    catch (error) {
      return console.log('error');
    }
}

export default fetchCountries;