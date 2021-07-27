// in production, we should import the API key from a private directory on the backend server
const API_KEY = "74db8efa2a6db279393b433d97c2bc843f8e32b0"
const teams = [] 

function alertCORSPolicy() {
  // handles a common error when failing to fetch the API data
  // directs a user to install a plugin which will fix the problem

  // Fetch requests to https://delivery.chalk247.com/(...) contain an "Access-Control-Allow-Origin" header
  return alert(`Error: NFL API did not respond.
You may have to install the "Moesif Origin & CORS Changer extention.
Chrome: 
  https://chrome.google.com/webstore/detail/moesif-origin-cors-change/digfbfaphojjndkpccljibejjbppifbc
Firefox: 
  https://addons.mozilla.org/en-CA/firefox/addon/moesif-origin-cors-changer1/`)
}

async function fetchNFLData() {
  /* fetches NFL team data from API
  
  ASSUMPTION MADE!

  fetch requests were resulting in the following error:
    Access to fetch at "API_URL" from origin "LOCAL_HOST" has been blocked by CORS policy:
    No "Access-Control-Allow-Origin" header is present on the requested resource. If an opaque
    response serves your needs, set the request"s mode to "no-cors" to fetch the resource with
    CORS disabled.

  Because I cannot edit the policies on the resourse server, I had to install and enable the 
  "Moesif Origin & CORS Changer" extention on my browser.
  */

  async function addStanding(standingsJSON) {
    // from the existing NFL team data, add a "rank" attribute
    let standings = standingsJSON.results.data
    for(let team of standings){
      // find the team (from existing teams array) with a matching team id, then add rank attribute
      let targetTeam = teams.find(t => t.id === team.team_id)
      targetTeam.rank = team.rank
    }
  }

  try {
    // fetch team data
    let response = await fetch(`http://delivery.chalk247.com/team_list/NFL.JSON?api_key=${API_KEY}`)
    let results = await response.json() 
    // save only the data needed to teams array
    results.results.data.team.forEach(team => teams.push(team))
    // fetch nfl team standings
    response = await fetch(`http://delivery.chalk247.com/team_rankings/NFL.JSON?api_key=${API_KEY}`)
    results = await response.json()
    await addStanding(results)
  } catch (err){
    // check for CORS policy error
    if(err instanceof TypeError) alertCORSPolicy()
    else console.log(err)
  }
}

function sortingBtns() {
  // spawns the 3 sorting buttons and attaches event listeners
  const btnsHTML = `
  <div class="btns__container">
    <button id="btn-league" class="btn">League</button>
    <button id="btn-conference" class="btn">Conference</button>
    <button id="btn-division" class="btn">Division</button>
  </div>
  `
  // add btns to the app
  document.getElementById("app__container").insertAdjacentHTML("afterbegin", btnsHTML)

  // attach button functions
  const leagueBtn = document.getElementById("btn-league")
  const conferenceBtn = document.getElementById("btn-conference")
  const divisionBtn = document.getElementById("btn-division")
  leagueBtn.addEventListener("click", league)
  conferenceBtn.addEventListener("click", conference)
  divisionBtn.addEventListener("click", division)
}

function league() {
  // onClick, onLoad event
  // sorts NFL teams by overall league standings

  const leagueBtn = document.getElementById("btn-league")
  const container = document.getElementById("teams__container")

  // check if already sorting by league
  if(!leagueBtn.classList.contains("active")){
    console.log("sort by league")
    container.innerHTML = "" // clear all previous content
    leagueBtn.classList.add("active") // prevent multiple function calls

    // remove active status from other sorting buttons
    document.getElementById("btn-conference").classList.remove("active")
    document.getElementById("btn-division").classList.remove("active")
    container.classList = "" // clear previous container sort
    container.classList.add("league") // app container is now sorting by league

    // sort teams by overall league standings. This will be the default
    teams.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)  
    let standing = 1
    for (team of teams){
      // now that the teams are in order, place them in the DOM
      appendTeam(team, standing)
      standing++
    }
  }
}

