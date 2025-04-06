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
    // 获取下一个标记（Token）
    nextToken() {
        // 初始化一个空的 Token 对象，默认类型和字面量为 null
        let token = new Token(null, null)

        // 跳过输入中的空白字符（如空格、制表符、换行符等）
        this.skipWhitespace()

        // 根据当前字符（this.ch）判断生成的 Token 类型
        switch (this.ch) {
            case '=':
                // 如果下一个字符也是 '='，则生成一个 EQ（等于）标记
                if (this.peekChar() === '=') {
                    const ch = this.ch
                    this.readChar() // 读取下一个字符
                    const literal = ch + this.ch // 组合成 '=='
                    token = new Token(TokenType.EQ, literal)
                } else {
                    // 否则生成一个 ASSIGN（赋值）标记
                    token = new Token(TokenType.ASSIGN, this.ch)
                }
                break
            case ';':
                // 生成一个分号标记
                token = new Token(TokenType.SEMICOLON, this.ch)
                break
            case '(':
                // 生成一个左括号标记
                token = new Token(TokenType.LPAREN, this.ch)
                break
            case ')':
                // 生成一个右括号标记
                token = new Token(TokenType.RPAREN, this.ch)
                break
            case ',':
                // 生成一个逗号标记
                token = new Token(TokenType.COMMA, this.ch)
                break
            case '+':
                // 生成一个加号标记
                token = new Token(TokenType.PLUS, this.ch)
                break
            case '-':
                // 生成一个减号标记
                token = new Token(TokenType.MINUS, this.ch)
                break
            case '!':
                // 如果下一个字符是 '='，则生成一个 NOT_EQ（不等于）标记
                if (this.peekChar() === '=') {
                    const ch = this.ch
                    this.readChar() // 读取下一个字符
                    const literal = ch + this.ch // 组合成 '!='
                    token = new Token(TokenType.NOT_EQ, literal)
                } else {
                    // 否则生成一个 BANG（感叹号）标记
                    token = new Token(TokenType.BANG, this.ch)
                }
                break
            case '*':
                // 生成一个星号标记
                token = new Token(TokenType.ASTERISK, this.ch)
                break
            case '/':
                // 生成一个斜杠标记
                token = new Token(TokenType.SLASH, this.ch)
                break
            case '<':
                // 生成一个小于号标记
                token = new Token(TokenType.LT, this.ch)
                break
            case '>':
                // 生成一个大于号标记
                token = new Token(TokenType.GT, this.ch)
                break
            case '{':
                // 生成一个左大括号标记
                token = new Token(TokenType.LBRACE, this.ch)
                break
            case '}':
                // 生成一个右大括号标记
                token = new Token(TokenType.RBRACE, this.ch)
                break
            case '[':
                // 生成一个左中括号标记
                token = new Token(TokenType.LBRACKET, this.ch)
                break
            case ']':
                // 生成一个右中括号标记
                token = new Token(TokenType.RBRACKET, this.ch)
                break
            case ':':
                // 生成一个冒号标记
                token = new Token(TokenType.COLON, this.ch)
                break
            case '"':
                // 读取字符串并生成一个 STRING 标记
                token = new Token(TokenType.STRING, this.readString())
                break
            case undefined:
                // 如果当前字符是 undefined，表示到达输入末尾，生成 EOF 标记
                token = new Token(TokenType.EOF, '')
                break
            default:
                // 如果当前字符是字母，读取标识符并生成相应的标记
                if (this.isLetter(this.ch)) {
                    token.literal = this.readIdentifier()
                    token.type = lookupIdent(token.literal) // 根据标识符类型查找 TokenType
                    return token
                }
                // 如果当前字符是数字，读取数字并生成 INT 标记
                else if (this.isDigit(this.ch)) {
                    token.literal = this.readNumber()
                    token.type = TokenType.INT
                    return token
                }
                // 如果当前字符无法识别，生成 ILLEGAL 标记
                else {
                    token = new Token(TokenType.ILLEGAL, this.ch)
                }
                break
        }

        // 读取下一个字符，准备处理下一个标记
        this.readChar()

        // 返回生成的标记
        return token
    }

    // 跳过输入中的空白字符
    skipWhitespace() {
        while (
            this.ch === ' ' ||
            this.ch === '\t' ||
            this.ch === '\n' ||
            this.ch === '\r'
        ) {
            this.readChar()
        }
    }

    // 读取下一个字符并更新当前字符
    readChar() {
        // 如果到达输入字符串的末尾，则将当前字符设置为 undefined（表示 EOF）
        // 否则，将当前字符设置为下一个字符
        if (this.position >= this.input.length) {
            this.ch = undefined // EOF
        } else {
            this.ch = this.input[this.nextPosition]
        }
        this.position = this.nextPosition
        this.nextPosition++
    }

    // 判断给定字符是否是字母（用于标识符）
    isLetter(ch) {
        if (ch === undefined) return false

        // 使用正则表达式检查字符是否为字母或下划线
        return /[a-z]/i.test(ch) || ch === '_'
    }

    // 判断给定字符是否是数字（用于数字标记）
    isDigit(ch) {
        if (ch === undefined) return false
        // 使用 parseInt 检查字符是否为数字
        // parseInt 返回 NaN 时表示不是数字
        return !isNaN(parseInt(ch)) && ch != ''
    }

    // 读取一个标识符标记
    readIdentifier() {
        let start = this.position
        // 循环读取字符，直到遇到非字母字符
        while (this.isLetter(this.ch)) {
            this.readChar()
        }
        // 返回从开始位置到当前位置之间的子字符串作为标识符
        return this.input.substring(start, this.position)
    }

    // 读取一个数字标记
    readNumber() {
        let start = this.position
        // 循环读取字符，直到遇到非数字字符
        while (this.isDigit(this.ch)) {
            this.readChar()
        }
        // 返回从开始位置到当前位置之间的子字符串作为数字
        return this.input.substring(start, this.position)
    }

    // 读取一个字符串标记
    readString() {
        let start = this.position + 1 // 跳过开头的引号
        // 循环读取字符，直到遇到结束引号
        while (this.ch !== '"' && this.ch !== undefined) {
            this.readChar()
        }
        // 返回从开始位置到当前位置之间的子字符串作为字符串
        return this.input.substring(start, this.position)
    }

    // 查看下一个字符但不移动当前位置
    peekChar() {
        if (this.nextPosition >= this.input.length) {
            return undefined // EOF
        } else {
            return this.input[this.nextPosition]
        }
    }
}