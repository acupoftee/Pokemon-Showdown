// 1. Read from sgss.txt
// 2. Split the content by pound sign
const fs = require("fs");
const { Pokedex } = require("./pokedex.js");
const data = fs.readFileSync("sgss.txt", "utf-8");

const entries = data.split("#").slice(1);

const output = {};

entries.forEach(entry => {
	const lines = entry.trim().split("\n");

	const header = lines[0];
	const pokemonName = header.split(" ")[1].toLowerCase();

	let abilities = null;
	let baseStats = null;

	lines.forEach(line => {
		if (line.includes('+ Ability:')) {
			abilities = formatAbilities(pokemonName, line.split(': ')[1].trim());
		}

		if (line.includes('+ Stat Changes:')) {
			baseStats = formatStats(pokemonName, line.split(': ')[1].trim());
		}
	});

	// If there are no ability nor base stat changes, we don't need to define this entry in the modded pokedex
	if (!abilities && !baseStats) {
		return;
	}
	// Becasue pokedex.ts at the root of the data folder defines these stats by default,
	// We want to make sure we include these properties if they actually exist to avoid overrides
	output[pokemonName] = {
		inherit: true,
		unreleasedHidden: true,
	};

	if (abilities) {
		output[pokemonName].abilities = abilities;
	}
	if (baseStats) {
		output[pokemonName].baseStats = baseStats;
	}
});

// fs.writeFileSync('output.json', JSON.stringify(output, null, 2), 'utf-8', err => {
// 	if (err) {
// 		console.error('Error writing stat updates to file:', err);
// 	} else {
// 		console.log('Pokemon data successfully written to output.json');
// 	}
// });

function formatStats(pokemon, stat) {
	const map = {
		'Special Attack': 'spa',
		'HP': 'hp',
		'Attack': 'atk',
		'Defense': 'def',
		'Speed': 'spe',
		'Special Defense': 'spd',
	};
	const original = getPokemon(pokemon).baseStats;
	const updated = {};
	const stats = stat.split(', ').filter(item => !item.includes("Total"));
	stats.forEach(stat => {
		// ex: "Special Attack (112)"
		const match = stat.match(/(.+?)\s*\((\d+)\)/);

		if (match) {
			const name = match[1].trim();
			const value = parseInt(match[2]);
			updated[map[name]] = value;
		}
	});
	return { ...original, ...updated };
}

function formatAbilities(pokemon, abilityStr) {
	const original = getPokemon(pokemon).abilities;
	const abilities = abilityStr.split(', ');
	abilities.forEach(ability => {
		// ex: Sniper {1}, Thick Fat {2}
		// ex: Torrent
		const match = ability.match(/(.+?)(?: \{(\d)\})?$/);

		if (match) {
			const name = match[1].trim();
			const slot = match[2] ? parseInt(match[2]) : 1;

			original[slot === 1 ? 0 : 1] = name;
		}
	});
	return original;
};

function getPokemon(pokemon) {
	return Pokedex[pokemon === "farfetch’d" ? "farfetchd" : pokemon];
};
