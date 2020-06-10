# ProductCatalogAPI

> Simple API with basic auth and a rate limiter
> You can add, delete, get, and update products

---

## Prepare

```javascript
git clone https://github.com/tfilip/ProductCatalogAPI
docker-compose build
```

---

## How to run

```javascript
docker-compose up
```

## How to use

All api requests require basic auth with the following credentials: 

**Username:**
```javascript
admin
```
**Password:**
```javascript
admin
```


Exposed endpoints:

(You can check out controllers/product.controller.js for a detailed look at status codes)

*GET*
http://localhost:3000/product 
Returns all the products in the database
http://localhost:3000/product/:id 
Returns the product with the specified id or 404 if not found
*POST*
http://localhost:3000/product 
Creates a new product in the database. 
The request body should be in the following format:

```javascript
{
    "name": "<NameOfTheProduct> ",
    "price": <PriceOfTheProduct>,
    "category": "<CategoryOfTheProduct>"
}
```

for example:
```javascript
{
    "name": "Frigider ",
    "price": "1030",
    "category": "electrocasnice"
}
```
http://localhost:3000/product/:id 
Returns 404 if not found or 409 if already exists
*PUT*
http://localhost:3000/product 
Returns 405 (Not Allowed)
http://localhost:3000/product/:id
 Updates the product
 Returns 200 if the request was good. The body should be like the one from POST. 
 Returns 404 if no product with that id was found
*Patch*
http://localhost:3000/product 
Returns 405 (Not Allowed)
http://localhost:3000/product/:id  
Updates the product
Returns 200 if the request was good  . The body should be like the one from POST but. 
Returns 404 if no product with that id was found

*DELETE*
http://localhost:3000/product 
Returns 405 (Not Allowed)
http://localhost:3000/product/:id 
Deletes the product
Returns 200 if it found the object or 404 if not found