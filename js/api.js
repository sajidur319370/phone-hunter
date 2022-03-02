//===================================== load phone===============================================
const loadPhones = (searchText, quantity) => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhones(data.data.slice(0, quantity)));
};
//===================================== load phone all===============================================
const loadPhonesAll = (searchText) => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhones(data.data));
};
//======================================= display phone============================================================
const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = " ";
  if (phones.length === 0) {
    const div = document.createElement("div");
    div.innerHTML = `<h5 class="text-danger">No results found</h5>`;
    phoneContainer.appendChild(div);
    console.log("no result found");
    toggleSpinner("d-none", "d-block");
    toggleSearch("p-2", "d-none");
    document.getElementById("details-container").classList.remove("d-block");
    document.getElementById("details-container").classList.add("d-none");
  } else {
    toggleSpinner("d-block");
    phones?.forEach((phone) => {
      const div = document.createElement("div");
      div.classList.add("col");
      div.innerHTML = `
        <div class="card p-2">
            <img src="${phone.image}" class="card-img-top mx-auto" style="width: 10rem; alt="..."/>
            <div class="card-body  mx-auto">
                <h5 class="card-title text-secondary">${phone.phone_name}</h5>
                <h6 class="card-text">${phone.brand}</h6>
            </div>
            <button onclick="searchPhonesDetails('${phone.slug}')" class="btn btn-outline-primary" type="button">
               Description
            </button>
        </div>
        `;
      phoneContainer.appendChild(div);
      toggleSpinner("d-none", "d-block");
      toggleSearch("p-2", "d-none");
    });
    document.getElementById("details-container").classList.remove("d-block");
    document.getElementById("details-container").classList.add("d-none");
  }
  const button = document.createElement("div");
  button.innerHTML = ` 
  <button onclick="searchPhones()" class="btn btn-outline-primary" type="button" id="see-more-button">
    see more
 </button>`;
  if (phones.length <= 20 && phones.length > 1) {
    phoneContainer.appendChild(button);
  }
};
//============================================================ search phones==========================================
const searchPhones = (quantity) => {
  const searchText = document.getElementById("search-field").value;
  if (quantity <= 20) {
    loadPhones(searchText, quantity);
  } else {
    document.getElementById("search-field").value = "";
    loadPhonesAll(searchText);
  }
  toggleSpinner("d-block", "d-none");
  toggleSearch("d-none", "p-2");
};
// ===================================================spinner addding=========================================
const toggleSpinner = (className1, className2) => {
  const spinnerDiv = document.getElementById("spinner");
  spinnerDiv.classList.add(className1);
  spinnerDiv.classList.remove(className2);
};
const toggleSearch = (className1, className2) => {
  const containerDiv = document.getElementById("phone-container");
  containerDiv.classList.add(className1);
  containerDiv.classList.remove(className2);
};
////////////////////////////////////////////////////==============================================/////////////////////////////////
//==================================================Details====================================================
const loadPhonesDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhonesDetails(data.data));
};
// =================================================display details============================================
const displayPhonesDetails = (details) => {
  document.getElementById("details-container").classList.add("d-block");
  document.getElementById("details-container").classList.remove("d-none");
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.textContent = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="card p-2 mx-auto">
        <img src="${
          details.image
        }" class="card-img-top mx-auto" style="width: 10rem;" alt="..." />
        <div class="card-body  mx-auto">
            <h5 class="card-title text-secondary">${details.name}</h5>
            <h6 class="card-text text-success">${
              details.releaseDate
                ? details.releaseDate
                : `<span class="h6 text-danger">Not yet released</span>`
            }</h6>
        </div>
        <div>
            <p><span class="h5 text-success">Storage: </span>${
              details.mainFeatures?.storage
            }</p>
            <p><span class="h5 text-success">Sensors: </span>${
              details.mainFeatures?.sensors
            }</p>
            <p><span class="h5 text-success">Display Size: </span>${
              details.mainFeatures?.displaySize
            }  </p>
            <p><span class="h5 text-success">Chipset: </span>${
              details.mainFeatures?.chipSet
            }</p>
             <p><span class="h5  text-success">Memory: </span>${
               details.mainFeatures?.memory
             }</p>
        </div>
        <div class="d-none" id="description">
          <p><span class="h5 text-success">Wlan: </span>${
            details.others?.WLAN
          }</p>
          <p><span class="h5 text-success">Bluetooth: </span>${
            details.others?.Bluetooth
          }</p>
          <p><span class="h5 text-success">GPS: </span>${
            details.others?.GPS
          }</p>
          <p><span class="h5 text-success">NFC: </span>${
            details.others?.NFC
          }</p>
          <p><span class="h5 text-success">Radio: </span>${
            details.others?.Radio
          }</p>
        </div>
        <button onclick="showDiscription()" class="btn btn-outline-primary" type="button">
          More..
        </button>
    </div>
  `;
  detailsContainer.appendChild(div);
};
// ==========================================search details===========================================
const searchPhonesDetails = (id) => {
  loadPhonesDetails(id);
};
// =====================================================show description=================================
const showDiscription = () => {
  const descriptionId = document.getElementById("description");
  descriptionId.classList.add("d-block");
  descriptionId.classList.remove("d-none");
};
