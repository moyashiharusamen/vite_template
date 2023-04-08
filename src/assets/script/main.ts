import Toggle from "./Toggle";
import Modal from "./Modal";
import Tab from "./Tab";

document.querySelectorAll(".toggle").forEach((element: Object) => {
  new Toggle(element);
});
document.querySelectorAll(".modal").forEach((element: Object) => {
  new Modal(element);
});
document.querySelectorAll(".tab").forEach((element: Object) => {
  new Tab(element);
});
