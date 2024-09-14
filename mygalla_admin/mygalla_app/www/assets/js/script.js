const product_data = [
  {
    id: 1,
    status: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 3.9,
      count: 120,
    },
  },
  {
    id: 2,
    status: 1,
    title: "Mens Casual Premium Slim Fit T-Shirts ",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    fakePrice: 100,
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
    rating: {
      rate: 4.1,
      count: 259,
    },
  },
  {
    id: 3,
    status: 1,
    title: "Mens Cotton Jacket",
    price: 55.99,
    description:
      "great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.",
    category: "men's clothing",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg",
    rating: {
      rate: 4.7,
      count: 500,
    },
  },
  {
    id: 4,
    status: 1,
    title: "Mens Casual Slim Fit",
    price: 15.99,
    description:
      "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
    category: "men's clothing",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    rating: {
      rate: 2.1,
      count: 430,
    },
  },
  {
    id: 5,
    status: 1,
    title:
      "John Hardy Women's Legends Naga Gold & Silver Dragon Station Chain Bracelet",
    price: 695,
    description:
      "From our Legends Collection, the Naga was inspired by the mythical water dragon that protects the ocean's pearl. Wear facing inward to be bestowed with love and abundance, or outward for protection.",
    category: "jewelery",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/71pWzhdJNwL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 4.6,
      count: 400,
    },
  },
  {
    id: 6,
    status: 0,
    title: "Solid Gold Petite Micropave ",
    price: 168,
    description:
      "Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.",
    category: "jewelery",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3.9,
      count: 70,
    },
  },
  {
    id: 7,
    status: 1,
    title: "White Gold Plated Princess",
    price: 9.99,
    description:
      "Classic Created Wedding Engagement Solitaire Diamond Promise Ring for Her. Gifts to spoil your love more for Engagement, Wedding, Anniversary, Valentine's Day...",
    category: "jewelery",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/71YAIFU48IL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 3,
      count: 400,
    },
  },
  {
    id: 8,
    status: 1,
    title: "Pierced Owl Rose Gold Plated Stainless Steel Double",
    price: 10.99,
    description:
      "Rose Gold Plated Double Flared Tunnel Plug Earrings. Made of 316L Stainless Steel",
    category: "jewelery",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/51UDEzMJVpL._AC_UL640_QL65_ML3_.jpg",
    rating: {
      rate: 1.9,
      count: 100,
    },
  },
  {
    id: 9,
    status: 1,
    title: "WD 2TB Elements Portable External Hard Drive - USB 3.0 ",
    price: 64,
    description:
      "USB 3.0 and USB 2.0 Compatibility Fast data transfers Improve PC Performance High Capacity; Compatibility Formatted NTFS for Windows 10, Windows 8.1, Windows 7; Reformatting may be required for other operating systems; Compatibility may vary depending on user’s hardware configuration and operating system",
    category: "electronics",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_.jpg",
    rating: {
      rate: 3.3,
      count: 203,
    },
  },
  {
    id: 10,
    status: 0,
    title: "SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s",
    price: 109,
    description:
      "Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)",
    category: "electronics",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 470,
    },
  },
  {
    id: 11,
    status: 1,
    title:
      "Silicon Power 256GB SSD 3D NAND A55 SLC Cache Performance Boost SATA III 2.5",
    price: 109,
    description:
      "3D NAND flash are applied to deliver high transfer speeds Remarkable transfer speeds that enable faster bootup and improved overall system performance. The advanced SLC Cache Technology allows performance boost and longer lifespan 7mm slim design suitable for Ultrabooks and Ultra-slim notebooks. Supports TRIM command, Garbage Collection technology, RAID, and ECC (Error Checking & Correction) to provide the optimized performance and enhanced reliability.",
    category: "electronics",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/71kWymZ+c+L._AC_SX679_.jpg",
    rating: {
      rate: 4.8,
      count: 319,
    },
  },
  {
    id: 12,
    status: 0,
    title:
      "WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive",
    price: 114,
    description:
      "Expand your PS4 gaming experience, Play anywhere Fast and easy, setup Sleek design with high capacity, 3-year manufacturer's limited warranty",
    category: "electronics",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_.jpg",
    rating: {
      rate: 4.8,
      count: 400,
    },
  },
  {
    id: 13,
    status: 1,
    title: "Acer SB220Q bi 21.5 inches Full HD (1920 x 1080) IPS Ultra-Thin",
    price: 599,
    description:
      "21. 5 inches Full HD (1920 x 1080) widescreen IPS display And Radeon free Sync technology. No compatibility for VESA Mount Refresh Rate: 75Hz - Using HDMI port Zero-frame design | ultra-thin | 4ms response time | IPS panel Aspect ratio - 16: 9. Color Supported - 16. 7 million colors. Brightness - 250 nit Tilt angle -5 degree to 15 degree. Horizontal viewing angle-178 degree. Vertical viewing angle-178 degree 75 hertz",
    category: "electronics",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg",
    rating: {
      rate: 2.9,
      count: 250,
    },
  },
  {
    id: 14,
    status: 0,
    title:
      "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor (LC49HG90DMNXZA) – Super Ultrawide Screen QLED ",
    price: 999.99,
    description:
      "49 INCH SUPER ULTRAWIDE 32:9 CURVED GAMING MONITOR with dual 27 inch screen side by side QUANTUM DOT (QLED) TECHNOLOGY, HDR support and factory calibration provides stunningly realistic and accurate color and contrast 144HZ HIGH REFRESH RATE and 1ms ultra fast response time work to eliminate motion blur, ghosting, and reduce input lag",
    category: "electronics",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg",
    rating: {
      rate: 2.2,
      count: 140,
    },
  },
  {
    id: 15,
    status: 1,
    title: "BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats",
    price: 56.99,
    description:
      "Note:The Jackets is US standard size, Please choose size as your usual wear Material: 100% Polyester; Detachable Liner Fabric: Warm Fleece. Detachable Functional Liner: Skin Friendly, Lightweigt and Warm.Stand Collar Liner jacket, keep you warm in cold weather. Zippered Pockets: 2 Zippered Hand Pockets, 2 Zippered Pockets on Chest (enough to keep cards or keys)and 1 Hidden Pocket Inside.Zippered Hand Pockets and Hidden Pocket keep your things secure. Humanized Design: Adjustable and Detachable Hood and Adjustable cuff to prevent the wind and water,for a comfortable fit. 3 in 1 Detachable Design provide more convenience, you can separate the coat and inner as needed, or wear it together. It is suitable for different season and help you adapt to different climates",
    category: "women's clothing",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg",
    rating: {
      rate: 2.6,
      count: 235,
    },
  },
  {
    id: 16,
    status: 1,
    title:
      "Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket",
    price: 29.95,
    description:
      "100% POLYURETHANE(shell) 100% POLYESTER(lining) 75% POLYESTER 25% COTTON (SWEATER), Faux leather material for style and comfort / 2 pockets of front, 2-For-One Hooded denim style faux leather jacket, Button detail on waist / Detail stitching at sides, HAND WASH ONLY / DO NOT BLEACH / LINE DRY / DO NOT IRON",
    category: "women's clothing",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_.jpg",
    rating: {
      rate: 2.9,
      count: 340,
    },
  },
  {
    id: 17,
    status: 1,
    title: "Rain Jacket Women Windbreaker Striped Climbing Raincoats",
    price: 39.99,
    description:
      "Lightweight perfet for trip or casual wear---Long sleeve with hooded, adjustable drawstring waist design. Button and zipper front closure raincoat, fully stripes Lined and The Raincoat has 2 side pockets are a good size to hold all kinds of things, it covers the hips, and the hood is generous but doesn't overdo it.Attached Cotton Lined Hood with Adjustable Drawstrings give it a real styled look.",
    category: "women's clothing",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2.jpg",
    rating: {
      rate: 3.8,
      count: 679,
    },
  },
  {
    id: 18,
    status: 0,
    title: "MBJ Women's Solid Short Sleeve Boat Neck V ",
    price: 9.85,
    description:
      "95% RAYON 5% SPANDEX, Made in USA or Imported, Do Not Bleach, Lightweight fabric with great stretch for comfort, Ribbed on sleeves and neckline / Double stitching on bottom hem",
    category: "women's clothing",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_.jpg",
    rating: {
      rate: 4.7,
      count: 130,
    },
  },
  {
    id: 19,
    status: 0,
    title: "Opna Women's Short Sleeve Moisture",
    price: 7.95,
    description:
      "100% Polyester, Machine wash, 100% cationic polyester interlock, Machine Wash & Pre Shrunk for a Great Fit, Lightweight, roomy and highly breathable with moisture wicking fabric which helps to keep moisture away, Soft Lightweight Fabric with comfortable V-neck collar and a slimmer fit, delivers a sleek, more feminine silhouette and Added Comfort",
    category: "women's clothing",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_.jpg",
    rating: {
      rate: 4.5,
      count: 146,
    },
  },
  {
    id: 20,
    status: 1,
    title: "DANVOUY Womens T Shirt Casual Cotton Short",
    price: 12.99,
    description:
      "95%Cotton,5%Spandex, Features: Casual, Short Sleeve, Letter Print,V-Neck,Fashion Tees, The fabric is soft and has some stretch., Occasion: Casual/Office/Beach/School/Home/Street. Season: Spring,Summer,Autumn,Winter.",
    category: "women's clothing",
    fakePrice: 100,
    image: "https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_.jpg",
    rating: {
      rate: 3.6,
      count: 145,
    },
  },
];

