import {useRef} from "react";

const SearchBar = ({ onFileUpload }) => {
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
        </div>
    );
};

export default SearchBar;
