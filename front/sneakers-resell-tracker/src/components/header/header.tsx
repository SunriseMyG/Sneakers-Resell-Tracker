import React from "react";
import "./header.css";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";

interface HeaderProps {
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    setSearchItem: React.Dispatch<React.SetStateAction<string>>;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
    setRetailer: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ setPageIndex, setSearchItem, isMenuOpen, setIsMenuOpen, setRetailer }: HeaderProps) {

    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(event.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleBrand = (brand: string) => {
        setRetailer(brand);
    }

    
    return (
        <div className="header-container">
            <div className="header-logo" onClick={() => { handleBrand(''); setPageIndex(0); }}>
                Resell Tracker
            </div>
            <div className={`header-brand ${isMenuOpen ? "active" : ""}`}>
                {isMenuOpen && (
                    <div className="header-searchbar-hamburger">
                        <input type="text" placeholder="Search" onChange={handleSearchChange} />
                    </div>
                )}
                <button onClick={() => handleBrand("Nike")}>Nike</button>
                <button onClick={() => handleBrand("crtz")}>Corteiz</button>
                <button onClick={() => handleBrand("nocta")}>Nocta</button>
                {/* <button>Yeezy</button>
                <button>Supreme</button> */}
            </div>
            <div className="hamburger-menu" onClick={toggleMenu}>
                <div></div>
                <div></div>
                <div></div>
            </div>
            <div className="header-searchbar-like">
                <div className="header-searchbar">
                    <input type="text" placeholder="Search" onChange={handleSearchChange}/>
                </div>
                <div className="header-like">
                    <CiHeart className="header-searchbar-icon" />
                </div>
            </div>
        </div>
    );
}

export default Header;