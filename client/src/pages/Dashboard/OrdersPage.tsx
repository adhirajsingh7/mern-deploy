import React, { useState } from "react";
import { Chip, Stack, TablePagination, Typography } from "@mui/material";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useGetOrders } from "@/features/orders/api/getOrders";
import { orderTableColumns } from "@/lib/constants";
import { CancelOrder, DeleteOrder, ViewOrder } from "@/components/Orders";

const OrdersPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { isPending, data: ordersList } = useGetOrders({
    page,
    rowsPerPage,
  });
  // console.log(ordersList);

  if (isPending) {
    return (
      <Stack justifyContent="center" alignItems="center" sx={{ height: 1 }}>
        <ClimbingBoxLoader color="#FE6D87" size={25} />
      </Stack>
    );
  }

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Stack
        direction="column"
        sx={{ p: 2, width: 1, overflow: "auto" }}
        gap={2}
      >
        <Typography variant="h5">Orders</Typography>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {orderTableColumns.map((column) => (
                  <TableCell key={column} align="left">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {ordersList?.data?.length > 0 ? (
                ordersList.data.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      {row._id}
                    </TableCell>
                    <TableCell align="left">
                      <Chip
                        label={row.status}
                        sx={{
                          bgcolor:
                            row?.status === "cancelled" ? "#C51220" : "#ff8829",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">${row.total_amount}</TableCell>
                    <TableCell align="left">
                      <ViewOrder order={row} />
                      {row.status !== "cancelled" && (
                        <CancelOrder orderId={row._id} />
                      )}
                      {row.status === "cancelled" && (
                        <DeleteOrder orderId={row._id} />
                      )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell scope="row" align="center" colSpan={4}>
                    No orders placed yet
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" justifyContent="flex-end">
          {ordersList?.data?.length !== 0 && (
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              count={ordersList.total}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default OrdersPage;
