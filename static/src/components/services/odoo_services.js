 /** @odoo-module **/

import { registry } from "@web/core/registry";
import { Layout } from "@web/search/layout";
import { getDefaultConfig } from "@web/views/view";
import { useService } from "@web/core/utils/hooks";
const { Component, useSubEnv } = owl;

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
 }

 OwlOdooServices.template = "owl.OdooServices";
 OwlOdooServices.components = { Layout };

 registry.category('actions').add("owl.OdooServices",OwlOdooServices);