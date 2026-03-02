async function searchCountry(){
        const showLoad=document.getElementById("loading-spinner");
        const countryName=document.getElementById("country-input").value;
        const errorMessage=document.getElementById("error-message");
        try{
        const response=await fetch(`https://restcountries.com/v3.1/name/${countryName}`);
        // while waiting for response show spinner
        const data=await response.json();
        const country=data[0];

        // Example DOM updates
        document.getElementById('country-info').innerHTML = `
            <h2>${country.name.common}</h2>
            <p><strong>Capital:</strong> ${country.capital[0]}</p>
            <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
            <p><strong>Region:</strong> ${country.region}</p>
            <img src="${country.flags.svg}" alt="${country.name.common} flag">
        `;
            
        }
        catch(error){
          
            errorMessage.innerText=error;

        }
        finally{
            
            showLoad.style.display="none";
        }
     
}
// Event listeners
document.getElementById('search-btn').addEventListener('click', () => {
    const country = document.getElementById('country-input').value;
    searchCountry(country);
});

function showSpinner(){
     const showLoad=document.getElementById("loading-spinner");
     const hiddenBox=document.getElementById("hideId");
     hiddenBox.style.display="flex";
     hiddenBox.style.width="100%";
    hiddenBox.style.height="100vh";
    hiddenBox.style.backgroundColor="grey";
}