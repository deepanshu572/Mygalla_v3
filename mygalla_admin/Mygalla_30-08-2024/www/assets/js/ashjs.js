// all function for Admin side

const errorImgUrl = `onerror="this.onerror=null; this.src=' ${imgLink}/noimg.jpg ';"`;

$(document).ready(function () {
  function passwordShowHide() {
    $("#passeyehide").hide();

    $("#passeyeshow").on("click", function () {
      $("#password").attr("type", "text");
      $("#passeyeshow").hide();
      $("#passeyehide").show();
    });

    $("#passeyehide").on("click", function () {
      $("#password").attr("type", "password");
      $("#passeyeshow").show();
      $("#passeyehide").hide();
    });
  }

  passwordShowHide();

  $("#loginFrm").submit(async function (e) {
    // load from client api

    e.preventDefault();

    try {

      // checkPer();
      // await subscribe();

      let deviceToken = localStorage.getItem("DeviceToken");

      const formData = new FormData(this);

      formData.append("type", "1");
      formData.append("deviceToken", deviceToken);

      let req = await fetch(appAPI, { method: "POST", body: formData });

      let data = await req.json();

      data = data.data;
      console.log(data);
      if (data.status == 1) {
        $(window).scrollTop(0);
        $("#msg").html(`
          <div class="alert alert-success">
            login successful !
          </div>
        `);
        setTimeout(() => {
          $("#msg").html("");
        }, 4000);


       if ( data.wallet == 0 ){

         a = await addCode(data.id);
         console.log(a.string);
         data.wallet = a.string;
       }


        const navData = localStorage.getItem('navData');
        localStorage.clear();
        localStorage.setItem("K_type", data.type);
        localStorage.setItem("K_id", data.id);
        localStorage.setItem("K_status", data.status);
        localStorage.setItem("K_name", data.name);
        localStorage.setItem("K_address", data.address);
        localStorage.setItem("K_mobile", data.mobile);
        localStorage.setItem("K_email", data.email);
        localStorage.setItem("K_renewal_date", data.renewal_date);
        localStorage.setItem("K_wallet", data.wallet);
        localStorage.setItem("roleList", data.role_list);
        localStorage.setItem("navData" , navData);

        if (data.type == 1) {
          location.href = "user/home.html";
        } else if (data.type == 2) {
          location.href = "admin/home.html";
        } else if (data.type == 3) {
          location.href = "admin/home.html";
        } else if (data.type == 4) {
          location.href = "admin/home.html";
        } else {
          alert("Server error !!!");
        }
      } else {
        $(window).scrollTop(0);
        $("#msg").html(`
          <div class="alert alert-danger">
            Error ! ${data.msg}
          </div>
        `);
        setTimeout(() => {
          $("#msg").html("");
        }, 1500);
      }
    } catch (e) {
      console.log(e);
    }
  });

  $("#logout").click(function () {
    logout();
    return false;
  });
});

const logout = () => {
  const navdata = localStorage.getItem('navData');
  localStorage.clear();
  localStorage.setItem('navData',navdata);
  location.href = "../login.html";
};

const loadingScreen = (status) => {
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

  if (status) {
    for (i = 1; i <= 7; i++) $("#res").append(t);
  } else {
    $("#res").html("");
  }
};

const loadErrorMsg = (msg) => {
  var t = `
          <div class="error-card">
            <span>
              ${msg} 
              &nbsp;&nbsp;&nbsp;&nbsp;
              <i class="bi bi-box2"></i>   
            </span>     
          <div>
        `;
  $("#res").html(t);
};

(() => {
  // function for auto calling

  if (localStorage.getItem("K_name") != null) {
    let name = localStorage.getItem("K_name");
    let address = localStorage.getItem("K_address");
    let mobile = localStorage.getItem("K_mobile");
    let renewal_date = localStorage.getItem("K_renewal_date");
    let wallet = localStorage.getItem("K_wallet");

    $("#KA_NAME").html(name);
    $("#KA_MOBILE").html(mobile);
    $("#KA_ADDRESS").html(address.replace("[", "").replace("]", ""));
    $("#KA_WALLET").html(wallet);
    $("#KA_RENEWAL").html(renewal_date);
  }
})();

function checkLogin() {
  let status = localStorage.getItem("K_status");
  let type = localStorage.getItem("K_type");

  if (localStorage.getItem("K_status") !== null) {
    if (status == 1) {
      if (type == 1) {
        location.href = "user/home.html";
      } else if (type == 2) {
        location.href = "admin/home.html";
      } else if (type == 3) {
        location.href = "admin/home.html";
      } else if (type == 4) {
        location.href = "admin/home.html";
      } else {
        alert("Server error !!!");
      }
    }
  }
}

function checkLogout() {
  if (localStorage.getItem("K_status") == null) {
    location.href = "../login.html";
  }
}

function clearLocalstorage() {
  localStorage.removeItem("productPOST");
  localStorage.removeItem("categoryPOST");
  localStorage.removeItem("addonPOST");
  localStorage.removeItem("staffPOST");
}

// async function loadAdminDetails() {
//   const formData = new FormData();

//   formData.append("type", "");

//   let req = await fetch(appAPI, { method: "POST", body: formData });

//   let data = await req.json();

//   data = data.data;
// }

const generateRandomCode = (length) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let code = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
  }

  return code;
}

async function addCode (id) {
   let RandomCode = generateRandomCode(6);

   const formData = new FormData();

   formData.append("type", "135");

   formData.append("id", id);

   formData.append("RandomCode", RandomCode);

   let req = await fetch(appAPI, { method: "POST", body: formData });

   let data = await req.json();
    
   return data.data; 

}

async function disableProduct(id, status) {
  if (confirm("are you sure?")) {
    const formData = new FormData();

    formData.append("type", "18");

    formData.append("id", id);

    formData.append("status", status);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();

    data = data.data;

    if (data.status == 1) {
      changeBtn({ id: id });
      loadMsg("updated succefully !!", "success");
    } else {
      loadMsg("Error !!", "danger", 1);
    }
  }
}

async function srchPrd(srchType, code = "") {
  // load from kalam and app api for sku and name

  $("#res").html("");

  let srch = srchType == "SKU" ? code : document.getElementById("srch").value;

  const formData = new FormData();

  if (srch == "") {
    $("#res").html("please type in secrh box");
  } else {
    loadingScreen(true);

    typeId = srchType == "SKU" ? 4 : 3;

    formData.append("type", typeId);

    srchType == "SKU"
      ? formData.append("sku", srch)
      : formData.append("product_nm", srch);

    let fetch1 = fetch(kalamAPI, { method: "POST", body: formData }); 

    let fetch2 = fetch(appAPI, { method: "POST", body: formData });

    let res = await Promise.all([fetch1, fetch2]);

    let [data1, data2] = await Promise.all(res.map((x) => x.json()));

    data1 = data1.products;   

    data2 = data2.products;

    data1.map(
      (item) =>
      (item.addStatus =
        data2.find((data) => data.sku == item.sku) != undefined ? 1 : 0)
    );

    loadingScreen(false);

    if (data1.length === 0) {
      $("#res").html(`
        <div class="result-not-found-error">
            😐 No result found
        </div>
      `);
      $("#res3").html("NO DATA AVL");
    }

    data1.forEach(function (data) {
      var t = `
          <div class="product-card">
              <div class="product-card-top">
                  <span># ${data.id}  </span>
                  <span> </span>
              </div>
              <div class="product-card-bottom">
                  <div>
                      <img src="${imgLink + data.imgs[0]}" 
                        ${errorImgUrl} alt="img"
                      />
                  </div>
                  <div>
                      <p> Name : ${data.product_nm} <br> fake price : 
                          <del> ${data.fprice} </del> </p>
                      <p> Price : ${data.price} Rs. </p>
                  </div>
        `;

      if (data.addStatus == 0) {
        t += `
            <div class="">
              <button type="button" 
                onclick='addProductBySrch(${JSON.stringify(data)})'
                class="btn btn-warning">Add</button>
              <button type="button" 
                onclick='editProductBySrch(${JSON.stringify(data)})' 
                class="btn ash11">EDIT</button>
            </div>
            `;
      }

      t += `
          </div>
            <div>
              <p class="added-error"> 
                  ${data.addStatus == 1 ? "already added in your app" : ""}  
              </p>
            </div>
          </div>
        `;

      $("#res").append(t);
    });
  }
}

async function addProductBySrch(data) {
  var formData = new FormData();

  for (var key in data) {
    formData.append(key, data[key]);
  }

  formData.append("type", 7);

  let fetchdata = await fetch(appAPI, { method: "POST", body: formData });

  let res = await fetchdata.json();

  if (res.status == 1) {
    alert("Product Added");
    location.reload();
  } else {
    alert("try again...");
  }
}

function cannotChangeSKU() {
  $("#sku").click(function () {
    alert("You can not change SKU");
  });
}

async function editProductBySrch(data) {
  data = JSON.stringify(data);
  localStorage.setItem("productPOST", data);
  location.href = "productEditAfterSrch.html";
}

function editProductLoad() {
  let data = localStorage.getItem("productPOST");

  data = JSON.parse(data);

  for (var key in data) {
    $("#" + key).val(data[key]);
  }
}

$("#editProductAfterSrch").on("submit", async function (e) {
  // edit in app api

  e.preventDefault();

  let id = localStorage.getItem("K_id");

  var formData = new FormData(this);

  formData.append("type", "7");

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let data = await req.json();

  if (data.status == 1) {
    $(window).scrollTop(0);
    $("#msg").html(`
      <div class="alert alert-success" role="alert">
        Product Added Succefully !
      </div>
    `);
    setTimeout(() => {
      $("#msg").html("");
      location.href = "product.html";
    }, 3000);
  } else {
    $("#msg").html(`
      <div class="alert alert-danger" role="alert">
         Error !
      </div>
    `);
    setTimeout(() => {
      $("#msg").html("");
    }, 3000);
  }
});

// category check and add

let newdata = [];

function getCategoryData(data) {
  if ($("#catList" + data.id).prop("checked") == true) {
    newdata.push(data.name + "-" + data.images);
    newdata = [...new Set(newdata)];
  } else {
    let index = newdata.indexOf(data.name + "-" + data.images);
    if (index !== -1) {
      newdata.splice(index, 1);
    }
  }
}

async function addCheckedCategory() {
  // console.log(newdata); // new data has all checked elements

  let name = [];
  let images = [];

  newdata.forEach((item) => {
    let x = item.split("-");
    name.push(x[0]);
    images.push(x[1]);
  });

  if (name.length == 0) {
    alert("select a category first");
  } else {
    if (confirm("Are you sure?")) {
      const formData = new FormData();

      formData.append("type", "11");

      formData.append("name", name);

      formData.append("images", images);

      let req = await fetch(appAPI, { method: "POST", body: formData });

      let res = await req.json();

      if (res.status == 1) {
        alert("category added successfully..");
        location.href = "category.html";
      } else {
        alert("try again !!!");
        location.href = "category.html";
      }
    }
  }
}

async function loadAllCategroyKA() {
  // load from kalam api

  loadingScreen(true);

  const formData = new FormData();

  formData.append("type", "5");

  let req = await fetch(kalamAPI, { method: "POST", body: formData });

  let data = await req.json();

  let category = data.category;

  formData.delete("type");

  formData.append("type", "78");

  let req2 = await fetch(appAPI, { method: "POST", body: formData });

  let data2 = await req2.json();

  let categoryAdmin = data2.category;

  category.forEach((cat) => {
    const matchingCategory = categoryAdmin.find(
      (adminCat) => adminCat.name.toLowerCase() === cat.name.toLowerCase()
    );
    cat.addedStatus = matchingCategory ? true : false;
  });

  console.log(category);

  loadingScreen(false);

  category.sort((a, b) => {
    if (a.addedStatus === b.addedStatus) {
      return 0;
    } else if (a.addedStatus) {
      return 1;
    } else {
      return -1;
    }
  });

  category.forEach(function (data) {
    var t = `
        <div class="product-card">
          <div class="product-card-top">
            <span> 
              # ${data.id} 
              ${data.addedStatus
        ? `
                <span class="added-error"> 
                  Already added in your app  
                </span>
              `
        : ""
      }
            </span>
            <span>
              ${data.addedStatus
        ? ""
        : `
                <input 
                  type="checkbox"
                  id="catList${data.id}" 
                  onclick='getCategoryData(${JSON.stringify(data)})'>
              `
      }
            </span>
          </div>
          <div class="product-card-bottom">
            <div>
                <img src="${imgLink + data.images}" 
                  ${errorImgUrl} alt="img"
                />
            </div>
            <div>
              <p>
                  Name : ${data.name} <br>
              </p>
            </div>
            <div>
              ${data.addedStatus
        ? ""
        : `
                  <button
                    type="button" 
                    onclick='addCatFromKalam(${JSON.stringify(data)})' 
                    class="btn btn-warning"> 
                  Add </button>
              `
      }
            </div>
          </div>
        </div>
      `;
    $("#res").append(t);
  });
}

async function addCatFromKalam(data) {
  if (confirm("Are you sure?")) {
    const formData = new FormData();

    formData.append("type", "11");

    formData.append("name", data.name);

    formData.append("images", data.images);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let res = await req.json();

    if (res.status == 1) {
      alert("category added successfully..");
      location.href = "category.html";
    } else {
      alert("try again !!!");
      location.href = "category.html";
    }
  }
}

async function loadAddon() {
  // load addons from client api

  loadingScreen(true);

  const formData = new FormData();

  formData.append("type", "14");

  let req1 = await fetch(appAPI, { method: "POST", body: formData });

  let data1 = await req1.json();

  let addons1 = data1.addons;

  formData.delete("type");

  formData.append("type", "6");

  let req2 = await fetch(kalamAPI, { method: "POST", body: formData });

  let data2 = await req2.json();

  let addons2 = data2.addons;

  let addons = [];

  addons2.forEach((addon2) => {
    let matchingAddon1 = addons1.find((addon1) => addon1.name === addon2.name);
    if (matchingAddon1) {
      let mergedAddon = {
        ...addon2,
        activation_status: matchingAddon1.activation_status,
        purchase_status: matchingAddon1.purchase_status,
      };
      addons.push(mergedAddon);
    }
  });

  loadingScreen(false);

  addons.forEach(function (data) {
    let btn = "";
    if (data.purchase_status == 1) {
      let manageLink =
        data.page_name == "#"
          ? ""
          : `<a class="btn btn-warning" href="${data.page_name}">manage</a>`;

      if (data.activation_status == 1) {
        btn = `
          <button onclick='addonDisable(${JSON.stringify(
          data
        )})' class="btn btn-danger">Disable</button>
            ${manageLink}
        `;
      } else {
        btn = `<button onclick='addonActive(${JSON.stringify(
          data
        )})' class="btn btn-success">Activate</button>`;
      }
    } else {
      btn = `<button onclick='addonPurchaseNavigate(${JSON.stringify(
        data
      )})' class="btn btn-info">Purchase</button>`;
    }

    let bkpSpan = `${data.purchase_status == 1 ? "PURCHASED" : data.price + " Rs."
      }`;

    var t = `
      <div class="product-card">
        <div class="product-card-top">
          <span> # ${data.id} : ${data.name.replace(/_/g, " ")}  </span>
          <span> 
            <a
              class="info-help-button" 
              data-bs-toggle="modal"
              data-bs-target="#exampleModal" 
              data-bs-id="${data.id}"
              data-bs-name="${data.name}"
              data-bs-links="${data.links}"
              data-bs-description="${data.description}"
              >
              <i class="bi bi-info-circle"></i>
            </a>
          </span>
        </div>
        <div class="product-card-bottom">
          <div>
            <img src="${data.image_link}" />
          </div>
          <div>
            <p>
              <strong>  &#8377;  ${data.real_price} </strong> <br>
              <strike>  &#8377;  ${data.fake_price} </strike> 
              <span class="off-addons"> ${(
        ((data.fake_price - data.real_price) / data.fake_price) *
        100
      ).toFixed(2)} % </span>
              <br>
              <span 
                class="two-line-discr"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal" 
                data-bs-id="${data.id}"
                data-bs-name="${data.name}"
                data-bs-links="${data.links}"
                data-bs-description="${data.description}"
                >
                Discription : ${data.description}
              </span>
              <br>
            </p>
          </div>
          <div>
            ${btn}
          </div>
        </div>
      </div>
    `;
    $("#res").append(t);
  });
}

