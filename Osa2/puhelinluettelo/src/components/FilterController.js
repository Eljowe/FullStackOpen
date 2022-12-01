import React from 'react'


const FilterForm = (props) => {
    return(
        <div>
            filter shown with 
                <input 
                    value={props.Filter} 
                    onChange={props.handleFilterChange} 
                />
        </div>
    )
}

export default FilterForm;