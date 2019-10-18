"use strict";

const gui = new GuiHandler();

const modalDiv = document.getElementsByClassName("modal")[0];
const newTaskButton = document.getElementById("newTask");

let taskBoxInstance = new taskBox(modalDiv);
let lastClick = 0;

newTaskButton.addEventListener("click", () => {
    taskBoxInstance.show();
    lastClick = 1;
}, true);

async function getStatuses() {
    const url='../TaskServices/broker/allstatuses';
    try {
        const response = await fetch(url,{method: "GET"});
        try {
            const jsonResponse = await response.json();
            if (jsonResponse.responseStatus) {
                gui.allstatuses = jsonResponse.allstatuses;
                taskBoxInstance.allStatuses = jsonResponse.allstatuses;
            } else {
                console.log('Did not find statuses on server')
            }
        } catch (error) {
            console.log(error)
        }
    } catch (error) {
        console.log(error)
    }
}

async function getTasklist() {
    const url='../TaskServices/broker/tasklist';
    try {
       const response = await fetch(url, {method: "GET"});
       try {
           const jsonResponse = await response.json();
           if (jsonResponse.responseStatus && jsonResponse.tasks.length === 0){
               gui.noTask()
           }
           else if (jsonResponse.responseStatus) {
              jsonResponse.tasks.forEach(task => gui.showTask(task))
           }
       } catch (error) {
          console.log(error)
       }
    } catch (error) {
        console.log(error)
    }
}

async function main() {
    await getStatuses();
    await getTasklist();

    gui.deleteTaskCallback = async (id) => {
        console.log(`User has approved the deletion of task with id ${id}.`);
        const url=`../TaskServices/broker/task/${id}`;
        try {
            const response = await fetch(url,{method: "DELETE"});
            try {
                const jsonResponse = await response.json();
                if (jsonResponse.responseStatus){
                    gui.removeTask(jsonResponse.id)
                } else {
                    console.log('The server did not complete the delete request')
                    console.log(`Task with id ${id} was not deleted on the server`)
                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
        // Doing this to check if the database contains any more tasks
        // this method will update the message if the database is now empty with regards to tasks
        await getTasklist()
    };

    gui.newStatusCallback = async (id,newStatus) => {
        console.log(`User has approved to change the status of task with id ${id} to ${newStatus}.`);
        const url=`../TaskServices/broker/task/${id}`;
        try {
            const response = await fetch(url,{
                method: "PUT",
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: JSON.stringify({'status': newStatus})
            });
            try {
                const jsonResponse = await response.json();
                if (jsonResponse.responseStatus){
                   gui.update({id, status} = jsonResponse)
                } else {
                    console.log('The server did not complete the put request')
                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
    };

    taskBoxInstance.onSubmit = async (task) => {
        console.log(`New task '${task.title}' with initial status ${task.status} is added by the user.`);
        const url=`../TaskServices/broker/task`;
        try {
            const response = await fetch(url,{
                method: "POST",
                headers: {"Content-Type": "application/json; charset=utf-8"},
                body: JSON.stringify({'title': task.title, 'status': task.status})
            });
            try {
                const jsonResponse = await response.json();
                if (jsonResponse.responseStatus){
                    gui.showTask(jsonResponse.task)
                } else {
                    console.log('The server did not complete the POST request')
                }
            } catch (error) {
                console.log(error)
            }
        } catch (error) {
            console.log(error)
        }
        taskBoxInstance.close()
    };
}

main();


