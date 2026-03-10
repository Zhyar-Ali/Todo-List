import { createForm, dynamicRadio } from "./creatForm.js";
import { editform } from "./editForm.js";
import { getInfo } from "./getInfo.js";
import { createFolderForm } from "./createFolderForm.js";
import { load2 } from "./localStorageFunctions.js";

export const layout = (() => {

    const content = document.createElement("div");
    const sidebar = document.createElement("div");

    const load = () => {
    const body = document.querySelector("body");
    const container = document.getElementById("container");

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
        dynamicRadio.addRadio();
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


    createFolderForm.create();

    const folderDialog = document.createElement("dialog");
    folderDialog.setAttribute('id', 'folderDialog');

    const exitFolderForm = document.createElement("button");
    exitFolderForm.innerHTML = "X";
    exitFolderForm.setAttribute("type","button");
    exitFolderForm.setAttribute("id","exitFolderForm");

    folderDialog.append(exitFolderForm, createFolderForm.form);
    body.append(folderDialog);

    const allTodoDiv = document.createElement('div');
    allTodoDiv.textContent = "All ToDos";
    allTodoDiv.classList.add("folder");

    const addFolderBtn = document.createElement("button");
    addFolderBtn.classList.add("addFolderBtn");
    addFolderBtn.innerHTML = "+";

    addFolderBtn.addEventListener("click", () =>{
        folderDialog.showModal();
    });

    exitFolderForm.addEventListener("click", () => {
        folderDialog.close();
    });

    createFolderForm.submitClick(createFolderForm.submitButton);

    folders.append(allTodoDiv, addFolderBtn);

    load2.loadIt();

    folderEvent.click(allTodoDiv);

    };

    return {load, content, sidebar};

})();

export const folderEvent = (() => {

    function display(div) {
        const showClass = div.textContent.replace(/\s/g,"");
        let child = layout.content.getElementsByTagName("div");

        for (let i=0; i < child.length; i++){
            var childDiv = child[i];
            if (!childDiv.classList.contains(showClass)){
                childDiv.style.display = "none";
            }else {
                childDiv.style.display = "block";
            }
        }
    }

    const click = (div) => {
        div.addEventListener("click", () => {
            display(div);     
        });
    };

    return { click };
})();