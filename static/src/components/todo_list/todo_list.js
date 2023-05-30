/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { registry } from "@web/core/registry";

class OwlTodoList extends Component {
    setup(){
        this.state = useState({value:1})
    }
}

OwlTodoList.components = {};
OwlTodoList.template = "owl.TodoList";

registry.category("actions").add("owl.action_todo_list_js", OwlTodoList);
