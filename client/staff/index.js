const arr1 = ["Ім'я", 'Прізвище', 'По батькові', 'Вік', 'ID позиції', 'ID команди'];
const table = document.getElementById("table");
let score = document.getElementById('rows-count');

fillTable();
makeDeleteButtonsActive();
makeEditButtonsActive();
makeNewButtonActive();
function getCountOfNonActiveRows(rows) {
    let sum = 0;
    for (let i = 0; i < rows.length; i++) {
        if (rows[i].style.display == 'none') {
            sum += 1;
        }
    }
    return sum;
}
function makeFilterInputs() {
    let filterForm = document.getElementById('filters');
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        let input = document.createElement("input");
        input.placeholder = table.rows[0].cells[i].innerHTML;
        input.id = table.rows[0].cells[i].classList + 'filter';
        if (input.classList.contains('score_one') || input.classList.contains('score_two')) {
            input.type = 'number';
        } else if (input.classList.contains('match_date')) {
            input.type = "date";
        }
        filterForm.appendChild(input);
    }
}

function fillTable() {
    fetch('http://localhost:3000/staff')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            makeHeaderToTable(data);
            fillTableWithData(data);
            makeFilterInputs(data);
            Array.from(document.querySelectorAll('#filters input')).forEach(element => {
                element.addEventListener('keyup', (e) => {
                    console.log(table.childNodes);
                    let inptsvalues = [];
                    Array.from(document.querySelectorAll('#filters input')).forEach(element => {
                        inptsvalues.push(element.value);
                    });
                    for (let i = 1; i < table.rows.length; i++) {
                        table.rows[i].style.display = 'table-row';
                        console.log(table.rows[i].cells[0].innerHTML.toLowerCase());
                        if (table.rows[i].cells[0].innerHTML.toLowerCase().indexOf(inptsvalues[0].toLowerCase()) == -1 || table.rows[i].cells[1].innerHTML.toLowerCase().indexOf(inptsvalues[1].toLowerCase()) == -1 || table.rows[i].cells[2].innerHTML.toLowerCase().indexOf(inptsvalues[2].toLowerCase()) == -1 || table.rows[i].cells[3].innerHTML.toLowerCase().indexOf(inptsvalues[3].toLowerCase()) == -1 || table.rows[i].cells[4].innerHTML.toLowerCase().indexOf(inptsvalues[4].toLowerCase()) == -1 || table.rows[i].cells[5].innerHTML.toLowerCase().indexOf(inptsvalues[5].toLowerCase()) == -1) {
                            table.rows[i].style.display = 'none';
                        }
                    }
                    score.innerHTML = table.rows.length - getCountOfNonActiveRows(table.rows) - 1;

                })
            });
            score.innerHTML = table.rows.length - 1;
            sortTable()
        });


}


