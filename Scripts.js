window.onload = function() {	
	let requestURL = 'https://raw.githubusercontent.com/LeonardoViu/YuGiOhGems/master/CharInfo.json';
    let request = new XMLHttpRequest();
	request.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const personasInfo = JSON.parse(request.response);
		    let numeroFilas = 16; /* <-------------------------------------------------------------NUMERO DE FILAS */
	        let texto = '';
	        let nombreImagen = 'Style/Images/CharIcon'; 
			let NP = 0; 
	        for (let i=0; i<numeroFilas; i++){
		        texto += '<div class="row">';
		        let u = 1 + i*4;
		        let d = 1+((i+1)*4);
		        for (; u<d; u++){
					let nivel = 0;
			        nombreImagen += u;
			        texto += '<div class="col-6 col-md-3">' + '<img src="' + nombreImagen + '.png">' + 
			        '<select class="select">'; 
			        for (let z=1; z<personasInfo.Personajes[NP].WorldLevels+1; z++){  
				        texto += '<option value="'; 
						switch(personasInfo.Personajes[NP].ID) {
                            case 1:
							    texto += personasInfo.Niveles[0].levels[nivel];
                                break;
                            case 2:
							    texto += personasInfo.Niveles[1].levels[nivel];
                                break;
							case 3:
							    texto += personasInfo.Niveles[2].levels[nivel];
                                break;
                            case 4:
							    texto += personasInfo.Niveles[3].levels[nivel];
                                break;
							case 5:
							    texto += personasInfo.Niveles[4].levels[nivel];
							    break;
						}
						nivel ++;
						texto += '">Level ' + z + '</option>';
			        }
			        texto += '</select></div>';
			        nombreImagen = nombreImagen.slice(0,21);
					NP++;
			        if (u>60){ /* <---------PARA EVITAR ERRORES CON LA ULTIMA FILA SI QUEDAN MENOS DE 4 PERSONAJES */
				        break;
			        }
		        }
		        texto += '</div>';
	        }
		    texto += '<div class="row"><div class="col text-center"><button type="button" onclick="calculo()">Submit</button></div></div>';
	        document.getElementById('containerIn').innerHTML = texto;  
        }
    };
	request.open('GET', requestURL);
    request.send();
	
};

const totalGemas = 142940; /* <-----------------------------------------------------------------TOTAL DE LAS GEMAS */

function calculo() {
	let selects = document.getElementsByTagName("SELECT");
	let sumaGemas = 0;
	for (let i = 0; i < selects.length; ++i) {
        sumaGemas += Number.parseInt(selects[i].value);
    }
	document.getElementById('P3').style.display = "block";
	document.getElementById('resultado').innerHTML = sumaGemas;
	document.getElementById('resto1').innerHTML = totalGemas;
	document.getElementById('resto2').innerHTML = totalGemas - sumaGemas;
};