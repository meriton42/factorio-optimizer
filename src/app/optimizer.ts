import { Res } from './res';
import { crafts, CraftInfo, ProducerType, producers, ProducerInfo } from "./crafts";
import { state } from './state';
import { modules, ModuleSet, NoModule } from './modules';

let fullInfo: {[R in Res]?: {producerType: ProducerType, info: CraftInfo}};
let previousReport: {[R in Res]?: Report};
let report: {[R in Res]?: Report};

export function calculate() {
	fullInfo = {};
  for (const producerType in crafts) {
    for (const product in crafts[producerType]) {
			fullInfo[product] = {producerType, info: crafts[producerType][product]};
    }
	}

	// since energy and investment considerations create cyclic dependencies
	// we perform a few iterations to approach the fix point 
	// (this should converge because prices are monotonically increasing across iterations)
	previousReport = {};
	for (let i = 0; i < 10; i++) {
		report = {};
		for (const product in fullInfo) {
			getReport(product as Res);
		}
		previousReport = report;
	}
	const {energy, ...reports} = report;
	console.log("60kW cause " + 60 * energy.pollution.perItem + " pollution");
  return Object.values(reports);
}

function getReport(product: Res): Report {
	if (!report[product]) {
		report[product] = createReport(product);
	}
	return report[product];
}

function getPreviousReport(product: Res): {pollution: {perItem: number}} {
	return previousReport[product] || {
		pollution: {
			perItem: 0,
		}
	};
}

type Report = ReturnType<typeof createReport>;
function createReport(product: Res) {
	if (!fullInfo[product]) {
		throw new Error("don't know how to make " + product);
	}

	const {producerType, info} = fullInfo[product];
	const producerName = state.preferredProducer[producerType];
	const producer = producers[producerType][producerName] as ProducerInfo;
	const time = info.miningTime 
		? info.miningTime / producer.miningSpeed
		: info.time / producer.speed;

	const producerInvestment: number = getPreviousReport(producerName).pollution.perItem;
	const pollutionByProducer = producer.pollution / 60 * time;
	const pollutionByEnergy: number = producer.burns ? producer.burns * time / 4000 * getPreviousReport("coal").pollution.perItem
													: producer.energy ? producer.energy * time * getPreviousReport("energy").pollution.perItem
													: 0;

	let pollutionByInputs = 0;
	for (const res in info.consumes) {
		const amount = info.consumes[res];
		pollutionByInputs += getReport(res as Res).pollution.perItem * amount;
	}

	const items = (producer.production || 1) * (info.produces || 1);

	const calculatePollution = (modules: ModuleSet) => {
		const {effectOn} = modules;
		const inputs = pollutionByInputs * effectOn.inputPollution;
		const investment = (producerInvestment + modules.cost) * time * effectOn.producerTime / Math.max(state.amortizeOver * 3600, 600);
		const producer = pollutionByProducer * effectOn.producerPollution;
		const energy = pollutionByEnergy * effectOn.energyPollution;
		const perItem = (inputs + investment + producer + energy) / items;
		return {
			inputs,
			investment,
			producer,
			energy,
			perItem,
		}
	}
	
	const availableModules = modules.filter(module => state.available[module.name] && !(module.name.startsWith("productivity") && info.placeable));
	const minIndexForBeacon = availableModules.findIndex(module => !module.name.startsWith("productivity"));
	const slots = producer.slots;
	const beaconSlots = state.beaconSlots[product];
	for (const module of availableModules) {
		module.cost = getPreviousReport(module.name).pollution.perItem;
	}	

	let bestPollution = Infinity;
	let bestModules: ModuleSet = null;
	const explore = (index: number, size: number, currentModules: ModuleSet) => {
		const pollution = calculatePollution(currentModules);
		if (pollution.perItem < bestPollution) {
			bestPollution = pollution.perItem;
			bestModules = currentModules;
		}

		if (size < slots + beaconSlots) {
			if (size >= slots) {
				index = Math.max(index, minIndexForBeacon);
			}
			for (let i = index; i < availableModules.length; i++) {
				const module = availableModules[i];
				explore(i, size + 1, currentModules.plus(module));
			}
		}
	}
	explore(0, 0, new NoModule());

	return {
		producerName,
		product,
		time,
		pollution: calculatePollution(bestModules),
		bestModules: bestModules.elements,
	}
}