
import RequireAuth from "../layouts/RequireAuth"
import Layout from "../layouts/layout"
import ShoppingCart from "./shoppingcart"
import './shoppingcart.css'

export const ShoppingCartMobile = ()=>{
    return(
        <RequireAuth>
            <Layout>
                <ShoppingCart>
                    
                </ShoppingCart>
            </Layout>
        </RequireAuth>
        )
}