const _modules = {
	productivityModule: {
		energy: 0.40,
		speed: -0.15,
		productivity: 0.04,
		pollution: 0.05,
	},
	productivityModule2: {
		energy: 0.60,
		speed: -0.15,
		productivity: 0.06,
		pollution: 0.075,
	},
	productivityModule3: {
		energy: 0.80,
		speed: -0.15,
		productivity: 0.10,
		pollution: 0.10,
	},
	speedModule: {
		energy: 0.50,
		speed: 0.20,
	},
	speedModule2: {
		energy: 0.60,
		speed: 0.30,
	},
	speedModule3: {
		energy: 0.70,
		speed: 0.50,
	},
	efficiencyModule: {
		energy: -0.30,
	},
	efficiencyModule2: {
		energy: -0.40,
	},
	efficiencyModule3: {
		energy: -0.50,
	},
}

export type ModuleName = keyof typeof _modules;
export const moduleNames = Object.keys(_modules) as ModuleName[];

export class ModuleEffect {
	energy = 0;
	speed = 0;
	productivity = 0;
	pollution = 0;

	get producerPollutionFactor() {
		return Math.max(this.energy, 0.2) * this.pollution / this.speed / this.productivity;
	}

	get energyPollutionFactor() {
		return Math.max(this.energy, 0.2) / this.speed / this.productivity;
	}

	get inputPollutionFactor() {
		return 1 / this.productivity;
	}

	plus(e: ModuleEffect) {
		const r = new ModuleEffect();
		r.speed = this.speed + e.speed;
		r.energy = this.energy + e.energy;
		r.pollution = this.pollution + e.pollution;
		r.productivity = this.productivity + e.productivity;
		return r;
	}
}
export class ModuleInfo extends ModuleEffect {
	constructor(public name: ModuleName) {
		super();
		Object.assign(this, _modules[name]);
	}
}
export class NoModule extends ModuleEffect {
	energy = 1;
	speed = 1;
	productivity = 1;
	pollution = 1;
}

export const modules: ModuleInfo[] = moduleNames.map(name => new ModuleInfo(name));