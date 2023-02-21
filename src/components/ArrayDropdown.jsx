import React, { useState } from 'react';

const MyComponent = (props) => {
    const [showList, setShowList] = useState(false);

    const handleButtonClick = () => {
        setShowList(!showList);
    }

    return (
        <>
            <button onClick={handleButtonClick}>Toggle Dropdown</button>
            {showList &&
                <ul>
                    {props.items.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            }
        </>
    )
}
