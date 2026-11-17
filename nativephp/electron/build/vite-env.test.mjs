import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

// src/main/index.js resolves the bundled app from import.meta.env.MAIN_VITE_NATIVEPHP_BUILD_PATH.
// Without these files Vite inlines `undefined` and the packaged app crashes on launch.
for (const mode of ['production', 'development']) {
    test(`.env.${mode} defines MAIN_VITE_NATIVEPHP_BUILD_PATH`, () => {
        const content = readFileSync(new URL(`../.env.${mode}`, import.meta.url), 'utf8');
        assert.match(content, /^MAIN_VITE_NATIVEPHP_BUILD_PATH=.+$/m);
    });
}