const product_data_single = {
  id: 1,
  title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
  price: 109.95,
  description:
    "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
  category: "men's clothing",
  image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  rating: {
    rate: 3.9,
    count: 120,
  },
};

const category_data = [
  {
    id: "1",
    slug: "beauty",
    name: "Beauty",
    url: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-12/paan-corner_web.png",
  },
  {
    id: "2",
    slug: "fragrances",
    name: "Fragrances",
    url: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-2_10.png",
  },
  {
    id: "3",
    slug: "furniture",
    name: "Furniture",
    url: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-3_9.png",
  },
  {
    id: "4",
    slug: "groceries",
    name: "Groceries",
    url: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-11/Slice-4_9.png",
  },
  {
    id: "5",
    slug: "home-decoration",
    name: "Home Decoration",
    url: "https://cdn.dummyjson.com/products/images/home-decoration/Decoration%20Swing/thumbnail.png",
  },
  {
    id: "6",
    slug: "kitchen-accessories",
    name: "Kitchen Accessories",
    url: "https://cdn.dummyjson.com/products/images/kitchen-accessories/Bamboo%20Spatula/thumbnail.png",
  },
  {
    id: "7",
    slug: "laptops",
    name: "Laptops",
    url: "https://dummyjson.com/products/category/laptops",
  },
  {
    id: "8",
    slug: "mens-shirts",
    name: "Mens Shirts",
    url: "https://dummyjson.com/products/category/mens-shirts",
  },
  {
    id: "9",
    slug: "mens-shoes",
    name: "Mens Shoes",
    url: "https://dummyjson.com/products/category/mens-shoes",
  },
  {
    id: "10",
    slug: "mens-watches",
    name: "Mens Watches",
    url: "https://dummyjson.com/products/category/mens-watches",
  },
  {
    id: "11",
    slug: "mobile-accessories",
    name: "Mobile Accessories",
    url: "https://dummyjson.com/products/category/mobile-accessories",
  },
  {
    id: "12",
    slug: "motorcycle",
    name: "Motorcycle",
    url: "https://dummyjson.com/products/category/motorcycle",
  },
  {
    id: "13",
    slug: "skin-care",
    name: "Skin Care",
    url: "https://dummyjson.com/products/category/skin-care",
  },
  {
    id: "14",
    slug: "smartphones",
    name: "Smartphones",
    url: "https://dummyjson.com/products/category/smartphones",
  },
  {
    id: "15",
    slug: "sports-accessories",
    name: "Sports Accessories",
    url: "https://dummyjson.com/products/category/sports-accessories",
  },
  {
    id: "16",
    slug: "sunglasses",
    name: "Sunglasses",
    url: "https://dummyjson.com/products/category/sunglasses",
  },
  {
    id: "17",
    slug: "tablets",
    name: "Tablets",
    url: "https://cdn.dummyjson.com/products/images/tablets/iPad%20Mini%202021%20Starlight/thumbnail.png",
  },
  {
    id: "18",
    slug: "tops",
    name: "Tops",
    url: "https://dummyjson.com/products/category/tops",
  },
  {
    id: "19",
    slug: "vehicle",
    name: "Vehicle",
    url: "https://dummyjson.com/products/category/vehicle",
  },
  {
    id: "20",
    slug: "womens-bags",
    name: "Womens Bags",
    url: "https://dummyjson.com/products/category/womens-bags",
  },
  {
    id: "21",
    slug: "womens-dresses",
    name: "Womens Dresses",
    url: "https://dummyjson.com/products/category/womens-dresses",
  },
  {
    id: "22",
    slug: "womens-jewellery",
    name: "Womens Jewellery",
    url: "https://dummyjson.com/products/category/womens-jewellery",
  },
  {
    id: "23",
    slug: "womens-shoes",
    name: "Womens Shoes",
    url: "https://dummyjson.com/products/category/womens-shoes",
  },
  {
    id: "24",
    slug: "womens-watches",
    name: "Womens Watches",
    url: "https://dummyjson.com/products/category/womens-watches",
  },
];

