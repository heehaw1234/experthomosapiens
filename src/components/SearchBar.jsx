import { useRef, useState } from "react";

const SearchBar = ({ onFileUpload, searchTerm, onSearch }) => {
    const fileInputRef = useRef(null);
    const [customTitle, setCustomTitle] = useState("");

    const handleUploadClick = () => {
        const title = prompt("Enter a title for the file:");
        if (title) {
            setCustomTitle(title);
            fileInputRef.current.click();  // Open file selector after title input
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file || !customTitle) return;

        const fileURL = URL.createObjectURL(file);
        onFileUpload({ title: customTitle, url: fileURL });
        setCustomTitle("");  // Reset after upload
        event.target.value = "";  // Reset file input so same file can be re-uploaded
    };

    return (
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
    );
};

export default SearchBar;
