"use strict";

class taskBox {

    constructor(modaldiv) {
        this.modal = modaldiv;

        //Lag en array med attributes title og status og send den inn i submitTask
        this.button =  document.getElementById("addTask");
        this.statusElem = document.getElementById("status");
        this.titleElem = document.getElementById("title");

        window.window.addEventListener("click", (event) => {
            console.log("CLICKED ON WINDOW - taskBox REGISTERED");
            if (this.isVisible()
                && lastClick === 0 &&
                !document.querySelector('.modal-content').contains(event.target)) {

                this.close();
            }
            lastClick = 0;
        });

        let closeBtn = document.getElementsByClassName("close")[0];
        closeBtn.addEventListener("click",  () => {
            this.close();
        });

        this.button.addEventListener("click", () => {
            let task = {
                "title": this.titleElem.value,
                "status": this.statusElem.value
            };
            this.onSubmit(task);
        });
    }
    set allStatuses(s) {
        this.statuses = s;
        this.statuses.forEach(status => {
            let opt = new Option(status, status);
            this.statusElem.options.add(opt)
        });
    }

    onSubmit(){}

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


