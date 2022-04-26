import { Search } from "@mui/icons-material";
import { alpha, debounce, InputBase, styled } from "@mui/material";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/ConfigureStore";
import { setProductParams } from "../../features/home/catalogSlice";

const SearchField = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '30ch',
        },
    },
}));

export default function ProductSearch() {
    const { productParams } = useAppSelector(state => state.home);
    const [searchTerm, setSearchTerm] = useState(productParams.searchTerm);
    const dispatch = useAppDispatch();

    const debouncedSearch = debounce(event => {
        dispatch(setProductParams({ searchTerm: event.target.value }))
    }, 1000)

    return (
        <SearchField>
            <SearchIconWrapper>
                <Search />
            </SearchIconWrapper>
            <StyledInputBase
                placeholder="Search products"
                inputProps={{ 'aria-label': 'search' }}
                value={searchTerm || ""}
                onChange={event => {
                    setSearchTerm(event.target.value);
                    debouncedSearch(event);
                }}
            />
        </SearchField>
    )
}