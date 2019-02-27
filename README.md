This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).


### Layout and Components
                            [App]

                            [Layout]

    [Toolbar]------------ [Side Drawer] ------------ [Backdrop] -------------[{props.children}]

    [DrawerToggle]                                                      [Different Pages]
                                                                         [Order Builder]
    [---------Logo--------------------]                 [Build Controls] ----------- [Item] ----------- [Modal]
    [---------Navigation Items--------]              [Controls...] [Order]   [Item ingredients...]  [{props.children}]
                                                           
### State: 
    Items:
    * Boots
    * Skis
    * Poles
    * Helmet

    Purchased:
    * boolean

    Total Price:
    * $$$

    Managed in stateful Order Builder component