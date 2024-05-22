import { useFormik } from "formik";
import MailSVG from "../assets/icon/MailSVG";
import PasswordSVG from "../assets/icon/PasswordSVG";
import * as Yup from "yup";
import axios from "axios";
import {backEndDomain} from "../assets/constance/Constance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, saveToken } from "../redux/features/tokenSlice";
import PersonSVG from "../assets/icon/PersonSVG";
import { useNavigate } from "react-router-dom";

function RegisterPage(params) {
    let dispatch = useDispatch();
    let navigate = useNavigate();

    const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rePassword: "",
      name: "",
    },
    validationSchema: Yup.object({
     email: Yup.string()
        .email("Invalid email format!")
        .max(100,"Maximum 100 characters!")
        .required("Required!"),
     password: Yup.string()
        .min(8, "Minimum 8 characters!")
        .max(100,"Maximum 100 characters!")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d$@$!%*?&]).*$/,"At least one uppercase letter, one lowercase, one number or special character")
        .required("Required!"),
     rePassword: Yup.string()
        .oneOf([Yup.ref("password")], "Password's not match")
        .required("Required!"),
     name: Yup.string()
        .min(2,"Minimum 2 characters!")
        .max(100,"Maximum 100 characters!")
        .matches(/^[a-z A-Z]+$/, 'Only alphabetic characters')
        .required("Required!"),
    }),
    onSubmit: async values =>  {
    await handleSubmit(values);  
  }
  });
  function handleSubmit(values) {
  axios.post(`${backEndDomain}/api/auth/register`,values)
    .then(response => {
        console.log(response.data.statusCode);
        if(response.data.statusCode === "00"){
            toast.success("Register sucess!");
            navigate("/login");
        }else{
            toast.error("Email already exists");
        }
    })
    .catch(error => toast.error("Register fail!"));
  }
function handleGoToLogin(params) {
    navigate("/login");
}
  
    return (
            <div className="register-page">
                <form onSubmit={formik.handleSubmit} className="register-page-form">
                    <h1 className="register-page-form-header">Register</h1>
                    <div className="register-page-form-name">
                        <label className="register-page-form-name-label" htmlFor="name">
                            <span>Full Name: </span> {formik.errors.name && formik.touched.name && (
                        <span className="errorText">{formik.errors.name}</span>
                        )}
                        </label>
                        <div className="register-page-form-name-field">
                            <div className="register-page-form-name-field-logo">
                                    <PersonSVG/>
                            </div>
                            <input className="register-page-form-name-field-input"
                            type="text"
                            name="name"
                            id="name"
                            value={formik.values.name}
                            onChange={formik.handleChange} 
                            />
                        </div>
                    </div>
                    <div className="register-page-form-username">
                        <label className="register-page-form-username-label" htmlFor="email">
                            <span>Email: </span> {formik.errors.email && formik.touched.email && (
                        <span className="errorText">{formik.errors.email}</span>
                        )}
                        </label>
                        <div className="register-page-form-username-field">
                            <div className="register-page-form-username-field-logo">
                                    <MailSVG/>
                            </div>
                            <input className="register-page-form-username-field-input"
                            type="email"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange} 
                            />
                        </div>
                    </div>
                    <div className="register-page-form-password">
                        <label className="register-page-form-password-label" htmlFor="password">
                           <span>Password: </span> {formik.errors.password && formik.touched.password && (
                            <span className="errorText">{formik.errors.password}</span>
                            )}
                        </label>
                        <div className="register-page-form-password-field">
                            <div className="register-page-form-password-field-logo">
                                    <PasswordSVG/>
                            </div>
                            <input id="password" className="register-page-form-password-field-input"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange} 
                            />
                        </div>
                    </div>
                    <div className="register-page-form-rePassword">
                        <label className="register-page-form-rePassword-label" htmlFor="rePassword">
                           <span>Confirm Password: </span> {formik.errors.rePassword && formik.touched.rePassword && (
                            <span className="errorText">{formik.errors.rePassword}</span>
                            )}
                        </label>
                        <div className="register-page-form-rePassword-field">
                            <div className="register-page-form-rePassword-field-logo">
                                    <PasswordSVG/>
                            </div>
                            <input id="rePassword" className="register-page-form-rePassword-field-input"
                            type="password"
                            name="rePassword"
                            value={formik.values.rePassword}
                            onChange={formik.handleChange} 
                            />
                        </div>
                    </div>
                        <button className="register-page-form-submit" type="submit">Register</button>
                        <div onClick={()=>handleGoToLogin()} className="register-page-form-login">Login</div>
                </form>
            </div>
    )
}
export default RegisterPage;