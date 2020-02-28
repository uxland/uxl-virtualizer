import {css, customElement, html, LitElement, property, query, unsafeCSS} from "lit-element";
import styles from "./styles.scss";
import {template} from "./template";

@customElement("uxl-virtualizer")
export class UxlVirtualizer extends (LitElement) {


  render() {
		return html`${template(this)}`;
	}

	static get styles() {
		return css`${unsafeCSS(styles)}`;
	}

}


