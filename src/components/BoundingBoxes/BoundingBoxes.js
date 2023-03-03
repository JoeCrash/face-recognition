import React from 'react';

const BoundingBoxes = ({box}) => {
    const boxesComponent = box.map((_box, i) => {
        return <div key={i} className='bounding-box' style={{top: _box.top, bottom: _box.bottom, left: _box.left, right: _box.right}}></div>
    })
    return (
        <>
            {boxesComponent};
        </>
    )
}

export default BoundingBoxes;