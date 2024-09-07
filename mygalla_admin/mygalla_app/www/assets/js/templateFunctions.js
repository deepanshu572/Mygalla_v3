function loadProduct(data, x) {
  let btnColor = data.status == 1 ? "success" : "danger";
  let btnText = data.status == 1 ? "Disable" : "Enable";

  let btn = `
    <button 
      id="${data.id}" 
      onclick='disableProduct( ${data.id} , ${data.status} )' 
    class="btn btn-${btnColor}"> ${btnText} </button>
  `;

  return `<div class="product-card" id="loaddiv${x}">
              <div class="product-card-top">
                  <span class="pr-id-name">${data.title}</span>
                  <span>Stock : 0 </span>
              </div>
              <div class="product-card-bottom">
                  <div>
                      <img src="${data.image}" alt="img">
                  </div>
                  <div>
                      <p>
                          ${data.category} <br>
                          <del>${data.fakePrice}</del>  <br>
                      </p>
                      <p> Price : ${data.price}. </p>
                  </div>
                  <div>
                      <button type="button" onclick="manageProduct()" class="btn btn-warning">Manage</button>
                        ${btn}
                  </div>
              </div>
    </div>`;
}
function manageProduct() {
  location.href = "manageProduct.html";
}
function disableProduct() {
  //pending section
}

function loadCategoryProduct(data) {
  return `
    <div class="product-card" id="loaddiv${x}">
      <div class="product-card-top">
        <span># ${x}</span>
        <span> </span>
      </div>
      <div class="product-card-bottom">
        <div>
          <img src="${imgLink + data.images}" 
          ${errorImgUrl} alt="img"/>
        </div>
        <div>
          <p>
            Name : ${data.name} <br> 
            Parent Category : ${data.parent_name} <br>
            status : ${status}
          </p>
        </div>
        <div>
          <button 
            type="button"
            id="${data.id}"
            onclick='disableCategory(${JSON.stringify(data)})' 
            class="btn btn-${statusColor}">${statusText}
          </button>
        </div>
      </div>
    </div>
  `;
}

const loadingScreenINF = () => {
  var t = `
    <div class="card">
      <div class="skeleton skeleton-text"></div>
      <hr>
      <div class="header">
        <div class="header-img skeleton"></div>
        <div class="title">
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
            <div class="skeleton skeleton-text"></div>
        </div>
        <div class="header-right">
            <div class="skeleton skeleton-button"></div>
        </div>
      </div>
    <div>
  `;

  for (i = 1; i <= 3; i++) $("#loading_end").append(t);
};

function categoryListTemplate(data, x) {
  let btnColor = data.status == 1 ? "success" : "danger";
  let btnText = data.status == 1 ? "Disable" : "Enable";

  let btn = `
    <button 
            type="button"
            id="${data.id}"
            onclick='disableCategory(${JSON.stringify(data)})' 
            class="btn btn-${btnColor}">${btnText}
          </button>
  `;
  return `
    <div class="product-card" id="loaddiv${x}">
      <div class="product-card-top">
        <span># ${x}</span>
        <span> </span>
      </div>
      <div class="product-card-bottom">
        <div>
          <img src="${data.url}" 
          alt="img"/>
        </div>
        <div>
          <p>
            Name : ${data.name} <br> 
            Parent Category : ${data.slug} <br>
            status : ${status}
          </p>
        </div>
        <div>
          ${btn}
        </div>
      </div>
    </div>
  `;
}

function disableCategory() {
  ///pending section
}

async function manageCategory(data) {
  localStorage.setItem("categoryPOST", JSON.stringify(data));
  location.href = "manageCategory.html";
}

function loadManageCategory() {
  let data = localStorage.getItem("categoryPOST");

  data = JSON.parse(data);

  $("#preview_img").attr("src", data.url);

  $("#c_id").val(data.id);

  $("#name").val(data.name);
}

function logoTemplateAdmin(data) {
  console.log(data);

  return `<div class="logo_input_box">
         <input type="checkbox">
         <div class="logo_inp_img">
               <img src="${data.imgsrc}" alt="">
          </div>
       </div>
      `;
}
function userTemplate(data, x) {
  let btnColor = data.status == 1 ? "success" : "danger";
  let btnText = data.status == 1 ? "Disable" : "Enable";

  let btn = `
    <button type="button" id="${data.id}" 
    onclick="updateUserStatus()" 
    class="btn btn-${btnColor}">${btnText}</button>

  `;
  return `
    <div class="user-card" id="loaddiv${x}">
      <div class="user-card-top">
          <span>${x} </span>
          <span> </span>
      </div>
      <div class="user-card-bottom">
          <div>
              <p> 
                Name : ${data.name.firstname} <br> 
                Mobile : ${data.phone} <br> 
                Address : ${data.address.city}  <br>
                DOR : ${new Date(data.date)
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                  .replace(/ /g, "-")} <br>
                      ${data.type == 3 ? "Staff" : "Delivery Boy"} 
              </p>
          </div>
          <div>
              <a class="btn btn-warning" href="usersHistory.html?id=${
                data.id
              }">History</a>
            ${btn}
          </div>
      </div>
    </div>
    `;
}
function updateUserStatus() {
  //pending section
}

