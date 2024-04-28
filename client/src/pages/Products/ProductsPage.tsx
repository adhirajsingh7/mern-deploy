import React, { useState } from "react";
import {
  Divider,
  Skeleton,
  Stack,
  TablePagination,
  Typography,
} from "@mui/material";
import { useGetProducts } from "@/features/products/api/getProducts";
import {
  ProductCard,
  ProductsFilterComponent,
  ProductsSortComponent,
} from "@/components/Products";
import { SearchComponent } from "@/components/Elements/Search";
import { ProductsLoading } from "@/components/Loading/ProductsLoading.component";
import useDebounce from "@/hooks/useDebounce";

const ProductsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [sortProducts, setSortProducts] = useState("relevance");
  const debouncedSearch = useDebounce(search, 500);

  const { isPending, data: productsList } = useGetProducts(
    page,
    rowsPerPage,
    debouncedSearch,
    categories,
    sortProducts
  );

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
      <Stack direction="row" justifyContent="center" sx={{ p: 2 }}>
        <SearchComponent
          search={search}
          handleSearchChange={handleSearchChange}
          handleClearText={handleClearText}
        />
      </Stack>
      <Divider orientation="horizontal" />
      <Stack direction="row" sx={{ width: 1 }}>
        <Stack direction="column" sx={{ width: 1 / 5, p: 2 }}>
          <ProductsFilterComponent
            setCategories={setCategories}
            setPage={setPage}
          />
        </Stack>
        <Divider orientation="vertical" />
        <Stack
          direction="column"
          sx={{
            width: 4 / 5,
            bgcolor: "#f5f5f5",
            px: 2,
            py: 1,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            gap={2}
          >
            <Typography variant="body2" fontWeight={600}>
              {isPending ? (
                <Skeleton width="100px" />
              ) : (
                productsList?.data.total + " Items Found"
              )}
            </Typography>
            {isPending ? (
              <Skeleton variant="rectangular" width="180px" height="40px" />
            ) : (
              <ProductsSortComponent
                sortProducts={sortProducts}
                setSortProducts={setSortProducts}
                setPage={setPage}
              />
            )}
          </Stack>
          {!isPending ? (
            <>
              <Stack direction="row" flexWrap="wrap" gap={3}>
                {productsList?.data.data?.map((product: IProduct, index) => (
                  <ProductCard key={index} {...product} />
                ))}
              </Stack>
              <Stack direction="row" justifyContent="center">
                {productsList?.data?.data?.length !== 0 ? (
                  <TablePagination
                    component="div"
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    count={productsList?.data?.total}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPage={rowsPerPage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                  />
                ) : (
                  <Stack
                    sx={{ height: "calc(100vh - 209px)" }}
                    justifyContent="center"
                  >
                    <Typography variant="h4">No products found</Typography>
                  </Stack>
                )}
              </Stack>
            </>
          ) : (
            <ProductsLoading />
          )}
        </Stack>
      </Stack>
    </>
  );
};

export default ProductsPage;
