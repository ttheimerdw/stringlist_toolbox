$(document).ready(function() {
    $("#clearTA").on('click',function () {
        console.log("clear button was clicked");
        $("#strlist__TA").val("");
    });
    
    $("#startProcess__btn").on("click", function () {
        if ($("#afSort").prop("checked") === true) {

            contentsAR = $("#strlist__TA").val().split("\n");

            if ($("#sfAlpha").prop("checked") === true) {
                //alert("The first line of contentAR is " + contentsAR[0]);
                if ($("#stCaseIns").prop("checked") === true) {
                    contentsAR.sort(compare_CI);
                } else {
                    contentsAR.sort(compare_CS);
                }
            } else if ($("#sfLength").prop("checked") === true) {
                contentsAR.sort(compare_Ln);
            }

            if ($("#makeUnique").prop("checked")) {
                contentsAR = [...new Set(contentsAR)];
            }
            //alert("Sort should be done and the first line of contentAR is now " + contentsAR[0]);
            //console.log("Length of contentsAR: " + contentsAR.length);
            console.log("Done with the sorting.  The top item is now " + contentsAR[0]);
            $("#strlist__TA").val(contentsAR.join("\n"));
        }
    })

    $('#upload').on('click', function() {
        if (!window.FileReader) {
            alert('Your browser is not supported');
            return false;
        }
        var input = jqInputFiles.get(0);

        // Create a reader object
        var reader = new FileReader();
        if (input.files.length) {
            var textFile = input.files[0];
            // Read the file
            reader.readAsText(textFile);
            // When it's loaded, process it
            $(reader).on('load', loadFileIntoTA);
        } else {
            alert('Please upload a file before continuing')
        }
    });

    $("#insight").on('click',function () {
        var input = jqInputFiles.get(0);
        console.log("input.files.length: " + input.files.length);
    });

    jqTextArea.on("paste", function () {
        setTimeout(function() {
            updateLineCnt(jqTextArea.get(0));
        }, 0)
    });

    jqTextArea.keydown(function () {
        clearTimeout(keyStrokeTimer);
    })

    jqTextArea.keyup(function () {
        /* keyup is used instead of keydown because the function is to file after the key action has completed. */
        updateLineCnt(jqTextArea.get(0));
    });

    updateLineCnt(jqTextArea.get(0));
});

var keyStrokeTimer,
    jqInputFiles = $('#files'),
    jqTextArea = $('#strlist__TA');

function updateLineCnt(elem) {
    keyStrokeTimer = setTimeout(function () {
        var newLines = $(elem).val().split("\n").length;
        $("#lineCnt__span").text(newLines);
    }, 600);
}

function loadFileIntoTA(e) {
    var fileContents = e.target.result,
        contentsAR;

    if (fileContents && fileContents.length) {
        contentsAR = fileContents.split("\n");
        $("#strlist__TA").val(contentsAR.join("\n"));
    }
}

function compare_CI(a,b) {return compare(a,b,'ci')}
function compare_CS(a,b) {return compare(a,b,'cs')}
function compare_Ln(a,b) {return compare(a,b,'ln')}

function compare(a,b,casetrtmnt) {
    console.log("comparing");
    if (casetrtmnt === 'ci') {
        a = a.toLowerCase();
        b = b.toLowerCase();
    } else if (casetrtmnt === 'ln') {
        a = a.length;
        b = b.length;
    }
    console.log("Value of a: " + a + " and the value of b: " + b);
    if (a < b) {
        console.log("Returning -1");
        return -1;
    } else if (a > b) {
        console.log("Returning 1");
        return 1;
    } else {
        console.log("Returning 0");
        return 0;
    }
}

function comparetwo(a,b) {
    console.log("comparing");
    //if (casetrtmnt === 'ci') {
        a = a.toLowerCase();
        b = b.toLowerCase();
    //}
    console.log("Value of a: " + a + " and the value of b: " + b);
    if (a < b) {
        console.log("Returning -1");
        return -1;
    } else if (a > b) {
        console.log("Returning 1");
        return 1;
    } else {
        console.log("Returning 0");
        return 0;
    }
}