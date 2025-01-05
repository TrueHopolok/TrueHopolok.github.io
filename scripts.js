const json_data = `
[
    {
        "name": "Helicopter event",
        "info": "The helicopter event will occur between days 6-9, and between 9 A.M-8 P.M. On the day that the helicopter event occurs, the Automated Emergency Broadcast System station (AEBR for short) will announce 'Air Activity detected.' at the end of every hourly automated broadcast (beginning at 9 A.M the day of the event) warning the player in advance of the helicopter. It is recommended that players stay inside for the entire day, as the helicopter will draw hordes towards the player if they're spotted by following them.",
        "img":  "https://static.wikia.nocookie.net/projectzomboid/images/5/53/Air_Activity_detected.PNG/revision/latest/scale-to-width-down/1000?cb=20231001193104",
        "category": "events"
    },
    {
        "name": "Looting houses",
        "info": "At the start of the survival, nessesary loot inside buildings are food, protection and weapon (mostly melee). If something good was found, just mark that on the map, to return later.", 
        "img":  "https://images.pexels.com/photos/433989/pexels-photo-433989.jpeg?cs=srgb&dl=pexels-pixabay-433989.jpg&fm=jpg",
        "category": "skills"
    },
    {
        "name": "Peace with zombies",
        "info": "No need to worry about zombies. They are very slow, so regular player's character can outpace them simply by walking.", 
        "img":  "https://i0.wp.com/digital-photography-school.com/wp-content/uploads/2021/03/horizontal-lines-photography-4-1.jpg?resize=1500%2C1000&ssl=1",
        "category": "zombies"
    } 
]
`; 

const cards_info = JSON.parse(json_data);


document.addEventListener("DOMContentLoaded", (event) => {
    const error_label = $("#error-label");

    const add_form = $("add-form");
    const add_name = $("#add-name");
    const add_info = $("#add-info");
    const add_img = $("#add-img");
    const add_category = $("#add-category");
    const add_submit = $("#add-submit");

    let search_clicked = false;
    const search_input = $("#search-input");
    const search_submit = $("#search-submit");

    const filter_select = $("#filter-select");
    const filter_remove = $("#filter-remove");
    const filter_submit = $("#filter-submit");
    const filter_container = $("#filter-conatiner");
    const filter_checkboxes = {
        "zombies" : $("#checkbox-zombies"),
        "skills" : $("#checkbox-skills"),
        "events" : $("#checkbox-events")
    };

    const cards_container = $("#cards-container");
    
    update_cards_container();
    error_label.text("Welcome to the page!");


    function update_cards_container() {
        error_label.text("INFO: page updated properly");
        cards_container.empty();
        cards_info.forEach(card => {
            let is_any_filter_applied = false; 
            Object.values(filter_checkboxes).forEach(element => {
                is_any_filter_applied |= element.prop("checked");
            });
            if (is_any_filter_applied && !(filter_checkboxes[card["category"]].prop("checked"))) {
                    return;
            }
            if (search_clicked && !(card["name"].toLowerCase().includes(search_input.prop("value").toLowerCase()) )) {
                return;
            }
            let element = create_card_element(card);
            cards_container.append(element, $("<br>"));
        });
    }


    function create_card_element(card) {
        let table = $("<table></table>");
    
        let tr1 = $("<tr></tr>");
        let th = $("<th></th>");
        th.attr("colspan", "2");
        th.text(card["name"]);
        tr1.append(th);
        table.append(tr1);
    
        let tr2 = $("<tr></tr>");
        let td1 = $("<td></td>");
        let p1 = $("<p></p>").text(card["info"]);
        td1.append(p1);
        tr2.append(td1);
        let td2 = $("<td></td>");
        let i1 = $("<img></img>")
        i1.attr("alt", "card image not provided or loaded properly");
        i1.attr("src", card["img"]);
        td2.append(i1);
        tr2.append(td2);
        table.append(tr2);
    
        let tr3 = $("<tr></tr>");
        let td3 = $("<td></td>");
        td3.attr("colspan", "2");
        let p2 = $("<p></p>").text("Category: "+card["category"]);
        td3.append(p2);
        tr3.append(td3);
        table.append(tr3);
    
        let element = $("<div class=card><table></table></div>");
        element.append(table);
        return element;
    }    


    //* FILTER BUTTONS
        filter_select.on("click", function() {
        Object.values(filter_checkboxes).forEach(element => {
            element.prop("checked", true);
        })
    });


    filter_remove.on("click", function() {
        Object.values(filter_checkboxes).forEach(element => {
            element.prop("checked", false);
        })
    });


    filter_submit.on("click", function() {
        update_cards_container();
    });


    //* SEARCH FIELD
    search_submit.on("click", function() {
        if (search_input.prop("value").length < 3) {
            error_label.text("ERROR: inputed in search field value's length is too small, must be at least 3");
            return;
        }
        search_clicked = true;
        update_cards_container();
        search_clicked = false;
        search_input.prop("value", "");
    });


    //* ADD TIP FORM
    add_submit.on("click", function() {
        if (add_name.prop("value").length < 3) {
            error_label.text("ERROR: inputed in name field value's length is too small, must be at least 3");
            return;
        }
        if (add_category.prop("value") === "") {
            error_label.text("ERROR: category is empty, must be selected in order to add a tip");
            return;
        }
        cards_info.push({
            "name": add_name.prop("value"),
            "info": add_info.prop("value"),
            "img" : add_img.prop("value"),
            "category": add_category.prop("value")
        });
        add_form.trigger("reset");
        update_cards_container();
        error_label.text("INFO: new tip was successefully added")
    })
});