function makeDeleteButtonsActive() {
    table.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-row-btn')) {
            fetch('http://localhost:3000/staff/' + event.target.name, {
                method: 'DELETE',
            })
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    if (data.affectedRows === 1) {
                        location.reload();
                    };
                });
        }
    })
}
function makeNewButtonActive() {
    let buttons = document.getElementsByTagName("button");
    let addBtn = document.getElementById("add-new");

    addBtn.addEventListener("click", () => {
        for (let button of buttons) {
            button.disabled = "disabled";
        }
        activateNewForm();

    })

    function activateNewForm() {

        let form = document.getElementById("new-form");
        form.style.display = "flex";
        let namediv = document.createElement("div");
        namediv.innerHTML = "Зробити новий запис";
        namediv.style.fontSize = "25px";
        namediv.style.padding = "5px";
        namediv.style.border = "1px solid black"
        namediv.style.marginLeft = "10px";
        namediv.style.backgroundColor = "greenyellow";
        form.appendChild(namediv)


        for (let i = 0; i < table.rows[0].cells.length; i++) {
            let input = document.createElement("input");
            input.placeholder = table.rows[0].cells[i].innerHTML;
            input.id = table.rows[0].cells[i].classList;
            form.appendChild(input);
            if (input.id === 'st_age' || input.id === 'id_pos' || input.id === 'id_team') {
                input.type = "number";
            } else {
                input.type = "text";
            }
        }


        let btn = document.createElement("button");
        btn.innerHTML = "Створити запис";
        form.appendChild(btn);

        btn.addEventListener("click", () => {
            let data = {
                id_pos: document.getElementById("id_pos").value,
                id_team: document.getElementById("id_team").value,
                st_age: document.getElementById("st_age").value,
                st_fname: document.getElementById("st_fname").value,
                st_lname: document.getElementById("st_lname").value,
                st_surname: document.getElementById("st_surname").value,
            }

            if (isValid(data)) {
                form.style.display = 'none';
                for (let button of buttons) {
                    button.removeAttribute("disabled");
                }
                while (form.firstChild) {
                    form.removeChild(form.firstChild)
                }

                fetch('http://localhost:3000/staff', {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'POST',
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data.affectedRows === 1) {
                            location.reload();
                        } else {
                        };
                    });
            } else {
                alert('Некоректниій ввід');
            }


            function isValid(obj) {
                for (let key in obj) {
                    if (!obj[key]) {
                        return false;
                    }
                }
                return true;
            }

        })

        let closeBtn = document.createElement("button");
        closeBtn.innerHTML = "Відміна";
        closeBtn.classList.add('close-btn-form');
        form.appendChild(closeBtn);

        closeBtn.addEventListener("click", () => {
            form.style.display = 'none';
            for (let button of buttons) {
                button.removeAttribute("disabled");
            }
            while (form.firstChild) {
                form.removeChild(form.firstChild)
            }

        })


    }
}


function makeEditButtonsActive() {
    table.addEventListener("click", (event) => {
        if (event.target.classList.contains("edit-row-btn")) {
            activateEditForm(event.target)
        }
    })


    function activateEditForm(button) {
        let buttons = document.getElementsByTagName("button");
        for (let button of buttons) {
            button.disabled = "disabled";
        }

        let editForm = document.getElementById("edit-form");

        let namediv = document.createElement("div");
        namediv.innerHTML = "Змінити запис";
        namediv.style.fontSize = "25px";
        namediv.style.padding = "5px";
        namediv.style.border = "1px solid black"
        namediv.style.marginLeft = "10px";
        namediv.style.backgroundColor = "#ffce1a";
        editForm.appendChild(namediv)
        // вся инфа про строчку
        let values = [];
        let i = 0;
        for (let elem of Array.from(button.parentNode.parentNode.childNodes).slice(0, -2)) {
            values[i] = elem.innerHTML;
            i++;
        }
        editForm.style.display = "flex";
        let j = 0;
        for (let elem of values) {
            let input = document.createElement("input");
            input.value = elem;
            input.id = table.rows[0].cells[j].classList;
            editForm.appendChild(input);
            if (input.id === 'st_age' || input.id === 'id_pos' || input.id === 'id_team') {
                input.type = "number";
            } else {
                input.type = "text";
            }
            j++;
        }


        let confirmEditBtn = document.createElement("button");
        confirmEditBtn.innerHTML = "Підтвердити зміни";
        editForm.appendChild(confirmEditBtn);


        confirmEditBtn.addEventListener("click", () => {
            let data = {
                id_pos: document.getElementById("id_pos").value,
                id_team: document.getElementById("id_team").value,
                st_age: document.getElementById("st_age").value,
                st_fname: document.getElementById("st_fname").value,
                st_lname: document.getElementById("st_lname").value,
                st_surname: document.getElementById("st_surname").value,
            }
            if (isValid(data)) {
                editForm.style.display = 'none';
                for (let button of buttons) {
                    button.removeAttribute("disabled");
                }
                while (editForm.firstChild) {
                    editForm.removeChild(editForm.firstChild)
                }
                fetch('http://localhost:3000/staff/' + button.name, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT',
                    body: JSON.stringify(data),
                })
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        if (data.affectedRows === 1) {
                            location.reload();
                        };
                    });
            } else {
                alert('Некоректниій ввід');
            }


            function isValid(obj) {
                for (let key in obj) {
                    if (!obj[key]) {
                        return false;
                    }
                }
                return true;
            }

        })


        let closeEditFormBtn = document.createElement("button");
        closeEditFormBtn.innerHTML = "Закрити";
        editForm.appendChild(closeEditFormBtn);

        closeEditFormBtn.addEventListener("click", () => {
            editForm.style.display = 'none';
            for (let button of buttons) {
                button.removeAttribute("disabled");
            }
            while (editForm.firstChild) {
                editForm.removeChild(editForm.firstChild)
            }

        })

    }
}




