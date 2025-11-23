export const Moves: import('../../../sim/dex-moves').ModdedMoveDataTable = {
	rocksmash: {
		inherit: true,
		basePower: 60,
		type: "Fighting",		
		secondary: {
			chance: 30,
			boosts: {
				def: -1,
			},
		},

	},
	strength: {
		inherit: true,
		basePower: 750,
		type: "Rock",	
		secondary: {
			chance: 10,
			boosts: {
				atk: -1,
			},
		},

	},
	cut: {
		inherit: true,
		basePower: 60,
		type: "Grass",

	},
};