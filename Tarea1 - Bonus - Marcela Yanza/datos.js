const fs = require('fs');

let cursos =
[
	{
		id: 1,
		nombre: 'Node JS',
		duracion: 60,
		valor: 140000
	},
	{
		id: 2,
		nombre: 'Inteligencia Artificial',
		duracion: 30,
		valor: 300000
	},
	{
		id: 3,
		nombre: 'Bodegas de Datos',
		duracion: 80,
		valor: 5000000
	}
];

let findCursoById = (id) => cursos.find( cursos => cursos.id == id)


const opciones =
{
	id:
	{
		demand: true,
		alias: 'i'
	},
	nombre_interesado:
	{
		demand: true,
		alias: 'n'
	},
	cedula:
	{
		demand: true,
		alias: 'c'
	}
};

const argv = require('yargs')
		     .command('inscribir', 'Inscripcion', opciones)
			 .argv

let crearArchivo = (texto, callback) =>
{
	fs.writeFile('matricula.txt', texto, (err) =>
	{
		if(err) throw (err);
		callback('Se ha creado el archivo');
	});
}

module.exports = 
{
	cursos,
	findCursoById,
	argv,
	crearArchivo
};