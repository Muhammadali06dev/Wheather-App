const changeLocation = document.getElementById('change-location')
const card = document.getElementById('card')
const details = document.getElementById('details')
const weatherIcon = document.getElementById('weather-icon')
const overlay = document.getElementById('overlay')
const error = document.getElementById("error")

changeLocation.city.focus()

// Loader 
function loader(state) {
   if (state) {
      overlay.classList.remove("d-none")
   } else {
      overlay.classList.add("d-none")
   }
}

// updateUI 

const updateUI = (data) => {
   details.innerHTML = `
      <h5 class="mb-3">${data.name}, ${data.sys.country}</h5>
         <p class="mb-3">${data.weather[0].main}</p>
         <div class="display-4 mb-3">
            <span>${Math.round(data.main.temp)}</span>
            <span>&deg;C</span>
         </div>
   `
   if (card.classList.contains("d-none")) {
      card.classList.remove("d-none")
   }
   error.classList.add("d-none")


   weatherIcon.src = ` https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
}


// get weather 
const getWeather = async (city) => {
   const data = await getData(city)

   return data
}

changeLocation.addEventListener("submit", (e) => {
   e.preventDefault()

   const cityName = changeLocation.city.value.trim()
   changeLocation.reset()
   getWeather(cityName)
      .then(data => {
         updateUI(data)
      })
      .catch(err => {
         error.textContent = err.message
         error.classList.remove("d-none")
         card.classList.add("d-none")
      })

})