import { ProducerType } from "./producer";
import { Cart, Res } from "./res";

export interface RecipeInfo {
	miningTime?: number;
	time?: number;
	consumes?: Cart;
	produces?: number;
	/** placeable products can not accept productivity modules */
	placeable?: boolean; 
}

export const recipes: {[P in ProducerType]: {[R in Res]?: RecipeInfo}} = {
	energy: {
		energy: {
			time: 1,
		}
	},
	mine: {
		coal: {
			miningTime: 1,
		},
		ironOre: {
			miningTime: 1,
		},
		copperOre: {
			miningTime: 1,
		},
		stone: {
			miningTime: 1,
		},
	},
	furnace: {
		copperPlate: {
			time: 3.2,
			consumes: {
				copperOre: 1,
			},
		},
		ironPlate: {
			time: 3.2,
			consumes: {
				ironOre: 1,
			},
		},
		steelPlate: {
			time: 16,
			consumes: {
				ironPlate: 5,
			},
		},
		stoneBrick: {
			time: 3.2,
			consumes: {
				stone: 2,
			}
		}
	},
	assembly: {
		ironStick: {
			produces: 2,
			time: 0.5,
			consumes: {
				ironPlate: 1,
			}
		},
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
		rail: {
			produces: 2,
			time: 0.5,
			consumes: {
				ironStick: 1,
				steelPlate: 1,
				stone: 1,
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
		processingUnit: {
			time: 10,
			consumes: {
				advancedCircuit: 2,
				electronicCircuit: 20,
				sulfuricAcid: 5,
			}
		},
		efficiencyModule: {
			time: 15,
			consumes: {
				advancedCircuit: 5,
				electronicCircuit: 5,				
			}, 
			placeable: true,
		},
		efficiencyModule2: {
			time: 30,
			consumes: {
				advancedCircuit: 5,
				efficiencyModule: 4,
				processingUnit: 5,
			}, 
			placeable: true
		},
		efficiencyModule3: {
			time: 60,
			consumes: {
				advancedCircuit: 5,
				efficiencyModule2: 5,
				processingUnit: 5,
			},
			placeable: true
		},
		speedModule: {
			time: 15,
			consumes: {
				advancedCircuit: 5,
				electronicCircuit: 5,				
			}, 
			placeable: true,
		},
		speedModule2: {
			time: 30,
			consumes: {
				advancedCircuit: 5,
				processingUnit: 5,
				speedModule: 4,
			},
			placeable: true,
		},
		speedModule3: {
			time: 60,
			consumes: {
				advancedCircuit: 5,
				processingUnit: 5,
				speedModule2: 5,
			},
			placeable: true,
		},
		productivityModule: {
			time: 15,
			consumes: {
				advancedCircuit: 5,
				electronicCircuit: 5,
			},
			placeable: true,
		},
		productivityModule2: {
			time: 30,
			consumes: {
				advancedCircuit: 5,
				processingUnit: 5,
				productivityModule: 4,
			},
			placeable: true,
		},
		productivityModule3: {
			time: 60,
			consumes: {
				advancedCircuit: 5,
				processingUnit: 5,
				productivityModule2: 5,
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
		electricEngineUnit: {
			time: 10,
			consumes: {
				electronicCircuit: 2,
				engineUnit: 1,
				// heavyOil: 15  // byproduct of oil processing, does not cause additional pollution
			}
		},
		flyingRobotFrame: {
			time: 20,
			consumes: {
				battery: 2,
				electricEngineUnit: 1,
				electronicCircuit: 3,
				steelPlate: 1,
			}
		},
		lowDensityStructure: {
			time: 20,
			consumes: {
				copperPlate: 20,
				plasticBar: 5,
				steelPlate: 2,
			}
		},
		electricFurnace: {
			time: 5,
			consumes: {
				advancedCircuit: 5,
				steelPlate: 10,
				stoneBrick: 10,
			},
			placeable: true,
		},
		automationSciencePack: {
			time: 5,
			consumes: {
				copperPlate: 1,
				ironGearWheel: 1,
			}
		},
		logisticSciencePack: {
			time: 6,
			consumes: {
				inserter: 1,
				transportBelt: 1,
			}
		},
		chemicalSciencePack: {
			produces: 2,
			time: 24,
			consumes: {
				advancedCircuit: 3,
				engineUnit: 2,
				sulfur: 1,
			}
		},
		productionSciencePack: {
			produces: 3,
			time: 21,
			consumes: {
				electricFurnace: 1,
				productivityModule: 1,
				rail: 30,
			}
		},
		utilitySciencePack: {
			produces: 3,
			time: 21,
			consumes: {
				flyingRobotFrame: 1,
				lowDensityStructure: 3,
				processingUnit: 2, 
			}
		},
		boiler: {
			time: 0.5,
			consumes: {
				pipe: 4,
				stoneFurnace: 1,
			},
			placeable: true,
		},
		solarPanel: {
			time: 10, 
			consumes: {
				copperPlate: 5,
				electronicCircuit: 15,
				steelPlate: 5,
			},
			placeable: true,
		},
		burnerMiningDrill: {
			time: 2,
			consumes: {
				ironGearWheel: 3,
				ironPlate: 3,
				stoneFurnace: 1,
			},
			placeable: true,
		},
		electricMiningDrill: {
			time: 2,
			consumes: {
				electronicCircuit: 3,
				ironGearWheel: 5,
				ironPlate: 10
			},
			placeable: true,
		},
		stoneFurnace: {
			time: 0.5,
			consumes: {
				stone: 5,
			},
			placeable: true,
		},
		steelFurnace: {
			time: 3,
			consumes: {
				steelPlate: 6,
				stoneBrick: 10,
			},
			placeable: true,
		},
		assemblingMachine1: {
			time: 0.5,
			consumes: {
				electronicCircuit: 3,
				ironGearWheel: 5,
				ironPlate: 9,
			},
			placeable: true,
		},
		assemblingMachine2: {
			time: 0.5,
			consumes: {
				assemblingMachine1: 1,
				electronicCircuit: 3,
				ironGearWheel: 5,
				steelPlate: 2
			},
			placeable: true,
		},
		assemblingMachine3: {
			time: 0.5,
			consumes: {
				assemblingMachine2: 2,
				speedModule: 4,
			},
			placeable: true,
		},
		pumpjack: {
			time: 5,
			consumes: {
				electronicCircuit: 5,
				ironGearWheel: 10,
				pipe: 10,
				steelPlate: 5
			},
			placeable: true,
		},
		oilRefinery: {
			time: 8,
			consumes: {
				electronicCircuit: 10,
				ironGearWheel: 10,
				pipe: 10,
				steelPlate: 15,
				stoneBrick: 10,
			},
			placeable: true,
		},
		chemicalPlant: {
			time: 5,
			consumes: {
				electronicCircuit: 5,
				ironGearWheel: 5,
				pipe: 5,
				steelPlate: 5
			},
			placeable: true,
		},
		lab: {
			time: 2,
			consumes: {
				electronicCircuit: 10,
				ironGearWheel: 10,
				transportBelt: 4,
			},
			placeable: true,
		}
	},
	pumpjack: {
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
				petroleumGas: 20,
			}
		},
		sulfur: {
			time: 1,
			produces: 2,
			consumes: {
				petroleumGas: 30,
			}
		},
		sulfuricAcid: {
			time: 1,
			produces: 50,
			consumes: {
				ironPlate: 1,
				sulfur: 5,
			}
		},
		battery: {
			time: 4,
			consumes: {
				copperPlate: 1,
				ironPlate: 1,
				sulfuricAcid: 20,
			}
		}
	},
	research: {
		research: {
			// will be overwritten by state
		},
	},
}