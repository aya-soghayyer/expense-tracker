# Welcome to money lover and saver website 💸❤️‍🔥

## Main Project Information 📝:

| Project Name:  |  Expense Tracker |
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
- use Google account and Facebook to register and login
- register as a team/user 
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
---
### Endpoint: POST `/expense-tracker/signup `
#### Description 
Register with new personal account
#### Request Body
#### Responses
- 201
- 400
- 500
---
### Endpoint: POST `/expense-tracker/login `
#### Description
Login with a personal account
#### Request Body
#### Responses
- 201
- 400
- 500
---
### Endpoint: GET `/expense-tracker/logout `
#### Description
To logout from the account
#### Request Body
#### Responses
-
-
---
### Endpoint: DELETE `/expense-tracker/`
#### Description
To delete the account
#### Request Body
#### Responses
-
-
***
***
## Expense Routes🛍️:
---
### Endpoint: POST `/`
#### Description
for adding a new record and photo if user need
#### Request Body
#### Responses
-
-
---
### Endpoint: DELETE `/:id`
#### Description
for deleting the record
#### Request Body
#### Responses
-
-
---
### Endpoint: PUT `/:id`
#### Description
to edit the  record
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/`
#### Description
show the data of records
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/convert`
#### Description
convert  currency to other currency with amount 
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/min`
#### Description
get  minimum category that have selected
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/max`
#### Description
get  maximum category that have selected
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/analytics/budget`
#### Description
return the budget
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/analytics/day`
#### Description
return the total expenses for a day in the dataset.
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/analytics/year`
#### Description
return the total expenses for each year in the dataset.
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/analytics/month`
#### Description
return the total expenses for each month in the  dataset.
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/analytics/category`
#### Description
search of records via categoryName selected , put the total amount of category and length of number of records
#### Request Body
#### Responses
-
-
***
***
## Currency Routes💱:
---
### Endpoint: POST `/`
#### Description
adding new currency
#### Request Body
#### Responses
-
-
---
### Endpoint: DELETE `/:id`
#### Description
delete currency by id 
#### Request Body
#### Responses
-
-
---
### Endpoint: PUT `/:id`
#### Description
edit  the currency name 
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/search`
#### Description
search about currency by sub string that is contained in the currency name
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/`
#### Description
get all currencies with total number of currencies
#### Request Body
#### Responses
-
-
***
***
## Category Routes🔖:
---
### Endpoint: POST `/`
#### Description
adding new category
#### Request Body
#### Responses
-
-
---
### Endpoint: DELETE `/:id`
#### Description
delete category by id 
#### Request Body
#### Responses
-
-
---
### Endpoint: PUT `/:id`
#### Description
edit  the category name 
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/search`
#### Description
search about category by sub string that is contained in the category name
#### Request Body
#### Responses
-
-
---
### Endpoint: GET `/`
#### Description
get all categories with total number of categories
#### Request Body
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
![image](https://github.com/TarteelGH/expense-tracker/assets/114241640/2d080793-34b5-4658-aabf-aead7bcd80c9)

