import {
  Chip,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { userTableColumns } from "@/lib/constants";
import { SearchComponent } from "@/components/Elements/Search";
import { useGetUsersList } from "@/features/users/api/getUsersList";
import {
  ChangeMerchantStatus,
  DeleteMerchant,
  MerchantsFilter,
} from "@/components/Merchants";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import useDebounce from "@/hooks/useDebounce";

const MerchantsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const debouncedSearch = useDebounce(search, 500);

  const { isPending, data: usersList } = useGetUsersList({
    page,
    rowsPerPage,
    debouncedSearch,
    status,
  });

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

  function handleSearchChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setSearch(event.target.value);
    setPage(0);
  }

  const handleClearText = () => {
    setSearch("");
  };

  return (
    <>
      <Stack
        direction="column"
        sx={{ p: 2, width: 1, overflow: "auto" }}
        gap={2}
      >
        <Typography variant="h5">Merchants</Typography>
        <Stack direction="row" justifyContent="space-between" sx={{ p: 1 }}>
          <SearchComponent
            search={search}
            handleSearchChange={handleSearchChange}
            handleClearText={handleClearText}
          />
          <MerchantsFilter status={status} setStatus={setStatus} />
        </Stack>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650 }}
            stickyHeader={true}
            aria-label="merchants table"
          >
            <TableHead>
              <TableRow>
                {userTableColumns.map((column) => (
                  <TableCell key={column} align="left">
                    {column}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {usersList?.data.length > 0 ? (
                usersList?.data.map((row) => (
                  <TableRow
                    key={row._id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="left">
                      <img
                        src={row.avatar}
                        alt="avatar"
                        style={{
                          height: "50px",
                          width: "50px",
                          borderRadius: "50%",
                          objectFit: "cover",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">{row.full_name}</TableCell>
                    <TableCell align="left">
                      <Chip
                        label={row.status}
                        sx={{
                          bgcolor:
                            row.status === "active" ? "#6f9c3d" : "#ff8829",
                        }}
                      />
                    </TableCell>
                    <TableCell align="left">
                      {new Date(row.created_at).toDateString()}
                    </TableCell>
                    <TableCell align="left">
                      <Stack direction="row" alignItems="center">
                        <ChangeMerchantStatus
                          userId={row._id}
                          userStatus={row.status}
                        />
                        <DeleteMerchant userId={row._id} />
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell align="center" colSpan={5}>
                    No data found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" justifyContent="flex-end">
          {usersList?.data?.length !== 0 && (
            <TablePagination
              component="div"
              rowsPerPageOptions={[5, 10, 25, 50, 100]}
              count={usersList?.total}
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

export default MerchantsPage;
