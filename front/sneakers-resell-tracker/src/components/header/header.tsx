import React from "react";
import "./header.css";
import { CiHeart } from "react-icons/ci";
import { useState } from "react";

interface HeaderProps {
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
    setSearchItem: React.Dispatch<React.SetStateAction<string>>;
    isMenuOpen: boolean;
    setIsMenuOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function Header({ setPageIndex, setSearchItem, isMenuOpen, setIsMenuOpen }: HeaderProps) {

    // const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchItem(event.target.value);
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="header-container">
            <div className="header-logo" onClick={() => setPageIndex(0)}>
                Resell Tracker
            </div>
            <div className={`header-brand ${isMenuOpen ? "active" : ""}`}>
                {isMenuOpen && (
                    <div className="header-searchbar-hamburger">
                        <input type="text" placeholder="Search" onChange={handleSearchChange} />
                    </div>
                )}
                <button>Nike</button>
                <button>Adidas</button>
                <button>Jordan</button>
                <button>Yeezy</button>
                <button>Supreme</button>
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