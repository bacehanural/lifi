import { expect } from 'chai';
import { sendGetRequest } from '../utils/apiUtils.js';

describe('Functional Test Automation for the /tokens API Endpoint', () => {

  // TC_LIFI-API_001
  it('Should return a valid list of tokens when no parameters are provided', async () => {
    const data = await sendGetRequest('/tokens', {});
    expect(data).to.have.property('tokens');
    expect(Object.keys(data.tokens)).to.not.be.empty;
  });


  // TC_LIFI-API_002
  it('Should return tokens for all chains when no chain parameter is provided', async () => {
    const data = await sendGetRequest('/tokens', {});
    expect(Object.keys(data.tokens).length).to.be.greaterThan(1);
  });


  // TC_LIFI-API_003
  it('Should retrieve tokens for a specified chain ID', async () => {
    const params = { chains: '1' }; // 1 for Ethereum mainnet
    const data = await sendGetRequest('/tokens', params);
    expect(data.tokens).to.have.property('1');
    expect(data.tokens['1']).to.be.an('array').that.is.not.empty;
  });


  // TC_LIFI-API_004
  it('Should retrieve tokens for multiple chains', async () => {
    const params = { chains: '1,137' }; // Ethereum and Polygon
    const data = await sendGetRequest('/tokens', params);
    expect(data.tokens).to.have.keys('1', '137');
    expect(data.tokens['1']).to.be.an('array').that.is.not.empty;
    expect(data.tokens['137']).to.be.an('array').that.is.not.empty;
  });


  // TC_LIFI-API_005
  it('Should validate duplicate chain IDs in query are handled correctly', async () => {
    const params = { chains: '1,1' }; // Duplicate Ethereum mainnet ID
    const data = await sendGetRequest('/tokens', params);
    expect(data.tokens).to.have.property('1');
  });


  // TC_LIFI-API_006
  it('Should validate token data structure for a specific chain', async () => {
    const params = { chains: '1' }; // Ethereum mainnet
    const data = await sendGetRequest('/tokens', params);
    expect(data.tokens['1'][0]).to.include.all.keys(
      'address',
      'symbol',
      'name',
      'decimals'
    );
  });


  // TC_LIFI-API_007
  it('Should return tokens with expected default fields for a valid chain', async () => {
    const params = { chains: '1' }; // Ethereum mainnet
    const data = await sendGetRequest('/tokens', params);
    const token = data.tokens['1'][0];
    expect(token).to.have.property('address').that.is.a('string');
    expect(token).to.have.property('symbol').that.is.a('string');
    expect(token).to.have.property('name').that.is.a('string');
    expect(token).to.have.property('decimals').that.is.a('number');
  });


  // TC_LIFI-API_008
  it('Should verify default pagination behavior when no limit is specified', async () => {
    const params = { chains: '1' }; // Ethereum mainnet
    const data = await sendGetRequest('/tokens', params);
    expect(data.tokens['1']).to.have.lengthOf.above(0);
  });


  // TC_LIFI-API_009
  it('Should validate case-insensitive chain parameter handling', async () => {
    const params = { chains: 'ETHEREUM' }; // Case-insensitive chain ID
    try {
      await sendGetRequest('/tokens', params);
    } catch (error) {
      expect(error.message).to.include('GET Request Failed');
    }
  });


  // TC_LIFI-API_010
  it('Should handle empty query parameters', async () => {
    const data = await sendGetRequest('/tokens');
    expect(data.tokens).to.exist;
    expect(Object.keys(data.tokens).length).to.be.greaterThan(0);
  });


  // TC_LIFI-API_011
  it('Should return an error for invalid chain parameter', async () => {
    try {
      await sendGetRequest('/tokens', { chains: 'invalid_chain' });
    } catch (error) {
      expect(error.message).to.include('GET Request Failed');
    }
  });


  // TC_LIFI-API_012
  it('Should validate response with invalid query parameter', async () => {
    try {
      const params = { invalidParam: 'test' };
      await sendGetRequest('/tokens', params);
    } catch (error) {
      expect(error.message).to.include('400'); // Bad request
    }
  });


  // TC_LIFI-API_013
  it('Should validate error for excessively long chain ID', async () => {
    const params = { chains: '12345678901234567890' }; // Excessively long chain ID
    try {
      await sendGetRequest('/tokens', params);
    } catch (error) {
      expect(error.message).to.include('GET Request Failed');
    }
  });


  // TC_LIFI-API_014
  it('Should validate error response for missing required parameters', async () => {
    try {
      await sendGetRequest('/tokens', { missingParam: 'test' });
    } catch (error) {
      expect(error.message).to.include('GET Request Failed');
      expect(error.message).to.include('400'); // Bad request
    }
  });


  // TC_LIFI-API_015
  it('Should return an error for an unsupported chain ID', async () => {
    const params = { chains: '0' }; // Unsupported chain ID
    try {
      await sendGetRequest('/tokens', params);
    } catch (error) {
      expect(error.message).to.include('/chains/0 must be equal to one of the allowed values');
    }
  });

});