function themeTemplate(data) {
  return `
  <div>
        <img src="${data.img}" alt="${data.img}" class="theme-img" onclick="setTheme()">
           <div class="theme-status"></div>
      </div>`;
}

function addStaffTemplate(data) {
  let btnColor = data.status == 1 ? "success" : "danger";
  let btnText = data.status == 1 ? "Disable" : "Enable";

  let btn = `
    <button type="button" id="${data.id}" 
    onclick="updateUserStatus()" class="btn btn-${btnColor}">
     ${btnText} </button>
  `;

  return `
  <div class="user-card">
            <div class="user-card-top">
                <span> # ${data.id} . ${data.name.firstname} </span>
                <span> </span>
            </div>
            <div class="user-card-bottom">
                <div>
                    <p>
                      ${data.phone} <br>
                      ${data.address.city} <br>
                       ${new Date(data.date)
                         .toLocaleDateString("en-GB", {
                           day: "2-digit",
                           month: "short",
                           year: "numeric",
                         })
                         .replace(/ /g, "-")} <br>
                      ${data.type == 3 ? "Staff" : "Delivery Boy"}  
                    </p>
                </div>
                <div>
                    <button type="button" onclick="staffManage()" class="btn btn-warning">Manage</button>
                    ${btn}
                </div>
            </div>
        </div>`;
}
function staffManage() {
  window.location.href = "staffManage.html";
}
function updateUserStatus() {
  
}


function addonsTemplate(data , x) {
  
  let btnColor = data.status == 1 ? "success" : "danger";
  let btnText = data.status == 1 ? "Disable" : "Enable";

  let btn = `
   <button id="${data.id}" onclick="addonDisable()"
    class="btn btn-${btnColor}">${btnText}</button>
  `;

  return`
  <div class="product-card">
        <div class="product-card-top">
          <span> # ${x}: ${data.name}  </span>
          <span> 
            <a
              class="info-help-button" 
              data-bs-toggle="modal"
              data-bs-target="#exampleModal" 
              data-bs-id="${data.id}"
              data-bs-name="${data.name}"
              data-bs-links="${data.link}"
              data-bs-description="${data.description}"
              >
              <i class="bi bi-info-circle"></i>
            </a>
          </span>
        </div>
        <div class="product-card-bottom">
          <div>
            <img src="${data.img}">
          </div>
          <div>
            <p>
              <strong>  ₹  ${data.price} </strong> <br>
              <strike>  ₹  ${data.fprice} </strike> 
              <span class="off-addons"> ${data.discount} </span>
              <br>
              <span class="two-line-discr" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-id="1" data-bs-name="THEME" data-bs-links="https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf" data-bs-description="Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of endless possibilities, where you can customize your interface to match your mood, style, or even the season. Whether youre drawn to sleek and minimalist designs, vibrant and bold aesthetics, or something in between, our curated collection of themes has something for everyone. Elevate your user experience with visually stunning options that reflect your personality and preferences, ensuring that your device is as unique as you are. Explore, customize, and make your device truly yours with our diverse selection of themes.">
                Description : ${data.description}
              </span>
              <br>
            </p>
          </div>
          <div>
            
          ${btn}
         
            <a class="btn btn-warning" href="theme.html">manage</a>
        
          </div>
        </div>
      </div>`
}
function posproductTempelate(data , x) {
  return`<div class="product-card">
                  <div class="product-card-top">
                      <span>S NO :  ${x}  </span>
                      <span> ${data.stock} more left </span>
                  </div>
                  <div class="product-card-bottom">
                      <div>
                          <img src="${data.image}">
                      </div>
                      <div>
                          <p> Name : ${data.title}<br> 
                          </p>
                          <p> Price : ₹ ${data.price}. </p>
                      </div>
                      
                  </div>
                  <div>
                      <div id="addToPOSBtnDiv">
                          <button type="button" id="addToPOSBtn${data.id}" onclick="addtoPOS(${JSON.stringify(data)})" class="btn btn-success">
                              <i class="bi bi-plus-lg"></i>  ADD
                          </button>
                          <div id="addToPOSCounter57" class="addToPOSCounter" style="display:none;">
                              <button type="button" id="addToPOSBtn57" onclick="addtoPOSMinus()" class="btn btn-success">-</button>
                              <input id="addToPOSInput57" value="1" readonly="">
                              <button type="button" id="addToPOSBtn57" onclick="addtoPOSPlus()" class="btn btn-success">+</button>
                          </div>
                      </div>
                  </div>
              </div>
  `
}

