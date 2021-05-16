function JoinLines() {
    let textLines = document.getElementById('textLines').value;
    const delimiter = document.getElementById('joinDelimiter').value;
    let result = textLines.split("\n").join(delimiter);
    document.getElementById("linesResult").value = result;
}

function SplitLines() {
    let textLines = document.getElementById('textLines').value;
    const delimiter = document.getElementById('splitDelimiter').value;
    let result = textLines.split(delimiter).join("\n");
    document.getElementById("linesResult").value = result;
}

function TrimLines() {
    let textLines = document.getElementById('textLines').value;
    let lines = textLines.split("\n");
    let newStr = '';
    lines.forEach( (textLine) => {
        textLine = textLine.trim();
        newStr += textLine + "\n";
    });
    let result = newStr.substring(0,newStr.length-1);
    //let result = lines.join("\n");
    //alert(result);
    document.getElementById("linesResult").value = result;
}

function RegExReplaceLines() {
    let textLines = document.getElementById('textLines').value;
    const RegExFindStr = document.getElementById('regExFind').value;
    const RegExReplaceStr = document.getElementById('regExReplace').value;
    const RegExFlagsStr = document.getElementById('regExFlags').value;
    const RegExFind = new RegExp(RegExFindStr, RegExFlagsStr);
    let result = textLines.replace(RegExFind, RegExReplaceStr);
    document.getElementById("linesResult").value = result;
}

function toLowercase() {
    document.getElementById("linesResult").value = document.getElementById('textLines').value.toLowerCase();
}

function toUppercase() {
    document.getElementById("linesResult").value = document.getElementById('textLines').value.toUpperCase();
}

function UniquifyLines() {
    let textLines = document.getElementById('textLines').value;
    let result = UniquifyString(textLines);
    document.getElementById("linesResult").value = result;
}

function SortLines() {
    let textLines = document.getElementById('textLines').value;
    let result = SortString(textLines);
    document.getElementById("linesResult").value = result;
}

function UniquifyAndSortLines() {
    let textLines = document.getElementById('textLines').value;
    textLines = UniquifyString(textLines);
    let result = SortString(textLines);
    document.getElementById("linesResult").value = result;
}

function ReverseLines() {
    let textLines = document.getElementById('textLines').value;
    let lines = textLines.split("\n");
    let newStr = '';
    lines.forEach( (textLine) => {
        if (newStr == '') {
            newStr = textLine;
        } else {
            newStr = textLine + "\n" + newStr;
        }
    });
    //let result = newStr.substring(0,newStr.length-1);
    let result = newStr;
    document.getElementById("linesResult").value = result;
}

function UniquifyString( stuff ) {
    let lines = stuff.split("\n");
    let newStr = '';
    let seen = '';
    lines.forEach( (textLine) => {
        if (seen.indexOf(textLine) == -1) {
            newStr += textLine + "\n";
        }
        seen += (textLine + '~');
    });
    let result = (newStr.length > 0) ? newStr.substring(0,newStr.length-1) : '';
    return result;
}

function SortString( stuff) {
    let aStuff = stuff.split("\n")
    aStuff = aStuff.sort();
    let result = aStuff.join("\n");
    return result;
}

function CopyOutputToInput() {
    let result = document.getElementById('linesResult').value;
    document.getElementById('textLines').value = result;
}

function CopyOutputToListA() {
    let result = document.getElementById('linesResult').value;
    document.getElementById('listA').value = result;
}

function CopyOutputToListB() {
    let result = document.getElementById('linesResult').value;
    document.getElementById('listB').value = result;
}

function A_AND_B() {
    let listAText = document.getElementById('listA').value;
    let aA = listAText.split("\n");

    let listBText = document.getElementById('listB').value;
    let aB = listBText.split("\n");

    let caseInsensitive = document.getElementById("caseInsensitive").checked;
    let aResult = null;

    if (caseInsensitive) {
        let aUB = aB.map( textLine => textLine.toUpperCase() );
        aResult = aA.filter( textLine => aUB.includes(textLine.toUpperCase()) );
    } else {
        aResult = aA.filter( textLine => aB.includes(textLine) );
    }

    let result = aResult.join("\n");

    result = SortAndUniquifyIfSelectedForList(result);
    document.getElementById("listResult").value = result;
}

function A_OR_B() {
    let listAText = document.getElementById('listA').value;
    let listBText = document.getElementById('listB').value;

    let result = listAText + "\n" + listBText;

    result = SortAndUniquifyIfSelectedForList(result);
    document.getElementById("listResult").value = result;
}

function A_MINUS_B() {
    let listAText = document.getElementById('listA').value;
    let aA = listAText.split("\n");

    let listBText = document.getElementById('listB').value;
    let aB = listBText.split("\n");

    let caseInsensitive = document.getElementById("caseInsensitive").checked;
    let aResult = null;

    if (caseInsensitive) { 
        let aUB = aB.map( textLine => textLine.toUpperCase() );
        aResult = aA.filter( textLine => !aUB.includes(textLine.toUpperCase()) );
    } else {
        aResult = aA.filter( textLine => !aB.includes(textLine) );
    }

    let result = aResult.join("\n");

    result = SortAndUniquifyIfSelectedForList(result);
    document.getElementById("listResult").value = result;
}

function B_MINUS_A() {
    let listAText = document.getElementById('listA').value;
    let aA = listAText.split("\n");

    let listBText = document.getElementById('listB').value;
    let aB = listBText.split("\n");

    let caseInsensitive = document.getElementById("caseInsensitive").checked;
    let aResult = null;

    if (caseInsensitive) { 
        let aUA = aA.map( textLine => textLine.toUpperCase() );
        aResult = aB.filter( textLine => !aUA.includes(textLine.toUpperCase()) );
    } else {
        aResult = aB.filter( textLine => !aA.includes(textLine) );
    }
    let result = aResult.join("\n");

    result = SortAndUniquifyIfSelectedForList(result);
    document.getElementById("listResult").value = result;
}

function SortAndUniquifyIfSelectedForList( result) {
    let retVal = result;
    if (document.getElementById("uniquifyListResult").checked) {
        retVal = UniquifyString(retVal);
    }
    if (document.getElementById("sortListResult").checked) {
        retVal = SortString(retVal);
    }
    return retVal;
}