const user_data = [
  {
    address: {
      geolocation: {
        lat: "-37.3159",
        long: "81.1496",
      },
      city: "kilcoole",
      street: "new road",
      number: 7682,
      zipcode: "12926-3874",
    },
    id: 1,
    type: 3,
    date: "09.12.2023",
    email: "john@gmail.com",
    username: "johnd",
    password: "m38rmF$",
    name: {
      firstname: "john",
      lastname: "doe",
    },
    phone: "1-570-236-7033",
    __v: 0,
  },
  {
    address: {
      geolocation: {
        lat: "-37.3159",
        long: "81.1496",
      },
      city: "kilcoole",
      street: "Lovers Ln",
      number: 7267,
      zipcode: "12926-3874",
    },
    id: 2,
    type: 4,
    date: "09.12.2023",
    email: "morrison@gmail.com",
    username: "mor_2314",
    password: "83r5^_",
    name: {
      firstname: "david",
      lastname: "morrison",
    },
    phone: "1-570-236-7033",
    __v: 0,
  },
  {
    address: {
      geolocation: {
        lat: "40.3467",
        long: "-30.1310",
      },
      city: "Cullman",
      street: "Frances Ct",
      number: 86,
      zipcode: "29567-1452",
    },
    id: 3,
    type: 4,
    date: "10.12.2023",
    email: "kevin@gmail.com",
    username: "kevinryan",
    password: "kev02937@",
    name: {
      firstname: "kevin",
      lastname: "ryan",
    },
    phone: "1-567-094-1345",
    __v: 0,
  },
  {
    address: {
      geolocation: {
        lat: "50.3467",
        long: "-20.1310",
      },
      city: "San Antonio",
      street: "Hunters Creek Dr",
      number: 6454,
      zipcode: "98234-1734",
    },
    id: 4,
    type: 3,
    date: "09.12.2023",
    email: "don@gmail.com",
    username: "donero",
    password: "ewedon",
    name: {
      firstname: "don",
      lastname: "romer",
    },
    phone: "1-765-789-6734",
    __v: 0,
  },
  {
    address: {
      geolocation: {
        lat: "40.3467",
        long: "-40.1310",
      },
      city: "san Antonio",
      street: "adams St",
      number: 245,
      zipcode: "80796-1234",
    },
    id: 5,
    type: 3,
    date: "02.12.2023",
    email: "derek@gmail.com",
    username: "derek",
    password: "jklg*_56",
    name: {
      firstname: "derek",
      lastname: "powell",
    },
    phone: "1-956-001-1945",
    __v: 0,
  },
  {
    address: {
      geolocation: {
        lat: "20.1677",
        long: "-10.6789",
      },
      city: "el paso",
      street: "prospect st",
      number: 124,
      zipcode: "12346-0456",
    },
    id: 6,
    type: 3,
    date: "09.12.2023",
    email: "david_r@gmail.com",
    username: "david_r",
    password: "3478*#54",
    name: {
      firstname: "david",
      lastname: "russell",
    },
    phone: "1-678-345-9856",
    __v: 0,
  },
  {
    address: {
      geolocation: {
        lat: "10.3456",
        long: "20.6419",
      },
      city: "fresno",
      street: "saddle st",
      number: 1342,
      zipcode: "96378-0245",
    },
    id: 7,
    type: 3,
    date: "01.12.2023",
    email: "miriam@gmail.com",
    username: "snyder",
    password: "f238&@*$",
    name: {
      firstname: "miriam",
      lastname: "snyder",
    },
    phone: "1-123-943-0563",
    __v: 0,
  },
  {
    address: {
      geolocation: {
        lat: "50.3456",
        long: "10.6419",
      },
      city: "mesa",
      street: "vally view ln",
      number: 1342,
      zipcode: "96378-0245",
    },
    id: 8,
    type: 4,
    date: "09.12.2023",
    email: "william@gmail.com",
    username: "hopkins",
    password: "William56$hj",
    name: {
      firstname: "william",
      lastname: "hopkins",
    },
    phone: "1-478-001-0890",
    __v: 0,
  },
  {
    address: {
      geolocation: {
        lat: "40.12456",
        long: "20.5419",
      },
      city: "miami",
      street: "avondale ave",
      number: 345,
      zipcode: "96378-0245",
    },
    id: 9,
    type: 4,
    date: "09.12.2023",
    email: "kate@gmail.com",
    username: "kate_h",
    password: "kfejk@*_",
    name: {
      firstname: "kate",
      lastname: "hale",
    },
    phone: "1-678-456-1934",
    __v: 0,
  },
  {
    address: {
      geolocation: {
        lat: "30.24788",
        long: "-20.545419",
      },
      city: "fort wayne",
      street: "oak lawn ave",
      number: 526,
      zipcode: "10256-4532",
    },
    id: 10,
    type: 3,
    date: "09.12.2023",
    email: "jimmie@gmail.com",
    username: "jimmie_k",
    password: "klein*#%*",
    name: {
      firstname: "jimmie",
      lastname: "klein",
    },
    phone: "1-104-001-4567",
    __v: 0,
  },
];
const logoData = [
  { imgsrc: "../assets/images/shop_logo1.png" },
  { imgsrc: "../assets/images/shop_logo2.png" },
  { imgsrc: "../assets/images/shop_logo3.png" },
  { imgsrc: "../assets/images/shop_logo1.png" },
  { imgsrc: "../assets/images/shop_logo2.png" },
];
const themeDatarr = [
  { img: "../assets/images/theme1.png" },
  { img: "../assets/images/theme1.png" },
];