async function addonDisable(data) {
  if (confirm("are you sure ?")) {
    const formData = new FormData();

    formData.append("type", "17");

    formData.append("id", data.id);

    formData.append("status", 0);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let res = await req.json();

    res = res.data;

    if (res.status == 1) {
      $("#msg").html(`
        <div class="alert alert-success" role="alert">
          Addon Deactive Succefully !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
        location.href = "addons.html";
      }, 3000);
    } else {
      $("#msg").html(`
        <div class="alert alert-danger" role="alert">
           Error !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
      }, 3000);
    }
  }
}

async function addonActive(data) {
  if (confirm("are you sure ?")) {
    const formData = new FormData();

    formData.append("type", "17");

    formData.append("id", data.id);

    formData.append("status", 1);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let res = await req.json();

    res = res.data;

    if (res.status == 1) {
      $("#msg").html(`
        <div class="alert alert-success" role="alert">
          Addon Active Succefully !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
        location.href = "addons.html";
      }, 3000);
    } else {
      $("#msg").html(`
        <div class="alert alert-danger" role="alert">
           Error !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
      }, 3000);
    }
  }
}

function addonPurchaseNavigate(data) {
  let x = JSON.stringify(data);
  localStorage.setItem("addonPOST", x);
  window.location.href = "addonPurchase.html";
}

function loadAddonDetails() {
  let data = localStorage.getItem("addonPOST");
  data = JSON.parse(data);
  let wallet = localStorage.getItem("K_wallet");

  var t = `
    <div>
        <h2 class="wallet-balance card-div">
          wallet : ${wallet}
        </h2>
        <h2 class="theme-price card-div">
          price : ${data.price}
        </h2>
    </div>
  `;
  $("#res").append(t);

  var t = `
          <div class="product-card">
            <div class="product-card-top">
              <span>No :  ${data.id}  </span>
              <span> ${data.purchase_status == 1 ? "PURCHASED" : data.price + " Rs."
    } </span>
            </div>
            <div>
              <div class=" text-center">
                <p> 
                  discription : ${data.description} <br>
                  <a target="_blank" href="${data.links}">view more</a>
                </p>
                <div class="btn-group">
                    <button 
                      class="btn btn-success" 
                      onclick='themePurchase(${JSON.stringify(
      data
    )})'>PURCHASE</button>
                    </div>
                  <br>
                </div>
              </div>
            </div>
    `;
  $("#res").append(t);
  $("#addonName").html(data.name);
}

async function themePurchase(data) {
  if (confirm("are you sure ?")) {
    const formData = new FormData();

    formData.append("type", "15");

    formData.append("id", data.id);

    formData.append("price", data.price);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let res = await req.json();

    data = res.data;

    if (data.status == 1) {
      $("#msg").html(`
        <div class="alert alert-success" role="alert">
          Addon Purchase Succefully !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
        localStorage.setItem("K_wallet", data.wallet_balance);
        location.href = "addons.html";
      }, 3000);
    } else {
      $("#msg").html(`
        <div class="alert alert-danger" role="alert">
           Error ! ${data.msg}
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
      }, 3000);
    }
  }
}

async function loadThemeStatus() {
  // load THEME addons from client api

  let name = "THEME";

  loadingScreen(true);

  const formData = new FormData();

  formData.append("type", "16");

  formData.append("name", name);

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let data = await req.json();

  loadingScreen(false);

  data = data.data;

  if (data.status == 0) {
    $("#res").html(`
      <div class="alert alert-danger" role="alert">
          Error ! ${data.msg}
      </div>
      <div class="alert alert-info" role="alert">
          click here to manage addons
          <a href="addons.html">click me</a>
      </div>
    `);
  }
}

function manageProduct(data) {
  let x = JSON.stringify(data);
  localStorage.setItem("productPOST", x);
  window.location.href = "manageProduct.html";
}

async function getDataForManageProduct() {
  // set values to manage product form
  let x = localStorage.getItem("productPOST");

  let data = JSON.parse(x);

  let formData = new FormData();
  formData.append("type", 95);
  formData.append("product_varient_id", data.id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let buying_price = res.data.buying_price;

  for (var key in data) {
    $("#" + key).val(data[key]);
  }

  let btnColor = data.status == 1 ? "danger" : "success";
  let btnText = data.status == 1 ? "Disable" : "Enable";

  let btn = `
      <button type="button" 
        onclick='disableProduct( ${data.id} , ${data.status} )' 
      class="btn btn-${btnColor}"> ${btnText} </button>
    `;

  $("#disBtn").html(btn);

  $("#pid").val(data.id);

  $("#stock").html(`
    Your current stock is ${data.qty} pcs
  `);

  $("#newprice").val(buying_price);
  $("#newShowPrice").val(data.price);
}

// load shop info in form

function loadShopInfo() {
  $("#name").val(localStorage.getItem("K_name"));
  $("#address").val(localStorage.getItem("K_address"));
  $("#mobile").val(localStorage.getItem("K_mobile"));
  $("#email").val(localStorage.getItem("K_email"));
}

// update admin info function

$("#updateAdminInfo").on("submit", async function (e) {
  e.preventDefault();

  let id = localStorage.getItem("K_id");

  const formData = new FormData(this);

  formData.append("type", "20");
  formData.append("id", id);

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let data = await req.json();

  if (data.data.status == 1) {
    // $("#updateAdminInfo")[0].reset();

    localStorage.setItem("K_name", data.data.name);
    localStorage.setItem("K_address", data.data.address);
    localStorage.setItem("K_mobile", data.data.mobile);
    localStorage.setItem("K_email", data.data.email);

    $("#msg").html(`
        <div class="alert alert-success">
          Info updated succefully !
        </div>
      `);
    setTimeout(() => {
      $("#msg").html("");
    }, 2000);
  }
});

// change admin password

$("#repassword").on("keyup", function () {
  $("#error_1").html("");
  if (this.value != $("#password").val()) {
    $("#error_2").html("password not matched");
    $("#submit").attr("disabled", true);
  } else {
    $("#error_2").html("");
    $("#submit").attr("disabled", false);
  }
});

$("#chngPassFrm").on("submit", async function (e) {
  e.preventDefault();

  if ($("#password").val() == "") {
    $("#error_1").html("enter new password");
  } else if ($("#repassword").val() == "") {
    $("#error_1").html("");
    $("#error_2").html("re-enter new password");
  } else {
    $("#error_1").html("");
    $("#error_2").html("");

    let id = localStorage.getItem("K_id");

    const formData = new FormData(this);

    formData.append("type", "21");
    formData.append("id", id);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();

    if (data.data.status == 1) {
      $("#msg").html(`
          <div class="alert alert-success">
            password updated succefully !
          </div>
        `);
      setTimeout(() => {
        $("#msg").html("");
      }, 2000);

      $("#chngPassFrm")[0].reset();
    }
  }
});

$("#updateStock").on("submit", async function (e) {
  e.preventDefault();

  if ($("#newqty").val() == "") {
    $("#error_1").html(`enter quantity`);
  } else if ($("#newprice").val() == "") {
    $("#error_1").html("");
    $("#error_2").html(`enter new price`);
  } else {
    $("#error_1").html("");
    $("#error_2").html("");
    $("#error_3").html("");
    let pid = $("#pid").val();

    const formData = new FormData(this);

    formData.append("type", "19");
    formData.append("id", pid);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();

    if (data.data.status == 1) {
      loadMsg("Product stock updated succefully !", "success");

      let x = localStorage.getItem("productPOST");
      let data = JSON.parse(x);
      data.qty = parseInt(data.qty) + parseInt($("#newqty").val());
      localStorage.setItem("productPOST", JSON.stringify(data));
      let y = localStorage.getItem("productPOST");
      let newData = JSON.parse(y);

      $("#stock").html(`
        your current stock is ${parseInt(newData.qty)} pcs
      `);

      // $("#updateStock")[0].reset();
      // $("#msg").html(`
      //   <div class="alert alert-success" role="alert">
      //     Product stock updated succefully !
      //   </div>
      // `);
      // setTimeout(() => {
      //   $("#msg").html('')
      //   location.href = 'product.html';
      // }, 2000);
    } else {
      loadMsg("Error !", "danger");
    }
  }
});

async function deleteProduct() {
  if (confirm("are you sure ?")) {
    let data = localStorage.getItem("productPOST");
    data = JSON.parse(data);
    let id = data.id;

    var formData = new FormData();

    formData.append("type", 34);
    formData.append("id", id);

    let res = await fetch(appAPI, { method: "POST", body: formData });

    data = await res.json();

    if (data.status == 1) {
      alert("deleted successfully");
      location.href = "product.html";
    } else {
      loadMsg("Error !!!", "danger");
    }
  }
}

// manage category code
async function manageCategory(data) {
  localStorage.setItem("categoryPOST", JSON.stringify(data));

  window.location.href = "manageCategory.html";
}

function loadManageCategory() {
  let data = localStorage.getItem("categoryPOST");

  data = JSON.parse(data);

  $("#preview_img").attr("src", imgLink + data.images);

  $("#c_id").val(data.id);

  $("#name").val(data.name);
}

// category disble code
async function disableCategory(data) {

  const formData = new FormData();

  formData.append("type", "12");

  formData.append("id", data.id);

  formData.append("status", data.status);

  if (confirm("are you sure ?")) {

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let res = await req.json();

    if (res.status == 1) {
      changeBtn(data);
      loadMsg("Updated successfully", "success");
    } else {
      loadMsg("Error !!!", "danger", 1);
    }

  }
}

async function loadCategoryOption() {
  const formData = new FormData();

  formData.append("type", "9");

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let data = await req.json();

  data = data.data.category;

  $("#category_option").append(data);
}

// category add using form

$("#addCategory").on("submit", async function (e) {
  e.preventDefault();

  if (ash == "") {
    $("#file_error").html(`select image...`);
  } else if ($("#name").val() == "") {
    $("#file_error").html("");
    $("#name_error").html(`enter name...`);
  } else {
    const formData = new FormData(this);

    formData.append("ash", ash); // use for compress image

    formData.append("type", "8");

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();

    if (data.status == 1) {
      ash = "";
      $("#file_error").html("");
      $("#name_error").html("");
      $("#preview_img").attr("src", "");
      $("#name").val("");
      $("#msg").html(`
        <div class="alert alert-success" role="alert">
          Category Added Succefully !
        </div>
      `);
      setTimeout(() => $("#msg").html(""), 2000);
    }
  }
});

// category update using form

$("#updateCategory").on("submit", async function (e) {
  e.preventDefault();

  if ($("#name").val() == "") {
    $("#file_error").html("");
    $("#name_error").html(`enter name...`);
  } else {
    const formData = new FormData(this);

    formData.append("ash", ash); // use for compress image

    formData.append("type", "13");

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();

    if (data.status == 1) {
      alert("updated successfully");
      localStorage.removeItem("categoryPOST");
      location.href = "category.html";
    }
  }
});

// product add using form

$("#addProduct").on("submit", async function (e) {
  e.preventDefault();

  if (ash == "") {
    $("#file_error").html(`select image...`);
  } else if ($("#product_nm").val() == "") {
    $("#file_error").html("");
    $("#name_error").html(`enter name...`);
  } else {
    const formData = new FormData(this);
    formData.append("ash", ash); // use for compress image
    formData.append("type", "6");
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let data = await req.json();
    if (data.status == 1) {
      // ash = "";
      $(window).scrollTop(0);
      $("#msg").html(`
        <div class="alert alert-success" role="alert">
          Product Added Succefully !
        </div>
      `);
      $("#addProduct")[0].reset();
      $("#file_error").html("");
      $("#name_error").html("");
      $("#preview_img").attr("src", "");
      setTimeout(() => $("#msg").html(""), 4000);

      // code for adding product to KA server
      formData.delete("type");
      formData.append("type", "8");
      await fetch(kalamAPI, { method: "POST", body: formData });
      ash = "";
    }
  }
});

async function loadGSTStatus() {
  // load GST addons from client api

  let name = "GST";

  const formData = new FormData();

  formData.append("type", "16");

  formData.append("name", name);

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let data = await req.json();

  data = data.data;

  if (data.status == 0) {
    $("#gst").attr("hidden", true);
  } else {
    $("#gst").attr("hidden", false);
  }
}

// load product varient
function loadVarintFromdata() {
  let data = localStorage.getItem("productPOST");
  data = JSON.parse(data);
  $("#product_id").val(data.product_id);
  $("#product_nm").val(data.product_nm);
}

// add product varient
$("#addProductVarient").on("submit", async function (e) {
  e.preventDefault();

  if (ash == "") {
    $("#file_error").html(`select image...`);
  } else {
    const formData = new FormData(this);

    formData.append("ash", ash); // use for compress image

    formData.append("type", "22");

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();

    if (data.status == 1) {
      ash = "";
      loadMsg("Product Added Succefully !", "success");
      // $(window).scrollTop(0);
      // $("#msg").html(`
      //   <div class="alert alert-success">
      //     Product Added Succefully !
      //   </div>
      // `);
      // setTimeout(() => $("#msg").html(''), 4000);
      location.href = "product.html";
    } else {
      loadMsg("Error !!", "danger");
      // $(window).scrollTop(0);
      // $("#msg").html(`
      //   <div class="alert alert-danger">
      //     Error ! Try after some time
      //   </div>
      // `);
      // setTimeout(() => $("#msg").html(''), 4000);
    }
  }
});

// load product id for image upload

function loadImageFromdata() {
  let data = localStorage.getItem("productPOST");
  data = JSON.parse(data);
  $("#pid").val(data.id);
}

// add more product image

$("#addMoreProductImage").on("submit", async function (e) {
  e.preventDefault();

  if (ash == "") {
    $("#file_error").html(`select image...`);
  } else {
    const formData = new FormData(this);

    formData.append("ash", ash); // use for compress image

    formData.append("type", "23");

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();

    if (data.status == 1) {
      ash = "";
      $(window).scrollTop(0);
      $("#preview_img").attr("src", "");
      $("#msg").html(`
        <div class="alert alert-success">
          Image Added Succefully !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
        location.href = "addMoreImages.html";
      }, 4000);
    } else {
      $(window).scrollTop(0);
      $("#msg").html(`
          <div class="alert alert-danger">
            Error ! Try after some time
          </div>
        `);
      setTimeout(() => $("#msg").html(""), 4000);
    }
  }
});

// update product details
$("#updateProduct").on("submit", async function (e) {
  e.preventDefault();

  let prdata = localStorage.getItem("productPOST");
  prdata = JSON.parse(prdata);

  const formData = new FormData(this);

  formData.append("type", "24");
  formData.append("pid", prdata.id);
  formData.append("product_id", prdata.product_id);

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let data = await req.json();

  if (data.status == 1) {
    ash = "";
    $("#preview_img").attr("src", "");
    loadMsg("Product Updated Succefully !", "success");
    // $(window).scrollTop(0);
    // $("#msg").html(`
    //   <div class="alert alert-success">
    //     Product Updated Succefully !
    //   </div>
    // `);
    // setTimeout(() => {
    //   $("#msg").html('')
    // }, 4000);
  } else {
    loadMsg("Error !", "danger");
    // $(window).scrollTop(0);
    // $("#msg").html(`
    //   <div class="alert alert-danger">
    //     Error ! Try after some time
    //   </div>
    // `);
    // setTimeout(() => $("#msg").html(''), 4000);
  }
});

// load all images

async function loadAllImages() {
  let pid = $("#pid").val();

  const formData = new FormData();

  formData.append("type", "25");
  formData.append("pid", pid);

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let data = await req.json();

  if (data.status == 0) {
    $("#imgList").html(`<br>
          <div class="alert alert-danger">
            No Image Found
          </div>
      `);
  } else {
    data = data.data;

    data.forEach((item) => {
      let t = `
          <div
            class="img-pr-list-div">
            <i class="bi bi-trash delIcon"
              onclick='deleteProductImage(${JSON.stringify(item)})'
            ></i>
            <img src="${imgLink + item.image_name}" alt="product image">
          </div>
      `;

      $("#imgList").append(t);
    });
  }
}

// delete product image

async function deleteProductImage(data) {
  if (confirm("Photo will be deleted?")) {
    const formData = new FormData();

    formData.append("type", "26");
    formData.append("id", data.id);
    formData.append("image_name", data.image_name);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let res = await req.json();

    if (res.status == 1) {
      $(window).scrollTop(0);
      $("#msg").html(`
        <div class="alert alert-success">
          Image Deleted Succefully !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
        location.href = "addMoreImages.html";
      }, 4000);
    } else {
      $(window).scrollTop(0);
      $("#msg").html(`
          <div class="alert alert-danger">
            Error ! Try after some time
          </div>
        `);
      setTimeout(() => $("#msg").html(""), 4000);
    }
  }
}

// user signup function

$("#signupFrm").on("submit", async function (e) {
  e.preventDefault();

  $("#signup-button").prop("disabled", true);

  if ($("#name").val() == "") {
    $("#name_error").html("enter name");
  } else if ($("#mobile").val() == "") {
    $("#name_error").html("");
    $("#mobile_error").html("enter mobile");
  } else if ($("#mobile").val().length != 10) {
    $("#name_error").html("");
    $("#mobile_error").html("mobile no must be 10 digit");
  } else if ($("#username").val() == "") {
    $("#name_error").html("");
    $("#mobile_error").html("");
    $("#username_error").html("enter username");
  } else if ($("#password").val() == "") {
    $("#name_error").html("");
    $("#mobile_error").html("");
    $("#username_error").html("");
    $("#error_1").html("enter password");
  } else if ($("#repassword").val() == "") {
    $("#name_error").html("");
    $("#mobile_error").html("");
    $("#username_error").html("");
    $("#error_1").html("");
    $("#error_2").html("re-enter above password");
  } else {
    $("#name_error").html("");
    $("#mobile_error").html("");
    $("#username_error").html("");
    $("#error_1").html("");
    $("#error_2").html("");


    // code for  wallet sourav

    let wallatval = sessionStorage.getItem("wallatval");
    let refer_means = localStorage.getItem("refer_means");
    let refer_mode = localStorage.getItem("refer_mode");
    let refer_type = localStorage.getItem("refer_type");
    let senderid = sessionStorage.getItem("senderid");
    let preBal = sessionStorage.getItem("preBal");
    let preCode = sessionStorage.getItem("preCode");
    if (wallatval == null) {
      wallatval = 0;
    }
    const formData = new FormData(this);

    formData.append("type", "2");
    formData.append("wallatval", wallatval);
    formData.append("refer_means", refer_means);
    formData.append("refer_mode", refer_mode);
    formData.append("refer_type", refer_type);
    formData.append("senderid", senderid);
    formData.append("preCode", preCode);
    formData.append("preBal", preBal);
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();

    res = res.data;

    console.log(res);

    if (res.status == 1) {
      $(window).scrollTop(0);
      $("#msg").html(`
        <div class="alert alert-success">
          you are now our member !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
        localStorage.setItem("K_type", res.type);
        localStorage.setItem("K_id", res.id);
        localStorage.setItem("K_status", 1);
        localStorage.setItem("K_name", res.name);
        localStorage.setItem("K_address", "");
        localStorage.setItem("K_mobile", res.mobile);
        localStorage.setItem("K_email", res.email);
        localStorage.setItem("K_wallet", res.wallat);
        location.href = "user/home.html";
      }, 4000);
    } else {
      $(window).scrollTop(0);
      $("#msg").html(`
          <div class="alert alert-danger">
            Error ! ${res.msg}
          </div>
        `);
      setTimeout(() => $("#msg").html(""), 4000);
    }
  }

  $("#signup-button").prop("disabled", false);
});

function alertMsg(alerttype, msg) {
  $(window).scrollTop(0);
  return `
    <div class="alert alert-${alerttype}">
      ${msg}
    </div>
  `;
}

// add staff function

$("#addStaff").on("submit", async function (e) {
  e.preventDefault();

  let s = [];

  $.each($('input[name="role[]"]:checked'), function () {
    s.push($(this).val());
  });

  if ($("#username").val() == "") {
    $("#msg").html(alertMsg("danger", "Please fill username"));
  } else if ($("#password").val() == "") {
    $("#msg").html(alertMsg("danger", "Please fill password"));
  } else if ($("#name").val() == "") {
    $("#msg").html(alertMsg("danger", "Please fill name"));
  } else if ($("#address").val() == "") {
    $("#msg").html(alertMsg("danger", "Please fill address"));
  } else if ($("#mobile").val() == "") {
    $("#msg").html(alertMsg("danger", "Please fill mobile"));
  } else if ($("#type_option").val() == "") {
    $("#msg").html(alertMsg("danger", "Please select staff type"));
  } else {
    const formData = new FormData(this);

    formData.append("type", "27");

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let res = await req.json();

    res = res.data;

    if (res.status == 0) {
      $("#msg").html(alertMsg("danger", res.msg));
    } else {
      $("#addStaff")[0].reset();
      $("#msg").html(alertMsg("success", res.msg));
      loadStaff();
    }
  }
});

// load staff

async function loadStaff() {
  $("#res").html("");

  const formData = new FormData();
  formData.append("type", "28");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();

  res = res.data;

  res.forEach(function (data) {
    let btnColor = data.status == 1 ? "danger" : "success";
    let btnText = data.status == 1 ? "Disable" : "Enable";

    let btn = `
      <button type="button"
        id="${data.id}" 
        onclick='updateUserStatus( ${JSON.stringify(data)} )' 
      class="btn btn-${btnColor}"> ${btnText} </button>
    `;

    var t = `
        <div class="user-card">
            <div class="user-card-top">
                <span> # ${data.id} . ${data.name} </span>
                <span> </span>
            </div>
            <div class="user-card-bottom">
                <div>
                    <p>
                      ${data.mobile} <br>
                      ${data.address} <br>
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
                    <button type="button" 
                      onclick='staffManage(${JSON.stringify(
          data
        )})' class="btn btn-warning">Manage</button>
                    ${btn}
                </div>
            </div>
        </div>
      `;

    $("#res").append(t);
  });
}

// load staff manage

function staffManage(data) {
  data = JSON.stringify(data);
  localStorage.setItem("staffPOST", data);
  location.href = "staffManage.html";
}

function loadStaffDetails() {
  let data = localStorage.getItem("staffPOST");
  data = JSON.parse(data);

  let role_name = data.type == "3" ? "STAFF" : "DELEVERY BOY";

  $("#sid").val(data.id);
  $("#username").val(data.username);
  $("#password").val(data.password);
  $("#name").val(data.name);
  $("#address").val(data.address);
  $("#mobile").val(data.mobile);
  $("#email").val(data.email);
  $("#rtype").val(data.type);
  $("#role_name").val(role_name);

  if (data.role_list.length > 0) {
    data.role_list.forEach((item) => {
      $(`#${item}`).prop("checked", true);
    });
  }

  let optionToSelect = $('#type_option option[value="' + data.type + '"]');

  if (optionToSelect.length > 0) {
    optionToSelect.prop("selected", true);
  }

  if (data.type == 4) {
    let staffRoleListDiv = document.getElementById("staff-role-list");
    staffRoleListDiv.style.display = "none";
  }
}

// staff change option

$("#type_option").on("change", function () {
  if (this.value != "") {
    let role_name = this.value == "3" ? "STAFF" : "DELEVERY BOY";
    $("#rtype").val(this.value);
    $("#role_name").val(role_name);
  }

  var selectedValue = this.value;
  var staffRoleListDiv = document.getElementById("staff-role-list");

  if (selectedValue === "4") {
    staffRoleListDiv.style.display = "none";
  } else {
    staffRoleListDiv.style.display = "flex";
  }
});

// update staff

$("#updateStaff").on("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  formData.append("type", 80);
  const req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;
  if (data.status == 1) {
    alert(data.msg);
    location.href = "staff.html";
  } else {
    alert(data.msg);
  }
});

