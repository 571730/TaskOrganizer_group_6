"use strict";

class taskBox {

    constructor(modaldiv) {
        this.modal = modaldiv;

        //Lag en array med attributes title og status og send den inn i submitTask
        this.button =  document.getElementById("addTask");
        this.statusElem = document.getElementById("status");
        this.titleElem = document.getElementById("title");
    }
    set allStatuses(s) {
        this.statuses = s;
        this.statuses.forEach(status => {
            let opt = new Option(status, status);
            this.statusElem.options.add(opt)
        });
    }
    set onSubmit(newtask) {
        this.submitTask = newtask;
    }
    close() {
        console.log("CLOSE TASKBOX");
        this.modal.style.display = "none";

        //Reset verdier
        this.statuses.selectedIndex = 0;
        this.titleElem.value = "";
    }
    show() {
        console.log("SHOW TASKBOX");
        this.modal.style.display = "block";
    }
    isVisible() {
        return this.modal.style.display === "block";
    }
}

const modalDiv = document.getElementsByClassName("modal")[0];
const newTaskButton = document.getElementById("newTask");

let taskBoxInstance = new taskBox(modalDiv);
let lastClick = 0;

window.window.addEventListener("click", function (event) {
    console.log("CLICKED ON WINDOW - taskBox REGISTERED");
    if (taskBoxInstance.isVisible()
        && lastClick === 0 &&
        !document.querySelector('.modal-content').contains(event.target)) {

        taskBoxInstance.close();
    }
    lastClick = 0;
});

newTaskButton.addEventListener("click", (event) => {
    taskBoxInstance.show();
    lastClick = 1;
}, true);

let closeBtn = document.getElementsByClassName("close")[0];
closeBtn.addEventListener("click", function (event) {
    taskBoxInstance.close();
});

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

taskBoxInstance.button.addEventListener("click", function (event) {
    let task = {
        "title": taskBoxInstance.titleElem.value,
        "status": taskBoxInstance.statusElem.value
    };
    taskBoxInstance.submitTask(task);
});
