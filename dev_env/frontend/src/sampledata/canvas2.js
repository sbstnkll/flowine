const canvasExample = {
  "id": 1,
  "header": {
    "canvasName": "MyCanvas2",
    "creationDate": "XXXX-XX-XX"
  },
  "body": {
    "nodes": [
      {
        "id": "340448a3-f42c-4d33-90cb-719f24093668",
        "type": "TEXT",
        "nodeType": "INPUT",
        "caption": "Text",
        "inputPorts": [
          {
            "id": "340448a3-f42c-4d33-90cb-719f24093668_i_1",
            "ioType": "INPUT",
            "dataType": "TEXT",
            "holderNodeId": "340448a3-f42c-4d33-90cb-719f24093668",
            "portState": {
              "connectedPorts": [],
              "data": {
                "dataType": "TEXT",
                "data": "Hallo1."
              }
            },
            "visible": false
          }
        ],
        "outputPorts": [
          {
            "id": "340448a3-f42c-4d33-90cb-719f24093668_o_1",
            "ioType": "OUTPUT",
            "dataType": "TEXT",
            "holderNodeId": "340448a3-f42c-4d33-90cb-719f24093668",
            "portState": {
              "connectedPorts": [
                "72940d70-3420-445a-aed6-49d9c416f710_i_1"
              ],
              "data": {
                "dataType": "TEXT",
                "data": null
              }
            },
            "visible": true
          },
          {
            "id": "340448a3-f42c-4d33-90cb-719f24093668_o_2",
            "ioType": "OUTPUT",
            "dataType": "TEXT",
            "holderNodeId": "340448a3-f42c-4d33-90cb-719f24093668",
            "portState": {
              "connectedPorts": [],
              "data": {
                "dataType": "TEXT",
                "data": null
              }
            },
            "visible": true
          }
        ],
        "actionFunction": {
          "language": "JavaScript",
          "code": "opdArray_[0] = ipdArray_[0]; return opdArray_;"
        },
        "nodeState": {
          "state": "01",
          "debugMessage": "this node is new. no data. no connections."
        }
      },
      {
        "id": "72940d70-3420-445a-aed6-49d9c416f710",
        "type": "UPPERCASE",
        "nodeType": "PRIMITIVE",
        "caption": "Uppercase",
        "inputPorts": [
          {
            "id": "72940d70-3420-445a-aed6-49d9c416f710_i_1",
            "ioType": "INPUT",
            "dataType": "TEXT",
            "holderNodeId": "72940d70-3420-445a-aed6-49d9c416f710",
            "portState": {
              "connectedPorts": [
                "340448a3-f42c-4d33-90cb-719f24093668_o_1"
              ],
              "data": {
                "dataType": "TEXT",
                "data": null
              }
            },
            "visible": true
          }
        ],
        "outputPorts": [
          {
            "id": "72940d70-3420-445a-aed6-49d9c416f710_o_1",
            "ioType": "OUTPUT",
            "dataType": "TEXT",
            "holderNodeId": "72940d70-3420-445a-aed6-49d9c416f710",
            "portState": {
              "connectedPorts": [],
              "data": {
                "dataType": "TEXT",
                "data": null
              }
            },
            "visible": true
          }
        ],
        "actionFunction": {
          "language": "JavaScript",
          "code": "(function() { opdArray_[0] = ipdArray_[0].toUpperCase(); return opdArray_; })();"
        },
        "nodeState": {
          "state": "01",
          "debugMessage": "this node is new. no data. no connections."
        }
      }
    ],
    "edges": [
      {
        "id": "ec29d15a-039b-4feb-80de-15a1adc74117",
        "sourcePortId": "340448a3-f42c-4d33-90cb-719f24093668_o_1",
        "targetPortId": "72940d70-3420-445a-aed6-49d9c416f710_i_1"
      }
    ]
  }
}

export default canvasExample;

