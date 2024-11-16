import React from "react";
import "./home.css";
import Travis from './../../images/sneakers.png'

interface HomeProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setScu: React.Dispatch<React.SetStateAction<string>>;
  searchItem: string;
}

let sneakers = [
  {
    id: 1,
    name: "Caca",
    price: 1500,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
    codeSku: "SKU-1111",
    color: "Brown",
  },
  {
    id: 2,
    name: "Caneton",
    price: 1100,
    size: 9,
    img: Travis,
    state: "Low Damaged",
    releaseDate: "2021-05-29",
    sold: true,
    codeSku: "SKU-2222",
    color: "Brown",
  },
  {
    id: 3,
    name: "Sunrise",
    price: 1500,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: true,
    codeSku: "SKU-3333",
    color: "Brown",
  },
  {
    id: 4,
    name: "Jordan 1 Retro High Travis Scott",
    price: 1500,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
    codeSku: "SKU-4444",
    color: "Brown",
  },
  {
    id: 5,
    name: "Jordan 1 Retro High Travis Scott",
    price: 1500,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
    codeSku: "SKU-5555",
    color: "Brown",
  },
  {
    id: 6,
    name: "Jordan 1 Retro High Travis Scott",
    price: 1500,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
    codeSku: "SKU-6666",
    color: "Brown",
  },
  {
    id: 7,
    name: "Jordan 1 Retro High Travis Scott",
    price: 1500,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
    codeSku: "SKU-7777",
    color: "Brown",
  },
  {
    id: 8,
    name: "Jordan 1 Retro High Travis Scott",
    price: 1500,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
    codeSku: "SKU-8888",
    color: "Brown",
  },
  {
    id: 9,
    name: "Jordan 1 Retro High Travis Scott",
    price: 1500,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
    codeSku: "SKU-9999",
    color: "Brown",
  },
];

function Home({ setPageIndex, setScu, searchItem }: HomeProps) {

  const handleScu = (scu: string) => {
    setScu(scu);
    // console.log(scu);
    setPageIndex(1);
  };

  const filteredSneakers = sneakers.filter((sneaker) =>
    sneaker.name.toLowerCase().includes(searchItem.toLowerCase())
  );

  return (
    <div className="home-container">
      <div className="last-release-container">

      </div>
      <div className="sneaker-list-container">
        {filteredSneakers.map((sneaker) => (
          <div key={sneaker.id} className="sneaker-card">
            <div className="sneaker-card-info" onClick={() => { handleScu(sneaker.codeSku) }}>
              <img src={sneaker.img} alt="sneaker" />
              <h2>{sneaker.name}</h2>
              <p>Price: {sneaker.price}$</p>
              <p>Size: {sneaker.size}</p>
              <p>Release Date: {sneaker.releaseDate}</p>
              <p>Sold: {sneaker.sold ? "Yes" : "No"}</p>
              <p>Color: {sneaker.color}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;