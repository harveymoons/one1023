import * as expands from "../modules/handsonTable.js";
import { Pagination } from "../modules/pagination.js";
import { SearchParam } from "../modules/searchParam.js";

window.addEventListener("DOMContentLoaded", e => {
    findMemberList();
    countMemberList();
});

const pagination = new Pagination();

// get count of member list
function countMemberList() {
    // set parameter
    const url = new SearchParam(pagination.currentPage, 1);

    // create member information
    fetch("/member/count" + url.params.search, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                console.error(response);
            }
            return response.json();
        })
        .then(paginator => {
            document.getElementById("totalCount").textContent = paginator.totalCount;
            pagination.setPagination(paginator).setEvent(searchMember);
        })
        .catch(error => {
            new Error(error);
        });
}

// get member list
function findMemberList() {
    // set parameter
    const url = new SearchParam(pagination.currentPage, 1);

    // create member information
    fetch("/member/find" + url.params.search, {
        method: "GET",
    })
        .then(response => {
            if (!response.ok) {
                console.error(response);
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
    new Handsontable(container, expands.defaultSettings(data, makeColHeaders(), makeColumns(), 0.58));
}

// make colHeaders
function makeColHeaders() {
    return ["Image", "Name", "Contact", "Address", "Gender", "Birthday", "Age", "Family", "Marital Status", "Faith State"];
}

// make columns
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

function searchMember(e) {
    pagination.currentPage = e.target.id;
    findMemberList();
    countMemberList();
}
