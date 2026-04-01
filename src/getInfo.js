import createTask from "./todos.js";
import { createForm } from "./creatForm.js";
import { layout} from "./dom.js";
import { editform, dynamicEditRadio } from "./editForm.js";
import { save } from "./localStorageFunctions.js";

export const getInfo = (() => {

    function expand (p,div, editbtn) {  
        if (div.isExpanded == false) {
            p.innerText = div.taskData.t1.formatTask;   
            div.append(editbtn);
            div.isExpanded = true;
        }else {
            p.innerText =  `${div.taskData.titleV}\nDue Date: ${div.taskData.dateV}`;
            editbtn.remove();
            div.isExpanded = false;
        }
    }

    const arrayTask= [];

    function edit(titleV, descriptionV, dateV, priorityV, catagoryV, t1, div, p, editbtn) {

        const dialog = document.getElementById("dialog2");

        dialog.showModal();

        editform.inputTitle.setAttribute("value", titleV);
        editform.inputDescription.setAttribute("value", descriptionV);
        editform.inputDate.setAttribute("value", dateV);

        editform.editButton.onclick = (event) => {
            event.preventDefault();
            ({ titleV, descriptionV, dateV, priorityV, catagoryV } = editform.editClick());
            
            div.removeAttribute('class');
            
            let catagoryC = document.querySelector('input[name="folder2"]:checked');
            let noSpaceCata;
            if (catagoryC != null){
                catagoryV = document.querySelector('input[name="folder2"]:checked').value;
                noSpaceCata = catagoryV.replace(/\s/g,"");
            }  

            if (noSpaceCata !== undefined){
                noSpaceCata = catagoryV.replace(/\s/g,"");   
            }

            t1 = createTask(titleV, descriptionV, dateV, priorityV);

            div.taskData ={
                titleV,
                descriptionV,
                dateV,
                priorityV,
                catagoryV,
                t1
            };
            p.innerText =  t1.formatTask;  
            div.classList.add("tasks", "AllToDos");
            if (noSpaceCata !== undefined){
                div.classList.add(noSpaceCata); 
            }     

            const arrayDiv = JSON.parse(localStorage.getItem("myArrayDiv"));
            const arrayTask = JSON.parse(localStorage.getItem("myArrayTask"));
            const allDivs = Array.from(document.querySelectorAll(".AllToDos"));
            const index = allDivs.indexOf(div);
            if (index !== -1) {
                arrayTask[index] = {
                    ...t1,
                };
                expand(p,div,editbtn);
                arrayDiv[index] = div.outerHTML;
                
                localStorage.setItem("myArrayDiv", JSON.stringify(arrayDiv));
                localStorage.setItem("myArrayTask", JSON.stringify(arrayTask));
            }
        };
        editform.form.reset();
    }

    function submitClick(event){
        event.preventDefault();

        let titleV = document.getElementById("title").value;
        let descriptionV = document.getElementById("description").value;
        let dateV = document.getElementById("date").value;
        let priorityV = document.querySelector('input[name="priority"]:checked').value;
        let catagoryC = document.querySelector('input[name="folder"]:checked');
        let catagoryV;
        let noSpaceCata;
        if (catagoryC != null){
            catagoryV = document.querySelector('input[name="folder"]:checked').value;
            noSpaceCata = catagoryV.replace(/\s/g,"");
        }  

        let t1 = createTask(titleV, descriptionV, dateV, priorityV);

        const p = document.createElement("p");
        p.classList.add("text");
        p.innerText =  `${titleV}\nDue Date: ${dateV}`;

        const div = document.createElement("div");
        div.classList.add("tasks", "AllToDos");
        if (noSpaceCata !== undefined){
            div.classList.add(noSpaceCata);
        }

        div.isExpanded = false;
        div.taskData = {
            titleV,
            descriptionV,
            dateV,
            priorityV,
            catagoryV,
            t1
        };

        const rmBtn = document.createElement("button");
        rmBtn.innerText = "X";
        rmBtn.classList.add("rmBtn");

        function rm () {
            div.remove();
        }

        const editbtn = document.createElement("button");
        editbtn.classList.add("editbtn");
        editbtn.innerText = "edit";

        div.append(rmBtn, p);

        arrayTask.push(t1);

        createForm.form.reset();

        layout.content.append(div);

        rmBtn.addEventListener("click", rm);

        div.addEventListener("click", () => {
            expand(p,div, editbtn);
        });

        editbtn.addEventListener("click", (event) => {
            event.stopPropagation();
            dynamicEditRadio.addRadio();
            edit(titleV,descriptionV,dateV, priorityV, catagoryV,t1,div,p, editbtn);
        });
        save.saveDiv(arrayTask);
    }

    const submit = (button) => {
        button.addEventListener("click", (event) => {
            submitClick(event);
        });
    };

    return { submit, expand, edit };
})();