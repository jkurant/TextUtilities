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

function SimpleReplaceLines() {
    let textLines = document.getElementById('textLines').value;
    const findStr = document.getElementById('simpleFind').value;
    const replaceStr = document.getElementById('simpleReplace').value;
    let result = textLines.replaceAll(findStr, replaceStr);
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

function CountCharacters() {
    let text = document.getElementById('textLines').value;
    let charsToFind = document.getElementById('charactersToCount').value;
    charsToFind += "\t\n\r";
    let charMap = new Map();
    for (let i = 0; i < charsToFind.length; i++) {
        const cc = charsToFind.charAt(i);
        charMap.set(cc, 0);
    }
    for (let i = 0; i < text.length; i++) {
        const c = text.charAt(i);
        if (charsToFind.indexOf(c) > -1) {
            if (charMap.has(c)) {
                charMap.set(c, charMap.get(c)+1);
            } else {
                charMap.set(c, 1);
            }
        }
    }
    let msg = '';
    let cShowAs = '';
    for (let [c, count] of charMap) {
        cShowAs = c; // find a way to display \t \r \n instead of the characters, but couldn't write the if statement to do this
        cShowAs = cShowAs.replace(/\t/,'\\t');
        cShowAs = cShowAs.replace(/\n/,'\\n');
        cShowAs = cShowAs.replace(/\r/,'\\r');
        msg = msg + cShowAs + ": " + count + "\n";
      }
    msg += 'All characters: ' + text.length;
    document.getElementById("linesResult").value = msg;
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
    let seen = "\n";
    lines.forEach( (textLine) => {
        if (seen.indexOf("\n" + textLine + "\n") == -1) {
            newStr += textLine + "\n";
        }
        seen += (textLine + "\n");
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

function SortAndUniquifyIfSelectedForList(result) {
    let retVal = result;
    if (document.getElementById("uniquifyListResult").checked) {
        retVal = UniquifyString(retVal);
    }
    if (document.getElementById("sortListResult").checked) {
        retVal = SortString(retVal);
    }
    return retVal;
}

function TruncateBefore() {
    let delimiter = document.getElementById('truncateString').value;
    let textLines = document.getElementById('textLines').value;
    //alert('textLines = ' + textLines);
    let lines = textLines.split("\n");
    let newStr = '';
    lines.forEach( (textLine) => {
        if (textLine.indexOf(delimiter) >= 0) {
            // truncate textline
            textLine = textLine.substring(textLine.indexOf(delimiter)+delimiter.length);
        } else {
            // textline is good as is
        }
        if (newStr == '') {
            newStr = textLine;
        } else {
            newStr = newStr + "\n" + textLine;
        }
    });
    let result = newStr;
    document.getElementById("linesResult").value = result;
   
}

function TruncateAfter() {
    let delimiter = document.getElementById('truncateString').value;
    let textLines = document.getElementById('textLines').value;
    //alert('textLines = ' + textLines);
    let lines = textLines.split("\n");
    let newStr = '';
    lines.forEach( (textLine) => {
        if (textLine.indexOf(delimiter) >= 0) {
            // truncate textline
            textLine = textLine.substring(0,textLine.indexOf(delimiter));
        } else {
            // textline is good as is
        }
        if (newStr == '') {
            newStr = textLine;
        } else {
            newStr = newStr + "\n" + textLine;
        }
    });
    let result = newStr;
    document.getElementById("linesResult").value = result;
   
}