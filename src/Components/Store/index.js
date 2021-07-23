import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  Box, Button, Container, IconButton, Typography, Popover, Badge, List, ListItem,
  ListItemText, ListItemAvatar
} from '@material-ui/core';
import Image from '../../Image';
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import ClearRoundedIcon from '@material-ui/icons/ClearRounded';
import { connect } from 'react-redux';
import { getProducts, AddCart, deleteCart } from '../../store/Actions'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  sizesAll: {
    background: "#e8e8e8",
    width: "30px",
    height: "30px",
    color: "#3d3d3d",
    fontSize: "12px"
  },
  sizes: {
    margin: theme.spacing(1),
    background: "#e8e8e8",
    width: "30px",
    height: "30px",
    color: "#3d3d3d",
    fontSize: "12px"
  },
  activeSize: {
    margin: theme.spacing(1),
    background: "rgb(5 5 5)",
    color: "#ffff",
    width: "30px",
    height: "30px",
    fontSize: "12px"
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    height: 25,
    border: "1px solid",
    borderRadius: "4px"
  },
  colorLight: {
    color: "gray"
  },
  AddToCartButton: {
    textTransform: "capitalize",
    borderRadius: "2px",
    color: "white",
    background: "#262626",
    '&:hover': { background: "#262626" },
  },
  OfferLable: {
    padding: "3px 0px 5px 0px"
  },
  OfferlableContent: {
    borderRadius: "2px",
    color: "white",
    background: "#262626",
    padding: "3px"
  },
  product: {
    '&:hover': { boxShadow: "0px 2px 5px 0px lightgrey" },
  },
  underline: {
    width: "30px",
    margin: "auto",
    borderBottom: "2px solid orange"
  },
  cartCard: {
    borderRadius: "2px",
    color: "white",
    background: "#262626",
    width: "400px"
  },
  cartTrigger: {
    borderRadius: "2px",
    color: "white",
    background: "#262626",
    '&:hover': { background: "#262626" },
  },
  closeIcon: {
    position: "absolute",
    right: "0px",
    top: "0px"
  },
  colorOrange: {
    color: "orange"
  },
  bag: {
    borderBottom: "2px solid #161515",
  },
  checkout: {
    boxShadow: "0px 0px 19px 0px #0e0e0e"
  },
  checkoutButton: {
    borderRadius: "2px",
    color: "white",
    background:"#f43d00", // "#161515",
    '&:hover': { background: "#161515" },
  },
  closeBagIcon: {
    position: "absolute",
    left: "0px",
    top: "0px",
    background: "#262626"
  },
  rightTrigger: {
    display: "inline-block",
    margin: "0 5px",
    verticalAlign: "middle",
    width: "0px",
    height: "0px",
    borderBottom: "solid 15px transparent",
    borderRight: "solid 15px transparent",
    borderLeft: "solid 15px rgb(5 5 5) ",
    borderTop: "solid 15px rgb(5 5 5)"
  },
  closeIcon:{
    color:"#ffff",
    marginBottom:theme.spacing(3)
  }
}));


