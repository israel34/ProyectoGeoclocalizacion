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
                    crearPDF(reporteData, function(status, data){
                        console.log('PDF');
                        console.log(data);
                        var url_pdf = 'reporte.pdf';
                        var statuspdf = false;
                        if(status>=0){
                            statuspdf = true;
                        }
                        res.render('reportes', {title: 'Reportes', reporteData:reporteData, statuspdf:statuspdf, url_pdf: url_pdf});
                    });
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

function crearPDF(reporteData, callback){
    var html  = '<h5>Reporte de puntuaciones</h5>';
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
    reporteData.forEach((reporte, i)=>{
        html += '       <tr>';
        html += '           <td>'+i+'</td>';
        html += '           <td>'+reporte.dependencia.id+'</td>';
        html += '           <td>'+reporte.dependencia.nombre+'</td>';
        html += '           <td>'+reporte.promedio+'</td>';
        html += '       </tr>';
    });
        html += '   </tbody>';
        html += '</table>';
    var options = {
        "format": 'A4'
    };
    pdf.create(html, options).toFile('./public/reporte.pdf', function(err, res) {
        if (err){
            callback(-1, err);
        } else {
            callback(0, res);
        }
    });
}

module.exports = ReporteController;

