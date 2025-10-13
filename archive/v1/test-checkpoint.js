#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');
const chalk = require('chalk');
const { CheckpointOrchestrator } = require('./src/checkpoint-orchestrator');

/**
 * Test script to validate the checkpoint orchestrator flow locally
 * Usage: node test-checkpoint.js
 */
async function runCheckpointTest() {
  console.log(chalk.blue('🧪 Checkpoint Orchestrator Test'));
  console.log(chalk.dim('Validating the complete flow with example data...\n'));
  
  const startTime = Date.now();
  
  try {
    // Step 1: Load example checkpoint data
    console.log(chalk.cyan('📂 Loading example checkpoint data...'));
    const examplePath = path.join(__dirname, 'examples', 'checkpoint-example.json');
    const exampleData = JSON.parse(await fs.readFile(examplePath, 'utf-8'));
    console.log(chalk.green(`✅ Loaded: ${exampleData.sessionId}-CP${exampleData.checkpointNumber}`));
    console.log(`   Messages: ${exampleData.messages.length}`);
    console.log(`   Token Count: ${exampleData.tokenCount?.toLocaleString() || 'N/A'}`);
    console.log('');
    
    // Step 2: Initialize orchestrator
    console.log(chalk.cyan('🤖 Initializing checkpoint orchestrator...'));
    const orchestrator = new CheckpointOrchestrator({
      projectRoot: __dirname,
      verbose: true
    });
    console.log(chalk.green('✅ Orchestrator initialized with all agents'));
    console.log('');
    
    // Step 3: Process the checkpoint
    console.log(chalk.cyan('⚡ Processing checkpoint through agent pipeline...'));
    const result = await orchestrator.processCheckpoint(exampleData);
    console.log('');
    
    // Step 4: Validate and report results
    console.log(chalk.cyan('📊 Processing Results:'));
    if (result.success) {
      console.log(chalk.green('✅ Checkpoint processed successfully!'));
      console.log(`   Session: ${result.sessionId}-CP${result.checkpointNumber}`);
      console.log(`   Processing Time: ${result.processingTime}ms`);
      console.log(`   Agents Executed: ${result.agentsExecuted}`);
      console.log(`   Files Updated: ${result.filesUpdated.length}`);
      
      if (result.filesUpdated.length > 0) {
        console.log('\n   📁 Updated Files:');
        for (const file of result.filesUpdated) {
          const relativePath = path.relative(__dirname, file);
          console.log(`      - ${relativePath}`);
          
          // Check if file exists and show size
          try {
            const stats = await fs.stat(file);
            const sizeKB = (stats.size / 1024).toFixed(1);
            console.log(`        (${sizeKB} KB)`);
          } catch (error) {
            console.log(chalk.yellow(`        (file check failed: ${error.message})`));
          }
        }
      }
    } else {
      console.log(chalk.red('❌ Checkpoint processing failed!'));
      console.log(`   Error: ${result.error}`);
      console.log(`   Processing Time: ${result.processingTime}ms`);
    }
    console.log('');
    
    // Step 5: Test memory decay functionality
    console.log(chalk.cyan('🧹 Testing memory decay functionality...'));
    try {
      const memoryAgent = orchestrator.agents.memoryDropOff;
      const memoryStats = await memoryAgent.getMemoryStatistics();
      
      if (memoryStats.error) {
        console.log(chalk.yellow(`   No existing memory data: ${memoryStats.error}`));
      } else {
        console.log(`   Total Conversations: ${memoryStats.totalConversations}`);
        console.log(`   Total Size: ${(memoryStats.totalSize / 1024).toFixed(1)} KB`);
        
        if (memoryStats.decayRecommendations?.recommendDecay) {
          console.log(chalk.yellow('   Recommendation: Memory decay could be applied'));
        } else {
          console.log(chalk.green('   Memory is optimal, no decay needed'));
        }
      }
    } catch (error) {
      console.log(chalk.yellow(`   Memory statistics unavailable: ${error.message}`));
    }
    console.log('');
    
    // Step 6: Validate agent outputs
    console.log(chalk.cyan('🔍 Validating agent functionality...'));
    await validateAgentOutputs(orchestrator, exampleData);
    console.log('');
    
    // Final summary
    const totalTime = Date.now() - startTime;
    console.log(chalk.green('🎉 Test Complete!'));
    console.log(`   Total Test Time: ${totalTime}ms`);
    console.log(`   Status: ${result.success ? chalk.green('PASSED') : chalk.red('FAILED')}`);
    console.log('');
    
    if (result.success) {
      console.log(chalk.dim('💡 Next steps:'));
      console.log(chalk.dim('   • Run: npm run checkpoint:demo'));
      console.log(chalk.dim('   • Try: aic checkpoint --file examples/checkpoint-example.json'));
      console.log(chalk.dim('   • Test: aic memory-decay --verbose'));
    }
    
  } catch (error) {
    console.error(chalk.red('❌ Test failed:'), error.message);
    if (process.env.VERBOSE) {
      console.error(chalk.dim(error.stack));
    }
    process.exit(1);
  }
}

/**
 * Validate that all agents are working correctly
 */
async function validateAgentOutputs(orchestrator, exampleData) {
  const agents = [
    'conversationParser',
    'decisionExtractor', 
    'insightAnalyzer',
    'stateTracker',
    'fileWriter',
    'memoryDropOff'
  ];
  
  console.log(chalk.dim('   Checking agent availability...'));
  
  for (const agentName of agents) {
    const agent = orchestrator.agents[agentName];
    if (agent) {
      console.log(chalk.green(`   ✅ ${agentName}: Available`));
    } else {
      console.log(chalk.red(`   ❌ ${agentName}: Missing`));
    }
  }
  
  console.log(chalk.dim('   Agent validation complete'));
}

/**
 * Display helpful usage information
 */
function showUsageHelp() {
  console.log(chalk.blue('\n📖 Checkpoint Orchestrator Usage:'));
  console.log('');
  console.log(chalk.cyan('CLI Commands:'));
  console.log('  aic checkpoint --demo              # Use demo data');
  console.log('  aic checkpoint --file <path>       # Load from JSON file');
  console.log('  aic memory-decay --verbose         # Apply memory decay');
  console.log('');
  console.log(chalk.cyan('NPM Scripts:'));
  console.log('  npm run test:checkpoint            # Run this test script');
  console.log('  npm run checkpoint:demo            # Quick demo test');
  console.log('');
  console.log(chalk.cyan('File Structure:'));
  console.log('  examples/checkpoint-example.json   # Example checkpoint data');
  console.log('  .aicf/conversations.aicf           # AI-native format output');
  console.log('  .ai/conversation-log.md            # Human-readable output');
  console.log('');
}

// Run the test
if (require.main === module) {
  runCheckpointTest().then(() => {
    showUsageHelp();
  }).catch(error => {
    console.error(chalk.red('Test execution failed:'), error.message);
    process.exit(1);
  });
}

module.exports = {
  runCheckpointTest,
  validateAgentOutputs
};