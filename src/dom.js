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


    const dialog2 = document.createElement("dialog");
    dialog2.setAttribute("id","dialog2");

    const exitButton2 = document.createElement("button");
    exitButton2.innerHTML = "X";
    exitButton2.setAttribute("type","button");
    exitButton2.addEventListener("click", () => {
        dialog2.close();
    });

    editform.create();

    dialog2.append(exitButton2, editform.form);
    body.append(dialog2);

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

        /*only fix left is same value for all boxes after they get edited, otherwise unedited boxes remain same*/

        function edit() {

            const dialog = document.getElementById("dialog2");

            dialog.showModal();

            editform.inputTitle.setAttribute("value", titleV);
            editform.inputDescription.setAttribute("value", descriptionV);
            editform.inputDate.setAttribute("value", dateV);

            editform.editButton.addEventListener('click', (event) => {
                event.preventDefault();

                ({ titleV, descriptionV, dateV, priorityV } = editform.editClick());

                t1 = createTask(titleV, descriptionV, dateV, priorityV);
                p.innerText =  `${titleV}\nDue Date: ${dateV}`;
                
            });

            editform.form.reset();
        }

        div.append(rmBtn, p);

        createForm.form.reset();

        layout.content.append(div);

        rmBtn.addEventListener("click", rm);

        div.addEventListener("click", expand);

        editbtn.addEventListener("click", () => {
            edit();
        });
    }

    const submit = (button) => {
        button.addEventListener("click", submitClick);
    };

    return { submit };
})();

const editform =(() => {

    const form = document.createElement("form");
    const editButton = document.createElement("button");
    const inputTitle = document.createElement("input");
    const inputDescription = document.createElement("input");
    const inputDate = document.createElement("input");

     const create = () => {

        const title = document.createElement("label");
        title.innerHTML = "Title: ";
        title.htmlFor = "title";
        
        inputTitle.setAttribute("type", "text");
        inputTitle.setAttribute("id", "title2");
        inputTitle.setAttribute("name", "title2");

        const description = document.createElement("label");
        description.innerHTML = "Description: ";
        description.htmlFor = "description";

        inputDescription.setAttribute("type", "text");
        inputDescription.setAttribute("id", "description2");
        inputDescription.setAttribute("name", "description2");

        const date = document.createElement("label");
        date.innerHTML = "Due Date: ";
        date.htmlFor = "date";

        inputDate.setAttribute("type", "date");
        inputDate.setAttribute("id", "date2");
        inputDate.setAttribute("name", "date2");

        const priority = document.createElement("p");
        priority.innerHTML = "priority: ";

        const inputHighPriority = document.createElement("input");
        inputHighPriority.setAttribute("type", "radio");
        inputHighPriority.setAttribute("id", "highPriority");
        inputHighPriority.setAttribute("name", "priority2");
        inputHighPriority.setAttribute("value", "High Priority");

        const highPriority = document.createElement("label");
        highPriority.innerHTML = "High Priority";
        highPriority.htmlFor = "highPriority";

        const inputLowPriority = document.createElement("input");
        inputLowPriority.setAttribute("type", "radio");
        inputLowPriority.setAttribute("id", "lowPriority");
        inputLowPriority.setAttribute("name", "priority2");
        inputLowPriority.setAttribute("value", "Low Priority");

        const lowPriority = document.createElement("label");
        lowPriority.innerHTML = "Low Priority";
        lowPriority.htmlFor = "lowPriority";

        const radioDiv = document.createElement("div");
        radioDiv.classList.add("radioDiv");
        radioDiv.append(inputHighPriority,highPriority,inputLowPriority,lowPriority)

        editButton.innerHTML = "Edit Task";
        editButton.setAttribute("type","submit");

        form.append(title,inputTitle, description,inputDescription, date,inputDate,  priority,radioDiv, editButton);
    };

    function editClick(){

        const titleV = document.getElementById("title2").value;
        const descriptionV = document.getElementById("description2").value;
        const dateV = document.getElementById("date2").value;
        const priorityV = document.querySelector('input[name="priority2"]:checked').value;

        return {titleV, descriptionV, dateV, priorityV};
    }

    return { form, create, inputTitle, inputDescription, inputDate, editClick, editButton};

})();