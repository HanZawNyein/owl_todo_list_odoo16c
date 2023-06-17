 /** @odoo-module **/

import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
import { ConfirmationDialog } from "@web/core/confirmation_dialog/confirmation_dialog";

const { Component, useSubEnv, useState } = owl;

 export class OwlOdooServices extends Component {
    setup(){
        console.log("Owl services");

        this.display = {
            controlPanel: {
             "top-right": false,
             "bottom-right": false
            }
        }

        useSubEnv({
            config: {
                ...getDefaultConfig(),
                ...this.env.config
            }
        })
//        this.notification = useService("notification");
        this.cookieService = useService("cookie")
        console.log(this.cookieService)

        if (this.cookieService.current.dark_theme == undefined){
            this.cookieService.setCookie("dark_theme", false)
        }

        this.state = useState({
            dark_theme: this.cookieService.current.dark_theme,
            get_http_data: [],
            post_http_data: [],
        })
    }

    showNotification(){
        console.log("show noti");
//        console.log(this.notification)
//        const noti = this.notification
        const notification = this.env.services.notification
        notification.add("This is sample notification.",{
            title: "Odoo Notification Services",
            type:  "info",
            sticky: true,
            className: "p-4",
            buttons: [
                {
                    name: "Notification Action",
                    onClick: ()=>{
                        console.log("Hello")
                    },
                    primary: true
                },
                {
                    name: "Show me again",
                    onClick: ()=>{
                        this.showNotification()
                    },
                    primary: false
                }
            ]
        })
    }

    showDialog(){
        const dialog = this.env.services.dialog
        dialog.add(ConfirmationDialog, {
            title: "Dialog Service",
            body: "Are you want to continue this action ?",
            confirm: ()=>{
                console.log("Dialog Confirmed");
            },
            cancel: ()=>{
                console.log("Cancelled");
            }
        },
        {
            onClose: ()=>{
                console.log("Dialog is closed.")
            }
        }
        )
    }

    showEffect(){
        const effect = this.env.services.effect
        console.log("Effect Services")
        effect.add({
             type: "rainbow_man",
             message: "This is awesome odoo effect service"
        })
    }

    setCookieService(){
        if (this.cookieService.current.dark_theme == 'false'){
            this.cookieService.setCookie("dark_theme", true)
        } else {
            this.cookieService.setCookie("dark_theme", false)
        }

        this.state.dark_theme = this.cookieService.current.dark_theme

        this.cookieService.deleteCookie("test")
    }

    async getHttpService(){
        const http = this.env.services.http
        const data = await http.get("https://dummyjson.com/products")
        console.log(data)
        this.state.get_http_data = data.products
    }

    async postHttpService(){
        const http = this.env.services.http
        console.log(http)
        const data = await http.post('https://dummyjson.com/products/add', {title: 'BMW Pencil',})
        console.log(data)
        this.state.post_http_data = data
    }

    async getRPCService(){
        const rpc = this.env.services.rpc
        const data =  await rpc("/owl/rpc_service",{limit: 15})
        console.log(data)
        this.state.rpc_data = data
    }

    async getORMService(){
        const orm = this.env.services.orm
        const data = await orm.searchRead("res.partner",[],['name','email'])
        this.state.orm_data = data

    }

    getActionService(){
        const action = this.env.services.action
        action.doAction({
            type:  "ir.actions.act_window",
            name: "Action service",
            res_model: "res.partner",
            domain: [['display_name','ilike','a']],
            context: {},
            views: [
                [false, "list"],
                [false, "form"],
            ],
            view_mode: "list,form",
            target: "current "
        })
    }
 }

 OwlOdooServices.template = "owl.OdooServices";
 OwlOdooServices.components = { Layout };

 registry.category('actions').add("owl.OdooServices",OwlOdooServices);