import { TableContainer, Paper, Table, TableRow, TableCell, TableHead } from "@mui/material";
import { useAppSelector } from "../../app/store/ConfigureStore";

interface Props {
    total?: number;
}

export default function CartSummary({ total }: Props) {
    const { cart } = useAppSelector(state => state.cart);
    if (total === undefined)
        total = cart?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

    return (
        <>
            <TableContainer component={Paper} variant={'outlined'}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={2}>Total</TableCell>
                            <TableCell sx={{ pl: 15 }}>${(total / 100).toFixed(2)}</TableCell>
                        </TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </>
    )
}