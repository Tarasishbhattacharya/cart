import { Avatar, Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
// import '/Home.css'
import "./Productcart.css"
import { decProd, delProd, incProd } from '../../Redux/cartslice'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Productcart = () => {
    const dispatch=useDispatch();
    const {cart,totalprice}=useSelector((state)=>state.cart)

    const handleIncrement=(id)=>{
         dispatch(incProd(id))
         toast.success("Quantity incremented",{
            position:"top-right"
          })
    }

    const handleDecrement=(id)=>{
         dispatch(decProd(id))
         toast.success("Quantity decremented",{
            position:"top-right"
          })
    }
    const handledelete=(id)=>{
        dispatch(delProd(id))
        toast.success("Product deleted successfully",{
            position:"top-right"
          })
    }
  return (
    <>
      <Box className="table_container">
      <Link to={'/'}>
        <Button className='home_btn'>
            Go to home
        </Button>
      </Link>
        <Typography className='heading'>
            welcome to cart page
        </Typography>
        <TableContainer component={Paper}>
      <Table  aria-label="caption table">
        <TableHead>
          <TableRow className='table_row'>
            <TableCell className='table_cell' align="left">Title</TableCell>
            <TableCell className='table_cell' align="right">category</TableCell>
            <TableCell className='table_cell'align="right">price</TableCell>
            <TableCell className='table_cell' align="right">Quantity</TableCell>
            <TableCell className='table_cell' align="left">img</TableCell>
            <TableCell  className='table_cell' align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { cart.length>0?cart.map((prod) => (
            <TableRow className='table_data' key={prod.id}>
              <TableCell component="th" scope="row">
                {prod?.title}
              </TableCell>
              <TableCell align="right">{prod?.category}</TableCell>
              <TableCell align="right">{prod.updatePrice}</TableCell>
              <TableCell align="right">{prod?.quantity}</TableCell>
              <TableCell align="right">
                <Avatar  className="prod_img"src={`${prod?.image}`}/>
              </TableCell>
              <TableCell align="right">
                <Button className='qty_btn' onClick={()=>handleIncrement(prod?.id)}>Inc QTY</Button>
                <Button className='qty_btn' onClick={()=>prod.quantity>1?handleDecrement(prod?.id):handledelete(prod?.id)}>Dec QTY</Button>
                <Button className='del_btn' onClick={()=>handledelete(prod.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          )):(
            <Typography>No product found</Typography>
          )
        }
        </TableBody>
      </Table>
    </TableContainer>
    <Typography className='total_price'>
        Total price :{totalprice}
    </Typography>
      </Box>
      <ToastContainer/>
    </>
  )
}

export default Productcart
