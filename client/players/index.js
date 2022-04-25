const arr1 = ["Ім'я", 'Прізвище', 'Дата народження', 'Зріст', 'Вага', 'Кваліфікація', 'Амплуа', 'Команда'];
const table = document.getElementById("table");
let colIndex = -1;
fillTable();
makeDeleteButtonsActive();
makeEditButtonsActive();
makeNewButtonActive();
function makeFilterInputs() {
    let filterForm = document.getElementById('filters');
    for (let i = 0; i < table.rows[0].cells.length; i++) {
        let input = document.createElement("input");

        input.id = table.rows[0].cells[i].classList + 'filter';
        if (input.id === 'player_heightfilter' || input.id === "weigthfilter") {
            input.placeholder = table.rows[0].cells[i].innerHTML + ' від ...'
        } else {
            input.placeholder = table.rows[0].cells[i].innerHTML;
        }
        if (input.id === 'player_heightfilter' || input.id === 'weigthfilter' || input.id === 'id_qualfilter' || input.id === 'id_ampluafilter' || input.id === 'id_teamfilter') {
            input.type = "number";
        } else {
            input.type = 'text'
        }
        filterForm.appendChild(input);
    }
    let filterBtn = document.createElement('button');
    filterBtn.innerHTML = 'Примінити фільтри';
    filterBtn.classList.add('filter-btn');
    filterForm.appendChild(filterBtn);
}
function logicOfFiltering() {
    let filterBtn = document.querySelector('.filter-btn');
    filterBtn.addEventListener('click', () => {
        let inputs = Array.from(document.querySelector('#filters').children).slice(0, -1);
        let arr = inputs.map(element => {
            return element = { id: element.id, type: element.type, value: element.value };
        });

        Array.from(table.rows).slice(1).forEach((row) => {
            row.style.display = 'table-row';
            console.log(row);
            let i = 0;
            for (let obj of arr) {
                if (obj.type === 'text' && obj.value != "") {
                    if (row.children[i].innerHTML.toLowerCase().indexOf(obj.value.toLowerCase()) == -1) {
                        row.style.display = 'none';
                    }
                } else {
                    if (Number.parseInt(obj.value) > Number.parseInt(row.children[i].innerHTML)) {
                        row.style.display = 'none';
                    }
                }
                i++;
            }
        })
    })

}


function fillTable() {
    fetch('http://localhost:3000/player')
        .then((response) => {
            return response.json();
        })
        .then((data) => {

            makeHeaderToTable(data);
            fillTableWithData(data);
            makeFilterInputs(data);
            logicOfFiltering();

            sortTable();
        });


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
            if (field === 'idplayer') {
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

        document.getElementsByClassName('player_name')[0].dataType = 'text';
        document.getElementsByClassName('player_surnamename')[0].dataType = 'text';
        document.getElementsByClassName('player_dateofbirth')[0].dataType = 'date';
        document.getElementsByClassName('player_height')[0].dataType = 'integer';
        document.getElementsByClassName('weigth')[0].dataType = 'integer';
        document.getElementsByClassName('qualifications_name')[0].dataType = 'text';
        document.getElementsByClassName('amplua_name')[0].dataType = 'text';
        document.getElementsByClassName('team_name')[0].dataType = 'text';
    }

    // колонки начинаем как массив с 0ого элемента 
    const sortTable = () => {
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
            });
        });
    }

    function fillTableWithData(arr) {
        let tbody = document.createElement('tbody')
        for (let obj of arr) {
            let tr = document.createElement("tr");
            for (let key in obj) {
                if (key === 'idplayer') {
                    continue
                } else {
                    if (key === 'player_dateofbirth') {
                        let time = obj[key].slice(0, 10);
                        let td = document.createElement("td");
                        td.innerHTML = time;
                        tr.appendChild(td);
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

            tbody.appendChild(tr)
        }
        table.appendChild(tbody)
    }
}


function makeDeleteButtonsActive() {
    table.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete-row-btn')) {
            fetch('http://localhost:3000/player/' + event.target.name, {
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
            if (input.id === 'player_height' || input.id === 'weigth' || input.id === 'id_qual' || input.id === 'id_amplua' || input.id === 'id_team') {
                input.type = "number";
            } else if (input.id === 'player_dateofbirth') {
                input.type = "date";
            }
            form.appendChild(input);
        }


        let btn = document.createElement("button");
        btn.innerHTML = "Створити запис";
        form.appendChild(btn);

        btn.addEventListener("click", () => {
            let data = {
                "player_name": document.getElementById('player_name').value,
                "player_surnamename": document.getElementById('player_surnamename').value,
                "player_dateofbirth": document.getElementById('player_dateofbirth').value,
                "player_height": document.getElementById('player_height').value,
                "weigth": document.getElementById('weigth').value,
                "qualifications_name": document.getElementById('qualifications_name').value,
                "amplua_name": document.getElementById('amplua_name').value,
                "team_name": document.getElementById('team_name').value
            }

            if (isValid(data)) {
                form.style.display = 'none';
                for (let button of buttons) {
                    button.removeAttribute("disabled");
                }
                while (form.firstChild) {
                    form.removeChild(form.firstChild)
                }

                fetch('http://localhost:3000/player', {
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
                        };
                    });
            } else {
                alert('Некоректниій ввід');
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
            if (input.id === 'player_height' || input.id === 'weigth' || input.id === 'id_qual' || input.id === 'id_amplua' || input.id === 'id_team') {
                input.type = "number";
            } else if (input.id === 'player_dateofbirth') {
                input.type = "date";
            }
            j++;
        }


        let confirmEditBtn = document.createElement("button");
        confirmEditBtn.innerHTML = "Підтвердити зміни";
        editForm.appendChild(confirmEditBtn);


        confirmEditBtn.addEventListener("click", () => {
            let data = {
                "player_name": document.getElementById('player_name').value,
                "player_surnamename": document.getElementById('player_surnamename').value,
                "player_dateofbirth": document.getElementById('player_dateofbirth').value,
                "player_height": document.getElementById('player_height').value,
                "weigth": document.getElementById('weigth').value,
                "qualifications_name": document.getElementById('qualifications_name').value,
                "amplua_name": document.getElementById('amplua_name').value,
                "team_name": document.getElementById('team_name').value
            }
            if (isValid(data)) {
                editForm.style.display = 'none';
                for (let button of buttons) {
                    button.removeAttribute("disabled");
                }
                while (editForm.firstChild) {
                    editForm.removeChild(editForm.firstChild)
                }
                fetch('http://localhost:3000/player/' + button.name, {
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




function isValid(obj) {

    for (let key in obj) {
        if (!obj[key]) {
            return false;
        }
        if (key === 'player_dateofbirth') {
            if (!obj[key].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
                return false;
            } else {
                obj[key] = obj[key].match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/);

            }
        }
        if (key === 'id_team_one' || key === 'id_team_two' || key === 'score_one' || key === 'score_two' || key === 'id_tournament') {
            if (!Number.parseInt(obj[key])) return false;
        }
    }
    return true;
}