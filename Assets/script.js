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

    function createRows() {
        for (let i = 0; i < 11; i++) {
            const row = $("<div>");
            row.attr("class", "row ");
            container.append(row);
    
            const hour = $("<div>");
            hour.attr("class", "hour");
            hour.attr("id", "hour-" + i);
            let text = hourText(i);
            hour.text(text);
            row.append(hour);
    
            const description = $("<textarea>");
            description.attr("class", "future");
            description.attr("id", "description-" + i);
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
        console.log(description.val());
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



    // function rowColor() {

    // }


});



