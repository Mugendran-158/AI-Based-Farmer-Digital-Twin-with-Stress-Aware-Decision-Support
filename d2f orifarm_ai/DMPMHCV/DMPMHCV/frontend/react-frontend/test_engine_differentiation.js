/**
 * test_engine_differentiation.js
 * Verifies that different agricultural intents receive unique expert responses.
 */

import { aiFarmerEngine } from './src/utils/ai-farmer-engine.js';

const testQuestions = [
    { topic: 'general', q: "What are the best farming practices?" },
    { topic: 'general', q: "What crops should I plant this season?" },
    { topic: 'soil', q: "How to improve soil?" },
    { topic: 'soil', q: "What nutrients does my soil need?" },
    { topic: 'market', q: "When is the best time to sell my crops?" },
    { topic: 'market', q: "Tell me about storage advice" }
];

console.log("=== AI FARMER ENGINE DIFFERENTIATION TEST ===\n");

const results = testQuestions.map(test => {
    const res = aiFarmerEngine(test.topic, test.q, 'en');
    console.log(`Q: "${test.q}"`);
    console.log(`Topic: ${test.topic} | Intent: ${res.topic}`);
    console.log(`Answer: ${res.answer.substring(0, 100)}...`);
    console.log(`Reasoning: ${res.reasoning}\n`);
    return res.answer;
});

// Check for duplicates
const uniqueAnswers = new Set(results);
if (uniqueAnswers.size === results.length) {
    console.log("✅ SUCCESS: All responses are unique and specific to the intent!");
} else {
    console.warn("⚠️ WARNING: Some responses are overlapping. Check engine logic.");
}
