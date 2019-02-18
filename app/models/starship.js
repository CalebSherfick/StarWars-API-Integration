export default class Starship {
  constructor(data) {
    this.name = data.name
    this.model = data.model
    this.starshipClass = data.starship_class || data.starshipClass
    this.costInCredits = data.cost_in_credits || data.costInCredits
  }

  getBasicTemplate() {
    return `<li onclick="app.controllers.swController.getPerson('${this.url}')" class="${this.gender}">${this.name}</li>`
  }

  getDetailedTemplate() {
    return `
     <h3>${this.name}</h3>
       <p>Hair: ${this.hairColor}</p>
       <p>Eyes: ${this.eyeColor}</p>
       <p>Movies: ${this.movies}</p>
         `
  }



}