import data from './cards_existing.json' with {type: "json"};

document.addEventListener("DOMContentLoaded", (event) => {
    const add_name = $("#add-name");
    const add_info = $("#add-info");
    const add_img = $("#add-img");
    const add_category = $("#add-category");
    const add_submit = $("#add-submit");

    const search_input = $("#search-input");
    const search_submit = $("#search-submit");

    const filter_select = $("#filter-select");
    const filter_remove = $("#filter-remove");
    const filter_submit = $("filter-submit");
    const filter_container = $("#filter-conatiner");
    const filter_checkboxes = {
        "zombies" : $("#checkbox-zombies"),
        "skills" : $("#checkbox-skills"),
        "events" : $("#checkbox-events")
    };

    const cards_container = $("#cards-container");
    // const cards_existing = JSON.parse(data);
    console.log(data);
})