const addonsDataarr = [
  {
    id: "1",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "THEME",
    pagelink: "theme.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "2",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "BANNER",
    pagelink: "banner.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "3",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "COUPONS",
    pagelink: "coupon.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "4",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "DELIVERY SLOT",
    pagelink: "deliveryslot.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "5",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "TAKEAWAY",
    pagelink: "#",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "6",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "ONLINE PAYMENT",
    pagelink: "paymentSetting.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "7",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "CANCEL ORDER",
    pagelink: "cancelorder.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "8",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "DELIVERY",
    pagelink: "#",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "9",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "PAGES",
    pagelink: "newpage.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "10",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "GST",
    pagelink: "#",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "11",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "CATEGORY STYLE",
    pagelink: "setCatStyle.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "12",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: " REFER AND EARN",
    pagelink: "manage_Refer_and_earn.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "13",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "PUSH NOTIFICATION",
    pagelink: "pushNotification.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
  {
    id: "14",
    link: "https://www.youtube.com/embed/0Qwx391JAWk?si=5RJ4iUM98wuzzwuf",
    name: "MIN ORDER",
    pagelink: "minmumVal.html",
    img: "https://img.icons8.com/clouds/100/add.png",
    fprice: "3000",
    price: "2500",
    discount: "16.9%",
    description:
      "Transform the look and feel of your device effortlessly with our dynamic Theme section. Dive into a world of...",
  },
];
const order_data = [
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "Pos",
    no_item: "4",
    totalAmount: "4000",
  },
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "App",
    no_item: "9",
    totalAmount: "5000",
  },
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "Pos",
    no_item: "2",
    totalAmount: "2000",
  },
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "App",
    no_item: "48",
    totalAmount: "6000",
  },
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "Pos",
    no_item: "14",
    totalAmount: "12000",
  },
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "Pos",
    no_item: "4",
    totalAmount: "4000",
  },
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "App",
    no_item: "9",
    totalAmount: "5000",
  },
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "Pos",
    no_item: "2",
    totalAmount: "2000",
  },
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "App",
    no_item: "48",
    totalAmount: "6000",
  },
  {
    orderId: "ORD27334646473",
    orderStatus: "Placed",
    orderFrom: "Pos",
    no_item: "14",
    totalAmount: "12000",
  },
];

