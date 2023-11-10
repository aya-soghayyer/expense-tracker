
# Welcome to money lover and saver website 💸❤️‍🔥

## Main Project Information 📝:

| **Project Name:**  |  **Expense Tracker** |
| :---: | :---: |
| Team Name:  |  intersellarCode 🪐 |
| Team Members: | Tarteel Natsheh , Aya Soghayyer |


---

## Project Idea Overview 🔮:

The "Expense Tracker with Express.js and AWS" project is a web-based financial management application designed to help individuals and businesses efficiently track their income and expenses. This comprehensive expense tracker offers a user-friendly interface and leverages the power of serverless computing and cloud storage using AWS services.

### Money saver💰💳

(web application)

it’s a web app for storing all your money activities you can also know when and where your money has been expense. additionally, you can know the total budget that you expended and many features below: 

### Features ✨: 

- security login, sign up 
- create new category 
- register as a user 
- record all expense updates 
- Search for some  analytics 
- submit  some attachments

## AWS Services to be Used ☁️:

- **EC2:** For deploying the main Express.js server.
- **RDS:** To manage relational databases for our models.
- **S3:** For storing static files and images.
- **ASG:** Auto Scaling Group, ASGs help ensure that your application can handle varying levels of load by automatically adding or removing instances as needed.
- **LB:**  Load Balancer, Load balancers help improve the availability, scalability, and reliability of applications by evenly distributing requests.

## Endpoints 🌌 :
## Account Routes💻:
### Endpoint: POST `/expense-tracker/accounts/signup `
#### Description 
Register with new personal account
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
| userName | string | usermane for the new account |
| password | string | password for the new account |
| email | string | email for the new account |
#### Responses
- **201** `"success"`
```
{
"userName": "Tarteel",
"email": "tarteel.ghassan1@gmail.com",
"password": "1234$djdknoi"
}
```   
- **400** `"All fields are required"`
- **500** `"Internal server error"`
---
### Endpoint: POST `/expense-tracker/accounts/login `
#### Description
Login with a personal account
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
| email | string | email for login the account |
| password | string | password for login the account |

#### Responses
- **200**
```

``` 
- **400** `"Invalid email or password"`
- **500** `"Internal server error"`
---
### Endpoint: GET `/expense-tracker/accounts/logout `
#### Description
To logout from the account
#### Responses
- **200**
`"User successfully logged out"`  
---
### Endpoint: DELETE `/expense-tracker/`
#### Description
To delete the account
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   | string  | 
|   |  |
#### Responses
- **200**
```
Account logged out successfully
```  
- **500** :`'Internal Server Error'`
***
***
## Expense Routes🛍️:
### Endpoint: POST `/`
#### Description
for adding a new record and photo if user need
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|  name | string  |
|  description| string |  
|  photo | string
|  amount | number 
|  categoryId | 
|  currencyId |
#### Responses
-**201**
` "New expense record added with ID:"`
-**500**
`"An error occurred while creating the expense record."`

---
### Endpoint: DELETE `/:id`
#### Description
for deleting the record
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
-**200**
`"Delete expense successful :)"`
-**500**
`"Something went wrong"`

---
### Endpoint: PUT `/:id`
#### Description
to edit the  record
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
| name  | string  |
| descirption |string  |
| amount |number|
| categoryId | |
| currencyId | |
| photo | string|
#### Responses
-**200**
`"Update expense successful :) "`
-**500**
`"Something went wrong"`
---
### Endpoint: GET `/`
#### Description
show the data of records
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
| name  | string  |
| descirption |string  |
| amount |number|
| categoryId | |
| currencyId | |
| photo | string|
#### Responses
- **200**
```
{
    "total of expenses": 47,
    "page": 1,
    "pageSize": 10,
    "items": [
        {
            "id": 26,
            "name": "books",
            "description": "dandes library",
            "amount": "18",
            "date": "2023-10-30T20:29:17.013Z",
            "photo": ""
        },
        {
            "id": 27,
            "name": "",
            "description": "dandes library",
            "amount": "30",
            "date": "2023-10-30T22:05:56.102Z",
            "photo": "1698703556090.jpg"
        },
        {
            "id": 28,
            "name": "",
            "description": "dandes library",
            "amount": "30",
            "date": "2023-10-30T22:07:31.138Z",
            "photo": "1698703651124.jpg"
        },
        {
            "id": 29,
            "name": "",
            "description": "dandes library",
            "amount": "40",
            "date": "2023-10-30T22:28:16.880Z",
            "photo": "1698704896864.jpg"
        },
        {
            "id": 30,
            "name": null,
            "description": "jawwal company",
            "amount": "5000",
            "date": "2023-10-30T22:32:44.486Z",
            "photo": "1698705164474.jpg"
        },
        {
            "id": 31,
            "name": "iphone",
            "description": "jawwal company",
            "amount": "5000",
            "date": "2023-10-30T22:33:40.172Z",
            "photo": "1698705220157.jpg"
        },
        {
            "id": 32,
            "name": "iphone",
            "description": "jawwal company",
            "amount": "5000",
            "date": "2023-10-31T07:02:07.721Z",
            "photo": "1698735727699.jpg"
        },
        {
            "id": 34,
            "name": "iphone",
            "description": "jawwal company",
            "amount": "5000",
            "date": "2023-10-31T07:59:22.648Z",
            "photo": "1698739162618.jpg"
        },
        {
            "id": 36,
            "name": "iphone",
            "description": "jawwal company",
            "amount": "5000",
            "date": "2023-10-31T08:03:41.717Z",
            "photo": "1698739421692.jpg"
        },
        {
            "id": 37,
            "name": "iphone",
            "description": "jawwal company",
            "amount": "5000",
            "date": "2023-10-31T08:04:39.003Z",
            "photo": "1698739478985.jpg"
        }
    ]
}
```
- **500**
`"Something went wrong!"`

