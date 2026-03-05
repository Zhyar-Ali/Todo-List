export const createForm = (() => {

    const form = document.createElement("form");
    const submitButton = document.createElement("button");
    const inputTitle = document.createElement("input");
    const inputDescription = document.createElement("input");
    const inputDate = document.createElement("input");
    const folderDiv = document.createElement("div");

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
        radioDiv.append(inputHighPriority,highPriority,inputLowPriority,lowPriority);

        const folderCatagory = document.createElement("p");
        folderCatagory.innerHTML = "Catagory: ";

        folderDiv.classList.add("folderDiv");

        submitButton.innerHTML = "Add Task";
        submitButton.setAttribute("type","submit");
        submitButton.setAttribute("id","submit");

        form.append(title,inputTitle, description,inputDescription, date,inputDate,  priority,radioDiv, folderCatagory,folderDiv, submitButton);
    };

    return { form, create, submitButton, inputTitle, inputDescription, inputDate, folderDiv };
})();

export const dynamicRadio = (() => {

    const getFolder = document.getElementsByClassName("folder");
    const folderDiv = createForm.folderDiv;

    const addRadio = () => {
        for (const element of getFolder){
            const input = document.createElement("input")
            input.setAttribute("type", "radio");
            input.setAttribute("id", element.textContent);
            input.setAttribute("name", "folder");
            input.setAttribute("value", element.textContent);

            const label = document.createElement("label");
            label.innerHTML = element.textContent;
            label.htmlFor = element.textContent;
            
            if (!folderDiv.contains(document.getElementById(element.textContent))){
                folderDiv.append(input, label);    
            }
        }
    };

    return { addRadio };

})();