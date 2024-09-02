var db = new Dexie("MyAshDB");

db.version(1).stores({
  products:
    "id,product_id,product_nm,cat_id,cat_nm,product_cm,description,fprice,imgs,price,qty,sgst,cgst,sku,type_name_1,type_name_2,type_qty_1,type_qty_2",
  categories: "id,name,images,parent_id,parent_name",
  banner: "id,img,type",
  cart: "id,var_id,product_id,product_nm,cat_id,cat_nm,imgs,price,sku,purchase_qty,fprice",
  wishlist: "id,var_id,product_id,product_nm,cat_id,cat_nm,imgs,price,sku",
  tablecheck: "id,name,value",
  userdetails: "id,user_id,name,wallet,address,login_status,user_type",
  addons: "id,name,activation_status",
});

const owlCarouselSetting = (
  items,
  stage_padding = 1,
  loop_status = true,
  center_status = true
) => {
  return {
    items: items,
    dots: false,
    autoplay: true,
    autoPlaySpeed: 1000,
    autoPlayTimeout: 500,
    autoplayHoverPause: true,
    margin: 15,
    loop: loop_status,
    center: center_status,
    stagePadding: stage_padding,
  };
};


// const customCat = async () => {

//   iflocalStorage.getItem("customCat") == null ?
//   const formData = new FormData();
//   formData.append("type", "97");

//   req = await fetch(appAPI, { method: "POST", body: formData });
//   res = await req.json();
//   data = res[0].tbl_value;
//   localStorage.setItem("customCat", data); : return null;
// };

const customCat = async () => {
  if (localStorage.getItem("customCat") === null) {
    const formData = new FormData();
    formData.append("type", "97");

    const req = await fetch(appAPI, { method: "POST", body: formData });
    const res = await req.json();
    const data = res[0].tbl_value;
    localStorage.setItem("customCat", data);
  } else {
    return null;
  }
};


const buynowState = async () => {

  if (localStorage.getItem("buynowState") === null) {
    const formData = new FormData();
    formData.append("type", "104");

    req = await fetch(appAPI, { method: "POST", body: formData });
    res = await req.json();
    data = res[0].tbl_value;
    localStorage.setItem("buynowState", data);
  } else {
    return null;
  }
};

(async function () {
  await customCat();
  await buynowState();
})()

// new function for page redirect 





function progressVal(end) {
  let start = 0;
  for (let i = start; i <= end; i++) {
    setTimeout(() => {
      $("#nm").html(i);
      $("#prostate")
        .attr("aria-valuenow", i)
        .css("width", i + "%");
    }, (i - start) * 20);
  }
  start = end;
}
// table sync function

async function TableSync() {
  const formData = new FormData();
  formData.append("type", "77");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { syncData } = res;

  let tableCheck = await db.tablecheck.toArray();

  let mismatchedData = [];

  if (tableCheck.length == 0) {

    for (const item of syncData) {
      // syncData.forEach(async (item) => {
      await db.tablecheck.put({
        id: item.id,
        name: item.table_name,
        value: item.table_value,
      });
      // });
    }
    await loadBannerTableSync();
    await loadCategoryTableSync();
    await loadProductTableSync();
    await loadAddonStatus();
    await loadThemeTableSync();
  } else {
    if (syncData.length !== tableCheck.length) {
      await db.tablecheck.clear();
      for (const item of data) {
        // syncData.forEach(async (item) => {
        await db.tablecheck.put({
          id: item.id,
          name: item.table_name,
          value: item.table_value,
        });
        // });
      }
      await loadBannerTableSync();
      await loadCategoryTableSync();
      await loadProductTableSync();
      await loadAddonStatus();
      await loadThemeTableSync();
    } else {
      for (let i = 0; i < syncData.length; i++) {
        const obj1 = syncData[i];
        const obj2 = tableCheck.find((obj) => obj.name === obj1.table_name);
        if (obj2) {
          if (obj1.table_value !== obj2.value) {
            mismatchedData.push(obj1.table_name);
            await db.tablecheck.update(obj2.id, { value: obj1.table_value });
          } else {

            // return null;
          }
        } else {
          alert("db else");
          await db.tablecheck.clear();
          for (const item of syncData) {
            // syncData.forEach(async (item) => {  
            await db.tablecheck.put({
              id: item.id,
              name: item.table_name,
              value: item.table_value,
            });
            // });
          }
          await loadBannerTableSync();
          await loadCategoryTableSync();
          await loadProductTableSync();
          await loadAddonStatus();
          await loadThemeTableSync();
        }

      };

    }
  }

  if (mismatchedData.length != 0) {
    if (mismatchedData.includes("products")) {
      await loadProductTableSync();
    }
    if (mismatchedData.includes("categories")) {
      await loadCategoryTableSync();
    }
    if (mismatchedData.includes("banner")) {
      await loadBannerTableSync();
    }
    if (mismatchedData.includes("addons")) {
      await loadAddonStatus();
    }
    if (mismatchedData.includes("theme")) {
      await loadThemeTableSync();
    }
  }

  await loadCartFromserver();
  await loadWishListFromserver();


}

// TableSync();

// load data for table sync

// load banner

async function loadBannerTableSync() {
  await db.banner.clear();

  const formData = new FormData();

  formData.append("type", "31");

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let res = await req.json();

  let data = res;

  if (data.status != 1) {
    data = [];
  } else {
    data = data.data;

    for (const item of data) {
      // data.forEach(async (item) => {
      await db.banner.put({
        id: item.id,
        img: item.image_name,
        type: item.banner_type,
      });
      // });
    }
  }
  progressVal(25);
}

// load category

async function loadCategoryTableSync() {
  await db.categories.clear();

  const formData = new FormData();
  formData.append("type", "78");

  req = await fetch(appAPI, { method: "POST", body: formData });
  res = await req.json();
  data = res.category;

  if (data.length == 0) {
    data = [];
  } else {
    for (const item of data) {
      // data.forEach(async (item) => {
      if (item.status == 1)
        await db.categories.put({
          id: item.id,
          name: item.name,
          images: item.images,
          parent_id: item.parent_id,
          parent_name: item.parent_name,
        });
      // });
    }
  }
  progressVal(50);
}

// load product

// async function loadProductTableSync() {

//     await db.products.clear();

//     const formData = new FormData();

//     formData.append("type", "39");

//     req = await fetch(appAPI, { method: "POST", body: formData });

//     res = await req.json();

//     data = res.products;

//     if (data.length == 0) {
//         data = [];
//     } else {

//         data.forEach(async (item) => {
//             if (item.trash == 1 && item.status == 1)
//                 await db.products.put({
//                     id: item.id,
//                     product_id: item.product_id,
//                     product_nm: item.product_nm,
//                     cat_id: item.cat_id,
//                     cat_nm: item.cat_nm,
//                     product_cm: item.product_cm,
//                     description: item.description,
//                     fprice: item.fprice,
//                     imgs: item.imgs,
//                     price: item.price,
//                     qty: item.qty,
//                     sgst: item.sgst,
//                     cgst: item.cgst,
//                     sku: item.sku,
//                     type_name_1: item.type_name_1,
//                     type_name_2: item.type_name_2,
//                     type_qty_1: item.type_qty_1,
//                     type_qty_2: item.type_qty_2
//                 });
//         });

//     }

// }

async function loadProductTableSync() {
  await db.products.clear();

  const formData = new FormData();
  formData.append("type", "39");

  const req = await fetch(appAPI, { method: "POST", body: formData });
  const res = await req.json();
  const data = res.products;

  if (data.length > 0) {
    for (const item of data) {
      if (item.trash == 1 && item.status == 1) {
        await db.products.put({
          id: item.id,
          product_id: item.product_id,
          product_nm: item.product_nm,
          cat_id: item.cat_id,
          cat_nm: item.cat_nm,
          product_cm: item.product_cm,
          description: item.description,
          fprice: item.fprice,
          imgs: item.imgs,
          price: item.price,
          qty: item.qty,
          sgst: item.sgst,
          cgst: item.cgst,
          sku: item.sku,
          type_name_1: item.type_name_1,
          type_name_2: item.type_name_2,
          type_qty_1: item.type_qty_1,
          type_qty_2: item.type_qty_2,
        });
      }
    }
  }

  progressVal(75);
}

// load addon status

async function loadAddonStatus() {
  const formData = new FormData();
  formData.append("type", "72");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { data } = res;
  for (const item of data) {
    // data.map(async (item) => {
    let { id, name, activation_status } = item;
    let data = {
      id: id,
      name: name,
      activation_status: activation_status,
    };
    await db.addons.put(data);
    // });
  }
  progressVal(85);
}

// load themes

async function loadThemeTableSync() {
  const formData = new FormData();
  formData.append("type", "94");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { data } = res;
  localStorage.setItem("theme", data.theme_name);
  progressVal(100);
}

//load cart

async function loadcartTableSync() {
  await db.banner.clear();

  const formData = new FormData();

  formData.append("type", "31");

  let req = await fetch(appAPI, { method: "POST", body: formData });

  let res = await req.json();

  let data = res;

  if (data.status != 1) {
    data = [];
  } else {
    data = data.data;

    for (const item of data) {
      // data.forEach(async (item) => {
      await db.banner.put({
        id: item.id,
        img: item.image_name,
        type: item.banner_type,
      });
      // });
    }
  }
}

// all template functions

function noDataTemplate() {
  return `
        <div class="empty_state">
            <i class="bi bi-emoji-frown"></i>
            <h3>Nothing in box </h3>
        </div>
    `;
}

// function categoryTemplate(item) {
//     return `
//         <div class="catg-div" onclick="gotoProductListUseCategory(${item.id})" >
//             <div>
//                 <img class="catg-img" src="${imgLink + item.images}" />
//             </div>
//             <span class="catg-name"> ${item.name} </span>
//         </div>
//     `
// }

// function productCardTemplate(item, db_pr_qty) {

//     let heart_s = item.wishlist_status == 1 ? '<i class="bi bi-heart-fill wishlist-heart-color"></i>' : '<i class="bi bi-heart"></i>' ;

//     let oos = '';
//     if (item.qty == 0) oos = `<span class="oos_class"> Out of stock </span>` ;

//     return `
//         <div class="product-card-wn">
//             <div class="prod-details-wn"
//                 onclick="gotoProduct(${item.id})">
//                 <div class="product-img-div-wn">
//                     <img
//                         src="${imgLink + item.imgs[0]}"
//                         alt="product-img"
//                         class="product-img-wn" >
//                 </div>
//             </div>
//             <div class="prod-details-footer-wn">
//                 <p class="product-name-wn">${item.product_nm}</p>
//                 ${oos}
//                 <div class="prod-other">
//                     <span>
//                         &#8377; ${item.price}
//                     </span>
//                     <span>
//                         ${item.type_qty_1}
//                     </span>

//                 </div>
//                 <div class="product-footer-top-wn">
//                     <button class="add-to-whishlist-wn" onclick='addToWhishlist(${JSON.stringify(item)} , this )'>
//                         ${heart_s}
//                     </button>
//                     <button onclick="getVariant(${item.product_id} , ${item.id})" data-bs-toggle="modal" data-bs-target="#variantModal">
//                         <i class="bi bi-three-dots"></i>
//                     </button>
//                 </div>
//                 <div class="product-footer-wn">
//                     <div class="product-footer-bot-wn">
//                         <button class="add-to-cart" onclick='addToCart(${JSON.stringify(item)})'>
//                             <i class="bi bi-bag-plus-fill"></i>
//                         </button>
//                         <div class="qty-wn">
//                             <span
//                                 class="minus-wn span-ash-wn"
//                                 onclick='decreaseQty(${JSON.stringify(item)})'>
//                                 -
//                             </span>
//                             <input type="number" class="count-wn" name="pr_qty${item.id}" id="pr_qty${item.id}" value="${db_pr_qty}" readonly>
//                             <span
//                                 class="plus-wn span-ash-wn"
//                                 onclick='increaseQty(${JSON.stringify(item)})'>
//                                 +
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// hide/unhide wishlist

// function productCardTemplate(item, db_pr_qty) {

//     // wishlist = localStorage.getItem('customwishlistcheck');
//     // console.log(wishlist);

//     let heart_s = item.wishlist_status == 1 ? '<i class="bi bi-heart-fill wishlist-heart-color"></i>' : '<i class="bi bi-heart"></i>' ;

//     let wishlist = localStorage.getItem('customwishlistcheck') == 'Hide' ? `
//    style = "display: none;"
//   ` : '';

//   let  buynowState= localStorage.getItem('buynowState') == 'On' ? `
//   style = "display: none;"
//  ` : '';
//  let  buynowState2= localStorage.getItem('buynowState') == 'Off' ? `
//   style = "display: none;"
//  ` : '';

//     let oos = '';
//     if (item.qty == 0) oos = `<span class="oos_class"> Out of stock </span>` ;

//     return `
//         <div class="product-card-wn">
//             <div class="prod-details-wn"
//                 onclick="gotoProduct(${item.id})">
//                 <div class="product-img-div-wn">
//                     <img
//                         src="${imgLink + item.imgs[0]}"
//                         alt="product-img"
//                         class="product-img-wn" >
//                 </div>
//             </div>
//             <div class="prod-details-footer-wn">
//                 <p class="product-name-wn">${item.product_nm}</p>
//                 ${oos}
//                 <div class="prod-other">
//                     <span>
//                         &#8377; ${item.price}
//                     </span>
//                     <span>
//                         ${item.type_qty_1}
//                     </span>

//                 </div>
//                 <div class="product-footer-top-wn">
//                     <button ${wishlist} class="add-to-whishlist-wn" onclick='addToWhishlist(${JSON.stringify(item)} , this )'>
//                         ${heart_s}
//                     </button>

//                     <button onclick="getVariant(${item.product_id} , ${item.id})" data-bs-toggle="modal" data-bs-target="#variantModal">
//                         <i class="bi bi-three-dots"></i>
//                     </button>
//                 </div>
//                 <div class="product-footer-wn">
//                     <div class="product-footer-bot-wn">
//                         <button  ${buynowState} class="add-to-cart" onclick='addToCart(${JSON.stringify(item)})'>
//                             <i class="bi bi-bag-plus-fill"></i>
//                         </button>
//                         <button ${buynowState2} class="add-to-cart buyBtn" onclick='buyNowbtn(${JSON.stringify(item)})'>
//                             <span>Buy Now<span>
//                         </button>
//                         <div class="qty-wn">
//                             <span
//                                 class="minus-wn span-ash-wn"
//                                 onclick='decreaseQty(${JSON.stringify(item)})'>
//                                 -
//                             </span>
//                             <input type="number" class="count-wn" name="pr_qty${item.id}" id="pr_qty${item.id}" value="${db_pr_qty}" readonly>
//                             <span
//                                 class="plus-wn span-ash-wn"
//                                 onclick='increaseQty(${JSON.stringify(item)})'>
//                                 +
//                             </span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// hide/unhide wishlist

// function productTemplateWithNew(item, db_pr_qty) {
//     return `
//         <div class="product-card">
//             <div class="corner">
//                 <h2 class="corner-text">New</h2>
//             </div>
//             <div class="prod-details" onclick="gotoProduct(${item.id})">
//                 <div class="product-img-div">
//                     <img
//                         src="${imgLink + item.imgs[0]}"
//                         alt="product-img"
//                         class="product-img" >
//                 </div>
//                 <p class="product-name">${item.product_nm}</p>
//                 <span class="prod-other">
//                     ${item.price} Rs.
//                 </span>
//             </div>
//             <div class="prod-details-footer">
//                 <div class="product-footer-top">
//                     <button class="add-to-whishlist-wn" onclick='addToWhishlist(${JSON.stringify(item)})'> <i class="bi bi-heart-fill"></i> </button>
//                     <button onclick="getVariant(${item.product_id} , ${item.id})" data-bs-toggle="modal" data-bs-target="#variantModal"> <i class="bi bi-three-dots"></i> </button>
//                 </div>
//                 <div class="product-footer">
//                     <div class="product-footer-bot">
//                         <button class="add-to-cart" onclick='addToCart(${JSON.stringify(item)})'>
//                             <i class="bi bi-bag-plus-fill"></i>
//                         </button>
//                         <div class="qty-wn">
//                             <span
//                                 class="minus-wn span-ash-wn"
//                                 onclick='decreaseQty(${JSON.stringify(item)})'>-</span>
//                             <input type="number" class="count-wn" name="pr_qty${item.id}" id="pr_qty${item.id}" value="${db_pr_qty}" readonly>
//                             <span
//                                 class="plus-wn span-ash-wn"
//                                 onclick='increaseQty(${JSON.stringify(item)})'>+</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `
// }

//////------------ update start-new---------------- //////

// function productTemplateWithNew(item, db_pr_qty) {

//     let oos = '';
//     if (item.qty == 0) {
//         oos = `
//             <span class="oos_class"> out of stock </span>
//         ` ;
//     }

//     return `
//         <div class="product-card">
//             <div class="corner">

//             </div>
//             <div class="prod-details" onclick="gotoProduct(${item.id})">
//                 <div class="product-img-div">
//                     <img
//                         src="${imgLink + item.imgs[0]}"
//                         alt="product-img"
//                         class="product-img" >
//                 </div>

//             </div>
//             <div class="prod-details-footer">
//             <div class="product-footer-top">
//             <button class="add-to-whishlist-wn" onclick='addToWhishlist(${JSON.stringify(item)})'> <i class="bi bi-heart-fill"></i> </button>
//             <button onclick="getVariant(${item.product_id} , ${item.id})" data-bs-toggle="modal" data-bs-target="#variantModal"> <i class="bi bi-three-dots"></i> </button>
//         </div>
//             <p class="product-name">${item.product_nm}</p>
//             ${oos}
//             <div class="prod-other">
//                 <span>
//                     &#8377; ${item.price}
//                 </span>
//                 <span>
//                     ${item.type_qty_1}
//                 </span>