const banner_data = [
  {
    type: "Bottom",
    image:
      "https://thumbs.dreamstime.com/b/online-shop-banner-building-icon-grocery-shopping-market-basket-products-isometric-concept-highly-detailed-96795715.jpg",
  },
  {
    type: "Top",
    image:
      "http://www.a-yabloko.ru/storage/news/.thumbs/7079a4c0fbf4ad184c3c2fe4ea42ee54_w880.jpg",
  },
  {
    type: "Bottom",
    image:
      "https://thumbs.dreamstime.com/b/online-shop-banner-building-icon-grocery-shopping-market-basket-products-isometric-concept-highly-detailed-96795715.jpg",
  },
  {
    type: "Top",
    image:
      "http://www.a-yabloko.ru/storage/news/.thumbs/7079a4c0fbf4ad184c3c2fe4ea42ee54_w880.jpg",
  },
  {
    type: "Bottom",
    image:
      "https://thumbs.dreamstime.com/b/online-shop-banner-building-icon-grocery-shopping-market-basket-products-isometric-concept-highly-detailed-96795715.jpg",
  },
  {
    type: "Top",
    image:
      "http://www.a-yabloko.ru/storage/news/.thumbs/7079a4c0fbf4ad184c3c2fe4ea42ee54_w880.jpg",
  },
  {
    type: "Bottom",
    image:
      "https://thumbs.dreamstime.com/b/online-shop-banner-building-icon-grocery-shopping-market-basket-products-isometric-concept-highly-detailed-96795715.jpg",
  },
  {
    type: "small",
    image:
      "../assets/images/banner1.png",
  },
  {
    type: "small",
    image:
      "../assets/images/banner2.png",
  },
  {
    type: "small",
    image:
      "../assets/images/banner3.png",
  },
  {
    type: "small",
    image:
      "../assets/images/banner4.png",
  },
];

