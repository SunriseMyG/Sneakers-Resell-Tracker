import React, { useEffect, useState } from "react";
import "./home.css";

interface HomeProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setScu: React.Dispatch<React.SetStateAction<string>>;
  searchItem: string;
  isMenuOpen: boolean;
  retailer: string;
}

interface Sneaker {
  name: string;
  sku: string;
  color: string;
  price: number;
  image: string;
  retailer: string;
}

function Home({ setPageIndex, setScu, searchItem, isMenuOpen, retailer }: HomeProps) {
  const [sneakerData, setSneakerData] = useState<Sneaker[]>([]);

  const handleScu = (scu: string) => {
    setScu(scu);
    setPageIndex(1);
  };

  console.log(retailer);

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Sneaker[] = await response.json();

        // Filtrer par retailer si présent
        let filteredData = data;
        if (retailer && retailer.trim() !== "") {
          filteredData = data.filter(
            (item) => item.retailer.toLowerCase() === retailer.toLowerCase()
          );
        }

        // Éliminer les doublons basés sur le 'sku'
        const uniqueSneakers = Array.from(
          new Map(filteredData.map((item) => [item.sku, item])).values()
        );

        setSneakerData(uniqueSneakers);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchSneaker();
  }, [retailer]);

  const filteredSneakers = sneakerData.filter((sneaker: Sneaker) =>
    searchItem ? sneaker.name.toLowerCase().includes(searchItem.toLowerCase()) : true
  );

  return (
    <div className="home-container">
      <div className="last-release-container">
        {/* Afficher les détails de la dernière sortie ici */}
      </div>
      <div className={`sneaker-list-container ${isMenuOpen ? "menu-open" : ""}`}>
        {filteredSneakers.map((sneaker: Sneaker, index: number) => (
          sneaker.image !== "Unknown" && sneaker.name && sneaker.price && sneaker.sku ? (
            <div key={`${sneaker.sku}-${index}`} className="sneaker-card">
              <div className="sneaker-card-info" onClick={() => { handleScu(sneaker.sku) }}>
                <img src={sneaker.image} alt={sneaker.name} />
                <h2>{sneaker.name}</h2>
                <p>Price: {sneaker.price}€</p>
                <p>Color: {sneaker.color}</p>
                <p>SKU: {sneaker.sku}</p>
              </div>
            </div>
          ) : null
        ))}
      </div>
    </div>
  );
}

export default Home;