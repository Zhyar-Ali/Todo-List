import { layout, folderEvent } from "./dom.js";
import { getInfo } from "./getInfo.js";
import createTask from "./todos.js";

export const save = (() => {

    const array = [];
    const arrayDiv = [];
    const arrayTask = [];

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

                
                if(!arrayTask.includes(task)){
                    arrayTask.push(task);
                    localStorage.setItem(`${divContent}2`,JSON.stringify(task));
                    localStorage.setItem("myArrayTask", JSON.stringify(arrayTask));   
                }
            }
        });
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
                const t1 = arrayTask[index];
                const title= t1.title;
                const date = t1.date;
                const p = restoredDiv.querySelector(".text");
                
                const rmBtn = restoredDiv.querySelector(".rmBtn");

                divs.append(restoredDiv);
                
                rmBtn.addEventListener("click", () => {
                    const itemToRemove = arrayDiv.indexOf(restoredDiv.outerHTML);
                    arrayDiv.splice(itemToRemove,1);
                    arrayTask.splice(itemToRemove,1);
                    restoredDiv.remove();
                    
                    localStorage.removeItem(restoredDiv.outerHTML);
                    localStorage.removeItem(`${restoredDiv.outerHTML}2`);
                    localStorage.setItem("myArrayDiv", JSON.stringify(arrayDiv));
                    localStorage.setItem("myArrayTask", JSON.stringify(arrayTask));
                });

                const editbtn = document.createElement("button");
                editbtn.classList.add("editbtn");
                editbtn.innerText = "edit";

                restoredDiv.addEventListener("click", () => {
                    getInfo.expand(p,title,date,t1.formatTask,restoredDiv,editbtn);
                });

                //only edit button left to localstore
            }
        }
    }

    const loadIt = () => {
        loadFolder();
    };


    return { loadIt, loadDiv };

})();