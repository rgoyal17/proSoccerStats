'use strict';

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

// add first few rows for data table
function addRows(arrayData) {
  let tableBodyElement = document.querySelector('#table-body');
  tableBodyElement.innerHTML = '';
  let end = arrayData.length;
  if (arrayData.length >= 10) {
    end = 10;
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
    link.href = "player.html";
    link.target = "_blank";
    link.textContent = arrayData[i].Name;
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

d3.csv("data.csv").then(function(data) {
  console.log(data);
  clubValues(data);
  addRows(data);
  filterData(data);
});

// filter data based on search conditions
function filterData(arrayData) {
  document.querySelector('#search-btn').addEventListener('click', function(event) {
    event.preventDefault();
    let nameValue = document.querySelector('#name').value;
    let nationalityValue = document.querySelector('#nationality').value;
    let clubValue = document.querySelector('#club').value;
    let positionValue = document.querySelector('#position').value;
    let footValue = document.querySelector('#foot').value;
    let ageValue = document.querySelector('#age').value;
    let filteredArray = arrayData;
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
    addRows(filteredArray);
  })
}

// fetch("https://api.sportradar.us/soccer-images-t3/ap/world-cup/headshots/players/2016/manifest.json?api_key=jkkmdgd7nyr8gyqgajppxxc7")
//     .then(function(response) {
//       return response.json();
//     })
//     .then(function(data) {
//       console.log(data);
//     })