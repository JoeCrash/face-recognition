import React from 'react';
import './FaceRecognition.css';
import BoundingBoxes from '../BoundingBoxes/BoundingBoxes';
const FaceRecognition = ({imageUrl, box}) => {
    return (
        <div className="center ma">
            <div className="absolute mt2">
                <img id='inputImage' src={imageUrl} alt="" width='500px' height='auto'/>
                <BoundingBoxes box={box} />
            </div>
        </div>
    );
}

export default FaceRecognition;