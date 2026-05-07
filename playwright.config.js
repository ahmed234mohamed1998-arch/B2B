// @ts-check
import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  timeout: 30 * 1000,
  expect:{
    timeout: 15000
  },
  
  use: {
    browserName: 'chromium',
    headless: false,
    trace: 'on-first-retry',
  },
  reporter: 'html',

});