//             </div>

//                 <div class="product-footer">
//                     <div class="product-footer-bot">
//                         <button class="add-to-cart" onclick='addToCart(${JSON.stringify(item)})'>
//                             <i class="bi bi-bag-plus-fill"></i>
//                         </button>
//                         <div class="qty-wn">
//                             <span
//                                 class="minus-wn span-ash-wn"
//                                 onclick='decreaseQty(${JSON.stringify(item)})'>-</span>
//                             <input type="number" class="count-wn" name="pr_qty${item.id}" id="pr_qty${item.id}" value="${db_pr_qty}" readonly>
//                             <span
//                                 class="plus-wn span-ash-wn"
//                                 onclick='increaseQty(${JSON.stringify(item)})'>+</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//         </div>
//     `;
// }

//////------------ update end---------------- //////

// function productTemplateWithoutNew(item, db_pr_qty) {

//     return `
//         <div class="product-card-wn">
//             <div class="prod-details-wn" onclick="gotoProduct(${item.id})">
//                 <div class="product-img-div-wn">
//                     <img
//                         src="${imgLink + item.imgs[0]}"
//                         alt="product-img"
//                         class="product-img-wn" >
//                 </div>
//                 <p class="product-name-wn">${item.product_nm}</p>
//                 <span class="prod-other-wn">
//                     ${item.price} Rs.
//                 </span>
//             </div>
//             <div class="prod-details-footer-wn">
//                 <div class="product-footer-top-wn">
//                     <button class="add-to-whishlist-wn" onclick='addToWhishlist(${JSON.stringify(item)})'> <i class="bi bi-heart"></i> </button>
//                     <button onclick="getVariant(${item.product_id} , ${item.id})" data-bs-toggle="modal" data-bs-target="#variantModal"> <i class="bi bi-three-dots"></i> </button>
//                 </div>
//                 <div class="product-footer-wn">
//                     <div class="product-footer-bot-wn">
//                         <button class="add-to-cart" onclick='addToCart(${JSON.stringify(item)})'>
//                             <i class="bi bi-bag-plus-fill"></i>
//                         </button>
//                         <div class="qty-wn">
//                             <span
//                                 class="minus-wn span-ash-wn"
//                                 onclick='decreaseQty(${JSON.stringify(item)})'>-</span>
//                             <input type="number" class="count-wn" name="pr_qty${item.id}" id="pr_qty${item.id}" value="${db_pr_qty}" readonly>
//                             <span
//                                 class="plus-wn span-ash-wn"
//                                 onclick='increaseQty(${JSON.stringify(item)})'>+</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `
// }

//////------------ update start---------------- //////

// function productTemplateWithoutNew(item, db_pr_qty) {

//     let oos = '';
//     if (item.qty == 0) {
//         oos = `
//             <span class="oos_class"> out of stock </span>
//         ` ;
//     }

//     return `
//         <div class="product-card-wn">
//             <div class="prod-details-wn" onclick="gotoProduct(${item.id})">
//                 <div class="product-img-div-wn">
//                     <img
//                         src="${imgLink + item.imgs[0]}"
//                         alt="product-img"
//                         class="product-img-wn" >
//                 </div>

//             </div>
//             <div class="prod-details-footer-wn">
//             <p class="product-name-wn">${item.product_nm}</p>
//             ${oos}
//             <div class="prod-other">
//                 <span>
//                     &#8377; ${item.price}
//                 </span>
//                 <span>
//                     ${item.type_qty_1}
//                 </span>

//             </div>
//                 <div class="product-footer-top-wn">
//                     <button class="add-to-whishlist-wn" onclick='addToWhishlist(${JSON.stringify(item)})'> <i class="bi bi-heart"></i> </button>
//                     <button onclick="getVariant(${item.product_id} , ${item.id})" data-bs-toggle="modal" data-bs-target="#variantModal"> <i class="bi bi-three-dots"></i> </button>
//                 </div>
//                 <div class="product-footer-wn">
//                     <div class="product-footer-bot-wn">
//                         <button class="add-to-cart" onclick='addToCart(${JSON.stringify(item)})'>
//                             <i class="bi bi-bag-plus-fill"></i>
//                         </button>
//                         <div class="qty-wn">
//                             <span
//                                 class="minus-wn span-ash-wn"
//                                 onclick='decreaseQty(${JSON.stringify(item)})'>-</span>
//                             <input type="number" class="count-wn" name="pr_qty${item.id}" id="pr_qty${item.id}" value="${db_pr_qty}" readonly>
//                             <span
//                                 class="plus-wn span-ash-wn"
//                                 onclick='increaseQty(${JSON.stringify(item)})'>+</span>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `
// }

//////------------ update end---------------- //////

// function productTemplateWithoutBtn(item) {

//     return `
//         <div class="product-card-no-btn">
//             <div class="prod-details-no-btn" onclick="gotoProduct(${item.id})">
//                 <div class="product-img-div-no-btn">
//                     <img
//                         src="${imgLink + item.imgs[0]}"
//                         alt="product-img"
//                         class="product-img-no-btn" >
//                 </div>
//                 <p class="product-name-no-btn">${item.product_nm}</p>
//                 <span class="prod-other-no-btn">
//                     ${item.price} Rs.
//                 </span>
//             </div>
//         </div>
//     `
// }

//////------------ update start---------------- //////
// function productTemplateWithoutBtn(item) {

//     return `
//         <div class="product-card-no-btn">
//             <div class="prod-details-no-btn" onclick="gotoProduct(${item.id})">
//                 <div class="product-img-div-no-btn">
//                     <img
//                         src="${imgLink + item.imgs[0]}"
//                         alt="product-img"
//                         class="product-img-no-btn" >
//                 </div>
//                 <div class="full">
//                 <p class="product-name-no-btn">${item.product_nm}</p>
//                 <span class="prod-other-no-btn">
//                     ${item.price} Rs.
//                 </span>
//                 </div>
//             </div>
//         </div>
//     `;
// }
//////------------ update end---------------- //////

// async function singleProdTempl(data) {

//     let db_pr_qty = await db.cart.get(data.id);
//     db_pr_qty = db_pr_qty == undefined ? 0 : db_pr_qty.purchase_qty;

//     // product carousle start
//     //var owl = $('.owl-carousel');
//     var owl = $('#mainProdisplay');
//     owl.owlCarousel(owlCarouselSetting(1));

//     let images = data.imgs.map(image => imgLink + image);

//     images.forEach(image => {
//         owl
//             .trigger('add.owl.carousel', [`<div class="item img-item-div"><img src="${image}"></div>`])
//             .trigger('refresh.owl.carousel');
//     });

//     if (images.length > 1) {
//         var thumbContainer = $('.owl-carousel-thumb');
//         images.forEach(image => { thumbContainer.append(`<img src="${image}">`); });

//         thumbContainer.on('click', 'img', function () {
//             let index = $(this).index();
//             owl.trigger('to.owl.carousel', index);
//         });
//     } else {
//         $("#owl-thumb").hide();
//     }
//     // product carousle end

//     $("#category_name").html(`
//         ${data.cat_nm}
//     `);

//     $("#product-desc").html(`
//         ${data.description}
//     `);

//     $("#prod-name").html(data.product_nm);
//     $("#price").html('&#8377; ' + data.price);
//     $("#fprice").html('&#8377; ' + data.fprice);

//     if (data.type_qty_1 != "") {
//         $("#type_1_val").html(data.type_qty_1);
//     }

//     $("#off-percent").html(`
//         ${((data.fprice - data.price) / data.fprice * 100).toFixed(2)} %
//     `);

//     $("#incDecBtn").html(`
//         <div class="qty">
//             <span
//                 class="minus bg-dark span-ash"
//                 onclick='decreaseQty(${JSON.stringify(data)})'>-</span>
//             <input type="number" class="count" name="pr_qty${data.id}" id="pr_qty${data.id}" value="${db_pr_qty}" readonly>
//             <span
//                 class="plus bg-dark span-ash"
//                 onclick='increaseQty(${JSON.stringify(data)})'>+</span>
//         </div>
//     `);

//     $("#addtocart").html(`
//         <div>
//             <a href="cart.html" class="add-to-cart-btn-button"><i class="bi bi-arrow-right-circle cart-btn-bottm"></i></a>
//         </div>
//     `);

//     let wishlistData = await db.wishlist.toArray();
//     let heart_s = wishlistData.some ( item => item.id == data.id );
//     heart_s = heart_s ? '<i class="bi bi-heart-fill wishlist-heart-color"></i>' : '<i class="bi bi-heart"></i>' ;

//     $("#addtoFav").html(`<button class="prod-heart-btn" id="addToFav"> ${heart_s} </button>`);

//     $("#addToCart").click(() => {
//         addToCart(data);
//     });

//     $("#addToFav").click((e) => {
//         addToWhishlist(data , e.target );
//     });

//     // load more variant section

//     let varidata = await db.products.where("product_id").equals('' + data.product_id).toArray();
//     varidata = varidata.filter(item => item.id != data.id);

//     let prodContainer = $("#moreVariantSingleProduct");
//     prodContainer.html('');

//     if (varidata.length == 0) {
//         $(".more-variant-div-sp").html('');
//     } else {
//         varidata.forEach(item => {
//             (item => {
//                 let button = $("<button>")
//                     .addClass("prodbuttonContainer-sp")
//                     .append($("<div>").addClass("prod-left-div-sp")
//                         .append($("<img>").attr("src", imgLink + item.imgs[0]).attr("alt", "Image")))
//                     .append($("<div>").addClass("prod-right-div-sp")
//                         .append($("<span>").addClass("prodNameText-sp").text(`${item.product_nm}`))
//                         .append($("<span>").addClass("prodPriceText-sp").html(`&#8377; ${item.price}`)));

//                 button.click(() => gotoProduct(item.id));
//                 button.appendTo(prodContainer);

//             })(item);
//         });
//     }

// }

function cartProductTemplate(item, db_pr_qty, fprice) {
  let not_available_products = localStorage.getItem("not_available_products");
  let msg = "";
  if (not_available_products != null) {
    not_available_products = not_available_products.split(",");
    if (not_available_products.includes(item.id)) {
      msg = "insufficent qty";
    }
  }

  //     return `
  //         <div class="product-cart-div">
  //         <p class="cart-error-msg">${msg}</p>
  //             <div class="product-details-cart">
  //                 <div class="product-details-cart-left-div" onclick="gotoProduct(${item.id})">
  //                     <img src="${imgLink + item.imgs[0]}" alt="Product 1">
  //                 </div>
  //                 <div class="product-details-cart-right-div">
  //                     <h3 onclick="gotoProduct(${item.id})">${item.product_nm}</h3>
  //                     <p>Price: Rs ${item.price}</p>
  //                     <div class="qty qty-counter">
  //                         <span
  //                             class="minus bg-dark span-ash"
  //                             onclick='decreaseQty(${JSON.stringify(item)})'>-</span>
  //                         <input type="number" class="count" name="pr_qty${item.id}" id="pr_qty${item.id}" value="${db_pr_qty}" readonly>
  //                         <span
  //                             class="plus bg-dark span-ash"
  //                             onclick='increaseQty(${JSON.stringify(item)})'>+</span>
  //                         <p id="total${item.id}">Total: Rs ${item.price * item.purchase_qty}</p>
  //                         <button class="remove-btn" onclick="removeSingleProductFromCart(${item.id})">Remove from Cart</button>
  //                     </div>
  //                 </div>
  //             </div>
  //         </div>
  //     `
  // }

  //////------------Update start new---------------- //////

  return `
        <div class="product-cart-div product-cart-div2">
            <p class="cart-error-msg">${msg}</p>
            <div class="product-details-cart detail-cart">
                <div class="product-details-cart-left-div" onclick="gotoProduct(${item.id
    })">
                    <img src="${imgLink + item.imgs[0]}" alt="Product 1">
                </div>
                <div class="product-details-cart-right-div more-div-update">
                    <h3 onclick="gotoProduct(${item.id})">${item.product_nm
    }</h3>
                <span class="span-class">  
                    <b>
                        ${(((fprice - item.price) / fprice) * 100).toFixed(2)} %
                    </b>
                    <del>${fprice}</del>  
                    <p id="total${item.id}">Total: Rs ${item.price * item.purchase_qty
    }</p>
                    </span>
                    <div class="qty qty-counter">
                    <div class="updated-class">
                    <div class="updated-class1">
                        <span 
                            class="minus  span-ash" 
                            onclick='decreaseQty(${JSON.stringify(
      item
    )})'>-</span>
                        <input type="number" class="count update-btn-wala" name="pr_qty${item.id
    }" id="pr_qty${item.id}" value="${db_pr_qty}" readonly>
                        <span 
                            class="plus  span-ash" 
                            onclick='increaseQty(${JSON.stringify(item)})'>+
                        </span>
                    </div>
                
                            <button class="remove-btn" onclick="removeSingleProductFromCart(${item.id
    })"><i class="bi bi-trash-fill"></i></button>
                            </div>
                    </div>
                </div>
            </div>
        </div>
        `;
}

//////------------Update end---------------- //////

// function wishlistProductTemplate(item) {
//     return `
//         <div class="product-cart-div">
//             <div class="product-details-cart">
//                 <div class="product-details-cart-left-div" onclick="gotoProduct(${item.id})">
//                     <img src="${imgLink + item.imgs[0]}" alt="Product 1">
//                 </div>
//                 <div class="product-details-cart-right-div">
//                     <h3 onclick="gotoProduct(${item.id})">${item.product_nm}</h3>
//                     <p>Price: Rs ${item.price}</p>
//                     <div class="wishlist-side-btn">
//                         <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(item)})'>
//                             <i class="bi bi-cart"></i>
//                         </button>
//                         <button class="remove-btn" onclick="removeSingleProductFromWL(${item.id})">
//                             <i class="bi bi-trash-fill"></i>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `
// }

//////------------Update start---------------- //////

// function wishlistProductTemplate(item) {
//     return `
//         <div class="product-cart-div product-cart-div1">
//             <div class="product-details-cart product-details-cart1">
//                 <div class="product-details-cart-left-div" onclick="gotoProduct(${item.id})">
//                     <img src="${imgLink + item.imgs[0]}" alt="Product 1">
//                 </div>
//                 <div class="product-details-cart-right-div product-details-cart-right-div1">
//                     <h3 onclick="gotoProduct(${item.id})">${item.product_nm}</h3>
//                     <span class="span-class span-class-new">
//                         <b>27%</b> <del>700</del>
//                         <p>Rs ${item.price}</p>
//                     </span>
//                     <div class="wishlist-side-btn">
//                         <button class="add-to-cart-btn" onclick='addToCart(${JSON.stringify(item)})'>
//                             Add To Cart
//                         </button>
//                         <button class="remove-btn remove-btn1" onclick="removeSingleProductFromWL(${item.id})">
//                             <i class="bi bi-trash-fill"></i>
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `
// }

//////------------Update end---------------- //////

function orderCardTemplate(item) {
  console.log(item);
  let timlineStr = "";

  let flag = 0;

  item.ORDER_STATUS.forEach((item, i) => {
    if (i < 3) {
      flag++;
      let date = item.date.split(" ")[0].split("-");
      timlineStr += `
                <div class="flex-show1">
                    <small> ${item.status} </small>
                    <div class="circle"></div>
                    <small> ${date[2]} - ${date[1]} </small>
                </div>
            `;
    }
  });

  if (item.ORDER_STATUS.length != 0) {
    if (flag == 3) {
      let st = item.ORDER_STATUS[item.ORDER_STATUS.length - 1].status;
      let dt = item.ORDER_STATUS[item.ORDER_STATUS.length - 1].date
        .split(" ")[0]
        .split("-");

      timlineStr += `
                <div class="flex-show1">
                    <small> ${st} </small>
                    <div class="circle"></div>
                    <small> ${dt[2]} - ${dt[1]} </small>
                </div>
            `;
    }
  }

  return `
    <a href ="orderHistoryDetails.html?id=${item.order_id}" class="btns">
        <div class="order-card">
            <div class="order-card-top">
                <span> ORDER ID :  ${item.order_id}  </span>
                <span></span>
            </div>
            <hr/>
            <div class="order-card-bottom">
                <div class="disnone"></div>
                <div>
                    <p>
                        Status : ${item.ORDER_STATUS.length != 0
      ? item.ORDER_STATUS[
        item.ORDER_STATUS.length - 1
      ].status.split(" ")[1]
      : "data fetch error"
    } <br> 
                        No of items : ${item.NO_OF_ITMES} <br>
                        Total Amount : &#8377; ${item.grand_total}
                    </p>
                </div>
                <div>
                    <i class="bi bi-chevron-right"></i>
                </div>
            </div>
            <div class="flex-show">
                ${timlineStr}
            </div>
        </div>
    </a>  
    `;
}

//////------------Update end---------------- //////

// all navigation functions

$("#goBack").click(() => {
  history.back();
});

function goToCart() {
  location.href = "cart.html";
}

function gotoProductSrch() {
  location.href = "searchpage.html";
}

// use for navigate single product detail page
function gotoProduct(id) {
  localStorage.setItem("pid", id);
  location.href = `product_detail.html?pid=${id}`;
}

// use for navigate product page filter by category
function gotoProductListUseCategory(id) {
  localStorage.setItem("cid", id);
  localStorage.setItem("ctid", id);
  location.href = `all_product.html?cid=${id}`;
}

// all logic function

// async function loadBanner() {

//     let data = await db.banner.toArray();

//     const topBanner = data.filter(item => item.type == 'top');
//     const bottomBanner = data.filter(item => item.type == 'bottom');

//     $('#banner').html('<div id="loadbanner1" class="owl-carousel"></div>');

//     topBanner.map((item) => {
//         $("#loadbanner1").append(`
//             <div class="item">
//                 <img class="banner-img" src="${imgLink + item.img}" alt="${item.id}" />
//             </div>
//         `);
//     });

