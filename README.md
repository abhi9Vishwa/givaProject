# React Project

In this project, I had to create a basic  React app that has a registration page and a login page. The registration page should have a form that takes in the following information:
- email
- password
 and on it redirects to login page. The login page should have a form that takes in the following information:
- email
- password
 and on it redirects to the posts page. The post page should have a form that takes in the following information:
- title
- body
 It should then store it to a storage. For storage I have utilised MongoDB and Mongoose. The post page should also have a list of all the posts that have been created. The list should have a delete button that deletes the post from the storage. The post page should also have a edit button to edit post.


 ## How to Run
 I have made two folders, one for the backend and one for the frontend. 

  First we need to install node packages for both folders by running the following command: 
 ```
  npm install
 ```
  To run backend Server you need to go to the backend folder and run the following command: 

 ```
  nodemon index.js
 ```
   To run the frontend, you need to go to the frontend folder and run the following command: 
```
  npm run start
```
After these two commands have been run, backend server will start listening on port 5000 and react frontend will start listening to pport 3000. You can then go to http://localhost:3000/regis on browser to see the app running. 


## Scope for Improvement 
If I had more time, I would have added the following features:
- Current the styling is very basic. I would like to improve the styling of the app.
- I would like to add a logout button to the app.
- For authentication between Login and Post page, I would like to use JWT. I tried to implement it using middleware but I was not able to do it in the given time.
- Current Login and Post are separately working so there is no way to filter post based on the author. I would like to add this feature.


