import {domelements} from "./base.js";

export const getsourcequery = () => {
	return domelements.inputsource.value;
}

export const getdestinationquery = () => {
	return domelements.inputdestination.value;
}


export const showresultsbox = (type) => {
	let element = `results${type}box`;
	domelements[element].parentElement.style.display = "block";
}

export const hideresultsbox = (type) => {
	let element = `results${type}box`;
	domelements[element].parentElement.style.display = "none";
}

export const clearresultsbox = (type)=>{
	let element = `results${type}box`;
	domelements[element].textContent="";
}

export const rendersearch = (res, type) => {
	const markup = `
	<li class="search__result-item" data-resid="${res.id}">
		<div class="search__result-title">${res.title}</div>
		<div class="search__result-near">${res.vicinity}</div>
	</li>
	`;

	//let restype = (type=="source"?"source":"destination");
	let element = `results${type}box`;

	domelements[element].insertAdjacentHTML("beforeend",markup);

}

export const setsourceinput = (title, near)=>{
	near = near.replace("<br/>","");
	domelements.inputsource.value = `${title}, ${near}`;
}

export const setdestinationinput = (title, near)=>{
	near = near.replace("<br/>","");
	domelements.inputdestination.value = `${title}, ${near}`;
}