//     var owl1 = $("#loadbanner1");
//     owl1.owlCarousel(owlCarouselSetting(1, 50));

//     $('#banner2').html('<div id="loadbanner2" class="owl-carousel"></div>');

//     bottomBanner.map((item) => {
//         $("#loadbanner2").append(`
//             <div class="item  banner-mid">
//                 <img class="banner-mid-img" src="${imgLink + item.img}" alt="${item.id}" />
//             </div>`
//         );
//     });

//     var owl2 = $("#loadbanner2");
//     owl2.owlCarousel(owlCarouselSetting(1));

// }

// async function loadHotDeals() {

//     let data = await db.products.toArray();

//     $('#hot-products-id').html('<div id="loaddeals" class="owl-carousel"></div>');

//     data.map((item, i) => {
//         if (i < 4) $("#loaddeals").append(productTemplateWithoutBtn(item))
//     });

//     var owl2 = $("#loaddeals");

//     owl2.owlCarousel(owlCarouselSetting(2, 45));

// }

// async function loadTranding() {

//     let data = await db.products.toArray();

//     $('#tranding-products-id').html('<div id="loadtranding" class="owl-carousel"></div>');

//     data.map((item, i) => {
//         if (i < 4) $("#loadtranding").append(productTemplateWithoutBtn(item))
//     });

//     var owl2 = $("#loadtranding");

//     owl2.owlCarousel(owlCarouselSetting(2 , 45));

// }

async function loadNotification() {
  let user_id = await db.userdetails.get(1);

  if (user_id != undefined) {
    user_id = user_id.user_id;

    const formData = new FormData();
    formData.append("type", "76");
    formData.append("user_id", user_id);
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    let data = res.notifications;

    let templateStr = "";

    data.map((item) => {
      templateStr += `
                <div class="notification-block">
                    <p class="notification-msg"> ${item.msg} </p>
                </div>
            `;
    });

    $("#load-notification").append(templateStr);
  } else {
    $("#load-notification").html(`
            <div class="alert alert-danger" role="alert">
                You are not logged in. Please log in first. </br>
                <a href="../login.html" class="alert-link">Click here</a> to login.
            </div>
        `);
  }
}

// all product functions

// async function loadProductHome() {

//     let data = await db.products.toArray();
//     data = data.sort((a, b) => b.id - a.id).slice(0, 4);

//     let wishlistData = await db.wishlist.toArray();
//     let wIds = new Set(wishlistData.map(item => item.var_id));

//     data
//         .map(async item => {
//             item['wishlist_status'] = wIds.has(item['id']) ? 1 : 0;
//             let db_pr_qty = await db.cart.get(item.id);
//             db_pr_qty = db_pr_qty == undefined ? 0 : db_pr_qty.purchase_qty;
//             $("#productList").append(productCardTemplate(item, db_pr_qty));
//         });

// }

function getChildCategories(categories, parentId) {
  const childIds = [];
  for (const category of categories) {
    if (category.parent_id === parentId) {
      childIds.push(category.id);
      childIds.push(...getChildCategories(categories, category.id));
    }
  }
  return childIds;
}

async function createCtegoryTree(id) {
  let categories = await db.categories.toArray();
  return getChildCategories(categories, id);
}

// async function loadCategoryOnId(id) {
//     let products = await db.products.toArray();
//     let catIds = await createCtegoryTree(id);
//     catIds.push(id);
//     data = products.filter(item => catIds.includes(item.cat_id));
//     return data;
// }

// async function loadProductAllProduct() {

//     let data = [];
//     let id = localStorage.getItem("cid");

//     if (id !== null) {
//         data = await loadCategoryOnId(id);
//     } else {
//         data = await db.products.toArray();
//     }

//     if (data.length == 0) $("#loadAllProduct").append(noDataTemplate());

//     let newData = [];

//     let uniquePids = new Set();

//     data.forEach((item) => {
//         let currentPid = item.product_id;
//         if (!uniquePids.has(currentPid)) {
//             uniquePids.add(currentPid);
//             newData.push(item);
//         }
//     });

//     let wishlistData = await db.wishlist.toArray();
//     let wIds = new Set(wishlistData.map(item => item.var_id));

//     newData
//         .sort((a, b) => b.id - a.id)
//         .map(async (item) => {
//             item['wishlist_status'] = wIds.has(item['id']) ? 1 : 0;
//             let db_pr_qty = await db.cart.get(item.id);
//             db_pr_qty = db_pr_qty == undefined ? 0 : db_pr_qty.purchase_qty;
//             $("#loadAllProduct").append(productCardTemplate(item, db_pr_qty));
//         });

//     localStorage.removeItem("cid");

// }
// recommanded product code by sourav

// async function loadSingleProduct() {

//     let id = localStorage.getItem("pid");

//     if (id === null) { return undefined }
//     else {
//         let data = await db.products.get(`${id}`);
//          singleProdTempl(data);

//         let recentPro  = JSON.parse(sessionStorage.getItem('recentPro')) || [];
//         console.log( recentPro);
//         let checkduplicate = recentPro.filter(items => items.id == data.id).length > 0;
//         console.log("checkduplicate",checkduplicate);
//          if(!checkduplicate){
//              recentPro.push(data);

//              sessionStorage.setItem('recentPro',JSON.stringify(recentPro));
//          }

//          let displayRecent_Pro = JSON.parse(sessionStorage.getItem('recentPro'));

//          $('#recent-products-id').html('<div id="recentPro" class="owl-carousel"></div>');

//          displayRecent_Pro.map((items,i)=>{

//             if (i < 4) $("#recentPro").append(productTemplateWithoutBtn(items))

//          })

//          var owl2 = $("#recentPro");

//     owl2.owlCarousel(owlCarouselSetting(2));

//     }

// }
// recommanded product code by sourav

// variant function

// async function getVariant(product_id, var_id) {

//     let data = await db.products.where("product_id").equals('' + product_id).toArray();
//     data = data.filter(item => item.id != var_id);

//     let prodContainer = $("#prodContainer");
//     prodContainer.html('');

//     if (data.length == 0) {
//         prodContainer.html(noDataTemplate());
//     } else {
//         data.forEach(item => {
//             (item => {
//                 let button = $("<button>")
//                     .addClass("prodbuttonContainer")
//                     .append($("<img>").attr("src", imgLink + item.imgs[0]).attr("alt", "Image"))
//                     .append($("<span>").addClass("prodNameText").text(`${item.product_nm}`))
//                     .append($("<span>").addClass("prodPriceText").text(`${item.price}`));

//                 button.click(() => gotoProduct(item.id));
//                 button.appendTo(prodContainer);

//             })(item);
//         });
//     }

// }

// all category functions

// async function loadcatgSlider() {

//     let ctid = localStorage.getItem("ctid");
//     let data = [];

//     if (ctid === null || ctid == 0) {
//         data = await db.categories.where("parent_id").equals('0').toArray();
//     } else {
//         data = await db.categories.where("parent_id").equals(ctid).toArray();
//         let main_catg = await db.categories.where("id").equals(ctid).toArray();
//         main_catg = main_catg[0];
//         $("#main_catg_name").html(`${main_catg.name}`);
//         $("#main_catg_img").attr("src", imgLink + main_catg.images);
//         $("#main_catg_div").attr("onclick", "gotoProductListUseCategory(" + main_catg.parent_id + ")");
//     }

//     let catgContainer = $("#catgContainer");

//     data.forEach(item => {
//         (item => {
//             let button = $("<button>")
//                 .addClass("catgbuttonContainer")
//                 .append($("<img>").attr("src", imgLink + item.images).attr("alt", "Image"))
//                 .append($("<span>").addClass("buttonText").text(`${item.name}`));

//             button.click(() => gotoProductListUseCategory(item.id));
//             button.appendTo(catgContainer);

//         })(item);
//     });

// }

async function loadCategoryAll() {
  let data = await db.categories.toArray();
  data.map((item) => $("#categoriesListAll").append(categoryTemplate(item)));
}

// async function loadCategoryHome() {

//     let data = await db.categories.toArray();
//     data = data.slice(0,8);
//     data.map((item) => { console.log(item.parent_id);
//           if(item.parent_id == '0'){

//               $("#categoriesList").append(categoryTemplate(item))

//           }

//     });
// }

// all cart functions

// async function addToCart(item) {

//     let loginStatus = await loginCheck();

//     if (loginStatus) {

//         if (item.qty != 0) {

//             let data = {
//                 id: item.id,
//                 var_id: item.id,
//                 product_id: item.product_id,
//                 product_nm: item.product_nm,
//                 cat_id: item.cat_id,
//                 cat_nm: item.cat_nm,
//                 product_cm: item.product_cm,
//                 imgs: item.imgs,
//                 price: item.price,
//                 sku: item.sku,
//                 purchase_qty: 1,
//                 fprice: item.fprice
//             };

//             await db.cart.put(data);
//             await addCartToServer();
//             loadCartCount();
//             alert('cart added');
//             return 1;

//         } else {
//             alert('out of stock');
//             return 0 ;
//         }

//     } else {
//         alert('please login first');
//         location.href = "../login.html";
//     }
// }

// async function buyNowbtn(item) {

//     let loginStatus = await loginCheck();

//     if (loginStatus) {

//         if (item.qty != 0) {

//             alert('cart added');
//             let data = {
//                 id: item.id,
//                 var_id: item.id,
//                 product_id: item.product_id,
//                 product_nm: item.product_nm,
//                 cat_id: item.cat_id,
//                 cat_nm: item.cat_nm,
//                 product_cm: item.product_cm,
//                 imgs: item.imgs,
//                 price: item.price,
//                 sku: item.sku,
//                 purchase_qty: 1,
//                 fprice: item.fprice
//             };

//             await db.cart.put(data);
//             await addCartToServer();
//             loadCartCount();
//             // buynow button
//             location.href = "cart.html";
//             // buynow button

//         } else {
//             alert('out of stock');
//         }

//     } else {
//         alert('please login first');
//         location.href = "../login.html";
//     }
// }

