import { Button, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../app/store/ConfigureStore";
import CartSummary from "./CartSummary";
import CartTable from "./CartTable";

export default function CartPage() {
    const { cart } = useAppSelector(state => state.cart);

    if (!cart) return <Typography variant="h3">Your cart is empty</Typography>

    return (
        <>
            <CartTable items={cart.items} />
            <Grid container>
                <Grid item xs={7} />
                <Grid item xs={5}>
                    <CartSummary />
                    <Button
                        component={Link}
                        to="/checkout"
                        variant="contained"
                        size="large"
                        fullWidth
                    >
                        Checkout
                    </Button>
                </Grid>
            </Grid>
        </>
    )
}