function makeHeaderToTable(arr) {
    const obj = arr[0];
    let nameFields;
    // проверяем на существование ,во избежание ошибок 
    if (obj) {
        nameFields = Object.keys(obj);
    } else {
        return;
    }

    let tr = document.createElement("tr");
    table.appendChild(tr);
    let k = 0;
    for (let field of nameFields) {
        if (field === 'idstaff') {
            continue
        } else {
            let th = document.createElement("th");
            th.classList.add(field);
            th.innerHTML = arr1[k];
            th.name = k;
            
            k++;
            tr.appendChild(th)
        }
    }
    document.getElementsByClassName('st_fname')[0].dataType = 'text';
    document.getElementsByClassName('st_surname')[0].dataType = 'text';
    document.getElementsByClassName('st_lname')[0].dataType = 'text';
    document.getElementsByClassName('st_age')[0].dataType = 'integer';
    document.getElementsByClassName('id_pos')[0].dataType = 'integer';
    document.getElementsByClassName('id_team')[0].dataType = 'integer';
}
// колонки начинаем как массив с 0ого элемента 


function fillTableWithData(arr) {
    let tbody = document.createElement('tbody')
    for (let obj of arr) {
        let tr = document.createElement("tr");
        for (let key in obj) {
            if (key === 'idstaff') {
                continue
            } else {
                if (key === 'match_date') {
                    let time = obj[key].slice(0, 10);
                    let td = document.createElement("td");
                    td.innerHTML = time;
                    tr.appendChild(td);
                    console.log("lol");
                } else {
                    let td = document.createElement("td");
                    td.innerHTML = obj[key];
                    tr.appendChild(td);
                }
            }
        }
        // кнопка удаления
        let td1 = document.createElement("td");
        let deleteBtn = document.createElement("button");
        deleteBtn.innerHTML = "Удалити"
        deleteBtn.classList.add('delete-row-btn');
        deleteBtn.name = obj[Object.keys(arr[0])[0]];
        td1.appendChild(deleteBtn)
        tr.appendChild(td1);


        // кнопка изменения
        let td2 = document.createElement("td");
        let editBtn = document.createElement("button");
        editBtn.innerHTML = "Змінити"
        editBtn.classList.add('edit-row-btn');
        editBtn.name = obj[Object.keys(arr[0])[0]];
        td2.appendChild(editBtn);
        tr.appendChild(td2);


        tbody.appendChild(tr);
    }
    table.appendChild(tbody)
}

function sortTable (){
    const table = document.querySelector('table');
    const headers = table.querySelectorAll('th');
    const tbody = table.querySelector('tbody');

    const directions = Array.from(headers).map(() => '');


    const transform = (type, content) => {
        switch (type) {
            case 'integer':
                return parseInt(content);
            case 'text':
            default:
                return content;
        }
    }

    const sortColumn = (index) => {
        const type = headers[index].dataType;
        const rows = tbody.querySelectorAll('tr');
        const direction = directions[index] || 'sortUp';
        const multiply = direction === 'sortUp' ? 1 : -1;
        const newRows = Array.from(rows);
        newRows.sort((row1, row2) => {
            const cellA = row1.querySelectorAll('td')[index].textContent;
            const cellB = row2.querySelectorAll('td')[index].textContent;

            const a = transform(type, cellA);
            const b = transform(type, cellB);

            switch (true) {
                case a > b:
                    return 1 * multiply;
                case a < b:
                    return -1 * multiply;
                default:
                    break;
                case a === b:
                    return 0;
            }
        });

        [].forEach.call(rows, (row) => {
            tbody.removeChild(row);
        });

        directions[index] = direction === 'sortUp' ? 'sortDown' : 'sortUp';

        newRows.forEach(newRow => {
            tbody.appendChild(newRow);
        });
    }

    [].forEach.call(headers, (header, index) => {
        header.addEventListener('click', () => {
            sortColumn(index);
            console.log(directions);
        });
    });
}