import React, { useState } from 'react';
import CommonForm from '../components/CommonForm';

const hidden = {
    transform: 'translateX(-100%)',
    opacity: 0,
};

const DataEntry = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <CommonForm setIsVisible={setIsVisible} isVisible={isVisible} />

            {isVisible && (
                <div
                    style={{
                        width: '100%',
                    }}>
                    Табличечка ЪЪЪ
                </div>
            )}
        </>
    );
};

export default DataEntry;
