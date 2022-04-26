import { Button, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { CartItem } from "../../app/models/cart";
import { Order } from "../../app/models/order";
import CartSummary from "../cart/CartSummary";
import CartTable from "../cart/CartTable";

interface Props {
    order: Order;
    setSelectedOrder: (id: number) => void;
}

export default function OrderDetailed({ order, setSelectedOrder }: Props) {
    const total = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} gutterBottom variant='h4'>Order# {order.id}</Typography>
                <Button onClick={() => setSelectedOrder(0)} sx={{ m: 2 }} size='large' variant='contained'>Back to orders</Button>
            </Box>
            <CartTable items={order.orderItems as CartItem[]} isCart={false} />
            <Grid container>
                <Grid item xs={6} />
                <Grid item xs={6}>
                    <CartSummary total={total} />
                </Grid>
            </Grid>
        </>
    )
}