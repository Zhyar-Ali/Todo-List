import { layout } from "./dom.js";

export const save = (() => {

    const array = [];

    function saveFolder () {
        const div = document.querySelectorAll(".folder");
        div.forEach(p => {
            if (!array.includes(`${p.outerHTML}`) && p.textContent !== "All ToDos"){
                const divContent = p.outerHTML;
                localStorage.setItem(divContent, divContent);
                array.push(divContent);
                localStorage.setItem("myArray", JSON.stringify(array));
            }
        });
    }


    return { saveFolder };
})();

export const load2 = (() => {

    function loadFolder() {
        const parser = new DOMParser();
        const folders = layout.sidebar.firstChild;
        const array = JSON.parse(localStorage.getItem("myArray"));

        if (array !== null){
            for (const items of array){
                const doc = parser.parseFromString(items,'text/html');
                
                const restoredDiv = doc.body.firstChild;
                // console.log(restoredDiv);
                const rmBtn = restoredDiv.querySelector(".rmBtnFolder");
                
                folders.append(restoredDiv);

                rmBtn.addEventListener("click", () => {
                    const itemToRemove = array.indexOf(restoredDiv.outerHTML);
                    array.splice(itemToRemove,1);
                    restoredDiv.remove();
                    
                    localStorage.removeItem(restoredDiv.outerHTML);
                    localStorage.setItem("myArray", JSON.stringify(array));
                });
            }
        }

    }

    const loadIt = () => {
        loadFolder();
    };

    return { loadIt };

})();