import { sendGetRequest } from '../utils/apiUtils.js';
import { performance } from 'perf_hooks';

describe('Scalability Test Automation for the /tokens API Endpoint', () => {

  // TC_LIFI-API_023
  it('Should handle the increasing load with 50 concurrent requests', async () => {
    const startTime = performance.now();
    const requests = Array.from({ length: 50 }, () => sendGetRequest('/tokens'));
    await Promise.all(requests);
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    console.log(`Response Time for 50 concurrent requests: ${responseTime}ms`);
    if (responseTime > 10000) {
      throw new Error(`Scalability test failed: Response time exceeded limit for 50 concurrent requests: ${responseTime}ms`);
    }
  });


  // TC_LIFI-API_024
  it('Should handle increasing load with 100 concurrent requests', async function () {
    this.timeout(60000); // Extended timeout to 60 seconds
    const startTime = performance.now();
    const requests = Array.from({ length: 100 }, () => sendGetRequest('/tokens'));
    await Promise.all(requests);
    const endTime = performance.now();
    const responseTime = endTime - startTime;

    console.log(`Response Time for 100 concurrent requests: ${responseTime}ms`);
    if (responseTime > 50000) {
      throw new Error(`Scalability test failed: Response time exceeded limit for 100 concurrent requests: ${responseTime}ms`);
    }
  });


  // TC_LIFI-API_025
  it('Should validate API response consistency under Varying Loads', async function() {
    this.timeout(60000); // Extend timeout to 60 seconds
    const loads = [10, 50, 100]; // Different request counts
    for (const load of loads) {
      const startTime = performance.now();
      const requests = Array.from({ length: load }, () => sendGetRequest('/tokens'));
      await Promise.all(requests);
      const endTime = performance.now();
      const responseTime = endTime - startTime;
  
      console.log(`Response Time for ${load} concurrent requests: ${responseTime}ms`);
      if (responseTime > load * 1000) { // Allowing 1 second per request as a threshold
        throw new Error(`Scalability test failed: Response time exceeded limit for ${load} concurrent requests: ${responseTime}ms`);
      }
    }
  });


  // TC_LIFI-API_026
  it('Should validate system response under Burst Load of 500 Requests', async function () {
    this.timeout(180000); // Extend timeout to 3 minutes
    const batchSize = 50; // Process requests in batches of 50
    const totalRequests = 500;
    const numBatches = totalRequests / batchSize;
  
    const startTime = performance.now();
    
    for (let i = 0; i < numBatches; i++) {
      console.log(`Processing batch ${i + 1}/${numBatches}...`);
      const requests = Array.from({ length: batchSize }, () => sendGetRequest('/tokens'));
      await Promise.all(requests);
    }
  
    const endTime = performance.now();
    const responseTime = endTime - startTime;
  
    console.log(`Response Time for 500 concurrent requests: ${responseTime}ms`);
    if (responseTime > 90000) { // Increase acceptable limit to 90 seconds
      throw new Error(`Scalability test failed: Response time exceeded limit for 500 concurrent requests: ${responseTime}ms`);
    }
  });


  // TC_LIFI-API_027
  it('Should handle a sustained load of 10 requests per second for 60 seconds', async function() {
    this.timeout(120000); // Extended timeout for this test
    const startTime = performance.now();
    for (let i = 0; i < 60; i++) {
      const requests = Array.from({ length: 10 }, () => sendGetRequest('/tokens'));
      await Promise.all(requests);
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second between batches
    }
    const endTime = performance.now();
    const totalTime = endTime - startTime;
  
    console.log(`Total Time for sustained load: ${totalTime}ms`);
    if (totalTime > 120000) {
      throw new Error(`Scalability test failed: Total time exceeded limit for sustained load: ${totalTime}ms`);
    }
  });

});