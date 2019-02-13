const lintText = require('../lib/lintText');

describe('lintText', () => {
  it('works', async () => {
    const result = await lintText('柱で、食べれる、じゃぱりまんが、美味しいです。');

    expect(result).toBe(
      '1:6 ら抜き言葉を使用しています。 (japanese/no-dropping-the-ra)\n1:16 一つの文で"、"を3つ以上使用しています (japanese/max-ten)',
    );
  });

  it('works again', async () => {
    const result = await lintText('柱で、食べれる、じゃぱりまんが、美味しいです。');

    expect(result).toBe(
      '1:6 ら抜き言葉を使用しています。 (japanese/no-dropping-the-ra)\n1:16 一つの文で"、"を3つ以上使用しています (japanese/max-ten)',
    );
  });
});

describe('formatResults', () => {
  it('works', () => {
    const result = lintText.formatResults([
      {
        messages: [
          { line: 1, column: 2, message: 'my-text-a', ruleId: 'my-rule-b' },
          { column: 4, message: 'my-text-c', ruleId: 'my-rule-d' },
          { line: 5, message: 'my-text-e', ruleId: 'my-rule-f' },
          { line: 7, column: 8, message: 'my-text-g' },
        ],
      },
    ]);

    expect(result).toBe(
      '1:2 my-text-a (my-rule-b)\n0:4 my-text-c (my-rule-d)\n5:0 my-text-e (my-rule-f)\n7:8 my-text-g (----)',
    );
  });
});
