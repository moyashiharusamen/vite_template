import Toggle from './Toggle'
import Modal from './Modal'
import Tab from './Tab'

document.querySelectorAll('.toggle').forEach((element: Element) => {
  new Toggle(element)
})
document.querySelectorAll('.modal').forEach((element: Element) => {
  new Modal(element)
})
document.querySelectorAll('.tab').forEach((element: Element) => {
  new Tab(element)
})
