
const acceptedcabs = ["uberauto", "ubermoto", "pool", "sedan", "ubergo", "premier"];
export default class Cab{
	constructor(coname, cabsobj){
		this.coname = coname;
		this.cabsobj = cabsobj.products;
	}

	setestimates(es){
		this.estimates = es;
	}

	//function to filter object
	filtercabs(){
		const filteredcabsobj = this.cabsobj.filter(function(el){
			return ((acceptedcabs.indexOf(el.display_name.toLowerCase())>-1) && el.upfront_fare_enabled==true);
		});
		this.cabsobj = filteredcabsobj;
	}

	filterestimates(){
		// cabobj ek arr h usme product ids h

		// estimates ek arr h usme bhi product id h
		let productids = this.cabsobj.map(function(el){
			return el.product_id;
		});
		console.log(productids);

		this.estimates = this.estimates.filter(function(el){
			return (productids.indexOf(el.product_id)>-1);
		});
		console.log(this.estimates);
	}

	getestimates(){
		return this.estimates;
	}

}