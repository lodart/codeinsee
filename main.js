document.getElementById('searchbutton').onclick = function () {
    let postalcode = document.getElementById('postalcode').value; 
    let req = new XMLHttpRequest(); // To be able to send REST commands

    req.onreadystatechange = function () { // This function will be called each time the state of the response changes.
		  if (req.readyState !== 4) {  // While not finished, do nothing.
		      return;
		  }

        if (req.status === 200) {// The HTTP code 200 is 'OK'
            console.log(req.responseType + " " + req.response);
            let resp = JSON.parse(req.response);
            let txt = "<table border='1px'><tr><th>Ville</th><th>INSEE</th></tr>";
            for (let i = 0; i < resp.records.length; i++) {
                const ville = resp.records[i];
                txt += "<tr>" + "<td>" + ville.fields.nom_de_la_commune + "</td>" + "<td>" +ville.fields.code_commune_insee + "</td>" + "</tr>"
            }
            txt += "</table>";
            document.getElementById('info').innerHTML = txt;
        } else {
            document.getElementById('info').innerHTML = "Cannot be retrieved";
        }
    };

    // Sending a REST command to the server.
    req.open("GET", "https://datanova.legroupe.laposte.fr/api/records/1.0/search/?dataset=laposte_hexasmal&facet=code_commune_insee&facet=nom_de_la_commune&facet=code_postal&refine.code_postal=" + postalcode, true);
    req.send();
};