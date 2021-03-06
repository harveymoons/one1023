"use strict";

/* renderer */
export function imageRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    if (value) {
        Handsontable.dom.fastInnerHTML(td, `<img src="/${value}" style="width:100%; height:200%;">`);
    } else {
        Handsontable.dom.fastInnerHTML(td, `<img src="/uploads/blank_profile.png" style="width:100%; height:200%;">`);
    }
    Handsontable.renderers.cellDecorator.apply(this, arguments);
}

export function memberDetailRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const _id = _instance.getDataAtRowProp(_row, "_id");
    const link = `<a href="/member/view?id=${_id}" target="_blank">${value}</a>`;

    Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    Handsontable.dom.fastInnerHTML(td, link);
}

export function contactRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const contact1 = _instance.getDataAtRowProp(_row, "contact1");
    const contact2 = _instance.getDataAtRowProp(_row, "contact2");
    const contact3 = _instance.getDataAtRowProp(_row, "contact3");

    if (contact1 && contact2 && contact2) {
        const contact = [contact1, contact2, contact3].join("-");

        Handsontable.renderers.HtmlRenderer.apply(this, arguments);
        Handsontable.dom.fastInnerHTML(td, contact);
    }
}

export function genderRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const gender = value.toUpperCase() === "M" ? "Men" : "Women";

    Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    Handsontable.dom.fastInnerHTML(td, gender);
}

export function birthdayRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const year = value.substring(0, 4);
    const month = value.substring(4, 6);
    const day = value.substring(6, 8);

    const birthday = `${year}/${month}/${day}`;
    Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    Handsontable.dom.fastInnerHTML(td, birthday);
}

export function ageRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const year = value.substring(0, 4);

    const thisYear = new Date().getFullYear();
    const age = thisYear - Number(year) + 1;

    Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    Handsontable.dom.fastInnerHTML(td, age);
}

// get [id] and [name] information
export function identityRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    if (value) {
        const _id = _instance.getDataAtRowProp(_row, "_id");
        const link = `<a href="#" data-id="${_id}" name="name">${value}</a>`;

        Handsontable.renderers.HtmlRenderer.apply(this, arguments);
        Handsontable.dom.fastInnerHTML(td, link);
    }
}

export function relateRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const _id = _instance.getDataAtRowProp(_row, "_id");
    const button = `<button type="button" class="btn btn-outline-secondary" data-id="${_id}" >Add</button>`;

    Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    Handsontable.dom.fastInnerHTML(td, button);
}

export function editRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const _id = _instance.getDataAtRowProp(_row, "_id");
    const button = `<button type="button" class="btn btn-outline-secondary" data-id="${_id}" >Edit</button>`;

    Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    Handsontable.dom.fastInnerHTML(td, button);
}

export function deleteRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const _id = _instance.getDataAtRowProp(_row, "_id");
    const button = `<button type="button" class="btn btn-outline-warning" data-id="${_id}" >Delete</button>`;

    Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    Handsontable.dom.fastInnerHTML(td, button);
}

export function conditionRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const valid = value === "01" ? "Use" : "Unused";

    Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    Handsontable.dom.fastInnerHTML(td, valid);
}

export function familyGroupRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    // when each cell has not any value
    // cell value will be filled random value
    // so must fill empty string value in each cell if value is empty

    // if (value.memberId) console.log(value);

    const _id = _instance.getDataAtRowProp(_row, "_id");
    const count = value && value.members ? value.members.filter(info => info !== _id).length : "";

    Handsontable.renderers.HtmlRenderer.apply(this, arguments);
    Handsontable.dom.fastInnerHTML(td, count);
}

export function flagRenderer(_instance, td, _row, _col, _prop, value, _cellProperties) {
    const flag = `<img src="https://www.countryflags.io/${value}/flat/64.png" style="width:100%">`;
    Handsontable.dom.fastInnerHTML(td, flag);
}

// set handsonTable properties
export function defaultSettings(data, paginator, containerTop, colHeaders, columns) {
    return {
        data: data,
        columns: columns,
        colHeaders: colHeaders,
        columnHeaderHeight: 30,
        rowHeights: 30,
        readOnly: true,
        stretchH: "all",
        className: "htCenter htMiddle",
        licenseKey: "non-commercial-and-evaluation",
        afterGetRowHeader: function (col, TH) {
            TH.className = "htMiddle";
        },
        afterGetColHeader: function (col, TH) {
            TH.className = "htMiddle";
        },
        rowHeaders: function (index) {
            return getPageInfo(paginator) + (index + 1);
        },
        height: function () {
            // handsonTable doesn't provide max-height property
            // therefore must define fixed pixcel at height property
            // but there is a problem
            // pagination area is always placed after fixed height
            // so we should set height property dynamically to suit each case

            // set browser max-height without scrolling
            const pagingHeight = 75;
            const maxHeight = window.innerHeight - containerTop - pagingHeight;

            const totalCount = Number(paginator.totalCount);
            const currentPage = Number(paginator.currentPage);
            const pageSize = Number(paginator.pageSize);

            const currentPageRows = currentPage * pageSize;
            // set current rows size
            const currentRowsCount = currentPageRows < totalCount ? currentPageRows : totalCount - (currentPageRows - pageSize);
            // set total row Height => when row contains imagePath, hight is 45 nor 30
            const totalRowHeight = currentRowsCount * (data.filter(item => item.imagePath).length > 0 ? 45 : 30);
            // set table height
            const tableHeight = totalRowHeight > maxHeight ? maxHeight : "auto";

            return tableHeight;
        },
    };
}

function getPageInfo(paginator) {
    const currentPage = Number(paginator.currentPage);
    const pageSize = Number(paginator.pageSize);

    return (currentPage - 1) * pageSize;
}
