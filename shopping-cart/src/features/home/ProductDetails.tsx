import { LoadingButton } from "@mui/lab";
import { Divider, Grid, LinearProgress, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NotFound from "../../app/errors/NotFound";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { addCartItemAsync, removeCartItemAsync } from "../cart/cartSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";

export default function ProductDetails() {
    const { cart, status } = useAppSelector(state => state.cart);
    const dispatch = useAppDispatch();
    const { productid } = useParams<{ productid: string }>();
    const product = useAppSelector(state => productSelectors.selectById(state, productid));
    const { status: productStatus } = useAppSelector(state => state.home);
    const [quantity, setQuantity] = useState(0);
    const item = cart?.items.find(i => i.productId === product?.productId);

    useEffect(() => {
        if (item) setQuantity(item.quantity);
        if (!product) dispatch(fetchProductAsync(parseInt(productid)));
    }, [productid, item, dispatch, product])

    function handleInputChange(event: any) {
        if (event.target.value >= 0) {
            setQuantity(parseInt(event.target.value));
        }
    }

    function handleUpdateCart() {
        if (!item || quantity > item.quantity) {
            const updatedQuantity = item ? quantity - item.quantity : quantity;
            dispatch(addCartItemAsync({ productId: product?.productId!, quantity: updatedQuantity }))
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeCartItemAsync({ productId: product?.productId!, quantity: updatedQuantity }))
        }
    }

    if (productStatus.includes("pending")) return <LinearProgress color="secondary" />

    if (!product) return <NotFound />

    return (
        <Grid container spacing={6}>
            <Grid item xs={5}>
                <img src={product.imagePath} alt={product.name} style={{ width: "100%" }} />
            </Grid>
            <Grid item xs={7}>
                <Typography variant="h3">{product.name}</Typography>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="h4" color="secondary">${(product.price / 100).toFixed(2)}</Typography>
                <TableContainer>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>{product.name}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Category</TableCell>
                                <TableCell>{product.category}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Description</TableCell>
                                <TableCell>{product.description}</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell>{product.type}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant="outlined"
                            type="number"
                            label="Quantity in Cart"
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={item?.quantity === quantity || (!item && quantity === 0)}
                            loading={status.includes("pending")}
                            onClick={handleUpdateCart}
                            sx={{ height: "55px" }}
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                        >
                            {item ? "Update Quantity" : "Add to Cart"}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
}