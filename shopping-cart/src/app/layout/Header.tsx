import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import ProductSearch from "../components/ProductSearch";
import { useAppSelector } from "../store/ConfigureStore";
import SignedInMenu from "./SignedInMenu";

const rightLinks = [
    { title: "login", path: "/login" },
    { title: "register", path: "/register" }
]

const navStyles = {
    color: "inherit",
    textDecoration: "none",
    typography: "h6",
    "&:hover": {
        color: "grey.500"
    },
    "&.active": {
        color: "text.secondary"
    }
}

export default function Header() {
    const { cart } = useAppSelector(state => state.cart);
    const { user } = useAppSelector(state => state.account);
    const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0)

    return (
        <>
            <AppBar position="sticky" sx={{ mb: 4 }}>
                <Toolbar sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" component={NavLink} to="/" exact sx={navStyles}>
                        SHOPPING CART
                    </Typography>

                    <ProductSearch />

                    <Box display="flex" alignItems="center">
                        <IconButton component={Link} to="/cart" size="large" sx={{ color: "inherit" }}>
                            <Badge badgeContent={itemCount} color="secondary">
                                <ShoppingCart />
                            </Badge>
                        </IconButton>
                        {user ? (
                            <SignedInMenu />
                        ) : (
                            <List sx={{ display: "flex" }}>
                                {rightLinks.map(({ title, path }) => (
                                    <ListItem
                                        component={NavLink}
                                        to={path}
                                        key={path}
                                        sx={navStyles}
                                    >
                                        {title.toUpperCase()}
                                    </ListItem>
                                ))}
                            </List>
                        )}
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}