import { UxlVirtualizer } from "../src/index";

const virtualizer = new UxlVirtualizer();
const content = document.querySelector(".content");
content.appendChild(virtualizer as any);

