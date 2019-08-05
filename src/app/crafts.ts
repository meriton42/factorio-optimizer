export type Res = 
	"stone"
	| "coal"
	| "ironOre"
	| "ironPlate"
	| "ironGearWheel"
	| "transportBelt"
	| "pipe"
	| "steelPlate"
	| "copperOre"
	| "copperPlate"
	| "copperCable"
	| "electronicCircuit"
	| "inserter"
	| "crudeOil"
	| "petroleumGas"
	| "plasticBar"
	| "advancedCircuit"
	| "electricMiningDrill"
	| "engineUnit"
	| "sciencePack1"
	| "sciencePack2"
	| "sciencePack3"
	| "energy";

export type Cart = {[K in Res]?: number};

export interface ProducerInfo {
	miningPower?: number;
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
			pollution: 27.6923,
			production: 1800, // kW
			burns: 3600, // kW
			speed: 1,
			slots: 0,
		},
		solar: {
			pollution: 0,
			production: 60,
			energy: 0,
			speed: 1,
			slots: 0,
		}
	},
	mine: {
		burnerMiningDrill: {
			miningPower: 2.5,
			miningSpeed: 0.35,
			burns: 300,
			pollution: 10,
			slots: 0,
		},
		electricMiningDrill: {
			miningPower: 3,
			miningSpeed: 0.5,
			energy: 90,
			pollution: 9,
			slots: 3,
		},
	},
	furnace: {
		stoneFurnace: {
			speed: 1,
			pollution: 1.8,
			burns: 180,
			slots: 0,
		},
		steelFurnace: {
			speed: 2,
			pollution: 3.6,
			burns: 180,
			slots: 0,
		},
		electricFurnace: {
			speed: 2,
			pollution: 0.9,
			energy: 180,
			slots: 2,
		}
	},
	assembly: {
		assemblingMachine1: {
			speed: 0.5,
			pollution: 3,
			energy: 90,
			slots: 0,
		},
		assemblingMachine2: {
			speed: 0.75,
			pollution: 2.4,
			energy: 150,
			slots: 2,
		},
		assemblingMachine3: {
			speed: 1.25,
			pollution: 1.8,
			energy: 210,
			slots: 4,
		},
	},
	pumpJack: {
		pumpJack: {
			speed: 1,
			pollution: 9,
			energy: 90,
			slots: 2,
		}
	},
	oilRefinery: {
		oilRefinery: {
			speed: 1,
			energy: 420,
			pollution: 3.6,
			slots: 3,
		}
	},
	chemicalPlant: {
		chemicalPlant: {
			speed: 1.25,
			energy: 210,
			pollution: 1.8,
			slots: 3
		}
	},
}
export type ProducerType = keyof typeof _producers;
export type ProducerName<P extends ProducerType> = keyof typeof _producers[P];
export const producers: {[P in ProducerType]: {[N in ProducerName<P>]: ProducerInfo}} = _producers;
export const producerTypes = Object.keys(producers);
export function producerNames(producerType: ProducerType) {
	return Object.keys(producers[producerType]);
}

export interface CraftInfo {
	miningHardness?: number;
	miningTime?: number;
	time?: number;
	consumes?: Cart;
	produces?: number;
	/** placeable products can not accept productivity modules */
	placeable?: boolean; 
}

export const crafts: {[P in ProducerType]?: {[R in Res]?: CraftInfo}} = {
	energy: {
		energy: {
			time: 1,
		}
	},
	mine: {
		coal: {
			miningHardness: 0.9,
			miningTime: 2,
		},
		ironOre: {
			miningHardness: 0.9,
			miningTime: 2,
		},
		copperOre: {
			miningHardness: 0.9,
			miningTime: 2,
		},
		stone: {
			miningHardness: 0.4,
			miningTime: 2,
		},
	},
	furnace: {
		copperPlate: {
			time: 3.5,
			consumes: {
				copperOre: 1,
			},
		},
		ironPlate: {
			time: 3.5,
			consumes: {
				ironOre: 1,
			},
		},
		steelPlate: {
			time: 17.5,
			consumes: {
				ironPlate: 5,
			},
		},
	},
	assembly: {
		ironGearWheel: {
			time: 0.5,
			consumes: {
				ironPlate: 2,
			},
		},
		transportBelt: {
			produces: 2,
			time: 0.5,
			consumes: {
				ironPlate: 1,
				ironGearWheel: 1,
			},
			placeable: true,
		},
		pipe: {
			time: 0.5,
			consumes: {
				ironPlate: 1,
			},
			placeable: true,
		},
		copperCable: {
			produces: 2,
			time: 0.5,
			consumes: {
				copperPlate: 1,
			}
		},
		electronicCircuit: {
			time: 0.5,
			consumes: {
				ironPlate: 1,
				copperCable: 3,
			}
		},
		inserter: {
			time: 0.5,
			consumes: {
				electronicCircuit: 1,
				ironGearWheel: 1,
				ironPlate: 1,
			},
			placeable: true,
		}, 
		advancedCircuit: {
			time: 6,
			consumes: {
				copperCable: 4,
				electronicCircuit: 2,
				plasticBar: 2,
			}
		},
		electricMiningDrill: {
			time: 2,
			consumes: {
				electronicCircuit: 3,
				ironGearWheel: 5,
				ironPlate: 10,
			}, 
			placeable: true,
		},
		engineUnit: {
			time: 10,
			consumes: {
				ironGearWheel: 1,
				pipe: 2,
				steelPlate: 1,
			}
		},
		sciencePack1: {
			time: 5,
			consumes: {
				copperPlate: 1,
				ironGearWheel: 1,
			}
		},
		sciencePack2: {
			time: 6,
			consumes: {
				inserter: 1,
				transportBelt: 1,
			}
		},
		sciencePack3: {
			time: 12,
			consumes: {
				advancedCircuit: 1,
				electricMiningDrill: 1,
				engineUnit: 1,
			}
		}
	},
	pumpJack: {
		crudeOil: {
			time: 1,
			produces: 4, // minimum yield for average field would be 2
			consumes: {},
		}
	},
	oilRefinery: {
		petroleumGas: {
			time: 5,
			produces: 55, // assuming advanced oil processing
			consumes: {
				crudeOil: 100,
			}
		}
	},
	chemicalPlant: {
		plasticBar: {
			time: 1,
			produces: 2,
			consumes: {
				coal: 1,
				petroleumGas: 1,
			}
		},
	}
}

