import createTask from "./todos.js";
import { createForm } from "./creatForm.js";
import { layout} from "./dom.js";
import { editform, dynamicEditRadio } from "./editForm.js";

export const getInfo = (() => {

    function submitClick(event){
        event.preventDefault();

        let titleV = document.getElementById("title").value;
        let descriptionV = document.getElementById("description").value;
        let dateV = document.getElementById("date").value;
        let priorityV = document.querySelector('input[name="priority"]:checked').value;

        let t1 = createTask(titleV, descriptionV, dateV, priorityV);

        const p = document.createElement("p");
        p.classList.add("text");
        p.innerText =  `${titleV}\nDue Date: ${dateV}`;

        const div = document.createElement("div");
        div.classList.add("tasks");

        const rmBtn = document.createElement("button");
        rmBtn.innerText = "X";
        rmBtn.classList.add("rmBtn");

        function rm () {
            div.remove();
        }

        const editbtn = document.createElement("button");
        editbtn.classList.add("editbtn");
        editbtn.innerText = "edit";

        function expand() {
            if (p.innerText === `${titleV}\nDue Date: ${dateV}`){
                p.innerText = t1.formatTask;   
                div.append(editbtn);
            }else if (p.innerText === t1.formatTask){
                p.innerText =  `${titleV}\nDue Date: ${dateV}`;
                editbtn.remove();
            }
        }

        div.append(rmBtn, p);

        function edit() {

            const dialog = document.getElementById("dialog2");

            dialog.showModal();

            editform.inputTitle.setAttribute("value", titleV);
            editform.inputDescription.setAttribute("value", descriptionV);
            editform.inputDate.setAttribute("value", dateV);

            editform.editButton.onclick = (event) => {
                event.preventDefault();
                ({ titleV, descriptionV, dateV, priorityV } = editform.editClick());

                t1 = createTask(titleV, descriptionV, dateV, priorityV);

                p.innerText =  t1.formatTask;                  
            };
            editform.form.reset();
        }

        createForm.form.reset();

        layout.content.append(div);

        rmBtn.addEventListener("click", rm);

        div.addEventListener("click", expand);

        editbtn.addEventListener("click", (event) => {
            event.stopPropagation();
            dynamicEditRadio.addRadio();
            edit();
        });
    }

    const submit = (button) => {
        button.addEventListener("click", submitClick);
    };

    return { submit };
})();