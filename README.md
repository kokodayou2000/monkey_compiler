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
