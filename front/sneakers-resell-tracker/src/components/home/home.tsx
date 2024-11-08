import React from "react";
import "./home.css";
import Travis from './../../images/sneakers.png'

interface HomeProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

let sneakers = [
  {
    id: 1,
    name: "Jordan 1 Retro High Travis Scott",
    priceOnWeTheNew: 1500,
    priceOnStockX: 1200,
    priceOnSecondSteps: 1400,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
  },
  {
    id: 2,
    name: "Jordan 1 Retro High Travis Scott",
    priceOnWeTheNew: 1100,
    priceOnStockX: 1000,
    priceOnSecondSteps: 1050,
    size: 9,
    img: Travis,
    state: "Low Damaged",
    releaseDate: "2021-05-29",
    sold: true,
  },
  {
    id: 3,
    name: "Jordan 1 Retro High Travis Scott",
    priceOnWeTheNew: 1500,
    priceOnStockX: 1200,
    priceOnSecondSteps: 1400,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: true,
  },
  {
    id: 4,
    name: "Jordan 1 Retro High Travis Scott",
    priceOnWeTheNew: 1500,
    priceOnStockX: 1200,
    priceOnSecondSteps: 1400,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
  },
  {
    id: 5,
    name: "Jordan 1 Retro High Travis Scott",
    priceOnWeTheNew: 1500,
    priceOnStockX: 1200,
    priceOnSecondSteps: 1400,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
  },
  {
    id: 6,
    name: "Jordan 1 Retro High Travis Scott",
    priceOnWeTheNew: 1500,
    priceOnStockX: 1200,
    priceOnSecondSteps: 1400,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
  },
  {
    id: 7,
    name: "Jordan 1 Retro High Travis Scott",
    priceOnWeTheNew: 1500,
    priceOnStockX: 1200,
    priceOnSecondSteps: 1400,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
  },
  {
    id: 8,
    name: "Jordan 1 Retro High Travis Scott",
    priceOnWeTheNew: 1500,
    priceOnStockX: 1200,
    priceOnSecondSteps: 1400,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
  },
  {
    id: 9,
    name: "Jordan 1 Retro High Travis Scott",
    priceOnWeTheNew: 1500,
    priceOnStockX: 1200,
    priceOnSecondSteps: 1400,
    size: 9,
    img: Travis,
    state: "New",
    releaseDate: "2021-05-29",
    sold: false,
  },
];

function Home({ setPageIndex }: HomeProps) {
  return (
    <div className="home-container">
      <div className="last-release-container">

      </div>
      <div className="sneaker-list-container">
        {sneakers.map((sneaker) => (
          <div key={sneaker.id} className="sneaker-card">
            <div className="sneaker-card-info">
              <img src={sneaker.img} alt="sneaker" />
              <h2>{sneaker.name}</h2>
              <p>Price on WeTheNew: {sneaker.priceOnWeTheNew}$</p>
              <p>Price on StockX: {sneaker.priceOnStockX}$</p>
              <p>Price on Second Steps: {sneaker.priceOnSecondSteps}$</p>
              <p>Size: {sneaker.size}</p>
              <p>Condition: {sneaker.state}</p>
              <p>Release Date: {sneaker.releaseDate}</p>
              <p>Sold: {sneaker.sold ? "Yes" : "No"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;