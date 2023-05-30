/** @odoo-module **/

import { registry } from "@web/core/registry";
import { Component, useState, onWillStart, useRef } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";

class OwlTodoList extends Component {
    setup(){
        this.state = useState({
            task: {name:"",color:"#ff0000", completed:false},
            taskList:[
//                {id:1, name:"Task 1", color:"#FF0000", completed:true},
//                {id:2, name:"Task 2", color:"#000000", completed:false},
//                {id:3, name:"Task 3", color:"#FFFFFF", completed:true},
            ],
            isEdit: false,
            activeId: false
        })
        this.orm = useService("orm");
        this.model = "owl.todo.list"
        this.searchInput = useRef("search-input")

        onWillStart(async ()=>{
            await this.getAllTasks();
        })
    }

    async getAllTasks(){
        this.state.taskList = await this.orm.searchRead(this.model,[],["name", "color", "completed"])
    }

    addTask(){
        this.resetForm()
        this.state.activeId = false
        this.state.isEdit = false
    }

    editTask(task){
        console.log(task)
        this.state.task.isEdit = true;
        //        this.state.task={name:task.name, color:task.color, completed:task.completed }
        this.state.activeId = task.id
        this.state.task={...task}
    }

    async saveTask(){
        //        console.log(this.state.task)
        if (!this.state.isEdit){
            await this.orm.create(this.model,[
                //{
                //            name: this.state.task.name,
                //            color: this.state.task.color,
                //            completed: this.state.task.completed
                //}
                this.state.task
            ]);
        }else{
            await this.orm.write(this.model,[this.state.activeId],this.state.task)
        }

        await this.getAllTasks();
    }

    resetForm(){
        this.state.task = {name:"",color:"#ff0000", completed:false}
    }

    async deleteTask(task){
        await this.orm.unlink(this.model,[task.id]);
        await this.getAllTasks();
    }

    async searchTasks(){
        const text= this.searchInput.el.value
        console.log(text)
        this.state.taskList =  await this.orm.searchRead(this.model,[['name','ilike',text]],["name","color","completed"])
    }

    async toggleTask(e,task){
        // console.log(task)
        await this.orm.write(this.model,[task.id],{completed: e.target.checked})
        await this.getAllTasks()
    }

    async updateColor(e,task){
        await this.orm.write(this.model,[task.id],{color: e.target.value})
        await this.getAllTasks()
    }
}

OwlTodoList.components = {};
OwlTodoList.template = "owl.TodoList";

registry.category("actions").add("owl.action_todo_list_js", OwlTodoList);
