# API Documentation
*Generated on Sun Jun 07 2020*


---
## `GET */`

**Handler:**&nbsp;&nbsp;`GeneralController.status`

**Example response:**
```
{
    success: true,
    message: "Service online.",
    data: {
        version: "0.1.0",
        name: "Windesfiles API",
        time: 1591530404,
        uptime: 15942.572,
        cdn: "cdn.windesfiles.nl",
        mirrors: [
            "api.windesfiles.nl",
            "api.windesfiles.se0.dev"
        ],
        compatibility: {
            "macOS": [
                "1.0"
            ],
            "iOS": [
                "1.1",
                "1.0"
            ],
            "Windows": [
                "1.0"
            ],
            "androidOS": [
                "1.0"
            ]
        },
        plannedEvents: [
            {
                "ID": "C2DE1AAD-14D8-4BA6-94E4-323DF493361D",
                "name": "Maintenance",
                "description": "Service under maintenance, we will be back later.",
                "blocking": true,
                "startAt": 1583967600,
                "endAt": 1589925600
            }
        ]
    }
}
```


---
## `GET */course`

**Handler:**&nbsp;&nbsp;`CourseController.index`

**Example response:**
```
{
    success: true,
    data: [
        {
            ID: "",
            name: "PO2",
            version: 19,
            fileCount: 23,
            teachers: [
                "Karla Derks-Wolfhuizen"
            ]
        },
        {
            ID: "818C0810-6E66-4A62-B9B5-0963180D1B37",
            name: "KBSd",
            version: 19,
            fileCount: 36,
            teachers: [
                "Gilbert Loepsiena",
                "Henk Bosman"
            ]
        }
    ]
}
```


---
## `GET */course?ID={:ID}`

**Handler:**&nbsp;&nbsp;`CourseController.show`

**Example response:**
```
{
    success: true,
    data: {
        ID: "818C0810-6E66-4A62-B9B5-0963180D1B37",
        name: "KBSd",
        version: 19,
        teachers: [
            "Gilbert Loepsiena",
            "Henk Bosman"
        ],
        files: [
            {
                ID: "02C488EC-8E19-4177-A049-67B4DDDAFF85",
                name: "Week 1",
                type: "directory",
                content: [
                    {
                        ID: "77F98DAC-BAC5-4C64-BA0D-6378D50CDB11",
                        name: "Major.pdf",
                        type: "file"
                    },
                    {
                        ID: "77F98DAC-BAC5-4C64-BA0D-6378D50CDB11",
                        name: "Beoordelings matrix.docx",
                        type: "file"
                    }
                ]
            }
        ]
    }
}
```


---
## `GET */resource`

**Handler:**&nbsp;&nbsp;`GeneralController.resource`


---
## `POST */authentication/signin`

**Handler:**&nbsp;&nbsp;`AuthenticationController.signin`

**Example response:**
```
{
    success: true,
    message: "Signed in.",
    data: {
        userID: "3FEF3CA3-3A37-435B-BC80-63721A4D53A7"
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI",
    }
}
```
