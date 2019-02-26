'use strict';
var models = require('../models/ind');
var Dependencia = models.dependencia;
var Puntuacion = models.puntuacion;
var pdf = require('html-pdf');
class ReporteController {
    
    reportes(req, res) {
        Dependencia.findAll({}).then(function (dependencias) {
            if (dependencias) {
                getPuntuaciones([], dependencias, 0, function (reporte){
                    console.log('volvi');
                    console.log(reporte);
                    var reporteData = getPromediosPuntuaciones(reporte, []);
                    console.log(reporteData);
                    //Crear PDF
                    res.render('reportes', {title: 'Reportes', reporteData:reporteData});
                });     
            }
        }).catch(function (err) {
            res.redirect('/');
        });
    }

}

function getPuntuaciones(reporte, dependencias, pos, callback) {
    if (pos < dependencias.length) {
        var id_dependencia = dependencias[pos].dataValues.id;
        Puntuacion.findAll({where: {id_dependencia: id_dependencia}}).then(function (puntuaciones) {
            reporte.push({
                dependencia: dependencias[pos].dataValues,
                puntuaciones: puntuaciones
            });
            pos = pos + 1;
            getPuntuaciones(reporte, dependencias, pos, callback);
        }).catch(function (err) {
            pos = pos + 1;
            getPuntuaciones(reporte, dependencias, pos, callback);
        });
    } else {
        callback(reporte);
    }
}

function getPromediosPuntuaciones(reporte, reporteData){
    reporte.forEach(data => {
        var totalPuntuaciones = 0;
        var items = 0;
        //data tiene dependencia y puntuaciones
        data.puntuaciones.forEach(puntos=>{
            items=items+1;
            totalPuntuaciones = totalPuntuaciones + parseInt(puntos.ranKing);
        });
        reporteData.push({
            dependencia: data.dependencia,
            promedio: (totalPuntuaciones==0)?0:totalPuntuaciones/items
        });
    });
    return reporteData;
}

function crearPDF(reportesData){
    /*var html  = '<h5>Reporte de puntuaciones</h5>';
        html += '<table>';
        html += '   <thead>';
        html += '       <tr>';
        html += '           <th>Número</th>';
        html += '           <th>Id</th>';
        html += '           <th>Nombre</th>';
        html += '           <th>Promedio Calificación</th>';
        html += '       </tr>';
        html += '   </thead>';
        html += '   <tbody>';
    reportesData.forEach((reporte, i)=>{
        
    });
        html += '   </tbody>';*/
}

module.exports = ReporteController;

