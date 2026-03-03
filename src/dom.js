import { createForm } from "./creatForm.js";
import { editform } from "./editForm.js";
import { getInfo } from "./getInfo.js";

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