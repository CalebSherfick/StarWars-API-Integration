//private
import Person from "../models/person.js";
import Starship from "../models/starship.js";

//Creates an object to send requests from
// @ts-ignore
let _peopleApi = axios.create({
  baseURL: 'https://swapi.co/api/people'
})

// @ts-ignore
let _starshipsApi = axios.create({


  baseURL: 'https://swapi.co/api/starships'
})

let _state = {
  starships: [],
  nextPrevStarships: {
    nextUrl: '',
    previousUrl: ''
  },
  activeStarship: {},
  people: [],
  nextPrevPeople: {
    nextUrl: '',
    previousUrl: ''
  },
  activePerson: {}
}

let _subscribers = {
  starships: [],
  nextPrevStarships: [],
  activeStarship: [],
  people: [],
  nextPrevPeople: [],
  activePerson: []
}

//HANDLES ALL ASYNC
function setState(prop, value) {
  _state[prop] = value
  _subscribers[prop].forEach(fn => fn());
}


//public
export default class StarWarsService {
  addSubscriber(prop, fn) {
    _subscribers[prop].push(fn)
  }

  get Starships() {
    return _state.starships.map(s => new Starship(s))
  }
  get NextStarships() {
    return _state.nextPrevStarships.nextUrl
  }
  get PreviousStarships() {
    return _state.nextPrevStarships.previousUrl
  }
  get ActiveStarship() {
    return new Starship(_state.activeStarship)
  }


  //get local data
  get People() {
    //Breaks Refrences of each object in state
    return _state.people.map(p => new Person(p))
  }
  get NextPeople() {
    return _state.nextPrevPeople.nextUrl
  }
  get PreviousPeople() {
    return _state.nextPrevPeople.previousUrl
  }
  get ActivePerson() {
    //Creates a new object that is a copy of the active person (breaking refrence)
    return new Person(_state.activePerson)
  }





  getAllApiStarships(url = '') {
    _starshipsApi.get(url)
      .then(response => {
        let starships = response.data.results.map(ds => new Starship(ds))
        let urlData = {
          nextUrl: response.data.next,
          previousUrl: response.data.previous
        }
        setState('nextPrevStarships', urlData)
        setState('starships', starships)
      })
      .catch(err => {
        console.error(err)
      })
  }
  getOneApiStarship(url) {
    _starshipsApi.get(url)
      .then(res => {
        setState('activeStarship', new Starship(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }



  //make a call to swapi api to get all people
  getAllApiPeople(url = '') {
    _peopleApi.get(url)
      //Happens after data comes back
      .then(response => {
        //all axios requests return 'data' in the response
        let people = response.data.results.map(d => new Person(d))
        let urlData = {
          nextUrl: response.data.next,
          previousUrl: response.data.previous
        }
        setState('nextPrevPeople', urlData)
        setState('people', people)
      })
      .catch(err => {
        console.error(err)
      })
  }
  getOneApiPerson(url) {
    _peopleApi.get(url)
      .then(res => {
        setState('activePerson', new Person(res.data))
      })
      .catch(err => {
        console.error(err)
      })
  }

}