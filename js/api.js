// load phone
const loadPhones = (searchText) => {
  const url = ` https://openapi.programming-hero.com/api/phones?search=${searchText}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhones(data.data));
};

// display phone
const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.textContent = " ";
  if (phones.length === 0) {
    const div = document.createElement("div");
    div.innerText = "no result found";
    phoneContainer.appendChild(div);
    console.log("no result found");
    toggleSpinner("d-none", "d-block");
    toggleSearch("p-2", "d-none");
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
                <h6 class="card-text text-secondary">${phone.brand}</h6>
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
  console.log(phones);
};
// search phones
const searchPhones = () => {
  const searchText = document.getElementById("search-field").value;
  document.getElementById("search-field").value = "";
  loadPhones(searchText);
  toggleSpinner("d-block", "d-none");
  toggleSearch("d-none", "p-2");
};
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
// ============================================Details===================================
const loadPhonesDetails = (id) => {
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => displayPhonesDetails(data.data));
};
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
            <h6 class="card-text text-secondary">${
              details.releaseDate ? details.releaseDate : "Not yet released"
            }</h6>
        </div>
        <div>
            <p><span class="h5">Storage:</span>${
              details.mainFeatures?.storage
            }</p>
            <p><span class="h5">Sensors:</span>${
              details.mainFeatures?.sensors
            }</p>
            <p><span class="h5">Display Size:</span>${
              details.mainFeatures?.displaySize
            }  </p>
            <p><span class="h5">Chipset:</span>${
              details.mainFeatures?.chipSet
            }</p>
             <p><span class="h5">Memory:</span>${
               details.mainFeatures?.memory
             }</p>
        </div>
        <div>
          <p><span class="h5">Wlan:</span>${details.others?.WLAN}</p>
          <p><span class="h5">Bluetooth:</span>${details.others?.Bluetooth}</p>
          <p><span class="h5">GPS:</span>${details.others?.GPS}</p>
          <p><span class="h5">NFC:</span>${details.others?.NFC}</p>
          <p><span class="h5">Radio:</span>${details.others?.Radio}</p>
        </div>
        <button onclick="" class="btn btn-outline-primary" type="button">
          More..
        </button>
    </div>
  `;
  detailsContainer.appendChild(div);
  console.log(details);
};
const searchPhonesDetails = (id) => {
  loadPhonesDetails(id);
};
