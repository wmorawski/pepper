import { KeyToLabelPipe } from './key-to-label.pipe';

describe('KeyToLabelPipe', () => {
  const pipe = new KeyToLabelPipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should transform underscores and capitalize first letter', () => {
    const input = 'pipe_input';
    const expected = 'Pipe input';
    expect(pipe.transform(input)).toEqual(expected);
  });

  it("shouldn't transform dashes", () => {
    const input = 'pipe-input';
    const expected = 'Pipe-input';
    expect(pipe.transform(input)).toEqual(expected);
  });
});
