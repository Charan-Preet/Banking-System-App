# Loan-App
## Steps to run website on your Local Machine:
1. Inside your terminal do `git clone https://github.com/Charan-Preet/Loan-App.git`.
2. Now, inside `client` folder do `npm install`.
3. After that do `npm start`.
4. Now, Inside your `server` folder do `npm install`.
5. After that do `node server.js`.

## About this project:
### This app is created as assignment for the internship process at [RedCarpet](https://www.redcarpetup.com/)
#### The Problem Statement are:
1.  Registration and Roles - Different users can have different roles. The three roles are "customer", "agent" and "admin". We want to see how you are creating/salting/hashing the passwords. Another question to think about is - how will you set the role of a user ? All of these are questions you should think about. 
2. Your api needs to be protected by authentication.  For all the  API you will build, design an auth system. We want to see how you do this. Will you use a token? a username/password ?  Are you using JWT? remember that for API, you cant have cookies. How will you handle roles in an API? Will you only ask for authentication once or will every api call be authenticated. All of these are questions you should think about.
3. All data should be stored in a database. Ideally we would want this in Postgresql..but for purposes of interview, you can use any database (including Mongodb !)
 
#### Features:
1. List, view and edit users -  this can only be done by "agent" and "admin" roles
2. Create a loan request on behalf of the user -  This can only be done by "agent" role. Inputs would be tenure selected (in months) and interest to be charged every month. Loan can have 3 states - "NEW", "REJECTED", "APPROVED".
NOTE: we expect you to figure out what a "loan" object will look like. EMI, interest rates, duration, etc. This is domain knowledge that we expect our engineers to figure out by themeselves. Will you use reducing interest rates, etc ? Especially tricky question is how will you handle dates - we are especially interested to see this code, since date handling is one of the trickiest things here (is it needed to handle timezone information in your database ?)
3. Approval of loan request - This can only be done by an "admin" role.
4. Edit a loan (but not after it has been approved) -  This can be done only by "agent" role. But cannot be done if loan is in "Approved" state. IMPORTANT: We want to see how you design this. Can you save previous history ? In an extreme situation, can you "rollback" the changes ? Hint: the best designs here use "double safety" - logic in the code as well as database constraints.
5. Ability to list and view loans (approved) or loan requests based on the filter applied -  By "filter" we mean - select by date of creation, date of update, state of loan (NEW, REJECTED, APPROVED), etc. This action can be done by all : "customer", "agent" and "admin" roles. HOWEVER - "customer" can only see his own loans...while "agent" and "admin" can see everyone's loans. The way you design your data model above will allow you to do this. Make sure there are no security loopholes here. (P.S. you have to show us by writing the testcases to illustrate this)

![website frontpage showing login and register fucntion](https://i.postimg.cc/hj5pYg6c/Screenshot-2021-06-27-at-13-37-02-Loan-App.png)

![Screenshot-2021-06-27-at-13-40-31-Loan-App.png](https://i.postimg.cc/L4gcM0TN/Screenshot-2021-06-27-at-13-40-31-Loan-App.png)

![alt text](https://i.postimg.cc/cCGXWTxb/Screenshot-2021-06-27-at-13-38-12-Loan-App.png)

![alt text](https://i.postimg.cc/rFJQ6Svf/Screenshot-2021-06-27-at-13-38-24-Loan-App.png)

![alt text](https://i.postimg.cc/Zq9cyX0Q/Screenshot-2021-06-27-at-13-37-52-Loan-App.png)
