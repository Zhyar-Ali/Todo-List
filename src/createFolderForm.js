import { layout } from "./dom.js";

export const createFolderForm = (() => {

    const form = document.createElement("form");
    const submitButton = document.createElement("button");
    const inputTitle = document.createElement("input");

    const create = () => {

        const title = document.createElement("label");
        title.innerHTML = "Folder Name: ";
        title.htmlFor = "folder";
        
        inputTitle.setAttribute("type", "text");
        inputTitle.setAttribute("id", "folder");
        inputTitle.setAttribute("name", "folder");

        submitButton.innerHTML = "Add Folder";
        submitButton.setAttribute("type","submit");
        submitButton.setAttribute("id","submitFolder");

        form.append(title,inputTitle, submitButton);
    };

    function submit (event){
            event.preventDefault();

            const folder = document.getElementById("folder").value;
            const folders = layout.sidebar.firstChild;

            const div = document.createElement("div");
            div.textContent = folder;
            div.classList.add("folder");

            folders.append(div);
        }

    const submitClick = (button) => {
        button.addEventListener("click", submit);
    };

    return { form, create, submitButton, inputTitle, submitClick };
})();