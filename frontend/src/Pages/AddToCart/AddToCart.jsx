import React, { useEffect, useState } from 'react';
import {
  Box, Typography, Button, Grid, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, RadioGroup, FormControlLabel, Radio, FormLabel, Divider, IconButton, Paper
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// import AddIcon from '@mui/icons-material/Add';
// import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import toast from 'react-hot-toast';
import axios from 'axios';
import PhoneInput from 'react-phone-input-2';
import { isValidPhoneNumber } from 'libphonenumber-js';


const CartPageWithEnquiryModal = () => {
  const [open, setOpen] = useState(false);

  const [cartItems, setCartItems] = useState([]);

  const handleDeleteItem = (id) => {
    const cart= JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item._id !== id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const VAT = subtotal * 0.05;
  const total = subtotal + VAT;

  const [formData, setFormData] = useState({
    name: '',
    designation: '',
    company: '',
    phone: '',
    email: '',
    message: '',
    status: 'Manufacturer',
    cart: []
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async() => {
    try {
   
      if (!formData.name || !formData.designation || !formData.company || !formData.phone || !formData.email || !formData.message || !formData.status) {
        toast.error("Please fill in all required fields.");
        return;
      }
    
      const emailRegex = /^[\w.-]+@[\w.-]+\.\w{2,}$/;
      if (!emailRegex.test(formData.email)) {
        toast.error("Please enter a valid email address.");
        return;
      }
      if (formData.message.length < 10) {
        toast.error("Message should be at least 10 characters long.");
        return;
      }
   
      if (!isValidPhoneNumber(formData.phone)) {
        toast.error('Please enter a valid phone number.');
        return;
      }
     
      formData.cart = cartItems;
    const response=  await axios.post('https://api.assortsmachinetools.com/api/create-cart-enquiry', formData);
      if(response.status===201){
        toast.success("Enquiry sent successfully!");
        setFormData({
          name: '',
          designation: '',
          company: '',
          phone: '',
          email: '',
          message: '',
          status: 'Manufacturer',
          cart: []
        });
        localStorage.removeItem('cart');
        setCartItems([]);
      }
      setOpen(false);
    } catch (error) {
      setOpen(false);
      console.log("feature error", error);
      toast.error("An error occurred while sending your enquiry.");
    }
  };

  const handleCartEnquiry = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to your cart before sending an enquiry.");
      return;
    }
    setOpen(true);
  };
  useEffect(()=>{
    const storedCartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(storedCartItems);
  },[])


  return (
    <Box p={3} maxWidth="md" mx="auto">
      <Typography variant="h4" fontWeight="bold" mb={2} textAlign="center">
        Your Shopping Cart
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={4} textAlign="center">
        Enjoy Free Shipping & Returns on All Orders!
      </Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" textAlign="center">Your cart is empty.</Typography>
      ) : (
        cartItems.map((item) => (
          <Paper
            key={item._id}
            sx={{
              p: 2,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 2,
              borderRadius: 3,
              boxShadow: 3,
              backgroundColor: '#fafafa'
            }}
          >
            <img src={item.image1.includes('cloudinary') ? item.image1 : `https://api.assortsmachinetools.com/${item.image1}`} alt={item.product} width={90} height={90} style={{ borderRadius: 8 }} />
            <Box flex={1}>
              <Typography fontWeight="bold" fontSize="1.1rem">{item.productname}</Typography>
              {/* <Typography variant="body2" color="text.secondary">
                Color: {item.color}
              </Typography> */}
              {/* <Box mt={1} display="flex" alignItems="center" gap={1}>
                <IconButton onClick={() => handleQuantityChange(item.id, -1)} size="small" color="primary">
                  <RemoveIcon />
                </IconButton>
                <Typography>{item.quantity}</Typography>
                <IconButton onClick={() => handleQuantityChange(item.id, 1)} size="small" color="primary">
                  <AddIcon />
                </IconButton>
              </Box> */}
            </Box>
            {/* <Typography fontWeight="bold" mr={2}>
              ${(item.price * item.quantity).toFixed(2)}
            </Typography> */}
            <IconButton color="error" onClick={() => handleDeleteItem(item._id)}>
              <DeleteIcon />
            </IconButton>
          </Paper>
        ))
      )}

      {/* Summary */}
      <Divider sx={{ my: 3 }} />
   

      {/* Checkout Button */}
      <Box textAlign="center">
        <Button
          variant="contained"
          color="primary"
          onClick={handleCartEnquiry}
          size="large"
          sx={{ borderRadius: 10, px: 5, py: 1.5 }}
        >
           
         Send Enquiry
        </Button>
      </Box>

      {/* Modal Form */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle fontWeight="bold" textAlign="center">📝 Enquiry Information</DialogTitle>
        <DialogContent dividers>
  <Grid container spacing={2}>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        required
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleFormChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        required
        label="Designation/Title"
        name="designation"
        value={formData.designation}
        onChange={handleFormChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        required
        label="Company Name"
        name="company"
        value={formData.company}
        onChange={handleFormChange}
      />
    </Grid>
    <Grid item xs={12} sm={6}>
  <PhoneInput
    country={'in'} // default country
    value={formData.phone}
    onChange={(value) =>
      setFormData((prev) => ({ ...prev, phone: '+' + value }))
    }
    inputProps={{
      name: 'phone',
      required: true,
      autoFocus: false,
    }}
    inputStyle={{
      width: '100%',
    }}
  />
</Grid>

    <Grid item xs={12}>
      <TextField
        fullWidth
        required
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleFormChange}
      />
    </Grid>
    <Grid item xs={12}>
      <TextField
        fullWidth
        required
        multiline
        rows={3}
        label="Message"
        name="message"
        value={formData.message}
        onChange={handleFormChange}
      />
    </Grid>
    <Grid item xs={12}>
      <FormLabel component="legend" required>Status</FormLabel>
      <RadioGroup
        row
        name="status"
        value={formData.status}
        onChange={handleFormChange}
      >
        {['Manufacturer', 'Importer/Distributor Company', 'Dealer', 'End-User', 'Other'].map((status) => (
          <FormControlLabel key={status} value={status} control={<Radio required />} label={status} />
        ))}
      </RadioGroup>
    </Grid>
  </Grid>
</DialogContent>

        <DialogActions sx={{ justifyContent: 'center', pb: 2 }}>
        
<Button
  variant="contained"
  startIcon={<SendIcon />}
  onClick={handleSubmit}
  sx={{
    position: 'relative',
    overflow: 'hidden',
    borderRadius: 20,
    px: 4,
    py: 1.5,
    fontWeight: 'bold',
    fontSize: '16px',
    textTransform: 'none',
    backgroundColor: '#2e7d32', // Material UI "success" green
    color: 'white',
    zIndex: 1,
    '&::before': {
      content: '""',
      position: 'absolute',
      top: '100%',
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#1b5e20', // darker green for animation
      transition: 'top 0.3s ease-in-out',
      zIndex: -1,
    },
    '&:hover::before': {
      top: 0,
    },
    '&:hover': {
      color: 'white',
    },
  }}
>
  Submit Enquiry
</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CartPageWithEnquiryModal;
