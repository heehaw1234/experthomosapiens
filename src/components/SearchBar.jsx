import {useRef} from "react";

const SearchBar = ({ onFileUpload, username}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const fileURL = URL.createObjectURL(file);
        onFileUpload({ title: file.name, url: fileURL });
    };

    return (
        <div id="functionbar">
            <button onClick={() => fileInputRef.current.click()}>Upload File</button>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                style={{ display: 'none' }}
                accept="image/*,application/pdf"
            />
            <div            //welcome message + CSS
                style={{
                    marginTop: '10px',
                    fontSize: '18px',
                    color: '#6a4c93',
                    fontWeight: 'bold',
                    fontFamily: 'Arial, sans-serif'
                }}
            >Welcome, {username}
            </div>
        </div>
    );
};

export default SearchBar;
