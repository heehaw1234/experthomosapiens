import SearchBar from "../components/SearchBar.jsx";
import Card from "../components/Card.jsx";
import { getAuth } from "firebase/auth";

const Dashboard = ({ cards, onFileUpload, searchTerm, onSearch }) => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    const cardBlkStyle = {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '2rem'
    }

    // Safety check in case component renders before auth is fully loaded
    if (!user) {
        return <div>Loading user data...</div>;
    }
    
    const atIndex = user.email.indexOf("@");
    const username = user.email.substring(0, atIndex);
    
    const filteredCards = cards.filter(card =>
        card.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    return (
        <>
            <SearchBar onFileUpload={onFileUpload} username={username}/>
            <input
                type="text"
                placeholder="Search by title..."
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
            />
            <div style={cardBlkStyle}>
                {filteredCards.map((card, index) => (
                    <Card key={index} title={card.title} url={card.url} type={card.type}/>
                ))}
            </div>
            <div id="bottomspace1" />
            <div className="bottombar" />
            <div id="bottomspace2" />
        </>
    );
};

export default Dashboard;