const manage_data = [
  {
    image:
      "https://pos.kalamitcompany.com/api/images/KA_BNR_20240826042120.jpg",
    title: "offers",
    msg: "best deals",
  },
  {
    image:
      "https://pos.kalamitcompany.com/api/images/KA_BNR_20240826042120.jpg",
    title: "offers",
    msg: "best deals",
  },
  {
    image:
      "https://pos.kalamitcompany.com/api/images/KA_BNR_20240826042120.jpg",
    title: "offers",
    msg: "best deals",
  },
  {
    image:
      "https://pos.kalamitcompany.com/api/images/KA_BNR_20240826042120.jpg",
    title: "offers",
    msg: "best deals",
  },
  {
    image:
      "https://pos.kalamitcompany.com/api/images/KA_BNR_20240826042120.jpg",
    title: "offers",
    msg: "best deals",
  },
  {
    image:
      "https://pos.kalamitcompany.com/api/images/KA_BNR_20240826042120.jpg",
    title: "offers",
    msg: "best deals",
  },
  {
    image:
      "https://pos.kalamitcompany.com/api/images/KA_BNR_20240826042120.jpg",
    title: "offers",
    msg: "best deals",
  },
];

const loadCoupons_data = [
  {
    coupons: "10",
    items: "Flat , 10",
    off: "50%",
  },
  {
    coupons: "10",
    items: "Flat , 10",
    off: "50%",
  },
  {
    coupons: "10",
    items: "percent , 10",
    off: "50%",
  },
  {
    coupons: "10",
    items: "Flat , 10",
    off: "50%",
  },
  {
    coupons: "10",
    items: "percent , 10",
    off: "50%",
  },
];

