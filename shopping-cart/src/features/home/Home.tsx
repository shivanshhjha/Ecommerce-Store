import { Grid, LinearProgress, Paper } from "@mui/material";
import { useEffect } from "react";
import AppPagination from "../../app/components/AppPagination";
import CheckboxButtons from "../../app/components/CheckboxButtons";
import RadioButtonGroup from "../../app/components/RadioButtonGroup";
import { useAppDispatch, useAppSelector } from "../../app/store/ConfigureStore";
import { fetchFilters, fetchProductsAsync, productSelectors, setPageNumber, setProductParams } from "./catalogSlice";
import ProductCard from "./ProductCard";
import ProductCardSkeleton from "./ProductCardSkeleton";

const sortOptions = [
    { value: "name", label: "Alphabetical" },
    { value: "priceDesc", label: "Price - High to low" },
    { value: "price", label: "Price - Low to high" },
]

export default function Home() {
    const products = useAppSelector(productSelectors.selectAll);
    const { productsLoaded, filtersLoaded, categories, types, productParams, metaData } = useAppSelector(state => state.home);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!productsLoaded) dispatch(fetchProductsAsync());
    }, [dispatch, productsLoaded])

    useEffect(() => {
        if (!filtersLoaded) dispatch(fetchFilters());
    }, [dispatch, filtersLoaded])

    if (!filtersLoaded) return <LinearProgress color="secondary" />;

    return (
        <Grid container columnSpacing={4} rowSpacing={2}>
            <Grid item xs={3}>
                <Paper sx={{ mb: 2, p: 2 }}>
                    <RadioButtonGroup
                        selectedValue={productParams.orderBy}
                        options={sortOptions}
                        onChange={event => dispatch(setProductParams({ orderBy: event.target.value }))}
                    />
                </Paper>

                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={categories}
                        checked={productParams.categories}
                        onChange={(items: string[]) => dispatch(setProductParams({ categories: items }))}
                    />
                </Paper>

                <Paper sx={{ mb: 2, p: 2 }}>
                    <CheckboxButtons
                        items={types}
                        checked={productParams.types}
                        onChange={(items: string[]) => dispatch(setProductParams({ types: items }))}
                    />
                </Paper>
            </Grid>

            <Grid item xs={9}>
                <Grid container spacing={4}>
                    {products.map(product => (
                        <Grid item xs={4} key={product.productId}>
                            {!productsLoaded ? (
                                <ProductCardSkeleton />
                            ) : (
                                <ProductCard product={product} />
                            )}
                        </Grid>
                    ))}
                </Grid>
            </Grid>

            <Grid item xs={3} />
            <Grid item xs={9} sx={{ mb: 2 }}>
                {metaData &&
                    <AppPagination
                        metaData={metaData}
                        onPageChange={(page: number) => dispatch(setPageNumber({ pageNumber: page }))}
                    />}
            </Grid>
        </Grid>
    )
}