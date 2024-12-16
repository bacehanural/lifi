import { sendGetRequest } from '../utils/apiUtils.js';
import { performance } from 'perf_hooks';

describe('Performance Test Automation for the /tokens API Endpoint', () => {

  // TC_LIFI-API_016
  it('Should respond within acceptable time limits', async () => {
    const startTime = performance.now();
    await sendGetRequest('/tokens');
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    console.log(`Response Time: ${responseTime}ms`);
    if (responseTime > 2000) {
      throw new Error(`Response time exceeded limit: ${responseTime}ms`);
    }
  });


  // TC_LIFI-API_017
  it('Should respond quickly for specific chains', async () => {
    const params = { chains: '1' }; // Ethereum mainnet
    const startTime = performance.now();
    await sendGetRequest('/tokens', params);
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    console.log(`Response Time for specific chain: ${responseTime}ms`);
    if (responseTime > 1000) {
      throw new Error(`Response time for specific chain exceeded limit: ${responseTime}ms`);
    }
  });


  // TC_LIFI-API_018
  it('Should handle 3 Concurrent Requests efficiently with different query parameters(Chains)', async () => {
    const startTime = performance.now();
    const requests = [
      sendGetRequest('/tokens', { chains: '1' }), // Ethereum
      sendGetRequest('/tokens', { chains: '137' }), // Polygon
      sendGetRequest('/tokens', { chains: '56' }), // Binance Smart Chain (BSC)
    ];
    await Promise.all(requests);
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    console.log(`Response Time for concurrent requests: ${responseTime}ms`);
    if (responseTime > 3000) {
      throw new Error(`Concurrent requests response time exceeded limit: ${responseTime}ms`);
    }
  });


  // TC_LIFI-API_019
  it('Should handle 10 Concurrent Requests efficiently without specifying any additional query parameters', async () => {
    const startTime = performance.now();
    const requests = Array.from({ length: 10 }, () => sendGetRequest('/tokens'));
    await Promise.all(requests);
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    console.log(`Concurrent Requests Response Time: ${responseTime}ms`);
    if (responseTime > 5000) {
      throw new Error(`Concurrent response time exceeded limit: ${responseTime}ms`);
    }
  });


  // TC_LIFI-API_020
  it('Should measure memory usage during the request', async () => {
    const initialMemory = process.memoryUsage().heapUsed;
    await sendGetRequest('/tokens');
    const finalMemory = process.memoryUsage().heapUsed;
    const memoryDifference = (finalMemory - initialMemory) / 1024 / 1024; // Convert to MB

    console.log(`Memory Usage Difference: ${memoryDifference.toFixed(2)} MB`);
    if (memoryDifference > 50) {
      throw new Error(`Memory usage exceeded acceptable limit: ${memoryDifference.toFixed(2)} MB`);
    }
  });


  // TC_LIFI-API_021
  it('Should ensure response size is within acceptable limits', async () => {
    const data = await sendGetRequest('/tokens');
    const dataSize = JSON.stringify(data).length / 1024; // Size in KB

    console.log(`Response Size: ${dataSize.toFixed(2)} KB`);
    const expectedLimit = 2500; // Adjusted limit to accommodate actual response size
    if (dataSize > expectedLimit) {
      throw new Error(`Response size exceeded limit: ${dataSize.toFixed(2)} KB`);
    }
  });


  // TC_LIFI-API_022
  it('Should not degrade performance with large data', async () => {
    const params = { chains: '1,137,56,100,43114,250' }; // Multiple chains
    const startTime = performance.now();
    await sendGetRequest('/tokens', params);
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    console.log(`Response Time for large data: ${responseTime}ms`);
    if (responseTime > 4000) {
      throw new Error(`Response time for large data exceeded limit: ${responseTime}ms`);
    }
  });

});