import React, { useEffect, useState } from "react";
import "./home.css";

interface HomeProps {
  setPageIndex: React.Dispatch<React.SetStateAction<number>>;
  setScu: React.Dispatch<React.SetStateAction<string>>;
  searchItem: string;
  isMenuOpen: boolean;
}

interface Sneaker {
  name: string;
  sku: string;
  color: string;
  price: number;
  image: string; // Ajout de l'URL de l'image
}

function Home({ setPageIndex, setScu, searchItem, isMenuOpen }: HomeProps) {

  const [sneakerData, setSneakerData] = useState<Sneaker[]>([]);

  const handleScu = (scu: string) => {
    setScu(scu);
    setPageIndex(1);
  };

  useEffect(() => {
    const fetchSneaker = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/all`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data: Sneaker[] = await response.json();

        // Retirer les doublons basés sur le champ 'name'
        const uniqueSneakers = data.filter((sneaker: Sneaker, index: number, self: Sneaker[]) =>
          index === self.findIndex((s: Sneaker) => s.name === sneaker.name)
        );

        setSneakerData(uniqueSneakers);
        console.log(uniqueSneakers);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchSneaker();
  }, []);

  const filteredSneakers = sneakerData.filter((sneaker: Sneaker) =>
    searchItem ? sneaker.name.toLowerCase().includes(searchItem.toLowerCase()) : true
  );

  return (
    <div className="home-container">
      <div className="last-release-container">
        {/* Afficher les détails de la dernière sortie ici */}
      </div>
      <div className={`sneaker-list-container ${isMenuOpen ? "menu-open" : ""}`}>
        {filteredSneakers.map((sneaker: Sneaker) => (
          <div key={sneaker.sku} className="sneaker-card">
            <div className="sneaker-card-info" onClick={() => { handleScu(sneaker.sku) }}>
              <img src={sneaker.image} alt={sneaker.name} />
              <h2>{sneaker.name}</h2>
              <p>Price: {sneaker.price}$</p>
              <p>Color: {sneaker.color}</p>
              <p>SKU: {sneaker.sku}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;