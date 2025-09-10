# 🍴 Food Marketplace Application  

A Food Marketplace platform where **Customers** can browse and purchase food items, while **Vendors** can sell their products.  
Food items are categorized into different cuisines such as **Chinese, Italian, Indian, Desserts**, etc.  

This application follows the **MVC Architecture**.  

---

## 📂 Project Structure  

### 1. Models  

#### 1.1 Vendor Model  
```json
{
  "name": "string",
  "shopName": "string",
  "password": "string",
  "fullName": "string",
  "email": "string",
  "phoneNo": "string",
  "address": "string",
  "totalOrders": "number",
  "pendingOrders": "number",
  "completedOrders": "number",
  "totalRevenue": "number"
}
```
#### 1.2 Customer Model
```json
{
  "fullName": "string",
  "email": "string",
  "password": "string",
  "phoneNo": "string",
  "address": "string"
}
```
#### 1.3 FoodItem Model
```json
{
  "itemImage": "string (cloudinary url)",
  "itemName": "string",
  "price": "number",
  "createdBy": "VendorId",
  "category": "string",
  "description": "string"
}
```
#### 1.4 Order Model
```json
{
  "item": "FoodItemId",
  "orderedBy": "CustomerId",
  "vendor": "VendorId",
  "status": "string (pending/shipped/completed)",
  "quantity": "number",
  "otp": "string",
  "timestamps": "date"
}
```

#### 1.4 OTP Model
```json
{
  "otp": "string",
  "createdBy": "UserId",
  "createdAt": "date"
}
```

2. Controllers
2.1 Customer Controller

a. register

b. login

c. logout

d. automaticLogin

e. otpVerification

2.2 Vendor Controller

a. register

b. login

c. logout

d. automaticLogin

e. otpVerification

2.3 Order Controller

a. placeAnOrder

b. shippedAnOrder

c. completeAnOrder

d. getOrderById

e. getOrderByVendorPending

f. getOrderByVendorCompleted

g. getOrderByVendorShipped

h. searchOrderById

2.4 Food Controller

a. createFoodItem

b. getFoodItemByCategory

c. getFoodItemByVendor

2.5 Sales Controller

a. getYourSales
