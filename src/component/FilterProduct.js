import React, {useState} from 'react';

function FilterProduct(props) {
    const[price,setPrice] = useState([]);
    const[qty,setQty] = useState([]);

    const handleApplyFilter = event => {
        console.log(event)
    }

    return (
        <div>
            <input type="checkbox" name='price' value='0-5' id="price1" />
            <input type="checkbox" name='price' value='5-10' id="price2"/>
            <input type="checkbox" name='price' value='10' id="price3"/>

            <input type="checkbox" name='qty' value='0-5' id="qty1"/>
            <input type="checkbox" name='qty' value='5-10' id="qty2"/>
            <input type="checkbox" name='qty' value='10' id="qty3"/>

            <button onClick={event=>handleApplyFilter(event)}></button>
        </div>
    );
}

export default FilterProduct;