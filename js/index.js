'use strict';

let numRows = document.querySelector('#entries').value;
document.querySelector("#next-btn").textContent = "Next " + numRows;

// fill options for clubs and show initial values in the table
d3.csv("data.csv").then(function(data) {
  clubValues(data);
  renderRows(data, numRows);
  entries(data);
})

// add option values for Club in the search form
function clubValues(arrayData) {
  let clubOptions = [];
  arrayData.forEach(function(item) {
    if (!clubOptions.includes(item.Club)) {
      clubOptions.push(item.Club);
    }
  })
  let clubSelect = document.querySelector("#club");
  clubOptions.forEach(function(club) {
    let clubElement = document.createElement('option');
    clubElement.textContent = club;
    clubElement.value = club;
    clubSelect.appendChild(clubElement);
  })
}

// add rows for the data table
function renderRows(arrayData, numRows) {
  let tableBodyElement = document.querySelector('#table-body');
  tableBodyElement.innerHTML = '';
  let end = arrayData.length;
  if (arrayData.length >= numRows) {
    end = numRows;
  }
  for (let i = 0; i < end; i++) {
    let rowElement = document.createElement('tr');

    let th = document.createElement('th');
    th.textContent = i + 1;
    rowElement.appendChild(th);

    let td1 = document.createElement('td');
    let img = document.createElement('img');
    img.src = arrayData[i].Photo;
    img.alt = arrayData[i].Name;
    img.onerror = function() {
      td1.textContent = "Image Unavailable";
    }
    img.classList.add('player-img');
    td1.appendChild(img);
    rowElement.appendChild(td1);

    let td2 = document.createElement('td');
    let link = document.createElement('a');
    link.href = "#navigate";
    link.textContent = arrayData[i].Name;
    link.addEventListener('click', function() {
      toggleSpinner();
      findPlayer(arrayData[i].Name, arrayData[i].Nationality, arrayData[i].Photo,
        arrayData[i].Age, arrayData[i].Position);
    });
    td2.appendChild(link);
    rowElement.appendChild(td2);

    let td3 = document.createElement('td');
    td3.textContent = arrayData[i].Nationality;
    rowElement.appendChild(td3);

    let td4 = document.createElement('td');
    td4.textContent = arrayData[i].Club;
    rowElement.appendChild(td4);

    let td5 = document.createElement('td');
    td5.classList.add('badge');
    let pos = arrayData[i].Position;
    if (pos == "GK") {
      td5.classList.add('gk-badge');
    } else if (pos.includes("M")) {
      td5.classList.add('mid-badge');
    } else if (pos.includes("B")) {
      td5.classList.add('def-badge');
    } else {
      td5.classList.add('striker-badge');
    }
    td5.textContent = pos;
    rowElement.appendChild(td5);

    tableBodyElement.appendChild(rowElement);
  }
}

// functionality for number of entries in the data table
function entries(data) {
  document.querySelector('#entries').addEventListener('input', function() {
    document.querySelector("#next-btn").style.display = "inline-block";
    numRows = document.querySelector('#entries').value;
    if (numRows == "All") {
      numRows = data.length;
      document.querySelector("#next-btn").style.display = "none";
    }
    document.querySelector("#next-btn").textContent = "Next " + numRows;
    renderRows(data, numRows);
  })
}

// functionality for the search button
document.querySelector('#search-btn').addEventListener('click', function(event) {
  event.preventDefault();
  document.querySelector('#card-div').style.display = "none";
  
  // create a reset button
  let clearButton = document.createElement('button');
  clearButton.classList.add('btn');
  clearButton.type = "reset";
  let btnText = document.createElement('a');
  btnText.href = 'index.html';
  btnText.id = 'top-text';
  btnText.textContent = "Reset";
  clearButton.appendChild(btnText);
  document.querySelector('form').appendChild(clearButton);
  
  let nameValue = document.querySelector('#name').value;
  let nationalityValue = document.querySelector('#nationality').value;
  let clubValue = document.querySelector('#club').value;
  let positionValue = document.querySelector('#position').value;
  let footValue = document.querySelector('#foot').value;
  let ageValue = document.querySelector('#age').value;
  filterData(nameValue, nationalityValue, clubValue, positionValue, footValue, ageValue);
});

// filter data based on search conditions
function filterData(nameValue, nationalityValue, clubValue, positionValue, footValue, ageValue) {
  d3.csv("data.csv").then(function(data) {
    let filteredArray = data;
    if (nameValue != "") {
      filteredArray = filteredArray.filter(function(item){
        return item.Name.includes(nameValue);
      });
    }
    if (!nationalityValue.includes("Choose Country")) {
      filteredArray = filteredArray.filter(function(item){
        return item.Nationality.includes(nationalityValue);
      });
    }
    if (!clubValue.includes("Choose Club")) {
      filteredArray = filteredArray.filter(function(item){
        return item.Club.includes(clubValue);
      });
    }
    if (!positionValue.includes("Choose Position")) {
      filteredArray = filteredArray.filter(function(item){
        return item.Position.includes(positionValue);
      });
    }
    if (!footValue.includes("Choose Foot")) {
      filteredArray = filteredArray.filter(function(item){
        return item.Preferred_Foot.includes(footValue);
      });
    }
    if (ageValue != "") {
      filteredArray = filteredArray.filter(function(item){
        return item.Age.includes(ageValue);
      });
    }
    renderRows(filteredArray, numRows);
    entries(filteredArray);
  })
}

