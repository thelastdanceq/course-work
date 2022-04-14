
let teamWinrateBtn = document.getElementById("teamWinrate");
let table = document.getElementsByTagName('table')[0];
let helpTable = document.getElementById('helpful-table');

let clones = [];

let firstinput = document.getElementById('1');
let secondinput = document.getElementById('2');
let thirdInput = document.getElementById('3');
let fourthInput = document.getElementById('4');
let submit = document.getElementsByClassName('submit')[0];
let labels = Array.from(document.getElementsByTagName('label'));
let btns = Array.from(document.getElementsByClassName('btns'));
function clearInputs() {
    firstinput.style.display = 'none';
    secondinput.style.display = 'none';
    thirdInput.style.display = 'none';
    fourthInput.style.display = 'none';
    submit.style.display = 'none';
    labels.forEach(elem => elem.style.display = 'none')
}


teamWinrateBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == teamWinrateBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });
    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }
    while (helpTable.firstChild) {
        helpTable.removeChild(helpTable.firstChild)
    }
    submit.style.display = 'none';
    firstinput.style.display = 'none';
    secondinput.style.display = 'none';
    thirdInput.style.display = 'none';
    fourthInput.style.display = 'none';
    labels.forEach(element => {
        element.style.display = 'none';
    });


    fetch('http://localhost:3000/teamWinrate')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            (() => {
                while (table.firstChild) {
                    table.removeChild(table.firstChild)
                }
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.innerHTML = 'Відсоток';
                tr.appendChild(td);
                table.appendChild(tr);
            })()
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            td.innerHTML = data[0][Object.keys(data[0])];
            tr.appendChild(td);
            table.appendChild(tr);

        });
})


let teamWinrateAgainstBtn = document.getElementById('teamWinrateAgainst');

teamWinrateAgainstBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == teamWinrateAgainstBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });

    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }
    while (helpTable.firstChild) {
        helpTable.removeChild(helpTable.firstChild)
    }

    fetch("http://localhost:3000/teamnames")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            while (table.firstChild) {
                table.removeChild(table.firstChild)
            }
            secondinput.style.display = 'none';
            thirdInput.style.display = 'none';
            fourthInput.style.display = 'none';
            labels.forEach(element => {
                element.style.display = 'none';
            });


            (() => {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                let td1 = document.createElement('td');
                td1.innerHTML = 'ID';
                tr.appendChild(td1);
                td.innerHTML = 'Назва команди';
                tr.appendChild(td);
                helpTable.appendChild(tr);
            })()
            for (let obj of data) {
                let tr = document.createElement('tr');
                for (let key in obj) {
                    let td = document.createElement("td");
                    td.innerHTML = obj[key];
                    tr.appendChild(td);
                }
                helpTable.appendChild(tr);
            }
        });


    let firstinput = document.getElementById('1');
    submit.style.display = 'block';

    firstinput.style.display = 'block';
    firstinput.placeholder = "Введіть id команди";

    let submitClone = submit.cloneNode(true);
    submitClone = submit.parentNode.insertBefore(submitClone, submit);
    submit.style.display = 'none';
    clones.push(submitClone);

    submitClone.addEventListener('click', function submithandlerOne() {
        let idofteam = firstinput.value;
        firstinput.value = '';
        fetch('http://localhost:3000/teamWinrates/' + idofteam)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                while (table.firstChild) {
                    table.removeChild(table.firstChild)
                }
                if (data[0][Object.keys(data[0])] != null) {
                    while (table.firstChild) {
                        table.removeChild(table.firstChild)
                    }
                    (() => {
                        let tr = document.createElement('tr');
                        let td = document.createElement('td');
                        td.innerHTML = 'Відсоток виграних матчів проти команди з id:' + idofteam;
                        tr.appendChild(td);
                        table.appendChild(tr);
                    })()
                    let tr = document.createElement('tr');
                    let td = document.createElement('td');
                    td.innerHTML = data[0][Object.keys(data[0])];
                    tr.appendChild(td);
                    table.appendChild(tr);
                } else {
                    table.append('Нема зіграних матчів проти команди з id:' + idofteam)
                }
            });
    })
})
let avgcatchesBtn = document.getElementById('avgCatchesForEveryPlayer');
let avgscoresBtn = document.getElementById('avgScoreForEveryPlayer');




avgcatchesBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == avgcatchesBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });

    fetch('http://localhost:3000/avgcatches')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            (() => {
                while (table.firstChild) {
                    table.removeChild(table.firstChild)
                }
                while (helpTable.firstChild) {
                    helpTable.removeChild(helpTable.firstChild)
                }
                submit.style.display = 'none';
                firstinput.style.display = 'none';

                let tr = document.createElement('tr');
                let td = document.createElement('td');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                td.innerHTML = 'Прізвище';
                td1.innerHTML = "Ім'я";
                td2.innerHTML = 'Середня кількість підборів'
                tr.appendChild(td);
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
            })()
            console.log(data);
            for (let obj of data[0]) {
                let tr = document.createElement("tr");
                for (let key in obj) {
                    let td = document.createElement("td");
                    td.innerHTML = obj[key];
                    tr.appendChild(td)
                }
                table.appendChild(tr);
            }

        });

})


avgscoresBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == avgscoresBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });

    fetch('http://localhost:3000/avgscores')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            (() => {
                while (table.firstChild) {
                    table.removeChild(table.firstChild)
                }
                while (helpTable.firstChild) {
                    helpTable.removeChild(helpTable.firstChild)
                }
                submit.style.display = 'none';
                firstinput.style.display = 'none';
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                td.innerHTML = 'Прізвище';
                td1.innerHTML = "Ім'я";
                td2.innerHTML = 'Середня кількість забитих очків'
                tr.appendChild(td);
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
            })()
            for (let obj of data[0]) {
                let tr = document.createElement("tr");
                for (let key in obj) {
                    let td = document.createElement("td");
                    td.innerHTML = obj[key];
                    tr.appendChild(td)
                }
                table.appendChild(tr);
            }

        });

})
let avgswaistsBtn = document.getElementById('avgWaistForEveryPlayer');
avgswaistsBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == avgswaistsBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });

    fetch('http://localhost:3000/avgwaists')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            (() => {
                while (table.firstChild) {
                    table.removeChild(table.firstChild)
                }
                while (helpTable.firstChild) {
                    helpTable.removeChild(helpTable.firstChild)
                }
                submit.style.display = 'none';
                firstinput.style.display = 'none';
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                let td1 = document.createElement('td');
                let td2 = document.createElement('td');
                td.innerHTML = 'Прізвище';
                td1.innerHTML = "Ім'я";
                td2.innerHTML = 'Середня кількість втрат'
                tr.appendChild(td);
                tr.appendChild(td1);
                tr.appendChild(td2);
                table.appendChild(tr);
            })()
            for (let obj of data[0]) {
                let tr = document.createElement("tr");
                for (let key in obj) {
                    let td = document.createElement("td");
                    td.innerHTML = obj[key];
                    tr.appendChild(td)
                }
                table.appendChild(tr);
            }

        });

})


