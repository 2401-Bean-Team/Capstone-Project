import { useState, useEffect } from "react" 
import axios from "axios"
import { useNavigate, NavLink } from "react-router-dom";

//useState ternary combo to only display cart if logged in?(in navbar?)

//1. get orderId from userId/email/token? ex. const orderId = await getOrder()

//2. get products with that order id from order_product table

//3. display info on cart products

//4. ability to edit quantity and remove products from cart (needs token?)

