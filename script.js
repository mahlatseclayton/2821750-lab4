
     const errorMessage=document.getElementById("error-message");
async function searchCountry() {
    const hiddenDisplay = document.getElementById("hideId");
    const countryInfo=document.getElementById("country-info");
    const borderContainer=document.getElementById("bordering-countries");
    const errorMessage = document.getElementById("error-message");
    hiddenDisplay.style.display = "flex";
    errorMessage.innerText = "";
    countryInfo.innerHTML = "";
    borderContainer.innerHTML = "";
 const countryName = document.getElementById("country-input").value;
        if(countryName==""){
           errorMessage.innerText="Country Name required!";
           hiddenDisplay.style.display = "none";
            return;
        }
        else{
            
    try {
       
        const response = await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        const data = await response.json();
        const country = data[0];

        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital?.[0] ?? "N/A"}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;

        const codes = country.borders;
        if (codes && codes.length > 0) {
            await getBorderCountry(codes);  // wait for border fetches
        }
        else{
            errorMessage.innerText="No bordering countries";
           hiddenDisplay.style.display = "none";
        }

    } catch (error) {
        errorMessage.innerText = error.message;
    } finally {
        hiddenDisplay.style.display = "none";
    }}
}
// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});
async function getBorderCountry(codes) {
    const errorMessage = document.getElementById("error-message");
    const container = document.getElementById("bordering-countries");

    for (let code of codes) {  
        try {
            const response = await fetch(`https://restcountries.com/v3.1/alpha/${code}`);
            const data = await response.json();
            const country = data[0];

            const borders = document.createElement("section");
            borders.style.backgroundColor="rgb(240, 240, 240)";
            borders.style.border="2px solid blue";
            borders.style.borderRadius="12px";
            borders.style.margin="20px";
            borders.innerHTML = `
                <h2>${country.name.common}</h2>
                <img src="${country.flags.svg}" alt="${country.name.common} flag" width="100">
            `;
            container.appendChild(borders);

        } catch (error) {
            errorMessage.innerText = error.message;
        }
    }
}