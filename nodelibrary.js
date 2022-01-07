"use strict";

export default {
    "TEXT": {
        "nodeType": "INPUT",
        "caption": "Text",
        "inputPorts": [
            {
                "type": "TEXT",
                "visible": false
            }
        ],
        "outputPorts": [
            {
                "type": "TEXT",
                "visible": true
            }
        ],
        "actionFunction": {
                "language": "JavaScript",
                "code": "(function textNode() { opdArray_[0] = ipdArray_[0]; return opdArray_; })();"
            }
    },
    "UPPERCASE": {
        "nodeType": "PRIMITIVE",
        "caption": "Uppercase",
        "inputPorts": [
            {
                "type": "TEXT",
                "visible": true
            }
        ],
        "outputPorts": [
            {
                "type": "TEXT",
                "visible": true
            }
        ],
        "actionFunction": {
            "language": "JavaScript",
            "code": "(function uppercaseNode() { opdArray_[0] = ipdArray_[0].toUpperCase(); return opdArray_; })();"
        }
    },
    "LOWERCASE": {
        "nodeType": "PRIMITIVE",
        "caption": "Lowercase",
        "inputPorts": [
            {
                "type": "TEXT",
                "visible": true
            }
        ],
        "outputPorts": [
            {
                "type": "TEXT",
                "visible": true
            }
        ],
        "actionFunction": {
            "language": "JavaScript",
            "code": "(function lowerCaseNode() { opdArray_[0] = ipdArray_[0].toLowerCase(); return opdArray_; })();"
        }
    },
    "CONCAT": {
        "nodeType": "PRIMITIVE",
        "caption": "Concat",
        "inputPorts": [
            {
                "type": "TEXT",
                "visible": true
            },
            {
                "type": "TEXT",
                "visible": true
            }
        ],
        "outputPorts": [
            {
                "type": "TEXT",
                "visible": true
            }
        ],
        "actionFunction": {
            "language": "JavaScript",
            "code": "(function concatNode() { opdArray_[0] = ipdArray_[0].concat(ipdArray_[1]); return opdArray_; })();"
        }
    },
    "DISPLAY_DATA": {
        "nodeType": "DISPLAY",
        "caption": "Display Data",
        "inputPorts": [
            {
                "type": "ALL",
                "visible": true
            }
        ],
        "outputPorts": [
            {
                "type": "TEXT",
                "visible": false
            }
        ],
        "actionFunction": {
            "language": "JavaScript",
            "code": "(function displayDataNode() { opdArray_[0] = ipdArray_[0]; return opdArray_; })();"
        }
    },
    "GET_REQUEST": {
        "nodeType": "INPUT",
        "caption": "GET Request",
        "inputPorts": [
            {
                "type": "TEXT",
                "visible": false
            }
        ],
        "outputPorts": [
            {
                "type": "JSON",
                "visible": true
            }
        ],
        "actionFunction": {
            "language": "JavaScript",
            "code": "(async function asyncAxiosGet() {const res_ = await axios.get(ipdArray_[0]);opdArray_[0] = await res_.data;return opdArray_;})();"
        }
    },
    "IFC_FILE": {
        "nodeType": "INPUT",
        "caption": "Ifc File",
        "inputPorts": [
            {
                "type": "BASE64",
                "visible": false
            }
        ],
        "outputPorts": [
            {
                "type": "BASE64",
                "visible": true
            }
        ],
        "actionFunction": {
            "language": "JavaScript",
            "code": "(function ifcFileNode() { opdArray_[0] = ipdArray_[0]; return opdArray_; })();"
        }
    },
    "IFC_WALLS": {
        "nodeType": "PRIMITIVE",
        "caption": "IfcWalls",
        "inputPorts": [
            {
                "type": "BASE64",
                "visible": true
            }
        ],
        "outputPorts": [
            {
                "type": "BASE64",
                "visible": true
            }
        ],
        "actionFunction": {
            "language": "Python",
            "code": "import sys\nimport json\nimport ifcopenshell\nimport base64\nimport os\nflowine_id = sys.argv[1]\nstdinArray_ = sys.stdin.readline().split(\",\")\nipdArray_ = []\nfor e in stdinArray_:\n\tipdArray_.append(e.strip().strip(\"[\").strip(\"]]\").strip(\"\\\\\"\"))\nifc_out_file = open(flowine_id, \"w\")\nprint(base64.b64decode(ipdArray_[0]).decode(\"utf-8\"), file=ifc_out_file)\nifc_out = ifcopenshell.open(sys.argv[1])\ndef ifcwall():\n\tfor e in ifc_out.by_type(\"IfcElement\"):\n\t\tif not (e.is_a() == \"IfcWall\" or e.is_a() == \"IfcWallElementCase\" or e.is_a() == \"IfcWallStandardCase\" or e.is_a() == \"IfcOpeningElement\" or e.is_a() == \"IfcOpeningStandardCase\"):\n\t\t\tifc_out.remove(e)\n\tfor e in ifc_out.by_type(\"IfcProduct\"):\n\t\tif e.is_a() == \"IfcSpace\":\n\t\t\tifc_out.remove(e)\nifcwall()\nprint(ifc_out.to_string(), file=open(sys.argv[1]+\"_result\", \"w\"))\nopdArray_ = []\nopdArray_.append(base64.b64encode(open(sys.argv[1]+\"_result\", \"rb\").read()).decode(\"utf-8\"))\nos.remove(sys.argv[1])\nos.remove(sys.argv[1]+\"_result\")\nprint(json.dumps(opdArray_))"
        }
    }
}