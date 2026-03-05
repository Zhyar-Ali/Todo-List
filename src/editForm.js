export const editform =(() => {

    const form = document.createElement("form");
    const editButton = document.createElement("button");
    const inputTitle = document.createElement("input");
    const inputDescription = document.createElement("input");
    const inputDate = document.createElement("input");
    const folderDiv = document.createElement("div");

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
        inputHighPriority.setAttribute("id", "highPriority2");
        inputHighPriority.setAttribute("name", "priority2");
        inputHighPriority.setAttribute("value", "High Priority");

        const highPriority = document.createElement("label");
        highPriority.innerHTML = "High Priority";
        highPriority.htmlFor = "highPriority";

        const inputLowPriority = document.createElement("input");
        inputLowPriority.setAttribute("type", "radio");
        inputLowPriority.setAttribute("id", "lowPriority2");
        inputLowPriority.setAttribute("name", "priority2");
        inputLowPriority.setAttribute("value", "Low Priority");

        const lowPriority = document.createElement("label");
        lowPriority.innerHTML = "Low Priority";
        lowPriority.htmlFor = "lowPriority";

        const radioDiv = document.createElement("div");
        radioDiv.classList.add("radioDiv");
        radioDiv.append(inputHighPriority,highPriority,inputLowPriority,lowPriority);

        const folderCatagory = document.createElement("p");
        folderCatagory.innerHTML = "Catagory: ";

        folderDiv.classList.add("editFolderDiv");

        editButton.innerHTML = "Edit Task";
        editButton.setAttribute("type","submit");

        form.append(title,inputTitle, description,inputDescription, date,inputDate,  priority,radioDiv, folderCatagory, folderDiv, editButton);
    };

    function editClick(){

        const titleV = document.getElementById("title2").value;
        const descriptionV = document.getElementById("description2").value;
        const dateV = document.getElementById("date2").value;
        const priorityV = document.querySelector('input[name="priority2"]:checked').value;

        return {titleV, descriptionV, dateV, priorityV};
    }

    return { form, create, inputTitle, inputDescription, inputDate, editClick, editButton, folderDiv};

})();

export const dynamicEditRadio = (() => {

    const getFolder = document.getElementsByClassName("folder");
    const editFolderDiv = editform.folderDiv;

    const addRadio = () => {
        for (const element of getFolder){
            const input = document.createElement("input")
            input.setAttribute("type", "radio");
            input.setAttribute("id", `${element.textContent}2`);
            input.setAttribute("name", "folder");
            input.setAttribute("value", `${element.textContent}2`);

            const label = document.createElement("label");
            label.innerHTML = element.textContent;
            label.htmlFor = element.textContent;
            
            if (!editFolderDiv.contains(document.getElementById(`${element.textContent}2`))){
                editFolderDiv.append(input, label);
            }
        }
    };

    return { addRadio };

})();