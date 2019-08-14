const got = require('got');
const convert = require('xml-js');
const joinUrl = require('url-join');
const CharacterLinesAnalyzer = require('../../src/lib/CharacterLinesAnalyzer');
const {
  PLAY_PROVIDER_RESOURCE_URI_PLACEHOLDER,
  PLAY_PROVIDER_DOMAIN
} = require('./constants');

/**
 * Provides an interface to retrieve and analyze a Shakespeare play.
 * @param {*} name The name of the play.
 * @param {*} analyzer The analyzer to use.
 */
function ShakespearePlay (analyzer = new CharacterLinesAnalyzer()) {
  this.analyzer = analyzer;
}

ShakespearePlay.prototype = {
  analyze: async function (name) {
    const uri = joinUrl(PLAY_PROVIDER_DOMAIN, PLAY_PROVIDER_RESOURCE_URI_PLACEHOLDER.replace('{name}', name));
    const response = await got(uri);
    return this.analyzer.execute(response.body);
  },
};

module.exports = ShakespearePlay;