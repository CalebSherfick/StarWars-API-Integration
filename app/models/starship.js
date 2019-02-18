export default class Starship {
  constructor(data) {
    this.name = data.name
    this.model = data.model
    this.starshipClass = data.starship_class || data.starshipClass
    this.costInCredits = data.cost_in_credits || data.costInCredits
    this.url = data.url
  }

  getBasicTemplate() {
    return `<li onclick="app.controllers.swController.getStarship('${this.url}')">${this.name}</li>`
  }

  getDetailedTemplate() {
    return `
     <h3>${this.name}</h3>
       <p>Model: ${this.model}</p>
       <p>Class: ${this.starshipClass}</p>
       <p>Price: ${this.costInCredits}</p>
         `
  }



}