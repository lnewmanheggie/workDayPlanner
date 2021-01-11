const time = moment().format('LT'); // time
const date = moment().format('LL'); // Date
const currentDay = $("#currentDay");
const container = $(".container");

const parsedTime = time[0] + " " + time.slice(5);

currentDay.text(date);
currentDay.attr("style", "font-style: italic;")

let amHour = 7;
let noon = 12;
let pmHour = 0;

$(document).ready(function() {
    createRows();
});

function createRows() {
    for (let i = 0; i < 11; i++) {
        const row = $("<div>");
        row.attr("class", "row");
        row.attr("id", "row-" + i);
        container.append(row);

        const hour = $("<div>");
        hour.attr("class", "hour");
        hour.attr("id", "hour-" + i);
        let textHr = hourText(i);
        hour.text(textHr);
        row.append(hour);

        const description = $("<textarea>");

        let color = rowColor(textHr);
        description.attr("class", color);
        description.attr("id", "description-" + i);
        let savedText = getText();
        for (let j = 0; j < savedText.length; j++) {
            if (savedText[j].row == i) {
                let desc = savedText[j].text;
                description.text(desc);
            } 
        }
        row.append(description);

        const save = $("<div>");
        save.attr("class", "save");
        save.attr("id", i);
        save.text("save");
        save.on("click", saveDescription);
        row.append(save);

    }
}

function saveDescription() {
    let id = $(this).attr("id");
    let description = $("#description-" + id);

    const text = {
        row: id,
        text: description.val()
    }

    let savedText = getText();

    let seen = 0;

    if (savedText.length === 0) {
        savedText.push(text);
    } else {
        for (let i = 0; i < savedText.length; i++) {
            if (savedText[i].row === id) {
                savedText[i].text = description.val();
                seen++;
            } 
        }
    }

    if (seen === 0) {
        savedText.push(text);
    }

    setText(savedText);

    let rowDiv = $("#row-" + id); // get the specific row to append color picker

    changeColor(description, rowDiv) 

    function changeColor(description, rowDiv) {
        const grid = $("<div>");
        grid.attr("class", "grid")
    
        const colorArr = ["#cc2525", "#cc6225", "#cc9225", "#ccc925", "#33ce33", "#278f41", "#25a59f", "#2e5fca", "#be33b3"]

        for (let i = 0; i < colorArr.length; i++) {
            const color = $("<div>");
            color.attr("class", "item");
            color.attr("style", "background-color: " + colorArr[i]);
            color.on("click", setColor);
            grid.append(color)
        }

        rowDiv.append(grid);

        description.attr("style", "width: 63.9%");

        function setColor() {
            let thisStyle = $(this).attr("style");
            description.attr("style", thisStyle);
            grid.remove();

            const colors = {
                row: id,
                color: thisStyle
            }

            let savedColors = getColors();

            let seen = 0;

            if (savedColors.length === 0) {
                savedColors.push(colors);
            } else {
                for (let i = 0; i < savedColors.length; i++) {
                    if (savedColors[i].row === id) {
                        savedColors[i].color = thisStyle;
                        seen++;
                    } 
                }
            }
        
            if (seen === 0) {
                savedColors.push(colors);
            }
        
            rememberColor(savedColors);

        }
    }
}

function rememberColor(values) {
    localStorage.setItem("rememberColors", JSON.stringify(values));
}

function getColors() {
    return JSON.parse(localStorage.getItem("rememberColors")) || [];
}


function setText(values) {
    localStorage.setItem("savedText", JSON.stringify(values));
}

function getText() {
    return JSON.parse(localStorage.getItem("savedText")) || [];
}

function hourText(i) {
    if (i < 4) {
        amHour++
        return amHour + " AM";
    } else if(i === 4) {
        return noon + " PM";
    } else {
        pmHour++;
        return  pmHour + " PM";
    }
}

let seenTime = 0;
function rowColor(textHr) {
    if (seenTime === 0 && textHr != parsedTime) {
        return "past";
    } else if (textHr == parsedTime) {
        seenTime++;
        return "present";
    } else {
        return "future";
    }
}






