import axios from 'axios';
import React,{useState} from 'react'


function CreateProduct() {
    const [name,setName] = useState('');
    const [price,setPrice] = useState('');
    const [qty,setQty] = useState('');
    const [description,setDescription] = useState('');
    const [images,setImages] = useState([]);
    const [validationErrors,setValidationErrors] = useState([]);
    
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
    const handleButtonSubmit = event =>{
        const formData = new FormData()
        if(images.length > 0){
            images.forEach((image) => {
                formData.append('images[]', image);
            });
        }
        formData.append('name',name);
        formData.append('price',price);
        formData.append('qty',qty);
        formData.append('description',description);
        axios({
            method: "post",
            url: `http://lapi.test/api/product`,
            data: formData,
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then(response=>console.log(response.data))
        .catch(error=>{
            if(error.response.status==422){
                let {errors} = error.response.data;
                // const tempValidationErrors = Object.entries(errors);
                let tempValidationErrors = Object.values(errors);
                let flatValidationErrors = tempValidationErrors.flat(5)
                setValidationErrors(flatValidationErrors);
            }
            
        })
    }
    const showValidationErrors = () =>{
        let content,allErrors = null;
        if(validationErrors.length > 0)
        {
            allErrors = validationErrors.map((singleError,index)=>{
              return <p key={index} >{singleError}</p>
            })
            content = <div className={'alert-danger text-center'} >{allErrors}</div>;
        }
        return content;
    }
    return (
        <div>
            {showValidationErrors()}
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
            
            <div className="col-md-6">
                <input type="file" id="images" className="form-control" name="images[]" multiple onChange={(event)=>{handleImagesChange(event)}}/>
            </div>

            <div className="col-md-6 offset-md-4">
                <button type="submit" className="btn btn-primary" onClick={(event)=>{handleButtonSubmit(event)}}>
                Register
                </button>
            </div>
                            
        </div>
    )
}

export default CreateProduct
