window.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // get .json => parse it to array
  const getHeroJsonBD = () => {
    // create loader indicator
    const navbarBlock = document.querySelector('.container-navbar'),
      statusMessage = document.createElement('div'),
      messageOk = 'Геройская база обновлена',
      messageError = 'Увы, данные не удалось загрузить',
      select = document.querySelector('.navbar-select');
    
    select.options[0].selected = true;
    
    navbarBlock.appendChild(statusMessage);

    const hideSpinner = (delay, message, classToRemove, classToAdd) => {
      setTimeout(() => {
        if (classToRemove) { statusMessage.classList.remove(classToRemove); }
        if (classToAdd) { statusMessage.classList.add(classToAdd); }
        statusMessage.textContent = message;
        hideSpinner(2000, '', 'loader-message');
      }, delay);
    };

    const formList = (field, key) => {
      const newRequest = new XMLHttpRequest();

      newRequest.addEventListener('readystatechange', (event) => {
        let heroArray = [];
        const cardsContainer = document.querySelector('.container-cards');

        if (newRequest.readyState !== 4) {
          statusMessage.classList.add('loader');
        } else if (newRequest.readyState === 4 && newRequest.status === 200) {
          hideSpinner(1000, messageOk, 'loader', 'loader-message');
          
          cardsContainer.innerHTML = '';
          
          const heroArrayBuf = JSON.parse(newRequest.responseText);
          if (field === '*' && key === '*') {
            heroArray = heroArrayBuf;
          } else {
            heroArrayBuf.forEach(item => {
              if (item[field] === key && field === 'gender') {
                heroArray.push(item);
              } else if (item[field] === undefined && field === 'deathDay' && key === 'undefined') {
                heroArray.push(item);
              } else if (item[field] !== undefined && field === 'deathDay' && key === 'any') {
                heroArray.push(item);
              }
            });
          }

        } else if (newRequest.readyState === 4 && newRequest.status !== 200) {
          hideSpinner(1000, messageError, 'loader', 'loader-message');
          console.warn('request_error');
        }

        heroArray.forEach(item => {
          //console.log('item: ', item);
          const cardItem = document.createElement('div');
          const moviesList = item.movies !== undefined ? item.movies.join(', ') : '-';

          cardItem.classList.add('main-card');
          if (item.photo) {
            cardItem.innerHTML += `<img class='main-card-image' alt='${item.name}' src='${item.photo}'>`;
          } else {
            cardItem.innerHTML += `<img class='main-card-image' alt='${item.name}' src='img/No-image-available-2.jpg'>`;
          }
          cardItem.innerHTML += `<div class='main-card-info'>
          <span class='main-card-item'><strong>Name:</strong> ${item.name}</span><br>
          <span class='main-card-item'><strong>Real name:</strong> ${item.realName !== undefined ? item.realName : '-'}</span><br>
          <span class='main-card-item'><strong>Birth date:</strong> ${item.birthDay !== undefined ? item.birthDay : '-'}</span><br>
          <span class='main-card-item'><strong>Death date:</strong> ${item.deathDay !== undefined ? item.deathDay : '-'}</span><br>
          <span class='main-card-item'><strong>Species:</strong> ${item.species !== undefined ? item.species : '-'}</span><br>
          <span class='main-card-item'><strong>Gender:</strong> ${item.gender !== undefined ? item.gender : '-'}</span><br>
          <span class='main-card-item'><strong>Status:</strong> ${item.status !== undefined ? item.status : '-'}</span><br>
          <span class='main-card-item'><strong>Citizenship:</strong> ${item.citizenship !== undefined ? item.citizenship : '-'}</span><br>
          </div>`;
          cardItem.innerHTML += `<div class='main-card-actor'>
          <hr>
          <span class='main-card-item'><strong>Actor:</strong> ${item.actors !== undefined ? item.actors : '-'}</span><br>
          </div>`;
          cardItem.innerHTML += `<div class='main-card-movies'>
          <hr>
          <span class='main-card-item'><strong>Movies:</strong> ${moviesList}</span><br>
          </div>`;
          cardsContainer.appendChild(cardItem);
        });

        const heroPhotos = document.querySelectorAll('.main-card-image');
        heroPhotos.forEach(item => {
          item.addEventListener('mouseover', (event) => {
            event.target.classList.add('main-card-image--wide');
          });
          item.addEventListener('mouseout', (event) => {
            event.target.classList.remove('main-card-image--wide');
          });
        });
      });

      newRequest.open('GET', '../dbHeroes.json');

      newRequest.setRequestHeader('Content-Type', 'application/json');

      newRequest.send();

    };

    formList('*', '*');

    select.addEventListener('change', () => {
      if (select.value === '10') {
        formList('gender', 'male');
      } else if (select.value === '20') {
        formList('gender', 'female');
      } else if (select.value === '30') {
        formList('deathDay', 'undefined');
      } else if (select.value === '40') {
        formList('deathDay', 'any');
      } else if (select.value === '') {
        formList('*', '*');
      }

    });
  };

  getHeroJsonBD();

  // filtering heroes array
  const filterArray = () => {
    const select = document.querySelector('.navbar-select');
  };

  filterArray();
});