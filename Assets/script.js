const date = moment().format('LL'); // Date
const currentDay = $("#currentDay");
const container = $(".container");

currentDay.text(date);
currentDay.attr("style", "font-style: italic;")

const colorArr = ["#cc2525", "#cc6225", "#cc9225", "#ccc925", "#33ce33", "#278f41", "#25a59f", "#2e5fca", "#d3d3d3"]
const currentHour = parseInt(moment().format("H"))
const schedule = getSchedule();

$(document).ready(function () {
    createRows();
});

function createRows() {
    for (let i = 8; i < 19; i++) {
        const row = $("<div>");
        row.attr("class", "row");
        container.append(row);

        const hour = $("<div>");
        hour.attr("class", "hour");
        let textHr = moment(i, "H").format("h A");  // populate each hour with 12 hour time
        hour.text(textHr);
        row.append(hour);

        let opacityClass = "past";
        let defaultColor = "default";

        if (i === currentHour) opacityClass = "present"
        if (i > currentHour) opacityClass = "future"
        const description = $("<textarea>");
        description.addClass(defaultColor);
        description.addClass(opacityClass);

        if (schedule[textHr]) {  // get data from local storage if it is there
            description.css("background-color", schedule[textHr].color)
            description.text(schedule[textHr].text)
        }
        row.append(description);

        const save = $("<div>");
        save.attr("class", "save");
        save.text("save");
        save.on("click", openColors);
        row.append(save);
    }
}

function openColors() {  
    $(this).parent().append(colorBox())
}

// create a grid of colors
function colorBox() {
    const container = $("<div>").addClass("grid")
    for (let i = 0; i < colorArr.length; i++) {
        const color = $("<div>");
        color.attr("class", "item");
        color.attr("style", "background-color: " + colorArr[i]);
        color.on("click", setColor);
        container.append(color)
    }
    return container
}

function setColor() {
    const key = $($(this).parent().parent().children()[0]).text() // gets the time
    const textarea = $($(this).parent().parent().children()[1]) // gets value of the textarea    
    
    const color = $(this).css("background-color") // set textarea background-color to chosen color
    textarea.css("background-color", color)
    
    // create row object 
    schedule[key] = {           
        text: textarea.val(),
        color: textarea.css("background-color")
    }
    
    setSchedule(schedule)
    $($(this).parent()).remove()  // removes the color grid once something is clicked
}

function getSchedule() {
    return JSON.parse(localStorage.getItem("schedule")) || {}
}
function setSchedule(val) {
    localStorage.setItem("schedule", JSON.stringify(val))
}


