/** @odoo-module **/

import { Component } from "@odoo/owl";
import { registry } from "@web/core/registry";

class OwlTodoList extends Component {}

OwlTodoList.components = {};
OwlTodoList.template = "owl.clientaction";

registry.category("actions").add("owl.clientaction", OwlTodoList);
