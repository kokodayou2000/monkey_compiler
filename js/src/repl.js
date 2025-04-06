// 从 readline 模块导入 createInterface，用于创建交互式命令行界面
import { createInterface } from 'readline'
// 导入 Lexer（词法分析器）
import { Lexer } from './lexer.js'

import { TokenType } from './token.js'



// 启动 REPL（交互式解释器）
export const startRepl = (
  inputStream = process.stdin, // 输入流，默认为标准输入
  outputStream = process.stdout // 输出流，默认为标准输出
) => {
  const PROMPT = '>> ' // 提示符
  // 创建 readline 接口，用于处理用户输入
  const rl = createInterface({
    input: inputStream,
    output: outputStream,
    prompt: PROMPT,
  })


  rl.prompt() // 显示提示符

  // 监听用户输入的每一行
  rl.on('line', (line) => {
    // 使用 Lexer 对输入进行词法分析
    const lexer = new Lexer(line)
    let token = lexer.nextToken() // 获取下一个标记

    while (token.type !== TokenType.EOF) { // 当标记不是文件结束符时
        outputStream.write(`${JSON.stringify(token)}\n`) // 输出标记
        token = lexer.nextToken() // 获取下一个标记
    }

    rl.prompt() // 显示提示符，等待下一次输入
  })

  // 监听关闭事件（如用户按下 Ctrl+C）
  rl.on('close', () => {
    outputStream.write('Exiting REPL.\n') // 输出退出信息
  })
}