import axios from "axios";
import "../config.js";

export default class Search{

	constructor(){
		this.source = {},
		this.destination = {}
	}

	async getsearchresults(query){
		try{
			const res = await axios(`https://places.cit.api.here.com/places/v1/discover/search?app_id=Tbw9lL0PjkB30mDXSVuy&app_code=Z1-XCVVpFpFcqs4UemmIHA&at=26.89458,75.83767&q=${query}`);
			return res.data.results.items;
		}catch(e){
			alert("something went wrong");
			console.log(e);
		}
	}

	async getuber(source, destination){
		//let url = `${proxy}https://sandbox-api.uber.com/v1.2/estimates/price?start_latitude=${source.position[0]}&start_longitude=${source.position[1]}&end_latitude=${destination.position[0]}&end_longitude=${destination.position[1]}`;

		let url = `${proxy}https://sandbox-api.uber.com/v1.2/products?latitude=${source.position[0]}&longitude=${source.position[1]}`;
		try{
			let res = await axios.get(
				url,
				{
					headers: {
						"Authorization" : "Token sgpJ5x1RPMCLnwWlE7BN5gl7DlTsqZMjMdTu3qh4"
					}
				})
			.then((response) => {
				let uberresult = response.data;
				return uberresult;
			},
			(error) => {
				var err = error.response.status;
				console.log(err);
			});
			return res;
		}
		catch(e){
			alert(e);
		}

	}

	async getestimate(){
		let url = `${proxy}https://sandbox-api.uber.com/v1.2/estimates/price?&start_latitude=${this.source.position[0]}&start_longitude=${this.source.position[1]}&end_latitude=${this.destination.position[0]}&end_longitude=${this.destination.position[1]}`;
		try{
			console.log("getting shit");
			let res = await axios.get(
				url,{
					headers: {
						"Authorization" : "Token sgpJ5x1RPMCLnwWlE7BN5gl7DlTsqZMjMdTu3qh4"
					}
				})
			.then((response) => {
				let estimateres = response;
				return estimateres;
			},(error) => {
				var err = error;
				console.log(err);
			});
			return res;

		}catch(e){
			alert(e);
		}
	}
}