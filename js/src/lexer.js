// 导入用于处理标记的模块和函数
import { Token, TokenType, lookupIdent } from "./token";

// Lexer 类用于将输入字符串分解为标记（Token）
export class Lexer {
    // 输入的字符串
    input = ''
    // 当前处理的位置（指向当前字符）
    position = 0
    // 下一个字符的位置（用于向前查看）
    nextPosition = 0
    // 当前正在处理的字符
    ch = ''

    // 构造函数，初始化 Lexer 并设置输入字符串
    constructor(input) {
        // 在输入字符串末尾添加一个空格，简化解析逻辑
        this.input = input + ' '
        // 读取第一个字符，初始化 Lexer 状态
        this.readChar()
    }

    // 获取下一个标记（Token）
    nextToken() {
        // TODO: 实现逻辑以识别并返回下一个标记
    }

    // 跳过输入中的空白字符
    skipWhitespace() {
        while(
            this.ch === ' ' ||
            this.ch === '\t' ||
            this.ch === '\n' ||
            this.ch === '\r'
        ){
            this.readChar()
        }
    }

    // 读取下一个字符并更新当前字符
    readChar() {
        // 如果到达输入字符串的末尾，则将当前字符设置为 undefined（表示 EOF）
        // 否则，将当前字符设置为下一个字符
        if(this.position >= this.input.length){
            this.ch = undefined // EOF
        }else{
            this.ch = this.input[this.nextPosition]
        }
        this.position = this.nextPosition
        this.nextPosition++
    }

    // 判断给定字符是否是字母（用于标识符）
    isLetter(ch) {
        if(ch === undefined) return false

        // 使用正则表达式检查字符是否为字母或下划线
        return /[a-z]/i.test(ch) || ch === '_'
    }

    // 判断给定字符是否是数字（用于数字标记）
    isDigit(ch) {
        if(ch === undefined) return false
        // 使用 parseInt 检查字符是否为数字
        // parseInt 返回 NaN 时表示不是数字
        return !isNaN(parseInt(ch)) && ch != ''
    }

    // 读取一个标识符标记
    readIdentifier(){
        let start = this.position
        // 循环读取字符，直到遇到非字母字符
        while(this.isLetter(this.ch)){
            this.readChar()
        }
        // 返回从开始位置到当前位置之间的子字符串作为标识符
        return this.input.substring(start, this.position)
    }

    // 读取一个数字标记
    readNumber() {
        let start = this.position
        // 循环读取字符，直到遇到非数字字符
        while(this.isDigit(this.ch)){
            this.readChar()
        }
        // 返回从开始位置到当前位置之间的子字符串作为数字
        return this.input.substring(start, this.position)
    }

    // 读取一个字符串标记
    readString() {
        let start = this.position + 1 // 跳过开头的引号
        // 循环读取字符，直到遇到结束引号
        while(this.ch !== '"' && this.ch !== undefined){
            this.readChar()
        }
        // 返回从开始位置到当前位置之间的子字符串作为字符串
        return this.input.substring(start, this.position)
    }

    // 查看下一个字符但不移动当前位置
    peekChar() {
        if(this.nextPosition >= this.input.length){
            return undefined // EOF
        }else{
            return this.input[this.nextPosition]
        }
    }
}