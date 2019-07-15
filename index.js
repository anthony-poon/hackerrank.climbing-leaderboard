'use strict';

const fs = require('fs');

function climbingLeaderboard(scores, alice) {
    let uniqueScores = [...new Set(scores)];
    let caches = alice.map((score, index) => ({
        index: index,
        score: score,
        rank: uniqueScores.length + 1
    }));
    caches.sort((a, b) => {
        if (a.score > b.score) {
            return -1;
        }
        if (b.score > a.score) {
            return 1;
        }
        return 0;
    });
    let cIndex = 0;
    for (let i = 0; i < uniqueScores.length && cIndex < caches.length; i ++) {
        let offset = 0;
        while (cIndex + offset < caches.length && caches[cIndex + offset].score >= uniqueScores[i]) {
            caches[cIndex + offset].rank = i + 1;
            offset += 1;
        }
        cIndex = cIndex + offset;
    }
    caches.sort((a, b) => {
        if (a.index > b.index) {
            return 1;
        }
        if (b.index > a.index) {
            return -1;
        }
        return 0;
    });
    return caches.map(c => c.rank);
}

function main() {
    let content = fs.readFileSync("input_1.txt", 'utf8');

    content = content.split("\n");

    const scoresCount = parseInt(content[0], 10);
    const scores = content[1].split(' ').map(scoresTemp => parseInt(scoresTemp, 10));
    const aliceCount = parseInt( content[2], 10);
    const alice = content[3].split(' ').map(aliceTemp => parseInt(aliceTemp, 10));
    let result = climbingLeaderboard(scores, alice);

    console.log(result);
}

main();