---
### Endpoint: GET `/convert`
#### Description
convert  currency to other currency with amount 
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
- **200**
```
{
    "amount": "300",
    "amountAfter": 74.66
}
```
- **500**
`"Something went wrong!"`
---
### Endpoint: GET `/min`
#### Description
get  minimum category that have selected
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
- **200**
```
{
    "minAmount": 4
}
```
- **500**
`"Something went wrong!"`
---
### Endpoint: GET `/max`
#### Description
get  maximum category that have selected
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
- **200**
```
{
    "minAmount": 5000
}
```
- **500**
`"Something went wrong!"`
---
### Endpoint: GET `/analytics/budget`
#### Description
return the budget
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
- **200**
```
{
     "Total Amount": 77537
}
```
- **500**
`"Something went wrong!"`
---
### Endpoint: GET `/analytics/day`
#### Description
return the total expenses for a day in the dataset.
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
- **200**
```
{
    "Total amount for this date ": 1569,
    "Number of purchases ": 4,
    "expenses": [
        {
            "id": 4,
            "name": "vacuum cleaner",
            "description": "new vaccum from mall",
            "amount": "700",
            "date": "2023-10-28T21:00:00.000Z",
            "photo": null
        },
        {
            "id": 16,
            "name": "chocolate",
            "description": "bought chocolate from market",
            "amount": "4",
            "date": "2023-10-28T21:00:00.000Z",
            "photo": null
        },
        {
            "id": 17,
            "name": "jaket",
            "description": "red jaket from hebron cneter",
            "amount": "65",
            "date": "2023-10-28T21:00:00.000Z",
            "photo": null
        },
        {
            "id": 18,
            "name": "TV",
            "description": " from hebron cneter",
            "amount": "800",
            "date": "2023-10-28T21:00:00.000Z",
            "photo": null
        }
    ]
}
```
- **500**
`"Something went wrong!"`
---
### Endpoint: GET `/analytics/year`
#### Description
return the total expenses for each year in the dataset.
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
- **200**
`""`
- **500**
```
{
    "error": "An error occurred while calculating expenses for the specified year."
}
```
---
### Endpoint: GET `/analytics/month`
#### Description
return the total expenses for each month in the  dataset.
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
- **200**
```
{
    "Total": "1008"
}
```
- **500**
  ```
  { error: 'An error occurred while calculating expenses for the specified month.' }
  ```
- **400**
```
{ error: 'Missing "monthValue" parameter.' }
```
---
### Endpoint: GET `/analytics/category`
#### Description
search of records via categoryName selected , put the total amount of category and length of number of records
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
- **200**
```
{
    "totalAmount": "20",
    "recordCount": "5"
}
```
- **500**
```
 { error: 'An error occurred while calculating category analytics.' }
```
- **400**
```
{ error: 'Missing "categoryName" parameter.' }
```

***
***
## Currency Routes💱:
### Endpoint: POST `/`
#### Description
adding new currency
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
-
-
---
### Endpoint: DELETE `/:id`
#### Description
delete currency by id 
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
-
-
---
### Endpoint: PUT `/:id`
#### Description
edit  the currency name 
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
-
-
---
### Endpoint: GET `/search`
#### Description
search about currency by sub string that is contained in the currency name
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
-
-
---
### Endpoint: GET `/`
#### Description
get all currencies with total number of currencies
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
-
-
***
***
## Category Routes🔖:
### Endpoint: POST `/`
#### Description
adding new category
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
-
-
---
### Endpoint: DELETE `/:id`
#### Description
delete category by id 
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
-
-
---
### Endpoint: PUT `/:id`
#### Description
edit  the category name 
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |

---
### Endpoint: GET `/search`
#### Description
search about category by sub string that is contained in the category name
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
-
-
---
### Endpoint: GET `/`
#### Description
get all categories with total number of categories
#### Request Body
| **Field**  | **Type** | **Description** |
| :---: | :---: | :---: |
|   |   |
|  |  |
#### Responses
-
-
# Relations 🖇 :
| Model Name | Attributes  | Relations |
| --- | --- | --- |
| expense  | id, name , date, category_id, amount, description, attached receipts, currency_id, , user_id, account_id  | many  to one with user , many to one  with currency, one to many with category,many to one with account  |
| category  | id, title | one to many with expense  |
| currency | id, title, symbol | one to many with expense, one to many category  |
| account  | id, avetar , username, email, password, , authuntication_type  | one to many with expense, many to one with business_account, many to one with personal_account  |
---


![image](https://github.com/aya-soghayyer/expense-tracker/assets/128791822/4a492305-fa37-49b9-ba84-bea6f544650b)
=======
# Expense-Tracker
>>>>>>> a0a99b16b8296b44a41420da17755addd6534eca
