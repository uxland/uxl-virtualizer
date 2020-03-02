import {css, customElement, html, LitElement, property, query, unsafeCSS} from "lit-element";
import styles from "./styles.scss";
import {template} from "./template";
import { listen, propertiesObserver } from "@uxland/uxl-utilities";
import { TemplateResult } from "lit-html";
//@ts-ignore
@customElement("uxl-virtualizer")
export class UxlVirtualizer extends propertiesObserver(LitElement) {


	@property()
  public itemsToDisplay: number = 25;

  @property()
  public itemsToDisplayRange: number = 5;
	
	@property()
  public items: any[];

  @property()
  public runWayPercent: number = 15;

  @property()
  public renderItem: (item: any, index?: number) => TemplateResult;

  @property()
  public debugMode = false;

  @property()
	public displayedItems: any[] = [];

  @property()
  private firstIndex: number = 0;

  @property()
  private endIndex: number = 0;

  @property()
  private topRunway: number = 200;

  @property()
  private bottomRunway: number = 200;

  @property()
  private lastScroll: number = 0;

  @property()
  private ccCounter: number;

  @property()
  private iqCounter: number;

  @property()
  private petitionCounter: number;

  @property()
	private reportCounter: number;
	
	@query('#uxl-virtualizer')
	private container: HTMLElement;


  firstUpdated(){
    this.setRunways();
  }

	itemsChanged(){
    this.setRunways();
		this.items.forEach((i, index) => {
			if(index < this.itemsToDisplay){
        this.appendItem(i);
      }
		});
  }
  
  @listen('scroll', '#uxl-virtualizer')
  _onScrollPatientItems(e) {
    if (this.lastScroll !== this.container.scrollTop) {
      this.logScrollProps(); // show logs if debug mode
      if (this.getScrollType() == 'down') {
        this.scrollDownAppendDOM(); // this will calculate scroll and append necessary items
        this.scrollDownDropDOM(); // this will calculate scroll and drop first necessary item
      }
      if (this.getScrollType() == 'up') {
        this.scrollUpPrependDOM(); // this will calculate scroll and prepend necessary items
        this.scrollUpDropLastDOM(); // this will calculate scroll and drop last necessary items
        if (this.container.scrollTop == 0 && this.firstIndex > 0)
          // if scrollTop is 0, whe have to move down scroll position to continue scrolling up
          this.container.scrollTop = 100;
      }

      this.lastScroll = this.container.scrollTop; // after each scroll, we set lastScroll
    }
  }

  async scrollDownAppendDOM() {
    // Check if we are on bottom runway
    if (this.container.scrollHeight - (this.container.scrollTop + this.container.clientHeight) < this.bottomRunway && this.canAppendOrPrependItem()) {
      let elementToAppend = this.getNextElementToAppend();

      if (elementToAppend) {
        this.appendItem(elementToAppend);
        this.scrollDownAppendDOM(); // repeat process
      }
    }
  }

  async scrollDownDropDOM() {
    if (this.container.scrollTop > this.topRunway && this.canDropFirstOrLastItem()) {
      this.dropItem();
      this.scrollDownDropDOM();
    }
  }

  async scrollUpPrependDOM() {
    if (this.container.scrollTop < this.topRunway && this.firstIndex > 0 && this.canAppendOrPrependItem()) {
      //Take element and prepend it
      let elementToPrepend = this.getNextElementToPrepend();
      if (elementToPrepend) {
        this.prependitem(elementToPrepend);
        this.scrollUpPrependDOM();
      }
    }
  }

  async scrollUpDropLastDOM() {
    // We have to drop last items if our div is putting away bottom Runway
    if (this.container.scrollHeight - this.container.scrollTop > this.bottomRunway && this.canDropFirstOrLastItem()) {
      this.dropLastItem();
      this.scrollUpDropLastDOM();
    }
  }

  async appendItem(element) {
    this.displayedItems.push(element);
    this.endIndex++;
  }

  async prependitem(element) {
    this.displayedItems = [element].concat(this.displayedItems);
    this.firstIndex--;
  }

  async dropItem() {
    this.displayedItems.splice(0, 1);
    this.firstIndex++;
  }

  async dropLastItem() {
    this.displayedItems.pop();
    this.endIndex--;
  }

  getNextElementToAppend() {
    let item = this.items[this.endIndex + 1];
    if (item) {
      return item;
    }
  }

  getNextElementToPrepend() {
    let item = this.items[this.firstIndex - 1];
    if (item) {
      return item;
    }
  }

  getDifferenceScroll() {
    let differenceScroll = this.lastScroll - this.container.scrollTop;
    return differenceScroll < 1 ? differenceScroll * -1 : differenceScroll;
  }

  getScrollType() {
    return this.lastScroll <= this.container.scrollTop ? 'down' : 'up';
  }

  logScrollProps() {
    if (this.debugMode) {
      console.log('last scroll: ', this.lastScroll);
      console.log('scroll type: ', this.getScrollType());
      console.log('scroll top: ', this.container.scrollTop);
      console.log('scroll height: ', this.container.scrollHeight);
      console.log('client height: ', this.container.clientHeight);
      console.log('difference scroll: ', this.getDifferenceScroll());
      console.log('first index', this.firstIndex);
      console.log('end index', this.endIndex);
      console.log('________________');
    }
  }

	canDropFirstOrLastItem() {
    return  this.displayedItems.length >= this.itemsToDisplay;
  }

  canAppendOrPrependItem() {
    return  this.displayedItems.length <= this.itemsToDisplay + this.itemsToDisplayRange || this.displayedItems.length >= this.itemsToDisplay;
  }

  getRunways(){
    let value = (this?.container?.scrollHeight * this.runWayPercent)/ 100;
    let result = Math.round(value);
    return result ;
  }

  setRunways(){
    let runWay = this.getRunways()
    if(runWay){
      this.topRunway = runWay;
      this.bottomRunway = runWay;
    }
  }

  render() {
		return html`${template(this)}`;
	}

	static get styles() {
		return css`${unsafeCSS(styles)}`;
	}

}


