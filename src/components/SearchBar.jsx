import { useRef, useState } from "react";
import './NavBar.css';

const SearchBar = ({ onFileUpload, searchTerm, onSearch }) => {
    const fileInputRef = useRef(null);
    const [showTitleModal, setShowTitleModal] = useState(false);
    const [pendingFile, setPendingFile] = useState(null);
    const [customTitle, setCustomTitle] = useState("");

    // Open file selector
    const handleUploadClick = () => {
        fileInputRef.current.value = "";
        fileInputRef.current.click();
    };

    // After file is picked, show modal for title
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;
        setPendingFile(file);
        setShowTitleModal(true);
    };

    // Handle modal submit
    const handleTitleSubmit = (e) => {
        e.preventDefault();
        if (!pendingFile || !customTitle.trim()) return;
        onFileUpload({
            title: customTitle.trim(),
            file: pendingFile,
            fileName: pendingFile.name,
            type: pendingFile.type
        });
        setCustomTitle("");
        setPendingFile(null);
        setShowTitleModal(false);
    };

    // Handle modal cancel
    const handleModalCancel = () => {
        setShowTitleModal(false);
        setPendingFile(null);
        setCustomTitle("");
    };

    return (
        <>
            <div id="functionbar">
                <button className="likebtn" onClick={handleUploadClick}>Upload File</button>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept="image/*,application/pdf"
                />
                <input
                    id="search_bar"
                    type="text"
                    placeholder="Search by title..."
                    value={searchTerm}
                    onChange={(e) => onSearch(e.target.value)}
                />
            </div>
            {showTitleModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <form onSubmit={handleTitleSubmit}>
                            <label htmlFor="custom-title-input" style={{ color: "#f7c873" }}>
                                Enter a title for your file:
                            </label>
                            <input
                                id="custom-title-input"
                                type="text"
                                value={customTitle}
                                onChange={e => setCustomTitle(e.target.value)}
                                autoFocus
                                style={{
                                    margin: "1rem 0",
                                    padding: "0.7rem 1rem",
                                    borderRadius: "10px",
                                    border: "1px solid #353a5a",
                                    background: "#181c2f",
                                    color: "#e0e0e0",
                                    fontSize: "1rem",
                                    width: "100%"
                                }}
                            />
                            <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                                <button
                                    type="button"
                                    onClick={handleModalCancel}
                                    style={{
                                        background: "#353a5a",
                                        color: "#f7c873",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "0.5rem 1.2rem",
                                        cursor: "pointer"
                                    }}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    style={{
                                        background: "#f7c873",
                                        color: "#232946",
                                        border: "none",
                                        borderRadius: "8px",
                                        padding: "0.5rem 1.2rem",
                                        fontWeight: "700",
                                        cursor: "pointer"
                                    }}
                                    disabled={!customTitle.trim()}
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default SearchBar;