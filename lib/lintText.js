const {TextLintEngine} = require('textlint');

const lintText = async text => {
  const engine = new TextLintEngine();
  const lintResults = await engine.executeOnText(text, '.md');
  const messages = lintResults[0].messages;

  return messages.map(item => {
    return `${item.line || 0}:${item.column || 0} ${item.message} (${item.ruleId || '----'})`;
  }).join('\n');
};

module.exports = lintText;
