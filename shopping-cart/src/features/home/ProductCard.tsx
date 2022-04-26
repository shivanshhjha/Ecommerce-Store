import { LoadingButton } from "@mui/lab";
import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "react-router-dom";
import agent from "../../app/api/agent";
import { Product } from "../../app/models/product"
import { useAppDispatch } from "../../app/store/ConfigureStore";
import { setCart } from "../cart/cartSlice";

interface Props {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    const [loading, setLoading] = useState(false);
    const dispatch = useAppDispatch();

    function handleAddItem(productId: number) {
        setLoading(true);
        agent.Cart.addItem(productId)
            .then(cart => dispatch(setCart(cart)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false));
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: "secondary.main" }}>
                        {product.name.charAt(0).toUpperCase()}
                    </Avatar>
                }
                title={product.name}
                titleTypographyProps={{
                    sx: { fontWeight: "bold", color: "primary.main" }
                }}
            />
            <CardMedia
                sx={{ height: 140, backgroundSize: "contain", bgcolor: "primary.light" }}
                image={product.imagePath}
                title={product.name}
            />
            <CardContent>
                <Typography gutterBottom color="secondary" variant="h5">
                    ${(product.price / 100).toFixed(2)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.category} / {product.type}
                </Typography>
            </CardContent>
            <CardActions>
                <LoadingButton
                    loading={loading}
                    onClick={() => handleAddItem(product.productId)}
                    size="small">Add to cart</LoadingButton>
                <Button component={Link} to={`/products/${product.productId}`} size="small">View</Button>
            </CardActions>
        </Card>
    )
}