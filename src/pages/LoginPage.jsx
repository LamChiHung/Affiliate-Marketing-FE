import { useFormik } from "formik";
import MailSVG from "../assets/icon/MailSVG";
import PasswordSVG from "../assets/icon/PasswordSVG";
import * as Yup from "yup";
import axios from "axios";
import {backEndDomain} from "../assets/constance/Constance";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { selectToken, saveToken } from "../redux/features/tokenSlice";
import { useNavigate } from "react-router-dom";

function LoginPage(params) {
    let dispatch = useDispatch();
    let navigate = useNavigate();
    const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Invalid email format!")
        .max(100, "Maximum 100 characters!")
        .required("Required!"),
      password: Yup.string()
        .max(100, "Maximum 100 characters!")
        .required("Required!"),
    }),
    onSubmit: async values =>  {
    await handleSubmit(values);  
  }
  });
  function handleSubmit(values) {
  axios.post(`${backEndDomain}/api/auth/login`,values)
    .then(response => {
        toast.success("Login success!");
        dispatch(saveToken(response.data.data));
        navigate("/home")
    })
    .catch(error => toast.error("Login fail!"));
  }
  function handleGoToRegister(params) {
    navigate("/register");
  }

  
    return (
            <div className="login-page">
                <form onSubmit={formik.handleSubmit} className="login-page-form">
                    <h1 className="login-page-form-header">Login</h1>
                    <div className="login-page-form-username">
                        <label className="login-page-form-username-label" htmlFor="email">
                            <span>Email: </span> {formik.errors.email && formik.touched.email && (
                        <span className="errorText">{formik.errors.email}</span>
                        )}
                        </label>
                        <div className="login-page-form-username-field">
                            <div className="login-page-form-username-field-logo">
                                    <MailSVG/>
                            </div>
                            <input className="login-page-form-username-field-input"
                            type="email"
                            name="email"
                            id="email"
                            value={formik.values.email}
                            onChange={formik.handleChange} 
                            />
                        </div>
                        
                    </div>
                    <div className="login-page-form-password">
                        <label className="login-page-form-password-label" htmlFor="password">
                           <span>Password: </span> {formik.errors.password && formik.touched.password && (
                            <span className="errorText">{formik.errors.password}</span>
                            )}
                        </label>
                        <div className="login-page-form-password-field">
                            <div className="login-page-form-password-field-logo">
                                    <PasswordSVG/>
                            </div>
                            <input id="password" className="login-page-form-password-field-input"
                            type="password"
                            name="password"
                            value={formik.values.password}
                            onChange={formik.handleChange} 
                            />
                        </div>
                    </div>
                        <button className="login-page-form-submit" type="submit">Login</button>
                        <div onClick={()=>handleGoToRegister()} className="login-page-form-register">Register</div>
                </form>
            </div>
    )
}
export default LoginPage;