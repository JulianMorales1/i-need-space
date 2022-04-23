
let apiKey = document.querySelector('#api-key');

let address = document.querySelector('#address');

let noRad = document.querySelector('#norad');

let search = document.querySelector('#search');


search.addEventListener('click', function(){
    let addressInput = encodeURI(address.value)
    let token = apiKey.value
   
    fetch (`https://api.mapbox.com/geocoding/v5/mapbox.places/${addressInput}.json?limit=2&access_token=${token}`)
    .then(function(httpResponse){
    return httpResponse.json()
    })
    .then(function(data){

        console.log(data)
        console.log(data.message)

    let noRadInput = noRad.value
    let latitude = data.features[0].center[1].toFixed(2)
    let longitude = data.features[0].center[0].toFixed(2)

        console.log(latitude)
        console.log(longitude)

    fetch(`https://satellites.fly.dev/passes/${noRadInput}?lat=${latitude}&lon=${longitude}&limit=1&days=15&visible_only=true`)
    .then(function(httpResponse){
       // console.log(httpResponse)
        
        return httpResponse.json()
    })
    .then(function(data){
        console.log(data)
        console.log(data.message)

        let riseLabel = document.querySelector('#rise')
        let culminateLabel = document.querySelector('#culminate')
        let setLabel = document.querySelector('#set')
    
        riseLabel.innerText = "Rise: " + new Date(data[0].rise.utc_datetime) + '\n' + '\n'
        culminateLabel.innerText = "Culmination: " + new Date(data[0].culmination.utc_datetime) + '\n' + '\n'
        setLabel.innerText = "Set: " + new Date(data[0].set.utc_datetime)
    })
   



    })
})
