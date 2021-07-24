import axios from 'axios';
import React, {useEffect, useState} from 'react'


function ListProduct() {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [qty,setQty] = useState('');
    const [description,setDescription] = useState('');
    const [images,setImages] = useState([]);

    const handleImagesChange = event =>{
        const files = Array.from(event.target.files);
        const allFiles = []
        if (files.length > 0)
        {
            files.forEach(file => {
                allFiles.push(file);
            });
            
        }
        setImages(files);
    }


    useEffect(()=>{
        const location = window.location.href
        const locationArray = location.split("/");
        const productId = locationArray[4];
        axios.get(`http://lapi.test/api/product/${productId}`)
            .then(response=>{
                const data = response.data;
                setName(data.name);
                setPrice(data.price);
                setQty(data.qty);
                setDescription(data.description);
                setImages(data.images);
            }).catch(error=>console.log(error))
    },[])
    return (
        <div>
            <div className="col-md-6">
                <input type="text" id="name" className="form-control" name="name" value = {name} onChange={(event)=>{setName(event.target.value)}}/>
            </div>
 
            <div className="col-md-6">
                <input type="text" id="price" className="form-control" name="price"  value = {price} onChange={(event)=>{setPrice(event.target.value)}}/>
            </div>
            
            <div className="col-md-6">
                <input type="text" id="qty" className="form-control" name="qty"  value = {qty} onChange={(event)=>{setQty(event.target.value)}} />
            </div>

            <div className="col-md-6">
                <input type="text" id="description" className="form-control" name="description" value = {description} onChange={(event)=>{setDescription(event.target.value)}} />
            </div>

            {images.length > 0 ?
                images.map((image)=>{
                    const imagePath = `/product_images/${image}`;
                    return(
                        <div className="col-md-6">
                            <img src={imagePath} alt=""/>
                        </div>
                    )
                })
                : null}
            <div className="col-md-6 offset-md-4">
                <button type="submit" className="btn btn-primary" onClick={(event)=>{handleBackButton(event)}}>
                Back
                </button>
            </div>

        </div>
    )
}

export default ListProduct
