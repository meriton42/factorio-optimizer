import { crafts, CraftInfo, ProducerType, Res, producers, ProducerInfo } from "./crafts";
import { state } from './state';

let fullInfo: {[R in Res]?: {producerType: ProducerType, info: CraftInfo}};
let report: {[R in Res]?: ReturnType<typeof getReport>};

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
  return Object.values(reports);
}

function getReport(product: Res) {
	if (!report[product]) {
		if (!fullInfo[product]) {
			throw new Error("don't know how to make " + product);
		}
		const {producerType, info} = fullInfo[product];
		const producerName = state.preferredProducer[producerType];
		const producer = producers[producerType][producerName] as ProducerInfo;
		const time = info.miningTime 
			? info.miningTime / (producer.miningSpeed * (producer.miningPower - info.miningHardness)) 
			: info.time / producer.speed;
	
		const items = (producer.production || 1) * (info.produces || 1);
		const pollutionByCraft = producer.pollution * time;
		const pollutionByEnergy = (product == "coal") ? 0  // not quite correct, but close enough, and prevents infinite recursion
														: producer.burns ? producer.burns * time / 8000 * getReport("coal").pollution
														: producer.energy ? producer.energy * time * getReport("energy").pollution 
														: 0;
		let pollutionByInputs = 0;
		for (const res in info.consumes) {
			const amount = info.consumes[res];
			pollutionByInputs += getReport(res as Res).pollution * amount;
		}
		const pollution = (pollutionByCraft + pollutionByEnergy + pollutionByInputs) / items;

		report[product] = {
			producerName,
			product,
			time,
			pollutionByCraft,
			pollutionByEnergy,
			pollutionByInputs,
			pollution,
		}
	}

	return report[product];
}