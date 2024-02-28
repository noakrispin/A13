//I am changing the image links from firebase to amazon, firebase has issues with these direct links. Please remember to add the amazon link(that will show up at the error) instead of firebase at the cofig for it to work out.

export const products = [
    {
      id: "64a654593e91b8e73a351e9b",
      name: "August 15 Sculpture",
      Artist_Name: "Timo Myllymäki",
      Size: "70 W x 100 H x 3 D cm",
      price: 380,
      category: "Sculpture",
      inStock: true,
      images: [
        {
          color: "White",
          colorCode: "#FFFFFF",
          image:
          "/public/img/Augus_15.jpg",
        },
        {
          color: "Gray",
          colorCode: "#808080",
          image:
            "https://m.media-amazon.com/images/I/417tEj3iJ8L._AC_.jpg",
        },
      ],
      reviews: [],
    },
    {
      id: "64a4ebe300900d44bb50628a",
      name: "3 of Wands - Limited Edition of 25",
      Artist_Name: "Simon Bolton",
      Size: "76.2 W x 101 H x 0.1 D cm",
      price: 1880,
      category: "Photography",
      inStock: true,
      images: [
        {
          color: "Black",
          colorCode: "#000000",
          image:
            "https://m.media-amazon.com/images/I/71gOLg2-kqL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        },
      ],
      reviews: [
        {
          id: "64a65a6158b470c6e06959ee",
          userId: "6475af156bad4917456e6e1e",
          productId: "64a4ebe300900d44bb50628a",
          rating: 5,
          comment: "good",
          createdDate: "2023-07-06T06:08:33.067Z",
          user: {
            id: "6475af156bad4917456e6e1e",
            name: "Charles",
            email: "example@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
            hashedPassword: null,
            createdAt: "2023-05-30T08:08:53.979Z",
            updatedAt: "2023-05-30T08:08:53.979Z",
            role: "ADMIN",
          },
        },
      ],
    },
    {
      id: "648437b38c44d52b9542e340",
      name: "Linger. Stainless steel sculpture - Limited Edition of 3",
      Artist_Name: "Yoni Alter",
      Size: "26 W x 27 H x 21 D cm",
      price: 40,
      category: "Sculpture",
      inStock: true,
      images: [
        {
          color: "Black",
          colorCode: "#000000",
          image:
            "https://m.media-amazon.com/images/I/61g+McQpg7L._AC_SX679_.jpg",
        },
        {
          color: "Blue",
          colorCode: " #0000FF",
          image:
            "https://m.media-amazon.com/images/I/713Om9vCHUL._AC_SX679_.jpg",
        },
        {
          color: "Red",
          colorCode: "#FF0000",
          image:
            "https://m.media-amazon.com/images/I/61thdjmfHcL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        },
      ],
      reviews: [
        {
          id: "6499b4887402b0efd394d8f3",
          userId: "6499b184b0e9a8c8709821d3",
          productId: "648437b38c44d52b9542e340",
          rating: 4,
          comment:
            "good enough. I like the camera and casing. the delivery was fast too.",
          createdDate: "2023-06-26T15:53:44.483Z",
          user: {
            id: "6499b184b0e9a8c8709821d3",
            name: "Chaoo",
            email: "example1@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/AAcHTtcuRLwWi1vPKaQOcJlUurlhRAIIq2LgYccE8p32=s96-c",
            hashedPassword: null,
            createdAt: "2023-06-26T15:40:52.558Z",
            updatedAt: "2023-06-26T15:40:52.558Z",
            role: "USER",
          },
        },
        {
          id: "6499a110efe4e4de451c7edc",
          userId: "6475af156bad4917456e6e1e",
          productId: "648437b38c44d52b9542e340",
          rating: 5,
          comment: "I really liked it!!",
          createdDate: "2023-06-26T14:30:40.998Z",
          user: {
            id: "6475af156bad4917456e6e1e",
            name: "Charles",
            email: "example@gmail.com",
            emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
            hashedPassword: null,
            createdAt: "2023-05-30T08:08:53.979Z",
            updatedAt: "2023-05-30T08:08:53.979Z",
            role: "ADMIN",
          },
        },
      ],
    },
    {
      id: "64a4e9e77e7299078334019f",
      name: "Soap Bubble Studies XXX // limited edition ",
      Artist_Name: "Marlies Plank",
      Size: "90 W x 60 H x 1 D cm",
      price: 550,
      category: "Photography",
      inStock: true,
      images: [
        {
          color: "Graphite",
          colorCode: " #383838",
          image:
            "https://m.media-amazon.com/images/I/61ni3t1ryQL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        },
      ],
      reviews: [],
    },
    {
      id: "649d775128b6744f0f497040",
      name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
      description:
        'Bluetooth Call and Message Reminder: The smart watch is equipped with HD speaker, after connecting to your phone via Bluetooth, you can directly use the smartwatches to answer or make calls, read messages, store contacts, view call history. The smartwatch can set up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
      price: 50,
      brand: "Nerunsa",
      category: "Watch",
      inStock: true,
      images: [
        {
          color: "Black",
          colorCode: "#000000",
          image:
            "https://m.media-amazon.com/images/I/71s4mjiit3L.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        },
        {
          color: "Silver",
          colorCode: "#C0C0C0",
          image:
            "https://m.media-amazon.com/images/I/71zbWSRMaYL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
        },
      ],
      reviews: [],
    },
  ];