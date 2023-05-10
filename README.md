# ToDoApp
This is a simple web-based Todo application built with Node.js, Express, MongoDB, HTML, and EJS. It allows users to create tasks with priority, mark tasks as completed or canceled, and delete tasks from the list.

# Technologies Used
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>EJS</li>
  <li>MongoDB with Mongoose</li>
</ul>  

# Installation

  Clone the repository:`git clone https://github.com/akshitasemwal/ToDoApp.git`<br>
  <br>
  Install the dependencies:<br>`cd ToDoApp`<br>`npm install`<br>
  <br>
  Start the server:`nodemon app.js`<br><br>
  Open a web browser and go to `http://localhost:3001` to view the to do app.

# Usage
  <b>Creating a Task</b><br>
    To create a new task, enter the task description and priority in the input fields and click the "+" button. Priority can be between 1-9 only. <br>
    The task will be added to the list, along with its index and a square bracket on the right side stating its status.

  <b>Listing Tasks</b><br>
    All tasks will be displayed in the order of their priority with their index number and square bracket. <br>
    The square bracket will be empty for pending tasks, and it will be marked with a tick mark for completed tasks and a cross mark for canceled tasks. <br>
    The tasks will also be sorted based on their status(pending, canceled, completed).
    
  <b>Marking a Task as Completed or Canceled</b><br>
    To mark a task as completed or canceled, select an option from the list. <br>
    The bracket will be updated with a tick mark for completed tasks and a cross mark for canceled tasks.
    
  <b>Deleting a Task</b><br>
    To delete a task from the list, click the "Delete" button beside the task description.
    
   <b>Task Report</b><br>
    You can view the report of all tasks by clicking the "Report" button. <br>
    The report will display the count of pending, canceled, deleted, and completed tasks.
    
   <b>Authentication</b><br> 
   Registering users' password is saved after encryption. <br>
   Authentication of the logging in users to provide access to the todo list. It is done using jwt tokens.
   
Demo on: https://todoapp-r4r3.onrender.com   
