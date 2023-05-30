from odoo import api, fields, models 


class OwlTodo(models.Model):
    _name = 'owl.todo.list'
    _description = 'Owl Todo List'

    name = fields.Char(string="Task Name")
    completed = fields.Boolean()
    color = fields.Integer()
    
