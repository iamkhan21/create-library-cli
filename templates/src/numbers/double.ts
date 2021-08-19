/**
 * Multiplies a value by 2.
 *
 * ### Example (es imports)
 * ```js
 * import { double } from 'library-template'
 * console.log(double(5))
 * // => 10
 * ```
 *
 * ### Example (commonjs)
 * ```js
 * var double = require('library-template').double;
 * console.log(double(5));
 * // => 10
 * ```
 * @param value Number that need to be multiplied by 2
 */
export function double(value: number): number {
  return value * 2;
}
