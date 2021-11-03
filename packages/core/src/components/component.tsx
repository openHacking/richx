import { isElement } from '../utils/util'
/**
 * Basic component class
 */
export interface IProps {
    element?: HTMLElement | null;
}
export abstract class Component {
    private _element: HTMLElement
    constructor(props: IProps = {}) {

        // Store the HTML element to attach the render to if set
        if (props.hasOwnProperty('element') && isElement(props.element)) {
            this._element = props.element!;
        }
        else {
            this._element = this.render(props);
        }

        // Return the rendered DOM
        // return this.getElement();
    }
    // Render the component's HTML
    abstract render(props: IProps): any;
    getElement(): HTMLElement {
        return this._element
    }
    append(target: HTMLElement): HTMLElement {
        this._element?.appendChild(target);
        return this._element!;
    }

    appendTo(target: HTMLElement) {
        target.appendChild(this._element!);
        return target;
    }

}
