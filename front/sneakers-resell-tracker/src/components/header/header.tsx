import React from "react";
import "./header.css";
import { CiHeart } from "react-icons/ci";

interface HeaderProps {
    setPageIndex: React.Dispatch<React.SetStateAction<number>>;
}

function Header({ setPageIndex }: HeaderProps) {
    return (
        <div className="header-container">
            <div className="header-logo" onClick={() => setPageIndex(0)}>
                Resell Tracker
            </div>
            <div className="header-brand">
                <button>Nike</button>
                <button>Adidas</button>
                <button>Jordan</button>
                <button>Yeezy</button>
                <button>Supreme</button>
            </div>
            <div className="header-searchbar-like">
                <div className="header-searchbar">
                    <input type="text" placeholder="Search" />
                </div>
                <div className="header-like">
                    <CiHeart className="header-searchbar-icon" />
                </div>
            </div>
        </div>
    );
}

export default Header;