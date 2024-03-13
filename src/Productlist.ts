import { ref } from "vue";

export interface Items {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  images: string[];
}

// Your JSON data
export const itemsData: Items[] = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    rating: 1,
    category: "electronics",
    images: [
      "https://cdn.dummyjson.com/product-images/1/1.jpg",
      "https://cdn.dummyjson.com/product-images/1/2.jpg",
    ],
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    rating: 2,
    category: "electronics",
    images: [
      "https://cdn.dummyjson.com/product-images/2/1.jpg",
      "https://cdn.dummyjson.com/product-images/2/2.jpg",
    ],
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    rating: 3,
    category: "electronics",
    images: ["https://cdn.dummyjson.com/product-images/3/1.jpg"],
  },
  {
    id: 4,
    title: "Daal Masoor 500 grams",
    description: "Fine quality Branded Product Keep in a cool and dry place",
    price: 20,
    rating: 4,
    category: "groceries",
    images: [
      "https://cdn.dummyjson.com/product-images/21/1.png",
      "https://cdn.dummyjson.com/product-images/21/2.jpg",
    ],
  },
  {
    id: 5,
    title: "Elbow Macaroni - 400 gm",
    description: "Product details of Bake Parlor Big Elbow Macaroni - 400 gm",
    price: 14,
    rating: 5,
    category: "groceries",
    images: [
      "https://cdn.dummyjson.com/product-images/22/1.jpg",
      "https://cdn.dummyjson.com/product-images/22/2.jpg",
    ],
  },
  {
    id: 6,
    title: "Orange Essence Food Flavou",
    description:
      "Specifications of Orange Essence Food Flavour For Cakes and Baking Food Item",
    price: 14,
    rating: 1,
    category: "groceries",
    images: [
      "https://cdn.dummyjson.com/product-images/23/1.jpg",
      "https://cdn.dummyjson.com/product-images/23/2.jpg",
    ],
  },
  {
    id: 7,
    title: "Black Motorbike",
    description:
      "Engine Type:Wet sump, Single Cylinder, Four Stroke, Two Valves, Air Cooled with SOHC (Single Over Head Cam) Chain Drive Bore & Stroke:47.0 x 49.5 MM",
    price: 569,
    rating: 2,
    category: "motorcycle",
    images: [
      "https://cdn.dummyjson.com/product-images/91/1.jpg",
      "https://cdn.dummyjson.com/product-images/91/2.jpg",
    ],
  },
  {
    id: 8,
    title: "HOT SALE IN EUROPE electric racing motorcycle",
    description:
      "HOT SALE IN EUROPE electric racing motorcycle electric motorcycle for sale adult electric motorcycles",
    price: 920,
    rating: 3,
    category: "motorcycle",
    images: [
      "https://cdn.dummyjson.com/product-images/92/1.jpg",
      "https://cdn.dummyjson.com/product-images/92/2.jpg",
    ],
  },
  {
    id: 9,
    title: "Automatic Motor Gas Motorcycles",
    description:
      "150cc 4-Stroke Motorcycle Automatic Motor Gas Motorcycles Scooter motorcycles 150cc scooter",
    price: 1050,
    rating: 4,
    category: "motorcycle",
    images: [
      "https://cdn.dummyjson.com/product-images/93/1.jpg",
      "https://cdn.dummyjson.com/product-images/93/2.jpg",
    ],
  },
  {
    id: 10,
    title: "new arrivals Fashion motocross goggles",
    description:
      "new arrivals Fashion motocross goggles motorcycle motocross racing motorcycle",
    price: 900,
    rating: 5,
    category: "motorcycle",
    images: [
      "https://cdn.dummyjson.com/product-images/94/1.webp",
      "https://cdn.dummyjson.com/product-images/94/2.jpg",
    ],
  },
  {
    id: 11,
    title: "printed high quality T shirts",
    description: "Brand: vintage Apparel ,Export quality",
    price: 350,
    rating: 1,
    category: "fashion",
    images: [
      "https://cdn.dummyjson.com/product-images/53/1.webp",
      "https://cdn.dummyjson.com/product-images/53/2.jpg",
    ],
  },
  {
    id: 12,
    title: "Stylish Casual Jeans Shoes",
    description:
      "High Quality ,Stylish design ,Comfortable wear ,FAshion ,Durable",
    price: 580,
    rating: 2,
    category: "mens-shoes",
    images: [
      "https://cdn.dummyjson.com/product-images/60/1.jpg",
      "https://cdn.dummyjson.com/product-images/60/2.jpg",
    ],
  },
  {
    id: 13,
    title: "Bluetooth Aux",
    description:
      "Bluetooth Aux Bluetooth Car Aux Car Bluetooth Transmitter Aux Audio Receiver Handfree Car Bluetooth Music Receiver Universal 3.5mm Streaming A2DP Wireless Auto AUX Audio Adapter With Mic For Phone MP3",
    price: 25,
    rating: 3,
    category: "automotive",
    images: [
      "https://cdn.dummyjson.com/product-images/86/1.jpg",
      "https://cdn.dummyjson.com/product-images/86/2.webp",
      "https://cdn.dummyjson.com/product-images/86/3.jpg",
      "https://cdn.dummyjson.com/product-images/86/4.jpg",
      "https://cdn.dummyjson.com/product-images/86/thumbnail.jpg",
    ],
  },
  {
    id: 14,
    title: "t Temperature Controller Incubator Controller",
    description:
      "Both Heat and Cool Purpose, Temperature control range; -50 to +110, Temperature measurement accuracy; 0.1, Control accuracy; 0.1",
    price: 40,
    rating: 4,
    category: "automotive",
    images: [
      "https://cdn.dummyjson.com/product-images/87/1.jpg",
      "https://cdn.dummyjson.com/product-images/87/2.jpg",
    ],
  },
  {
    id: 15,
    title: "TC Reusable Silicone Magic Washing Gloves",
    description: "TC Reusable Silicone Magic Washing Gloves with Scrubber",
    price: 29,
    rating: 5,
    category: "automotive",
    images: [
      "https://cdn.dummyjson.com/product-images/88/1.jpg",
      "https://cdn.dummyjson.com/product-images/88/2.jpg",
    ],
  },
];