//2 - от  ; 3 - до 
let avgplayerStatinPeriodBtn = document.getElementById('avgplayerStatinPeriod');
avgplayerStatinPeriodBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == avgplayerStatinPeriodBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });
    fetch("http://localhost:3000/playernames")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            while (table.firstChild) {
                table.removeChild(table.firstChild)
            }
            while (helpTable.firstChild) {
                helpTable.removeChild(helpTable.firstChild)
            }
            (() => {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.innerHTML = 'Імена гравців';
                tr.appendChild(td);
                helpTable.appendChild(tr);
            })()
            for (let obj of data) {
                let tr = document.createElement('tr');
                for (let key in obj) {
                    let td = document.createElement("td");
                    td.innerHTML = obj[key];
                    tr.appendChild(td);
                }
                helpTable.appendChild(tr);
            }
        });



    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }
    while (helpTable.firstChild) {
        helpTable.removeChild(helpTable.firstChild)
    }
    firstinput.style.display = "none";
    submit.style.display = 'block';
    secondinput.style.display = 'block';

    thirdInput.style.display = 'block';
    fourthInput.style.display = 'block';
    fourthInput.placeholder = 'Прізвище гравця'
    let labels = Array.from(document.getElementsByTagName('label'));
    labels.forEach(element => {
        element.style.display = 'block';
    });
    let dateString = new Date().getFullYear();
    dateString += '-';
    if (String(new Date().getMonth() + 1).length > 1) {
        dateString += String(new Date().getMonth() + 1);
        dateString += '-';
    } else {
        dateString += '0';
        dateString += (new Date().getMonth() + 1);
        dateString += '-';
    }
    if (String(new Date().getDate()).length > 1) {
        dateString += (new Date().getDate());
    } else {
        dateString += '0';
        dateString += (new Date().getDate());
    }

    secondinput.value = dateString;
    secondinput.max = dateString;
    thirdInput.value = dateString;
    thirdInput.max = dateString;
    let submitClone = submit.cloneNode(true);
    submitClone = submit.parentNode.insertBefore(submitClone, submit);
    submit.style.display = 'none';
    clones.push(submitClone);

    submitClone.addEventListener('click', function avgplayerStatinPeriodBtsubmit() {
        if (secondinput.style.display != 'none' && thirdInput.style.display != 'none' && fourthInput.style.display != 'none') {
            if (secondinput.value && thirdInput.value && fourthInput.value) {
                fetch('http://localhost:3000/avgstatinperiod/' + secondinput.value + '/' + thirdInput.value + "/" + fourthInput.value)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        while (table.firstChild) {
                            table.removeChild(table.firstChild)
                        }
                        console.log(data);
                        if (data[0][Object.keys(data[0])] != null) {
                            while (table.firstChild) {
                                table.removeChild(table.firstChild)
                            }
                            (() => {
                                let tr = document.createElement('tr');
                                let td = document.createElement('td');
                                let td1 = document.createElement('td');
                                let td2 = document.createElement('td');
                                td.innerHTML = 'К-сть підборів';
                                td1.innerHTML = 'К-сть набраних очок';
                                td2.innerHTML = 'К-сть втрат';
                                tr.appendChild(td);
                                tr.appendChild(td1);
                                tr.appendChild(td2);
                                table.appendChild(tr);
                            })()
                            for (let obj of data[0]) {
                                let tr = document.createElement('tr');
                                for (let key in obj) {
                                    let td = document.createElement('td');
                                    td.innerHTML = obj[key];
                                    tr.appendChild(td);
                                }
                                table.appendChild(tr);
                            }
                        } else {
                            table.append('немає статистики за період від ' + secondinput.value + ' до ' + thirdInput.value + " за гравця з прізвищем " + fourthInput.value)
                        }
                        fourthInput.value = ''

                    })
            } else {
                alert('Некоректний ввід')
            }
        }
    })


})





let playerStatinPeriodBtn = document.getElementById('playerStatinPeriod');

playerStatinPeriodBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == playerStatinPeriodBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });
    fetch("http://localhost:3000/playernames")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            while (table.firstChild) {
                table.removeChild(table.firstChild)
            }
            while (helpTable.firstChild) {
                helpTable.removeChild(helpTable.firstChild)
            }
            (() => {
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.innerHTML = 'Імена гравців';
                tr.appendChild(td);
                helpTable.appendChild(tr);
            })()
            for (let obj of data) {
                let tr = document.createElement('tr');
                for (let key in obj) {
                    let td = document.createElement("td");
                    td.innerHTML = obj[key];
                    tr.appendChild(td);
                }
                helpTable.appendChild(tr);
            }
        });



    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }
    while (helpTable.firstChild) {
        helpTable.removeChild(helpTable.firstChild)
    }
    firstinput.style.display = "none";
    submit.style.display = 'block';
    secondinput.style.display = 'block';
    thirdInput.style.display = 'block';
    fourthInput.style.display = 'block';
    fourthInput.placeholder = 'Прізвище гравця'
    let labels = Array.from(document.getElementsByTagName('label'));
    labels.forEach(element => {
        element.style.display = 'block';
    });
    let dateString = new Date().getFullYear();
    dateString += '-';
    if (String(new Date().getMonth() + 1).length > 1) {
        dateString += (new Date().getMonth() + 1);
        dateString += '-';
    } else {
        dateString += '0';
        dateString += (new Date().getMonth() + 1);
        dateString += '-';
    }
    if (String(new Date().getDate()).length > 1) {
        dateString += (new Date().getDate());
    } else {
        dateString += '0';
        dateString += (new Date().getDate());
    }
    secondinput.value = dateString;
    secondinput.max = dateString;
    thirdInput.value = dateString;
    thirdInput.max = dateString;

    let submitClone = submit.cloneNode(true);
    submitClone = submit.parentNode.insertBefore(submitClone, submit);
    submit.style.display = 'none';
    clones.push(submitClone);

    submitClone.addEventListener('click', function playerStatinPeriodBtnsubmit() {
        if (secondinput.style.display != 'none' && thirdInput.style.display != 'none' && fourthInput.style.display != 'none') {
            if (secondinput.value && thirdInput.value && fourthInput.value) {
                fetch('http://localhost:3000/statinperiod/' + secondinput.value + '/' + thirdInput.value + "/" + fourthInput.value)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        while (table.firstChild) {
                            table.removeChild(table.firstChild)
                        }
                        if ((data[0][0])) {
                            while (table.firstChild) {
                                table.removeChild(table.firstChild)
                            }
                            (() => {
                                let tr = document.createElement('tr');
                                let tdid = document.createElement('td');
                                let td = document.createElement('td');
                                let td1 = document.createElement('td');
                                let td2 = document.createElement('td');
                                tdid.innerHTML = 'ID матчу'
                                td.innerHTML = 'К-сть підборів';
                                td1.innerHTML = 'К-сть набраних очок';
                                td2.innerHTML = 'К-сть втрат';
                                tr.appendChild(tdid)
                                tr.appendChild(td);
                                tr.appendChild(td1);
                                tr.appendChild(td2);
                                table.appendChild(tr);
                            })()
                            for (let obj of data[0]) {
                                let tr = document.createElement('tr');
                                for (let key in obj) {
                                    let td = document.createElement('td');
                                    td.innerHTML = obj[key];
                                    tr.appendChild(td);
                                }
                                table.appendChild(tr);
                            }
                        } else {
                            table.append('немає статистики за період від ' + secondinput.value + ' до ' + thirdInput.value + " за гравця з прізвищем " + fourthInput.value)

                        }
                        fourthInput.value = ''
                        submit.removeEventListener('click', func2())
                    })
            } else {
                alert('Некоректний ввід')
            }
        }

    })

})

let selectMatcheswithDatasBtn = document.getElementById('selectMatcheswithDatas');


selectMatcheswithDatasBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    let dateString = new Date().getFullYear();
    dateString += '-';
    if (String(new Date().getMonth() + 1).length > 1) {
        dateString += (new Date().getMonth() + 1);
        dateString += '-';
    } else {
        dateString += '0';
        dateString += (new Date().getMonth() + 1);
        dateString += '-';
    }
    if (String(new Date().getDate()).length > 1) {
        dateString += (new Date().getDate());
    } else {
        dateString += '0';
        dateString += (new Date().getDate());
    }
    secondinput.value = dateString;
    secondinput.max = dateString;
    thirdInput.value = dateString;
    thirdInput.max = dateString;

    btns.forEach(element => {
        if (element.id == selectMatcheswithDatasBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });
    while (table.firstChild) {
        table.removeChild(table.firstChild)
    }
    while (helpTable.firstChild) {
        helpTable.removeChild(helpTable.firstChild)
    }
    firstinput.style.display = "none";
    submit.style.display = 'block';
    secondinput.style.display = 'block';
    thirdInput.style.display = 'block';
    fourthInput.style.display = 'none';


    let submitClone = submit.cloneNode(true);
    submitClone = submit.parentNode.insertBefore(submitClone, submit);
    submit.style.display = 'none';
    clones.push(submitClone);

    submitClone.addEventListener('click', function playerStatinPeriodBtnsubmit() {
        if (secondinput.style.display != 'none' && thirdInput.style.display != 'none') {
            if (secondinput.value && thirdInput.value) {
                fetch('http://localhost:3000/matchesbetween/' + secondinput.value + '/' + thirdInput.value)
                    .then((response) => {
                        return response.json();
                    })
                    .then((data) => {
                        console.log(data);
                        while (table.firstChild) {
                            table.removeChild(table.firstChild)
                        }
                        if ((data[0][0])) {
                            while (table.firstChild) {
                                table.removeChild(table.firstChild)
                            }
                            (() => {
                                let tr = document.createElement('tr');
                                let tdid = document.createElement('td');
                                let td = document.createElement('td');
                                let td1 = document.createElement('td');
                                let td2 = document.createElement('td');
                                let td3 = document.createElement('td');
                                let td4 = document.createElement('td');

                                tdid.innerHTML = 'ID матчу'
                                td.innerHTML = 'Назва першої команди';
                                td1.innerHTML = 'Назва другої команди';
                                td2.innerHTML = 'К-сть очок першої команди';
                                td3.innerHTML = 'К-сть очок другої команди';
                                td4.innerHTML = 'Дата матчу'
                                tr.appendChild(tdid)
                                tr.appendChild(td);
                                tr.appendChild(td1);
                                tr.appendChild(td2);
                                tr.appendChild(td3);
                                tr.appendChild(td4);
                                table.appendChild(tr);
                            })()
                            for (let obj of data[0]) {
                                let tr = document.createElement('tr');
                                for (let key in obj) {
                                    let td = document.createElement('td');
                                    td.innerHTML = obj[key];
                                    tr.appendChild(td);
                                }
                                table.appendChild(tr);
                            }
                        } else {
                            table.append('немає матчів за цими датами ')

                        }
                    })
            } else {
                alert('Некоректний ввід')
            }
        }

    })
})


let teamsStatinMatchBtn = document.getElementById('teamsStatinMatch');

teamsStatinMatchBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == teamsStatinMatchBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });

    fetch('http://localhost:3000/matchesname')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            (() => {
                while (table.firstChild) {
                    table.removeChild(table.firstChild)
                }
                while (helpTable.firstChild) {
                    helpTable.removeChild(helpTable.firstChild)
                }
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.innerHTML = 'ID матчу';
                tr.appendChild(td);
                let td1 = document.createElement('td');
                td1.innerHTML = 'Назва першої команди';
                tr.appendChild(td1);
                let td2 = document.createElement('td');
                td2.innerHTML = 'Назва другої команди';
                tr.appendChild(td2);
                let td3 = document.createElement('td');
                td3.innerHTML = 'Очки першої команди';
                tr.appendChild(td3);
                let td4 = document.createElement('td');
                td4.innerHTML = 'Очки другої команди';
                tr.appendChild(td4);
                helpTable.appendChild(tr);
            })()
            for (let obj of data) {
                let tr = document.createElement("tr");
                for (let key in obj) {
                    let td = document.createElement('td');
                    td.innerHTML = obj[key];
                    tr.appendChild(td);
                }
                helpTable.appendChild(tr)
            }

        });
    firstinput.style.display = 'block';
    firstinput.placeholder = 'Введіть id матчу'
    submit.style.display = "block";
    let submitClone = submit.cloneNode(true);
    submitClone = submit.parentNode.insertBefore(submitClone, submit);
    submit.style.display = 'none';
    clones.push(submitClone);
    submitClone.addEventListener('click', () => {
        if (!firstinput.value) {
            alert('некоректні дані');
        } else {
            fetch('http://localhost:3000/teamstatinmatch/' + firstinput.value)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data[0]);
                    while (table.firstChild) {
                        table.removeChild(table.firstChild)
                    }
                    if (!data[0][0]) {
                        table.innerHTML = "немає статистики за даний матч";
                    } else {
                        let tr1 = document.createElement('tr');
                        let td0 = document.createElement('td');
                        td0.innerHTML = 'Прізвище';
                        tr1.appendChild(td0);
                        let td1 = document.createElement('td');
                        td1.innerHTML = 'Підбори';
                        tr1.appendChild(td1);
                        let td2 = document.createElement('td');
                        td2.innerHTML = 'Забив';
                        tr1.appendChild(td2);
                        let td3 = document.createElement('td');
                        td3.innerHTML = 'Втрат';
                        tr1.appendChild(td3);
                        table.appendChild(tr1)
                        for (let obj of data[0]) {
                            let tr = document.createElement('tr');
                            for (let key in obj) {
                                let td = document.createElement('td');
                                td.innerHTML = obj[key];
                                tr.appendChild(td);
                            }
                            table.appendChild(tr);
                        };
                    }
                })
        }

    })

})


let teamsStatinPeriodBtn = document.getElementById('teamsStatinPeriod');

teamsStatinPeriodBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == teamsStatinPeriodBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }

    });
    let dateString = new Date().getFullYear();
    dateString += '-';
    if (String(new Date().getMonth() + 1).length > 1) {
        dateString += (new Date().getMonth() + 1);
        dateString += '-';
    } else {
        dateString += '0';
        dateString += (new Date().getMonth() + 1);
        dateString += '-';
    }
    if (String(new Date().getDate()).length > 1) {
        dateString += (new Date().getDate());
    } else {
        dateString += '0';
        dateString += (new Date().getDate());
    }
    secondinput.value = dateString;
    secondinput.max = dateString;
    thirdInput.value = dateString;
    thirdInput.max = dateString;


    secondinput.style.display = 'block';
    thirdInput.style.display = 'block';
    submit.style.display = "block";
    let submitClone = submit.cloneNode(true);
    submitClone = submit.parentNode.insertBefore(submitClone, submit);
    submit.style.display = 'none';
    clones.push(submitClone);


    submitClone.addEventListener('click', () => {
        if (secondinput.value && thirdInput.value) {
            fetch('http://localhost:3000/teamstatinperiod/' + secondinput.value + '/' + thirdInput.value)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data[0]);
                    while (table.firstChild) {
                        table.removeChild(table.firstChild)
                    }
                    if (!data[0][0]) {
                        table.innerHTML = "немає статистики за даний матч";
                    } else {
                        let tr1 = document.createElement('tr');
                        let td0 = document.createElement('td');
                        td0.innerHTML = 'Прізвище';
                        tr1.appendChild(td0);
                        let td1 = document.createElement('td');
                        td1.innerHTML = 'Підбори';
                        tr1.appendChild(td1);
                        let td2 = document.createElement('td');
                        td2.innerHTML = 'Забив';
                        tr1.appendChild(td2);
                        let td3 = document.createElement('td');
                        td3.innerHTML = 'Втрат';
                        tr1.appendChild(td3);
                        table.appendChild(tr1)
                        for (let obj of data[0]) {
                            let tr = document.createElement('tr');
                            for (let key in obj) {
                                let td = document.createElement('td');
                                td.innerHTML = obj[key];
                                tr.appendChild(td);
                            }
                            table.appendChild(tr);
                        };
                    }
                })

        }
    })
})




