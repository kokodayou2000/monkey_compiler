## token 
定义了基础的语法单位
一个基础的token包含

```js
let x = 5 + 5;
// 转换成 token之后
[
    LET,
    IDENTIFER("x"),
    EQUAL_SIGN,
    INTEGER(5),
    PLUS_SIGN,
    INTEGER(5),
    SEMICOLON
]
```
## lexer 
lexer就是将 字符串转换成 token的步骤
对于 != == +=这种的，在读取第一个元素后，需要 预读取下一个字符串来进行处理
如果 下一个是 空白 则是 ! = + 如果是 = 号 则是另一种含义

## repl 
使用命令行和程序交互
import { createInterface } from 'readline'
读取控制台的数据