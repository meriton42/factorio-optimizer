const _modules = {
	productivityModule: {
		energy: 0.40,
		speed: -0.05,
		productivity: 0.04,
		pollution: 0.05,
	},
	productivityModule2: {
		energy: 0.60,
		speed: -0.10,
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

export class ModuleSet {
	energy = 0;
	speed = 0;
	productivity = 0;
	pollution = 0;
	cost = 0;

	previous!: ModuleSet;
	last!: ModuleInfo;

	plus(m: ModuleInfo) {
		const r = new ModuleSet();
		r.speed = this.speed + m.speed;
		r.energy = this.energy + m.energy;
		r.pollution = this.pollution + m.pollution;
		r.productivity = this.productivity + m.productivity;
		r.cost = this.cost + m.cost;

		r.previous = this;
		r.last = m;

		return r;
	}

	get effectOn() {
		const energy = Math.max(this.energy, 0.2);
		const inputPollution = 1 / this.productivity;
		const producerTime = 1 / this.speed / this.productivity;
		const producerPollution = producerTime * energy * this.pollution;
		const energyPollution = producerTime * energy;
		return {
			producerTime,
			producerPollution,
			energyPollution,
			inputPollution,
		}
	}

	get elements(): ModuleInfo[] {
		return [...this.previous.elements, this.last];
	}
}
export class ModuleInfo extends ModuleSet {
	constructor(public name: ModuleName) {
		super();
		Object.assign(this, _modules[name]);
	}
}
export class NoModule extends ModuleSet {
	override energy = 1;
	override speed = 1;
	override productivity = 1;
	override pollution = 1;

	override get elements() {
		return [] as ModuleInfo[];
	}
}

export const modules: ModuleInfo[] = moduleNames.map(name => new ModuleInfo(name));