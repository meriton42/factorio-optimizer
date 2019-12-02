import { Res } from './res';
import { crafts, CraftInfo, ProducerType, producers, ProducerInfo } from "./crafts";
import { state } from './state';
import { ModuleInfo, modules, ModuleEffect, NoModule } from './modules';

let fullInfo: {[R in Res]?: {producerType: ProducerType, info: CraftInfo}};
let report: {[R in Res]?: ReturnType<typeof createReport>};

export function calculate() {
	fullInfo = {};
  for (const producerType in crafts) {
    for (const product in crafts[producerType]) {
			fullInfo[product] = {producerType, info: crafts[producerType][product]};
    }
	}
	report = {};
	for (const product in fullInfo) {
		getReport(product as Res);
	}
	const {energy, ...reports} = report;
	console.log("60kW cause " + 60 * energy.pollution + " pollution");
  return Object.values(reports);
}

function getReport(product: Res) {
	if (!report[product]) {
		report[product] = createReport(product);
	}
	return report[product];
}

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

	let pollutionByProducer = producer.pollution * time;
	let pollutionByEnergy = (product == "coal") ? 0  // not quite correct, but close enough, and prevents infinite recursion
													: producer.burns ? producer.burns * time / 4000 * getReport("coal").pollution
													: producer.energy ? producer.energy * time * getReport("energy").pollution 
													: 0;

	let pollutionByInputs = 0;
	for (const res in info.consumes) {
		const amount = info.consumes[res];
		pollutionByInputs += getReport(res as Res).pollution * amount;
	}

	const availableModules = modules.filter(module => state.available[module.name] && !(module.name.startsWith("productivity") && info.placeable));
	const minIndexForBeacon = availableModules.findIndex(module => !module.name.startsWith("productivity"));
	const slots = producer.slots;
	const beaconSlots = state.beaconSlots[product];
	let bestPollution = Infinity;
	let bestEffect = null;
	let bestModules: ModuleInfo[] = [];
	const explore = (index: number, currentModules: ModuleInfo[], currentEffect: ModuleEffect) => {
		const pollution = pollutionByProducer * currentEffect.producerPollutionFactor
										+ pollutionByEnergy * currentEffect.energyPollutionFactor
										+ pollutionByInputs * currentEffect.inputPollutionFactor;
		if (pollution < bestPollution) {
			bestPollution = pollution;
			bestEffect = currentEffect;
			bestModules = [...currentModules];
		}

		if (currentModules.length < slots + beaconSlots) {
			if (currentModules.length >= slots) {
				index = Math.max(index, minIndexForBeacon);
			}
			for (let i = index; i < availableModules.length; i++) {
				const module = availableModules[i];
				currentModules.push(module);
				explore(i, currentModules, currentEffect.plus(module));
				currentModules.pop();
			}
		}
	}
	explore(0, [], new NoModule());

	pollutionByProducer *= bestEffect.producerPollutionFactor;
	pollutionByEnergy *= bestEffect.energyPollutionFactor;
	pollutionByInputs *= bestEffect.inputPollutionFactor;

	const pollutionByCraft = pollutionByProducer + pollutionByEnergy;

	const items = (producer.production || 1) * (info.produces || 1);
	const pollution = (pollutionByCraft + pollutionByInputs) / items;

	return {
		producerName,
		product,
		time,
		pollutionByProducer,
		pollutionByEnergy,
		pollutionByCraft,
		pollutionByInputs,
		pollution,
		bestModules,
	}
}