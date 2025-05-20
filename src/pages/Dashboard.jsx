import { useEffect } from "react";
import SearchBar from "../components/SearchBar.jsx";
import Card from "../components/Card.jsx";
import { supabase } from "../supabase.js";

const Dashboard = ({ cards, onFileUpload, searchTerm, onSearch }) => {
    useEffect(() => {
        // Check if user is authenticated
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                // Handle not authenticated (though Route should handle this already)
                console.warn("User not authenticated in Dashboard");
            }
        };
        
        checkAuth();
    }, []);
    
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
                {filteredCards.length > 0 ? (
                    filteredCards.map((card) => (
                        <Card 
                            key={card.id} 
                            id={card.id}
                            title={card.title} 
                            url={card.url}
                            type={card.type}
                            likeCount={card.like_count || 0}
                        />
                    ))
                ) : (
                    <p>No cards found. Try uploading a new file!</p>
                )}
            </div>
            
            <div id="bottomspace1" />
            <div className="bottombar" />
            <div id="bottomspace2" />
        </>
    );
};

export default Dashboard;