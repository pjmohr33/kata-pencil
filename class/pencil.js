const { Paper } = require('./paper');

class Pencil {
  constructor(length, eraserDurability, pointDurability) {
    this.length = length;
    this.eraserDurability = eraserDurability;
    this.pointDurability = pointDurability;
  }

  write(paper, sentence) {

    sentence.split('').forEach(letter => {
      let costOfLetter;

      if (letter === " ") {
        // white space does not affect point durability
        costOfLetter = 0;

      } else if (letter.toLowerCase() === letter) {
        costOfLetter = 1;

      } else if (letter.toUpperCase() === letter) {
        costOfLetter = 2;
      }

      if (this.pointDurability - costOfLetter >= 0) {
        paper.content += letter;
        this.pointDurability -= costOfLetter;
      }
    });
  }

  sharpen() {
    if (this.length > 0) {
      this.pointDurability += 500;
      this.length -= 1;
    }
  }

  erase(paper, mistake) {
    let content = paper.content;
    content = content.split(' ');

    const mistakeIndex = content.lastIndexOf(mistake);
    content.splice(mistakeIndex, mistake.length /* will need to replace what is removed */);
    content = content.join(' ');

    paper.content = content;
  }
}

module.exports = { Pencil };
