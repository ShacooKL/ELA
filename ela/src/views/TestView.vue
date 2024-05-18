<template>
<CompileInput/>
</template>
<script setup>
import CompileInput from '@/components/CompileInput.vue';
import { LexicalAnalysis } from '@/compile/token/LexicalAnalysis';
// const expression = "(TAK =F(测试) and {}, and DATE ^ UA=E(()测|试, R) or not (200> LIKE or C=D(\"This is a test\", N=50, algorithm=MMR) or T=rf\"\"\"{{{ a\"车上\"}}}and\"\"\")";
// const tokens = LexicalAnalysis.tokenize0(expression);
import { ParseTree } from '@/compile/syntax/ParseTree';
import { CompileException } from '@/compile/exception/CompileException';
import { SyntaxAnalysis } from '@/compile/syntax/SyntaxAnalysis';
const expression = "(TAK=F(测试) and {}, DATE ^ UA=E(测|试, R)) not (200> LIKE >= 10 C=D(\"This is a test\", N=50, algorithm=MMR) or T=rf\"\"\"{{{ a\"车上\"}}}and\"\"\")";
// const expression = "A and B C and D";
// const expression = "Exp(Y) ^ C =D (This is a test, N=50, algorithm= MMR)";
// try {
//     const tokens = LexicalAnalysis.tokenize0(expression);
//     let parseTree = new ParseTree(tokens);
//     parseTree = SyntaxAnalysis.parse(parseTree);
//     console.log(parseTree.toString())


// } catch (e) {

//     console.log(expression);
//     const arrow = " ".repeat(e.index) + "^".repeat(e.length);
//     console.log(arrow);
//     console.log(`${e.level}: ${e.message}`);
//     console.error(e);
// }

</script>
