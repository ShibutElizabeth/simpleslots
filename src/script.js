
// Mapping of indexes to icons on the strip: start from the 2nd item and then upwards
const iconMap = [ 
	"one", "eight", "zero", "four", "seven", 
	"two", "three", "six", "nine", "five"
];
const iconWidth = 100; // Width of the icons
const iconHeight = 100; // Height of one icon in the strip
const numOfIcons = 10; // Number of icons in the strip
const iconSpeed = 100; // Max-speed in ms for animating one icon down
const indexes = [0, 0, 0]; // Holds icon indexes
// const debugEl = document.querySelector('#debug');

const numOfSpins = 5; // Number of the strip spins
const hardcodedValue = 12; // 10+2 (numOfIcons + "zero" icon index)


const roll = (reel, offset = 0) => {
	//target icon calculations
	const delta = offset === 0 
		? (offset + numOfSpins) * numOfIcons + hardcodedValue 
		: (offset + numOfSpins) * numOfIcons + Math.round(Math.random() * numOfIcons); 

	return new Promise((resolve, reject) => {
		
		const style = getComputedStyle(reel);
		const backgroundPositionY = parseFloat(style["background-position-y"]);
		const targetBackgroundPositionY = backgroundPositionY + delta * iconHeight;
		const normTargetBackgroundPositionY = targetBackgroundPositionY%(numOfIcons * iconHeight);
		
		setTimeout(() => { 
			reel.style.transition = `background-position-y ${(8 + 1 * delta) * iconSpeed}ms cubic-bezier(.41,-0.01,.63,1.09)`;
			reel.style.backgroundPositionY = `${backgroundPositionY + delta * iconHeight}px`;
		}, offset * 150);
			
		setTimeout(() => {
			reel.style.transition = `none`;
			reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
			resolve(delta % numOfIcons);
		}, (8 + 1 * delta) * iconSpeed + offset * 150);
	});
};

rollAll = () => {
	const reelsList = document.querySelectorAll('.reel');

	Promise
		.all([...reelsList].map((reel, i) => roll(reel, i)))	
		.then((deltas) => {
			// add up indexes
			deltas.forEach((delta, i) => indexes[i] = (indexes[i] + delta)%(numOfIcons));
			// debugEl.textContent = indexes.map((i) => iconMap[i]).join(' - ');
		});
};

// setTimeout start
setTimeout(rollAll, 1000);

// EventListener start
// document.body.addEventListener(('click'), rollAll, {once: true});
