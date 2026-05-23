import { knownKeys } from './record-utils';

export interface ProducerInfo {
	miningSpeed?: number;
	speed?: number;
	burns?: number;
	energy?: number;
	pollution: number;
	slots: number;
	production?: number;
}

const _producers = {
	energy: {
		boiler: {
			pollution: 30,
			production: 1800, // kW
			burns: 1800, // kW
			speed: 1,
			slots: 0,
		},
		solarPanel: {
			pollution: 0,
			production: 60,
			energy: 0,
			speed: 1,
			slots: 0,
		}
	},
	mine: {
		burnerMiningDrill: {
			miningSpeed: 0.25,
			burns: 150,
			pollution: 12,
			slots: 0,
		},
		electricMiningDrill: {
			miningSpeed: 0.5,
			energy: 90,
			pollution: 10,
			slots: 3,
		},
	},
	furnace: {
		stoneFurnace: {
			speed: 1,
			pollution: 2,
			burns: 90,
			slots: 0,
		},
		steelFurnace: {
			speed: 2,
			pollution: 4,
			burns: 90,
			slots: 0,
		},
		electricFurnace: {
			speed: 2,
			pollution: 1,
			energy: 180,
			slots: 2,
		}
	},
	assembly: {
		assemblingMachine1: {
			speed: 0.5,
			pollution: 4,
			energy: 75,
			slots: 0,
		},
		assemblingMachine2: {
			speed: 0.75,
			pollution: 3,
			energy: 150,
			slots: 2,
		},
		assemblingMachine3: {
			speed: 1.25,
			pollution: 2,
			energy: 375,
			slots: 4,
		},
	},
	pumpjack: {
		pumpjack: {
			speed: 1,
			pollution: 10,
			energy: 90,
			slots: 2,
		}
	},
	oilRefinery: {
		oilRefinery: {
			speed: 1,
			energy: 420,
			pollution: 6,
			slots: 3,
		}
	},
	chemicalPlant: {
		chemicalPlant: {
			speed: 1,
			energy: 210,
			pollution: 4,
			slots: 3
		}
	},
	research: {
		lab: {
			speed: 1,
			energy: 60,
			pollution: 0,
			slots: 2,
		}
	}
}
export type ProducerType = keyof typeof _producers;
export type ProducerName<P extends ProducerType> = keyof typeof _producers[P];
export const producers: {[P in ProducerType]: {[N in ProducerName<P>]: ProducerInfo}} = _producers;
export const producerTypes = knownKeys(producers);
export function producerNames<T extends ProducerType>(producerType: T) {
	return Object.keys(producers[producerType]);
}