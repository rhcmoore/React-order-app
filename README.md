## React Order App (In-N-Out) 

Basic web order interface for In-N-Out burgers. Built with React and with mobile first.

Experimenting with React design patterns and responsiveness. 

<img src="./README.png" width="100%">

### Layout and Components
                            [App]

                            [Layout]

    [Toolbar]------------ [Side Drawer] ------------ [Backdrop] -------------[{props.children}]

    [DrawerToggle]                                                      [Different Pages]
                                                                         [Order Builder]
    [---------Logo--------------------]                 [Build Controls] ----------- [Item] ----------- [Modal]
    [---------Navigation Items--------]              [Controls...] [Order]   [Item ingredients...]  [{props.children}]
                                                           
