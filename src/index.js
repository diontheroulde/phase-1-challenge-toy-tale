let addToy = false;
const toyContainer = document.querySelector("#toy-collection")

const handleLikeToy = (event) => {
  
  const clickedButton = event.target
  const toyId = clickedButton.id
  const fetchUrl = `http://localhost:3000/toys/${toyId}`
 
  
  
  const pWithLikes = clickedButton.previousSibling
  const previousLikes = parseInt(pWithLikes.innerText)
  const newLikes = previousLikes + 1
  


const configurationObject = {
  method : "PATCH",
  headers : {
    "Content-Type" : "application/json",
    Accept : "application/json"
  },
  body : JSON.stringify({
    likes: newLikes
     
   })
}

fetch(fetchUrl, configurationObject)
  .then(response => response.json())
  .then( updatedToy => {
   console.log(updatedToy)
    pWithLikes.innerText = `${updatedToy.likes} likes`
  })

}


const addToyCard = (toy) => {
  console.log(toy)
  let newToyCard = document.createElement("div")
  newToyCard.classList.add("card")


  let h2 = document.createElement("h2")
    h2.innerText = toy.name
    

  let img = document.createElement("img")
  img.src = toy.image
  img.classList.add("toy-avatar")
  

  let p = document.createElement("p")
  p.innerText = `${toy.likes} likes`


  let btn = document.createElement("button")
  btn.classList.add("like-btn")
  btn.setAttribute("id", toy.id)
  btn.innerText = "Like"
  btn.addEventListener("click", (event) => handleLikeToy(event))
  
  newToyCard.append(h2, img, p, btn)
  toyContainer.append(newToyCard)
}

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  
  

  fetch("http://localhost:3000/toys")
  .then(response => response.json())
  .then(data => {
    data.forEach(toy => addToyCard(toy))
  })

  
  const submitNewToyBttn = document.querySelector(".submit")
  submitNewToyBttn.addEventListener("click", (event) => {
    event.preventDefault()   
    const toyForm = document.querySelector(".add-toy-form")
    const newToyName = toyForm.name.value
    const newToyImage = toyForm.image.value
 
  const configurationObject = {
    method : "POST",
    headers : {
      "Content-Type" : "application/json",
      Accept : "application/json"
    },
    body : JSON.stringify({
      name: newToyName,
      image: newToyImage,
      likes: 0
     })
  }


  console.log(configurationObject)

  fetch ("http://localhost:3000/toys", configurationObject)
  .then( response => response.json())
  .then(data => {
    addToyCard(data)
  })
})
    
  
    
   

  
  
  
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  })
})
