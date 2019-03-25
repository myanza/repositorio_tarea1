
const {cursos, findCursoById, argv, crearArchivo} = require('./datos');
const express = require('express')
const app = express()



let get_desc_curso = (curso) => 'El curso de id ' + curso.id + ' se llama ' + curso.nombre + 
								' y tiene una duracion de ' + curso.duracion + ' horas y un valor de ' 
								+ curso.valor + ' pesos.';

let mostrar_curso = (curso, tiempo, callback) =>
{
	setTimeout(function()
	{
		callback(get_desc_curso(curso));
	}, tiempo);
};

let listado_cursos_timeout = () =>
{
	for (var i = 0; i < cursos.length; i++) 
	{
		let curso = findCursoById(i+1);

		mostrar_curso(curso, ((i+1)*2000), function(desc_curso)
		{
			console.log(desc_curso);
		})
	};
};

let listado_cursos = () =>
{
	let descripciones = '<b> Listado cursos </b> </br>';
	for (var i = 0; i < cursos.length; i++) 
	{
		let curso = findCursoById(i+1);
		descripciones = descripciones + '<p>' + get_desc_curso(curso) + '</p> </br>';
	};
	return descripciones;
};

let inicio = () =>
{
	if(argv.id == undefined)
	{
		listado_cursos_timeout();
		texto = listado_cursos();
	}
	else
	{
		let curso = findCursoById(argv.i);

		if(curso == undefined)
		{
			texto = '<p> Ha ingresado un ID que no corresponde a ningún curso </p>';
			texto = texto + listado_cursos();
		}
		else
		{
			texto = 'El estudiante ' + argv.n + '\ncon cédula ' + argv.c + '\nse ha matriculado en el ' + 
			'curso con id ' + curso.id + ' llamado ' + curso.nombre + ', el cual tiene una duración de ' + 
			curso.duracion + ' horas' + ' y un valor de ' + curso.valor + ' pesos.'

			console.log(texto);
		}
	}
}

inicio();

app.get('/', function(req, res)
{
	res.send(texto)
})

app.listen(3000)