let MVPofmatchBtn = document.getElementById("MVPofmatch");

MVPofmatchBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == MVPofmatchBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });

    fetch('http://localhost:3000/matchesname')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            (() => {
                while (table.firstChild) {
                    table.removeChild(table.firstChild)
                }
                while (helpTable.firstChild) {
                    helpTable.removeChild(helpTable.firstChild)
                }
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.innerHTML = 'ID матчу';
                tr.appendChild(td);
                let td1 = document.createElement('td');
                td1.innerHTML = 'Назва першої команди';
                tr.appendChild(td1);
                let td2 = document.createElement('td');
                td2.innerHTML = 'Назва другої команди';
                tr.appendChild(td2);
                let td3 = document.createElement('td');
                td3.innerHTML = 'Очки першої команди';
                tr.appendChild(td3);
                let td4 = document.createElement('td');
                td4.innerHTML = 'Очки другої команди';
                tr.appendChild(td4);
                helpTable.appendChild(tr);
            })()
            for (let obj of data) {
                let tr = document.createElement("tr");
                for (let key in obj) {
                    let td = document.createElement('td');
                    td.innerHTML = obj[key];
                    tr.appendChild(td);
                }
                helpTable.appendChild(tr)
            }

        });
    firstinput.style.display = 'block';
    submit.style.display = "block";
    let submitClone = submit.cloneNode(true);
    submitClone = submit.parentNode.insertBefore(submitClone, submit);
    submit.style.display = 'none';
    clones.push(submitClone);
    submitClone.addEventListener('click', () => {
        if (!firstinput.value) {
            alert('некоректні дані');
        } else {
            fetch('http://localhost:3000/matchMvp/' + firstinput.value)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data[0]);
                    while (table.firstChild) {
                        table.removeChild(table.firstChild)
                    }
                    if (!data[0][0]) {
                        table.innerHTML = "немає статистики за даний матч";
                    } else {
                        let tr1 = document.createElement('tr');
                        let td0 = document.createElement('td');
                        td0.innerHTML = 'Прізвище';
                        tr1.appendChild(td0);
                        let td1 = document.createElement('td');
                        td1.innerHTML = 'Ефективність';
                        tr1.appendChild(td1);
                        table.appendChild(tr1)
                        for (let obj of data[0]) {
                            let tr = document.createElement('tr');
                            for (let key in obj) {
                                let td = document.createElement('td');
                                td.innerHTML = obj[key];
                                tr.appendChild(td);
                            }
                            table.appendChild(tr);
                        };
                    }
                })
        }

    })

})


let MVPofperiodBtn = document.getElementById('MVPofperiod');

MVPofperiodBtn.addEventListener('click', () => {
    while(table.firstChild){
        table.removeChild(table.firstChild)
    }
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == MVPofperiodBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }

    });
    let dateString = new Date().getFullYear();
    dateString += '-';
    if (String(new Date().getMonth() + 1).length > 1) {
        dateString += (new Date().getMonth() + 1);
        dateString += '-';
    } else {
        dateString += '0';
        dateString += (new Date().getMonth() + 1);
        dateString += '-';
    }
    if (String(new Date().getDate()).length > 1) {
        dateString += (new Date().getDate());
    } else {
        dateString += '0';
        dateString += (new Date().getDate());
    }
    secondinput.value = dateString;
    secondinput.max = dateString;
    thirdInput.value = dateString;
    thirdInput.max = dateString;


    secondinput.style.display = 'block';
    thirdInput.style.display = 'block';
    submit.style.display = "block";
    let submitClone = submit.cloneNode(true);
    submitClone = submit.parentNode.insertBefore(submitClone, submit);
    submit.style.display = 'none';
    clones.push(submitClone);


    submitClone.addEventListener('click', () => {
        if (secondinput.value && thirdInput.value) {
            fetch('http://localhost:3000/periodMvp/' + secondinput.value + '/' + thirdInput.value)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data[0]);
                    while (table.firstChild) {
                        table.removeChild(table.firstChild)
                    }
                    if (!data[0][0]) {
                        table.innerHTML = "немає статистики за даний матч";
                    } else {
                        let tr1 = document.createElement('tr');
                        let td0 = document.createElement('td');
                        td0.innerHTML = 'Прізвище';
                        tr1.appendChild(td0);
                        let td1 = document.createElement('td');
                        td1.innerHTML = 'Ефективність';
                        tr1.appendChild(td1);
                        table.appendChild(tr1)
                        for (let obj of data[0]) {
                            let tr = document.createElement('tr');
                            for (let key in obj) {
                                let td = document.createElement('td');
                                td.innerHTML = obj[key];
                                tr.appendChild(td);
                            }
                            table.appendChild(tr);
                        };
                    }
                })

        }
    })
})

