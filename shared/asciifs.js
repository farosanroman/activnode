var asciifs = {
   
    asciiread(dir) {
        
        let fs = require('fs');
        console.log("migrarsql")
    var TXT = fs.readFileSync(__dirname + "/asscii/ATS16092018.txt", "latin1");
    return TXT;
    
        


    },


}
module.exports =asciifs;