function conference() {
  // onClick event
  // sorts NFL teams by converence

  const conferenceBtn = document.getElementById("btn-conference")
  const container = document.getElementById("teams__container")

  // check if already sorting by conference
  if(!conferenceBtn.classList.contains("active")){
    console.log("sort by conference")
    container.innerHTML = "" // clear all previous content
    conferenceBtn.classList.add("active") // prevent multiple function calls

    // remove active status from other sorting buttons
    document.getElementById("btn-league").classList.remove("active")
    document.getElementById("btn-division").classList.remove("active")
    container.className = "" // clear previous container sort
    container.classList.add("conference") // app is now sorting by conference

    // prepare landing divs
    container.innerHTML += 
      `<div id="national_conference">
        <img src="img/national_football_conference.gif"/>
      </div>
      <div id="american_conference">
        <img src="img/american_football_conference.gif"/>
      </div>`

    // sort teams by confernce
    const national = []
    const american = []
    for (team of teams) {
      if (team.conference === "National Football Conference") national.push(team)
      else american.push(team)
    }

    // order conferences by team rank
    national.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)
    american.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)
    // now that the conferences are each ordered, place them in the landing divs
    for(let i=0; i < national.length; i++) appendTeam(national[i], i+1, national[i].conference)
    for (let i=0; i < american.length; i++) appendTeam(american[i], i+1, american[i].conference)
  }
}

function division() {
  // onClick event
  // sorts NFL teams by division

  const divisionBtn = document.getElementById("btn-division")
  const container = document.getElementById("teams__container")
  // check if already sorting by division
  if(!divisionBtn.classList.contains("active")){
    console.log("sort by division")
    container.innerHTML = "" // clear all previous content
    divisionBtn.classList.add("active") // prevent multiple function calls

    // remove active status from other buttons
    document.getElementById("btn-league").classList.remove("active")
    document.getElementById("btn-conference").classList.remove("active")
    container.className = "" // clear previous container sort
    container.classList.add("division") // app is now sorting by divisions

    // prepare landing divs
    container.innerHTML += 
      `<div id="national_divisions">
        <img src="img/national_football_conference.gif" class="national-logo"/>
        <span class="division__title">North</span>
        <div id="national__north" class="division__container"></div>
        <span class="division__title">East</span>
        <div id="national__east" class="division__container"></div>
        <span class="division__title">South</span>
        <div id="national__south" class="division__container"></div>
        <span class="division__title">West</span>
        <div id="national__west" class="division__container"></div>
      </div>
      <div id="american_divisions">
        <img src="img/american_football_conference.gif" class="american-logo"/>
        <span class="division__title">North</span>
        <div id="american__north" class="division__container"></div>
        <span class="division__title">East</span>
        <div id="american__east" class="division__container"></div>
        <span class="division__title">South</span>
        <div id="american__south" class="division__container"></div>
        <span class="division__title">West</span>
        <div id="american__west" class="division__container"></div>
      </div>`

    // sort teams by division
    const national = {north: [], east: [], south: [], west: []}
    const american = {north: [], east: [], south: [], west: []}
    for (team of teams) {
      if (team.conference === "National Football Conference") {
        if (team.division === "North") national.north.push(team)
        else if (team.division === "East") national.east.push(team)
        else if (team.division === "South") national.south.push(team)
        else national.west.push(team)
      } 
      else {
        if (team.division === "North") american.north.push(team)
        else if (team.division === "East") american.east.push(team)
        else if (team.division === "South") american.south.push(team)
        else american.west.push(team)
      } 
    }

    // order divisions by team rank
    national.north.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)
    national.east.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)
    national.south.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)
    national.west.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)
    american.north.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)
    american.east.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)
    american.south.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)
    american.west.sort((a, b) => (parseInt(a.rank) < parseInt(b.rank)) ? -1 : 1)

    // now that divisions are each ordered, place them in the landing divs
    for(let i=0; i < national.north.length; i++) appendTeam(national.north[i], i+1, national.north[i].conference, national.north[i].division)
    for(let i=0; i < national.east.length; i++) appendTeam(national.east[i], i+1, national.east[i].conference, national.east[i].division)
    for(let i=0; i < national.south.length; i++) appendTeam(national.south[i], i+1, national.south[i].conference, national.south[i].division)
    for(let i=0; i < national.west.length; i++) appendTeam(national.west[i], i+1, national.west[i].conference, national.west[i].division)
    for(let i=0; i < american.north.length; i++) appendTeam(american.north[i], i+1, american.north[i].conference, american.north[i].division)
    for(let i=0; i < american.east.length; i++) appendTeam(american.east[i], i+1, american.east[i].conference, american.east[i].division)
    for(let i=0; i < american.south.length; i++) appendTeam(american.south[i], i+1, american.south[i].conference, american.south[i].division)
    for(let i=0; i < american.west.length; i++) appendTeam(american.west[i], i+1, american.west[i].conference, american.west[i].division)
  }
}

