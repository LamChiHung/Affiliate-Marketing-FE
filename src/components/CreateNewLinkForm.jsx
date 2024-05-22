import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../configs/privateAxios";
import { backEndDomain } from "../assets/constance/Constance";
import { toast } from "react-toastify";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectLink, saveFormDisplay, saveLinks } from "../redux/features/linkSlice";


function CreateNewLinkForm(params) {
    let link = useSelector(selectLink);
    let dispatch = useDispatch();

    const formik = useFormik({
    initialValues: {
      productName: "",
    },
    validationSchema: Yup.object({
      productName: Yup.string()
        .min(2, "Minimum 2 characters!")
        .max(100,"Maximum 100 characters!" )
        .matches(/^[a-zA-z0-9 ]+$/, "Special character not allowed!" )
        .required("Required!"),
    }),
    onSubmit: async values =>  {
    await handleSubmit(values);  
  }
  });
  function handleSubmit(values) {
  axios.post(`${backEndDomain}/api/links`,values)
    .then(response => {
        if(response.data.statusCode === "00"){
            dispatch(saveLinks([response.data.data,...link.links]));
            toast.success("Create link success!");
            dispatch(saveFormDisplay("none"));
        }else{
            toast.error("The product exists!")
        }
    })
    .catch(error => toast.error("Create link fail!"));
  }
  function handleCancel(params) {
    dispatch(saveFormDisplay("none"));
  }
    return(
        <div style={{display: link.formDisplay}} className="createNewLinkForm">
            <form onSubmit={formik.handleSubmit} className="createNewLinkForm-form">
                <div className="createNewLinkForm-form-header">
                    <h1>Create New Link</h1>
                </div>
                <div className="createNewLinkForm-form-label">
                    <p>
                        Input the product name:
                    </p>
                </div>
                <input  
                    type="text"
                    name="productName"
                    id="productName"
                    value={formik.values.productName}
                    onChange={formik.handleChange}
                    className="createNewLinkForm-form-input">
                </input>
                {formik.errors.productName && (<div className="errorText">{formik.errors.productName}</div>)}
                <div className="createNewLinkForm-form-footer">
                    <button onClick={()=>handleCancel()} className="createNewLinkForm-form-footer-cancel">Cancel</button>
                    <button type="submit" className="createNewLinkForm-form-footer-submit">Create Link</button>
                </div>
            </form>
        </div>
    )
}
export default CreateNewLinkForm;