import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from '@mui/material/TablePagination';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import axios from "axios";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";



function getListFromValue(value) {
  let list = [10];
  let step = Math.ceil(value / 5); // Calculate the step size

  // Generate the list
  for (let i = 1; i < 5; i++) {
      list.push(Math.min((i + 1) * step, value));
  }
  if (list.length === 5) {
    list[4] = value;
  }

  return list;
}



function createData(name, calories, fat, carbs, protein, price) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow  style={{ border: "2px solid black" }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={(e) => {
              setOpen(!open);
            }}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            {row.id}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell>{row.age}</TableCell>
        <TableCell>{row.email}</TableCell>
        <TableCell>{row.degree}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                History
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>quantity</TableCell>
                    <TableCell >Amount</TableCell>
                    <TableCell>Total price ($)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.orders.map((orderRow) => (
                    <TableRow key={orderRow.id}>
                      <TableCell>
                        {orderRow.date}
                      </TableCell>
                      <TableCell>{orderRow.quantity}</TableCell>
                      <TableCell>{orderRow.amount}</TableCell>
                      <TableCell>
                        {Math.round(orderRow.amount * orderRow.quantity)}
                      </TableCell>
                    </TableRow>
                  ))}
                  {row.orders.length === 0 && (
                    <TableCell colSpan={4} align="center">
                      No Order Founds
                    </TableCell>
                  )}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function CollapsibleTable() {
  const [url, setUrl] = useState('http://127.0.0.1:8000/api/person/?')
  const [page, setPage] = useState(0)
  const [count, setCount] = useState(0)
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [rowsPerPageOptionsList, setRowsPerPageOptionsList] = useState([10, 20])
  const [index, setIndex] = useState(0)

  const [limit, setLimit] = useState(10);
  const [offset, setOffset] = useState(0);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${url}limit=${limit}&offset=${offset}`);
      setData(response.data);
      setCount(response.data.count)
      setLimit(response.data.results.length)
      setIsLoading(false);

      setRowsPerPageOptionsList(getListFromValue(response.data.count))

    } catch (error) {
      console.log("Error", error)
      setIsLoading(false);
    }
  };

  const handleChangePage = (_event, newPage) => {
    setPage(newPage)
    console.log(newPage, limit, offset)
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setLimit(parseInt(event.target.value, 10))
  };

  useEffect(() => {
    fetchData();

    // Cleanup function
    return () => {
      // Any cleanup code
    };
  }, [limit, offset]);

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow style={{ backgroundColor: "yellow" }}>
            <TableCell style={{ border: "2px solid black" }} />
            <TableCell style={{ border: "2px solid black" }}>Name</TableCell>
            <TableCell style={{ border: "2px solid black" }}>Age</TableCell>
            <TableCell style={{ border: "2px solid black" }}>Email</TableCell>
            <TableCell style={{ border: "2px solid black" }}>Degree</TableCell>
          </TableRow>
        </TableHead>
        {isLoading ? (
          <TableBody>
            <TableRow>
              <TableCell colSpan={5} style={{ padding: "0px" }}>
                <Stack spacing={1}>
                  <Skeleton variant="rounded" width="100%" height={60} />
                  <Skeleton variant="rounded" width="100%" height={60} />
                  <Skeleton variant="rounded" width="100%" height={60} />
                  <Skeleton variant="rounded" width="100%" height={60} />
                  <Skeleton variant="rounded" width="100%" height={60} />
                </Stack>
              </TableCell>
            </TableRow>
          </TableBody>
        ) : (
          <TableBody>
            {data.results.length > 0 &&
              data.results.map((row) => <Row key={row.id} row={row} />)}
          </TableBody>
        )}
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptionsList}
        component="div"
        count={count}
        rowsPerPage={limit}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
}
