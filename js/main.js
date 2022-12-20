const myForm = document.getElementById("myForm");
const csvFile = document.getElementById("csvFile");

//listen for submit event on form
myForm.addEventListener("submit", function (e) {
    //prevent browser default behavior (stops page refresh)
        e.preventDefault();
    
        const input = csvFile.files[0];
        const reader = new FileReader();
    
        reader.readAsText(input);
    
        reader.onload = function (e) {
            const csvContents = e.target.result;
            const data = csvToArray(csvContents);
            //use this to write to DOM instead of document.write(text);  (unstable method per mdn)
            //document.write(JSON.stringify(data));
            //document.getElementById("result").innerText = csvContents;
            document.getElementById("formattedResult").innerText = JSON.stringify(data);
        };
    
    });

//function to convert csv string to array
function csvToArray(str, delimiter = ","){
    //slice parsed csv string from index 0 through first new line \n to get csv headers (first row only)
    //then split at commas to give our separated header values as an array
    //this gives headers = ["name", "email", "etc"]
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);

    //csv rows array (rows 2 through last), same thing down here, but indexes updated for our row values
    //["jimmy, bonsai@gmail, male", "kevin, decanter@gmail, male", "kelly, ktt@gmail, female", ...]
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    //map each rows element, split to get values, use callback syntax instead of arrow function syntax
    //use headers.reduce to create an object, reduce(callback fn, initialValue is an empty object)
    const csvArray = rows.map(function(row){
        //split to get row elements ["jimmy", "bonsai@gmail", "male"]
        const rowValues = row.split(delimiter);
        //reduce to return a new object with values taken from header
        //reduce(callback fn, initial value {}); for each element in headers array (header -- name, email, etc)
        //, run the reduce method on it with a callback function(accumulator, currentvalue, currentindex)
        //accumulator's starting value is initialValue on first iteration (ie. start with {})
        const headerObject = headers.reduce(function(object, header, index){
            //add key-value pairs to object {} with bracket notation
            //object["key"] = value;
            object[header] = rowValues[index];
            //{name: "jimmy"}, then {name: "jimmy", email: "bonsai@gmail"}, etc
            return object;
        }, {});
        return headerObject;
    });
    
    return csvArray;
}







