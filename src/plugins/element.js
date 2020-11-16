import Vue from 'vue'
import {
  Button, Form, FormItem, Input, Message, Container, Aside, Header,
  Main, Menu, MenuItem, Submenu, Breadcrumb, BreadcrumbItem, Card,
  Table, TableColumn, Row, Switch, Tooltip, Pagination, Dialog, MessageBox, Tree, Tag, Col
} from 'element-ui'

Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Container)
Vue.use(Header)
Vue.use(Main)
Vue.use(Aside)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Card)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Row)
Vue.use(Switch)
Vue.use(Tooltip)
Vue.use(Pagination)
Vue.use(Dialog)
Vue.use(Tree)
Vue.use(Tag)
Vue.use(Col)

Vue.prototype.$message = Message

Vue.prototype.$confirm = MessageBox.confirm
