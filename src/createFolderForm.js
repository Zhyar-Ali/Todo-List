import { layout, folderEvent } from "./dom.js";
import { save } from "./localStorageFunctions.js";
import { dynamicRadio } from "./creatForm.js";

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
            
            const rmBtn = document.createElement("button");
            rmBtn.innerText = "X";
            rmBtn.classList.add("rmBtnFolder");

            let actualText;
            div.childNodes.forEach(node => {
                if (node.nodeType === node.TEXT_NODE){
                    actualText = node.nodeValue;
                }
            })

            rmBtn.addEventListener("click", () => {
                dynamicRadio.removeRadio(actualText);
                div.remove();
            });

            div.append(rmBtn);

            folders.append(div);
            createFolderForm.form.reset();
            folderEvent.click(div); 
        }

    const submitClick = (button) => {
        button.addEventListener("click", (event) => {
            submit(event);
            save.saveFolder();
        });
    };

    return { form, create, submitButton, inputTitle, submitClick };
})();