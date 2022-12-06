//Fetching weather API//
class Fetch {
  async getCurrent(input) {
    const myKey = "073ddcdfb43f7376762aa1c5229a06f0";

    //make request to url
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q= ${input}&appid=${myKey}&units=metric `
      );

      const data = await response.json();

      console.log(data);

      if (data.message === "city not found") {
        console.log(data.message);
        var x = document.getElementById("content");
        x.style.display = "block";

        x.innerHTML = `
        
        <div class="card  bg-info mb-3 container d-flex justify-content-center" style="width: 18rem">
        <h5 class='text-align-center m-3'>Please Enter a Valid City</h5>
        </div>  `;
        return;
      } else {
        return data;
      }
    } catch (err) {
      console.log("invalid city" + err);
    }
  }
}
// UI Class //
class UI {
  constructor() {
    this.uiContainer = document.getElementById("content");
  }

  populateUI(data) {
    this.uiContainer.innerHTML = `
        
 
  <div class="card  bg-info mb-3 container d-flex justify-content-center align-items-center" style="width: 18rem;">
  <div class="card-body container d-flex flex-column justify-content-center align-items-center">
  <div>
    <h5 class="card-title ">${data.name} ( ${data.sys.country} )</h5>
  </div>
  <div>
    <h6 class="card-subtitle mb-2 ">Temperature : ${data.main.temp}&#8451. <br> Wind Speed : ${data.wind.speed} m/h  <br> Pressure : ${data.main.pressure} hPa 
    <br>Min-Temp : ${data.main.temp_min}&#8451
    <br>Max-Temp : ${data.main.temp_max}&#8451
    </h6>
   <br>
    <h6 class="card-subtitle mb-2 ">Weather conditions are described as: ${data.weather[0].description}
   
  
    <img src="icons/${data.weather[0].icon}.png" alt="image 1" width= "20px" /> </h6>
    </div>
    <p class="card-text"> <span class="close"  onclick="closeFunction()">&times;</span></p>
  
  </div>
</div>
        
  `;
  }
}

//inst classes//
const ft = new Fetch();
const ui = new UI();

//add event listeners//
const search = document.getElementById("searchUser");
const button = document.getElementById("submit");

button.addEventListener("click", () => {
  const currentVal = search.value;

  ft.getCurrent(currentVal).then((data) => {
    console.log(data);
    //show only if name is valid
    if (data.name !== undefined) {
      var x = document.getElementById("content");
      x.style.display = "block";
      console.log(data.name);
      //call a UI method//
      ui.populateUI(data);
    }
  });
});

//Close Function
function closeFunction() {
  var x = document.getElementById("content");

  x.style.display = "none";
}
