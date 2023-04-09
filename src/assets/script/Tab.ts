/** ============================================================
 *  @fileoverview タブパネルを制御するJS
 *  ============================================================ */

/**
 * @class Tab
 */

export default class Tab {
  /**
   * @property {string} ブロック名
   */
  static baseName: string = 'tab'

  baseName: string
  base: HTMLElement
  buttonWrap: HTMLElement
  buttons: NodeList
  bodies: NodeList
  /**
   * インスタンスを生成
   * @param {Element} element 基底要素ノード、またはそれを探すための文字列
   * @param {string} rootName 設定したいブロック名
   */
  constructor(element: Element, rootName: string = Tab.baseName) {
    const baseName = (this.baseName = rootName)

    /**
     * @type {HTMLElement} 基底要素ノード
     */
    const base = (this.base = element as HTMLElement)

    /**
     * @type {HTMLElement} タブを制御するボタンを内包するラッパー要素
     */
    this.buttonWrap = base.querySelector(`.${baseName}__button__wrap`) as HTMLElement

    /**
     * @type {NodeList} タブを制御するボタン要素
     */
    this.buttons = base.querySelectorAll(`.${baseName}__button`) as NodeList

    /**
     * @type {NodeList} タブボタンで表示非表示される要素
     */
    this.bodies = base.querySelectorAll(`.${baseName}__body`) as NodeList

    this.bindEvents()
    this.setAttr()
  }

  /**
   * 属性の初期設定
   * @return {Void}
   */
  setAttr(): void {
    let defaultDisplayNumber: number
    this.buttonWrap.setAttribute('role', 'tablist')
    this.bodies.forEach((body: any, i) => {
      body.setAttribute('role', 'tabpanel')
      body.setAttribute('id', `${this.baseName}_${i + 1}`)

      if (body.getAttribute('aria-hidden') === 'false') defaultDisplayNumber = i
    })
    this.buttons.forEach((button: any, i) => {
      button.setAttribute('role', 'tab')
      button.setAttribute('aria-controls', `${this.baseName}_${i + 1}`)

      if (defaultDisplayNumber === i) {
        button.setAttribute('aria-selected', 'true')
        button.setAttribute('tabindex', '0')
      } else {
        button.setAttribute('aria-selected', 'false')
        button.setAttribute('tabindex', '-1')
      }
    })
  }

  /**
   * イベントのバインド登録
   * @return {Void}
   */
  bindEvents(): void {
    this.buttons.forEach(button => {
      button.addEventListener('click', e => {
        const target: any = e.target
        if (target.getAttribute('aria-selected') === 'true') return

        this.toggle(target, false)
      })

      button.addEventListener('keydown', e => {
        this.keyCtrl(e)
      })
    })
  }

  /**
   * タブの開閉
   * @return {Void}
   */
  toggle(target: HTMLElement, inputKeyboard: boolean): void {
    const currentTargetID = target.getAttribute('aria-controls')
    const targetElement = this.base.querySelector(
      `.${this.baseName}__body[id='${currentTargetID}'`
    ) as HTMLElement

    if (targetElement.getAttribute('aria-hidden') === 'false') return

    this.buttons.forEach((button: any) => {
      button.setAttribute('aria-selected', 'false')
      button.setAttribute('tabindex', '-1')
    })
    target.setAttribute('aria-selected', 'true')
    target.setAttribute('tabindex', '0')
    this.bodies.forEach((body: any) => {
      body.setAttribute('aria-hidden', 'true')
    })
    targetElement.setAttribute('aria-hidden', 'false')

    if (inputKeyboard) target.focus()
  }

  /**
   * タブボタンをキーボードで操作したときの挙動の制御
   * @return {Void}
   */
  keyCtrl(e: any): void {
    let target
    const currentTarget = e.target

    if (e.key === 'ArrowRight' || e.key === 'Right' || e.key === 'ArrowDown' || e.key === 'Down') {
      target = currentTarget.nextElementSibling

      // 次のタブがなければ最初のタブへ
      if (target === null) target = this.buttons[0]
    } else if (e.key === 'ArrowLeft' || e.key === 'Left' || e.key === 'ArrowUp' || e.key === 'Up') {
      // 'left arrow key & up arrow key'
      target = currentTarget.previousElementSibling

      // 前のタブがなければ最後のタブへ
      if (target === null) target = this.buttons[this.buttons.length - 1]
    }

    if (
      e.key === 'ArrowLeft' ||
      e.key === 'Left' ||
      e.key === 'ArrowUp' ||
      e.key === 'Up' ||
      e.key === 'ArrowRight' ||
      e.key === 'Right' ||
      e.key === 'ArrowDown' ||
      e.key === 'Down'
    ) {
      e.preventDefault()
      this.toggle(target, true)
    }
  }
}
