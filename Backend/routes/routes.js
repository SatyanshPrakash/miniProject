import express from 'express';
import { signIn, signUp } from '../controllers/auth.js';
import { vendorSignIn, vendorSignUp } from '../controllers/vendorAuth.js';
import { registerRestaurant } from '../controllers/restaurant.js';
import { addPaymentGateway, paymentResponse } from '../controllers/payment.js';
import { restaurants } from '../controllers/restaurant.js'


const router = express.Router();

router.post('/signIn', signIn);
router.post('/signUp', signUp);

router.post('/vendorSignUp', vendorSignUp);
router.post('/vendorSignIn', vendorSignIn);


router.post('/registerRestaurant', registerRestaurant);
router.post('/payment', addPaymentGateway);
router.post('/callback', paymentResponse);
router.get('/restaurants', restaurants);




export default router;