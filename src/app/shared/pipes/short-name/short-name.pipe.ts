import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'short',
})
export class ShortNamePipe implements PipeTransform {
  transform(
    value: string,
    skip: number = 1,
    sep: string = ' ',
    newSep: string = '',
    skipChars: number = 0,
    keepChars: number = 1,
    prefix: string = '',
    suffix: string = '.'
  ): string {
    const skipWords = value.split(sep);
    const words = skipWords.splice(skip);
    const newLine = words
      .map(
        (w) => `${prefix}${w.slice(skipChars, skipChars + keepChars)}${suffix}`
      )
      .join(newSep);
    skipWords.push(newLine);
    return skipWords.join(sep);
  }
}
