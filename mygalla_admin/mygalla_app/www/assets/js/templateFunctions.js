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
// function disableProduct(id , status) {
//   let btnColor = status == 1 ? "danger" : "success";
//   let btnText = status == 1 ? "Disable" : "Enable";
//   let a = status == 1 ? "success" : "danger";
//   $(`#${id}`).removeClass(`btn btn-${a}`)
//   $(`#${id}`).addClass(`btn btn-${btnColor}`)
//   $(`#${id}`).html(btnText);
//   console.log(btnText);
// }

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
function updateUserStatus() {}

function addonsTemplate(data, x) {
  let btnColor = data.status == 1 ? "success" : "danger";
  let btnText = data.status == 1 ? "Disable" : "Enable";

  let btn = `
   <button id="${data.id}" onclick="addonDisable()"
    class="btn btn-${btnColor}">${btnText}</button>
  `;

  return `
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
         
            <a class="btn btn-warning" href="${data.pagelink}">manage</a>
        
          </div>
        </div>
      </div>`;
}
function posproductTempelate(data, x) {
  return `<div class="product-card">
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
                          <button type="button" id="addToPOSBtn${
                            data.id
                          }" onclick="addtoPOS(${JSON.stringify(
    data
  )})" class="btn btn-success">
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
  `;
}

function PosDataTemplate(data, x) {
  return `
  <div class="product-card">
                  <div class="product-card-top">
                      <span>S NO : ${x}  </span>
                      <span class="pro_err_msg">  </span>
                  </div>
                  <div class="product-card-bottom">
                      <div>
                          <img src="${data.image}">
                      </div>
                      <div>
                          <p> Name : ${data.title} <br> 
                          </p>
                          <p> Price : ₹ ${data.price}. </p>
                      </div>
                      
                  </div>
                  <div>
                      <div id="addToPOSBtnDiv">                       
                          <div id="addToPOSCounter57" class="addToPOSCounter">
                              <button type="button" id="addToPOSBtn57" onclick="addtoPOSMinusCheckout({&quot;var_id&quot;:&quot;57&quot;,&quot;pro_id&quot;:&quot;73&quot;,&quot;name&quot;:&quot;Sunfeast YiPPee! Magic Masala Instant Noodles, 720 g (Pack of 12)&quot;,&quot;sku&quot;:&quot;123456&quot;,&quot;price&quot;:&quot;111&quot;,&quot;qty&quot;:84,&quot;cgst&quot;:&quot;2&quot;,&quot;sgst&quot;:&quot;2&quot;,&quot;imgs&quot;:&quot;3.JPG&quot;})" class="btn btn-success">-</button>
                              <input id="addToPOSInput57" value="" readonly="">
                              <button type="button" id="addToPOSBtn57" onclick="addtoPOSPlusCheckout({&quot;var_id&quot;:&quot;57&quot;,&quot;pro_id&quot;:&quot;73&quot;,&quot;name&quot;:&quot;Sunfeast YiPPee! Magic Masala Instant Noodles, 720 g (Pack of 12)&quot;,&quot;sku&quot;:&quot;123456&quot;,&quot;price&quot;:&quot;111&quot;,&quot;qty&quot;:84,&quot;cgst&quot;:&quot;2&quot;,&quot;sgst&quot;:&quot;2&quot;,&quot;imgs&quot;:&quot;3.JPG&quot;})" class="btn btn-success">+</button>
                          </div>
                      </div>
                  </div>
              </div>`;
}

function OrderDataTemplate(data, a) {
  let link =
    a == 1
      ? "orderHistoryDetails.html?"
      : "orderHistoryDetailsDeliveryPanel.html?";
  return `
  <div class="order-card">
          <div class="order-card-top">
              <span>ORDER ID :  ${data.orderId}  </span>
              <span class="order-type"> ${data.orderFrom} </span>
          </div>
          <div class="order-card-bottom">
              <div style="display:none;"></div>
              <div>
                  <p>
                      Status : ${data.orderStatus} <br> 
                      No of items : ${data.no_item} <br>
                      Total Amount : ₹ ${data.totalAmount}
                  </p>
              </div>
              <div>
              <a href="${link + data.orderId}" class="btn"> View Details
              </a>
              </div>
          </div>
      </div>
  `;
}

