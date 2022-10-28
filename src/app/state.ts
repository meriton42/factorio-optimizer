import { ProducerType, ProducerName } from "./crafts";
import { ModuleName } from './modules';
import { emptyCart, emptyScienceCart, Res, ScienceRes } from './res';

interface State {
	preferredProducer: {[P in ProducerType]: ProducerName<P>};
	available: {[P in ModuleName]?: boolean};
	beaconSlots: {[R in Res]?: number};
	amortizeOver: number;
	scienceTime: number;
	scienceSpeed: number;
	sciencePacks: {[R in ScienceRes]?: number};
}

const defaultState: State = {
	preferredProducer: {
		mine: "electricMiningDrill",
		furnace: "steelFurnace",
		assembly: "assemblingMachine3",
		energy: "boiler",
		pumpjack: "pumpjack",
		oilRefinery: "oilRefinery",
		chemicalPlant: "chemicalPlant",
		research: "lab",
	},
	available: {},
	beaconSlots: {...emptyCart},
	amortizeOver: 4,
	scienceTime: 60,
	scienceSpeed: 100,
	sciencePacks: emptyScienceCart,
}

function merge(x: any, y: any) {
	const r = {...x, ...y}; // shallow copy first level
	for (const k in x) {
		if (x[k] instanceof Object && x[k] != r[k]) {
			r[k] = {...x[k], ...r[k]}; // shallow copy second level
		}
	}
	return r;
}

export const state: State = merge(defaultState, readState());

function readState() {
	return JSON.parse(localStorage['factorioOptimizerState'] || "{}");
}

export function saveState() {
	localStorage['factorioOptimizerState'] = JSON.stringify(state);
}