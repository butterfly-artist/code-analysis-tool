import { Token } from '../types/compiler';

const KEYWORDS = new Set([
  'int', 'float', 'char', 'if', 'else', 'while', 'for', 'return', 'void', 'main',
  'const', 'static', 'struct', 'union', 'enum', 'typedef', 'sizeof', 'break', 'continue'
]);

const OPERATORS = new Set([
  '+', '-', '*', '/', '%', '=', '==', '!=', '<', '>', '<=', '>=', '&&', '||', '!',
  '++', '--', '+=', '-=', '*=', '/=', '&', '|', '^', '~', '<<', '>>'
]);

const DELIMITERS = new Set([
  '(', ')', '{', '}', '[', ']', ';', ',', '.', '->'
]);

export function tokenize(code: string): Token[] {
  const tokens: Token[] = [];
  const lines = code.split('\n');
  
  for (let lineNum = 0; lineNum < lines.length; lineNum++) {
    const line = lines[lineNum];
    let col = 0;
    
    while (col < line.length) {
      // Skip whitespace
      if (/\s/.test(line[col])) {
        col++;
        continue;
      }
      
      // Handle comments
      if (line.slice(col, col + 2) === '//') {
        tokens.push({
          type: 'comment',
          value: line.slice(col),
          line: lineNum + 1,
          column: col + 1
        });
        break;
      }
      
      // Handle multi-character operators
      if (col < line.length - 1) {
        const twoChar = line.slice(col, col + 2);
        if (OPERATORS.has(twoChar)) {
          tokens.push({
            type: 'operator',
            value: twoChar,
            line: lineNum + 1,
            column: col + 1
          });
          col += 2;
          continue;
        }
      }
      
      // Handle single-character operators and delimiters
      if (OPERATORS.has(line[col]) || DELIMITERS.has(line[col])) {
        tokens.push({
          type: OPERATORS.has(line[col]) ? 'operator' : 'delimiter',
          value: line[col],
          line: lineNum + 1,
          column: col + 1
        });
        col++;
        continue;
      }
      
      // Handle string literals
      if (line[col] === '"') {
        let value = '"';
        col++;
        while (col < line.length && line[col] !== '"') {
          if (line[col] === '\\' && col + 1 < line.length) {
            value += line[col] + line[col + 1];
            col += 2;
          } else {
            value += line[col];
            col++;
          }
        }
        if (col < line.length) {
          value += '"';
          col++;
        }
        tokens.push({
          type: 'literal',
          value,
          line: lineNum + 1,
          column: col - value.length + 1
        });
        continue;
      }
      
      // Handle numbers
      if (/\d/.test(line[col])) {
        let value = '';
        while (col < line.length && /[\d.]/.test(line[col])) {
          value += line[col];
          col++;
        }
        tokens.push({
          type: 'literal',
          value,
          line: lineNum + 1,
          column: col - value.length + 1
        });
        continue;
      }
      
      // Handle identifiers and keywords
      if (/[a-zA-Z_]/.test(line[col])) {
        let value = '';
        while (col < line.length && /[a-zA-Z0-9_]/.test(line[col])) {
          value += line[col];
          col++;
        }
        tokens.push({
          type: KEYWORDS.has(value) ? 'keyword' : 'identifier',
          value,
          line: lineNum + 1,
          column: col - value.length + 1
        });
        continue;
      }
      
      // Skip unknown characters
      col++;
    }
  }
  
  return tokens;
}