async function addCartToServer() {
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;
  let cartData = await db.cart.toArray();
  cartData = JSON.stringify(cartData); 
  const formData = new FormData();
  formData.append("type", "41");
  formData.append("cartData", cartData);
  formData.append("user_id", user_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res;
  // new change
}

async function loadCartCount() {
  let cartCount = await db.cart.toArray();
  cartCount = cartCount.length;
  $("#cart-count").html(cartCount);
  $("#cart-count-link").html(cartCount);
}

async function loadCart() {
  // await loadCartFromserver();  // when bug in loadCart then remove comment

  let cartitems = await db.cart.toArray();
  let grandTotal = 0;

  if (cartitems.length == 0) {
    $("#cartRes").append(noDataTemplate());
    $(".cart-total").html("");
    $(".checkuot-btn").text("nothing in cart");
  }
  // fake price added-------------------------
  cartitems.map(async (item) => {
    grandTotal += item.price * item.purchase_qty;
    let db_pr_qty = await db.cart.get(item.id);
    let { fprice } = await db.products.get(item.id);
    db_pr_qty = db_pr_qty == undefined ? 0 : db_pr_qty.purchase_qty;
    $("#cartRes").append(cartProductTemplate(item, db_pr_qty, fprice));
  });

  loadCartCount();
  $("#grand-total").html(grandTotal);
}

async function cartRemoveAll() {
  if (confirm("are you sure ?")) await db.cart.clear();
  await addCartToServer();
  location.reload();
}

async function removeSingleProductFromCart(id) {
  console.log("1");
  id = "" + id;
  if (confirm("are you sure ?")){
    cartproid = localStorage.getItem("not_available_products");
    cartproid != null ? proArray = cartproid.split(",") : proArray = [];
    arr = proArray.filter(item => item !== id);
    arr.length == 0 ? localStorage.removeItem("not_available_products") : localStorage.setItem("not_available_products",arr);
    await db.cart.delete(id);
  } 
  await addCartToServer();
  location.reload();
}

async function loadCartFromserver() {  
  await db.cart.clear();
  let user_id = await db.userdetails.get(1);
  if (user_id == undefined) {
    return "";
  } else {
    user_id = user_id.user_id;
    let cartData = await db.cart.toArray();
    if (cartData.length == 0) {
      const formData = new FormData();
      formData.append("type", "42");
      formData.append("cartData", cartData);
      formData.append("user_id", user_id);
      let req = await fetch(appAPI, { method: "POST", body: formData });
      let res = await req.json();
      let data = res.cart;
      if (data.length != 0) {

        for (let item of data) {
          let imgs = item.imgs.split(",");
          let dataToInsert = {
              id: item.var_id,
              var_id: item.var_id,
              product_id: item.product_id,
              product_nm: item.product_nm,
              cat_id: item.cat_id,
              cat_nm: item.cat_nm,
              product_cm: item.product_cm,
              imgs: imgs,
              price: item.price,
              sku: item.sku,
              // purchase_qty: 1,
              purchase_qty: item.purchase_qty,
              fprice: item.fprice,
          };
          
          await db.cart.put(dataToInsert);
      }
      }
      loadCartCount();
    }
  }
}

// // qty decrease
// function decreaseQty(item) {
//     console.log(1);
//     updateQty(item, 'minus');
// }

// // qty increase
// function increaseQty(item) {
//     console.log(2);
//     updateQty(item, 'plus');
// }

// async function updateQty(item, type) {
//     console.log(type);
//     let available_qty = await db.products.get(item.id);
//     available_qty = parseInt(available_qty.qty);

//     let prqty = parseInt($(`#pr_qty${item.id}`).val());

//     if (available_qty > 0) {
//         if (prqty > 0) {
//             if (type == 'minus') {
//                 --prqty;
//                 updateQtyDb(item, prqty);
//             }
//             if (type == 'plus') {
//                 ++prqty;
//                 if (available_qty < prqty) {
//                     alert('purchase limit reached');
//                     --prqty;
//                 } else {
//                     updateQtyDb(item, prqty);
//                 }
//             }
//         } else if (prqty == 0) {
//             if (type == 'minus') {
//                 prqty = 0;
//                 updateQtyDb(item, prqty);
//             }
//             if (type == 'plus') {
//                 ++prqty;
//                 if (available_qty < prqty) {
//                     alert('purchase limit reached');
//                     --prqty;
//                 } else {
//                     updateQtyDb(item, prqty);
//                 }
//             }
//         } else {
//             prqty = 0;
//             removeSingleProductFromCart(item.id);
//         }
//         $(`#pr_qty${item.id}`).val(prqty);
//     } else {
//         alert('out of stock');
//     }

// }

// async function updateQtyDb(item, prqty) {
//     if (prqty == 0) {
//         removeSingleProductFromCart(item.id);
//     } else {
//         let x = await db.cart.update(item.id, { purchase_qty: prqty });
//         if (x == 0) addToCart(item);
//         else await addCartToServer();
//     }
//     // location.reload();

//     $(`#total${item.id}`).html(`Total: Rs ${item.price * prqty}`);

//     let cartitems = await db.cart.toArray();
//     let grandTotal = 0;
//     cartitems.map(async (item) => {
//         grandTotal += (item.price * item.purchase_qty);
//     });
//     $("#grand-total").html(grandTotal);
// }

loadCartCount();

// all wishlist functions

// async function addToWhishlist(item, thisElem) {
//     console.log(thisElem)

//     let i = thisElem.querySelector('.bi');

//     if (i == null) {

//         thisElem.className = '';
//         thisElem.className = 'bi bi-heart-fill wishlist-heart-color';

//     } else {

//         i.className = '';
//         i.className = 'bi bi-heart-fill wishlist-heart-color';

//     }

//     let loginStatus = await loginCheck();

//     if (loginStatus) {

//         alert('Whishlist added');

//         data = {
//             id: item.id,
//             var_id: item.id,
//             product_id: item.product_id,
//             product_nm: item.product_nm,
//             cat_id: item.cat_id,
//             cat_nm: item.cat_nm,
//             product_cm: item.product_cm,
//             imgs: item.imgs,
//             price: item.price,
//             sku: item.sku
//         };

//         await db.wishlist.put(data);
//         await addWhishlistToServer();
//     } else {
//         alert('please login first');
//         location.href = "../login.html";
//     }
// }

async function removeSingleProductFromWL(id) {
  id = "" + id;
  if (confirm("are you sure ?")) {
    await db.wishlist.delete(id);
    await addWhishlistToServer();
    location.reload();
  }
}

// async function loadWishlist() {

//     // await loadWishListFromserver (); // remove comment when not load bug

//     let items = await db.wishlist.toArray();
//     if (items.length == 0) {
//         $("#wishlistRes").append(noDataTemplate())

//     }
//     items.map(item => {
//         $("#wishlistRes").append(wishlistProductTemplate(item))
//     });

// }

async function addWhishlistToServer() {
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;
  let wishlistData = await db.wishlist.toArray();
  wishlistData = JSON.stringify(wishlistData);
  const formData = new FormData();
  formData.append("type", "43");
  formData.append("wishlistData", wishlistData);
  formData.append("user_id", user_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res;
}

async function loadWishListFromserver() {
  let user_id = await db.userdetails.get(1);
  if (user_id == undefined) {
    return "";
  } else {
    user_id = user_id.user_id;
    let wishlistData = await db.wishlist.toArray();
    if (wishlistData.length == 0) {
      const formData = new FormData();
      formData.append("type", "44");
      formData.append("user_id", user_id);
      let req = await fetch(appAPI, { method: "POST", body: formData });
      let res = await req.json();
      let data = res.wishlist;
      if (data.length != 0) {
        data.map(async (item) => {
          let imgs = item.imgs.split(",");
          data = {
            id: item.var_id,
            var_id: item.var_id,
            product_id: item.product_id,
            product_nm: item.product_nm,
            cat_id: item.cat_id,
            cat_nm: item.cat_nm,
            product_cm: item.product_cm,
            imgs: imgs,
            price: item.price,
            sku: item.sku,
          };

          await db.wishlist.put(data);
        });
      }
    }
  }
}

// all login function

async function loginCheck() {
  let login_status = localStorage.getItem("K_status");
  let user_id = localStorage.getItem("K_id");
  let name = localStorage.getItem("K_name");
  let address = localStorage.getItem("K_address");
  let user_type = localStorage.getItem("K_type");
  let wallet = localStorage.getItem("K_wallet");

  if (login_status === null) {
    await db.userdetails.clear();
    return false;
  } else {
    if (login_status == 1) {
      await db.userdetails.put({
        id: 1,
        user_id: user_id,
        name: name,
        address: address,
        login_status: login_status,
        user_type: user_type,
        wallet: wallet,
      });
      return true;
    } else {
      await db.userdetails.clear();
      return false;
    }
  }
}

async function logoutUser() {
  await db.userdetails.clear();
  await db.cart.clear();
  await db.wishlist.clear();
  localStorage.clear();
  location.href = "../index.html";
}

async function loadUserDataHome() {
  let loginStatus = await loginCheck();

  if (loginStatus) {
    let userdata = await db.userdetails.get(1);
    $("#username-home-h3").html(userdata.name.split(" ")[0]);
  } else {
    $("#username-home-h3").html("Guest");
  }
}

async function loadSettingData() {
  let loginStatus = await loginCheck();

  // if (loginStatus) {
  //     let userdata = await db.userdetails.get(1);
  //     $("#username-setting").html(`Welcome, ${userdata.name}`);
  //     $("#user-btn-status").html(`<button class="btn btn-danger" onclick="logoutUser()">logout</button><a class="btn btn-warning" href="#">My Profile</a>`);
  // } else {
  //     $("#username-setting").html(`Not Logged In ?`);
  //     $("#user-btn-status").html(`<a class="btn btn-warning" href="../login.html">LOG-IN</a>`);
  // }

  ///////////----------Update start------------/////////

  if (loginStatus) {
    let userdata = await db.userdetails.get(1);
    $("#username-setting").html(`Welcome, ${userdata.name.split(" ")[0]}`);
    $("#user-btn-status").html(
      `<button class="update-btn" onclick="logoutUser()">logout</button>`
    );
  } else {
    $("#username-setting").html(`Not Logged In ?`);
    $("#user-btn-status").html(
      `<a class="update-btn" href="../login.html">LOG-IN</a>`
    );
    $("#deleteMyAccount-a").css({ display: "none" });
    $("#Address-a").css({ display: "none" });
    $("#wishlist-a").css({ display: "none" });
    $("#order-history-a").css({ display: "none" });
    $("#my-profile").css({ display: "none" });
    $("#walletpage").css({ display: "none" });
  }
  ///////////----------update end------------/////////
}

// checkout function

async function proceedToCheckoutPage() {
  let cartLength = await db.cart.toArray();
  if (cartLength.length == 0) {
    alert("nothing in cart");
  } else {
    localStorage.removeItem("offer");
    location.href = "checkout.html";
  }
}

async function getGstSatus() {
  let gstStatus = await db.addons.where("name").equals("GST").toArray();
  gstStatus = gstStatus[0].activation_status;

  if (gstStatus == 0) {
    $("#GSTdiv").hide();
  } else {
    $("#GSTdiv").show();
  }

  return gstStatus;
}

async function getcoupanStatus() {
  let coupanStatus = await db.addons.where("name").equals("COUPONS").toArray();
  coupanStatus = coupanStatus[0].activation_status;

  if (coupanStatus == 0) {
    $("#coupansBtn").hide();
  } else {
    $("#coupansBtn").show();
  }
}

async function getdeliverySlotStatus() {
  let deliverySlotStatus = await db.addons
    .where("name")
    .equals("DELIVERY SLOT")
    .toArray();
  deliverySlotStatus = deliverySlotStatus[0].activation_status;

  if (deliverySlotStatus == 0) {
    $("#deliverySlotBtn").hide();
    $("#DSCdiv").hide();
    // $("#address-print-div").hide();
    $("#delivery-slot").val(0);
    localStorage.removeItem("delivery_slot_id");
  } else {
    $("#deliverySlotBtn").show();
    $("#DSCdiv").show();
    // $("#address-print-div").show();
  }

  return deliverySlotStatus;
}

async function getTakeawayStatus() {
  let takeawayStatus = await db.addons
    .where("name")
    .equals("TAKEAWAY")
    .toArray();
  takeawayStatus = takeawayStatus[0].activation_status;

  if (takeawayStatus == 0) {
    $("#t-btn").hide();
  } else {
    $("#t-btn").show();
  }
}

async function getdeliveryStatus() {
  let deliveryStatus = await db.addons
    .where("name")
    .equals("DELIVERY")
    .toArray();
  deliveryStatus = deliveryStatus[0].activation_status;

  if (deliveryStatus == 0) {
    $("#d-btn").hide();
    $("#getAddressBtn").hide();
    changeTakeaway("Takeaway");
  } else {
    $("#d-btn").show();
    $("#getAddressBtn").show();
  }
}

async function getOnlinePaymentStatus() {
  let onlinePaymentStatus = await db.addons
    .where("name")
    .equals("ONLINE_PAYMENT")
    .toArray();
  onlinePaymentStatus = onlinePaymentStatus[0].activation_status;

  if (onlinePaymentStatus == 0) {
    $("#onlinePaymentCheckbox").hide();
  } else {
    $("#onlinePaymentCheckbox").show();
  }

  return onlinePaymentStatus;
}

async function getInvoiceDetails() {
  const data = await db.cart.toArray();

  await getcoupanStatus();
  await getdeliveryStatus();
  await getdeliverySlotStatus();
  await getTakeawayStatus();
  await getOnlinePaymentStatus();

  let gstSt = await getGstSatus();
  let totalGST = 0;

  if (gstSt == 1) {
    let tempData = await Promise.all(
      data.map(async (item) => {
        let cgst = await getCGST(item.id);
        let sgst = await getSGST(item.id);
        return {
          id: item.id,
          qty: parseInt(item.purchase_qty),
          price: parseInt(item.price),
          cgst: parseInt(cgst),
          sgst: parseInt(sgst),
        };
      })
    );

    totalGST = tempData.reduce(
      (sum, item) =>
      (sum +=
        item.price * item.cgst * 0.01 * item.qty +
        item.price * item.sgst * 0.01 * item.qty),
      0
    );
  }

  let discountVal = 0;
  let grandTotal = 0;
  let slotCharge = localStorage.getItem("delivery_slot_id");
  let selectedSlotName = localStorage.getItem("selctedSlotname");
  let discount = localStorage.getItem("offer");

  selectedSlotName != null ? choosedSlot = selectedSlotName : choosedSlot = "Please Select Slot";


  if (slotCharge != null) {
    slotCharge = slotCharge.split("--");
    slotCharge = parseInt(slotCharge[1]);
  } else {
    slotCharge = 0;
  }

  // let total = data.reduce(
  //   (sum, item) => sum + item.price * item.purchase_qty,
  //   0
  // );

  let total = Number((data.reduce((sum, item) => sum + (item.price * item.purchase_qty), 0)).toFixed(2));
  // console.log(total);
  if (discount == null) {
    discountVal = 0;
  } else {
    discount = discount.split("--");
    if (discount[2] == "flat") {
      discountVal = discount[1];
    }
    if (discount[2] == "percent") {
      // discountVal = total - total * discount[1] * 0.01;
      discountVal = Number((total * discount[1] * 0.01).toFixed(2));
    }
  }

  if (discountVal > total) {
    alert(`offer can't applied`);
    localStorage.removeItem("offer");
    discountVal = 0;
  }

  walletbal = localStorage.getItem("walletCalbal");
  wallToggle = localStorage.getItem("wallToggle");
  if (wallToggle != 1) {
    $("#walletSwitch").prop("checked", false);
  }
  if (walletbal == null) {
    walletDiscount = 0;
  } else if (walletbal > total) {
    alert("Please shop for more to apply wallet");
    $("#walletSwitch").prop("checked", false);
    walletDiscount = 0;
  } else {
    walletDiscount = walletbal;
  }

  grandTotal = total + totalGST + slotCharge - discountVal - walletDiscount;
  grandTotal = grandTotal.toFixed(2);

  // code for savings
  const productArry = await db.cart.toArray();
  // console.log(productArry);
  fakeTotal = 0;
  productArry.map((item) => {
    fakeprice = item.fprice;
    proQty = item.purchase_qty;

    fakeTotal += parseInt(fakeprice) * parseInt(proQty);
  });
  // console.log(fakeTotal);
  // console.log(total);
  $('#selectedSlotName').html(selectedSlotName)
  $("#savings").val((fakeTotal - total).toFixed(2));

  $("#Gross-Total").val(`${fakeTotal}`);
  $('#GrossPrice').html(`Gross Price ( items : ${data.length})`)
  $("#price-label").html(`Total ( items : ${data.length})`);
  $("#TotalItems").html(`Grand Total ( items : ${data.length})`);
  $("#total-price").val(` ${total}`);
  $("#discount").val(` ${discountVal}`);
  $("#total-gst").val(`${totalGST}`);
  $("#delivery-slot").val(`${slotCharge}`);
  $("#walletDiscount").val(walletDiscount);
  $("#grand-total").val(` ${grandTotal}`);

  $("#total-price").attr("size", $("#total-price").val().length);
  $("#discount").attr("size", $("#discount").val().length);
  $("#total-gst").attr("size", $("#total-gst").val().length);
  $("#delivery-slot").attr("size", $("#delivery-slot").val().length);
  $("#grand-total").attr("size", $("#grand-total").val().length);
}

async function getFinalInvoiceDetails() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  const formData = new FormData();
  formData.append("type", "73");
  formData.append("order_id", id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res[0];

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

  $("#total").html(`${data.customer_details.total} ${del_st}`);
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
  // console.log(product_list);
  product_list.map((item) => { 
    item.type_name_1 == undefined ? type_name_1 = "" : type_name_1 = item.type_name_1;
    item.type_name_2 == undefined ? type_name_2 = "" : type_name_2 = item.type_name_2;
    item.type_qty_1 == undefined ? type_qty_1 = "" : type_qty_1 = item.type_qty_1;
    item.type_qty_2 == undefined ? type_qty_2 = "" : type_qty_2 = item.type_qty_2;
    $("#item-list").append(
      `
                <div class="flex-wala flex-wala-1">
                  <p class="para-wala-update"> ${item.name} </p>
                  <p class="para-wala-update">${type_name_1},${type_name_2},${type_qty_1},${type_qty_2}</p>
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

  localStorage.removeItem("delivery_slot_id");
}

async function getCGST(id) {
  let data = await db.products.get("" + id);
  return data.cgst;
}

async function getSGST(id) {
  let data = await db.products.get("" + id);
  return data.sgst;
}

// final checkout function

// async function finalCheckout() {

//     // check for delivery slot

//     let setdeliverySlotVal = new Promise(async (resolve, reject) => {

//         let deliverySlotStatusVal = await getdeliverySlotStatus();

//         // remove condition when take away selected { resolve true  hide take away }

//         if (deliverySlotStatusVal == 1) {
//             let delivery_slot_id = localStorage.getItem("delivery_slot_id");
//             if (delivery_slot_id === null) {
//                 await getDeliverySlot();
//                 $('#delviery-slot-modal').modal('show');

//                 $('#delviery-slot-modal').on('hidden.bs.modal', function (e) {
//                     resolve(true);
//                 });

//                 $('#delviery-slot-modal').on('hide.bs.modal', function (e) {
//                     reject('error');
//                 });

//             } else {
//                 resolve(true);
//             }
//         }

//     });

//     await setdeliverySlotVal;

//     // end check for delivery slot

//     let userData = await db.userdetails.get(1);

//     let cartData = await db.cart.toArray();

//     let gstStatus = await db.addons.where("name").equals('GST').toArray();
//     gstStatus = gstStatus[0].activation_status;

//     let tempList = await Promise.all(cartData.map(async item => {

//         let cgst = await getCGST(item.id);
//         let sgst = await getSGST(item.id);

//         return {
//             ...item,
//             pro_id: item.product_id,
//             imgs: item.imgs[0],
//             name: item.product_nm,
//             qty: item.purchase_qty,
//             product_cm: '',
//             cgst: gstStatus == 1 ? cgst : 0,
//             sgst: gstStatus == 1 ? sgst : 0
//         };

//     }));

//     const productList = tempList.map(({
//         product_nm,
//         product_id,
//         purchase_qty,
//         cat_id,
//         cat_nm,
//         product_cm, ...rest }) => rest);

//     let date = new Date();

//     let order_id =
//         "ORD" +
//         date.getDate() +
//         (date.getMonth() + 1) +
//         date.getFullYear() +
//         date.getHours() +
//         date.getMinutes() +
//         date.getSeconds() +
//         date.getMilliseconds() +
//         userData.user_id ;

//     let payment_mode = '';
//     let temp_payment_status = false;

//     const offer_id = localStorage.getItem("offer_id");
//     const address_id = localStorage.getItem('address_id');

//     let codCheckbox = document.getElementById("codCheckbox");
//     let onlineCheckbox = document.getElementById("onlineCheckbox");

//     if (codCheckbox.checked) {
//         payment_mode = codCheckbox.value;
//     }
//     if (onlineCheckbox.checked) {
//         payment_mode = onlineCheckbox.value;
//     }

//     let delivery_type = address_id == 'NULL' ? 'Pickup at store' : 'Home delivery';

//     let mobileno = $("#cs-mob-no").val();
//     let pincode = $("#cs-pincode").val();

//     let discount = $("#discount").val();
//     let delivery_slot = $("#delivery-slot").val();
//     let wallet_discount = $("#walletDiscount").val();
//     let gst = $("#total-gst").val();
//     let total = $("#total-price").val();
//     let grandTotal = $("#grand-total").val();
//     // for wallet
//     let customerID = localStorage.getItem('K_id');
//     let walletDel = JSON.parse(localStorage.getItem("dynamicWallet"));
//     const formData = new FormData();

//     formData.append("order_id", order_id);
//     formData.append("mobile", mobileno);
//     formData.append("name", userData.name);
//     formData.append("address", 'NULL');
//     formData.append("pincode", pincode);
//     formData.append("user_id", userData.user_id);
//     formData.append("delivery_type", delivery_type);
//     formData.append("payment_mode", payment_mode);
//     formData.append("productList", JSON.stringify(productList));
//     formData.append("discount_value", discount);
//     formData.append("discount_type", 'coupan');
//     formData.append("address_id", address_id);
//     formData.append("offer_id", offer_id);
//     formData.append("order_type", 'app');

//     formData.append("delivery_slot", delivery_slot);
//     formData.append("wallet_discount", wallet_discount);
//     formData.append("total", total);
//     formData.append("gst", gst);
//     formData.append("grandTotal", grandTotal);

//     // wallet_update
//     formData.append("cusID",customerID);
//     formData.append("pre_Code",walletDel.wallet_code);
//     formData.append("wallet_status",walletDel.walletstatus);
//     formData.append("prv_bal",walletDel.walletBalance);
//     console.log(walletDel.walletstatus);
//     console.log(walletDel.walletBalance);
//      // wallet_update
//     if (payment_mode == "ONLINE " || payment_mode == "ONLINE") {

//         let paymentInitiate = new Promise(async (resolve, reject) => {

//             const formData = new FormData();
//             formData.append("type", "86");
//             let req = await fetch(appAPI, { method: "POST", body: formData });
//             let res = await req.json();
//             let { data } = res;
//             data = data[0];

//             let payment_gateway = data.tbl_key;

//             if (payment_gateway == 'RAZORPAY') {

//                 let options = {
//                     key: `${data.tbl_value.split('=')[1]}`,
//                     name: userData.name,
//                     currency: "INR",
//                     amount: grandTotal * 100,
//                     description: order_id,
//                     handler: function (response) {
//                         resolve ({
//                             status: true,
//                             txnId: response.razorpay_payment_id
//                         });
//                     },
//                     "modal": {
//                         "ondismiss": function () {
//                             alert('Payment canceled By user');
//                             console.log('payment failed due to close modal by user');
//                             reject ({
//                                 status: false,
//                                 txnId: null
//                             }) ;
//                         }
//                     }
//                 }
//                 let rzp = await new Razorpay(options);
//                 await rzp.open();

//             } else {
//                 reject ({
//                     status: false,
//                     txnId: null
//                 });
//             }

//         });

//         let { status, txnId } = await paymentInitiate ;
//         temp_payment_status = status;
//         console.log(temp_payment_status , txnId); // ash-bug
//         formData.append("transaction_id", txnId);
//         formData.append("payemt_status", temp_payment_status);

//     } else {
//         temp_payment_status = true;
//     }

//     if (temp_payment_status == false) {

//         alert('Payment failed . Choose COD. ')

//         formData.append("transaction_id", '');
//         formData.append("payemt_status", 'false' );

//     } else {

//         formData.append("type", 58);       // 47 old type
//         let req = await fetch(appAPI, { method: "POST", body: formData });
//         let res = await req.json();
//         let data = res.data;

//         if (data.status == 1) {
//             alert('order placed successfully');
//             await db.cart.clear();
//             await addCartToServer();
//             localStorage.removeItem("not_available_products");
//             location.href = `invoice.html?id=${data.order_id}`;
//         } else {
//             alert(data.msg);
//             localStorage.setItem("not_available_products", data.not_available_products);
//             location.href = `cart.html`;
//         }

//     }

// }

// filter product and search

function filterProduct(inp, data = 0) {
  localStorage.removeItem("filterValue");
  localStorage.removeItem("srch_barcode");
  let srchValue = "";
  let filterValue = "";
  if (data == 0) {
    srchValue = inp.value;
  } else {
    srchValue = $("#inp-srch").val();
    filterValue = data;
    localStorage.setItem("filterValue", filterValue);
  }
  $("#filterModal").modal("hide");

  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const debouncedEventListiner = debounce(() => filterProductProcess(srchValue, filterValue), 800);
  debouncedEventListiner();
}

async function filterProductProcess(srchValue, filterValue) {
  // SortByNameA_Z , SortByNameZ_A , SortByPriceL_H , SortByPriceH_L

  if (filterValue == "") {
    filterValue = localStorage.getItem("filterValue");
    if (filterValue == null) filterValue = "";
  }

  let products = [];

  if (srchValue != "" && filterValue != "") {
    if (filterValue == "SortByNameA_Z") {
      products = await db.products
        .orderBy("product_nm")
        .filter(function (item) {
          return new RegExp(srchValue, "i").test(item.product_nm);
        })
        .toArray();
    } else if (filterValue == "SortByNameZ_A") {
      products = await db.products
        .orderBy("product_nm")
        .reverse()
        .filter(function (item) {
          return new RegExp(srchValue, "i").test(item.product_nm);
        })
        .toArray();
    } else if (filterValue == "SortByPriceL_H") {
      products = await db.products
        .filter(function (item) {
          return new RegExp(srchValue, "i").test(item.product_nm);
        })
        .toArray();
      products = products.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (filterValue == "SortByPriceH_L") {
      products = await db.products
        .filter(function (item) {
          return new RegExp(srchValue, "i").test(item.product_nm);
        })
        .toArray();
      products = products.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else {
    }
  } else if (srchValue != "" && filterValue == "") {
    products = await db.products
      .filter(function (item) {
        return new RegExp(srchValue, "i").test(item.product_nm);
      })
      .toArray();
  } else if (srchValue == "" && filterValue != "") {
    if (filterValue == "SortByNameA_Z") {
      products = await db.products.orderBy("product_nm").toArray();
    } else if (filterValue == "SortByNameZ_A") {
      products = await db.products.orderBy("product_nm").reverse().toArray();
    } else if (filterValue == "SortByPriceL_H") {
      products = await db.products.toArray();
      products = products.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else if (filterValue == "SortByPriceH_L") {
      products = await db.products.toArray();
      products = products.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else {
    }
  } else {
  }

  // use for bar code search
  let srch_barcode = localStorage.getItem("srch_barcode");
  if (srch_barcode == null) srch_barcode = "";

  if (srch_barcode != "") {
    products = [];
    products = await db.products
      .where("sku")
      .equals("" + srch_barcode)
      .toArray();
  }

  if (products.length == 0) {
    $("#loadAllProduct").html(noDataTemplate());
    setTimeout(() => {
      $("#loadAllProduct").html("");
      loadProductAllProduct();
    }, 2000);
  } else {
    const [wishlistData, cartItem] = await Promise.all([
      db.wishlist.toArray(),
      db.cart.toArray(),
    ]);

    const wishlistMap = new Map(
      wishlistData.map((item) => [item.var_id, true])
    );
    const cartMap = new Map(
      cartItem.map((item) => [item.var_id, item.purchase_qty])
    );

    data = products.map((item) => ({
      ...item,
      wishlist_status: wishlistMap.has(item.id) ? 1 : 0,
      purchase_qty: cartMap.get(item.id) || 0,
    }));

    let uniquePids = new Set();
    let newData = data.filter((item) => {
      if (uniquePids.has(item.product_id)) {
        return false;
      } else {
        uniquePids.add(item.product_id);
        return true;
      }
    });

    const productCards = newData
      .map((item) => productCardTemplate2nd(item))
      .join("");

    $("#loadAllProduct").html("");
    $("#loadAllProduct").append(productCards);
  }
}

// load extra page

async function otherPage() {
  const urlSearchParams = new URLSearchParams(window.location.search);
  const id = urlSearchParams.get("id");

  const formData = new FormData();
  formData.append("type", "50");
  formData.append("id", id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data[0];
  $("#page-title").html(data.title);
  $("#page-data").html(data.body);
}

// prodcut scan

function scanProduct(srch_barcode) {
  localStorage.setItem("srch_barcode", srch_barcode);
  location.href = "searchpage.html";
}

// get user address for checkout page

async function getAddress() {
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;
  const formData = new FormData();
  formData.append("type", "45");
  formData.append("user_id", user_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res;
  data = data.address_list;

  let addressContainer = $("#addressContainer");
  addressContainer.html("");

  if (data.length == 0) {
    addressContainer.html(noDataTemplate());
  } else {
    data.forEach((item) => {
      ((item) => {
        let button = $("<button>")
          .addClass("addressbuttonContainer")
          .append($("<span>").text(`Name: ${item.name}`))
          .append($("<span>").text(`Mob: ${item.mobile}`))
          .append($("<p>").text(`Address: ${item.full_address}`))
          .append($("<span>").text(`Pincode: ${item.pincode}`));

        button.click(() => printAddressCheckout(item));
        button.appendTo(addressContainer);
      })(item);
    });
  }
}

async function getAddressonLoad() {
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;
  const formData = new FormData();
  formData.append("type", "45");
  formData.append("user_id", user_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res;
  data = data.address_list[0];
  printAddressCheckout(data);
}

function printAddressCheckout(data) {
  if (data == undefined) {
    alert("Please provide at least one address.");
    location.href = "address.html";
  }
  $("#cs-name").html(`${data.name}`);
  $("#cs-addr-type").html(`${data.type}`);
  $("#cs-full-addr").html(`${data.full_address}`);
  $("#cs-mob-no").val(`${data.mobile}`);
  $("#cs-pincode").val(`${data.pincode}`);
  localStorage.setItem("address_id", data.id);
  $("#address-change").modal("hide");
  $("#addressModal").modal("hide");
}

// load offers

async function loadOffers() {
  const formData = new FormData();
  formData.append("type", "46");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res;
  data = data.coupan_list;

  let offerContainer = $("#offerContainer");
  offerContainer.html("");

  if (data.length == 0) {
    offerContainer.html(noDataTemplate());
  } else {
    data.forEach((item) => {
      ((item) => {
        let copantxt = item.type == "flat" ? " flat " : " % ";
        let button = $("<button>")
          .addClass("offerbuttonContainer")
          .append(
            $("<div>")
              .addClass("coupan-left")
              .append($("<div>").text(`Enjoy Your Gift`))
          )
          .append(
            $("<div>")
              .addClass("coupan-center")
              .append(
                $("<div>")
                  .append($("<h2>").text(`${item.value} ${copantxt}`))
                  .append($("<h3>").text(`${item.name}`))
                  .append($("<small>").text(`${item.description}`))
              )
          );

        button.click(() => printOfferCheckout(item));
        button.appendTo(offerContainer);
      })(item);
    });
  }
}

function printOfferCheckout(item) {
  // console.log(item);
  localStorage.setItem("offer", `${item.id}--${item.value}--${item.type}`);
  $("#checkout-coupans").modal("hide");
  getInvoiceDetails();
}

// load order function

async function loadOrderList() {
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;

  const formData = new FormData();
  formData.append("type", "48");
  formData.append("user_id", user_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data;

  data.map((item) => {
    $("#orderList").append(orderCardTemplate(item));
  });
}

// order history page
async function loadOrderDetails(order_id) {
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;

  const formData = new FormData();
  formData.append("type", "49");
  formData.append("user_id", user_id);
  formData.append("order_id", order_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res.data[0];
  $("#order-id").val(order_id);

  if (data.FULL_ADDRESS != null) {
    $("#cs-name").html(data.FULL_ADDRESS.name);
    $("#cs-addr-type").html(data.FULL_ADDRESS.type);
    $("#cs-mob-no").html(data.FULL_ADDRESS.mobile);
    $("#cs-full-addr").html(
      data.FULL_ADDRESS.full_address +
      ", pincode : " +
      data.FULL_ADDRESS.pincode
    );
  } else {
    $("#cs-name").html(data.delivery_type);
    $("#cs-addr-type").html(``);
    $("#cs-mob-no").html(`Name : ${data.name}`);
    $("#cs-full-addr").html(``);
  }

  const products = data.products;
  // console.log(products);
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

  let discountText = "";
  let grandTotal = 0;

  let total_price = products.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  )

  if (data.offer_id == "null") {
    discount = 0;
    discountText = "00";
    grandTotal = total_price;
  } else {
    if (data.DISCOUNT_TYPE == "flat") {
      discountText = data.DISCOUNT_VALUE;
      grandTotal = total_price - data.DISCOUNT_VALUE;
    }
    if (data.DISCOUNT_TYPE == "percent") {
      let dv = total_price - total_price * data.DISCOUNT_VALUE * 0.01;
      discountText = dv;
      grandTotal = total_price - dv;
    }
  }

  $("#price-label").html(`Price (items : ${products.length})`);
  $("#total-price").text(` ${total_price}`);
  $("#discount").text(` ${discountText}`);
  $("#grand-total").text(` ${grandTotal}`);

  let cancel_data = res.cancel_data;

  if (cancel_data.status == 0) {
    $("#cancel-btn").hide();
  } else {
    if (Object.hasOwn(cancel_data, "no_of_days")) {
      let no_of_days = cancel_data.no_of_days;
      let order_date = data.date.split(" ")[0];
      if (isDatePassed(order_date, no_of_days)) {
        $("#cancel-btn").hide();
      }
    }
  }

  if (data.ORDER_STATUS != "ORDER PLACED") {
    $("#cancel-btn").hide();
  }
}

// function for checking return date pass or not
function isDatePassed(dateString, no_of_days) {
  const date = new Date(dateString);
  date.setDate(date.getDate() + parseInt(no_of_days));
  const currentDate = new Date();
  return currentDate > date;
}

async function cancelOrderProcess() {
  let order_id = $("#order-id").val();
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;

  const formData = new FormData();
  formData.append("type", "61");
  formData.append("order_id", order_id);
  formData.append("user_id", user_id);
  formData.append("cancelby", "user");

  try {
    let req = await fetch(appAPI, { method: "POST", body: formData });

    if (!req.ok) {
      throw new Error(`HTTP error! Status: ${req.status}`);
    }

    let res = await req.json();
    return res.data;
  } catch (error) { }
}

async function cancelOrder() {
  if (confirm("are you sure?")) {
    let response = await cancelOrderProcess();
    // console.log(response);
    if (response.status == 1) {
      alert(response.msg);
      location.reload();
    } else {
      alert(response.msg);
    }
  } else {
  }
}

function deleteMyAccount() {
  if (confirm("are you sure?")) {
    alert("Your account will be deleted in 7 days.");
  } else {
  }
}

async function getDeliverySlot() {
  const formData = new FormData();
  formData.append("type", "71");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res;
  data = data.data;

  let dlSlotContainer = $("#dlSlotContainer");
  dlSlotContainer.html("");

  if (data.length == 0) {
    dlSlotContainer.html(noDataTemplate());
  } else {
    data.forEach((item) => {
      ((item) => {
        let amount =
          item.payment_type == "FREE"
            ? `<span style="color:green">FREE</span>`
            : `&#8377;. ${item.amount}`;

        let button = $("<button>")
          .addClass("dlSlotContainerBtn")
          .append(
            $("<div>")
              .addClass("slot-left-div")
              .append($("<div>").text(`${item.delivery_slot_name}`))
              .append($("<div>").text(`${item.type_name}`))
          )
          .append(
            $("<div>")
              .addClass("slot-right-div")
              .append($("<div>").html(`${amount}`))
          );

        button.click(() => deliverySlotSelect(item));
        button.appendTo(dlSlotContainer);
      })(item);
    });
  }
}

