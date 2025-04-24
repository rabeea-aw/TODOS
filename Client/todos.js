// grab all elements 
const form = document.querySelector("[data-form]");//By Attribute
const lists = document.querySelector("[data-lists]");
const input = document.querySelector("[data-input]");


//--keep array Global fo UI variable fo UI Display
let todoArr = [];

//once the browser is loaded
window.addEventListener("DOMContentLoaded", () => {
    //register remove from the dom
    UI.registerRemoveTodo();
});


///--ToDo Class: Each Visual Element Should be 
//--related to ToDO Object
class Todo {
    constructor(id, todo){
        this.id = id;
        this.todo = todo;
    }
}




//--Class To handle Storage Operations
//-- Of todo array
class Storage
{
    // Save todos for a specific user
    static saveUserTodos(username, todos) {
        let usersTodos = JSON.parse(localStorage.getItem('usersTodos')) || {};
        usersTodos[username] = todos;
        localStorage.setItem('usersTodos', JSON.stringify(usersTodos));
    }

    // Get todos for a specific user
    static getUserTodos(username) {
        let usersTodos = JSON.parse(localStorage.getItem('usersTodos')) || {};
        return usersTodos[username] || [];
    }

}


//Submit
form.addEventListener("submit", (e) => {
     //Disble continue sumit processing...
    e.preventDefault();
    //Create New Object By User Input
    let id = Math.random() * 1000000;
    const todo = new Todo(id, input.value);
   // todoArr.push(todo);
    todoArr = [...todoArr,todo];
  
    UI.displayData();
    UI.clearInput();
    //add to storage

    const user = JSON.parse(localStorage.getItem('currentUser'));
    if (user) {
        Storage.saveUserTodos(user.username, todoArr);
    }
});

//Handle UI Operation 
class UI{

    //--Go Over All Array Elements 
    //--And Generate HTML Items Dynamically
    static displayData(){
        
        //-Generate Html
        //-each Delete Icon Injected with 
        //--data-id = {id of the object}
        let displayData = todoArr.map((item) => {
            return `
                <div class="todo">
                <p>${item.todo}</p>
                <span class="remove" data-id = ${item.id}>🗑️</span>
                </div>
            `
        });
        //--Put generated html in a container
        lists.innerHTML = (displayData).join(" ");
    }
   
    //--Clear Input Element
    static clearInput(){
       
        input.value = "";
    }

    //--Remove Element When Clicked
    static registerRemoveTodo(){
        //--Register Click  For Deleting a toto row
        //--The Click is on the List Div Container

        lists.addEventListener("click", (e) => {
           
            console.log(e.target.outerHTML);//Inner Clicked 
            console.log(e.currentTarget.outerHTML);//Registered Clicked

            if(e.target.classList.contains("remove")){
                //Get Id of clicked delete
                let btnId = e.target.dataset.id;
                //--Remove Element From HTML DOM
                
                //remove from array.
                UI.removeArrayTodo(btnId, e.target);

            }
        
        });
    }
   
   //Remove Element From UI And Update LocalStorage
    static removeArrayTodo(id,elementClicked){
        
        elementClicked.parentElement.remove();
        todoArr = todoArr.filter((item) => item.id !== +id);
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            Storage.saveUserTodos(user.username, todoArr);
        }
    }   
}
function logout() {
    // Here you would clear user information from storage/session
    localStorage.removeItem("currentUser"); // Assuming you store user info in localStorage
    window.location.href = 'LoginUser.html'; // Redirect to login page
}
