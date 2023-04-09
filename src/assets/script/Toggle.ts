/** ============================================================
 *  @fileoverview トグルを制御するJS
 *  ============================================================ */

import { v4 as uuidv4 } from 'uuid'

/**
 * @class Toggle
 */
export default class Toggle {
  /**
   * @property {string} BEM ブロック名
   */
  static baseName: string = 'toggle'

  base: HTMLElement
  body: HTMLElement
  button: HTMLElement
  buttonMark: HTMLElement
  uniquId: string

  /**
   * インスタンスを生成
   * @param {Element} element 基底要素ノード、またはそれを探すための文字列
   * @param {string} rootName 設定したいブロック名
   */
  constructor(element: Element, rootName: string = Toggle.baseName) {
    const name = rootName

    /**
     * @type {HTMLElement} 基底要素ノード
     */
    const base = (this.base = element as HTMLElement)

    /**
     * @type {HTMLElement} トグルの開閉される本体要素
     */
    this.body = base.querySelector(`.${name}__body`) as HTMLElement

    /**
     * @type {HTMLElement} トグルの開閉を制御するボタン要素
     */
    this.button = base.querySelector(`.${name}__button`) as HTMLElement

    /**
     * @type {HTMLElement} ボタン内にあるマーク部分要素
     */
    this.buttonMark = base.querySelector(`.${name}__button__mark`) as HTMLElement

    /**
     * @type {string} ユニークな識別子
     */
    this.uniquId = `${name}__${uuidv4()}`

    this.bindEvents()
    this.setAttr()
  }

  /**
   * 属性の初期設定
   * @return {Void}
   */
  setAttr(): void {
    this.button.setAttribute('aria-expanded', 'false')
    this.button.setAttribute('aria-controls', this.uniquId)
    this.body.setAttribute('id', this.uniquId)
  }

  /**
   * イベントのバインド登録
   * @return {Void}
   */
  bindEvents(): void {
    this.button.addEventListener('click', e => {
      e.preventDefault()
      this.toggle()
    })
  }

  /**
   * トグルの開閉
   * @return {Void}
   */
  toggle(): void {
    this.isOpened() ? this.close() : this.open()
  }

  /**
   * トグルを開く
   * @return {Void}
   */
  open(): void {
    this.body.setAttribute('aria-hidden', 'false')
    this.button.setAttribute('aria-expanded', 'true')
    this.buttonMark.textContent = '閉じる'
  }

  /**
   * トグルを開く
   * @return {Void}
   */
  close(): void {
    this.body.setAttribute('aria-hidden', 'true')
    this.button.setAttribute('aria-expanded', 'false')
    this.buttonMark.textContent = '開く'
  }

  /**
   * トグルが開いているかどうか
   * @returns {boolean}
   */
  isOpened(): boolean {
    return this.body.getAttribute('aria-hidden') !== 'true'
  }
}
