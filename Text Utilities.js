function ConcatenateLines() {
    let textLines = document.getElementById('textLines').value;
    const delimiter = document.getElementById('delimiter').value;
    let result = textLines.split("\n").join(delimiter);
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