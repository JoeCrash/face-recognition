import React from 'react';
import './ImageLinkForm.css';
const ImageLinkForm = ({onInputChange, onImageSubmit}) => {
    return (
        <div>
            <p className="f3">
                {'This AI will detect the faces in your images. Paste a link to begin'}
            </p>
            <div className='center'>
                <div className="form center pa4 br3 shadow-5">
                    <input type="text" className='f4 pa2 w-70 center' onChange={onInputChange} />
                    <button onClick={onImageSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-blue'>Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;