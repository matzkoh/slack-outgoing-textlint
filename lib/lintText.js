const {TextLintEngine} = require('textlint');

const lintText = async text => {
  const engine = new TextLintEngine();
  const results = await engine.executeOnText(text, '.md');

  return lintText.formatResults(results);
};

lintText.formatResults = results => {
  return results
    .reduce((messages, result) => messages.concat(...result.messages), [])
    .map(m => {
      return `${m.line || 0}:${m.column || 0} ${m.message} (${m.ruleId || '----'})`;
    })
    .join('\n');
};

module.exports = lintText;
