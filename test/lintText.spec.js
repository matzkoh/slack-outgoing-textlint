const lintText = require('../lib/lintText');

describe('lintText', () => {
  it('works', async () => {
    const result = await lintText('柱で、食べれる、じゃぱりまんが、美味しいです。\nYou still use FireFox lol.');

    expect(result).toBe('1:6 ら抜き言葉を使用しています。 (preset-japanese/no-dropping-the-ra)\n1:16 一つの文で"、"を3つ以上使用しています (preset-japanese/max-ten)\n2:15 FireFox => Firefox (web-plus-db)');
  });

  it('works again', async () => {
    const result = await lintText('柱で、食べれる、じゃぱりまんが、美味しいです。\nYou still use FireFox lol.');

    expect(result).toBe('1:6 ら抜き言葉を使用しています。 (preset-japanese/no-dropping-the-ra)\n1:16 一つの文で"、"を3つ以上使用しています (preset-japanese/max-ten)\n2:15 FireFox => Firefox (web-plus-db)');
  });
});
