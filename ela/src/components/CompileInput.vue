<template>
    <div
      contenteditable="true"
      @input="onInput"
      @compositionstart ="start"
      @compositionend = "end"
      ref="editable"
      class="editable input"
    >
    </div>
</template>

<script setup>
import { LexicalAnalysis } from '@/compile/token/LexicalAnalysis';
import { ParseTree } from '@/compile/syntax/ParseTree';
import { SyntaxAnalysis } from '@/compile/syntax/SyntaxAnalysis';
import { ref,watch} from 'vue';

const model = ref("(TAK=F(测试) and {}, DATE ^ UA=E(测|试, R)) not (200> LIKE >= 10 C=D(\"This is a test\", N=50, algorithm=MMR) or T=rf\"\"\"{{{ a\"车上\"}}}and\"\"\")");
const tokens = ref([]);


const editable = ref(null);
const divHeight = ref('20px')
const text = defineModel()
const searching = defineModel('searching')
const errInfo =  defineModel('errInfo')
const searchContent = defineModel('searchContent')

watch(searching,(newValue)=>{
  if(newValue){
    analyse();
    searching.value=false;
  }
})
//根据词法分析结果控制输入单词显示格式
function tokenStyle(token) {
let style = ''
if (token.type === "DIGIT") {
  style = "style='color:#e4f8bf'"
} else if (token.type === "FUNCTION") {
  style = "style='color:yellow'"
} else if (token.type === "ARGUMENT") {
  style = "style='color:#22b13c'"
} else if (token.type === "LEFT_BRACE" || token.type === "RIGHT_BRACE") {
  style = "style='color:#fffb00'"
} else if (token.type === "CONSTANT") {
  style = "style='color:#b87b1f'"
} else if (token.type === "FIELD") {
  style = "style='color:#007fe0'"
} else if (token.type === "TRANSFOM") {
  style = "style='color:#3ec5ff'"
} else {

}
return "<span id='token"+token.index+"'"+style+">"+token.value+"</span>"
}

//处理中文输入重复触发input
let flag = false
const start=(()=>{
  flag =true
})
const end=(()=>{
  flag = false
})
const inputFocus=(()=>{
  divHeight.value = '200px'
})
const inputFocusOut=(()=>{
  divHeight.value = '20px'
})




//获取输入前光标在文本中的位置
function getCaretPosition() {
  const selection = window.getSelection();
  if (!selection.rangeCount) return 0;

  const range = selection.getRangeAt(0);
  let start = 0;

  //若不选择文字 range起止位置相同 即光标位置
  const preCaretRange = range.cloneRange();
  preCaretRange.selectNodeContents(editable.value);
  preCaretRange.setEnd(range.startContainer, range.startOffset);
  start = preCaretRange.toString().length;
  return start;
}

//监听输入
function onInput(event){
  //避免重复触发input
  if(flag)
    return
  //当前光标在文本中位置
  let pos = getCaretPosition()
  text.value = editable.value.innerText

  const element = document.getElementById('arrowSpan');
  if (element) {
    element.remove();
  }

  //词法分析获取tokens
  tokens.value = LexicalAnalysis.tokenize0(editable.value.innerText);
  //按token类别显示
  let html = ''
  for(const token of tokens.value){
    html+=tokenStyle(token)
  }
  editable.value.innerHTML = html;
  //恢复光标位置
  setCursorPosition(editable.value,pos)
}

const setCursorPosition = (div, position) => {
  const range = document.createRange(); 
  const sel = window.getSelection();
  let count = 0;

  // 遍历子元素，找到目标位置的节点和偏移量
  const traverseNodes = (node) => {
    if (node.nodeType == Node.TEXT_NODE) {
      if (node.textContent && count + node.textContent.length >= position) {
        range.setStart(node, position - count);
        range.collapse(false);
        sel.removeAllRanges();
        sel.addRange(range);
        return true;
      } else {
        count += node.textContent.length;
      }
    } else {
      for (let i = 0; i < node.childNodes.length; i++) {
        if (traverseNodes(node.childNodes[i])) {
          return true;
        }
      }
    }
    return false;
  };

  traverseNodes(div);
};

//添加错误箭头指示出错位置
function addCaret(index) {
  const targetSpan = document.querySelector('#token' + index);

  if (targetSpan ) {
    console.log("index is " + index);
    const textContent = targetSpan.textContent;

    // 创建^元素
    const caret = document.createElement('span');
    caret.id = 'arrowSpan'
    caret.textContent = "^".repeat(textContent.length);
    caret.style.position = 'absolute';
    caret.style.color = 'red'; // 设置箭头颜色为红色
    caret.style.zIndex = 99999;


    // 获取元素的位置信息相对于父容器
    const targetSpanRect = targetSpan.getBoundingClientRect();
    const editableRect = editable.value.getBoundingClientRect();
    
    // 计算相对位置
    const topPosition = targetSpan.offsetTop + targetSpan.offsetHeight;
    const leftPosition = targetSpan.offsetLeft;

    caret.style.top = topPosition-8 + 'px'; // 与targetSpan的<span>底部对齐
    caret.style.left = leftPosition + 'px'; // 与targetSpan的<span>左侧对齐

    // 将^元素添加到editable容器中
    editable.value.appendChild(caret);
  }
}




//语法分析
async function analyse() {

  errInfo.value = "";
  let parseTree=null;
  try {
     parseTree = SyntaxAnalysis.parse(new ParseTree(tokens.value));
   
  } catch (e) {
    errInfo.value = e.message;
    const arrow = " ".repeat(e.index) + "^".repeat(e.length);
    console.log(arrow);
    console.log(`${e.level}: ${e.message}`);
    console.error(e);
    addCaret(e.index);
  }finally{
    if( errInfo.value==""&&parseTree!=null){
      searchContent.value = parseTree
    }
  }
}

</script>

<style scoped>
#arrow{
  font-size: 2px;
  font-weight: bolder;
}

.error{
  margin: 10px;
}
/* 修改滚动条的宽度、颜色等样式 */
::-webkit-scrollbar {
  width: 10px; /* 设置滚动条宽度 */
}

/* 修改滚动条的轨道背景颜色 */
::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}

/* 修改滚动条的滑块颜色 */
::-webkit-scrollbar-thumb {
  background-color: #888;
}

/* 鼠标悬停在滚动条上时滑块的颜色 */
::-webkit-scrollbar-thumb:hover {
  background-color: #555;
}
button{
  width: 70px;
  height: 40px;
  border: none;
  border-radius: 10px;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;

  right: 1px;
  background-color: rgba(36, 36, 36, 0.411);
  color: azure;
  cursor: pointer;
}
button:hover{
  background-color: rgb(255, 255, 255);
  color: black;
}
</style>
