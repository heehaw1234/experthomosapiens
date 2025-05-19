import { useRef } from "react";

const SearchBar = ({ onFileUpload, searchTerm, onSearch }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileURL = URL.createObjectURL(file);
        onFileUpload({ title: file.name, url: fileURL });
    };

    return (
        <div id="functionbar">
            <button className = "likebtn" onClick={() => fileInputRef.current.click()}>Upload File</button>
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
    );
};

export default SearchBar;