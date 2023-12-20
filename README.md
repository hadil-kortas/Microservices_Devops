# Mini_projet_microservices
A simple microservices with REST and et GraphQL architectures using node js as a framework and SQLite as a database
# Usage
books-service/ customers-service/ orders-service :

npm init -y

npm install express graphql sqlite3 body-parser express-graphql

api-gateway:

npm install express

npm install http-proxy-middleware

# BOOKS MICROSERVICE 

Port : localhost:5000

Rest :

Get/books


GraphQL :

```

query {

   books {
    id
    title
    author
    publicationYear
  }
}

```

Rest : 

Post/book

| Parameter | Type | Description |
| -------------- | -------------- | -------------- |
| title | string | required |
| author | string | required |
| publicationYear | number | required |




GraphQL : 

```

mutation Mutation($title: String!, $author: String! $publicationYear: Int! ) {

  addBook(title: $title, author: $author, publicationYear: $publicationYear ) {
    
   id
   title    
   author    
   publicationYear
  }
  
}

```

# CUSTOMERS MICROSERVICE 

Port : localhost:5001

Rest :

Get/customers

GraphQL :

```

query {
   customers {
    id
    name
    email
    phone
  }
}

```

Rest : 

Post/customer

| Parameter | Type | Description |
| -------------- | -------------- | -------------- |
| name | string | required |
| email | string | required |
| phone | number | required |


GraphQL : 

```

mutation Mutation($name: String!, $email: String! $phone: Int! ) {

  addCustomer(name: $name, email: $email, phone: $phone ) {
    
   id
   name    
   email    
   phone
  }
  
}

```

# ORDERS MICROSERVICE 

Port : localhost:5002

Rest : 
Get/orders

GraphQL : 

```

query {
   orders {
    id
    customerId
    bookId
    quantity
    totalAmount
  }
}

```

Rest :

Post/order

| Parameter | Type | Description |
| -------------- | -------------- | -------------- |
| customerId | int | required |
| bookId | int | required |
| quantity | number | required |
| totalAmount | float | required |

GraphQL : 

```

mutation Mutation($customerID: Int!, $bookId: Int!, $quantity: Int!, $totalAmount: Float! ) {

  addOrder(customerId: $customerId, bookId: $bookId, quantity: $quantity, totalAmount: $totalAmount ) {
    
   id
   customerId    
   bookId    
   quantity
   totalAmount
   
  }
  
}

```

# api gateway

Port: localhost:5003

# Run

To start the ApiGateway server, run the following

```

cd api-gateway
node server.js

```

To start the book server, run the following

```

cd books-service
node server.js

```

To start the Customer server, run the following

```

cd customers-service
node server.js

```

To start the Order server, run the following

```

cd orders-service
node server.js

```






























