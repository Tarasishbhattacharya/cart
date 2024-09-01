import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addProd, getProducts } from '../../Redux/cartslice';
import { Badge, Box, Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Container, Grid, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

// import { styled } from '@mui/material/styles';
import "./Home.css"
import { Link } from 'react-router-dom';
// import  {useNavigate}  from 'react-router-dom';
// import {Link}  from 'react-router-dom';
const Home = () => {
    const dispatch=useDispatch();
     const {products,cart,isLoading}=useSelector((state)=>state.cart)
     const[search,setSearch]=useState('')
     const[prodcat,setProdCat]=useState([])
     const[catfilter,setCatFilter]=useState('all')
     const handlesearch=(e)=>{
      setSearch(e.target.value)
     }

     const handleCategory=(e)=>{
      setCatFilter(e.target.value)
     }
    useEffect(()=>{
      dispatch(getProducts()).then((res)=>{
        // console.log(res)
        getCategory(res?.payload)
      })
    },[])

    const getCategory=(data)=>{
      const catArray=[]
      data.map((prod)=>{
        catArray.push(prod?.category)
      })
      // console.log(catArray)
      const uniqueCat=[...new Set(catArray)]
      setProdCat(uniqueCat)
    }
    // const StyledBadge = styled(Badge)(({ theme }) => ({
    //     '& .MuiBadge-badge': {
    //       right: -3,
    //       top: 13,
    //       border: `2px solid ${theme.palette.background.paper}`,
    //       padding: '0 4px',
    //     },
    //   }));
    const handleadd=(prod)=>{
        dispatch(addProd(prod))
        toast.success("Product add to cart",{
          position:"top-right"
        })
    }
      
  return (
    <>
     <Typography>
      Welcome to products page
     </Typography>
    <Link to={'/prod'}>
    <IconButton style={{marginTop:"20px"}} s aria-label="cart">
  <Badge badgeContent={cart.length} color="secondary">
    <ShoppingCartIcon />
  </Badge>
</IconButton>
</Link>
<Box>
<TextField id="outlined-basic" label="search by name" variant="outlined" onChange={handlesearch} />
</Box>
<InputLabel id="demo-simple-select-label">Category wise filter</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Category"
    value={catfilter}
    onChange={handleCategory}
  >
    <MenuItem selected value="all">All</MenuItem>
    {
      prodcat.map((cat)=>{
        return (
          <MenuItem value={cat}>{cat}</MenuItem>
        )
      })
    }
  </Select>
   {/* <IconButton aria-label="cart">
      <StyledBadge badgeContent={4} color="secondary">
        <ShoppingCartIcon/>
      </StyledBadge>
    </IconButton> */}
    {isLoading ? <Typography>Loading...</Typography>:
     <Box className="prod_container">
       <Container maxWidth="lg">
        <Grid container spacing={2}>
          {products?.filter((prod)=>{
            if(catfilter=="all"){
              return prod
            }else{
              return prod.category==catfilter
            }
          }).filter((prod)=>{
            if(search.length==0){
              return prod
            }else{
              return prod.title.toLowerCase().includes(search.toLowerCase())
            }
              
          }).map((prod)=>{
            return (
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <Card className='prod_card'>
      <CardActionArea>
        <CardMedia
        className='prod_img'
          component="img"
          height="140"
          image={`${prod?.image}`}
          alt="green iguana"
        />
        <CardContent className='prod_content'>
          <Typography className='title' gutterBottom variant="h5" component="div">
           {prod?.title}
          </Typography>
          <Typography  className="category" variant="body2" color="text.secondary">
            {prod?.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {prod?.price}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
     <Button onClick={()=>handleadd(prod)} className='prod_btn' size="small" color="primary">
          Add to cart
        </Button> 
      </CardActions>
    </Card>
                </Grid>
            )
         })} 
        </Grid>
       </Container>
     </Box>
}
     <ToastContainer/>
    </>
  )
}


export default Home
