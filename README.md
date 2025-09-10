It's a Food Market Place Application in which their are two type of user one is the customer(want to purchase) and other one is vendor(who want's to sell their products)
Also the product or Food items shown to the user is also divided into categories for example chiness, italinan, india, dessert etc.
This application also follows the mvc architecture.
1. Models -
   1.1 Vendor Model- {Name, ShopName, password, fullName, email, phoneno, address, totalOrder, pendingOrders, Completed Orders, totalRevenu}
   1.2 Customer Model - {fullName, email, password, phoneno, address}
   1.3 FoodItem Model - {itemImage(cloudinary url), Item Name, Price, CreatedBy, category, description}
   1.4 Order Model - {item, orderedby, vendor, status, quantity, otp, timestamps}
   1.5 OTP Model - {otp, createdBy, createdAt}
2. Controllers
   1.1 Customer Controller - [register, login, logout, automaticlogin, otpverfication]
   1.2 Vendor Controller -   [register, login, logout, automaticlogin, otpverfication]
   1.3 order Controller - [placeanorder, shippedanorder, completeanorder, getorderbyid, getorderbyvendorpending, getorderbyvendorcompleted, getorderbyvendorshipped, searchorderbyid]
   1.4 food controller - [createfooditem, getfooditembycategory, getfooditembyvendor]
   1.5 Sales controller - [getyoursales]
