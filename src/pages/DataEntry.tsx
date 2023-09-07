import React, { useState } from 'react';
import CommonForm from '../components/CommonForm';
import AdditionalForm from '../components/AdditionalForm';
import { useTypedSelector } from '../store/hooks';

// const hidden = {
//     transform: 'translateX(-100%)',
//     opacity: 0,
// };

const DataEntry: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);
    const { data } = useTypedSelector((store) => store.inputData);

    React.useEffect(() => {
        console.log(data.DataCalculated);
    }, [data.DataCalculated]);

    return (
        <>
            <CommonForm setIsVisible={setIsVisible} />

            {isVisible && <AdditionalForm />}
        </>
    );
};

export default DataEntry;
