//acceca5b31a7e1ab6b1c66aaa229baf1
const form = document.querySelector(".hero form");
const input = document.querySelector(".hero input");
const msg = document.querySelector(".msg");
const listSection = document.querySelector(".ajax-section .cities");
const cityTitle = document.querySelector(".ajax-section .city-title");
const currentWeather = document.querySelector(".ajax-section .current-weather");

// simple function to clear markup
function clearMarkup() {
  listSection.innerHTML = "";
  cityTitle.innerHTML = "";
  currentWeather.innerHTML = "";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  clearMarkup();

  axios
    .get(`https://api.openweathermap.org/data/2.5/weather?`, {
      params: {
        q: `${input.value}`,
        appid: `f1c766c115c72210f44dfb87d6582acd`,
        units: "metric",
      },
    })
    .then(function (response) {
      const { main, name, sys, weather } = response.data;
      console.log(main, name, sys, weather);
      const icon = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
      const currentDate = new Date();
      const div = document.createElement("div");
      div.classList.add("current-weather-container", "p-2");
      //markup will include: current date, temp, icon, weather ifno
      const markup = `
        <div>
          <h4>Today - ${getDayName(currentDate.getDay())}, ${getMonthName(
        currentDate.getMonth()
      ).slice(0, 3)} ${currentDate.getDate()}</h4>
          <h2>${Math.round(main.temp)}<sup>°C</sup></h2>
        </div>
        <div>
          <img class="city-icon" src="${icon}" alt="${
        weather[0]["description"]
      }">
          <p>${weather[0].main}</p>
        </div>
      `;
      div.innerHTML = markup;
      currentWeather.appendChild(div);
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city.";
    });

  axios
    .get(`https://api.openweathermap.org/data/2.5/forecast?`, {
      params: {
        q: `${input.value}`,
        appid: `f1c766c115c72210f44dfb87d6582acd`,
        units: "metric",
      },
    })
    .then(function (response) {
      const { city, list } = response.data;

      const h2 = document.createElement("h2");
      h2.classList.add("city-name");
      const markup = `<i class="fas fa-map-marker-alt pin"></i><span>${city.name}</span><sup>${city.country}</sup>`;
      h2.innerHTML = markup;
      cityTitle.appendChild(h2);
      let timeZone = city.timezone / 3600;

      for (let listItem of list) {
        if (listItem.dt_txt.includes(`${adjustTimeZone(timeZone)}:00:00`)) {
          console.log(listItem);
          let dateInfo = new Date(listItem.dt_txt);
          let date = dateInfo.getDate();
          let day = dateInfo.getDay();
          let month = dateInfo.getMonth();

          const icon = `http://openweathermap.org/img/wn/${listItem.weather[0].icon}@2x.png`;

          const li = document.createElement("li");
          li.classList.add("city");
          const markup = `
          <h4>${getDayName(day)}, ${getMonthName(month).slice(
            0,
            3
          )} ${date}</h4>
        <div class="city-temp">${Math.round(
          listItem.main.temp
        )}<sup>°C</sup></div>
          <figure>
          <img class="city-icon" src="${icon}" alt="${
            listItem.weather[0]["description"]
          }">
            <figcaption>${listItem.weather[0].description}</figcaption>
          </figure>
      `;
          li.innerHTML = markup;
          listSection.appendChild(li);
        }
      }
    })
    .catch(() => {
      msg.textContent = "Please search for a valid city.";
    });
});

function adjustTimeZone(timezone) {
  let adjustedTimeZone = -timezone + 12;
  while (adjustedTimeZone % 3 !== 0) {
    adjustedTimeZone++;
  }
  if (adjustedTimeZone < 9) {
    return `0${adjustedTimeZone}`;
  } else {
    return `${adjustedTimeZone}`;
  }
}
