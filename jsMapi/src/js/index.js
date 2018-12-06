import {domelements} from "./views/base";
import Search from "./models/Search";
import Cab from "./models/Cab";
import * as searchview from "./views/searchview";
import * as cabview from "./views/cabview";
import axios from "axios";

let state = {};
window.state = state;
window.objtest = {
	"upfront_fare_enabled": true,
	"capacity": 3,
	"product_id": "de2ebf35-e333-4adf-a77e-119bc32c5671",
	"price_details": {
		"service_fees": [],
		"cost_per_minute": 0,
		"distance_unit": "km",
		"minimum": 15,
		"cost_per_distance": 9,
		"base": 6,
		"cancellation_fee": 0,
		"currency_code": "INR"
	},
	"image": "https://d1a3f4spazzrp4.cloudfront.net/car-types/mono/mono-autorickshaw.png",
	"cash_enabled": true,
	"shared": false,
	"short_description": "UberAuto",
	"display_name": "UberAuto",
	"product_group": "taxi",
	"description": "Auto rickshaws at the tap of a button"
};


//----------- INPUT CONTROLLER --------------//

async function ctrlinput(etarget){
	if(etarget.dataset.inputtype=="source"){
		let sourcequery = searchview.getsourcequery();
		if(sourcequery){
			// sourcequery is our search query
			// create new state object
			if(!state.search){
				state.search = new Search();
			}

			// fetch search results ajax
			//get search results of typed place
			state.sourceresults = await state.search.getsearchresults(sourcequery);

			// update search results on ui
			if(state.sourceresults){
				// display results box
				searchview.showresultsbox('source');

				//clear old results
				searchview.clearresultsbox('source');

				// display results
				state.sourceresults.forEach(function(res){
					searchview.rendersearch(res, "source");
				});
			}
		}
		else{
			searchview.clearresultsbox('source');
		}
	}

	// for destination
	if(etarget.dataset.inputtype=="destination"){
		let destinationquery = searchview.getdestinationquery();
		if(destinationquery){
			// sourcequery is our search query
			// create new state object
			if(!state.search){
				state.search = new Search();
			}

			// fetch search results ajax
			//get search results of typed place
			state.destresults = await state.search.getsearchresults(destinationquery);

			// update search results on ui
			if(state.destresults){
				// display results box
				searchview.showresultsbox('destination');

				//clear old results
				searchview.clearresultsbox('destination');

				// display results
				state.destresults.forEach(function(res){
					searchview.rendersearch(res, "destination");
				});
			}
		}
		else{
			searchview.clearresultsbox('destination');
		}
	}

}


const searchinputs = [domelements.inputsource, domelements.inputdestination];
searchinputs.forEach(function(el){
	let timeo;
	el.addEventListener("input", function(e){
		clearTimeout(timeo);
		timeo = setTimeout(function(){ctrlinput(e.target)}, 1000);
		//ctrlinput(e.target);
	});
});


domelements.resultssourcebox.addEventListener("click", function(e){
	const selid = e.target.closest(".search__result-item").dataset.resid;
	let ind = state.sourceresults.findIndex(function(el){
		return el.id == selid;
	});
	state.search.source = state.sourceresults[ind];
	// display source on input field
	searchview.setsourceinput(state.sourceresults[ind].title, state.sourceresults[ind].vicinity);

	searchview.hideresultsbox("source");
});

domelements.resultsdestinationbox.addEventListener("click", function(e){
	const selid = e.target.closest(".search__result-item").dataset.resid;
	let ind = state.destresults.findIndex(function(el){
		return el.id == selid;
	});
	state.search.destination = state.destresults[ind];
	// display source on input field
	searchview.setdestinationinput(state.destresults[ind].title, state.destresults[ind].vicinity);

	searchview.hideresultsbox("destination");
});



//------------ SEARCH BUTTON CONTROLLER -------------------//

/*
axios.get(
	url,
	{headers: {
		"Authorization" : "Token sgpJ5x1RPMCLnwWlE7BN5gl7DlTsqZMjMdTu3qh4"
	}
}
)
.then((response) => {
	var response = response.data;
	console.log(response);
},
(error) => {
	var status = error.response.status;
	console.log(status);
}
);
*/

async function ctrlsearch(){
	// get uber results and receive result object
	let uberres = await state.search.getuber(state.search.source, state.search.destination);
	return uberres;
}

domelements.locform.addEventListener("submit", async function(e){
	e.preventDefault();
	if(state.search){
		try{

			/*window.scrollTo({
				top: 1000,
				behavior: 'smooth',
			});*/
			//clear cars list
			cabview.clearcarslist();

			//add loader to ui
			cabview.rendercabloader();
			window.scrollTo({
				//top: window.innerHeight,
				top: document.body.scrollHeight,
				behavior: 'smooth',
			});

			// await call results
			const uberres = await ctrlsearch();

			//now we have the search results ab baki kaam cab.js ka - Hand over object to cab
			// if we got something back create a new uber cab object
			// if no cab object, create one
			if(uberres){
				if(!state.cab){
					state.cab = {};
				}
				// set uber details to new created uber object
				state.cab = new Cab("uber", uberres);
				console.log(state.cab.cabsobj);
				
				// filter uber object
				state.cab.filtercabs();
				console.log(state.cab.cabsobj);

				// we have images, get fareids for all objects and request a fare for all product ids and far ids

				// til then we render all cabs on ui
				
				//clear cabs area
				cabview.clearcarslist();

				// remove loader
				cabview.removecabloader();

				//display results on ui
				cabview.rendercabs(state.cab.cabsobj);
				cabview.renderpriceloader();
				window.scrollTo({
					//top: window.innerHeight+300,
					top: document.body.scrollHeight,
					behavior: 'smooth',
				});

				// add price loader under all cabs
				

				// fetch fare for all products
				const estobj = await state.search.getestimate();
				console.log(estobj);
				state.cab.setestimates(estobj.data.prices);

				// filter estimate object to filtered cabs
				state.cab.filterestimates();

				// replace price loader with fare
				const estimates = state.cab.getestimates();
				cabview.removepriceloader();
				cabview.renderestimates(estimates);

			}
		}catch(err){
			//there was a search but problem in searching cabs specifically...thnkso
			console.log(err);
			// remove loader and show error
			cabview.removecabloader();
			alert("problem in searching cabs");
		}
	}
});