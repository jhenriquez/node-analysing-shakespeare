const _ = require('lodash');
const select = require('xpath.js');
const XmlDOM = require('xmldom').DOMParser;

function CharacterLinesAnalyzer(excludes = []) {
  this.excludes = excludes.map(this._capitalize);
}

CharacterLinesAnalyzer.prototype = {
  _capitalize: function (value) {
    return value.toLowerCase()
          .split(' ')
          .map((s) => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
  },

  execute: function (xmlPlay) {
    const parsedDocument = new XmlDOM().parseFromString(xmlPlay);
    const nodes = select(parsedDocument, '//SPEECH');

    const characters = nodes.reduce((characters, node) => {
      let currentSpeaker;

      for(let i = 0; i < node.childNodes.length; i++) {
        if ((/speaker/i).test(node.childNodes[i].nodeName)) {
          currentSpeaker = this._capitalize(node.childNodes[i].textContent);
          characters[currentSpeaker] = characters[currentSpeaker] || 0;
        }

        if ((/line/i).test(node.childNodes[i].nodeName)) {
          characters[currentSpeaker] += 1;
        }
      }
      return characters;
    }, {});
    
    return _.pickBy(characters, (value, key) => !this.excludes.includes(key));
  },
};

module.exports = CharacterLinesAnalyzer;