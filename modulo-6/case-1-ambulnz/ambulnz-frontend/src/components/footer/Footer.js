import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { goToCartPage, goToHomePage, goToProfilePage } from "../../routes/cordinator";
import home from "../../assets/home.png"
import cart from "../../assets/cart.png"
import profile from "../../assets/profile.png"
import { FooterRappi } from "./styled";

function Footer () {

    const navigate = useNavigate()

    return (
        <FooterAmbulnz>
            
                <img width={"20px"} src={home}onClick={() => goToHomePage(navigate)} />
                <img width={"20px"} src={cart} onClick={() => goToCartPage(navigate)} />
                <img width={"20px"} src={profile} onClick={() => goToProfilePage(navigate)} />

        </FooterAmbulnz>
    )
}

export default Footer;