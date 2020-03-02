import { html } from "lit-element/lit-element";
import { UxlVirtualizer } from './uxl-virtualizer';
import { repeat } from "lit-html/directives/repeat";

export const template = (props: UxlVirtualizer) => html `
  <div id="uxl-virtualizer" length ="${props?.displayedItems?.length || 0}">
    ${repeat(props.displayedItems,  props.renderItem)}
  </div>
`