const usercategory_data = [
  
  {
    image:
      "https://www.jiomart.com/images/cms/section/category-url/12806/2.png?v=1725964433",
    name: "Grocery",
  },
  {
    image:
      "https://www.jiomart.com/images/category/61/thumb/dairy-bakery-20240620.png?im=Resize=(200,200)",
    name: "Fruits",
  },
  {
    image:
      "https://www.jiomart.com/images/category/219/thumb/fruits-vegetables-20240620.png?im=Resize=(200,200)",
    name: "rice",
  },
  {
    image:
      "https://www.jiomart.com/images/category/28997/thumb/biscuits-drinks-packaged-foods-20240620.png?im=Resize=(200,200)",
    name: "vegetables",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/rvpx3clm9k/btw-aloo-bhujia-namkeen-400g-200g-x-2-product-images-orvpx3clm9k-p606422175-0-202311301302.jpg?im=Resize=(360,360)",
    name: "biscuits",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/491319789/sunfeast-dark-fantasy-original-choco-filled-cookie-275-g-product-images-o491319789-p491319789-0-202406171649.jpg?im=Resize=(360,360)",
    name: "corn",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/491188036/sunfeast-dark-fantasy-yumfills-cake-253-g-product-images-o491188036-p491188036-0-202404101046.jpg?im=Resize=(360,360)",
    name: "panner",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/490064685/weikfield-cocoa-powder-50-g-product-images-o490064685-p490064685-0-202403041647.jpg?im=Resize=(360,360)",
    name: "rice",
  },
  {
    image:
      "https://www.jiomart.com/images/cms/section/category-url/12806/2.png?v=1725964433",
    name: "Grocery",
  },
  {
    image:
      "https://www.jiomart.com/images/category/61/thumb/dairy-bakery-20240620.png?im=Resize=(200,200)",
    name: "Fruits",
  },
  {
    image:
      "https://www.jiomart.com/images/category/219/thumb/fruits-vegetables-20240620.png?im=Resize=(200,200)",
    name: "rice",
  },
  {
    image:
      "https://www.jiomart.com/images/category/28997/thumb/biscuits-drinks-packaged-foods-20240620.png?im=Resize=(200,200)",
    name: "vegetables",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/rvpx3clm9k/btw-aloo-bhujia-namkeen-400g-200g-x-2-product-images-orvpx3clm9k-p606422175-0-202311301302.jpg?im=Resize=(360,360)",
    name: "biscuits",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/491319789/sunfeast-dark-fantasy-original-choco-filled-cookie-275-g-product-images-o491319789-p491319789-0-202406171649.jpg?im=Resize=(360,360)",
    name: "corn",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/491188036/sunfeast-dark-fantasy-yumfills-cake-253-g-product-images-o491188036-p491188036-0-202404101046.jpg?im=Resize=(360,360)",
    name: "panner",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/490064685/weikfield-cocoa-powder-50-g-product-images-o490064685-p490064685-0-202403041647.jpg?im=Resize=(360,360)",
    name: "rice",
  },
  {
    image:
      "https://www.jiomart.com/images/cms/section/category-url/12806/2.png?v=1725964433",
    name: "Grocery",
  },
  {
    image:
      "https://www.jiomart.com/images/category/61/thumb/dairy-bakery-20240620.png?im=Resize=(200,200)",
    name: "Fruits",
  },
  {
    image:
      "https://www.jiomart.com/images/category/219/thumb/fruits-vegetables-20240620.png?im=Resize=(200,200)",
    name: "rice",
  },
  {
    image:
      "https://www.jiomart.com/images/category/28997/thumb/biscuits-drinks-packaged-foods-20240620.png?im=Resize=(200,200)",
    name: "vegetables",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/rvpx3clm9k/btw-aloo-bhujia-namkeen-400g-200g-x-2-product-images-orvpx3clm9k-p606422175-0-202311301302.jpg?im=Resize=(360,360)",
    name: "biscuits",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/491319789/sunfeast-dark-fantasy-original-choco-filled-cookie-275-g-product-images-o491319789-p491319789-0-202406171649.jpg?im=Resize=(360,360)",
    name: "corn",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/491188036/sunfeast-dark-fantasy-yumfills-cake-253-g-product-images-o491188036-p491188036-0-202404101046.jpg?im=Resize=(360,360)",
    name: "panner",
  },
  {
    image:
      "https://www.jiomart.com/images/product/original/490064685/weikfield-cocoa-powder-50-g-product-images-o490064685-p490064685-0-202403041647.jpg?im=Resize=(360,360)",
    name: "rice",
  }
 
];

// floating button
var $floater = $(".floater");
var $floater__list = $(".floater__list");
var displaybock = "displaybock";
$floater.on("click", function (e) {
  $floater.toggleClass("is-active");
  $floater__list.toggleClass("displaybock");
  e.stopPropagation();
});

function toggleEye(id, attr) {
  $(`#${id}`).toggleClass("bi-eye bi-eye-slash");

  if ($(`#${attr}`).attr("type") === "password") {
    $(`#${attr}`).attr("type", "text");
  } else {
    $(`#${attr}`).attr("type", "password");
  }
}

function load_all_product() {
  x = 1;
  var loadData = " ";
  product_data.map((item) => {
    loadData += loadProduct(item);
    x++;
  });

  $("#res").append(loadData);
}

function loadCategory() {
  var categoryData = "";
  x = 1;
  category_data.map((data) => {
    categoryData += categoryListTemplate(data, x);
    x++;
  });
  $("#res").append(categoryData);
}

function logoadmindata() {
  var logoid = " ";
  logoData.map((item) => {
    logoid += logoTemplateAdmin(item);
  });

  $("#logos").append(logoid);
  console.log(logoid);
}

function loadUserdata() {
  x = 1;
  var userId = " ";
  user_data.map((item) => {
    userId += userTemplate(item, x);
    x++;
  });

  $("#res").append(userId);
}

function themeData() {
  var themeid = " ";
  themeDatarr.map((item) => {
    // console.log(item);

    themeid += themeTemplate(item);
  });

  $("#res").append(themeid);
  console.log(themeid);
}

function staffData() {
  var staffId = " ";
  user_data.map((item) => {
    // console.log(item);

    staffId += addStaffTemplate(item);
  });

  $("#res").append(staffId);
  // console.log(staffId);
}

