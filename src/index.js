var columnify = require('columnify');
const ShakespearePlay = require('./lib/ShakespearePlay');
const CharacterLinesAnalyzer = require('./lib/CharacterLinesAnalyzer');
const MACBETH = 'macbeth';
const play = new ShakespearePlay(new CharacterLinesAnalyzer(['All']));


(async ()=>{
  const characterLines = await play.analyze(MACBETH);
  Object.keys(characterLines).forEach((key) => {
    var columns = columnify(characterLines);
    console.log(columns);
  });
})();