import React, { useState } from 'react';
import CommonForm from '../components/CommonForm';
import AdditionalForm from '../components/AdditionalForm';

const hidden = {
    transform: 'translateX(-100%)',
    opacity: 0,
};

const DataEntry = () => {
    const [isVisible, setIsVisible] = useState(false);

    return (
        <>
            <CommonForm setIsVisible={setIsVisible} />

            {isVisible && <AdditionalForm />}
        </>
    );
};

export default DataEntry;
