import { ProducerType, ProducerName } from "./crafts";
import { ModuleName } from './modules';
import { emptyCart, Res } from './res';

interface State {
	preferredProducer: {[P in ProducerType]: ProducerName<P>};
	available: {[P in ModuleName]?: boolean};
	beaconSlots: {[R in Res]?: number};
}

const defaultState: State = {
	preferredProducer: {
		mine: "electricMiningDrill",
		furnace: "steelFurnace",
		assembly: "assemblingMachine3",
		energy: "boiler",
		pumpJack: "pumpJack",
		oilRefinery: "oilRefinery",
		chemicalPlant: "chemicalPlant",
	},
	available: {},
	beaconSlots: {...emptyCart},
}

function merge(x, y) {
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
	return JSON.parse(localStorage.factorioOptimizerState || "{}");
}

export function saveState() {
	localStorage.factorioOptimizerState = JSON.stringify(state);
}