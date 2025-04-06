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
        // TODO: 实现逻辑以忽略空格、制表符和换行符
    }

    // 读取下一个字符并更新当前字符
    readChar() {
        // TODO: 实现逻辑以移动到输入中的下一个字符
    }

    // 判断给定字符是否是字母（用于标识符）
    isLetter(ch) {
        // TODO: 实现逻辑以检查字符是否为有效字母
    }

    // 判断给定字符是否是数字（用于数字标记）
    isDigit(ch) {
        // TODO: 实现逻辑以检查字符是否为数字
    }

    // 读取一个数字标记
    readNumber() {
        // TODO: 实现逻辑以解析数字标记
    }

    // 读取一个字符串标记
    readString() {
        // TODO: 实现逻辑以解析字符串标记
    }

    // 查看下一个字符但不移动当前位置
    peekChar() {
        // TODO: 实现逻辑以查看下一个字符
    }
}