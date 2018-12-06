import {domelements} from "./base";

const rendercab = (cab) => {
	const markup = `<li>
						<div class="car__imgwrapper">
							<img src="${cab.image}">
						</div>
						<div class="car__name">
							${cab.display_name}
						</div>
						<div class="car__description">
							${(cab.description).toLowerCase()}
						</div>
						<div class="car__price">
						</div>
					</li>`;

	domelements.carslist.insertAdjacentHTML("beforeend", markup);
}

export const rendercabs = (cabobj) => {
	cabobj.forEach(function(el){
		rendercab(el);
	});
};

export const clearcarslist = () => {
	domelements.carslist.textContent = '';
};

export const rendercabloader = () => {
	domelements.cabloader.style.display = 'block';
};

export const removecabloader = () => {
	domelements.cabloader.style.display = 'none';
};

export const renderpriceloader = () => {
	const carpricearr = Array.from(document.querySelectorAll(".car__price"));
	console.log(carpricearr);
	carpricearr.forEach( function(el) {
		el.classList.add("price__loader");
	});
}

export const removepriceloader = () => {
	const carpricearr = Array.from(document.querySelectorAll(".car__price"));
	console.log(carpricearr);
	carpricearr.forEach( function(el) {
		el.classList.remove("price__loader");
	});
}

export const renderestimates = (estimates) => {
	const carpricearr = Array.from(document.querySelectorAll(".car__price"));
	carpricearr.forEach( function(el, index) {
		el.textContent = estimates[index].estimate;
	});
}
