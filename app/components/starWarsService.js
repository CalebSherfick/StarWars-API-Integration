//private
import Person from "../models/person.js";

//Creates an object to send requests from
let _peopleApi = axios.create({
  baseURL: 'https://swapi.co/api/people'
})


let _state = {
  people: [],
  nextPrevPeople: {
    nextUrl: '',
    previousUrl: ''
  },
  activePerson: {}
}

let _subscribers = {
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
  //get local data
  get People() {
    //Breaks Refrences of each object in state
    return _state.people.map(p => new Person(p))
  }

  get Next() {
    return _state.nextPrevPeople.nextUrl
  }

  get Previous() {
    return _state.nextPrevPeople.previousUrl
  }

  get ActivePerson() {
    //Creates a new object that is a copy of the active person (breaking refrence)
    return new Person(_state.activePerson)
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