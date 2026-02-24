import createTask from "./todos.js";

export const layout = (() => {

    const content = document.createElement("div");

    const load = () => {
    const body = document.querySelector("body");
    const container = document.getElementById("container");

    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebar");

    const folders = document.createElement("div");
    folders.classList.add("folders");

    const addPopUp = document.createElement("div");
    addPopUp.classList.add("addPopUp");

    const addBtn = document.createElement("button");
    addBtn.classList.add("addBtn");
    addBtn.innerHTML = "+";
    addPopUp.append(addBtn);

    sidebar.append(folders, addPopUp);

    content.classList.add("content");

    container.append(sidebar, content);

    const dialog = document.createElement("dialog");

    const exitButton = document.createElement("button");
    exitButton.innerHTML = "X";
    exitButton.setAttribute("type","button");
    exitButton.setAttribute("id","exitForm");

    createForm.create();

    dialog.append(exitButton, createForm.form);
    body.append(dialog);

    addBtn.addEventListener("click", () =>{
        dialog.showModal();
    });

    exitButton.addEventListener("click", () => {
        dialog.close();
    });

    getInfo.submit(createForm.submitButton);

    };

    return {load, content};

})();


const createForm = (() => {

    const form = document.createElement("form");
    const submitButton = document.createElement("button");
    const inputTitle = document.createElement("input");
    const inputDescription = document.createElement("input");
    const inputDate = document.createElement("input");

    const create = () => {

        const title = document.createElement("label");
        title.innerHTML = "Title: ";
        title.htmlFor = "title";
        
        inputTitle.setAttribute("type", "text");
        inputTitle.setAttribute("id", "title");
        inputTitle.setAttribute("name", "title");

        const description = document.createElement("label");
        description.innerHTML = "Description: ";
        description.htmlFor = "description";

        inputDescription.setAttribute("type", "text");
        inputDescription.setAttribute("id", "description");
        inputDescription.setAttribute("name", "description");

        const date = document.createElement("label");
        date.innerHTML = "Due Date: ";
        date.htmlFor = "date";

        inputDate.setAttribute("type", "date");
        inputDate.setAttribute("id", "date");
        inputDate.setAttribute("name", "date");

        const priority = document.createElement("p");
        priority.innerHTML = "priority: ";

        const inputHighPriority = document.createElement("input");
        inputHighPriority.setAttribute("type", "radio");
        inputHighPriority.setAttribute("id", "highPriority");
        inputHighPriority.setAttribute("name", "priority");
        inputHighPriority.setAttribute("value", "High Priority");

        const highPriority = document.createElement("label");
        highPriority.innerHTML = "High Priority";
        highPriority.htmlFor = "highPriority";

        const inputLowPriority = document.createElement("input");
        inputLowPriority.setAttribute("type", "radio");
        inputLowPriority.setAttribute("id", "lowPriority");
        inputLowPriority.setAttribute("name", "priority");
        inputLowPriority.setAttribute("value", "Low Priority");

        const lowPriority = document.createElement("label");
        lowPriority.innerHTML = "Low Priority";
        lowPriority.htmlFor = "lowPriority";

        const radioDiv = document.createElement("div");
        radioDiv.classList.add("radioDiv");
        radioDiv.append(inputHighPriority,highPriority,inputLowPriority,lowPriority)

        submitButton.innerHTML = "Add Task";
        submitButton.setAttribute("type","submit");
        submitButton.setAttribute("id","submit");

        form.append(title,inputTitle, description,inputDescription, date,inputDate,  priority,radioDiv, submitButton);
    };

    return { form, create, submitButton, inputTitle, inputDescription, inputDate };
})();

const getInfo = (() => {

    function submitClick(event){
        event.preventDefault();

        const titleV = document.getElementById("title").value;
        const descriptionV = document.getElementById("description").value;
        const dateV = document.getElementById("date").value;
        const priorityV = document.querySelector('input[name="priority"]:checked').value;

        const t1 = createTask(titleV, descriptionV, dateV, priorityV);

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

        function expand() {
            if (p.innerText === `${titleV}\nDue Date: ${dateV}`){
                p.innerText = t1.formatTask;
                editbtn.innerText = "edit";
                div.append(editbtn);
            }else if (p.innerText === t1.formatTask){
                p.innerText =  `${titleV}\nDue Date: ${dateV}`;
                editbtn.remove();
            }
        }

        /*both dialogs act the same, make this one only edit and remember the values of the
        past values....if click edit then click + , the values go to the + aswell!*/
        function edit() {
            const dialog = document.querySelector("dialog");

            dialog.showModal();
            createForm.inputTitle.setAttribute("value", titleV);
            createForm.inputDescription.setAttribute("value", descriptionV);
            createForm.inputDate.setAttribute("value", dateV);
            p.innerText = `${document.getElementById("title").value}`;
        }

        div.append(rmBtn, p);

        createForm.form.reset();

        layout.content.append(div);

        rmBtn.addEventListener("click", rm);

        div.addEventListener("click", expand);

        editbtn.addEventListener("click", edit);

    }

    const submit = (button) => {
        button.addEventListener("click", submitClick);
    };

    return { submit };
})();