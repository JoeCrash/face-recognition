import React from 'react';

const Rank = ({name, entries}) => {
    return (
        <div>
            <h2>
                {`${name}, your current entry count is...`}
            </h2>
            <h3>
                {entries}
            </h3>
        </div>
    );
}

export default Rank;