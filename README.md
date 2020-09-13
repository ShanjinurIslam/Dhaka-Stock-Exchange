# Node JS

## Environment Setup

### Required ` `  `npm `  ` ` packages

1. express.js
2. body-parser
3. node-html-parser
4. http
5. express-react-views 
6. react
7. react-dom

## Structure Project

``` 
/src/index.js
    /routers
    /templates
    /public
```

# Dhaka-Stock-Exchange

Available APIs
/company_list
Method: GET
URL: /api/company_list
/share_price
Method: GET
URL: /api/share_price?name=ABBANK
/company_details
Method: GET
URL: /api/company_details?name=ABBANK
/latest_price
Method: GET
URL: /api/latest_price
/company_data
Method: GET
URL: /api/company_data?name=ABBANK&type=price&duration=24
