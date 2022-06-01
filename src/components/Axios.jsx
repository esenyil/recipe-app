import { useState, useEffect } from "react";

export default function Axios() {
	const [thing, setThing] = useState("");
	const [secondThing, setSecondThing] = useState("");

	function handleInput(e) {
		setThing(e.target.value);
	}
	function handleSecondInput(e) {
		setSecondThing(e.target.value);
	}

	useEffect(() => {
		console.log("Use Effect", new Date().getTime());
		/* AXIOS EKSEMPEL */
		/*

        Når det kommer til at "fetche" fra en backend server, kan det tage en ubegrænset mængde tid,
        derfor bruge man asynkrone functioner som kan kører imens resten af siden/componenten bliver læst/renderet.

        UseEffect() er en asynkron function som kører første gang siden/componenten bliver læst, og derfra går ud fra sin dependecy array.
        Hvis der ikke er nogle, kører den også hver gang siden/componenten bliver renderet igen (f.eks hver gang en state bliver opdateret),
        hvis det er tom ",[])", så kører den kun når componenten bliver læst, og ikke igen før den bliver læst endnu en gang,
        hvis den har en variabel ",[secondThing])", ligesom den har i denne fil, bliver useEffect() fuktionen kørt hver gang den variabel ændrer sig.

        Med den baggrundsviden, kan man forklare de forskellige stadier af at "fetche" data.

        I min forståelse, har den 3 stadier.
            Request
            Response
            Data || Error

        Man sender en REQUEST (Get, post, put, delete) til en adresse (URL), eller en anden API.
        Man får et RESPONSE, dette er hvad serveren responerer med når man beder om adgang til adressen. F.eks (404, page not found, 200, OK osv. osv.)
        Her er det hvor man skal bruge det respons til noget i sin applikation.
            Det RESPONSE kan enten være succesfuldt og give dig data eller en anden form for modtagelse på at serveren responderede korrekt,
            eller det kan give dig en fejl, enten at siden ikke eksiterer, eller at API'en ikke godkender din REQUEST.

        Det vigtige derfor mellem axios og useEffect(), er at du ikke vil hente data hver gang du ændrer noget på siden/din component.
        Når man henter data, ville det være optimalt at gøre det i starten, og nok ikke gøre det igen, undtagen hvis du forventer et nyt respons ud fra user interaction.

        En demonstration med Axois ses nedenunder, taget ud fra "axios" er hvad du har kaldt din axios kilent.
        Det er en get request som håndtere med .then() og fanger hvis der er fejl med .catch().
        
        axios.get(REQUEST).then((RESPONSE)=>{
            console.log(RESPONSE.DATA)
        }).catch((ERROR)=>{
            console.error(ERROR)
        })

        */
	}, [secondThing]);

	console.log("Render", new Date().getTime());

	return (
		<div>
			<input value={thing} type="text" onChange={handleInput} />
			<input
				value={secondThing}
				type="text"
				onChange={handleSecondInput}
			/>
		</div>
	);
}
