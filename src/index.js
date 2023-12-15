function fetchDogBar() {
    fetch("http://localhost:3000/pups")
      .then(res => res.json())
      .then(data => data.forEach(pup => renderDogs(pup)))
      .catch(error => console.log(error));

      
      const button = document.getElementById('good-dog-filter');
      button.addEventListener('click', ()=>  clickDogFilter(button));
  };

  function renderDogs(pup) {
    const dogBar = document.getElementById("dog-bar");
    console.log(pup);
            const span = document.createElement('span');
            span.textContent = pup.name;
            
            dogBar.appendChild(span);

            //Event Listener 
            span.addEventListener('click', ()=> clickDogName(pup));
            
            
  };

  //CB Functions 
  function clickDogName(pup){
    const dogInfo = document.getElementById("dog-info");
    dogInfo.textContent = "";

    const img = document.createElement('img');
    const h2 = document.createElement('h2');

    const button = document.createElement('button');

if (pup.isGoodDog){
    button.textContent = "Good dog!";

}else{
    button.textContent = "Bad dog!";
}
    
    img.src = pup.image;
    h2.textContent = pup.name;

    dogInfo.appendChild(img);
    dogInfo.appendChild(h2);
    dogInfo.appendChild(button);

    button.addEventListener('click', ()=> updateGoodFilter(pup));
  }

  function clickDogFilter(goodDogFilter){
    // const goodDogFilter = document.getElementById("good-dog-filter");
    // console.log("Value of goodDogFilter.textContent: " + goodDogFilter.textContent);
    if (goodDogFilter.textContent == "Filter good dogs: OFF"){
        goodDogFilter.textContent = "Filter good dogs: ON";
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(data => filterOutBadDogs(data))
        .catch(error => console.log(error));
  
    } else {
        goodDogFilter.textContent = "Filter good dogs: OFF";
        fetch("http://localhost:3000/pups")
        .then(res => res.json())
        .then(data => {
          document.getElementById("dog-bar").textContent = "";
          data.forEach(pup => renderDogs(pup))
          })
        .catch(error => console.log(error));
  
    }
    // Step 1: Grab the db.json object and console log current db.json object to see if isGoodDog value are changed

  }

  // function to filter out the bad dogs!
  function filterOutBadDogs(data) {
    // data has ALL the dog Objects

    // console.log("data: " + JSON.stringify(data));

    // // see just the first dog object
    // console.log("data[0]: " + JSON.stringify(data[0]));

    // // see first dog's name
    // console.log("data[0].name: " + data[0].name);


    // // see first dog's isGoodDog value
    // console.log("data[0].name: " + data[0].isGoodDog);

    // Step 2: Manipulate the data to only have dogs with isGoodDog == true
    const newDogList = document.getElementById("dog-bar");
    newDogList.textContent = "";
    const dogArray = data;
    dogArray.forEach((dog) => {
      if (dog.isGoodDog === true) {
        renderDogs(dog);
      }
    });
    // create a new const. called const newDogList
    // To filter, FOR loop data and IF isGoodDog == true, then append to newDogList
    // IF isGoodDog == false, screw it. Don't append.
    // Step 3: Display newDogList
    // Step 4: Re-render page (maybe)


  }

function updateGoodFilter(pup){
    const pupToUpdate = pup;
    pupToUpdate.isGoodDog = !pupToUpdate.isGoodDog; 
    fetch(`http://localhost:3000/pups/${pup.id}`, {
        method:'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(pupToUpdate)
    })
    .then(res => res.json())
    .then(updatedPup => 
        {clickDogName(updatedPup)
        console.log(updatedPup)})
}


  fetchDogBar();