// update user status

async function updateUserStatus(data) {
  let status = data.status;

  status = status == 1 ? 0 : 1;

  const formData = new FormData();

  formData.append("type", "33");

  formData.append("uid", data.id);

  formData.append("status", status);

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let res = await req.json();

  if (res.status == 1) {
    changeBtn(data);
    loadMsg("updated succefully !!", "success");
  } else {
    loadMsg("Error !!!", "danger", 1);
  }
}

// upload banner

$("#addBannerImage").on("submit", async function (e) {
  e.preventDefault();

  if (ash == "") {
    $("#file_error").html(`select image...`);
  } else {
    const formData = new FormData(this);

    formData.append("ash", ash); // use for compress image

    formData.append("type", "30");

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();

    if (data.status == 1) {
      ash = "";
      $(window).scrollTop(0);
      $("#preview_img").attr("src", "");
      $("#msg").html(`
        <div class="alert alert-success">
          Image Added Succefully !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
        location.href = "banner.html";
      }, 4000);
    } else {
      $(window).scrollTop(0);
      $("#msg").html(`
          <div class="alert alert-danger">
            Error ! Try after some time
          </div>
        `);
      setTimeout(() => $("#msg").html(""), 4000);
    }
  }
});

// load all banner images

async function loadAllBannerImages() {
  const formData = new FormData();

  formData.append("type", "31");

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let data = await req.json();

  if (data.status == 0) {
    $("#imgList").html(`
          <tr>
            <td colspan="4">No Image Found</td>
          </tr>
      `);
  } else {
    data = data.data;

    if (data.length == 0) {
      $("#imgList").append(`
          <tr>
            <th colspan="4">No Image Found</th>
          </tr>
      `);
    } else {
      data.forEach((item, i) => {
        let t = `
          <tr>
            <th> ${i + 1} </th>
            <td>
              <img src="${imgLink + item.image_name
          }" alt="image" class="img-thumbnail">
            </td>
            <td> ${item.banner_type} </td>
            <td>
            <button 
              onclick='deleteBannerImage(${JSON.stringify(item)})'
              class="btn btn-danger">
              <i class="bi bi-trash"></i>
            </button>
            </td>
          </tr>
        `;

        $("#imgList").append(t);
      });
    }
  }
}

// delete banner image

async function deleteBannerImage(data) {
  if (confirm("are you sure?")) {
    const formData = new FormData();

    formData.append("type", "32");
    formData.append("id", data.id);
    formData.append("image_name", data.image_name);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let res = await req.json();

    if (res.status == 1) {
      $(window).scrollTop(0);
      $("#msg").html(`
        <div class="alert alert-success">
          Image Deleted Succefully !
        </div>
      `);
      setTimeout(() => {
        $("#msg").html("");
        location.href = "banner.html";
      }, 4000);
    } else {
      $(window).scrollTop(0);
      $("#msg").html(`
          <div class="alert alert-danger">
            Error ! Try after some time
          </div>
        `);
      setTimeout(() => $("#msg").html(""), 4000);
    }
  }
}

function loadMsg(msg, msgtype, x = 0) {
  let tmr = x == 0 ? 2 : x;

  const t = `
    <div class="custom-model-main model-open-ash">
      <div class="custom-model-inner">
        <!-- <div class="close-btn">×</div> -->
        <div class="custom-model-wrap alert alert-${msgtype}">
          <div class="pop-up-content-wrap">
            ${msg}
            <span id="timer"> ${tmr} </span>
        </div>
        </div>
      </div>
      <div class="bg-overlay"></div>
    </div>
    `;

  $("#msg").append(t);

  function tidClear() {
    if (tmr == 0) {
      clearInterval(tid);
      $(".custom-model-main").removeClass("model-open-ash");
      $("#msg").html("");
    }
  }

  let tid = setInterval(() => {
    $("#timer").html(--tmr);
    tidClear();
  }, 1000);
}

function changeBtn(data) {
  if ($(`#${data.id}`).text().trim() == "Disable") {
    $(`#${data.id}`).text("Enable");
    $(`#${data.id}`).removeClass("btn-danger");
    $(`#${data.id}`).addClass("btn-success");
  } else if ($(`#${data.id}`).text().trim() == "DISABLE") {
    $(`#${data.id}`).text("Enable");
    $(`#${data.id}`).removeClass("btn-danger");
    $(`#${data.id}`).addClass("btn-success");
  } else {
    $(`#${data.id}`).text("DISABLE");
    $(`#${data.id}`).removeClass("btn-success");
    $(`#${data.id}`).addClass("btn-danger");
  }
}

// POS

// search product for POS

async function srchProductForPOS(srchQR = "") {
  if (srchQR == "") {
    srch = $("#srchPOS").val();
  } else {
    srch = srchQR;
  }

  if (srch.length == 0) {
    loadMsg("enter value in search.", "danger", 1);
    $("#res").html(``);
  } else {
    loadingScreen(true);

    const formData = new FormData();
    formData.append("type", 35);
    formData.append("product_nm", srch);

    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();

    let products = data.products;

    loadingScreen(false);

    if (products.length == 0) loadErrorMsg("NO PRODUCTS");

    products.forEach(function (data, i) {
      let styleOne = "";
      let styleTwo = 'style="display:none;"';
      let itemCount = 1;

      let posItemId = JSON.parse(localStorage.getItem("tempPOST"));

      if (posItemId != null) {
        posItemId = posItemId.map((element) => element.var_id);
        let posAvl = posItemId.includes(data.id);

        styleOne = posAvl ? 'style="display:none;"' : "";
        styleTwo = posAvl ? "" : 'style="display:none;"';

        itemCount = JSON.parse(localStorage.getItem("tempPOST"));
        let foundItem = itemCount.find((item) => item.var_id === data.id);
        itemCount = foundItem ? foundItem.qty : 1;
      }

      let t = `
              <div class="product-card">
                  <div class="product-card-top">
                      <span>S NO :  ${++i}  </span>
                      <span> ${data.qty} more left </span>
                  </div>
                  <div class="product-card-bottom">
                      <div>
                          <img src="${imgLink + data.imgs[0]}" />
                      </div>
                      <div>
                          <p> Name : ${data.product_nm} <br> 
                          </p>
                          <p> Price : ${data.price} Rs. </p>
                      </div>
                      
                  </div>
                  <div>
                      <div id="addToPOSBtnDiv">
                          <button type="button" id="addToPOSBtn${data.id}"
                              onclick='addtoPOS(${JSON.stringify(data)})' 
                              class="btn btn-success" ${styleOne}>
                                ADD
                          </button>
                          <div 
                            id="addToPOSCounter${data.id}"
                            class="addToPOSCounter"
                            ${styleTwo}>
                              <button type="button" id="addToPOSBtn${data.id}"
                                onclick='addtoPOSMinus(${JSON.stringify(
        data
      )})' 
                                class="btn btn-success">-</button>
                              <input 
                                id="addToPOSInput${data.id}"
                                value="${itemCount}"
                              readonly>
                              <button type="button" id="addToPOSBtn${data.id}"
                                onclick='addtoPOSPlus(${JSON.stringify(data)})' 
                                class="btn btn-success">+</button>
                          </div>
                      </div>
                  </div>
              </div>
          `;
      $("#res").append(t);
    });
  }
}

// add to pos

const temp_data = {
  var_id: "",
  pro_id: "",
  name: "",
  sku: "",
  price: "",
  qty: "",
  cgst: "",
  sgst: "",
  imgs: "",
};

// new bug 17-12-2023 solved

function posPOSTHandel() {
  let data = localStorage.getItem("tempPOST");

  if (data != null) {
    data = JSON.parse(data);
    let counter = 0;
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item.var_id == temp_data.var_id) {
        item.qty = temp_data.qty;
        counter = 1;
        i = data.length;
      }
    }
    if (counter == 0) {
      data.push(temp_data);
    }
    localStorage.setItem("tempPOST", JSON.stringify(data));
  } else {
    localStorage.setItem("tempPOST", JSON.stringify([temp_data]));
  }

  $("#posCheckout").html(
    "Next " + JSON.parse(localStorage.getItem("tempPOST")).length
  );
}

