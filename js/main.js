var my = (function() {

    var modelList = document.getElementById("xmltemplate"),
        generatebtn = document.getElementById("generatetemplate"),
        invokebtn = document.getElementById("Invoketemplate");

    if (generatebtn != null && generatebtn.addEventListener) {
        generatebtn.addEventListener("click", function(event) {
            event.preventDefault();
            updateXmlBody(event);
        }, false);
    }

    if (invokebtn != null && invokebtn.addEventListener) {
        invokebtn.addEventListener("click", function(event) {
            event.preventDefault();
            invokeSoapService(event);
        }, false);
    }
    
    while (modelList.options.length) {
        modelList.remove(0);
    }

    var items = templateList();
    if (items) {
      var i;
      for (i = 0; i < items.length; i++) {
        var itm = new Option(items[i], i);
        modelList.options.add(itm);
      }
    }

    function updateXmlBody(event) {
        let sel = document.getElementById("xmltemplate"),
            xmlDocName = "./cd_catalog.xml";
        
        if (sel) {
            xmlDocName = './xml/' + sel.options[sel.selectedIndex].text + '.xml'
        }
        loadXMLDoc(xmlDocName);           
    }

    function templateList() {
        return [
            'GetCountriesAvailable',
            'GetHolidayDate',
            'GetHolidaysAvailable',
            'GetHolidaysForDateRange',
            'GetHolidaysForMonth',
            'GetHolidaysForYear'
        ];
    };

    function loadXMLDoc(xmlDocName) {
        var xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                loadXmlTemplate(this);
            } else {
                document.getElementById("requesttemplate").innerHTML = "SOAP XML request message goes here...";
            }
        };

        xmlhttp.open("GET", xmlDocName, true);
        xmlhttp.send();
    }

    function loadXmlTemplate(xml) {
        document.getElementById("requesttemplate").innerHTML = xml.responseText;
    }

    function invokeSoapService(event) {
        document.getElementById("responsetemplate").innerHTML = document.getElementById("requesttemplate").innerHTML;
    }

})();