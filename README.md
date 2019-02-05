This is a users books listing application for a library. The application basically lists the users and books associated with them.

There is no backend at this point of time. So please keep sample data in a json file along
with the application Or use any Fake API services. The application should work on npm install , start command.


## JSON Schema
The json should contain user details and associated books. A User has username , password , User Given Name and books associated with him.Authentication framework is not the interest of this application.
A book has book name , author , Withdrawn Date  associated with it. Your JSON schema should contain these details at the minimum.The asssociation betweek user and books in the schema is your design choice.


## There are three major screens in the application

#### Login Screen
This is the login screen with User Name , Password and Login button ..On Clicking Login button , next screen or Invalid user name and password should be shown.On Successful login , the user will be navigated to User List screen .
Login user name and password can be plain text comparison.No roles are necessary for this application.


#### User List Screen
The screen displays all the users and the number of books associated with user. Ideally it should look like below.Show Details button should be visible only to the currently logged in users account name. If John  logs in , he should see a button against his name only. This screen should only be accessible if a user logs into the application.

| Given Name        | Book Count           |   |
| ------------- |:-------------:| -----:|
| John       | 10 | [SHOW DETAILS button] |
| Adam     | 6      |   |
| Mark | 10      |     |


#### Book Details Pop up screen

On clicking SHOW details button ,a pop up should be displayed. It shows all the list of books against the user.The page should show book name  , author name , withdrawn data and due date. Due date is after a month of Withdrawn date .Do not store the Due date data ; it should be calculated . 

*Angular latest version with bootstrap should be used for developing this application. The data should be accessed from the json file or fake api using the RxJs framework.*
*Please make all necessary assumptions to make the applicaiton work*
*Please have enough data in the json/fake api so that application will look good*
