var asciiqry = {
   
    asciiprocesar(TXT) {
        
       // let fs = require('fs');
       // console.log("asciisql")
    //var TXT = fs.readFileSync(__dirname + "/asscii/ATS16092018.txt", "latin1");
    
    //console.log(TXT);
    var lines = TXT.split("\r").join("");
    var lines = lines.split("\n");
    //console.log(lines)
    var result = [];
    console.log("lines"+lines.length);
    var sqltran = "", sucursal = "", refe2 = "", proyecto = "", ta = "", modulo = "MIG";
    var numRows = lines.length;
    var params = [];
    sqltran = sqltran + " BEGIN TRY ";
    sqltran = sqltran + " BEGIN TRANSACTION ";
    sqltran = sqltran + " SET NOCOUNT ON ";
    for (var i = 0; i < numRows; i++) {
        var obj = {};
        var currentline = lines[i].split(";");
        var columna = lines[i].split("@");
        // console.log(columna.length);
        if (currentline[0] != "") {
            for (var j = 0; j < columna.length; j++) {    
                
                switch (j) {
                    case 0:
                        var cia = columna[j];
                        break;
                    case 1:
                        var refe1 = columna[j];
                        if (refe1.substring(1, 3) == '0CH') {
                            refe1 = refe1.substring(4, 12); 
                        }
                        else {
                            refe1 = refe1.substring(1, 12);
                        }    
                        break;
                    case 2:
                        var tipocomp = "Mig"; 
                        break;
                     case 3:
                        var tipodoc= "Doc"; 
                        break; 
                     case 4:
                        var fdoc = columna[j];
                        break; 
                    case 5:
                        var fcomp   = columna[j];
                        var numcomp = 'PA' + columna[j].replace("/", ""); 
                        break; 
                    case 6:
                        var periodo = columna[j];
                        break;                            
                    case 7:
                        var cuenta = columna[j].substring(0, 12); 
                        var aux    = columna[j].substring(12, 6);
                        break;
                    case 8:
                        var ta = "";
                        break;
                    case 9:
                        var pos =i+1;
                        break;
                    case 10:
                        var debecant = columna[j];
                        break;    
                    case 11:
                    var debemont = columna[j];
                        if (debemont > 0) {
                            debemont = debemont / 100;
                        } else {
                            debemont = 0;                            
                        }
                        break;
                    case 12:
                        var habercant = columna[j];
                        break; 
                    case 13:
                        var habermont =  columna[j];
                        if (habermont > 0) {
                            habermont = columna[j] / 100; // Haber
                        } else {
                            habermont = 0;
                        }
                        break;
                    case 14:
                        var descrip = columna[j];
                        break;     
                    case 15:
                        
                        if (columna[j] > 0) {
                            var moneda = columna[j];
                        } else {
                            var moneda = 0;
                        }
                        break;
                    case 16:
                        if (columna[j] > 0) {
                            var cambio = ( columna[j] *1 )/10000 // Cambio
                        }
                        else {
                            var cambio = 0;
                        }
                        break;
                    case 17:
                        var cliente ="";            
                        break;
                    case 18:
                        cliente = columna[j];
                };                            
            };
            sqltran = sqltran + " EXEC CONT_MIGRACION_INSERT ";
            sqltran = sqltran + " '" + cia + "','" + numcomp + "'," + pos + "," + numRows + ",'" + sucursal + "','" + proyecto + "',";
            sqltran = sqltran + " '" + modulo + "','" + tipocomp + "','" + tipodoc + "','" + refe1 + "'," ;
            sqltran = sqltran + " '" + fdoc + "','" + fcomp + "','" + fcomp + "','" + periodo + "','" + cuenta + "',";
            sqltran = sqltran + " '" + ta + "','" + aux + "'," + debecant + "," + debemont + "," + habercant + ",";
            sqltran = sqltran + " "  + habermont + ",'" + descrip + "','" + moneda + "','" + cambio + "','" + cliente + "' ";    

            //result.push(obj);
        };
        
    };
    sqltran = sqltran + " COMMIT TRANSACTION";
    sqltran = sqltran + " END TRY";
    sqltran = sqltran + " BEGIN CATCH";
    sqltran = sqltran + " DECLARE @ErrorMessage VARCHAR(4000)";
    sqltran = sqltran + " DECLARE @ErrorSeverity INT";
    sqltran = sqltran + " DECLARE @ErrorState INT";
    sqltran = sqltran + " SELECT @ErrorMessage = ERROR_MESSAGE() , @ErrorSeverity = ERROR_SEVERITY() ,@ErrorState = ERROR_STATE() ";
    sqltran = sqltran + " ROLLBACK TRAN ";
    sqltran = sqltran + " RAISERROR (@ErrorMessage, @ErrorSeverity, @ErrorState ) ";
    sqltran = sqltran + " RETURN ";
    sqltran = sqltran + " END CATCH";
    //console.log(sqltran)
    return sqltran
        


    },


}
module.exports =asciiqry;