import SearchBar from "../components/SearchBar.jsx";
import Card from "../components/Card.jsx";
import { auth } from "../firebase.js";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase.js";
import { getAuth } from "firebase/auth";
import { useEffect, useState } from "react";

const Dashboard = ({ cards, onFileUpload, searchTerm, onSearch }) => {

    const auth = getAuth();
    const user = auth.currentUser;

    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );


        //change to display username instead of email next time
        return (

        <>
            <div className="card_blk">
                <h1>Welcome, {user ? user.email : "Guest"}!</h1>
            </div>
            <SearchBar onFileUpload={onFileUpload} />
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
            />
            <div className="card_blk">
                {filteredCards.map((card, index) => (
                    <Card key={index} title={card.title} url={card.url} />
                ))}
            </div>
            <div id="bottomspace1" />
            <div className="bottombar" />
            <div id="bottomspace2" />
        </>
    );
};

export default Dashboard;
