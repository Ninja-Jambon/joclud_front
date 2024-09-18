import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GameAdder({token}) {


	function send() {
		const file = document.getElementById("avatar");
		console.log("caca")
		console.log(file.files[0]);
		var formData = new FormData();
		formData.append("file", file.files[0])
		axios.post('https://leizour.fr/api/v1/admin/addGames', formData, {
		    headers: {
		      'Content-Type': 'multipart/form-data'
		    }
		})
	}

	return (
		<div>
			<input type="file" id="avatar" name="avatar" />
			<button onClick={send}>send</button>
		</div>
	)
}
