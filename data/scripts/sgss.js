// 1. Read from sgss.txt
// 2. Split the content by pound sign
import fs, {statfsSync} from "fs";
import { Pokedex } from "./pokedex.js";
// const fs = require("fs");
const data = fs.readFileSync("sgss.txt", "utf-8");

const entries = data.split("#").slice(1);

console.log(entries);

const output = {};

entries.forEach(entry => {
	const lines = entry.trim().split("\n");

	const header = lines[0];
	const pokemonName = header.split(" ")[1].toLowerCase();

	let ability = null;
	let baseStats = null;

	lines.forEach(line => {
		if (line.includes('+ Ability:')) {
			ability = line.split(': ')[1].trim();
		}

		if (line.includes('+ Stat Changes:')) {
			baseStats = formatStats(pokemonName, line.split(': ')[1].trim());
		}
	});

	if (ability) {
		output[poe]
	}
});

function formatStats(pokemon, stat) {
	const map = {
		'Special Attack': 'spa',
		'HP': 'hp',
		'Attack': 'atk',
		'Defense': 'def',
		'Speed': 'spe',
		'Special Defense': 'spd',
	};

	const original = Pokedex[pokemon === "farfetch’d" ? "farfetchd" : pokemon].baseStats;
	const updated = {};
	const stats = stat.split(', ').filter(stat => !stat.includes("Total ("));
	stats.forEach(stat => {
		// ex: "Special Attack (112)"
		const match = stat.match(/(\w[\w\s]*)\s\((\d+)\)/);

		if (match) {
			const name = match[1].trim();
			const value = parseInt(match[2]);
			updated[map[name]] = value;
		}
	});
	return { ...original, ...updated };
}

// function formatAbilities(abilityStr) {
// 	const formatted = {}
// 	const abilities = abilityStr.split(', ');
// 	// abilities.forEach(ability => {
// 	// const match = ability.match(/[\w\s]*\s{\d+}/);
// }