function LoadCategoryTemplate(data, x) {
  return `
  <div class="product-card">
          <div class="product-card-top">
            <span> 
              # ${x}
              
            </span>
            <span>
              
                <input type="checkbox" id="catList${x}" onclick="getCategoryData()">
              
            </span>
          </div>
          <div class="product-card-bottom">
            <div>
                <img src="${data.url}" onerror="this.onerror=null; this.src=' https://pos.kalamitcompany.com/api/images//noimg.jpg ';" alt="img">
            </div>
            <div>
              <p>
                  Name : ${data.name} <br>
              </p>
            </div>
            <div>
              
                  <button type="button" onclick="addCatFromKalam()" class="btn"> 
                  Add </button>
              
            </div>
          </div>
        </div>
  `;
}

function loadAllBannerImagesTemplate(data, x) {
  return `
          <tr>
            <th> ${x} </th>
            <td>
              <img src="${data.image}" alt="image" class="img-thumbnail">
            </td>
            <td> <div class="td-type"> ${data.type} </div></td>
            <td>
             <div class="td-btn"> 
            <button onclick="deleteBannerImage()" class="btn btn-danger">
              <i class="bi bi-trash"></i>
            </button>
            </div>
            </td>
          </tr>
        `;
}
function loadManageCategoryTemplate(data) {
  return `
          <tr>      
            <td><img src="${data.image}" width="70" height="50"></td>
            <td><div class="manage_title">${data.title}</div></td>
            <td><div class="manage_msg"> ${data.msg} </div></td>
            <td><div class="manage_btn"><button class="btn btn-primary" onclick="pushNotification()">Send</button></div></td>
        </tr>
        `;
}
function loadCouponsTemplate(data) {
  return `
  <div>
              <div class="card">
                <div class="card-header">
                  Coupon ${data.coupons}off
                </div>
                <div class="card-body">

                  <h5 class="card-title">${data.items}</h5>
                  <p class="card-text"> Flat ${data.off}off on your next shopping </p>

                  <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#coupanModal" data-bs-cid="7" data-bs-name="20off" data-bs-type="flat" data-bs-value="20" data-bs-description="Flat 50 off on your next shopping">Edit</button>

                  <button class="btn btn-danger" onclick="deleteCoupons(7)">Delete</button>
                </div>
              </div>

          </div>`;
}

function load_product_list_invoiceTemplate(data) {
  return `
   <div class="order-summry-pro-card">
              <div class="order-summry-pro-card-left">
                  <img src="${data.image}" alt="${data.image}">
              </div>
              <div class="order-summry-pro-card-right">
                  <span class="os-pnm">${data.title}</span>
                  <span class="os-pr">price:${data.price} , qty : ${data.qty} </span>
              </div>
          </div>
    `;
}

/* ================
User app code start
================ */

    function UserTopcategoryTemplate(data) {
      return `
        <div>
          <a href="#">${data.name}</a>
        </div>
      `
    }
    function TopbannercarouselTemplate(data ,x) {
       return `<div class="crousel_items crousel_items${x}">
         <a href="#"><img src="${data.image}" alt=""></a>
        </div>
       `
    }
    function categoryCarouselTemplate(data) {
        return `
            <div class="user_box1">
              <div class="user_img">
              <a href="#" onclick="gotoProductListUseCategory(${data.id})"> <img src="${data.image}" alt=""></a>
              </div>
              <div class="user_text">
               <p>${data.name}</p>
              </div>
              </div>
        `
    }
    function productCarouselTemplate(data) {
      return `
      <div class="product_item_box">
              <div class="product_item_img">
                <img src="${data.image}" alt="">
              </div>
              <div class="product_item_content">
                <div class="product_item_heart">
                  <i class="bi bi-heart"></i>
                </div>
                <div class="product_item_star_section">
                  <div class="product_rating">
                    <p>${data.rating.rate}</p>
                    <i class="bi bi-star-fill"></i>
                  </div>
              <button class="btns" data-bs-toggle="offcanvas"
               data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom">
               <i class="bi bi-three-dots"></i></button>
                   
                </div>
                <div class="product_item_name">
                  <p>${data.title}</p>
                </div>
                <div class="product_item_detail_cart_section">
                  <div class="left_cart_price">
                    <b>₹ ${data.price}</b>
                    <del>₹ ${data.fakePrice}</del>
                  </div>
                  <div class="right_cart_box">
                     <button>-</button>
                     <input type="number" value="01">
                     <button>+</button>
                  </div>
                </div>
              </div>
             </div>
      `
    }

    function smallbannercarouselTemplate(data) {
      return`
      <div class="edit1">
            <img src="${data.image}" alt="">
          </div>`
    }

/* ================
User app code end
================ */
