export const layout = (() => {

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

    const content = document.createElement("div");
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

    };

    return {load};

})();


const createForm = (() => {

    const form = document.createElement("form");

    const create = () => {

        const title = document.createElement("label");
        title.innerHTML = "Title: ";
        title.htmlFor = "title";

        const inputTitle = document.createElement("input");
        inputTitle.setAttribute("type", "text");
        inputTitle.setAttribute("id", "title");
        inputTitle.setAttribute("name", "title");

        const description = document.createElement("label");
        description.innerHTML = "Description: ";
        description.htmlFor = "description";

        const inputDescription = document.createElement("input");
        inputDescription.setAttribute("type", "text");
        inputDescription.setAttribute("id", "description");
        inputDescription.setAttribute("name", "description");

        const year = document.createElement("label");
        year.innerHTML = "Due Year: ";
        year.htmlFor = "year";

        const inputYear = document.createElement("input");
        inputYear.setAttribute("type", "text");
        inputYear.setAttribute("id", "year");
        inputYear.setAttribute("name", "year");

        const month = document.createElement("label");
        month.innerHTML = "Due Month: ";
        month.htmlFor = "month";

        const inputMonth = document.createElement("input");
        inputMonth.setAttribute("type", "text");
        inputMonth.setAttribute("id", "month");
        inputMonth.setAttribute("name", "month");

        const day = document.createElement("label");
        day.innerHTML = "Due Day: ";
        day.htmlFor = "day";

        const inputDay = document.createElement("input");
        inputDay.setAttribute("type", "text");
        inputDay.setAttribute("id", "day");
        inputDay.setAttribute("name", "day");

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

        const submitButton = document.createElement("button");
        submitButton.innerHTML = "Add Task";
        submitButton.setAttribute("type","submit");
        submitButton.setAttribute("id","submit");

        form.append(title,inputTitle, description,inputDescription, year,inputYear, month,inputMonth, day,inputDay, priority,radioDiv, submitButton);
    };

    return { form, create };
})();