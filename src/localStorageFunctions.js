import { layout, folderEvent } from "./dom.js";
import { getInfo } from "./getInfo.js";
import { dynamicEditRadio } from "./editForm.js";


const test = (() => {
    const array = [];

    function add (tasks) {
        for (let i=0; i<tasks.length; i++){       
            if (!array.includes(tasks[i])){
                array.push(tasks[i]);
                localStorage.setItem("place",JSON.stringify(array));
            }
        }
    }

    return { add };
})();

export const save = (() => {

    const array = [];
    const arrayDiv = [];
    const arrayTask = [];
    const testArray = JSON.parse(localStorage.getItem("place"));

    function saveFolder () {
        const div = document.querySelectorAll(".folder");
        div.forEach(p => {
            if (!array.includes(`${p.outerHTML}`) && p.textContent !== "All ToDos"){
                const divContent = p.outerHTML;
                localStorage.setItem(divContent, divContent);
                array.push(divContent);
                localStorage.setItem("myArray", JSON.stringify(array));
            }
        });
    }

    function saveDiv (task) {
        
        const div = document.querySelectorAll(".AllToDos")
        div.forEach(p => {
            if (!arrayDiv.includes(`${p.outerHTML}`)){
                const divContent = p.outerHTML;
                localStorage.setItem(divContent, divContent);
                arrayDiv.push(divContent);
                localStorage.setItem("myArrayDiv", JSON.stringify(arrayDiv));                       
            }
        });

        if (testArray !== null){
            for (let i=0; i < testArray.length; i++){
                if (!arrayTask.includes(testArray[i])){
                    arrayTask.push(testArray[i]); 
                    localStorage.setItem("myArrayTask",JSON.stringify(arrayTask));
                }
            }
        }

        for (let i=0; i < task.length; i++){
            if (!arrayTask.includes(task[i])){
                arrayTask.push(task[i]); 
                localStorage.setItem("myArrayTask",JSON.stringify(arrayTask));
            }
            test.add(arrayTask);   
        }
    }

    return { saveFolder, saveDiv };
})();

export const load2 = (() => {

    const parser = new DOMParser();
    const array = JSON.parse(localStorage.getItem("myArray"));
    const arrayDiv = JSON.parse(localStorage.getItem("myArrayDiv"));
    const arrayTask = JSON.parse(localStorage.getItem("myArrayTask"));

    function loadFolder() {
        const folders = layout.sidebar.firstChild;

        if (array !== null){
            for (const items of array){
                const doc = parser.parseFromString(items,'text/html');
                const allToDo = document.getElementById("allDiv");
                
                const restoredDiv = doc.body.firstChild;

                const rmBtn = restoredDiv.querySelector(".rmBtnFolder");
                
                folders.append(restoredDiv);

                rmBtn.addEventListener("click", () => {
                    const itemToRemove = array.indexOf(restoredDiv.outerHTML);
                    array.splice(itemToRemove,1);
                    restoredDiv.remove();
                    
                    localStorage.removeItem(restoredDiv.outerHTML);
                    localStorage.setItem("myArray", JSON.stringify(array));
                });

                folderEvent.click(restoredDiv); 
                folderEvent.click(allToDo);
            }
        }
    }

    function loadDiv() {
        const divs = layout.content;

        if (arrayDiv !== null){
            for (const  items of arrayDiv) {
                const doc = parser.parseFromString(items,'text/html');
                const restoredDiv = doc.body.firstChild;
                const index = arrayDiv.indexOf(items);
                const taskObj = arrayTask[index]; 
                
                let t1 = null;
                let title = "";
                let date = "";
                let description = "";
                let priority = "";
                
                if(taskObj) {
                    t1 = taskObj;
                    title = taskObj.title;
                    date = taskObj.date;
                    description = taskObj.description;
                    priority = taskObj.priority;
                }

                restoredDiv.taskData = {
                    t1,
                    titleV: title,
                    dateV: date,
                    descriptionV: description,
                    priorityV: priority
                };
                restoredDiv.isExpanded = false;
    
                const p = restoredDiv.querySelector(".text");
                
                const rmBtn = restoredDiv.querySelector(".rmBtn");

                let catagoryC = document.querySelector('input[name="folder"]:checked');
                let catagoryV;
                if (catagoryC != null){
                    catagoryV = document.querySelector('input[name="folder"]:checked').value;
                }

                divs.append(restoredDiv);
                
                rmBtn.addEventListener("click", () => {
                    const itemToRemove = arrayDiv.indexOf(restoredDiv.outerHTML);
                    arrayDiv.splice(itemToRemove,1);
                    arrayTask.splice(itemToRemove,1);
                    restoredDiv.remove();
                    
                    localStorage.removeItem(restoredDiv.outerHTML);
                    localStorage.setItem("myArrayDiv", JSON.stringify(arrayDiv));
                    localStorage.setItem("myArrayTask", JSON.stringify(arrayTask));
                });

                const editbtn = document.createElement("button");
                editbtn.classList.add("editbtn");
                editbtn.innerText = "edit";

                if (title != undefined) {
                    restoredDiv.addEventListener("click", () => {
                        getInfo.expand(p,restoredDiv,editbtn);
                    });
                }      
             
                editbtn.addEventListener('click', (event) => {
                    event.stopPropagation();
                    dynamicEditRadio.addRadio();
                    getInfo.edit(restoredDiv.taskData.titleV,restoredDiv.taskData.descriptionV,restoredDiv.taskData.dateV, restoredDiv.taskData.priorityV, catagoryV,restoredDiv.taskData.t1,restoredDiv,p, editbtn);
                })
            }
        }
    }

    const loadIt = () => {
        loadFolder();
    };


    return { loadIt, loadDiv };

})();