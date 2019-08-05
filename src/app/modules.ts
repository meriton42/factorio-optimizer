export interface ModuleInfo {
	energy: number,
	speed?: number,
	productivity?: number,
	pollution?: number,
}

const _modules = {
	efficiencyModule: {
		energy: -20,
	},
	efficiencyModule2: {
		energy: -30,
	},
	efficiencyModule3: {
		energy: -40,
	},
	speedModule: {
		energy: 50,
		speed: 20,
	},
	speedModule2: {
		energy: 60,
		speed: 30,
	},
	speedModule3: {
		energy: 70,
		speed: 50,
	},
	productivityModule: {
		energy: 40,
		speed: -15,
		productivity: 4,
		pollution: 5,
	},
	productivityModule2: {
		energy: 60,
		speed: -15,
		productivity: 6,
		pollution: 7.5,
	},
	productivityModule3: {
		energy: 80,
		speed: -15,
		productivity: 10,
		pollution: 10,
	}
}

export type ModuleName = keyof typeof _modules;
export const moduleNames = Object.keys(_modules) as ModuleName[];
export const modules: {[M in ModuleName]: ModuleInfo} = _modules;