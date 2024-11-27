import React, { useEffect, useState } from "react";
import "./items.css";
import { RiShoppingBag4Fill } from "react-icons/ri";


interface ItemProps {
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    scu: string;
    isMenuOpen: boolean;
}

interface Sneaker {
    id: number;
    name: string;
    sku: string;
    color: string;
    price: number;
    image: string;
    size?: number; // Optionnel car il n'est pas présent dans la réponse
    releaseDate?: string; // Optionnel car il n'est pas présent dans la réponse
}

function Items({ setPageIndex, scu, isMenuOpen }: ItemProps) {
    const [sneaker, setSneaker] = useState<Sneaker | null>(null);

    useEffect(() => {
        const fetchSneaker = async () => {
            try {
                const response = await fetch(`http://localhost:8000/api/sku/${scu}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const data: Sneaker = await response.json();
                setSneaker(data);
                console.log(data);
            } catch (error) {
                console.error("Fetch error:", error);
            }
        };

        fetchSneaker();
    }, [scu]);

    return (
        <div className={`item-container ${isMenuOpen ? "menu-open" : ""}`}>
            <div className="item-info-container">
                {sneaker && (
                    <div className="item-info" key={sneaker.sku}>
                        <div className="item-info-img">
                            <img src={sneaker.image} alt={sneaker.name} />
                        </div>
                        <h1>{sneaker.name}</h1>
                        <div style={{paddingTop: "10px", paddingBottom: "15px", gap: "5px", display: "flex", flexDirection: "column"}}>
                            <div className="item-each-info">
                                <p style={{marginRight: "5px"}}>Date de sortie : </p>
                                <p style={{ color: "black" }}>{sneaker.releaseDate}</p>
                            </div>
                            <div className="item-each-info">
                                <p style={{marginRight: "5px"}}>Prix : </p>
                                <p style={{ color: "black" }}>{sneaker.price}€</p>
                            </div>
                            <div className="item-each-info">
                                <p style={{ marginRight: "5px" }}>Code SKU : </p>
                                <p style={{ color: "black" }}>{sneaker.sku}</p>
                            </div>
                        </div>
                        <div className="info-product-details">
                            <h1>Informations produit</h1>
                            <div className="info-product-container">
                                <div className="info-product">
                                    <div>
                                        <p style={{ color: "#1F1F1F"}}>Date de sortie</p>
                                        <p style={{color: "424242"}}>{sneaker.releaseDate}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#1F1F1F"}}>Prix retail</p>
                                        <p style={{ color: "424242" }}>{sneaker.price}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#1F1F1F"}}>Marque</p>
                                        <p style={{ color: "424242" }}>{sneaker.releaseDate}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#1F1F1F"}}>Code SKU</p>
                                        <p style={{ color: "424242" }}>{sneaker.sku}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#1F1F1F"}}>Modèle</p>
                                        <p style={{ color: "424242" }}>{sneaker.releaseDate}</p>
                                    </div>
                                    <div>
                                        <p style={{ color: "#1F1F1F"}}>Couleurs</p>
                                        <p style={{ color: "424242" }}>{sneaker.color}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="item-info-resell-container">
                <h1>Shops</h1>
                <div className="shop-title">
                    <RiShoppingBag4Fill className="icon"/>
                    <h2>Disponible</h2>
                </div>
                <div className="item-info-resell">
                    <div className="item-info-resell-title">WeTheNew: 1500$</div>
                    <div className="item-info-resell-title">StockX: 1200$</div>
                    <div className="item-info-resell-title">SecondSteps: 1400$</div>
                </div>
            </div>
        </div>
    );
}

export default Items;