function gotoposCheckout() {
  if (
    localStorage.getItem("tempPOST") == null ||
    JSON.parse(localStorage.getItem("tempPOST")).length == 0
  ) {
    alert("Please select some itmes");
  } else {
    location.href = "posCheckout.html";
  }
}

function addtoPOS(data) {
  if (data.qty <= 0) {
    alert(`Not enough quantity `);
  } else {
    var x = $(`#addToPOSInput${data.id}`).val();
    $(`#addToPOSBtn${data.id}`).hide();
    $(`#addToPOSCounter${data.id}`).show();
    temp_data.var_id = data.id;
    temp_data.pro_id = data.product_id;
    temp_data.name = data.product_nm;
    temp_data.sku = data.sku;
    temp_data.price = data.price;
    temp_data.qty = x;
    temp_data.cgst = data.cgst;
    temp_data.sgst = data.sgst;
    temp_data.imgs = data.imgs[0];
    posPOSTHandel();
  }
}

function removeFromPOSSearchList(id) {
  let arr = JSON.parse(localStorage.getItem("tempPOST"));
  let arrCopy = arr.filter((obj) => obj.var_id != id);
  localStorage.setItem("tempPOST", JSON.stringify(arrCopy));
}

function addtoPOSMinus(data) {
  var x = $(`#addToPOSInput${data.id}`).val();
  --x;
  temp_data.qty = x;
  if (x <= 0) {
    if (confirm("Are you sure ? ")) {
      $(`#addToPOSBtn${data.id}`).show();
      $(`#addToPOSCounter${data.id}`).hide();
      $(`#addToPOSInput${data.id}`).val(1);
      let arr = JSON.parse(localStorage.getItem("tempPOST"));
      let arrCopy = arr.filter((obj) => obj.var_id != data.id);
      console.log(arrCopy);
      localStorage.setItem("tempPOST", JSON.stringify(arrCopy));
      $("#posCheckout").html(
        "Next " + JSON.parse(localStorage.getItem("tempPOST")).length
      );
    }
  } else {
    $(`#addToPOSInput${data.id}`).val(x);
    $(`#addToPOSInput${data.id}`).val(x);
    items = JSON.parse(localStorage.getItem("tempPOST"));
    items = items.map((item) => {
      if (item.var_id == data.id) item.qty = x;
      return item;
    });
    localStorage.setItem("tempPOST", JSON.stringify(items));
  }
}

function addtoPOSPlus(data) {
  var x = $(`#addToPOSInput${data.id}`).val();
  ++x;
  if (data.qty < x) {
    alert(`Not enough quantity`);
  } else {
    $(`#addToPOSInput${data.id}`).val(x);
    items = JSON.parse(localStorage.getItem("tempPOST"));
    items = items.map((item) => {
      if (item.var_id == data.id) item.qty = x;
      return item;
    });
    localStorage.setItem("tempPOST", JSON.stringify(items));
  }
}

// new bug 17-12-2023 solved

function posInputGet(id) {
  let data = localStorage.getItem("tempPOST");

  if (data != null) {
    data = JSON.parse(data);
    for (let i = 0; i < data.length; i++) {
      let item = data[i];
      if (item.var_id == id) {
        return item.qty;
      }
    }
    return 1;
  } else {
    return 1;
  }
}

function checkPOSItem() {
  let data = JSON.parse(localStorage.getItem("tempPOST"));
  if (data != null) $("#posCheckout").html("Next " + data.length);
}

function loadPOSItem(not_available_products = "") {
  $("#res").html("");

  let data = JSON.parse(localStorage.getItem("tempPOST"));
  if (data == null) {
    $("#res").html("ERROR !!! RE-ADD ITEM ");
  } else {
    products = data;
    products.forEach(function (data, i) {
      let inputValue = posInputGet(data.var_id);

      let err_msg = "";
      if (not_available_products != "") {
        err_msg = not_available_products.includes(data.var_id) ? "N/A" : "";
      }

      let t = `
              <div class="product-card">
                  <div class="product-card-top">
                      <span>S NO :  ${++i}  </span>
                      <span class="pro_err_msg"> ${err_msg} </span>
                  </div>
                  <div class="product-card-bottom">
                      <div>
                          <img src="${imgLink + data.imgs}" />
                      </div>
                      <div>
                          <p> Name : ${data.name} <br> 
                          </p>
                          <p> Price : ${data.price} Rs. </p>
                      </div>
                      
                  </div>
                  <div>
                      <div id="addToPOSBtnDiv">                       
                          <div 
                            id="addToPOSCounter${data.var_id}"
                            class="addToPOSCounter">
                              <button type="button" id="addToPOSBtn${data.var_id
        }"
                                onclick='addtoPOSMinusCheckout(${JSON.stringify(
          data
        )})' 
                                class="btn btn-success">-</button>
                              <input 
                                id="addToPOSInput${data.var_id}"
                                value="${inputValue}"
                              readonly>
                              <button type="button" id="addToPOSBtn${data.var_id
        }"
                                onclick='addtoPOSPlusCheckout(${JSON.stringify(
          data
        )})' 
                                class="btn btn-success">+</button>
                          </div>
                      </div>
                  </div>
              </div>
          `;
      $("#res").append(t);
    });
  }
}

function removeFromPOS(id) {
  let arr = localStorage.getItem("tempPOST");
  arr = JSON.parse(arr);
  let arrCopy = arr.filter((obj) => obj.var_id !== id);
  localStorage.setItem("tempPOST", JSON.stringify(arrCopy));
  loadPOSItem();
}

function addtoPOSMinusCheckout(data) {
  var x = $(`#addToPOSInput${data.var_id}`).val();
  --x;
  temp_data.qty = x;
  if (x == 0) {
    $(`#addToPOSInput${data.var_id}`).val(1);
    if (confirm("are you sure?")) {
      removeFromPOS(data.var_id);
    }
    temp_data.qty = 1;
  } else {
    $(`#addToPOSInput${data.var_id}`).val(x);
  }
  posCheckoutHandel(data.var_id);
  loadPOSTotal();
}

async function addtoPOSPlusCheckout(data) {
  var x = $(`#addToPOSInput${data.var_id}`).val();
  ++x;
  temp_data.qty = x;

  let formData = new FormData();
  formData.append("type", 60);
  formData.append("pid", data.var_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let db_qty = res.qty[0];

  if (db_qty < x) {
    alert("not enough qty");
  } else {
    $(`#addToPOSInput${data.var_id}`).val(x);
    posCheckoutHandel(data.var_id);
    loadPOSTotal();
  }
}

function posCheckoutHandel(id) {
  let data = localStorage.getItem("tempPOST");

  if (data != null) {
    data = JSON.parse(data);

    for (let i = 0; i < data.length; i++) {
      let item = data[i];

      if (item.var_id == id) {
        item.qty = temp_data.qty;
        i = data.length;
      }
    }

    localStorage.setItem("tempPOST", JSON.stringify(data));
  }
}

function loadPOSTotal() {
  let data = localStorage.getItem("tempPOST");
  data = JSON.parse(data);
  let grandtotal = 0;
  let gst = 0;
  let totalCgst = 0;
  let totalSgst = 0;
  let total = 0;

  data.forEach((item) => {
    if (localStorage.getItem("GSTSTATUS") == "true") {
      total = item.price * item.qty;
      let cgst = total * (item.cgst / 100);
      let sgst = total * (item.sgst / 100);
      totalCgst += cgst;
      totalSgst += sgst;
      gst += cgst + sgst;
      total = total + gst;
    } else {
      total = item.price * item.qty;
    }
    grandtotal += total;
  });

  total = parseFloat(grandtotal.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);
  gst = parseFloat(gst.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0]);

  $("#total").val(total);

  if (gst == 0) {
    $("#gst").val(0);
    $("#gst-div").css("display", "none");
  } else {
    $("#gst").val(gst);
    $("#gstSplit").html(` 
        <p>CGST : ${totalCgst} , SGST : ${totalSgst}</p>
    `);
  }

  if ($("#discountval").val() == 0) {
    $("#discount").val(0);
  }

  grandtotal = total + gst;
  $("#grandTotal").val(grandtotal);
}

async function loadGSTStatusCheckout() {
  // load GST addons from client api

  let name = "GST";

  const formData = new FormData();

  formData.append("type", "16");

  formData.append("name", name);

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let data = await req.json();

  data = data.data;

  if (data.status == 0) {
    localStorage.setItem("GSTSTATUS", false);
  } else {
    localStorage.setItem("GSTSTATUS", true);
  }
}

// discount POS

function claculateDiscount() {
  let type = $("#discount_mode").val();
  let discountval = parseInt($("#discountval").val());
  let discount;

  if (discountval == 0 || isNaN(discountval) || discountval == NaN) {
    $("#discount").val(0);
    loadPOSTotal();
    // return 0;
  } else {
    if (type == "flat") {
      discount = discountval;
    } else {
      discount = $("#total").val() * discountval * 0.01;
    }

    grand_total =
      parseFloat($("#total").val()) + parseFloat($("#gst").val()) - discount;

    if (parseFloat(grand_total) < 0) {
      alert(
        "The discount requested exceeds the total value of the transaction."
      );
    } else {
      $("#grandTotal").val(grand_total);

      $("#discount").val(discount);
    }
  }
}

$("#discountval").on("keyup", claculateDiscount);

$("#discount_mode").on("change", claculateDiscount);

// POS FINAL CHECKOUT

$("#poscheckout").on("submit", async function (e) {
  e.preventDefault();

  let date = new Date();

  let order_id =
    "ORD" +
    date.getDate() +
    (date.getMonth() + 1) +
    date.getFullYear() +
    date.getHours() +
    date.getMinutes() +
    date.getSeconds() +
    date.getMilliseconds();

  let productList = localStorage.getItem("tempPOST");

  if ($("#delivery_type_2").prop("checked") == true) {
    delivery_type = $("#delivery_type_2").val();
  } else {
    delivery_type = $("#delivery_type_1").val();
  }

  const formData = new FormData(this);

  let mobile = $("#cs_mobile").val();

  if (mobile == "" || mobile.length < 10) {
    $("#cs_mobile_error").html("enter 10 digit mobile no");
    return null;
  }

  let name = $("#cs_name").val();

  let address = $("#cs_address").val();

  let payment_mode = $("#payment_mode").val();

  let discount_value = $("#discount").val();

  let discount_type = "POS";

  formData.append("order_id", order_id);
  formData.append("mobile", mobile);
  formData.append("name", name);
  formData.append("address", address);
  formData.append("user_id", "NULL");
  formData.append("delivery_type", delivery_type);
  formData.append("payment_mode", payment_mode);
  formData.append("productList", productList);
  formData.append("discount_value", discount_value);
  formData.append("discount_type", discount_type);
  formData.append("address_id", "NULL");
  formData.append("offer_id", "NULL");
  formData.append("order_type", "pos");

  formData.append("type", 59);

  if (JSON.parse(productList).length == 0) {
    alert("0 product added");
    location.href = "pos.html";
  } else {
    let req = await fetch(appAPI, { method: "POST", body: formData });

    let data = await req.json();
    data = data.data;

    if (data.status == 1) {
      alert(data.msg);
      location.href = "posInvoice.html?id=" + order_id;
    } else {
      alert(data.msg);
      loadPOSItem(data.not_available_products);
    }

    // for (const value of formData.values()) {
    //   console.log(value);
    // }
  }
});

