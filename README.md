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
### Account Routes💻:
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
- 201
- 400
- 500
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
- 201
- 400
- 500
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
***
***
### Expense Routes🛍️:
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
***
***
### Currency Routes💱:
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
***
***
### Category Routes🔖:
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
---
#### Endpoint:...
##### Description
##### Request Body
##### Responses
-
-
## Relations 🖇 :
| Model Name | Attributes  | Relations |
| --- | --- | --- |
| expense  | id, name , date, category_id, amount, description, attached receipts, currency_id, , user_id, account_id  | many  to one with user , many to one  with currency, one to many with category,many to one with account  |
| category  | id, title | one to many with expense  |
| currency | id, title, symbol | one to many with expense, one to many category  |
| account  | id, avetar , username, email, password, , authuntication_type  | one to many with expense, many to one with business_account, many to one with personal_account  |
---
![image](https://github.com/TarteelGH/expense-tracker/assets/114241640/2d080793-34b5-4658-aabf-aead7bcd80c9)