function appendTeam(team, standing, conference = undefined, division = undefined) {
  // whether sorting by league, conference or divison, places team data in the DOM appropriately
  // calls to this function should be in order of rank

  // handle LA, NY teams names already formatted properly
  let fullName
  if (team.name === "LA Rams" || 
    team.name === "LA Chargers" || 
    team.name === "NY Jets" ||
    team.name === "NY Giants") fullName = team.name
  else fullName = `${team.name} ${team.nickname}`

  // prepare content div
  teamHTML = `
    <span class="team__standing">${standing}</span>
    <div class="team__logo">
      <img src="img/${team.nickname}.png" class="team__logo-img" alt="${fullName} logo"/>
    </div>
    <span class="team__title">${fullName}</span>`

  // if division arg was supplied, app is sorting by division
  if (division !== undefined) {
    // place content in appropriate landing div based on division
    if (division === "North") {
      if (conference === "National Football Conference") {
        const natNorth = document.getElementById("national__north")
        natNorth.innerHTML += teamHTML
      } else {
        const amNorth = document.getElementById("american__north")
        amNorth.innerHTML += teamHTML
      }
    } else if (division === "East") {
      if (conference === "National Football Conference") {
        const natEast = document.getElementById("national__east")
        natEast.innerHTML += teamHTML
      } else {
        const amEast = document.getElementById("american__east")
        amEast.innerHTML += teamHTML
      }
    } else if (division === "South") {    
      if (conference === "National Football Conference") {
        const natSouth = document.getElementById("national__south")
        natSouth.innerHTML += teamHTML
      } else {
        const amSouth = document.getElementById("american__south")
        amSouth.innerHTML += teamHTML
      }
    } else {
      if (conference === "National Football Conference") {
        const natWest = document.getElementById("national__west")
        natWest.innerHTML += teamHTML
      } else {
        const amWest = document.getElementById("american__west")
        amWest.innerHTML += teamHTML
      }
    }
  // if conference arg was supplied, app is sorting by conference
  } else if (conference !== undefined) {
    // place content in appropriate landing div based on conference
    if (conference === "National Football Conference") {
      let nationalContainer = document.getElementById("national_conference")
      nationalContainer.innerHTML += teamHTML
    } else if (conference === "American Football Conference") {
      let americanContainer = document.getElementById("american_conference")
      americanContainer.innerHTML += teamHTML
    }
  // app is sorting by league 
  } else {
    // append team element to DOM
    const container = document.getElementById("teams__container")
    container.innerHTML += teamHTML
  }
}

async function startApp() {
  await fetchNFLData()
  // once the data is successfully fetched, display the sorting options
  sortingBtns()
  // by default, sort by overall league standings
  league()
}
startApp()