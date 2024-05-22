import { useEffect} from "react";
import LogoSVG from "../assets/icon/LogoSVG"
import LogoutSVG from "../assets/icon/LogoutSVG"
import PersonSVG from "../assets/icon/PersonSVG"
import axios from "../configs/privateAxios";
import { useDispatch, useSelector } from "react-redux";
import {selectUser, saveName, saveEmail, saveReward } from "../redux/features/userSlice";
import {removeToken} from "../redux/features/tokenSlice";
import { useNavigate } from "react-router-dom";
import RewardSVG from "../assets/icon/RewardSVG";

function Header(params) {
    let dispatch = useDispatch();
    let user = useSelector(selectUser);
    let navigate = useNavigate();


    useEffect(()=>{
        axios.get("/api/users")
        .then(response => {
            console.log(response.data);
            dispatch(saveName(response.data.data.name));
            dispatch(saveEmail(response.data.data.email));
            dispatch(saveReward(response.data.data.reward));
        })
        .catch(error => console.log(error))
    })

    function handleLogout(params) {
        dispatch(removeToken());
        navigate("/login");
    }

    function handleNavigateToHome(){
        navigate("/home");
    }
    return(
        <div className="header">
            <div className="header-background">
                <div className="header-background-container">
                    <div onClick={()=>handleNavigateToHome()} className="header-background-container-left">
                        <span className="header-background-container-left-logo">
                            <LogoSVG/>
                        </span>
                        <span className="header-background-container-left-text">
                            Affiliate Marketing
                        </span>
                    </div>
                    <div className="header-background-container-right">
                        <div className="header-background-container-right-group1">
                            <span className="header-background-container-right-reward">
                            <RewardSVG/>
                            </span>
                            <span className="header-background-container-right-rewardPoint">
                            {user.reward}
                            </span>
                        </div>
                        <div className="header-background-container-right-group2">
                            <span className="header-background-container-right-person">
                            <PersonSVG/>
                            </span>
                            <span className="header-background-container-right-name">
                            {user.name}
                            </span>
                        </div>
                        <div onClick={()=>handleLogout()} className="header-background-container-right-group3">
                            <span className="header-background-container-right-logout">
                                <LogoutSVG/>
                            </span>
                            <span className="header-background-container-right-logoutText">
                                Logout
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Header;