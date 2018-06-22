import React, { Component } from 'react';

export default class LiveList extends Component{
	constructor(){
		super();
		this.state = {
			isLoaded: false,
			data: null,
			error: null
		}
	}

	componentDidMount(){

		fetch("http://localhost:8080/api/content/query/+contentType:Airlinetimings")
		.then((res) => (res.json()))
		.then(
		(res)=>{
			this.setState({
				isLoaded: true,
				data: res,
			});
		},

		(err)=>{
			this.setState({
				isLoaded: true,
				error: err,
			});
		});

		var airlineSocket = new WebSocket("ws://127.0.0.1:81");

		airlineSocket.onmessage = function (event) {
			console.log(event.data);
		}

		// airlineSocket.send("Thank you for the data. -Client");
	}

	getFullTime(date){
		var d = new Date(date);

		var hh = (d.getHours() < 10 ? "0"+d.getHours() : d.getHours());
		var mm = (d.getMinutes() < 10 ? "0"+d.getMinutes() : d.getMinutes());
		var ss = (d.getSeconds() < 10 ? "0"+d.getSeconds() : d.getSeconds());

		return hh+":"+mm+":"+ss;
	}

	render(){
		

		if(this.state.data === null) return <p>Loading Data ...</p>;

		if(this.state.err !== null && this.state.data ===null ) return <p>Server Error! </p>

		const data = this.state.data.contentlets;

		return(
			<div>
				<main>
					<div className="responsive-table">
						<table className="table">
							<thead>
								<tr>
									<th>Airline</th>
									<th>Flight No.</th>
									<th>Destination </th>
									<th>Status</th>
									<th>Time</th>
								</tr>
							</thead>
							<tbody>
								{
									data.map((item, i, array)=>{
										var d = new Date(item.arrivalTime);
										return(
										<tr className="changing" key={i}>
											<td>{item.airlineName}</td>
											<td>{item.flightNumber}</td>
											<td>{item.destinationLocation}</td>
											<td>{item.status}</td>
											<td className="changing-data">{this.getFullTime(d)}</td>
										</tr>)
									})
								}
								
							</tbody>
						</table>
					</div>
				</main>
			</div>
		);
	}
}