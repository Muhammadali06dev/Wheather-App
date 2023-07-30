
// request to data and get it 
const KEY = 'c5c97a45f197cf36118ea78ca0c374de'

const getData = async (city) => {
   const base = 'https://api.openweathermap.org/data/2.5/weather'
   const query = `?q=${city}&units=metric&appid=${KEY}`

   loader(true)
   const request = await fetch(base + query)

   if (request.status >= 400) {
      loader(false)
      throw new Error("Country or City Not Found :(")
   }
   const data = await request.json()
   loader(false)

   return data
}
