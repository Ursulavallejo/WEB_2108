import {useState, useContext} from "react";
import BasketList from "../basket/BasketList";
import StoreContext from "../../context/storeContext";

import logoShop from '../../utils/images/amoeba.gif'
import {FaCartArrowDown} from "react-icons/fa";
import {BsBasketFill} from "react-icons/bs";
import css from "./Header.module.css";


function Header() {
    const productOnCartCtx = useContext(StoreContext);
    const [cartIsOpen, setCartIsOpen] = useState(false);

    function cartHandler() {
        setCartIsOpen(true);
    }

    function closeCartHandler() {
        if (cartIsOpen === true) {
            setCartIsOpen(false);
        }
    }

    function messageExitPayment() {
        alert('Thanks for your purchase!! Hope to see you again')
    }

    return (
        <header>
            <div className={css.gridContainerHeader}>
                <div className={css.logo}>
                    <img src={logoShop} alt="Logo Amoeba"/>
                </div>
                <div className={css.title}>
                    <h1 data-testid='header'>AMOEBA STORE: The Best Music</h1>
                </div>
                <div className={css.checkOut}>
                    <div onClick={() => {
                        cartHandler()
                        closeCartHandler()
                    }}>
                        <button data-testid='openBtnCart'
                                className={css.checkoutDropdownButton}>
                            <BsBasketFill/>
                            <span data-testid='btnCart' className={css.label}>ShopCart</span></button>
                        <h4 className={css.iconCart}>( {productOnCartCtx.productOnCart.reduce((total, album) => total + album.quantity, 0)} )<FaCartArrowDown/>
                        </h4>
                    </div>
                    {cartIsOpen && <BasketList onCancel={closeCartHandler} onConfirm={messageExitPayment}/>}
                </div>
            </div>
            <div className={css.searchArea}>
                <input data-testid='input' type="text" placeholder='artist name, keywords'/>
                <button data-testid='btnSearch'>SEARCH</button>
            </div>
        </header>
    )
}

export default Header