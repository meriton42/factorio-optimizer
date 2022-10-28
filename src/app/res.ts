import { knownKeys } from "./record-utils";

export const emptyScienceCart = {
	automationSciencePack: 0,
	logisticSciencePack: 0,
	militarySciencePack: 0,
	chemicalSciencePack: 0,
	productionSciencePack: 0,
	utilitySciencePack: 0,
	spaceSciencePack: 0,
}

export const emptyCart = {
  stone: 0,
	coal: 0,
	ironOre: 0,
	ironPlate: 0,
	ironStick: 0,
	ironGearWheel: 0,
	transportBelt: 0,
	rail: 0,
	pipe: 0,
	steelPlate: 0,
	stoneBrick: 0,
	copperOre: 0,
	copperPlate: 0,
	copperCable: 0,
	electronicCircuit: 0,
	inserter: 0,
	crudeOil: 0,
	petroleumGas: 0,
	sulfuricAcid: 0,
	sulfur: 0,
	plasticBar: 0,
	advancedCircuit: 0,
	processingUnit: 0,
	electricMiningDrill: 0,
	engineUnit: 0,
	electricEngineUnit: 0,
	flyingRobotFrame: 0,
	electricFurnace: 0,
	battery: 0,
	lowDensityStructure: 0,
	efficiencyModule: 0,
	efficiencyModule2: 0,
	efficiencyModule3: 0,
	speedModule: 0,
	speedModule2: 0,
	speedModule3: 0,
	productivityModule: 0,
	productivityModule2: 0,
	productivityModule3: 0,
	...emptyScienceCart,
	boiler: 0,
	solarPanel: 0,
	burnerMiningDrill: 0,
	stoneFurnace: 0,
	steelFurnace: 0,
	assemblingMachine1: 0,
	assemblingMachine2: 0,
	assemblingMachine3: 0,
	pumpjack: 0,
	oilRefinery: 0,
	chemicalPlant: 0,
	lab: 0,
	energy: 0,
	research: 0,
}

export const sciencePackNames = knownKeys(emptyScienceCart);

export type ScienceRes = keyof typeof emptyScienceCart;
export type Res = keyof typeof emptyCart;
export type Cart = {[K in Res]?: number};