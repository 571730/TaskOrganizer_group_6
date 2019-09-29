class GuiHandler {
   statuses;

   constructor(){
      this.table = document.createElement("table")
      let trHTML = document.createElement("tr")
      this.table.appendChild(trHTML)
      let thTask = document.createElement("th")
      let thStatus = document.createElement("th")
      trHTML.appendChild(thTask)
      trHTML.appendChild(thStatus)
      thTask.innerText = "Task"
      thStatus.innerText = "Status"
   }
   set allstatuses(s){
     this.statuses = s
   }
   showTask(task) {
      if(!document.getElementById(task.id)){
         let trHTML = document.createElement("tr")
         trHTML.id = task.id
         let tdTitle = document.createElement("td")
         let tdStatus = document.createElement("td")
         let tdModify = document.createElement("td")
         let tdRemove = document.createElement("td")
         let tdArr = [tdTitle, tdStatus, tdModify, tdRemove]
         tdTitle.innerText = task.title
         tdStatus.innerText = task.status
         let selectHTML = document.createElement("select")
         selectHTML.options.add(new Option("&lt;Modify&gt;", "0", true))
         this.statuses.forEach(status => selectHTML.options.add(new Option(status, status)))
         tdModify.appendChild(selectHTML)
         let buttonHTML = document.createElement("button")
         buttonHTML.innerText = "Remove"
         buttonHTML.type = "button"
         tdRemove.appendChild(buttonHTML)
         tdArr.forEach(td => trHTML.appendChild(td))
         this.table.appendChild(trHTML)
      } else {
         console.error("id of task already exists")
      }
   }
   update(task){

   }
   removeTask(id){

   }
   noTask(){

   }
}
