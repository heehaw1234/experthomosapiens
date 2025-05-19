import SearchBar from "../components/SearchBar.jsx";
import Card from "../components/Card.jsx";
import { getAuth } from "firebase/auth";

const Dashboard = ({ cards, onFileUpload, searchTerm, onSearch }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    // Safety check in case component renders before auth is fully loaded
    if (!user) {
        return <div className="loading">Loading user data...</div>;
    }
    
    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <>
            <SearchBar
                onFileUpload={onFileUpload}
                searchTerm={searchTerm}
                onSearch={onSearch}
            />
            
            <div className="card_blk">
                {filteredCards.map((card, index) => (
                    <Card 
                        key={index} 
                        title={card.title} 
                        url={card.url}
                        type={card.type} 
                    />
                ))}
            </div>
            
            <div id="bottomspace1" />
            <div className="bottombar" />
            <div id="bottomspace2" />
        </>
    );
};

export default Dashboard;