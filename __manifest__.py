{
    "name": "OWL Tutorial",
    "depends": ["base", "web"],
    "data": [
        # security
        'security/ir.model.access.csv',

        # views
        "views/todo_list.xml",
        "views/menus.xml",
        "views/res_partner.xml",
    ],
    "assets": {
        "web.assets_backend": [
            "owl/static/src/components/**/*",
        ],
        "web.assets_frontend": [],
    }
}
