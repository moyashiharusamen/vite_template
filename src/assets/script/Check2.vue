<template>
  <div class="root">
    <transition name="slide">
      <div class="body">
        <div
          class="question"
          v-if="!isResultDisplay"
        >
          <div
            class="num"
            :key="currentQuestionId"
          >
            <p>
              Q<span>{{ currentQuestion.id }}</span>
            </p>
          </div>

          <div class="title">
            <p>{{ currentQuestion.title }}</p>
          </div>

          <div
            class="choice"
            v-for="(item, i) in currentQuestion.choice"
            :key="item"
          >
            <button
              type="button"
              aria-checked="false"
              role="radio"
              :data-button-id="i"
              @click="handleClickChoiceButton($event)"
            >
              {{ item }}
            </button>
          </div>

          <div class="controller">
            <button
              type="button"
              class="back"
              :disabled="disabledBackButton"
              :aria-disabled="disabledBackButton"
              @click="handleClickBackButton"
            >
              戻る
            </button>

            <button
              type="button"
              class="next"
              :disabled="disabledNextButton"
              :aria-disabled="disabledNextButton"
              @click="handleClickNextButton"
            >
              次へ
            </button>

            <span class="progress">{{ currentQuestionId + 1 }}/{{ q.length }}</span>
          </div>

          <div
            class="toResult"
            v-if="isAllAnswered && isLastQuestion()"
          >
            <button
              type="button"
              @click="handleClickToResultButton"
            >
              結果を表示する
            </button>
          </div>
        </div>

        <div
          class="answer"
          v-else
        >
          <div
            v-for="item in answers"
            :key="item"
          >
            <p><span>id</span>{{ item.id }}</p>
            <p><span>title</span>{{ item.title }}</p>
            <p><span>answer</span>{{ item.answer }}</p>
          </div>

          <div class="return">
            <button
              type="button"
              @click="returnCheck"
            >
              もう一度チェックする
            </button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import questions from './questions'

// -------------------- Data --------------------
/**
 * @type {Object[]} 設問群
 */
const q = reactive(questions)
/**
 * @type {boolean} 結果を表示するなら true
 */
const isResultDisplay = ref(false)
/**
 * @type {boolean} 全ての設問に回答していれば true
 */
const isAllAnswered = ref(false)
/**
 * @type {number} 現在の表示する設問の数
 */
const currentQuestionId = ref(0)
/**
 * @type {Object[]} 回答群
 */
let answers: any = reactive([])
/**
 * @type {number} 設問の最後の ID
 */
const lastQustionId = q.length - 1
/**
 * @type {boolean} 前へボタンを非活性にしたいときに true にする
 */
const disabledBackButton = ref(true)
/**
 * @type {boolean} 次へボタンを非活性にしたいときに true にする
 */
const disabledNextButton = ref(true)
/**
 * @type {Object} 現在表示されるべき設問
 */
const currentQuestion = computed(() => q[currentQuestionId.value])
/**
 * currentQuestionID が最初の設問を示している場合 true が返る
 * @return {boolean}
 */
const isFirstQuestion = () => currentQuestionId.value === 0
/**
 * currentQuestionID が最後の設問を示している場合 true が返る
 * @return {boolean}
 */
const isLastQuestion = () => lastQustionId === currentQuestionId.value

// -------------------- Methods --------------------
/**
 * currentQuestionID の値をインクリメントする
 * @return {Void}
 */
const incrementCurrentQuestionId = () => {
  if (isLastQuestion()) return
  currentQuestionId.value++
}
/**
 * currentQuestionID の値をデクリメントする
 * @return {Void}
 */
const decrementCurrentQuestionId = () => {
  if (isFirstQuestion()) return
  currentQuestionId.value--
}
/**
 * 前へ次へボタンを活性にするかどうかのチェックを行う
 * 最初の設問を表示しているとき、または表示されているより前の設問に回答済みの場合は、前へボタンを非活性にする
 * 最後の設問を表示しているとき、または表示されているより後の設問に回答済みの場合は、次へボタンを非活性にする
 * @return {Void}
 */
const checkPaginationButton = () => {
  disabledBackButton.value = isFirstQuestion() || !answers[currentQuestionId.value - 1]
  disabledNextButton.value = isLastQuestion() || !answers[currentQuestionId.value + 1]
}
/**
 * 回答をデータとして保存する
 * @param {Object} e $event
 * @return {Void}
 */
const saveAnswer = (e: any) => {
  const id = currentQuestionId.value + 1
  const dataButtonId = e.target.dataset.buttonId
  const title = currentQuestion.value.title
  const answer = currentQuestion.value.choice[dataButtonId]
  const content = { id: id, title: title, answer: answer }

  answers[currentQuestionId.value] = content
}
/**
 * チェックに戻る
 * @return {Void}
 */
const returnCheck = () => {
  answers = []
  currentQuestionId.value = 0
  isResultDisplay.value = false
  isAllAnswered.value = false
  checkPaginationButton()
}

// -------------------- イベント時に実行されるメソッド --------------------
/**
 * 選択肢ボタンを押したときに実行する
 * @param {Object} e $event
 * @return {Void}
 */
const handleClickChoiceButton = (e: any) => {
  saveAnswer(e)
  incrementCurrentQuestionId()
  checkPaginationButton()

  if (q.length === answers.length) isAllAnswered.value = true
}
/**
 * 前へボタンを押したとき
 * @return {Void}
 */
const handleClickBackButton = () => {
  decrementCurrentQuestionId()
  checkPaginationButton()
}
/**
 * 次へボタンを押したとき
 * @return {Void}
 */
const handleClickNextButton = () => {
  incrementCurrentQuestionId()
  checkPaginationButton()
}
/**
 * 結果を表示するボタンを押したとき
 * @return {Void}
 */
const handleClickToResultButton = () => {
  isResultDisplay.value = !isResultDisplay.value
}
</script>

<style lang="scss" scoped>
@use "../style/global" as g;

// ---------- ブロックの基底要素 ----------
// .root {}
.body {
  @include g.centering();
}

// ---------- 設問要素 ----------
.question {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: g.rem(10px);
  max-width: g.rem(500px);
  margin-inline: auto;
  padding: g.rem(20px);
  border: g.rem(1px) solid g.$base-color;
  border-radius: 10px;
}

.choice {
  display: flex;
  align-items: center;
  gap: g.rem(20px);
}

// ---------- 結果要素 ----------
.result {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: g.rem(10px);
  max-width: g.rem(500px);
  margin-inline: auto;
}

.result__inner {
  @include g.centering();
}

// ---------- コントローラー要素 ----------
.controller {
  display: flex;
  align-items: center;
  gap: g.rem(20px);
}
.controller > button {
  transition: 0.2s opacity ease;
}
.controller > button[aria-disabled='true'] {
  opacity: 0;
}

.controller > .back {
  order: 1;
}
.controller > .next {
  order: 3;
}

.controller > .progress {
  order: 2;
}
</style>