async function loadLastPOSDetails(id) {
  const formData = new FormData();
  formData.append("type", "73");
  formData.append("order_id", id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res[0];

  console.log(data);

  let name = "",
    address = "",
    mobile = "",
    pincode = "",
    landmark = "";

  if (data.customer_details.delivery_type == "Pickup at store") {
    name = data.customer_details.name;
    address = "Pickup at store";
    mobile = data.customer_details.mobile;
    pincode = "N/A";
    landmark = "N/A";
  } else {
    let dSS = localStorage.getItem("delivery_slot_id");

    if (dSS == "0--0--0") {
      name = data.customer_details.name;
      address = "N/A";
      mobile = data.customer_details.mobile;
      pincode = "N/A";
      landmark = "N/A";
    } else {
      if (data.customer_details.address == "NULL") {
        name = data.delivery_address_details.name;
        address = data.delivery_address_details.full_address;
        mobile = data.delivery_address_details.mobile;
        pincode = data.delivery_address_details.pincode;
        landmark = data.delivery_address_details.landmark;
      } else {
        name = data.customer_details.name;
        address = data.customer_details.address;
        mobile = data.customer_details.mobile;
        pincode = "N/A";
        landmark = "N/A";
      }
    }
  }

  let del_st =
    data.customer_details.delivery_slot == null
      ? ``
      : `
        <br><span> Delivery slot : 
            <span class="rs-symbol">
                ${data.customer_details.delivery_slot} 
            </span>
        </span>
    `;

  $("#invoice-no").html(`${id}`);
  $("#store-name").html(`${data.shop_details.name}`);
  $("#store-address").html(`${data.shop_details.address}`);
  $("#store-mobile").html(`${data.shop_details.mobile}`);

  $("#customer-name").html(`${name}`);
  $("#customer-address").html(`${address}`);
  $("#customer-mobile").html(`${mobile}`);
  $("#customer-landmark").html(`${landmark}`);
  $("#customer-pincode").html(`${pincode}`);

  $("#payment-mode").html(`${data.customer_details.payment_mode}`);

  $("#total").html(`${data.customer_details.total}  ${del_st}`);
  $("#gst").html(`${data.customer_details.gst}`);
  $("#discount1").html(`${data.customer_details.discount_value}`);
  $("#grand-total").html(`${data.customer_details.grand_total}`);
  $("#savings").html(`${data.customer_details.fake_discount}`);
  $("#in-date").html(`${data.customer_details.date}`);

  if (data.customer_details.discount_value > 0) {
    $("#discount2").html(`${data.customer_details.discount_value}`);
  } else {
    $("#discount-text").html(`THANK YOU`);
  }

  let product_list = data.products_details;

  product_list.map((item) => {
    item.type_name_1 == undefined ? type_name_1 = "" : type_name_1 = item.type_name_1;
    item.type_name_2 == undefined ? type_name_2 = "" : type_name_2 = item.type_name_2;
    item.type_qty_1 == undefined ? type_qty_1 = "" : type_qty_1 = item.type_qty_1;
    item.type_qty_2 == undefined ? type_qty_2 = "" : type_qty_2 = item.type_qty_2;
    $("#item-list").append(
      `  <p class="para-wala-update"> ${item.name} </p>
                  <p class="para-wala-update">${type_name_1},${type_name_2},${type_qty_1},${type_qty_2}</p>
                <div class="flex-wala flex-wala-1">
                
                  <span>
                    <p>${item.fprice = item.fprice ? item.fprice : ""}</p>
                    <p>${item.price}</p>
                    <p>${item.qty}</p>
                    <p>${item.price * item.qty}</p>
                  </span>
                </div>
            `
    );
  });
}

let cs_address = "";
let delivery_type = "";

$(document).ready(function () {
  $("#delivery_type_1").prop("checked", true);
  delivery_type = $("#delivery_type_1").val();
});

$("#cs_address").keyup(function () {
  $("#delivery_type_2").prop("checked", true);
  cs_address = this.value;
});

function submitValue() {
  if ($("#delivery_type_2").prop("checked") == true) {
    delivery_type = $("#delivery_type_2").val();
  } else {
    delivery_type = $("#delivery_type_1").val();
  }
  console.log(cs_address, delivery_type);
}

$("#cs_mobile").on("keyup", () => {
  $("#cs_mobile_error").html("");
});

// floating button

var $floater = $(".floater");
var $floater__list = $(".floater__list");
var displaybock = "displaybock";
$floater.on("click", function (e) {
  $floater.toggleClass("is-active");
  $floater__list.toggleClass("displaybock");
  e.stopPropagation();
});

// display all recent order

async function displayOrder(order_type) {
  $("#orderList").html("");
  localStorage.setItem("order_type", order_type);
  const formData = new FormData();
  formData.append("type", "57");
  formData.append("order_type", order_type);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;
  console.log(data);
  if (data.length == 0) {
    $("#orderList").html(`  
          <div class="list-end">
            NO MORE DATA
          </div>
      `);
  }

  data.map((item) => {
    $("#orderList").append(orderCardTemplate(item, item.user_id));
  });
}

async function displayOrderDeliveryPanel(order_type) {
  $("#orderList").html("");
  const formData = new FormData();
  formData.append("type", "57");
  formData.append("order_type", order_type);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;

  if (data.length == 0) {
    $("#orderList").html(`  
          <div class="list-end">
            NO MORE DATA
          </div>
      `);
  }

  data.map((item) => {
    $("#orderList").append(
      orderCardTemplate(item, item.user_id, "DELIVERYPANEL")
    );
  });
}

// function userHistory() {
//   window.location.href = "usersHistory.html";
// }

// load user history

function orderCardTemplate(item, user_id, panel = "") {



  panel =
    panel == "DELIVERYPANEL"
      ? "orderHistoryDetailsDeliveryPanel"
      : "orderHistoryDetails";



  return ` 
      <div class="order-card">
          <div class="order-card-top">
              <span>ORDER ID :  ${item.order_id}  </span>
              <span class="order-type"> ${item.order_type} </span>
          </div>
          <div class="order-card-bottom">
              <div style="display:none;"></div>
              <div>
                  <p>
                      Status : ${item.ORDER_STATUS.length != 0
      ? item.ORDER_STATUS[
        item.ORDER_STATUS.length - 1
      ].status.split(" ")[1]
      : "data fetch error"
    } <br> 
                      No of items : ${item.NO_OF_ITMES} <br>
                      Total Amount : &#8377; ${item.TOTAL_AMOUNT}
                  </p>
              </div>
              <div>
              <a
                  href ="${panel}.html?id=${item.order_id}&user_id=${user_id}" 
                  class="btn btn-warning"> View Details
              </a>
              </div>
          </div>
      </div>    
  `;
}

async function loadUserHistory() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");
  const formData = new FormData();
  formData.append("type", "48");
  formData.append("user_id", id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;

  data.map((item) => {
    $("#orderList").append(orderCardTemplate(item, id));
  });
}

async function loadOrderDetails(order_id, user_id) {
  const formData = new FormData();
  formData.append("type", "49");
  formData.append("user_id", user_id);
  formData.append("order_id", order_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data[0];

  console.log(data);

  $("#order-id").html(order_id);

  if (data.FULL_ADDRESS == null) {
    data.FULL_ADDRESS = {
      name: "N/A",
      type: "N/A",
      mobile: "N/A",
      full_address: "N/A",
    };
  }

  if (user_id == "NULL") {
    data.FULL_ADDRESS = {
      name: data.name,
      type: "N/A",
      mobile: data.mobile,
      full_address: "N/A",
    };
  }

  let pinCode =
    data.FULL_ADDRESS.pincode == undefined
      ? ""
      : ", pincode : " + data.FULL_ADDRESS.pincode;

  $("#cs-name").html(`Name : ${data.FULL_ADDRESS.name} `);
  $("#cs-mob-no").html(`Mobile : ${data.FULL_ADDRESS.mobile} `);
  $("#cs-full-addr").html(
    `Address : ${data.FULL_ADDRESS.full_address} ${pinCode} `
  );

  const products = data.products;

  products.map((item) => {
    $("#load_product_list_invoice").append(
      `
          <div class="order-summry-pro-card">
              <div class="order-summry-pro-card-left">
                  <img src="${imgLink + item.imgs}" alt="${item.imgs}"/>
              </div>
              <div class="order-summry-pro-card-right">
                  <span class="os-pnm">${item.name}</span>
                  <span class="os-pnm">Variant Name : ${item.type_name_1} , ${item.type_qty_1} , ${item.type_name_2} , ${item.type_qty_2}</span>
                  <span class="os-pr">price: ${item.price} , qty : ${item.qty
      } </span>
              </div>
          </div>
        `
    );
  });

  // let discountText = '';
  // let grandTotal = 0;

  // let total_price = products.reduce((sum, item) => sum + (item.price * item.qty), 0);

  // if (data.offer_id == 'null') {
  //   discount = 0;
  //   discountText = '00';
  //   grandTotal = total_price;
  // } else {
  //   if (data.DISCOUNT_TYPE == 'flat') {
  //     discountText = data.DISCOUNT_VALUE;
  //     grandTotal = total_price - data.DISCOUNT_VALUE;
  //   }
  //   if (data.DISCOUNT_TYPE == 'percent') {
  //     let dv = total_price - (total_price * data.DISCOUNT_VALUE * 0.01);
  //     discountText = dv;
  //     grandTotal = total_price - dv;
  //   }
  // }

  $("#price-label").html(`Price (items : ${products.length})`);
  $("#total-price").text(` ${data.total}`);
  $("#discount").text(` ${data.discount_value}`);
  $("#grand-total").text(` ${data.grand_total}`);

  // order-status-change
 
  if (
    data.ORDER_STATUS_DETAILED[data.ORDER_STATUS_DETAILED.length - 1].status ==
    "ORDER CANCELED BY USER"
  ) {
    $("#order-status-change").html(`
      <div class="c-address-section">Order already cancled by user</div>;
    `);

    $("#canBtn").attr("disabled", "disabled");
  }else if(data.ORDER_STATUS_DETAILED[data.ORDER_STATUS_DETAILED.length - 1].status ==
    "ORDER CANCELED BY ADMIN"){
    $("#order-status-change").html(`
    <div class="c-address-section">Order already cancled by admin</div>;
  `);

    $("#canBtn").attr("disabled", "disabled");
  }else{

  }

  const status_list = [
    { name: "ORDER ACCEPTED", value: "ORDER ACCEPTED" },
    { name: "ORDER PACKED", value: "ORDER PACKED" },
    { name: "ORDER OUT FOR DELIVERY", value: "ORDER OUT FOR DELIVERY" },
    { name: "ORDER DELIVERED", value: "ORDER DELIVERED" },
    { name: "ORDER NOT DELIVERED", value: "ORDER NOT DELIVERED" },
  ];

  status_list.forEach((item) => {
    $("#status_options").append(
      $("<option>", {
        value: item.value,
        text: item.name,
      })
    );
  });

  $("#last_status").html(
    ` ${data.ORDER_STATUS_DETAILED[data.ORDER_STATUS_DETAILED.length - 1].status
    } `
  );
  $("#order_id_inp").val(order_id);
  $("#user_id_inp").val(user_id);
}

$("#order-status-update").submit(async function (e) {
  e.preventDefault();

  let stvl = $("#status_options").val();

  if (stvl == "") {
    alert("Please select status first.");
  } else {
    const formData = new FormData(this);
    formData.append("type", "79");
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();

    if (res.data.status == 1) {
      alert(res.data.msg);
      location.reload();
    } else {
      alert(res.data.msg);
    }
  }
});

async function loadOrderDetailsDeliveryPanel(order_id, user_id) {
  const formData = new FormData();
  formData.append("type", "49");
  formData.append("user_id", user_id);
  formData.append("order_id", order_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data[0];

  console.log(data);

  $("#order-id").html(order_id);

  if (data.FULL_ADDRESS == null) {
    data.FULL_ADDRESS = {
      name: "N/A",
      type: "N/A",
      mobile: "N/A",
      full_address: "N/A",
    };
  }

  if (user_id == "NULL") {
    data.FULL_ADDRESS = {
      name: data.name,
      type: "N/A",
      mobile: data.mobile,
      full_address: "N/A",
    };
  }

  let pinCode =
    data.FULL_ADDRESS.pincode == undefined
      ? ""
      : ", pincode : " + data.FULL_ADDRESS.pincode;

  $("#cs-name").html(`Name : ${data.FULL_ADDRESS.name} `);
  $("#cs-mob-no").html(`Mobile : ${data.FULL_ADDRESS.mobile} `);
  $("#cs-full-addr").html(
    `Address : ${data.FULL_ADDRESS.full_address} ${pinCode} `
  );

  const products = data.products;

  products.map((item) => {
    $("#load_product_list_invoice").append(
      `
          <div class="order-summry-pro-card">
              <div class="order-summry-pro-card-left">
                  <img src="${imgLink + item.imgs}" alt="${item.imgs}"/>
              </div>
              <div class="order-summry-pro-card-right">
                  <span class="os-pnm">${item.name}</span>
                  <span class="os-pr">price: ${item.price} , qty : ${item.qty
      } </span>
              </div>
          </div>
        `
    );
  });

  $("#price-label").html(`Price (items : ${products.length})`);
  $("#total-price").text(` ${data.total}`);
  $("#discount").text(` ${data.discount_value}`);
  $("#grand-total").text(` ${data.grand_total}`);

  // order-status-change

  if (
    data.ORDER_STATUS_DETAILED[data.ORDER_STATUS_DETAILED.length - 1].status ==
    "ORDER CANCELED"
  ) {
    $("#order-status-change").html(`
      <div class="c-address-section">Order already cancled by user</div>;
    `);
  }

  const status_list = [
    { name: "ORDER DELIVERED", value: "ORDER DELIVERED" },
    { name: "ORDER NOT DELIVERED", value: "ORDER NOT DELIVERED" },
  ];

  status_list.forEach((item) => {
    $("#status_options").append(
      $("<option>", {
        value: item.value,
        text: item.name,
      })
    );
  });

  $("#last_status").html(
    ` ${data.ORDER_STATUS_DETAILED[data.ORDER_STATUS_DETAILED.length - 1].status
    } `
  );
  $("#order_id_inp").val(order_id);
  $("#user_id_inp").val(user_id);
}

// qr scan code

document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  function scan(callback) {
    cordova.plugins.barcodeScanner.scan(
      function (result) {
        if (!result.cancelled) {
          alert("Barcode type is: " + result.format);
          alert("Decoded text is: " + result.text);
          callback(result.text);
        } else {
          alert("You have cancelled scan");
        }
      },
      function (error) {
        alert("Scanning failed: " + error);
      },
      {
        formats: "QR_CODE,PDF_417,EAN_8,EAN_13,CODE_39,CODE_93,CODE_128",
      }
    );
  }

  // search for POS on scan QR

  const scanBtnPOS = document.getElementById("scanBtnPOS");
  if (scanBtnPOS) scanBtnPOS.addEventListener("click", scanPOS);

  function scanPOS() {
    scan((QRtext) => {
      srchProductForPOS(QRtext);
    });
  }

  // search for product list on scan QR

  const scanBtnProduct = document.getElementById("scanBtnProduct");
  if (scanBtnProduct) scanBtnProduct.addEventListener("click", scanProList);

  // document.getElementById("scanBtnProduct").addEventListener("click", scanProList);

  function scanProList() {
    scan((QRtext) => {
      loadFilterProduct("", "", "", "", "", 1, QRtext);
    });
  }

  // search product for Prodcut Add by kalam server

  const scanBarForProdcutAdd = document.getElementById("scanBarForProdcutAdd");
  if (scanBarForProdcutAdd)
    scanBarForProdcutAdd.addEventListener("click", scanProAddKa);

  function scanProAddKa() {
    scan((QRtext) => {
      srchPrd("SKU", QRtext);
    });
  }
}

// loading skelton for infinite scroll

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

// load category all function

function categoryListTemplate(data, x) {
  let statusText = data.status == 1 ? "DISABLE" : "ENABLE";
  let statusColor = data.status == 1 ? "danger" : "success";
  let status = data.status == 1 ? "ENABLE" : "DISABLE";
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
            onclick='manageCategory(${JSON.stringify(data)})' 
            class="btn btn-warning">Manage</button>
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

// load category function infinte scroll enabled

function loadCategory() {
  loadingScreenINF();

  let x = 1;
  let pageNumber = 1;
  let isPageLoad = true;
  const dataContainer = document.querySelector("#res");
  let pageload = true;

  const formData = new FormData();
  formData.append("type", "10");

  const renderData = (data) => {
    let htmlStr = categoryListTemplate(data, x);
    x++;
    dataContainer.insertAdjacentHTML("beforeend", htmlStr);
  };

  const noRenderData = () => {
    let htmlStr = `  
      <div class="list-end" id="loaddiv${x}">
        NO MORE DATA
      </div>
    `;

    dataContainer.insertAdjacentHTML("beforeend", htmlStr);
    document.getElementById("loading_end").style.display = "none";
  };

  async function getData(pageNumber) {
    formData.append("page_number", pageNumber);
    const resp = await fetch(appAPI, { method: "POST", body: formData });
    const data = await resp.json();
    let category = data.category;
    return category;
  }

  const loadData = (pageNumber) => {
    return new Promise((resolve) => {
      getData(pageNumber).then((data) => {
        if (data.length > 0) {
          data && data.forEach((data) => renderData(data));
          if (data.length < 20) {
            pageload = false;
            noRenderData();
          }
        } else {
          pageload = false;
          noRenderData();
        }
        if (isPageLoad) {
          obseveLastData();
          isPageLoad = false;
        }
        resolve("True");
      });
    });
  };

  loadData(pageNumber).then(() => { });

  const infScrollCallback = (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    pageNumber += 1;
    loadData(pageNumber)
      .then(() => {
        obseveLastData();
      })
      .catch(() => { });
    observer.unobserve(entry.target);
  };

  const infScrollObserver = new IntersectionObserver(infScrollCallback, {});

  const obseveLastData = () => {
    y = x - 5;
    if (pageload)
      infScrollObserver.observe(document.querySelector(`#res > #loaddiv${y}`));
  };
}

let srchValueCatg = "";

const handleEventCatg = (event) => {
  document.getElementById("res").innerHTML = "";
  if (event.target.id === "textInputCatg") {
    srchValueCatg = event.target.value;
  } else {
  }

  if (srchValueCatg != "") {
    loadFilterCategory(srchValueCatg, 1);
  } else {
    loadCategory();
  }
};

const textInputCatg = document.getElementById("textInputCatg");
if (textInputCatg) textInputCatg.addEventListener("input", handleEventCatg);

// catageory search list

async function loadFilterCategory(srchValue = "", page_number) {
  let data = [];
  const formData = new FormData();
  formData.append("type", "37");
  formData.append("page_number", page_number);
  formData.append("srchValue", srchValue);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  data = await req.json();
  data = data.category;
  if (typeof data == "undefined") data = [];
  if (data.length > 0) {
    $("#loading_end").html("");
    let i = 1;
    data &&
      data.forEach((data) => {
        $("#res").append(categoryListTemplate(data, i));
        i++;
      });
  } else {
    let htmlStr = `  
      <div class="list-end">
        NO MORE DATA
      </div>
    `;
    document.getElementById("loading_end").style.display = "none";
    $("#res").html(htmlStr);
  }
}

// load user all function

// user template

function userListTemplate(data, x) {
  let btnColor = data.status == 1 ? "danger" : "success";
  let btnText = data.status == 1 ? "Disable" : "Enable";

  let btn = `
        <button type="button"
          id="${data.id}" 
          onclick='updateUserStatus( ${JSON.stringify(data)} )' 
        class="btn btn-${btnColor}">${btnText}</button>
      `;

  return `
    <div class="user-card" id="loaddiv${x}" >
      <div class="user-card-top">
          <span>${x} </span>
          <span> </span>
      </div>
      <div class="user-card-bottom">
          <div>
              <p> 
                Name : ${data.name} <br> 
                Mobile : ${data.mobile} <br> 
                Address : ${data.address} <br>
                DOR : ${new Date(data.date)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/ /g, "-")}
              </p>
          </div>
          <div>
              <a class="btn btn-warning" href="usersHistory.html?id=${data.id
    }" >History</a>
              ${btn}
          </div>
      </div>
    </div>
  `;
}

// load user function infinte scroll enabled

function loadUser() {
  loadingScreenINF();

  let x = 1;
  let pageNumber = 1;
  let isPageLoad = true;
  const dataContainer = document.querySelector("#res");
  let pageload = true;

  const formData = new FormData();
  formData.append("type", "29");

  const renderData = (data) => {
    let htmlStr = userListTemplate(data, x);
    x++;
    dataContainer.insertAdjacentHTML("beforeend", htmlStr);
  };

  const noRenderData = () => {
    let htmlStr = `  
      <div class="list-end" id="loaddiv${x}">
        NO MORE DATA
      </div>
    `;

    dataContainer.insertAdjacentHTML("beforeend", htmlStr);
    document.getElementById("loading_end").style.display = "none";
  };

  async function getData(pageNumber) {
    formData.append("page_number", pageNumber);
    const resp = await fetch(appAPI, { method: "POST", body: formData });
    const data = await resp.json();
    return data.data;
  }

  const loadData = (pageNumber) => {
    return new Promise((resolve) => {
      getData(pageNumber).then((data) => {
        if (data.length > 0) {
          data && data.forEach((data) => renderData(data));
          if (data.length < 20) {
            pageload = false;
            noRenderData();
          }
        } else {
          pageload = false;
          noRenderData();
        }
        if (isPageLoad) {
          obseveLastData();
          isPageLoad = false;
        }
        resolve("True");
      });
    });
  };

  loadData(pageNumber).then(() => { });

  const infScrollCallback = (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    pageNumber += 1;
    loadData(pageNumber)
      .then(() => {
        obseveLastData();
      })
      .catch(() => { });
    observer.unobserve(entry.target);
  };

  const infScrollObserver = new IntersectionObserver(infScrollCallback, {});

  const obseveLastData = () => {
    let y = x - 5;
    if (pageload)
      infScrollObserver.observe(document.querySelector(`#res > #loaddiv${y}`));
  };
}

// user search
$("#textInputUser").keyup(async function () {

  let data = [];
  const formData = new FormData();
  formData.append("type", "96");
  formData.append("srchValue", this.value);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  data = await req.json();
  data = data.data;
  if (typeof data == "undefined") data = [];

  const dataContainer = document.querySelector("#res");

  if (data.length == 0) {
    let htmlStr = `  
      <div class="list-end">
        NO MORE DATA
      </div>
    `;

    dataContainer.innerHTML = "";
    dataContainer.insertAdjacentHTML("beforeend", htmlStr);
    document.getElementById("loading_end").style.display = "none";
  } else {
    dataContainer.innerHTML = "";
    data.map((item, i) => {
      dataContainer.innerHTML += userListTemplate(item, i + 1);
    });
  }
});

async function loadFilterUser(srchValue = "", page_number) {
  let data = [];
  const formData = new FormData();
  formData.append("type", "38");
  formData.append("page_number", page_number);
  formData.append("srchValue", srchValue);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  data = await req.json();
  data = data.data;
  if (typeof data == "undefined") data = [];
  if (data.length > 0) {
    $("#loading_end").html("");
    let i = 1;
    data &&
      data.forEach((data) => {
        $("#res").append(userListTemplate(data, i));
        i++;
      });
  } else {
    let htmlStr = `  
      <div class="list-end">
        NO MORE DATA
      </div>
    `;
    document.getElementById("loading_end").style.display = "none";
    $("#res").html(htmlStr);
  }
}

// load product all js

// load Product template with infinite scroll

function ProductListTemplate(data, x) {
  let btnColor = data.status == 1 ? "danger" : "success";
  let btnText = data.status == 1 ? "Disable" : "Enable";

  let btn = `
    <button 
      id="${data.id}" 
      onclick='disableProduct( ${data.id} , ${data.status} )' 
    class="btn btn-${btnColor}"> ${btnText} </button>
  `;

  return `
    <div class="product-card" id="loaddiv${x}">
              <div class="product-card-top">
                  <span class="pr-id-name"># ${data.id} . ${data.product_nm
    }  </span>
                  <span>Stock : ${data.qty} </span>
              </div>
              <div class="product-card-bottom">
                  <div>
                      <img 
                          src="${imgLink + data.imgs[0]}"
                          ${errorImgUrl} alt="img"
                      />
                  </div>
                  <div>
                      <p>
                          ${data.cat_nm} <br>
                          <del>${data.fprice}</del>  <br>
                      </p>
                      <p> Price : ${data.price} Rs. </p>
                  </div>
                  <div>
                      <button type="button" 
                        onclick='manageProduct(${JSON.stringify(data)})' 
                        class="btn btn-warning">Manage</button>
                      ${btn}
                  </div>
              </div>
    </div>
  `;
}

// load Product function infinte scroll enabled

function loadProduct() {
  // load from client api

  loadingScreenINF();

  let x = 1;
  let pageNumber = 1;
  let isPageLoad = true;
  const dataContainer = document.querySelector("#res");
  let pageload = true;

  const formData = new FormData();
  formData.append("type", "5");

  const renderData = (data) => {
    let htmlStr = ProductListTemplate(data, x);
    x++;
    dataContainer.insertAdjacentHTML("beforeend", htmlStr);
  };

  const noRenderData = () => {
    let htmlStr = `  
      <div class="list-end" id="loaddiv${x}">
        NO MORE DATA
      </div>
    `;

    dataContainer.insertAdjacentHTML("beforeend", htmlStr);
    document.getElementById("loading_end").style.display = "none";
  };

  async function getData(pageNumber) {
    formData.append("page_number", pageNumber);
    const resp = await fetch(appAPI, { method: "POST", body: formData });
    const data = await resp.json();
    return data.products;
  }

  const loadData = (pageNumber) => {
    return new Promise((resolve) => {
      getData(pageNumber).then((data) => {
        if (data.length > 0) {
          data && data.forEach((data) => renderData(data));
          if (data.length < 20) {
            pageload = false;
            noRenderData();
          }
        } else {
          pageload = false;
          noRenderData();
        }
        if (isPageLoad) {
          obseveLastData();
          isPageLoad = false;
        }
        resolve("True");
      });
    });
  };

  loadData(pageNumber).then(() => { });

  const infScrollCallback = (entries, observer) => {
    const entry = entries[0];
    if (!entry.isIntersecting) return;
    pageNumber += 1;
    loadData(pageNumber)
      .then(() => {
        obseveLastData();
      })
      .catch(() => { });
    observer.unobserve(entry.target);
  };

  const infScrollObserver = new IntersectionObserver(infScrollCallback, {});

  const obseveLastData = () => {
    let y = x - 5;
    if (pageload)
      infScrollObserver.observe(document.querySelector(`#res > #loaddiv${y}`));
  };
}

let srchValueProduct = "";
let sel1ValueProduct = "";
let sel2ValueProduct = "";
let sel3ValueProduct = "";
let sel4ValueProduct = "";

const handleEventProduct = (event) => {
  document.getElementById("res").innerHTML = "";

  if (event.target.id === "textInputProduct") {
    srchValueProduct = event.target.value;
  } else if (event.target.id === "select1Product") {
    sel1ValueProduct = event.target.value;
  } else if (event.target.id === "select2Product") {
    sel2ValueProduct = event.target.value;
  } else if (event.target.id === "select3Product") {
    sel3ValueProduct = event.target.value;
  } else if (event.target.id === "select4Product") {
    sel4ValueProduct = event.target.value;
  } else if (event.target.id === "inputRange") {
    sel3ValueProduct = event.target.value;
  } else {
  }

  if (
    srchValueProduct != "" ||
    sel1ValueProduct != "" ||
    sel2ValueProduct != "" ||
    sel3ValueProduct != "" ||
    sel4ValueProduct != ""

  ) {
    loadFilterProduct(
      srchValueProduct,
      sel1ValueProduct,
      sel2ValueProduct,
      sel3ValueProduct,
      sel4ValueProduct,
      1,
      ""
    );
  } else {
    loadProduct();
  }
};

const textInputProduct = document.getElementById("textInputProduct");
if (textInputProduct)
  textInputProduct.addEventListener("input", handleEventProduct);

const select1Product = document.getElementById("select1Product");
if (select1Product)
  select1Product.addEventListener("change", handleEventProduct);

const select2Product = document.getElementById("select2Product");
if (select2Product)
  select2Product.addEventListener("change", handleEventProduct);

const select3Product = document.getElementById("select3Product");
if (select3Product)
  select3Product.addEventListener("change", handleEventProduct);

const select4Product = document.getElementById("select4Product");
if (select4Product)
  select4Product.addEventListener("change", handleEventProduct);



async function loadFilterProduct(
  srchValue = "",
  sel1ValueProduct = "",
  sel2ValueProduct = "",
  sel3ValueProduct = "",
  sel4ValueProduct = "",
  page_number,
  sku = ""
) {
  let data = [];
  const formData = new FormData();
  formData.append("type", "39");
  formData.append("page_number", page_number);
  formData.append("srchValue", srchValue);
  formData.append("sku", sku);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  data = await req.json();
  data = data.products;

  if (typeof data == "undefined") data = [];

  // filter by name

  if (srchValue.length > 0) {

    var regex = new RegExp(srchValue, "i");
    data = data.filter(function (item) {
      return regex.test(item.product_nm) || regex.test(item.sku);
    });

  }

  // filter by name or price

  if (sel1ValueProduct.length > 0) {
    if (sel1ValueProduct == "aTz")
      data = data.sort((a, b) => a.product_nm.localeCompare(b.product_nm));
    if (sel1ValueProduct == "zTa")
      data = data.sort((a, b) => b.product_nm.localeCompare(a.product_nm));
    if (sel1ValueProduct == "lTh")
      data = data.sort((a, b) => a.price - b.price);
    if (sel1ValueProduct == "hTl")
      data = data.sort((a, b) => b.price - a.price);
  }

  // filter by expiry

  if (sel2ValueProduct.length > 0) {

    data = data.filter(item => item.expiry !== '' && (item.remain_qty !== '' && parseInt(item.remain_qty) !== 0));

    if (sel2ValueProduct == '7Day') {

      const currentDate = new Date();
      const nextWeekDate = new Date();

      nextWeekDate.setDate(currentDate.getDate() + 7);

      data = data.filter(item => {
        const expiryDate = new Date(item.expiry);
        return expiryDate > currentDate && expiryDate <= nextWeekDate;
      });


    }
    if (sel2ValueProduct == '1Month') {

      const currentDate = new Date();
      const nextMonthDate = new Date(currentDate);
      nextMonthDate.setMonth(currentDate.getMonth() + 1);

      data = data.filter(item => {
        const expiryDate = new Date(item.expiry);
        return expiryDate >= currentDate && expiryDate < nextMonthDate;
      });

    }
    if (sel2ValueProduct == 'Expired') {

      const currentDate = new Date();

      data = data.filter(item => {
        const expiryDate = new Date(item.expiry);
        return expiryDate < currentDate;
      });

    }

  }

  // filter by low stock

  if (sel3ValueProduct.length > 0) {
    data = data.filter(function (item) {
      return parseInt(item.qty) <= parseInt(sel3ValueProduct);
    }).sort(function (a, b) {
      return parseInt(b.qty) - parseInt(a.qty);
    });
  }


  // filter by category

  if (sel4ValueProduct.length > 0) {

    if (sel4ValueProduct == "uncatgorised") {

      data = data.filter(function (item) {
        return item.status && (item.cat_id == -1 || item.cat_nm == null || item.cat_nm == 'Uncategorised');
      });

    } else if (sel4ValueProduct == "disabled") {

      data = data.filter(function (item) {
        return item.cat_nm && item.status == 0;
      });

    } else {

      data = data.filter(function (item) {
        return item.cat_nm && item.cat_nm.match(sel4ValueProduct);
      });

    }

  }

  $("#res").html("");

  if (data.length > 0) {
    $("#loading_end").html("");
    let i = 1;
    data &&
      data.forEach((data) => {
        $("#res").append(ProductListTemplate(data, i));
        i++;
      });
  } else {
    let htmlStr = `  
      <div class="list-end">
        NO MORE DATA
      </div>
    `;
    document.getElementById("loading_end").style.display = "none";
    $("#res").html(htmlStr);
  }
}

// load category in product filter

async function loadCategoryForProduct() {
  const dataContainer = document.querySelector("#res");

  const formData = new FormData();
  formData.append("type", "40");

  const resp = await fetch(appAPI, { method: "POST", body: formData });
  const data = await resp.json();
  let category = data.category;

  var dropdown = $("#select4Product");
  $.each(category, function () {
    dropdown.append($("<option />").val(this.name).text(this.name));
  });
}

// add slot
$("#add-slot").submit(async function (e) {
  e.preventDefault();
  if ($("#name").val() == "" || $("#type_name").val() == "") {
    alert("Please fill all fields");
  } else {
    const formData = new FormData(this);
    formData.append("type", 62);
    const resp = await fetch(appAPI, { method: "POST", body: formData });
    let data = await resp.json();
    data = data.data;
    if (data.status == 1) {
      $("#msg").html(alertMsg("success", data.msg));
      setTimeout(() => $("#msg").html(""), 2000);
      $("#add-slot")[0].reset();
      loadAllSlot();
    } else {
      $("#msg").html(alertMsg("danger", data.msg));
    }
  }
});

// delivery slot payment change

$("#payment_type").change(function () {
  if (this.value == "FREE") {
    $("#slot_change_payment").css("display", "none");
  } else {
    $("#slot_change_payment").css("display", "block");
  }
});

// add slot type
$("#add-slot-type").submit(async function (e) {
  e.preventDefault();
  if ($("#type_name").val() == "") {
    $("#msg").html(alertMsg("danger", "Fill all data"));
    setTimeout(() => $("#msg").html(""), 2000);
    return null;
  }
  const formData = new FormData(this);
  formData.append("type", 67);
  const resp = await fetch(appAPI, { method: "POST", body: formData });
  let data = await resp.json();
  data = data.data;
  if (data.status == 1) {
    $("#msg").html(alertMsg("success", data.msg));
    setTimeout(() => $("#msg").html(""), 2000);
    location.reload();
  } else {
    $("#msg").html(alertMsg("danger", data.msg));
  }
});

// load all slot
async function loadAllSlot() {
  const formData = new FormData();
  formData.append("type", 63);
  const res = await fetch(appAPI, { method: "POST", body: formData });
  let data = await res.json();
  data = data.data;
  $("#res").html("");
  data.forEach((item) => {
    let btn = "";
    if (item.parent_status == 1) {
      btn = `
        <div>
            <button 
              type="button" 
              class="btn btn-danger" 
              onclick="changeSlotStatus(${item.id},0)">
              <i class="bi bi-eye-slash"></i>
              Disable ${item.name}
            </button>
          <hr>
            <a href="manageSolt.html?id=${item.id}" class="btn btn-primary">
              <i class="bi bi-pencil-square"></i>
              Add more slot inside ${item.name}
            </a>
        </div>
      `;
    } else {
      btn = `
          <hr>
          <button type="button" class="btn btn-success" 
            onclick="changeSlotStatus(${item.id},1)">
              <i class="bi bi-eye"></i>
              Enable ${item.name}
          </button>
      `;
    }
    $("#res").append(`
      <div class="product-card">
        <div class="product-card-top">
          <span> ${item.type_name} (${item.name})  </span>
          <span></span>
        </div>
        <div class="product-card-bottom">
          <div style="display:none;"></div>
          <div>
            <div> Amount : ${item.amount} </div>
            <div> Payment Type : ${item.payment_type} </div>
            <hr>
            <p> ${btn} </p>
          </div>
          <div style="display:none;"></div>
        <div>
      </div>
    `);
  });
}

// change slot status
async function changeSlotStatus(id, status) {
  const formData = new FormData();
  formData.append("type", 64);
  formData.append("id", id);
  formData.append("status", status);
  const req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;
  if (data.status == 1) {
    $("#msg").html(alertMsg("success", data.msg));
    setTimeout(() => $("#msg").html(""), 2000);
    loadAllSlot();
  } else {
    $("#msg").html(alertMsg("danger", data.msg));
  }
}

// update
$("#update-slot").on("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  formData.append("type", 66);
  const req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;
  if (data.status == 1) {
    $("#updateSlotModal").modal("hide");
    $("#msg").html(alertMsg("success", data.msg));
    setTimeout(() => {
      $("#msg").html("");
      location.reload();
    }, 2000);
  } else {
    $("#msg").html(alertMsg("danger", data.msg));
  }
});

// load slot type
async function loadDeliverySlotType(delivery_slot_id) {
  const formData = new FormData();
  formData.append("type", 65);
  formData.append("delivery_slot_id", delivery_slot_id);
  const res = await fetch(appAPI, { method: "POST", body: formData });
  let data = await res.json();
  data = data.data;
  $("#res").html("");
  data.forEach((item) => {
    console.log(item);
    let btn = "";
    if (item.status == 1) {
      btn = `
        <div class="btn-toolbar">
          <div class="btn-group amr">
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#updateSlotModal"
            data-bs-type-id="${item.id}" data-bs-upd_amount="${item.amount}" data-bs-name="${item.type_name}">
              <i class="bi bi-pencil-square"></i>
              Edit
            </button>
          </div>
          <div class="btn-group">
            <button type="button" class="btn btn-danger" onclick="changeSlotTypeStatus(${item.id},0)">
              <i class="bi bi-eye-slash"></i>
              Disable
            </button>
          </div>
        </div>
        <hr>
        <div class="mt-1">
          <div class="btn-group amr">
            <button type="button" class="btn btn-danger" onclick="deleteSlotType(${item.id})">
              <i class="bi bi-trash"></i>
              Delete
            </button>
          </div>
        </div>
      `;
    } else {
      btn = `
        <div class="btn-toolbar">
          <div class="btn-group amr">
            <button type="button" class="btn btn-success" 
            onclick="changeSlotTypeStatus(${item.id},1)">
              <i class="bi bi-eye"></i>
              Enable
            </button>
          </div>
        </div>
      `;
    }
    $("#res").append(`
      <div class="product-card product_card_wrap_item">
        <div class="product-card-top">
          <span> Name : ${item.type_name}  </span>
          <span> </span>
        </div>
        <div class="product-card-bottom">
          <div class="product_card_item">
            <div> Amount : ${item.amount} </div>
            <div> Payment Type : ${item.payment_type} </div>
            <div> Amount Type : ${item.amount_type} </div>
            <hr/>
            <p> ${btn} </p>
          </div>
        </div>
      </div>
    `);
  });
}

// delete slot type
async function deleteSlotType(id) {
  if (confirm("Are you sure?")) {
    const formData = new FormData();
    formData.append("type", 68);
    formData.append("id", id);
    const req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    let data = res.data;
    if (data.status == 1) {
      $("#msg").html(alertMsg("success", data.msg));
      setTimeout(() => $("#msg").html(""), 2000);
      location.reload();
    } else {
      $("#msg").html(alertMsg("danger", data.msg));
    }
  }
}

// change slot type status
async function changeSlotTypeStatus(id, status) {
  const formData = new FormData();
  formData.append("type", 69);
  formData.append("id", id);
  formData.append("status", status);
  const req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;
  if (data.status == 1) {
    $("#msg").html(alertMsg("success", data.msg));
    setTimeout(() => $("#msg").html(""), 2000);
    location.reload();
  } else {
    $("#msg").html(alertMsg("danger", data.msg));
  }
}

// staff management role check function

function roleCheck() {
  let user_type = localStorage.getItem("K_type");

  if (user_type != 2) {
    let roleList = localStorage.getItem("roleList");

    if (user_type == 4) {
      // type 4 define for delivery boy
      roleList = [
        "product_role_section",
        "category_role_section",
        "user_role_section",
        "theme_role_section",
        "addons_role_section",
        "report_role_section",
        "pos_role_section",
        "ordersH_role_section",
      ];
    }

    if (roleList.length > 0) {
      if (user_type != 4) roleList = roleList.split(",");

      roleList.push("myshop_role_section");
      roleList.push("mysettings_role_section");
      roleList.push("orders_role_section");
      roleList.push("staff_role_section");

      roleList.forEach((item) => {
        $(`#${item}`).css({ display: "none" });
      });
    }
  }
}

async function loadCancellationDays() {
  const formData = new FormData();
  formData.append("type", 81);
  const req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;
  $("#day").val(data.days);
}

$("#update_day").on("submit", async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  formData.append("type", 82);
  const req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;
  if (data.status == 1) {
    alert(data.msg);
    loadCancellationDays();
  } else {
    alert(data.msg);
  }
});

async function loadCoupons() {
  const formData = new FormData();
  formData.append("type", "84");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { data } = res;

  data.map((item) => {
    $("#coupon-list").append(`
          <div >
              <div class="card">
                <div class="card-header">
                  Coupon ${item.name}
                </div>
                <div class="card-body">

                  <h5 class="card-title"> ${item.type} , ${item.value} </h5>
                  <p class="card-text"> ${item.description} </p>

                  <button class="btn btn-warning" type="button" data-bs-toggle="modal" data-bs-target="#coupanModal" 
                          data-bs-cid="${item.id}"
                          data-bs-name="${item.name}"
                          data-bs-type="${item.type}"
                          data-bs-value="${item.value}"
                          data-bs-description="${item.description}"
                    >Edit</button>

                  <button class="btn btn-danger" onclick="deleteCoupons(${item.id})">Delete</button>
                </div>
              </div>

          </div>
      `);
  });
}

$("#coupanModal").on("show.bs.modal", function (event) {
  let button = event.relatedTarget;
  const cid = button.getAttribute("data-bs-cid");
  const name = button.getAttribute("data-bs-name");
  const c_type = button.getAttribute("data-bs-type");
  const c_value = button.getAttribute("data-bs-value");
  const description = button.getAttribute("data-bs-description");

  $("[name=cid]").val(cid);
  $("[name=name]").val(name);
  $("[name=c_type]").val(c_type);
  $("[name=c_value]").val(c_value);
  $("[name=description]").val(description);
});

$("#coupan_submit_modal").submit(async function (e) {
  e.preventDefault();

  const formData = new FormData(this);
  formData.append("type", "83");

  if (
    $("[name=name]").val() == "" ||
    $("[name=c_type]").val() == "" ||
    $("[name=c_value]").val() == "" ||
    $("[name=description]").val() == ""
  ) {
    alert("please fill all field");
  } else {
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    let data = res.data;

    if (data.status == 1) {
      alert(data.msg);
      location.reload();
    } else {
      alert(data.msg);
    }
  }
});

async function deleteCoupons(id) {
  if (confirm("Are you sure ?")) {
    const formData = new FormData();
    formData.append("type", "85");
    formData.append("cid", id);
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    let data = res.data;

    if (data.status == 1) {
      alert(data.msg);
      location.reload();
    } else {
      alert(data.msg);
    }
  }
}

// i button
async function getIbutton() {
  let fullPathname = window.location.pathname;
  let parts = fullPathname.split("/");
  let pageName = parts[parts.length - 1];

  const formData = new FormData();
  formData.append("type", "7");
  formData.append("page_name", pageName);
  let req = await fetch(kalamAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { yt_link } = res;

  $("#iBtn").html(`
    <span> 
      <a href="${yt_link}" class="info-help-button" target="_blank">
        <i class="bi bi-info-circle info-pg-btn"></i>
      </a> 
    </span>
  `);
}
getIbutton();

// condition for expiry date selection

function getTodayDate() {
  const today = new Date();
  const year = today.getFullYear();
  let month = today.getMonth() + 1;
  let day = today.getDate();

  if (month < 10) {
    month = "0" + month;
  }
  if (day < 10) {
    day = "0" + day;
  }

  return `${year}-${month}-${day}`;
}

// condition for expiry date selection
function expiryDateBlock() {
  const dateInput = document.getElementById("expiry");
  dateInput.min = getTodayDate();
}

// condition for fake and real price

function realFakePriceValidation() {
  const fpriceInput = document.getElementById("fprice");
  const priceInput = document.getElementById("price");
  const submitButton = document.getElementById("submit");
  const priceError = document.getElementById("price_error");

  priceInput.addEventListener("keyup", function () {
    const fprice = parseFloat(fpriceInput.value);
    const price = parseFloat(priceInput.value);

    if (fprice < price) {
      submitButton.disabled = true;
      priceError.textContent = "Real price cannot be greater than Fake price.";
    } else {
      submitButton.disabled = false;
      priceError.textContent = "";
    }
  });
}

function myShopPageValidation() {
  function validateMobile() {
    const mobileValue = $("#mobile").val().trim();
    const mobileError = $("#mobile-error");

    if (mobileValue.length !== 10) {
      mobileError.text("Mobile number must be 10 digits");
      $("#updateButton").prop("disabled", true);
      return false;
    } else {
      mobileError.text("");
      $("#updateButton").prop("disabled", false);
      return true;
    }
  }

  function validateEmail() {
    const emailValue = $("#email").val().trim();
    const emailError = $("#email-error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      emailError.text("Invalid email format");
      $("#updateButton").prop("disabled", true);
      return false;
    } else {
      emailError.text("");
      $("#updateButton").prop("disabled", false);
      return true;
    }
  }

  $("#mobile").on("input", validateMobile);
  $("#email").on("input", validateEmail);
}

function mobileIsUsername() {
  $("#mobile").on("input", function () {
    $("#username").val($("#mobile").val().trim());

    const mobileValue = $("#mobile").val().trim();
    const mobileError = $("#mobile-error");

    if (mobileValue.length !== 10) {
      mobileError.text("Mobile number must be 10 digits");
      $("#submit").prop("disabled", true);
    } else {
      mobileError.text("");
      $("#submit").prop("disabled", false);
    }
  });

  $("#email").on("input", function () {
    const emailValue = $("#email").val().trim();
    const emailError = $("#email-error");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
      emailError.text("Invalid email format");
      $("#submit").prop("disabled", true);
    } else {
      emailError.text("");
      $("#submit").prop("disabled", false);
    }
  });
}

// load payment detail

async function loadPaymentDetails() {
  const formData = new FormData();
  formData.append("type", "86");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { data } = res;
  if (data[0].tbl_key == "RAZORPAY") {
    $("#skey").val(data[0].tbl_value.split("=")[1].trim());
  }
}

// add or update payment details

$("#updatePayment").submit(async function (e) {
  e.preventDefault();
  const formData = new FormData(this);
  formData.append("type", "87");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { data } = res;
  if (data.status == 1) {
    $("#msg").html(alertMsg("success", data.msg));
    setTimeout(() => $("#msg").html(""), 2000);
  } else {
    $("#msg").html(alertMsg("danger", data.msg));
  }
});

// load extra page

async function otherPage() {
  const formData = new FormData();
  formData.append("type", "88");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;
  data.forEach((item) => {
    $("#pageName").append(
      $("<option>", {
        value: JSON.stringify(item),
        text: item.name,
      })
    );
  });
}

// page change value

$("#pageName").change(function () {
  let data = JSON.parse(this.value);
  console.log(data);
  $("#pid").val(data.id);
  $("#ptype").val(data.type);
  $("#pageTitle").val(data.title);
  $("#pageBody").val(data.body);
});

// update extra page details

$("#updateOtherPages").submit(async function (e) {
  e.preventDefault();

  if ($("#pid").val() == "" || $("#ptype").val() == "") {
    $("#msg").html(alertMsg("danger", "Please select page name."));
    setTimeout(() => $("#msg").html(""), 2000);
  } else {
    const formData = new FormData(this);
    formData.append("type", "89");
    const req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    let { data } = res;
    if (data.status == 1) {
      $("#msg").html(alertMsg("success", data.msg));
      setTimeout(() => $("#msg").html(""), 2000);
    } else {
      $("#msg").html(alertMsg("danger", data.msg));
    }
  }
});

function signupLoad() {
  function signupValidation() {
    var mobile = $("#mobile").val();
    var username = $("#username").val();
    var email = $("#email").val();
    var signupButton = $("#signup-button");

    $("#error_msg").html("");
    signupButton.prop("disabled", false);

    if (mobile !== username) {
      $("#username").val(mobile);
    }

    var mobileRegex = /^[0-9]{10}$/;
    if (!mobileRegex.test(mobile)) {
      $("#error_msg").html("Invalid mobile number");
      signupButton.prop("disabled", true);
      return null;
    }

    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      $("#error_msg").html("Invalid email address");
      signupButton.prop("disabled", true);
    }
  }

  $("#mobile, #email").on("input", signupValidation);

  const errorReset = () => {
    $("#mobile_error").html("");
    $("#name_error").html("");
    $("#signup-button").prop("disabled", false);
  };

  $("#name, #mobile, #email").on("input", errorReset);
}

