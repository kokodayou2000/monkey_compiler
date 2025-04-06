export const TokenType = {
    ILLEGAL: 'ILLEGAL',
    EOF: 'EOF',
    
    // 标识符
    IDENT: 'IDENT',
    INT: 'INT',
  
    // 运算符
    ASSIGN: '=',
    PLUS: '+',
    MINUS: '-',
    BANG: '!',
    ASTERISK: '*',
    SLASH: '/',
  
    LT: '<',
    GT: '>',
  
    EQ: '==',
    NOT_EQ: '!=',
  
    // 分隔符
    COMMA: ',',
    SEMICOLON: ';',
    
    LPAREN: '(',
    RPAREN: ')',
    LBRACE: '{',
    RBRACE: '}',
    
    LBRACKET: '[',
    RBRACKET: ']',


    // 方法
    FUNCTION: 'FUNCTION',
    LET: 'LET',
    TRUE: 'TRUE',
    FALSE: 'FALSE',
    IF: 'IF',
    ELSE: 'ELSE',
    RETURN: 'RETURN',
  
    STRING: 'STRING',

    COLON: ':',
  
    MACRO: 'MACRO',
  }
  
  const keywordIdentMap = {
    fn: 'FUNCTION',
    let: 'LET',
    true: 'TRUE',
    false: 'FALSE',
    if: 'IF',
    else: 'ELSE',
    return: 'RETURN',
    macro: 'MACRO',
  }
  
  export class Token {
    type = ''
    literal = ''
  
    constructor(type, literal) {
      this.type = type
      this.literal = literal
    }
  }
  
  export const lookupIdent = (ident) => {
    if (keywordIdentMap[ident]) {
      return keywordIdentMap[ident]
    }
  
    return 'IDENT'
  }