import React, {useState} from 'react';

const ModSearchBar = ({fetchCards}) => {

    const [curMod, setCurMod] = useState('');

    return (
        <div className='functionBar'>
            <form>
                <input
                    type="text"
                    placeholder="Search by module..."
                    className="text_input_bar"
                    value={curMod}
                    onChange={(e) => setCurMod(e.target.value)}
                />
                <button
                    type="submit"
                    className="like-btn"
                    onClick={() => fetchCards(curMod)}
                >
                    Search
                </button>
            </form>
        </div>
    )
}

export default ModSearchBar;