function addonsData() {
  x = 1;
  var addonsId = " ";
  addonsDataarr.map((item) => {
    addonsId += addonsTemplate(item, x);
    x++;
  });

  $("#res").append(addonsId);
  // console.log(addonsId);
}

function PosData() {
  x = 1;
  var posDataId = " ";
  product_data.map((item) => {
    posDataId += posproductTempelate(item, x);
    x++;
  });

  $("#res").append(posDataId);
}
function loadPOSItem() {
  x = 1;
  var PosDataId = " ";
  product_data.map((item) => {
    PosDataId += PosDataTemplate(item, x);
    x++;
  });

  $("#res").append(PosDataId);
}
function orderListItem() {
  var OrderDataId = " ";
  order_data.map((item) => {
    OrderDataId += OrderDataTemplate(item, 1);
  });

  $("#orderList").append(OrderDataId);
}
function DeleveryBoyorderListItem() {
  var DeleveryBoyOrderDataId = " ";
  order_data.map((item) => {
    DeleveryBoyOrderDataId += OrderDataTemplate(item, 2);
  });

  $("#orderList").append(DeleveryBoyOrderDataId);
}
function loadAllCategroyKA() {
  x = 1;
  var LoadCategoryDataId = " ";
  category_data.map((item) => {
    LoadCategoryDataId += LoadCategoryTemplate(item, x);
    x++;
  });

  $("#res").append(LoadCategoryDataId);
}
function gotoposCheckout() {
  location.href = "posCheckout.html";
}
function loadAllBannerImages() {
  x = 1;
  var loadAllBannerImagesDataId = " ";
  banner_data.map((item) => {
    loadAllBannerImagesDataId += loadAllBannerImagesTemplate(item, x);
    x++;
  });

  $("#imgList").append(loadAllBannerImagesDataId);
}
function loadManageCategory1() {
  var loadManageCategoryDataId = " ";
  manage_data.map((item) => {
    loadManageCategoryDataId += loadManageCategoryTemplate(item);
  });

  $("#imgList").append(loadManageCategoryDataId);
}
function loadCoupons() {
  var loadCouponsDataId = " ";
  loadCoupons_data.map((item) => {
    loadCouponsDataId += loadCouponsTemplate(item);
  });

  $("#coupon-list").append(loadCouponsDataId);
}
function loadorderDetail() {
  var load_product_list_invoiceDataId = " ";
  product_data.map((item) => {
    load_product_list_invoiceDataId += load_product_list_invoiceTemplate(item);
  });

  $("#load_product_list_invoice").append(load_product_list_invoiceDataId);
}

/* ================
User app code start
================ */
function UserCategory() {
  var TopcategoryId = " ";
  category_data.map((item) => {
    TopcategoryId += UserTopcategoryTemplate(item);
  });

  $("#Topcategory").append(TopcategoryId);
}

function Topbannercarousel() {
  x = 1;
  var TopUsercarouselId = " ";
  const bigImages =  banner_data.filter(image => image.type === 'Top' || image.type === 'Bottom' ); 
  bigImages.map((item) => {
    TopUsercarouselId += TopbannercarouselTemplate(item, x);
    x++;
  });

  $("#Userbanner").append(TopUsercarouselId);

  $(".carousel-main").trigger("destroy.owl.carousel");
  $(".carousel-main").owlCarousel({
    stagePadding: 50,
    loop: true,
    margin: 10,
    nav: false,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      600: {
        items: 2,
      },
      1000: {
        items: 3,
      },
    },
  });

  $(".carousel-main").trigger("refresh.owl.carousel");
}

function categoryCarousel() {
  var UsercategoryCarouselId = " ";
  usercategory_data.map((item) => {
    UsercategoryCarouselId += categoryCarouselTemplate(item);
  });

  $("#categoryData").append(UsercategoryCarouselId);
}
function productCarousel() {
  var UserproductCarouselId = " ";
  product_data.map((item) => {
    UserproductCarouselId +=productCarouselTemplate(item);
  });

  $("#featuredproductData").append(UserproductCarouselId);
  $("#moreProduct").append(UserproductCarouselId);
}

function smallbannercarousel() {
  x = 1;
  var smallUsercarouselId = " ";
  const smallImages =  banner_data.filter(image => image.type === 'small');  
  smallImages.map((item) => {
    smallUsercarouselId += smallbannercarouselTemplate(item, x);
    x++;
  });

  $("#smallBanners").append(smallUsercarouselId);
}
/* ================
User app code end
================ */
