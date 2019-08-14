const nock = require('nock');
const {
  PLAY_PROVIDER_RESOURCE_URI_PLACEHOLDER,
  PLAY_PROVIDER_DOMAIN
} = require('../../src/lib/constants');
const SpecHelpers = require('../helpers');
const ShakespearePlay = require('../../src/lib/ShakespearePlay');
const CharacterLinesAnalyzer = require('../../src/lib/CharacterLinesAnalyzer');

describe('Shakespeare#analyze', () => {
  const MACBETH = 'macbeth';
  const play = new ShakespearePlay(new CharacterLinesAnalyzer(['All']));

  beforeEach(() => {
    nock(PLAY_PROVIDER_DOMAIN)
      .get(PLAY_PROVIDER_RESOURCE_URI_PLACEHOLDER.replace('{name}', MACBETH))
      .reply(200, SpecHelpers.readFixtureFile(`${MACBETH}.xml`));
  });

  test('resolves to an object that has the characters capitalized names as attributes.', async () => {  
    const result = await play.analyze(MACBETH);

    expect(result).toEqual(expect.objectContaining({
      'Macbeth': expect.any(Number),
      'Lady Macbeth': expect.any(Number),
      'First Witch': expect.any(Number),
      'Second Witch': expect.any(Number),
      'Third Witch': expect.any(Number),
      'Banquo': expect.any(Number),
      'Duncan': expect.any(Number),
      'Macduff': expect.any(Number),
      'Malcolm': expect.any(Number),
      'Hecate': expect.any(Number),
      'Fleance': expect.any(Number),
      'Lennox': expect.any(Number),
      'Ross': expect.any(Number),
      'Porter': expect.any(Number),
      'Lady Macduff': expect.any(Number),
      'Donalbain': expect.any(Number),
    }));
  });

  test('result should not include the "All" lines.', async () =>  {
    const expectation = expect.not.arrayContaining(['All']);
    const result = await play.analyze(MACBETH);
    expect(Object.keys(result)).toEqual(expectation);
  });
});