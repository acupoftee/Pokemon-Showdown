// test/mods/gen5sgss.test.js
'use strict';
const assert = require('../assert');

describe('gen5sgss mod and formats', () => {
	let Dex;
	before(() => {
		// Use the compiled runtime Dex instance from `dist` so this focused test
		// will work when run by itself instead of the full test harness.
		Dex = require('../../dist/sim/dex').Dex;
	});

	it('should expose a mod Dex for gen5sgss and have Butterfree overrides', () => {
		// Ensure mod Dex exists
		const modDex = Dex.mod('gen5sgss');
		assert(modDex, 'Dex.mod("gen5sgss") returned a value');

		const butter = modDex.species.get('butterfree');
		assert(butter, 'butterfree exists in gen5sgss');
		// expected values from the cache / your mod source
		// `test/assert.js` deprecates strict variants; use assert.deepEqual/assert.equal
		assert.strict(butter.baseStats, { hp: 60, atk: 45, def: 50, spa: 100, spd: 100, spe: 80 });
		assert.equal(butter.abilities && butter.abilities[0], 'Tinted Lens');
	});

	it('Dex.forFormat should return the modded Dex for the teambuilder format', () => {
		// The server's formats are typically accessible via Dex.formats.get or look into data/formats.js
		// Here we test using the display name that will be normalized to a format ID by Dex.formats.get.
		const format = '[Gen 5] Sacred Gold & Storm Silver';
		const formatDex = Dex.forFormat(format);
		// If Dex.forFormat returns a Dex object from the mod, currentMod or dataDir may be set to 'gen5sgss'
		assert(
			(formatDex.currentMod && formatDex.currentMod === 'gen5sgss') ||
			(formatDex.dataDir && formatDex.dataDir.includes('gen5sgss')),
			'Dex.forFormat returned a Dex for the gen5sgss mod'
		);
	});
});