function deliverySlotSelect(item) {
  localStorage.setItem(
    "delivery_slot_id",
    `${item.id}--${item.amount}--${item.payment_type}`
  );
  localStorage.setItem(
    "selctedSlotname",
    `${item.delivery_slot_name}`
  );
  $("#delivery-slot").val(item.amount);
  $("#delviery-slot-modal").modal("hide");
  getInvoiceDetails();
}

function changeTakeaway(type = "") {
  if (type == "Delivery") {
    $("#d-btn").removeClass("cs-address-chooser-btn");
    $("#t-btn").addClass("cs-address-chooser-btn");
    getAddressonLoad();
    $("#getAddressBtn").show();
    $("#getAddaddressBtn").show();
    $("#deliverySlotBtn").show();
    $("#dSBtn").attr("disabled", false);
    localStorage.removeItem("delivery_slot_id");
  }
  if (type == "Takeaway") {
    getAddressonTakeaway();
    $("#t-btn").removeClass("cs-address-chooser-btn");
    $("#d-btn").addClass("cs-address-chooser-btn");
    $("#getAddressBtn").hide();
    $("#getAddaddressBtn").hide();
    $("#deliverySlotBtn").hide();
    $("#dSBtn").attr("disabled", true);
    localStorage.setItem("delivery_slot_id", "0--0--0");
  }
}