// As I am using another api for player statistics, this function will link both my data sources
function findPlayer(name, nationality, image, age, position) {
  let uriTemplate = "https://api-football-v1.p.rapidapi.com/v2/players/search/{searchTerm}";
  name = name.replace(" Jr", "");
  let uri = uriTemplate.replace("{searchTerm}", name);
  fetch(uri, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "1dabf1c3d7msh55afa5567b7c88cp15c795jsn3e75701730e9"
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    getPlayerID(data.api.players);
  });

  // finds player id which will be used to extract that player's statistics
  function getPlayerID(playerStatArray) {
    let player = {};
    if (position == "GK") {
      position = "Goalkeeper";
    } else if (position.includes("M")) {
      position = "Midfielder";
    } else if (position.includes("B")) {
      position = "Defender";
    } else {
      position = "Attacker";
    }
    playerStatArray.forEach(function(item) {
      if (item.nationality == nationality && item.age > age && item.age < age + 5
          && item.position == position) {
        player = item;
      }
    })
    player.Photo = image;
    getStats(player.player_id, player.Photo);
  }
}

// get statistics of a player
function getStats(id, image) {
  let uriTemplate = "https://api-football-v1.p.rapidapi.com/v2/players/player/{id}";
  let uri = uriTemplate.replace("{id}", id);
  fetch(uri, {
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
      "x-rapidapi-key": "1dabf1c3d7msh55afa5567b7c88cp15c795jsn3e75701730e9"
    }
  })
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    createCard(data.api.players[0], image);
  })
  .catch(function() {
    renderError();
  })
  .then(function() {
    toggleSpinner();
  });
}

// creates a plyer card with all the player information in it
function createCard(playerObj, photo) {
  document.querySelector('#card-div').style.display = "flex";

  let img = document.querySelector('#player-image');
  img.src = photo;
  img.alt = playerObj.player_name;

  let name = document.querySelector('.card-header');
  name.textContent = playerObj.player_name;

  let p1 = document.querySelector('#player-age');
  p1.textContent = playerObj.age + " years";
 
  let p2 = document.querySelector('#player-birth');
  p2.textContent = playerObj.birth_date;
 
  let p3 = document.querySelector('#player-nationality');
  p3.textContent = playerObj.nationality;
 
  let p4 = document.querySelector('#player-position');
  p4.textContent = playerObj.position;
 
  let p5 = document.querySelector('#current-league');
  p5.textContent = playerObj.league;
  
  let  p6 = document.querySelector('#current-club');
  p6.textContent = playerObj.team_name;
 
  let p7 = document.querySelector('#player-height');
  p7.textContent = playerObj.height;
 
  let p8 = document.querySelector('#player-weight');
  p8.textContent = playerObj.weight;
 
  let p9 = document.querySelector('#current-season');
  p9.textContent = playerObj.season;
 
  let p10 = document.querySelector('#player-rating');
  p10.textContent = playerObj.rating;
 
  let p12 = document.querySelector('#player-games');
  p12.textContent = playerObj.games.appearences + " games";
 
  let p13 = document.querySelector('#player-minutes');
  p13.textContent = playerObj.games.minutes_played + " minutes";
 
  let p14 = document.querySelector('#player-goals');
  p14.textContent = playerObj.goals.total;
 
  let p15 = document.querySelector('#player-assists');
  p15.textContent = playerObj.goals.assists;
 
  let p16 = document.querySelector('#player-shots');
  p16.textContent = playerObj.shots.total + "(" + playerObj.shots.on + ")";
 
  let p17 = document.querySelector('#player-passes');
  p17.textContent = playerObj.passes.total;
 
  let p18 = document.querySelector('#player-tackles');
  p18.textContent = playerObj.tackles.total;
 
  let p19 = document.querySelector('#player-duels');
  p19.textContent = playerObj.duels.total + "(" + playerObj.duels.won + ")";
 
  let p20 = document.querySelector('#player-dribbles');
  p20.textContent = playerObj.dribbles.attempts + "(" + playerObj.dribbles.success + ")";
 
  let p21 = document.querySelector('#player-fouls');
  p21.textContent = playerObj.fouls.drawn;
 
  let p22 = document.querySelector('#player-booked');
  p22.textContent = (playerObj.cards.yellow + playerObj.cards.yellowred + playerObj.cards.red) + "(" + playerObj.cards.red + ")";
 
  let p23 = document.querySelector('#player-captain');
  p23.textContent = playerObj.captain + " times";
}

// toggles the loading spinner
function toggleSpinner() {
  let spinner = document.querySelector('.fa-spinner');
  spinner.classList.toggle('d-none');
}

// renders the error message
function renderError() {
  alert("Sorry! Stats for this player are not available currently.");
}