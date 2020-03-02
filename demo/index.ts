import { UxlVirtualizer } from "../src/index";
import { html } from 'lit-html';


let items = [
  {id: 1, name: "item1"},
  {id: 2, name: "item2"},
  {id: 3, name: "item3"},
  {id: 4, name: "item4"},
  {id: 5, name: "item5"},
  {id: 6, name: "item6"},
  {id: 7, name: "item7"},
  {id: 8, name: "item8"},
  {id: 9, name: "item9"},
  {id: 10, name: "item10"},
  {id: 11, name: "item11"},
  {id: 12, name: "item12"},
  {id: 13, name: "item13"},
  {id: 14, name: "item14"},
  {id: 15, name: "item15"},
  {id: 16, name: "item16"},
  {id: 17, name: "item17"},
  {id: 18, name: "item18"},
  {id: 19, name: "item19"},
  {id: 20, name: "item20"},
  {id: 21, name: "item22"},
  {id: 23, name: "item23"},
  {id: 24, name: "item24"},
  {id: 25, name: "item25"},
  {id: 26, name: "item26"},
  {id: 27, name: "item27"},
  {id: 28, name: "item28"},
  {id: 29, name: "item29"},
  {id: 30, name: "item30"},
  {id: 31, name: "item31"},
  {id: 32, name: "item32"},
  {id: 33, name: "item33"},
  {id: 34, name: "item34"},
  {id: 35, name: "item35"},
  {id: 36, name: "item36"},
  {id: 37, name: "item37"},
];

const virtualizer = new UxlVirtualizer();
virtualizer.items = items;
virtualizer.renderItem = (item: any) => html `<div class="item" .id="${item.id}">${item.name}</div>`;
virtualizer.debugMode = true;
const content = document.querySelector(".content");
content.appendChild(virtualizer as any);

