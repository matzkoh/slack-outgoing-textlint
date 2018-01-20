const {TextLintEngine} = require('textlint');

const lintText = async text => {
  const engine = new TextLintEngine();
  const lintResults = await engine.executeOnText(text);
  const messages = lintResults[0].messages;

  return messages.map(item => {
    return `${item.line}:${item.column} ${item.message} (${item.ruleId})`;
  }).join('\n');

};

module.exports = lintText;
