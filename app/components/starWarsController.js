//private
import StarWarsService from "./starWarsService.js";


let _swService = new StarWarsService()


function drawStarships() {
  let starships = _swService.Starships
  let template = ''
  starships.forEach(s => {
    template += s.getBasicTemplate()
  })
  document.getElementById('sw-starships').innerHTML = template
  document.getElementById('starship-buttons').innerHTML = `
  <button ${_swService.PreviousStarships ? '' : 'disabled'} onclick="app.controllers.swController.getStarships('${_swService.Previous}')">Previous</button>
    <button ${_swService.NextStarships ? '' : 'disabled'} onclick="app.controllers.swController.getStarships('${_swService.Next}')">Next</button>
    `
}

function drawActiveStarship() {
  document.getElementById('active-starship').innerHTML = _swService.ActiveStarship.getDetailedTemplate()
}



function drawPeople() {
  let people = _swService.People
  let template = ''
  people.forEach(p => {
    template += p.getBasicTemplate()
  })
  //handles people list
  document.getElementById('sw-people').innerHTML = template
  document.getElementById('buttons').innerHTML = `
    <button ${_swService.PreviousPeople ? '' : 'disabled'} onclick="app.controllers.swController.getPeople('${_swService.Previous}')">Previous</button>
    <button ${_swService.NextPeople ? '' : 'disabled'} onclick="app.controllers.swController.getPeople('${_swService.Next}')">Next</button>
    `
}

function drawActivePerson() {
  document.getElementById('active-person').innerHTML = _swService.ActivePerson.getDetailedTemplate()
}

//public
export default class StarWarsController {
  constructor() {
    //add subscribers to service
    _swService.addSubscriber('people', drawPeople)
    _swService.addSubscriber('activePerson', drawActivePerson)
    _swService.addSubscriber('starship', drawStarships)
    _swService.addSubscriber('activeStarship', drawActiveStarship)


    _swService.getAllApiStarships()
    _swService.getAllApiPeople()
  }

  getStarships(url) {
    _swService.getAllApiStarships(url)
  }
  getStarship(url) {
    _swService.getOneApiStarship(url)
  }


  getPeople(url) {
    _swService.getAllApiPeople(url)
  }
  getPerson(url) {
    _swService.getOneApiPerson(url)
  }

}