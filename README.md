Note : This server is designed to support only 2 functionalities and a few others for just developer purpose

A. POST a report ---max 2 distinct users can submit report for a commodity-market pair.
B. GET reguest via id 


Follow these steps :

1. Download zip file
2. Go to command prompt -> this directory
3.   run  npm init
4.   npm install
5.   Now your server has installed all dependiences and ready to launch
6.   now run      npm start
7.   open postman
8.   run DELETE request on 'localhost:3000/reports' to clear the database.(some docs my be already present)


9. Now the testing part :
10.      A. use this report as test case---copy it into the body of request
{
  "userID": "user-2",
 "marketID": "market-1",
 "marketName": "Vashi Navi Mumbai",
 "cmdtyID": "cmdty-1",
 "cmdtyName": "Potato",
 "priceUnit": "Quintal",
 "convFctr": 100,
 "price": 1600
}

11.  POST request on 'localhost:3000/reports' response contains report id (make sure you copy report id here otherwise you need to repeat the process)
12.  now try to add a duplicate report ---- server will reply with "User has already reported"
13.  try with  different userID and price, unit, concFctr 
14.  if you try to add a third report for this market-commodity pair--- servers replies "Max two users can submit report for a particular market-commodity pair"

15. finally send a GET request to 'localhost:3000/reports/:reportID' -- server send back the required report 
