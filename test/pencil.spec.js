const { Pencil } = require('../class/pencil');
const { Paper } = require('../class/paper');

describe('Pencil', function () {
  let pencil;
  let paper;

  beforeEach(()=>{
    // creates new pencil instance with 7 length, 500 eraser durability, 500 point durability and a piece of paper
    pencil = new Pencil(7, 500, 500);
    paper = new Paper();
  });

  afterEach(() => {
    // deletes previous pencil and paper
    pencil = '';
    paper = '';
  });

  it('writes on the paper', function() {

    pencil.write(paper, 'Hello World!');

    expect(paper.read()).toEqual('Hello World!');
  });

  it('deducts correct amount off of pencil point durability when writing', () => {

    pencil.write(paper, 'Hello World!');

    expect(pencil.pointDurability).toEqual(487);

    pencil.write(paper, ' More for the books...');

    expect(pencil.pointDurability).toEqual(468);

    pencil.write(paper, " and that's all!");

    expect(pencil.pointDurability).toEqual(455);
  });

  it('stops writing when dull but continues writing until durability equal 0', () => {
    pencil.pointDurability = 5;

    pencil.write(paper, 'Watermelon');

    expect(paper.content).toEqual('Wate');

    expect(pencil.pointDurability).toEqual(0);

    pencil.pointDurability = 5;

    pencil.write(paper, ' WOW');

    expect(paper.read()).toEqual('Wate WO');
  });

  it('adds point durability when sharpening', () => {
    pencil.pointDurability = 0;

    pencil.sharpen();

    expect(pencil.pointDurability).toEqual(500);
  });

  it('deducts 1 from pencil length', () => {
    pencil.length = 7;

    pencil.sharpen();

    expect(pencil.length).toEqual(6);
  });

  it('does not decrease length or increase point durability when length is 0', () => {
    pencil.length = 0;

    pencil.pointDurability = 0;

    pencil.sharpen();

    expect(pencil.length).toEqual(0);

    expect(pencil.pointDurability).toEqual(0);
  });

  it('erases the first occurance of the given value', () => {
    pencil.write(paper, 'Ho Ho Ho')

    pencil.erase(paper, 'Ho');

    expect(paper.read()).toEqual('Ho Ho');
  })
})
