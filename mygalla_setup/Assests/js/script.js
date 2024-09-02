function loading() {
    var loadingValue = document.getElementById('loadingValue');

}


let start = 0;

const progressVal = (end) => {
  for (let i = start; i <= end; i++) {
    setTimeout(() => {
      $("#loadingValue").html(i + "%");
      $("#prostate")
        .attr("aria-valuenow", i)
        .css("width", i + "%");
    }, (i - start) * 20);
  }
  start = end;
};

setTimeout(() => progressVal(25), 3000);
setTimeout(() => progressVal(50), 6000);
setTimeout(() => progressVal(75), 9000);
setTimeout(() => progressVal(100), 12000);


/////////////////// Index page js///////////////////////// 
/////////////////// Index page js///////////////////////// 


function bannerTemplate() {
    const banneritem = document.getElementById('banners');
    const bannerData = [
        {"imgsrc" : "Assests/img/banner1.png"},
        {"imgsrc" : "Assests/img/banner2.png"},
        {"imgsrc" : "Assests/img/banner3.png"},
        {"imgsrc" : "Assests/img/banner4.png"},
        {"imgsrc" : "Assests/img/banner5.png"}
    ]
     bannerData.map(item =>{
        banneritem.innerHTML +=`
        <div class="banner_input_box">
           <input type="checkbox">
           <div class="banner_inp_img">
               <img src="${item.imgsrc}" alt="">
            </div>
            </div>
            `
     });
}

function logoTemplate() {
    const logoitem = document.getElementById('logos');
    const logoData = [
        {"imgsrc" : "Assests/img/logo1.png"},
        {"imgsrc" : "Assests/img/logo2.png"},
        {"imgsrc" : "Assests/img/logo3.png"},
        {"imgsrc" : "Assests/img/logo4.png"},
        {"imgsrc" : "Assests/img/logo5.png"}
    ]
     logoData.map(item =>{
        logoitem.innerHTML +=`
          <div class="logo_input_box">
               <input type="checkbox">
               <div class="logo_inp_img">
                     <img src="${item.imgsrc}" alt="">
                </div>
             </div>
            `
     });
}

function categoryTemplate() {
    const categoryitem = document.getElementById('category');
    const categoryData = [
        {
          "imgsrc" : "Assests/img/grocery1.png",
          "name" : "Grocery"
        },
        {
            "imgsrc" : "Assests/img/grocery2.png",
            "name" : "Grocery"
        },
        {
            "imgsrc" : "Assests/img/grocery3.png",
            "name" : "Grocery"
        },
        {
            "imgsrc" : "Assests/img/grocery4.png",
            "name" : "Grocery"
        },
        {
            "imgsrc" : "Assests/img/grocery5.png",
            "name" : "Grocery"
        },
        {
            "imgsrc" : "Assests/img/grocery6.png",
            "name" : "Grocery"
        },
        {
            "imgsrc" : "Assests/img/grocery7.png",
            "name" : "Grocery"
        }
    ]
    categoryData.map(item =>{
        categoryitem.innerHTML +=`
                 <div class="logo_input_box">
                    <input type="checkbox">
                    <div class="logo_inp_img">
                        <img src="${item.imgsrc}" alt="">
                    </div>
                    <p>${item.name}</p>
                </div>            `
     });
}

function themeTemplate() {
    const themesitem = document.getElementById('themes');
    const themesData = [
        {"imgsrc" : "Assests/img/view1.png"},
        {"imgsrc" : "Assests/img/view2.png"},
        {"imgsrc" : "Assests/img/view3.png"},
        {"imgsrc" : "Assests/img/view4.png"}
    ]
     themesData.map(item =>{
        themesitem.innerHTML +=`
           <div class="theme1_section">
               <img src="${item.imgsrc}" alt="">
           </div>
            `
     });
}
/////////////////// Index page js///////////////////////// 
/////////////////// Index page js///////////////////////// 