function Store(props) {
  const classes = useStyles();

  const [sortPrice, setSortPrice] = useState(0)
  const [products, setProducts] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(Boolean(false));
  const [cart, setCart] = useState([]);
  const [checkoutPrice, setCheckoutPrice] = useState(0);
  const [sizes, setSizes] = useState([
    {
      size: "XS",
      active: false,
    },
    {
      size: "S",
      active: false,
    },
    {
      size: "M",
      active: false,
    },
    {
      size: "ML",
      active: false,
    },
    {
      size: "L",
      active: false,
    },
    {
      size: "XL",
      active: false,
    },
    {
      size: "XXL",
      active: false,
    }
  ]);

  useEffect(() => {
    setProducts([]);
    props.getProducts({})
    props.AddCart('0')
  }, [])
  useEffect(() => {
    setProducts(props.products)
  }, [props.products])

  useEffect(() => {
    setCart(props.cart)
    setCheckoutPrice(sumTotal(props.cart))

  }, [props.cart])

  const sumTotal = arr => arr.reduce((sum, { price, qty }) => sum + price * qty, 0)




  const handleCloseBag = (e) => {
    e.preventDefault();
    setAnchorEl(null);
    setOpen(Boolean(false))
  }

  const price = (price) => {
    let value = price.toString().split('.');
    if (value.length === 2) {
      return <Box>
        $<Box component="b" fontSize={20}>{value[0]}</Box>.{value[1]}
      </Box>
    }
    else {
      return <Box>
        $<Box component="b" fontSize={20}>{value}</Box>
      </Box>
    }

  }
  const shippingCharges = (shipping) => {
    if (shipping.free) {
      return <span className={classes.OfferlableContent}> Free Shoping </span>
    }
    else {
      return <span className={classes.OfferlableContent}> Delivery Charges $ {shipping.price} </span>
    }
  }

  return (

    <div className={classes.root}>
      <Container>
        <Box py={5}>
          <Grid container spacing={3}>
            <Grid item md={12}>
              <Grid item md={12}>
                <Box display="flex" justifyContent="space-between">
                  <Box>
                    <Box className={classes.rightTrigger}></Box>
                  </Box>
                  <Box>
                    <IconButton aria-describedby="cart" className={classes.cartTrigger}
                      onClick={(event) => { setAnchorEl(event.currentTarget); setOpen(Boolean(true)) }}>
                      <Badge badgeContent={cart.length} anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                      }} color="primary">
                        <ShoppingCartOutlinedIcon />
                      </Badge>
                    </IconButton>
                    <Popover id="cart" open={open} anchorEl={anchorEl}
                      onClose={handleCloseBag}
                      anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                      }}
                    >
                      <Box className={classes.cartCard}>
                        <Grid container>
                          <Grid item md={12}>
                            <Box className={classes.closeBagIcon}>
                              <IconButton aria-label="close" className={classes.closeIcon}  onClick={handleCloseBag}>
                                <ClearRoundedIcon />
                              </IconButton>
                            </Box>
                            <Box p={2}>
                              <Box textAlign="center" pb={5} pt={2} className={classes.bag} >
                                <Badge badgeContent={cart.length} anchorOrigin={{
                                  vertical: 'bottom',
                                  horizontal: 'right',
                                }} color="primary">
                                  <ShoppingCartOutlinedIcon></ShoppingCartOutlinedIcon>
                                </Badge>
                              </Box>
                              {cart.map(prod =>
                                <List className={classes.root} key={prod._id}>
                                  <ListItem alignItems="center">
                                    <ListItemAvatar>
                                      <Image src={prod.image} alt={prod.title} className="" width="40px" />
                                    </ListItemAvatar>
                                    <ListItemText >
                                      <Box>
                                        <Box> {prod.title}</Box>
                                        <Box fontSize={12} className={classes.colorLight}> Quantity: {prod.qty}  </Box>
                                      </Box>
                                    </ListItemText>
                                    <ListItemText>
                                      <Box textAlign="right">
                                        <Box fontSize={16} className={classes.colorOrange}>${prod.price} </Box>
                                      </Box>
                                    </ListItemText>
                                    <Box className={classes.closeIcon}>
                                      <IconButton aria-label="cancel" size="small" className={classes.closeIcon} onClick={(e) => {
                                        props.deleteCart(prod._id)
                                      }}>
                                        <ClearRoundedIcon  />
                                      </IconButton>
                                    </Box>
                                  </ListItem>
                                </List>)}
                            </Box>
                            <Box className={classes.checkout} p={3} >
                              <Box display="flex" justifyContent="space-between">
                                <Box>
                                  <Box fontSize={16} className={classes.colorLight}>SUBTOTAL </Box>
                                </Box>
                                <Box textAlign="right">
                                  <Box fontSize={20} className={classes.colorOrange}>${checkoutPrice} </Box>
                                  <Box fontSize={12} className={classes.colorLight}> OR UP TO 5x5.89 </Box>
                                </Box>
                              </Box>
                              <Box py={3}>
                                <Button variant="contained" fullWidth className={classes.checkoutButton}>CHECKOUT</Button>
                              </Box>
                            </Box>

                          </Grid>
                        </Grid>
                      </Box>
                    </Popover>
                  </Box>
                </Box>

              </Grid>
              <Box px={4}>
                <Grid container>
                  <Grid item md={2}>
                    <Typography variant="h6" color="initial"> Sizes:</Typography>
                    <Box pt={2}>
                      {sizes.map((i, index) =>
                        <IconButton aria-label={i.size} className={i.active ? classes.activeSize : classes.sizes} onClick={(e => {
                          let list = sizes;
                          list[index].active = !list[index].active;
                          setSizes([...list])
                          props.getProducts({
                            size: list.filter(x => x.active === true).map(x => x.size).toString(),
                            sortPrice: Number(sortPrice)
                          })

                        })}>
                          {i.size}
                        </IconButton>
                      )}
                    </Box>
                  </Grid>
                  <Grid item md={10}>
                    <Box display="flex" justifyContent="space-between">
                      <Box mt={1}>
                        <Typography> {products.length} Product(s) found </Typography>
                      </Box>
                      <Box display="flex" alignItems="center">
                        <Typography color="initial"> Sizes: &nbsp;</Typography>
                        <select className={classes.formControl} value={sortPrice} onChange={(e) => {
                          setSortPrice(e.target.value)
                          props.getProducts({
                            size: sizes.filter(x => x.active === true).map(x => x.size).toString(),
                            sortPrice: Number(e.target.value)
                          })
                        }}>
                          <option value="0" disabled>Select</option>
                          <option value="1" >Lowest To Highest</option>
                          <option value="2" >Highest To Lowest</option>
                        </select>
                      </Box>
                    </Box>
                    <Grid container>
                      {products && products.map(prod =>
                        <Grid item md={3} key={prod._id}>
                          <Box textAlign="center" my={2} mx={2} className={classes.product}>
                            <Box textAlign="right" fontSize={12} className={classes.OfferLable}>
                              {shippingCharges(prod.shipping)}
                            </Box>
                            <Image src={prod.image} alt={prod.title} className="" width="75%" />
                            <Box>{prod.title}</Box>
                            <Box pt={2} component="div" className={classes.underline}></Box>
                            <Box py={2}>
                              {price(prod.price)}
                              {prod.size.map(s => <IconButton aria-label={s} className={classes.sizesAll}>
                                {s}
                              </IconButton>)}
                            </Box>
                            <Box>
                              <Button variant="contained" fullWidth
                                onClick={(e) => {
                                  props.AddCart(prod._id)
                                }} className={classes.AddToCartButton}>Add to cart</Button>
                            </Box>
                          </Box>
                        </Grid>
                      )}

                    </Grid>
                  </Grid>
                </Grid>
              </Box>

            </Grid>
          </Grid>
        </Box>
      </Container>
    </div>
  );
}


const mapStateToProps = state => ({
  products: state.products,
  cart: state.cart
})

const mapDispatchToProps = dispatch => ({
  getProducts: (payload) => dispatch(getProducts(payload)),
  AddCart: (ID) => dispatch(AddCart(ID)),
  deleteCart: (ID) => dispatch(deleteCart(ID))
})
export default connect(mapStateToProps, mapDispatchToProps)(Store)