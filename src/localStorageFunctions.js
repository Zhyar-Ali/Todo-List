import { layout } from "./dom.js";

export const save = (() => {

    const array = [];
    function saveFolder () {
        const div = document.querySelectorAll(".folder");
        div.forEach(p => {
            if (!array.includes(`${p.innerHTML}`) && p.innerHTML !== "All ToDos"){
                localStorage.setItem(`${p.innerHTML}`, p.innerHTML);
                array.push(`${p.innerHTML}`);
                localStorage.setItem("myArray", JSON.stringify(array));
            }
        });
    }

    return { saveFolder };
})();

export const load2 = (() => {

    function loadFolder () {
        const folders = layout.sidebar.firstChild;
        
        const array = JSON.parse(localStorage.getItem("myArray"));

        if (array !== null){
            for (const items of array){
                console.log(localStorage.getItem(items));
                const newDiv = document.createElement("div");
                newDiv.textContent = localStorage.getItem(items);
                newDiv.classList.add("folder");
                folders.append(newDiv);
            }
        }
    }

    const loadIt = () => {
        loadFolder();
    };


    return { loadIt };

})();