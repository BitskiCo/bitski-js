import css from '../styles/dialog';

const TEMPLATE = `
  <div class='bitski-dialog'>
      <button class='bitski-close-button'>Close</button>
      <div class='bitski-dialog-body'></div>
  </div>
`;

/**
 * Embeds Bitski's dialog styles
 */
const injectStyles = () => {
  if (document.getElementById('BitskiSDKEmbeddedStyles')) {
    return;
  }
  const style = document.createElement('style');
  style.setAttribute('type', 'text/css');
  style.setAttribute('id', 'BitskiSDKEmbeddedStyles');
  style.appendChild(document.createTextNode(css));
  const head = document.head || document.getElementsByTagName('head')[0];
  head.appendChild(style);
};

/**
 * Basic modal dialog
 */
export class Dialog {
  private content: HTMLElement;
  private container: HTMLElement;

  /**
   * Creates and displays a new dialog
   * @param content The content (HTMLElement, selector, or text) to embed in the dialog
   * @param dynamicContent Set to true to show loading state
   */
  constructor(content: HTMLElement | string, private dynamicContent = false) {
    // check for an element passed as content or a selector corresponding to an element
    this.content = this.parseContent(content);

    // Find or create dialog container
    this.container = this.createContainer();

    injectStyles();
  }

  /**
   * Show the dialog
   */
  public show(): void {
    this.container.classList.add('bitski-visible', 'bitski-loaded');
  }
  /**
   * Hides the dialog, but does not remove
   */
  public hide(): void {
    this.container.classList.remove('bitski-visible', 'bitski-loaded');
  }

  public open(): void {
    // Inject dialog content
    this.injectTemplate(this.container, this.content);

    // Show a spinner if content is dynamic
    if (this.dynamicContent) {
      this.setLoading(true);
    }

    // Add close handlers
    this.addCloseHandlers();

    // A short delay is required before triggering animations
    setTimeout(() => {
      this.show();
    }, 10);
  }

  /**
   * Dismisses the dialog without triggering the close handler.
   */
  public close(): void {
    // Allow 500ms for the animations to finish before removing elements from DOM
    setTimeout(() => {
      this.container.remove();
    }, 500);
    this.hide();
  }

  /**
   * Show or hide the loading indicator
   * @param loading Whether or not to display the spinner
   */
  public setLoading(loading: boolean): void {
    const body = document.querySelector<HTMLElement>('.bitski-dialog-body');
    if (body) {
      if (loading) {
        body.classList.add('bitski-loading');
      } else {
        body.classList.remove('bitski-loading');
      }
    }
  }

  /**
   * Determines what content to embed
   * @param content Content to parse
   */
  private parseContent(content: HTMLElement | string): HTMLElement {
    // check for an element passed as content
    if (content instanceof HTMLElement) {
      return content;
    }

    // determine if content is a selector
    if (document.querySelector(content)) {
      return document.querySelector(content) as HTMLElement;
    }

    // otherwise content is text to be appended to the dialog body
    const div = document.createElement('div');
    div.innerText = content;
    return div;
  }

  /**
   * Creates and injects the container element at the end of the body,
   * responsible for housing all the dialog-related content.
   */
  private createContainer(): HTMLElement {
    const existingContainer = document.querySelector('#bitski-dialog-container') as HTMLElement;
    if (existingContainer) {
      return existingContainer;
    }
    const container = document.createElement('div');
    container.id = 'bitski-dialog-container';
    document.body.appendChild(container);
    return container;
  }

  /**
   * Injects the provided content into the template provided
   * @param container The container element
   * @param content The content to inject in the template
   */
  private injectTemplate(container: HTMLElement, content: HTMLElement) {
    container.innerHTML = TEMPLATE;
    const body = container.querySelector('.bitski-dialog-body');
    if (body) {
      body.appendChild(content);
    }
  }

  /**
   * Adds event listeners for events that should trigger closing the dialog
   */
  private addCloseHandlers() {
    // Close on click outside of the dialog
    this.container.addEventListener('click', (event) => {
      if (event.target === this.container) {
        this.close();
      }
    });
    // Close on escape press
    document.addEventListener('keyup', (e) => {
      if (e.key === 'Escape') {
        this.close();
      }
    });
    // Close on close button click
    const closeButton = this.container.querySelector('.bitski-close-button');
    if (closeButton) {
      closeButton.addEventListener('click', this.close.bind(this));
    }
  }
}
