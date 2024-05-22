import axios from "axios";
import { useEffect, useState } from "react"
import { backEndDomain,frontEndDomain } from "../assets/constance/Constance";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ConfirmPage(params) {
    let [link,setLink] = useState({});
    let navigate  = useNavigate();
    useEffect(()=>{
        let url = window.location.href;
        url = backEndDomain +"/api"+ url.split(frontEndDomain)[1];
        axios.get(url)
        .then(response=>{
            if(response.data.statusCode === "00"){
            setLink(response.data.data)
        } else{
            toast.error(response.data.message);
        }
        })
        .catch(error => toast.error("The link is not valid!"))
    },[])

function handleSubmit(params) {
    let url = window.location.href;
    url = backEndDomain +"/api"+ url.split(frontEndDomain)[1];
    axios.post(url)
    .then(response=>{
        if(response.data.statusCode === "00"){
            toast.success(response.data.message);
            navigate("/thanks");
        } else{
            toast.error(response.data.message);
        }
    })
    .catch(error => toast.error("The link is not valid"))
}
    return(
        <div className="confirmPage">
            <div className="confirmPage-form">
                <div className="confirmPage-form-header">
                    <h1>Confirm purchase product</h1>
                </div>
                <div className="confirmPage-form-product">
                    <span className="confirmPage-form-product-label">Product Name: </span>
                    <span className="confirmPage-form-product-text">{link.productName}</span>
                </div>
                <div className="confirmPage-form-price">
                    <span className="confirmPage-form-price-label">Price: </span>
                    <span className="confirmPage-form-price-text">*** *** *** VND</span>
                </div>
                <div className="confirmPage-form-seller">
                    <span className="confirmPage-form-seller-label">Seller: </span>
                    <span className="confirmPage-form-seller-text">{link.sellerName}</span>
                </div>
                <div className="confirmPage-form-confirm">
                    <button onClick={()=>handleSubmit()}  className="confirmPage-form-confirm-button">Purchase</button>
                </div>
            </div>
        </div>
    )
}
export default ConfirmPage