async function getAddressonTakeaway() {
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;

  const formData = new FormData();

  formData.append("type", "45");
  formData.append("user_id", user_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res;

  formData.delete("type");
  formData.delete("user_id");
  formData.append("type", "70");
  let req1 = await fetch(appAPI, { method: "POST", body: formData });
  let res1 = await req1.json();
  let data1 = res1;

  data = data.address_list[0];

  data.full_address = data1.data[0].address;
  data.type = "Shop";
  data.id = "NULL";

  printAddressCheckout(data);
}

function loadProdcutFirstButton() {
  loadProductAllProduct();
}

async function loadUserAddress() {
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;

  const formData = new FormData();
  formData.append("type", "45");
  formData.append("user_id", user_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let data = res;

  data.address_list.map((item) => {
    $("#address-list").append(`
            <div class="box-address1">
                <div class="add1">
                    <span>
                        <button class="but-wala1">${item.type}</button>
                    </span>
                    <span>
                        <button class="same same1"type="button" data-bs-toggle="modal" data-bs-target="#addressModal" 
                            data-bs-aid="${item.id}"
                            data-bs-name="${item.name}"
                            data-bs-full_address="${item.full_address}"
                            data-bs-landmark="${item.landmark}"
                            data-bs-pincode="${item.pincode}"
                            data-bs-mobile="${item.mobile}"
                            data-bs-type="${item.type}"
                        >Edit</button>
                        <button class="same" onclick="deleteAddress(${item.id})">Delete</button>
                    </span> 
                </div>
                <hr>
                <div class="detail-add">
                    <p>Name : ${item.name}</p>
                    <p>Address : ${item.full_address}</p>
                    <p>Landmark : ${item.landmark}</p>
                    <p>Pin : ${item.pincode}</p>
                    <p>Contact No. : ${item.mobile}</p>
                </div>
            </div>
        `);
  });
}

$("#addressModal").on("show.bs.modal", function (event) {
  let button = event.relatedTarget;
  const aid = button.getAttribute("data-bs-aid");
  const name = button.getAttribute("data-bs-name");
  const full_address = button.getAttribute("data-bs-full_address");
  const landmark = button.getAttribute("data-bs-landmark");
  const pincode = button.getAttribute("data-bs-pincode");
  const mobile = button.getAttribute("data-bs-mobile");
  const add_type = button.getAttribute("data-bs-type");

  $("[name=address_id]").val(aid);
  $("[name=name]").val(name);
  $("[name=full_address]").val(full_address);
  $("[name=landmark]").val(landmark);
  $("[name=pincode]").val(pincode);
  $("[name=mobile]").val(mobile);

  if (add_type == "home") {
    $("#add_type_home").prop("checked", true);
    $("#add_type_office").prop("checked", false);
  } else {
    $("#add_type_office").prop("checked", true);
    $("#add_type_home").prop("checked", false);
  }
});

$("#address_submit_modal").submit(async function (e) {
  e.preventDefault();
  let user_id = await db.userdetails.get(1);
  user_id = user_id.user_id;
  const formData = new FormData(this);
  formData.append("type", "74");
  formData.append("user_id", user_id);
  if ($("[name=name]").val() == "" || $("[name=full_address]").val() == "") {
    alert("please fill all field");
  } else {
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    let data = res.data;

    if (data.status == 1) {

      alert(data.msg);
      $("[name=addpanelType]").val() == "checkoutPanel" ? printAddressCheckout(data.lastaddress) : location.reload();

    } else {
      alert(data.msg);
    }
  }
});

async function deleteAddress(id) {
  if (confirm("Are you sure ?")) {
    const formData = new FormData();
    formData.append("type", "75");
    formData.append("address_id", id);
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

async function loadMyprofile() {
  let userdata = await db.userdetails.get(1);

  const formData = new FormData();
  formData.append("type", "91");
  formData.append("uid", userdata.user_id);
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let res = await req.json();
  let { data } = res;
  data = data[0];

  $("#uid").val(userdata.user_id);
  $("#name").val(userdata.name);
  $("#email").val(data.email);
  $("#password").val(data.password);
}

$("#myProfileUpdate").submit(async function (e) {
  e.preventDefault();

  if (confirm("Are you sure ?")) {
    const formData = new FormData(this);
    formData.append("type", "92");
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    let { data } = res;

    if (data.status == 1) {
      await db.userdetails.update(1, { name: $("#name").val() });
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

// order restriction { deliveryStatus  and takeawayStatus = 0 }

async function placeButtonStatus() {
  let takeawayStatus = await db.addons
    .where("name")
    .equals("TAKEAWAY")
    .toArray();
  takeawayStatus = takeawayStatus[0].activation_status;

  let deliveryStatus = await db.addons
    .where("name")
    .equals("DELIVERY")
    .toArray();
  deliveryStatus = deliveryStatus[0].activation_status;

  if (takeawayStatus == 0 && deliveryStatus == 0) {
    $("#plcOrder").html(`Can't place order , Contact admin `);
    $("#plcOrder").attr("disabled", true);
  }
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

  // for scan QR

  const scanBtnQR = document.getElementById("scanBtnQR");
  if (scanBtnQR) scanBtnQR.addEventListener("click", scanQR);

  const scanBtnQR1 = document.getElementById("scanBtnQR1");
  if (scanBtnQR1) scanBtnQR.addEventListener("click", scanQR);

  const scanBtnQR2 = document.getElementById("scanBtnQR2");
  if (scanBtnQR2) scanBtnQR.addEventListener("click", scanQR);

  function scanQR() {
    scan((QRtext) => {
      scanProduct(QRtext);
    });
  }

}

// download and print invoice

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

// theme load

function loadCSS(url) {
  if (url != "app.css") {
    let remove_url = "app.css";

    var links = document.querySelectorAll(
      `link[rel='stylesheet'][href='assets/css/${remove_url}']`
    );
    links.forEach(function (link) {
      link.parentNode.removeChild(link);
    });

    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.type = "text/css";
    link.href = "assets/css/" + url;
    document.head.appendChild(link);
  }
}

function setTheme() {
  if (localStorage.getItem("theme") == null) {
    loadThemeTableSync();
  } else {
    loadCSS(localStorage.getItem("theme"));
  }
}

setTheme();

async function pluginsThirdParty() {
  console.log("3rd party loaded");
}

// extra helper function

// function makeid(length) {
//     let result = '';
//     const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     const charactersLength = characters.length;
//     let counter = 0;
//     while (counter < length) {
//         result += characters.charAt(Math.floor(Math.random() * charactersLength));
//         counter += 1;
//     }
//     return result;
// }

// code for order and minmum order 31-05-2024

async function finalCheckout() {
  // check for delivery slot

  let setdeliverySlotVal = new Promise(async (resolve, reject) => {
    let deliverySlotStatusVal = await getdeliverySlotStatus();

    // remove condition when take away selected { resolve true  hide take away }

    if (deliverySlotStatusVal == 1) {
      let delivery_slot_id = localStorage.getItem("delivery_slot_id");
      if (delivery_slot_id === null) {
        await getDeliverySlot();
        $("#delviery-slot-modal").modal("show");

        $("#delviery-slot-modal").on("hidden.bs.modal", function (e) {
          resolve(true);
        });

        $("#delviery-slot-modal").on("hide.bs.modal", function (e) {
          reject("error");
        });
      } else {
        resolve(true);
      }
    }
  });

  await setdeliverySlotVal;

  // end check for delivery slot

  let userData = await db.userdetails.get(1);

  let cartData = await db.cart.toArray();

  let gstStatus = await db.addons.where("name").equals("GST").toArray();
  gstStatus = gstStatus[0].activation_status;

  let tempList = await Promise.all(
    cartData.map(async (item) => {
      let cgst = await getCGST(item.id);
      let sgst = await getSGST(item.id);

      return {
        ...item,
        pro_id: item.product_id,
        imgs: item.imgs[0],
        name: item.product_nm,
        qty: item.purchase_qty,
        product_cm: "",
        cgst: gstStatus == 1 ? cgst : 0,
        sgst: gstStatus == 1 ? sgst : 0,
      };
    })
  );

  const productList = tempList.map(
    ({
      product_nm,
      product_id,
      purchase_qty,
      cat_id,
      cat_nm,
      product_cm,
      ...rest
    }) => rest
  );

  let date = new Date();

  let order_id =
    "ORD" +
    date.getDate() +
    (date.getMonth() + 1) +
    date.getFullYear() +
    date.getHours() +
    date.getMinutes() +
    date.getSeconds() +
    date.getMilliseconds() +
    userData.user_id;

  let payment_mode = "";
  let temp_payment_status = false;

  const offer_id = localStorage.getItem("offer_id");
  const address_id = localStorage.getItem("address_id");

  let codCheckbox = document.getElementById("codCheckbox");
  let onlineCheckbox = document.getElementById("onlineCheckbox");

  if (codCheckbox.checked) {
    payment_mode = codCheckbox.value;
  }
  if (onlineCheckbox.checked) {
    payment_mode = onlineCheckbox.value;
  }

  let delivery_type =
    address_id == "NULL" ? "Pickup at store" : "Home delivery";

  let mobileno = $("#cs-mob-no").val();
  let pincode = $("#cs-pincode").val();

  let discount = $("#discount").val();
  let delivery_slot = $("#delivery-slot").val();
  let wallet_discount = $("#walletDiscount").val();
  let gst = $("#total-gst").val();
  let total = $("#total-price").val();
  let grandTotal = $("#grand-total").val();
  let savings = $("#savings").val();

  // for wallet
  let customerID = localStorage.getItem("K_id");
  let walletDel = JSON.parse(localStorage.getItem("dynamicWallet"));

  let minOrder = await db.addons.where("name").equals("MIN_ORDER").toArray();
  minOrder = minOrder[0].activation_status;
  // console.log(minOrder);
  if (minOrder == 1) {
    const formData = new FormData();
    formData.append("type", "125");
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let res = await req.json();
    // console.log(res.tbl_value);
    min_purchase = res.tbl_value;
    // console.log(grandTotal);
    if (parseInt(min_purchase) > parseInt(grandTotal)) {
      alert("Minimum Cart value is " + min_purchase);
    } else {
      const formData = new FormData();

      formData.append("order_id", order_id);
      formData.append("mobile", mobileno);
      formData.append("name", userData.name);
      formData.append("address", "NULL");
      formData.append("pincode", pincode);
      formData.append("user_id", userData.user_id);
      formData.append("delivery_type", delivery_type);
      formData.append("payment_mode", payment_mode);
      formData.append("productList", JSON.stringify(productList));
      formData.append("discount_value", discount);
      formData.append("discount_type", "coupan");
      formData.append("address_id", address_id);
      formData.append("offer_id", offer_id);
      formData.append("order_type", "app");
      formData.append("savings", savings);

      formData.append("delivery_slot", delivery_slot);
      formData.append("wallet_discount", wallet_discount);
      formData.append("total", total);
      formData.append("gst", gst);
      formData.append("grandTotal", grandTotal);

      // wallet_update
      formData.append("cusID", customerID);
      formData.append("pre_Code", walletDel.wallet_code);
      formData.append("wallet_status", walletDel.walletstatus);
      formData.append("prv_bal", walletDel.walletBalance);
      // console.log(walletDel.walletstatus);
      // console.log(walletDel.walletBalance);
      // wallet_update
      if (payment_mode == "ONLINE " || payment_mode == "ONLINE") {
        let paymentInitiate = new Promise(async (resolve, reject) => {
          const formData = new FormData();
          formData.append("type", "86");
          let req = await fetch(appAPI, { method: "POST", body: formData });
          let res = await req.json();
          let { data } = res;
          data = data[0];

          let payment_gateway = data.tbl_key;

          if (payment_gateway == "RAZORPAY") {
            let options = {
              key: `${data.tbl_value.split("=")[1]}`,
              name: userData.name,
              currency: "INR",
              amount: grandTotal * 100,
              description: order_id,
              handler: function (response) {
                resolve({
                  status: true,
                  txnId: response.razorpay_payment_id,
                });
              },
              modal: {
                ondismiss: function () {
                  alert("Payment canceled By user");
                  console.log("payment failed due to close modal by user");
                  reject({
                    status: false,
                    txnId: null,
                  });
                },
              },
            };
            let rzp = await new Razorpay(options);
            await rzp.open();
          } else {
            reject({
              status: false,
              txnId: null,
            });
          }
        });

        let { status, txnId } = await paymentInitiate;
        temp_payment_status = status;
        console.log(temp_payment_status, txnId); // ash-bug
        formData.append("transaction_id", txnId);
        formData.append("payemt_status", temp_payment_status);
      } else {
        temp_payment_status = true;
      }

      if (temp_payment_status == false) {
        alert("Payment failed . Choose COD. ");

        formData.append("transaction_id", "");
        formData.append("payemt_status", "false");
      } else {
        formData.append("type", 58); // 47 old type
        let req = await fetch(appAPI, { method: "POST", body: formData });
        let res = await req.json();
        let data = res.data;

        if (data.status == 1) {
          alert("order placed successfully");
          await db.cart.clear();
          await addCartToServer();
          localStorage.removeItem("not_available_products");
          localStorage.removeItem("offer");
          if (localStorage.getItem("walletCalbal") != null) {

            let walletDel = JSON.parse(localStorage.getItem("dynamicWallet"));
            localStorage.setItem("K_wallet", JSON.stringify({
              wallet_code: walletDel.wallet_code,
              walletBalance: 0,
              walletstatus: "credit"
            }));
          }

          localStorage.removeItem('walletCalbal');
          location.href = `invoice.html?id=${data.order_id}`;
        } else {
          alert(data.msg);
          localStorage.setItem(
            "not_available_products",
            data.not_available_products
          );
          location.href = `cart.html`;
        }
      }
    }
  } else {
    const formData = new FormData();

    formData.append("order_id", order_id);
    formData.append("mobile", mobileno);
    formData.append("name", userData.name);
    formData.append("address", "NULL");
    formData.append("pincode", pincode);
    formData.append("user_id", userData.user_id);
    formData.append("delivery_type", delivery_type);
    formData.append("payment_mode", payment_mode);
    formData.append("productList", JSON.stringify(productList));
    formData.append("discount_value", discount);
    formData.append("discount_type", "coupan");
    formData.append("address_id", address_id);
    formData.append("offer_id", offer_id);
    formData.append("order_type", "app");
    formData.append("savings", savings);

    formData.append("delivery_slot", delivery_slot);
    formData.append("wallet_discount", wallet_discount);
    formData.append("total", total);
    formData.append("gst", gst);
    formData.append("grandTotal", grandTotal);

    // wallet_update
    formData.append("cusID", customerID);
    formData.append("pre_Code", walletDel.wallet_code);
    formData.append("wallet_status", walletDel.walletstatus);
    formData.append("prv_bal", walletDel.walletBalance);
    // console.log(walletDel.walletstatus);
    // console.log(walletDel.walletBalance);
    // wallet_update
    if (payment_mode == "ONLINE " || payment_mode == "ONLINE") {
      let paymentInitiate = new Promise(async (resolve, reject) => {
        const formData = new FormData();
        formData.append("type", "86");
        let req = await fetch(appAPI, { method: "POST", body: formData });
        let res = await req.json();
        let { data } = res;
        data = data[0];

        let payment_gateway = data.tbl_key;

        if (payment_gateway == "RAZORPAY") {
          let options = {
            key: `${data.tbl_value.split("=")[1]}`,
            name: userData.name,
            currency: "INR",
            amount: grandTotal * 100,
            description: order_id,
            handler: function (response) {
              resolve({
                status: true,
                txnId: response.razorpay_payment_id,
              });
            },
            modal: {
              ondismiss: function () {
                alert("Payment canceled By user");
                console.log("payment failed due to close modal by user");
                reject({
                  status: false,
                  txnId: null,
                });
              },
            },
          };
          let rzp = await new Razorpay(options);
          await rzp.open();
        } else {
          reject({
            status: false,
            txnId: null,
          });
        }
      });

      let { status, txnId } = await paymentInitiate;
      temp_payment_status = status;
      console.log(temp_payment_status, txnId); // ash-bug
      formData.append("transaction_id", txnId);
      formData.append("payemt_status", temp_payment_status);
    } else {
      temp_payment_status = true;
    }

    if (temp_payment_status == false) {
      alert("Payment failed . Choose COD. ");

      formData.append("transaction_id", "");
      formData.append("payemt_status", "false");
    } else {
      formData.append("type", 58); // 47 old type
      let req = await fetch(appAPI, { method: "POST", body: formData });
      let res = await req.json();
      let data = res.data;

      if (data.status == 1) {
        alert("order placed successfully");
        await db.cart.clear();
        await addCartToServer();
        localStorage.removeItem("not_available_products");
        localStorage.removeItem("offer");
        if (localStorage.getItem("walletCalbal") != null) {

          let walletDel = JSON.parse(localStorage.getItem("dynamicWallet"));
          localStorage.setItem("K_wallet", JSON.stringify({
            wallet_code: walletDel.wallet_code,
            walletBalance: 0,
            walletstatus: "credit"
          }));
        }
        localStorage.removeItem('walletCalbal');
        location.href = `invoice.html?id=${data.order_id}`;
      } else {
        alert(data.msg);
        localStorage.setItem(
          "not_available_products",
          data.not_available_products
        );
        location.href = `cart.html`;
      }
    }
  }
}

// new code my galla v1

// 2024 - june update

function rightSideCartProductTemplate(item) { 

  let not_available_products = localStorage.getItem("not_available_products");
let ofs = not_available_products != null && not_available_products.split(",").includes(item.id) ? "Out Of Stock" : "";


  return `
      <div class="cart-items-box">
        <div class="cart-item-img">
          <img src="${imgLink + item.imgs[0]}" alt="product image" />
        </div>
        <div class="cart-item-text">
          <div class="cart-content">
            <p> ${item.product_nm} </p>
            <small>${item.cat_nm}</small>
            <p><b>₹${item.price}</b><del>₹${item.fprice}</del></p>
            <p style="color: red;">${ofs}</p>
          </div>
          <div class="cart-buttons">
            <button class="minus" onclick='decreaseQty(${JSON.stringify(
    item
  )})'>-</button>
                <input type="text" class="pr_${item.id}"
                    value="${item.purchase_qty == undefined ? 0 : item.purchase_qty
    }" readonly>
            <button class="plus" onclick='increaseQty(${JSON.stringify(
      item
    )})'>+</button>
          </div>
        </div>
      </div>
    `;
}

function rightSideCartProductTotal(cartItem) {

  let total = 0;
  let totalFake = 0;


  cartItem.forEach((item) => {
    // total = total + parseInt(item.price) * item.purchase_qty;
    // totalFake = totalFake + parseInt(item.fprice) * item.purchase_qty;

    total += Number((item.price * item.purchase_qty).toFixed(2));

    // bug test for NaN
    // console.log(item.fprice);

    let x = typeof Number((item.fprice * item.purchase_qty).toFixed(2)) == NaN ? 0 : Number((item.fprice * item.purchase_qty).toFixed(2));

    totalFake += x;

  });
  return `
    <div class="checkout-heading">
      <h2>Bill details</h2>
    </div>
    <div class="item-detail-checkout">
      <div class="checkout-box1">
        <i class="bi bi-receipt"></i>
        <p>item total</p>
        <span>saved ₹ ${(totalFake - total).toFixed(2)}</span>
      </div>
      <div class="checkout-box1 two-box">
        <p><del>₹${totalFake}</del>₹${total}</p>
      </div>
    </div>
    <div class="item-detail-checkout">
      <div class="checkout-box1">
        <i class="bi bi-cash"></i>
        <p>Grand total</p>
      </div>
      <div class="checkout-box1 two-box">
        <p>₹${total}</p>
      </div>
    </div>
    <div class="img-design"></div>
    <div class="contents-cart">
      <p>Your total savings</p>
      <b>₹${(totalFake - total).toFixed(2)}</b>
    </div>
  `;
}


/* <i class="bi bi-geo"></i>
        <div class="ListStrip__TextContainer-sc-kstnas-2 jyJtWQ">
          <div class="ListStrip__Heading-sc-kstnas-3 hykDMK">
            Delivering to ${addressType}
          </div>
          <div class="ListStrip__SubHeading-sc-kstnas-4 dfqXLv proceed-add">
            ${address}
          </div>
        </div> */

function rightSideCartAddressBox() {
  // let addressType = "Home";
  // let address = "Floor R, R Pocket 25, Sector 3, Rohini, Delhi";
  return `
    <div class="cart-footer">
      
      <a href="checkout.html">
        <button>
          Proceed to checkout<i
            class="bi bi-arrow-right-circle"
          ></i></button
      ></a>
    </div>
  `;
}

function rightSideCartNoProduct() {
  return `
        <div class="nothing-cart">
            <p>☹</p>
            <h3>Nothing in Cart</h3>
        </div>
    `;
}

// function rightSideCartTopMsg() {
//   let msg_title = "Delivery in 8 minutes";
//   let msg_body = "Shipment of 1 item";
//   return `
//     <div class="cart-header">
//       <div class="cart-header-img">
//         <img src="assets/img/cart.png" alt="" />
//       </div>
//       <div class="cart-header-text">
//         <p>${msg_title}</p>
//         <small>${msg_body}</small>
//       </div>
//     </div>
//   `;
// }

async function bringtopmsg() {
  const formData = new FormData();
  formData.append("type", "134");
  let req = await fetch(appAPI, { method: "POST", body: formData });
  let data = await req.json();
  localStorage.setItem("headerMsg", data.tbl_value);
  // return JSON.parse(data.tbl_value);
}

function rightSideCartTopMsg() {

  const getmsg = localStorage.getItem("headerMsg");
  if (getmsg == null || getmsg == "undefined") {

    msg_title = "Express Delivery";
    msg_body = "At your doorsteps";

  } else {

    printMsg = JSON.parse(getmsg);
    msg_title = printMsg.First_Msg;
    msg_body = printMsg.Sec_Msg;

  }

  return `
    <div class="cart-header">
      <div class="cart-header-img">
        <img src="assets/img/cart.png" alt="" />
      </div>
      <div class="cart-header-text">
        <p>${msg_title}</p>
        <small>${msg_body}</small>
      </div>
    </div>
  `;
}

async function updateWhishlist(item, thisElem) {
  let heartIcon = thisElem.querySelector("i");

  if (item.wishlist_status == 1) {
    if (confirm("are you sure ?")) {
      heartIcon.classList.replace("bi-heart-fill", "bi-heart");
      await db.wishlist.delete("" + item.id);
      await addWhishlistToServer();
      location.reload();
    }
  } else {
    heartIcon.classList.replace("bi-heart", "bi-heart-fill");
    heartIcon.style.color = "red";
    let loginStatus = await loginCheck();
    if (loginStatus) {
      alert("Whishlist added");
      data = {
        id: item.id,
        var_id: item.id,
        product_id: item.product_id,
        product_nm: item.product_nm,
        cat_id: item.cat_id,
        cat_nm: item.cat_nm,
        product_cm: item.product_cm,
        imgs: item.imgs,
        price: item.price,
        sku: item.sku,
      };
      await db.wishlist.put(data);
      await addWhishlistToServer();
      location.reload();
    } else {
      alert("please login first");
      location.href = "../login.html";
    }
  }
}

// cart functions

async function updateQtyDb(item, prqty) {
  if (prqty == 0) {
    await removeSingleProductFromCart(item.id);
  } else {
    let x = await db.cart.update(item.id, { purchase_qty: prqty });
    if (x == 0) await addToCart(item);
    else await addCartToServer();
  }
}

async function updateQty(item, type) {
  let availableQty = parseInt(item.qty);
  let purchaseQty = parseInt($(`.pr_${item.id}`).val());
  if (availableQty <= 0) {
    alert("Out of stock");
    // return null;
  }
  if (type === "minus") {
    if (purchaseQty > 0) {
      purchaseQty--;
      await updateQtyDb(item, purchaseQty);
    }
  } else if (type === "plus") {
    purchaseQty++;
    if (availableQty < purchaseQty) {
      alert("Purchase limit reached");
      purchaseQty--;
    } else {
      await updateQtyDb(item, purchaseQty);
    }
  }
  // if (purchaseQty === 0) { console.log("purchaseQty"+ purchaseQty);
  //   removeSingleProductFromCart(item.id);
  // }
  $(`.pr_${item.id}`).val(purchaseQty);

  rightSideCartLoad();
}

// qty decrease
function decreaseQty(item) {
  updateQty(item, "minus");
}

// qty increase
function increaseQty(item) {
  updateQty(item, "plus");
}

// variant modal

async function getVariant(product_id, var_id) {
  let prodContainer = $("#prodContainer");
  prodContainer.html(``);

  const data = await db.products
    .where("product_id")
    .equals("" + product_id)
    .toArray();
  const filteredData = data.filter((item) => item.id != var_id);

  if (filteredData.length === 0) {
    prodContainer.html(noDataTemplate());
    return null;
  }

  const productDataPromises = filteredData.map(async (item) => {
    const [dbCart, dbWishlist] = await Promise.all([
      db.cart.get(item.id),
      db.wishlist.get(item.id),
    ]);
    item.purchase_qty = dbCart ? dbCart.purchase_qty : 0;
    item.wishlist_status = dbWishlist ? 1 : 0;
    return productCardTemplate(item, false);
  });

  const productCards = await Promise.all(productDataPromises);
  prodContainer.append(productCards.join(""));
}

function productCardTemplate(item, variant_status = true) {
  let buyBtn = "";
  let heart_s = "";
  let wishlist = "";
  let oos = "";
  let var_btn = "";

  heart_s =
    item.wishlist_status == 1
      ? '<i class="bi bi-heart-fill" style="color:red"></i>'
      : '<i class="bi bi-heart"></i>';
  wishlist =
    localStorage.getItem("customwishlistcheck") == "Hide"
      ? `style = "display: none;"`
      : "";

  if (localStorage.getItem("buynowState") != "Off") {
    buyBtn = `
            <span>
                <button onclick='buyNow(${JSON.stringify(item)})'> Buy </button>
            </span>
        `;
  } else {
    buyBtn = `
            <span>
                <div class="cart-buttons add-product-btn">
                    <button class="minus" onclick='decreaseQty(${JSON.stringify(
      item
    )})'>-</button>
                    <input type="text" class="pr_${item.id}"
                        value="${item.purchase_qty == undefined ? 0 : item.purchase_qty
      }" 
                        readonly>
                    <button class="plus" onclick='increaseQty(${JSON.stringify(
        item
      )})'>+</button>
                </div>
            </span>
        `;
  }

  if (item.qty == 0) {
    buyBtn = "";
    oos = `<span class="oos_class"> <p>Out of stock</p></span>`;
  }

  if (variant_status) {
    var_btn = `
            <button onclick="getVariant(${item.product_id} , ${item.id})" data-bs-toggle="modal" data-bs-target="#variantModal" class="var_btn">
                <i class="bi bi-three-dots"></i>
            </button>
        `;
  }

  return `
        <div class="product-items">
            <div class="product-item-img new-section-update">
                <a onclick="gotoProduct(${item.id})">
                    <img alt="product image" src="${imgLink + item.imgs[0]}"/>
                </a>       
            </div>
            ${oos}
            <div class="item-content">
                <p> ${item.product_nm} </p>
                <div class="varient">
                    <small> ${item.type_qty_1}  ${item.type_name_1} </small>
                    ${var_btn}
                </div>
                <div class="content-buttons">
                    <span> 
                        <del> ₹ ${item.fprice}</del> <br /> 
                        ₹ ${item.price} 
                    </span>
                    ${buyBtn}
                </div>
            </div>
            <span ${wishlist}
                class="Wishlist" 
                onclick='updateWhishlist(${JSON.stringify(item)} , this )'>
                ${heart_s}
            </span>
        </div>
    `;
}

function navOneTemplate() {
  // loginCheck();

  let login_status = localStorage.getItem("K_status");
  let data = localStorage.getItem("navData");
  data = JSON.parse(data);

  if (data == null) getUrlTableSync();
  let htmlStr = '';
  data.forEach(item => {
    if (item.name.length != 0)
      htmlStr += `
        <a href="other.html?id=${item.type}">
            <i class="bi bi-question-diamond"></i>
            <p>${item.name}</p>
        </a>
    `;
  });

  if (login_status == 1) {
    const name = localStorage.getItem("K_name") || "";
    const mobile = localStorage.getItem("K_mobile") || "";
    // const walletAmt = localStorage.getItem("walletAMT") || "";
    // const walletCode = localStorage.getItem("walletCODE") || ""
    const wallet = JSON.parse(localStorage.getItem("K_wallet")) || "";

    return `
            <div class="navbar">
                <div class="nav1">
                    <span>
                        <h2>${name.length != 0 ? name : "Guest"}</h2>
                        <small>${mobile.length != 0 ? mobile : ""}</small>
                    </span>
                    <div class="img-nav">
                        <span>${name.length != 0 ? name.slice(0, 1) : "G"
      }</span>
                    </div>
                </div>
            </div>
            <div class="navbar2">
                 <div class="wallet-nav">
            <div class="wallet-nav-detail">
              <div class="wallet-div1">
                <p>Wallet</p>
                <p>₹${wallet.walletBalance}</p>
              </div>
              <i onclick="sharecode()" class="bi bi-share-fill"></i>
            </div>
              <div class="wallet-refer-div">
                <div class="cover-wallet">     
                <span>Refer Code :</span>
                <input id= "myreferel" value="${wallet.wallet_code}" readonly>
                </div>
                <button class="btn btn-success" onclick="copyreferalcode()">Copy</button>
              </div>
            </div>
                
                <a href="home.html"
                    ><i class="bi bi-house"></i>
                    <p>Home</p>
                </a>
                <a href="wishlist.html"
                    ><i class="bi bi-heart"></i>
                    <p>Wishlist</p>
                </a>
                <a href="order-history.html"
                    ><i class="bi bi-bag-check"></i>
                    <p>My order</p>
                </a>
                <a href="address.html"
                    ><i class="bi bi-house-door"></i>
                    <p>Address</p>
                </a>

                ${htmlStr}

                <a href="#" onclick="logoutUser()"
                    ><i class="bi bi-box-arrow-right"></i>
                    <p>logout</p>
                </a>
            </div>`;
  } else {
    return `
            <div class="navbar">
                <div class="nav1">
                    <span>
                        <h2>Guest</h2>
                        <small></small>
                    </span>
                    <div class="img-nav">
                        <span>G</span>
                    </div>
                </div>
            </div>
            <div class="navbar2">
                <a href="../login.html"
                    ><i class="bi bi-box-arrow-right"></i>
                    <p>not login ? click here</p>
                </a>
                <a href="home.html"
                    ><i class="bi bi-house"></i>
                    <p>Home</p>
                </a>
                ${htmlStr}
            </div>`;
  }
}

function bottomNavTemplate(activePage) {
  return `
        <a href="home.html" 
            class="${activePage === "home" ? "active-class" : ""}">
            <i class="bi bi-house"></i>
            <span>Home</span>
        </a>
        <a href="wishlist.html" 
            class="${activePage === "wishlist" ? "active-class" : ""}">
            <i class="bi bi-heart"></i>
            <span>wishlist</span>
        </a>
        <a href="order-history.html" 
            class="${activePage === "order" ? "active-class" : ""}">
            <i class="bi bi-bag-check"></i>
            <span>My Order</span>
        </a>
        <a href="setting.html" 
            class="${activePage === "profile" ? "active-class" : ""}">
            <i class="bi bi-person"></i>
            <span>Profile</span>
        </a>
    `;
}

function categoryCardTemplate(item) {
  return `
        <div class="category-box" onclick="gotoProductListUseCategory(${item.id
    })">
            <div class="category-box-item-img">
                <a onclick="gotoProductListUseCategory(${item.id})">
                    <img alt="category" src="${imgLink + item.images}" />
                </a>
            </div>
            <div class="category-box-item-text">
                <p> ${item.name} </p>
            </div>
        </div>
    `;
}

function bannerCardTemplate(item) { 
  // return `
  //       <a href="#">
  //         <div class="banner">
  //           <img src="${imgLink + item.img}" alt="${item.id}"/>
  //         </div>
  //       </a>
  //   `;


  // code added for owl carousel


  return `
     <div class="banner"><img src="${imgLink + item.img}"></div>
         
  `;
}

function variantCardTemplate(item) {
  return `
        <button class="selector-box" onclick="gotoProduct(${item.id})">
            <img src="assets/img/discount.png" alt="discount image">
            <p class="discount">
                ${discountPrecentCalculator(item.price, item.fprice)}% OFF
            </p>
            <p> ${item.type_qty_1} ${item.type_name_1} </p> 
            <span>
                <b> &#8377; ${item.price} </b>
                <del> &#8377; ${item.fprice} </del>
            </span>
        </button>
    `;
}

function discountPrecentCalculator(discountedPrice, originalPrice) {
  if (
    !(
      isNaN(originalPrice) ||
      isNaN(discountedPrice) ||
      originalPrice <= 0 ||
      discountedPrice < 0
    )
  ) {
    const discountPercentage =
      ((originalPrice - discountedPrice) / originalPrice) * 100;
    // return discountPercentage.toFixed(2);
    return Math.ceil(discountPercentage);
  }
} 

function productImageSlider(data) { 
  function productdetaildata() {
    const maindata = data
      .map((item) => `<button type="button" onclick="zoomImg('${item.img}')" class="btns btn_box" data-bs-toggle="modal" data-bs-target="#exampleModal"><img id="${item.id}" src="${item.img}" alt="image"> </button>`)
      .join("");

    const SmallData = data
      .map((item) => {
        return `
                <div class="img-item" onclick="taketophoto(${item.id})">
                    <a href="#" data-id="${item.id}">
                        <img id="${item.id}" src="${item.img}" alt="image">
                    </a>
                </div>
            `;
      })
      .join("");

    const displayimg = document.getElementById("imgDisplay");
    const smallimg = document.getElementById("smallimg");
    // displayimg.innerHTML = maindata;

   // _________________________owl carousel code by savage________________________________ 

   displayimg.innerHTML = maindata;

  $('.carousel-main').trigger('destroy.owl.carousel');

  $('.carousel-main').owlCarousel({ 
    items: 1,
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    margin: 10,
    // nav: true,
    dots: true,
    // navText: ['<span class="fas fa-chevron-left fa-2x"></span>','<span class="fas fa-chevron-right fa-2x"></span>'],
  })
  

  $('.carousel-main').trigger('refresh.owl.carousel');

  // _________________________owl carousel code by savage________________________________ 

    if (data.length > 1) {
      smallimg.innerHTML = SmallData;
    }
  }

  productdetaildata();



 


  // const imgs = document.querySelectorAll(".img-select a");
  // const imgBtns = [...imgs];
  // let imgId = 1;

  // imgBtns.forEach((imgItem) => {
  //   imgItem.addEventListener("click", (event) => {
  //     event.preventDefault();
  //     imgId = imgItem.dataset.id;
  //     // slideImage();
  //   });
  // });

  // function slideImage() {
  //   const displayWidth = document.querySelector(
  //     ".owl-stage img"
  //   ).clientWidth;
    
  //  console.log(displayWidth);
  //   // document.querySelector(".owl-stage").style.transform = `translateX(${-(imgId - 1) * displayWidth
  //   //   }px)`;


  // window.addEventListener("resize", slideImage);
}


function zoomImg(i) {
  console.log(i); 
  var zoomimg = document.getElementById('zoomImg');
  zoomimg.src = i;
  
}

async function singleProdTempl(data) { 
  // if ( data == undefined ) await getUrlTableSync();
  let db_pr_qty = await db.cart.get(data.id);
  let getQty = await db.products.get(data.id);
  let getAddedwishlist = await db.wishlist.get(data.id);
  let getCartItem = await db.cart.get(data.id);


  loadWishlisticon = getAddedwishlist == undefined ? `<i class="bi bi-heart"></i>` : ` <i class="bi bi-heart-fill" style="color:red"></i>`;

  wishlist_status = getAddedwishlist == undefined ? 0 : 1;
  purchase_qty = getCartItem == undefined ? 0 : 1;


  data = { ...data, wishlist_status: wishlist_status, purchase_qty: purchase_qty }

  db_pr_qty = db_pr_qty == undefined ? 0 : db_pr_qty.purchase_qty;
  instock = `
        <span>
            <button onclick='buyNow(${JSON.stringify(data)})'> Buy Now </button>
        </span>
        <siv class="cart-buttons add-product-btn">
            <button class="minus" onclick='decreaseQty(${JSON.stringify(
    data
  )})'>-</button>
            <input type="text" class="pr_${data.id}"
                value="${db_pr_qty}" 
                readonly>
                <button class="plus" onclick='increaseQty(${JSON.stringify(
    data
  )})'>+</button>
        </div>
    `;
  outofstock = `
        <span>
            <button onclick='alert("Product Out of Stock")'> Out Of Stock </button>
        </span>
        
    `;

  let images = data.imgs.map((image, i) => ({
    id: i + 1,
    img: imgLink + image,
  }));
  productImageSlider(images);

  $("#category_name").html(` ${data.cat_nm ? data.cat_nm : ""} `);
  $("#product-desc").html(` ${data.description} `);
  $("#prod-brand").html(`Brand - ${data.product_cm ? data.product_cm : "" } `);
  $("#prod-name").html(` ${data.product_nm} `);
  $("#price").html(` &#8377; ${data.price} `);
  $("#fprice").html(` &#8377; ${data.fprice} `);
  $("#wishlistIcon").html(loadWishlisticon);
  $("#wishlistIcon").click(function () {
    updateWhishlist(data, this);
  });

  $("#discout_percent").html(`
        ${discountPrecentCalculator(data.price, data.fprice)}% OFF
    `);

  if (data.type_qty_1 != "") {
    $("#type_1_val").html(` ${data.type_name_1} ${data.type_qty_1}  `);
  }


  if (data.type_qty_2 != "") {
    $("#type_2_val").html(` ${data.type_name_2} ${data.type_qty_2}  `);
  } 

  getQty.qty == 0 ? $("#addToCartSP").html(outofstock) : $("#addToCartSP").html(instock);

  // $("#addToCartSP").html(`
  //       <span>
  //           <button onclick='buyNow(${JSON.stringify(data)})'> Buy Now </button>
  //       </span>
  //       <siv class="cart-buttons add-product-btn">
  //           <button class="minus" onclick='decreaseQty(${JSON.stringify(
  //             data
  //           )})'>-</button>
  //           <input type="text" class="pr_${data.id}"
  //               value="${db_pr_qty}" 
  //               class="pr${data.id}">
  //               <button class="plus" onclick='increaseQty(${JSON.stringify(
  //                 data
  //               )})'>+</button>
  //       </div>
  //   `);

  // load more variant section

  let varidata = await db.products
    .where("product_id")
    .equals("" + data.product_id)
    .toArray();
  varidata = varidata.filter((item) => item.id != data.id);
  if (varidata.length == 0) {
    $("#Variant-text").html(``);
  }
  loadVariantItem(varidata);
}

// print shop name function

async function printShopName() {
  let myShopName = "";

  if (localStorage.getItem("my_shop_name") === null) {
    const formData = new FormData();
    formData.append("type", "124");
    let req = await fetch(appAPI, { method: "POST", body: formData });
    let data = await req.json();
    let { name } = data.data[0];
    localStorage.setItem("my_shop_name", name);
    myShopName = name;
  } else {
    myShopName = localStorage.getItem("my_shop_name");
  }

  $("#my_shop_name").html(myShopName);
  $("#my_shop_name_t").html(myShopName);
}

// load right side cart

async function rightSideCartLoad() {
  let htmlContent = "";
  const [products, cartItems] = await Promise.all([
    db.products.toArray(),
    db.cart.toArray(),
  ]);
  const productMap = new Map(products.map((item) => [item.id, item.qty]));
  if (cartItems.length > 0) { 
    cartItems.forEach((item) => {
      item.qty = productMap.get(item.id) || 0;
    });
    htmlContent += rightSideCartTopMsg();
    htmlContent += cartItems
      .map((item) => rightSideCartProductTemplate(item))
      .join("");
    $("#right-side-cart-total").html(rightSideCartProductTotal(cartItems));
    $("#right-side-cart-address-box").html(rightSideCartAddressBox());
  } else {
    $("#checkout-btn").hide();
    htmlContent = rightSideCartNoProduct();
  }
  $("#right-side-cart").html(htmlContent);
}

async function productCartCreator(product_limit, sort_by) {
   

  const [products, wishlistData, cartItem] = await Promise.all([
    

    // code for unique product by savage
    
    Array.from(new Map((await db.products.limit(product_limit).toArray()).map(item => [item.product_id, item])).values()),
    db.wishlist.toArray(),
    db.cart.toArray(),
  ]); 
    
  if (sort_by == "sort_by_id_asc") {
    products.sort((a, b) => b.id - a.id);
  }

  const wishlistMap = new Map(wishlistData.map((item) => [item.var_id, true]));
  const cartMap = new Map(
    cartItem.map((item) => [item.var_id, item.purchase_qty])
  );

  let productCards = "";

  products.forEach((item) => {
    item["wishlist_status"] = wishlistMap.has(item["id"]) ? 1 : 0;
    item["purchase_qty"] = cartMap.get(item["id"]) || 0;
    productCards += productCardTemplate(item);
  });

  return productCards;
}

async function loadCategoryCreator() {
  let data = await db.categories.toArray();
  const customcatVal = localStorage.getItem("customCat");
  if (customcatVal == "main") {
    data = data.filter((category) => category.parent_id == "0");
  }
  let categoryCards = "";
  data.forEach((item) => {
    categoryCards += categoryCardTemplate(item);
  });
  return categoryCards;
}

// load tranding products

async function loadTrendingSection() {
  let productCards = await productCartCreator(11, "");
  $("#trending_section").append(productCards);
}

// load more product section

async function loadMoreProductSection() {
  let productCards = await productCartCreator(29, "");
  $("#more_product_list").prepend(productCards);
}

// load new product section

async function loadNewProductSection() {
  let productCards = await productCartCreator(11, "sort_by_id_asc");
  $("#new_product_list").prepend(productCards);
}

// load category section

async function loadCategoryHomeOne() {
  let categoryCards = await loadCategoryCreator();
  $("#category_list_one").append(categoryCards);
}

async function loadCategoryHomeTwo() {
  let categoryCards = await loadCategoryCreator();
  $("#category_list_two").append(categoryCards);
}

// load banner

async function loadBanner() {
  let data = await db.banner.toArray();

  const topBanners = data.filter((item) => item.type == "top");
  const bottomBanners = data
    .filter((item) => item.type == "bottom")
    .slice(0, 3);

  const topBanner1 = topBanners.slice(0, 1);
  const topBanner2 = topBanners.slice(1, 4);

  let bannerListOneHTML = "";
  let bannerListTwoHTML = "";
  let bannerListOneHTML22 = "";

  if (topBanner1.length > 0) {
    bannerListOneHTML += `
            <a href="#">
              <div class="banner banner-big">
                <img src="${imgLink + topBanner1[0].img}" alt="${topBanner1[0].id
      }" />
              </div>
            </a>`;
  }

  topBanner2.forEach((item) => (bannerListOneHTML22 += bannerCardTemplate(item)));

  bottomBanners.forEach(
    (item) => (bannerListTwoHTML += bannerCardTemplate(item))
  );

  $("#banner_list_one").append(bannerListOneHTML);
  $("#banner_list_two").append(bannerListTwoHTML);








// _________________________owl carousel code by savage________________________________ 

 // console.log(bannerListOneHTML22);
 $("#autoslide").append(bannerListOneHTML22);

 $('.carousel-main').trigger('destroy.owl.carousel');

 $('.carousel-main').owlCarousel({ 
   items: 1,
   loop: true,
   autoplay: true,
   autoplayTimeout: 3000,
   margin: 5,
   // nav: true,
   dots: false,
   responsive: {
     0: {
       items: 1
     },
     600: {
       items: 3
     },
     1000: {
       items: 5
     }
   }
   // navText: ['<span class="fas fa-chevron-left fa-2x"></span>','<span class="fas fa-chevron-right fa-2x"></span>'],
 })
 

 $('.carousel-main').trigger('refresh.owl.carousel');

  // _________________________owl carousel code by savage________________________________ 
}

// load navbar

async function loadNav(activePage) {
  $("#navone").html(navOneTemplate());
  $("#navtwo").html(bottomNavTemplate(activePage));
}

// load single product

function loadRecentProduct(items) {
  let productCards = "";
  items.forEach((item) => (productCards += productCardTemplate(item)));
  $("#recent_product_list").append(productCards);
}

function loadVariantItem(variant_data) {
  let variantCards = "";
  variant_data.forEach((item) => (variantCards += variantCardTemplate(item)));
  $("#variant_item_data").append(variantCards);
}

async function loadSingleProduct() {
  let id = localStorage.getItem("pid");

  if (getUrlID("pid") != null) {
    if (getUrlID("pid").length > 0) {
      localStorage.setItem("pid", getUrlID("pid"));
      id = localStorage.getItem("pid");
    }
  }

  if (id === null) {
    return undefined;
  } else {
    let data = await db.products.get(`${id}`);
    if (data == undefined) await getUrlTableSync();
    singleProdTempl(data);

    let recentPro = JSON.parse(sessionStorage.getItem("recentPro")) || [];
    let checkduplicate =
      recentPro.filter((items) => items.id == data.id).length > 0;

    if (!checkduplicate) {
      recentPro.push(data);
      sessionStorage.setItem("recentPro", JSON.stringify(recentPro));
    }

    let displayRecent_Pro = JSON.parse(sessionStorage.getItem("recentPro"));
    loadRecentProduct(displayRecent_Pro);
  }
}

function wishlistProductTemplate(item) {
  let btn = "";
  if (parseInt(item.stock) != 0) {
    btn = `
            <button onclick='buyNow(${JSON.stringify(item)})'>
                Add To cart
            </button>
        `;
  } else {
    btn = `
            <span class='oos_class1'>
                <p>Out of stock</p>
            </span>`;
  }
  return `
        <div class="wishlist-items">
            <div class="wishlist-item-img">
                <i class="bi bi-heart-fill" onclick="removeSingleProductFromWL(${item.id
    })"></i>
                <img 
                    src="${imgLink + item.imgs[0]}" 
                    alt="wlimg"
                    onclick="gotoProduct(${item.id})"    
                >
            </div>
            <div class="wishlist-item-content">
            <p onclick="gotoProduct(${item.id})">${item.product_nm}</p>
            <div class="detail-buttons">
                <div class="content1">
                <span class="span-class span-class-new" >  
                    <b>${discountPrecentCalculator(
      item.price,
      item.fprice
    )}%</b>
                    <del>${item.fprice}</del>  
                    <p>Rs ${item.price}</p>
                </span>
                </div>
                <div class="content1">
                    ${btn}
                </div>
            </div>
            </div>
        </div>
    `;
}

async function loadWishlist() {
  let items = await db.wishlist.toArray();

  if (items.length === 0) {
    $("#wishlistRes").append(noDataTemplate());
    return;
  }

  let productIds = items.map((item) => "" + item.product_id);
  let products = await db.products
    .where("product_id")
    .anyOf(productIds)
    .toArray();

  let productMap = new Map();
  products.forEach((product) => {
    productMap.set(product.product_id, product);
  });

  let htmlContent = items
    .map((item) => {
      let product = productMap.get(item.product_id);
      if (product) {
        item.stock = product.qty;
        item.fprice = product.fprice;
        item.wishlist_status = 1;
        return wishlistProductTemplate(item);
      }
    })
    .join("");

  $("#wishlistRes").append(htmlContent);
}

async function customwishlistcheck() {
  const formData = new FormData();
  formData.append("type", "103");
  req = await fetch(appAPI, { method: "POST", body: formData });
  res = await req.json();
  data = res[0].tbl_value;
  localStorage.setItem("customwishlistcheck", data);
}

async function buyNow(item) {
  const res = await addToCart(item);
  if (res == 1) location.href = "checkout.html";
}

async function addToCart(item) {
  let loginStatus = await loginCheck();

  if (loginStatus) {
    if (item.qty != 0) {
      let data = {
        id: item.id,
        var_id: item.id,
        product_id: item.product_id,
        product_nm: item.product_nm,
        cat_id: item.cat_id,
        cat_nm: item.cat_nm,
        product_cm: item.product_cm,
        imgs: item.imgs,
        price: item.price,
        sku: item.sku,
        purchase_qty: 1,
        fprice: item.fprice,
      };

      await db.cart.put(data);
      await addCartToServer();
      loadCartCount();
      alert("cart added");
      return 1;
    } else {
      alert("out of stock");
      return 0;
    }
  } else {
    alert("please login first");
    location.href = "../login.html";
  }
}

// all product page

async function loadcatgSlider() {


  let ctid = localStorage.getItem("ctid");
  let data = [];

  if (getUrlID("cid") != null) {
    if (getUrlID("cid").length > 0) {
      localStorage.setItem("cid", getUrlID("cid"));
      localStorage.setItem("ctid", getUrlID("cid"));
      id = localStorage.getItem("ctid");
      ctid = localStorage.getItem("ctid");
    }
  } else {
    localStorage.setItem("cid", 0);
    localStorage.setItem("ctid", 0);
    id = localStorage.getItem("ctid");
    ctid = localStorage.getItem("ctid");
  }



  if (ctid === null || ctid == 0) {
    data = await db.categories.where("parent_id").equals("0").toArray();
  } else {
    // console.log(ctid, id);
    data = await db.categories.where("parent_id").equals(ctid).toArray();
    // console.log("length", data.length);
    if (data.length == 0) await getUrlTableSync();
    // console.log(data);

    let main_catg = await db.categories.where("id").equals(ctid).toArray();
    // console.log(main_catg);
    main_catg = main_catg[0];
    $("#main_catg_name").html(`Back`);
    $("#main_catg_img").attr("src", `assets/img/back.png`);
    $("#main_catg_div").attr(
      "onclick",
      "gotoProductListUseCategory(" + main_catg.parent_id + ")"
    );
  }


  let catgContainer = $("#catgContainer");

  data.forEach((item) => {
    ((item) => {
      let button = $("<button>")
        .addClass("catgbuttonContainer")
        .append(
          $("<img>")
            .attr("src", imgLink + item.images)
            .attr("alt", "Image")
        )
        .append($("<span>").addClass("buttonText").text(`${item.name}`));

      button.click(() => gotoProductListUseCategory(item.id));
      button.appendTo(catgContainer);
    })(item);
  });
}

function productCardTemplate2nd(item) {
  let buyBtn = "";
  let heart_s = "";
  let wishlist = "";
  let oos = "";
  let var_btn = "";

  heart_s =
    item.wishlist_status == 1
      ? '<i class="bi bi-heart-fill" style="color:red"></i>'
      : '<i class="bi bi-heart"></i>';
  wishlist =
    localStorage.getItem("customwishlistcheck") == "Hide"
      ? `style = "display: none;"`
      : "";

  if (localStorage.getItem("buynowState") != "Off") {
    buyBtn = `
            <span>
                <button onclick='buyNow(${JSON.stringify(item)})'> Buy </button>
            </span>
        `;
  } else {
    buyBtn = `
            <span>
                <div class="cart-buttons add-product-btn">
                    <button class="minus" onclick='decreaseQty(${JSON.stringify(
      item
    )})'>-</button>
                    <input type="text" class="pr_${item.id}"
                        value="${item.purchase_qty == undefined ? 0 : item.purchase_qty
      }" 
                        readonly>
                    <button class="plus" onclick='increaseQty(${JSON.stringify(
        item
      )})'>+</button>
                </div>
            </span>
        `;
  }

  if (item.qty == 0) {
    buyBtn = "";
    oos = `<span class="oos_class"><p>Out of stock</p></span>`;
  }

  var_btn = `
        <button onclick="getVariant(${item.product_id} , ${item.id})" data-bs-toggle="modal" data-bs-target="#variantModal" class="var_btn">
            <i class="bi bi-three-dots"></i>
        </button>
    `;

  return `
        <div class="product-items">
            <div class="product-item-img new-section-update">
              <div class="svg-box" data-pf="reset">
                <svg
                  width="40"
                  height="40"
                  viewBox="0 0 29 28"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.9499 0C28.3999 0 27.9361 1.44696 27.9361 2.60412V27.9718L24.5708 25.9718L21.2055 27.9718L17.8402 25.9718L14.4749 27.9718L11.1096 25.9718L7.74436 27.9718L4.37907 25.9718L1.01378 27.9718V2.6037C1.01378 1.44655 0.549931 0 0 0H28.9499Z"
                    fill="#256fef"
                  ></path>
                </svg>
                <div class="svg-text" data-pf="reset">
                    ${discountPrecentCalculator(item.price, item.fprice)}% OFF
                </div>
              </div>
                <span ${wishlist} 
                    onclick='updateWhishlist(${JSON.stringify(item)} , this )'>
                    ${heart_s}
                </span>
              <a onclick="gotoProduct(${item.id})">
                <img src="${imgLink + item.imgs[0]}" alt="product iamge"/>
              </a>
            </div>
                ${oos}
            <div class="item-content">
                <p> ${item.product_nm} </p>
                <small> ${item.type_qty_1}  ${item.type_name_1} </small>
                ${var_btn}
              <div class="content-buttons">
                <span>
                  Rs. ${item.price} <br />
                  <del>Rs. ${item.fprice}</del>
                </span>
                ${buyBtn}
              </div>
            </div>
        </div>
    `;
}

async function loadCategoryOnId(id) {
  let products = await db.products.toArray();
  let catIds = await createCtegoryTree(id);
  catIds.push(id);
  data = products.filter((item) => catIds.includes(item.cat_id));
  return data;
}

async function loadProductAllProduct() {
  let data = [];
  let id = localStorage.getItem("cid");

  if (getUrlID("cid") != null) {
    if (getUrlID("cid").length > 0) {
      localStorage.setItem("cid", getUrlID("cid"));
      localStorage.setItem("ctid", getUrlID("cid"));
      id = localStorage.getItem("cid");
    }
  }

  if (id !== null) {
    data = await loadCategoryOnId(id);
  } else {
    data = await db.products.toArray();
  }

  if (data.length === 0) {
    $("#loadAllProduct").append(noDataTemplate());
    return;
  }

  const [wishlistData, cartItem] = await Promise.all([
    db.wishlist.toArray(),
    db.cart.toArray(),
  ]);

  const wishlistMap = new Map(wishlistData.map((item) => [item.var_id, true]));
  const cartMap = new Map(
    cartItem.map((item) => [item.var_id, item.purchase_qty])
  );

  data = data.map((item) => ({
    ...item,
    wishlist_status: wishlistMap.has(item.id) ? 1 : 0,
    purchase_qty: cartMap.get(item.id) || 0,
  }));

  let uniquePids = new Set();
  let newData = data.filter((item) => {
    if (uniquePids.has(item.product_id)) {
      return false;
    } else {
      uniquePids.add(item.product_id);
      return true;
    }
  });

  newData.sort((a, b) => b.id - a.id);
  const productCards = newData
    .map((item) => productCardTemplate2nd(item))
    .join("");

  $("#loadAllProduct").append(productCards);
  // localStorage.removeItem("cid");
}

function getUrlID(name = "id") {
  const urlSearchParams = new URLSearchParams(window.location.search);
  return urlSearchParams.get(name);
}

function deleteMyAccount() {
  alert('your account deleted in 15 days');
}

// new code

loadSettingData();

(async function () {
  if (localStorage.getItem("navData") == null) {
    const formdata = new FormData();
    formdata.append("type", "119");
    const req = await fetch(appAPI, { method: "POST", body: formdata });
    const res = await req.json();
    data = res.data;
    localStorage.setItem("navData", JSON.stringify(data));
  }

  // if (localStorage.getItem("K_status") == "1" && localStorage.getItem("K_type") == "1") {

  //   await loadCartFromserver();
  //   await loadCartCount();

  // }
})();

function check_login() {

  if (localStorage.getItem("K_type") !== "1" && localStorage.getItem("K_status") !== "1") {
    location.href = "../login.html";
  }

}


async function loadwalletdata() {

  const k_id = localStorage.getItem("K_id");
  if (k_id != null) {
    const formdata = new FormData();
    formdata.append("type", "123");
    formdata.append("id", k_id);
    const req = await fetch(appAPI, { method: "POST", body: formdata });
    const res = await req.json();
    data = JSON.parse(res.wallet);
    // console.log(data);
    if (data.wallet_code == '' || res.wallet == 0) {
      $("#setrefercode").removeClass("d-none");
    }

    localStorage.setItem("walletCODE", data.wallet_code);
    localStorage.setItem("walletAMT", data.walletBalance);
    // localStorage.setItem("K_wallet",res.wallet);
    // $("#walletCode").val(data.wallet_code);
    // // $("#walletbal").val(data.walletBalance);
    // $("#walletbal").html(data.walletBalance);
  }


}

// const generateRandomCode = (length) => {
//           const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//           let code = '';

//           for (let i = 0; i < length; i++) {
//               const randomIndex = Math.floor(Math.random() * characters.length);
//               code += characters[randomIndex];
//           }

//           return code;
//       }
//       const generateCode = () => {
//           randomcode = generateRandomCode(6);
//           $("#refercodegen").val(randomcode);
//       }



//       $("#setrefercode").on("submit",async function(e){
//             e.preventDefault();
//             const k_id = localStorage.getItem("K_id");
//             const formdata = new FormData(this);
//             formdata.append("type", "131");
//             formdata.append("id", k_id);
//             const req = await fetch(appAPI, { method: "POST", body: formdata });
//             const res = await req.json();
//             console.log(res);
//             alert(res.data.msg);
//             location.reload();
//       })

function sharecode() {

  getCode = $("#walletCode").val();
  window.plugins.socialsharing.share('Download App from playstore. Use code at signup for exicting offers. CODE -' + getCode, null, null, 'https://play.google.com/store/apps/details?id=' + appID);
}



function copyreferalcode() {

  var copyText = document.getElementById("myreferel");
  // var copyText2 = copyText.innerHTML;

  copyText.select();
  copyText.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(copyText.value);
  alert("Code Copied");

}

async function getUrlTableSync() {

  let data = await db.tablecheck.toArray();
  if (data.length == 0) {
    await TableSync();
    //  alert();
    location.reload();
  }
}