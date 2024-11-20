import React from "react";
import "./items.css";
import { useEffect } from "react";

import Travis from './../../images/sneakers.png'

interface ItemProps {
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    scu: string;
    isMenuOpen: boolean;
}

let sneakers = [
    {
        id: 1,
        name: "Jordan 1 Retro High Travis Scott",
        price: 1500,
        size: 9,
        img: Travis,
        releaseDate: "2021-05-29",
        sold: false,
        codeSku: "SKU-1234",
        color: "White",
    }
];

function Items({ setPageIndex, scu, isMenuOpen }: ItemProps) {
    
    console.log(scu);

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
                const data = await response.json();
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
                {sneakers.map((sneaker, index) => (
                    <div className="item-info" key={index}>
                        <div className="item-info-img">
                            <img src={sneaker.img}/>
                        </div>
                        <div className="item-info-title">{sneaker.name}</div>
                        <div className="item-info-price">Price: {sneaker.price}</div>
                        <div className="item-info-size">Size: {sneaker.size}</div>
                        <div className="item-info-date">Release date: {sneaker.releaseDate}</div>
                    </div>
                ))}
            </div>
            <div className="item-info-resell-container">
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