// forgot password

$("#forgotPasswordFrm").submit(async function (e) {
  e.preventDefault();

  if ($("#username").val() == "") {
    $("#username_error").html("please fill username");
  } else {
    $("#username_error").html("");

    const formData = new FormData(this);
    formData.append("type", "90");
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    let { data } = res;
    console.log(data);
    if (data.status) {
      $("#msg").html(`
        <div class="alert alert-success">
          ${data.msg}
        </div>
        `);
    } else {
      $("#msg").html(`  
        <div class="alert alert-danger">
          ${data.msg}
        </div>
      `);
    }
  }
});

// print invoice

function printInvoice() {
  var element = document.getElementById("invoice-section");

  var opt = {
    margin: 10,
    filename: "invoice.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Generate PDF
  html2pdf()
    .set(opt)
    .from(element)
    .toPdf()
    .get("pdf")
    .then(function (pdf) {
      var blob = pdf.output("blob");
      var reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = function () {
        var base64data = reader.result;
        window.plugins.socialsharing.share("Greet msg", null, base64data, null);
      };
    });
}

// code for theme selector

async function loadAllTheme() {
  const formData = new FormData();
  formData.append("type", "9");
  let req = await fetch(kalamAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { all_theme } = res;

  formData.delete("type");
  formData.append("type", "94");
  let req1 = await fetch(appAPI, { method: "POST", body: formData });
  let { data } = await req1.json();

  all_theme.map((item) => {
    $("#res").append(`
      <div>
        <img src="${imgLink}themepic/${item.image_name}" alt="${item.image_name
      }" 
            class="theme-img" 
            onclick="setTheme('${item.name}')">
            <div class="theme-status"> 
              ${data.theme_name == item.name ? "Activated" : ""} 
            </div>
      </div>
    `);
  });
}

async function setTheme(themeName) {
  if (
    confirm("Would you like to enhance your app's appearance with a new theme?")
  ) {
    const formData = new FormData();
    formData.append("type", "93");
    formData.append("themeName", themeName);
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    let { data } = res;

    if (data.status == 1) {
      alert(data.msg);
      location.reload();
    } else {
      alert(data.msg);
    }
  }
}

// code start for report genration page

///////////////////////////////////////

// function to handel get date
function getDate() {
  let frDate = $("#fr-date").val();
  const dateObject1 = new Date(frDate);

  if (isNaN(dateObject1.getTime())) {
  } else {
    frDate = dateObject1.toISOString().split("T")[0];
  }

  if (frDate != "") {
    let toDate = $("#to-date").val();
    const dateObject2 = new Date(toDate);

    if (isNaN(dateObject2.getTime())) {
    } else {
      toDate = dateObject2.toISOString().split("T")[0];
      loadAllChart(frDate, toDate);
    }
  } else {
    alert("select both date");
  }
}

// function to handel date on button click
function getDateBtn(dateRange) {
  let frDate = "";
  let toDate = "";
  const date = new Date();

  if (dateRange == "toady") {
    frDate =
      date.getFullYear() +
      "-" +
      parseInt(date.getMonth() + 1) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    toDate = frDate;
  } else if (dateRange == "yesterday") {
    frDate =
      date.getFullYear() +
      "-" +
      parseInt(date.getMonth() + 1) +
      "-" +
      ("0" + parseInt(date.getDate() - 1)).slice(-2);
    toDate = frDate;
  } else if (dateRange == "last7day") {
    dateObject1 = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
    frDate = dateObject1.toISOString().split("T")[0];

    toDate =
      date.getFullYear() +
      "-" +
      parseInt(date.getMonth() + 1) +
      "-" +
      ("0" + date.getDate()).slice(-2);
  } else if (dateRange == "thismonth") {
    let x = [];
    dateObject1 = new Date(date.getFullYear(), date.getMonth() + 1, 1);

    x = dateObject1.toISOString().split("T")[0].split("-");
    x[2] = "01";
    frDate = x.join("-");

    toDate = dateObject1.toISOString().split("T")[0];
  } else if (dateRange == "lastmonth") {
    let x = [];
    dateObject1 = new Date(date.getFullYear(), date.getMonth(), 1);

    x = dateObject1.toISOString().split("T")[0].split("-");
    x[2] = "01";
    frDate = x.join("-");

    toDate = dateObject1.toISOString().split("T")[0];
  } else {
  }
  // alert(frDate + " , " + toDate);
  loadAllChart(frDate, toDate);
}

// function to handel chart loading
function loadAllChart(frDate, toDate) {
  frDate += " 00:00:00";
  toDate += " 23:59:59";
  $(".report-body").css("display", "block");
  loadChartUser(frDate, toDate);
  loadChartOrder(frDate, toDate);
  loadChartProduct(frDate, toDate);
  loadChartOrdertype(frDate, toDate);
  loadChartProfit(frDate, toDate);
}

// load chart and table for user
async function loadChartUser(start_date, end_date) {
  const formData = new FormData();
  formData.append("type", "53");
  formData.append("start_date", start_date);
  formData.append("end_date", end_date);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;

  let aggregatedData = data.reduce((result, { date, user_count }) => {
    result[date] = (result[date] || 0) + parseInt(user_count);
    return result;
  }, {});

  aggregatedData = Object.entries(aggregatedData).map(([date, user_count]) => ({
    date,
    user_count,
  }));

  // code for graph

  const xValues = [];
  const yValues = [];

  aggregatedData.forEach((item) => {
    xValues.push(item.date);
    yValues.push(item.user_count);
  });

  const userData = [
    { x: xValues, y: yValues, type: "bar", name: "no of users" },
  ];

  const userLayout = {
    title: "User Graph",
    showlegend: true,
  };

  const config = {
    responsive: true,
    scrollZoom: false,
    staticPlot: true,
    displayModeBar: false,
  };

  Plotly.newPlot("user-graph", userData, userLayout, config);

  // code for print table
  $("#user-table-body").html("");
  aggregatedData.forEach(({ date, user_count }) => {
    $("#user-table-body").append(
      `<tr><td>${date}</td><td>${user_count}</td></tr>`
    );
  });
}

// load chart and table for order
async function loadChartOrder(start_date, end_date) {
  const formData = new FormData();
  formData.append("type", "54");
  formData.append("start_date", start_date);
  formData.append("end_date", end_date);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;

  let aggregatedData = data.reduce((result, { date, order_count }) => {
    result[date] = (result[date] || 0) + parseInt(order_count);
    return result;
  }, {});

  aggregatedData = Object.entries(aggregatedData).map(
    ([date, order_count]) => ({ date, order_count })
  );

  // code for graph

  const xValues = [];
  const yValues = [];

  aggregatedData.forEach((item) => {
    xValues.push(item.date);
    yValues.push(item.order_count);
  });

  const orderData = [
    { x: xValues, y: yValues, type: "bar", name: "no of orders" },
  ];

  const orderLayout = {
    title: "Order Graph",
    showlegend: true,
  };

  const config = {
    responsive: true,
    scrollZoom: false,
    staticPlot: true,
    displayModeBar: false,
  };

  Plotly.newPlot("order-graph", orderData, orderLayout, config);

  // code for print table
  $("#order-table-body").html("");
  aggregatedData.forEach(({ date, order_count }) => {
    $("#order-table-body").append(
      `<tr><td>${date}</td><td>${order_count}</td></tr>`
    );
  });
}

// load chart and table for product
async function loadChartProduct(start_date, end_date) {
  const formData = new FormData();
  formData.append("type", "55");
  formData.append("start_date", start_date);
  formData.append("end_date", end_date);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;

  const aggregatedData = {};

  data.forEach((item) => {
    const key = `${item.var_id}_${item.date}_${item.product_nm}`;

    if (!aggregatedData[key]) {
      aggregatedData[key] = {
        var_id: item.var_id,
        qty: 0,
        price: item.price,
        date: item.date,
        product_nm: item.product_nm,
      };
    }

    aggregatedData[key].qty += parseInt(item.qty);
  });

  const newData = Object.values(aggregatedData);

  // code for graph

  const traces = {};

  newData.forEach((item) => {
    const key = `${item.product_nm} + ${item.var_id}`;

    if (!traces[key]) {
      traces[key] = {
        x: [],
        y: [],
        mode: "markers+lines",
        name: `${item.product_nm}`,
        type: "scatter",
      };
    }

    traces[key].x.push(item.date);
    traces[key].y.push(item.qty);
  });

  const productData = Object.values(traces);

  const productLayout = {
    showlegend: true,
    legend: { x: 0, y: 6 },
  };

  const config = {
    responsive: true,
    scrollZoom: false,
    staticPlot: true,
    displayModeBar: false,
  };

  Plotly.newPlot("product-graph", productData, productLayout, config);

  // code for print table
  $("#product-table-body").html("");
  newData.forEach(({ date, product_nm, price, qty }) => {
    $("#product-table-body").append(
      `<tr>
            <td>${date}</td><td>${product_nm} <br> &#8377; ${price}</td><td> ${qty} </td>
          </tr>`
    );
  });
}

// load chart and table for order type
async function loadChartOrdertype(start_date, end_date) {
  const formData = new FormData();
  formData.append("type", "56");
  formData.append("start_date", start_date);
  formData.append("end_date", end_date);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;

  const xValues = ["POS", "APP", "WEB"];
  const yValues = [data.pos_count, data.app_count, data.web_count];

  const orderTypeData = [
    { x: xValues, y: yValues, type: "bar", name: "Volume" },
  ];

  const orderTypeLayout = {
    showlegend: true,
  };

  const config = {
    responsive: true,
    scrollZoom: false,
    staticPlot: true,
    displayModeBar: false,
  };

  Plotly.newPlot("order-type-graph", orderTypeData, orderTypeLayout, config);

  // code for print table
  $("#pos_count").html(data.pos_count);
  $("#web_count").html(data.web_count);
  $("#app_count").html(data.app_count);
}

// load chart and table for profit
async function loadChartProfit(start_date, end_date) {
  const formData = new FormData();
  formData.append("type", "52");
  formData.append("start_date", start_date);
  formData.append("end_date", end_date);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { data } = res;

  data = data.filter((item) => item.status == "ORDERED");

  const countByTxnDate = data.reduce((acc, item) => {
    acc[item.txn_date] = (acc[item.txn_date] || 0) + 1;
    return acc;
  }, {});

  let no_of_sale = Object.entries(countByTxnDate).map(
    ([txn_date, no_of_sale]) => ({
      no_of_sale,
      txn_date,
    })
  );

  let total_txn_profit = data.reduce((acc, item) => {
    const { txn_date, selling_price, buying_price, quantity } = item;
    const totalTxn = parseFloat(selling_price) * parseFloat(quantity);
    const totalProfit =
      (parseFloat(selling_price) - parseFloat(buying_price)) *
      parseFloat(quantity);

    if (!acc[txn_date]) {
      acc[txn_date] = {
        txn_date,
        total_txn: totalTxn.toFixed(2),
        total_profit: totalProfit.toFixed(2),
      };
    } else {
      acc[txn_date].total_txn = (
        parseFloat(acc[txn_date].total_txn) + totalTxn
      ).toFixed(2);
      acc[txn_date].total_profit = (
        parseFloat(acc[txn_date].total_profit) + totalProfit
      ).toFixed(2);
    }

    return acc;
  }, {});

  total_txn_profit = Object.values(total_txn_profit);

  const mergedData = [];

  no_of_sale.forEach((saleItem) => {
    const correspondingProfitItem = total_txn_profit.find(
      (profitItem) => profitItem.txn_date === saleItem.txn_date
    );
    if (correspondingProfitItem) {
      mergedData.push({
        ...saleItem,
        ...correspondingProfitItem,
      });
    }
  });

  // code for graph

  const xValues = [];
  const yValues = [];

  mergedData.forEach((item) => {
    xValues.push(item.txn_date);
    yValues.push(item.total_profit);
  });

  const profitData = [
    { x: xValues, y: yValues, type: "bar", name: "no of orders" },
  ];

  const profitLayout = {
    title: "Order Graph",
    showlegend: true,
  };

  const config = {
    responsive: true,
    scrollZoom: false,
    staticPlot: true,
    displayModeBar: false,
  };

  Plotly.newPlot("profit-graph", profitData, profitLayout, config);

  // code for print table

  const { total_txn, total_profit } = mergedData.reduce(
    (acc, item) => {
      acc.total_txn += parseFloat(item.total_txn);
      acc.total_profit += parseFloat(item.total_profit);
      return acc;
    },
    { total_txn: 0, total_profit: 0 }
  );

  $("#t_transaction").html(`${total_txn.toFixed(2)}`);
  $("#t_profit").html(`${total_profit.toFixed(2)}`);

  $("#profit-table-body").html("");
  mergedData.forEach(({ txn_date, no_of_sale, total_txn, total_profit }) => {
    $("#profit-table-body").append(
      `<tr><td>${txn_date}</td><td>${no_of_sale}</td><td>${total_txn}</td><td>${total_profit}</td></tr>`
    );
  });
}

//////////////////////////////////////

// code end for report genration page



////////////////////////////////


// code for cancel order by admin 30/05/2024

async function cancelOrder(odrID, userID) {
  if (confirm("Are you sure?")) {

    const formData = new FormData();
    formData.append("type", "61");
    formData.append("order_id", odrID);
    formData.append("user_id", userID);
    formData.append("cancelby", 'admin');
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    console.log(res);
    alert(res.data.msg);

  } else {

  }
}

//code for load min order val  30/05/2024
async function loadmin_Val(){

  const formData = new FormData();
  formData.append("type", "125");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  console.log(res.tbl_value);
  $("#minval").val(res.tbl_value);
}

//code for load min order val set 30/05/2024
$("#setminval").on('submit', async function(e){
  e.preventDefault();
  const formData = new FormData(this);
  formData.append("type","126");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  console.log(res);
})

//code for load min order val set 30/05/2024
$("#invoice_form").on('submit', async function(e){
  e.preventDefault();
  const formData = new FormData(this);
  formData.append("type","127");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  console.log(res);
})

//code for load gst number val set 30/05/2024
async function loadgst_Val(){
  const formData = new FormData();
  formData.append("type","128");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  console.log(res);
  $("#gstval").val(res.tbl_value);
  data = res.tbl_key;
  if (data == 1) {
    $("#gstbutton").val('0').html('Hide');
    $("#gstbutton").removeClass('btn-success');
    $("#gstbutton").addClass('btn-danger');
} else {
    $("#gstbutton").val('1').html('Show');
}
}

async function gstState(){
  btnval = $("#gstbutton").val(); console.log(btnval);
  const formData = new FormData();
  formData.append("type", "130");
  formData.append("btnval", btnval);

  req = await fetch(appAPI, { method: "POST", body: formData });
  res = await req.json();
console.log(res);
data = res.data;
alert(data.msg);
  location. reload()

}


async function setlogo(){
  btnval = $("#logoshow").val(); console.log(btnval);
  const formData = new FormData();
  formData.append("type", "132");
  formData.append("btnval", btnval);

  req = await fetch(appAPI, { method: "POST", body: formData });
  res = await req.json();
  console.log(res);
  data = res.data;
  alert(data.msg);
  location. reload()

}


async function loadlogo_Val(){
  const formData = new FormData();
  formData.append("type","133");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  console.log(res);
  $("#logoshow").val(res.tbl_value);
  data = res.tbl_value;
  if (data == 1) {
    $("#logoshow").val('0').html('Hide');
    $("#logoshow").removeClass('btn-success');
    $("#logoshow").addClass('btn-danger');
} else {
    $("#logoshow").val('1').html('Show');
}
}


async function printShopName() {

  let myShopName = '';
  if ( localStorage.getItem("my_shop_name") === null ) {
    const formData = new FormData();
    formData.append("type", "124");
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let data = await req.json();
    let {name} = data.data[0];
    localStorage.setItem("my_shop_name" , name ) ;
    myShopName = name ;
  } else {
    myShopName = localStorage.getItem("my_shop_name") ;
  }
  $("#my_shop_name").html(myShopName);
  
}