let statOfplayersWithAmpluaBtn = document.getElementById('statOfplayersWithAmplua');



statOfplayersWithAmpluaBtn.addEventListener('click', () => {
    clearInputs();
    for (let clone of clones) {
        clone.remove();
    }
    btns.forEach(element => {
        if (element.id == statOfplayersWithAmpluaBtn.id) {
            element.disabled = 'disabled'
        } else {
            element.disabled = ''

        }
    });

    fetch('http://localhost:3000/ampluaname')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            (() => {
                while (table.firstChild) {
                    table.removeChild(table.firstChild)
                }
                while (helpTable.firstChild) {
                    helpTable.removeChild(helpTable.firstChild)
                }
                let tr = document.createElement('tr');
                let td = document.createElement('td');
                td.innerHTML = 'ID амплуа';
                tr.appendChild(td);
                let td1 = document.createElement('td');
                td1.innerHTML = 'Назва аплуа';
                tr.appendChild(td1);

                helpTable.appendChild(tr);
            })()
            for (let obj of data) {
                let tr = document.createElement("tr");
                for (let key in obj) {
                    let td = document.createElement('td');
                    td.innerHTML = obj[key];
                    tr.appendChild(td);
                }
                helpTable.appendChild(tr)
            }

        });

    firstinput.style.display = 'block';
    submit.style.display = "block";
    firstinput.placeholder = 'введіть id амплуа'
    let submitClone = submit.cloneNode(true);
    submitClone = submit.parentNode.insertBefore(submitClone, submit);
    submit.style.display = 'none';
    clones.push(submitClone);

    submitClone.addEventListener('click', () => {
        if (!firstinput.value) {
            alert('некоректні дані');
        } else {
            fetch('http://localhost:3000/statwithampluaid/' + firstinput.value)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data[0]);
                    while (table.firstChild) {
                        table.removeChild(table.firstChild)
                    }
                    if (!data[0][0]) {
                        table.innerHTML = "немає статистика за таким амплуа";
                    } else {
                        let tr1 = document.createElement('tr');
                        let td0 = document.createElement('td');
                        td0.innerHTML = 'Прізвище';
                        tr1.appendChild(td0);
                        let td1 = document.createElement('td');
                        td1.innerHTML = 'Підбори';
                        tr1.appendChild(td1);
                        let td2 = document.createElement('td');
                        td2.innerHTML = 'Забив';
                        tr1.appendChild(td2);
                        let td3 = document.createElement('td');
                        td3.innerHTML = 'Втрат';
                        tr1.appendChild(td3);
                        table.appendChild(tr1)
                        for (let obj of data[0]) {
                            let tr = document.createElement('tr');
                            for (let key in obj) {
                                let td = document.createElement('td');
                                td.innerHTML = obj[key];
                                tr.appendChild(td);
                            }
                            table.appendChild(tr);
                        };
                    }
                })
        }

    })
})