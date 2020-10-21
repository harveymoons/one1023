import * as expands from "../common.js";

window.onload = function () {
    findMemberList();
};

// get member list
function findMemberList() {
    // create member information
    fetch("/member/find", {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                new Error(response);
            }
            return response.json();
        })
        .then(data => {
            if (data) {
                setDataTable(data);
            }
        })
        .catch(error => {
            new Error(error);
        });
}

// find member list
function setDataTable(data) {
    const container = document.getElementById("dataTable");
    const hot = new Handsontable(container, expands.defaultSettings(data, makeColHeaders(), makeColumns(), 0.58));

    // hot.selectRows(0);
}

function makeColHeaders() {
    return ["Image", "Name", "Contact", "Address", "Gender", "Birthday", "Age", "Family", "Marital Status", "Faith State"];
}

function makeColumns() {
    return [
        { data: "imagePath", renderer: expands.imageRenderer },
        { data: "name", renderer: expands.memberDetailRenderer },
        { data: "contact", renderer: expands.contactRenderer },
        { data: "address1" },
        { data: "gender", renderer: expands.genderRenderer },
        { data: "birthday", renderer: expands.birthdayRenderer },
        { data: "birthday", renderer: expands.ageRenderer },
        { data: "family" },
        { data: "married" },
        { data: "faithState" },
    ];
}
