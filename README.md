# lms
Library management system using react and nodeJS

### Structure
- `src/client/lms-client` contains fromt-end application.
- `src/server/lms-server` contains the nodeJS application.

### Starting servers
#### Pre requisites
- Install node v16.4
#### Client
From the `src/client/lms-client` execute the following commands
```
npm install
npm run start
```
Application will be started on port **3000** and can be accessed as http://localhost:3000/

#### Server
From the `src/server/lms-server` directory, execute the following commands
```
npm install
npm startdev
```
This will start HTTP server on port 8000.

### REST APIs
Following is non-exhaustive list of REST APIs used for the application and their sample response (assuming HTTP server running on local PC, port 8000)

`http://localhost:8000/members/201/checkoutbooks`
```
[{"EMPNO":"1","CID":"201","ISBN":"01","ISSUEDATE":"02/04/2021","RETURNDATE":"01/05/2021","ISSUER_NAME":"SHAWN M","BOOKTITLE":"I am No Messiah","BOOKDESC":"A101","CATEGORY":"Autobiography","AUTHORNAME":"Meena Iyer","ISSUERNAME":"SHAWN M"},{"EMPNO":"2","CID":"201","ISBN":"02","ISSUEDATE":"17/10/2021","RETURNDATE":"15/11/2021","ISSUER_NAME":"DAVID C","BOOKTITLE":"Elephant in the Womb","BOOKDESC":"M090","CATEGORY":"Metaphorical Idiom","AUTHORNAME":"Kalki Koechlin","ISSUERNAME":"DAVID C"}]
```

```
http://localhost:8000/members/1011/carddetails
```
```
[{"MID":"1011","CID":"201","userid":"peterp","NAME":"PETERP","CARDSTATUS":"ACTIVE","CARDISSUEDATE":"01/01/2021","CARDEXPIRYDATE":"01/01/2025"}]
```

```
http://localhost:8000/search?q=SSR
```
```
[{"ISBN":"01","PID":"1197","BOOKTITLE":"I am No Messiah","BOOKDESC":"A101","CATEGORY":"Autobiography","PUBLISHERID":"3409","PERDAYCHARGE":"10","AUTHORNAME":"Meena Iyer","PNAME":"SSR ENTERPRISES","PLACE":"NOIDA","BID":"01"},{"ISBN":"010","PID":"1197","BOOKTITLE":"Habba Khatoon","BOOKDESC":"F311","CATEGORY":"Fiction","PUBLISHERID":"3409","PERDAYCHARGE":"10","AUTHORNAME":"Kajal Suri","PNAME":"SSR ENTERPRISES","PLACE":"NOIDA","BID":"01"},{"ISBN":"02","PID":"1197","BOOKTITLE":"Elephant in the Womb","BOOKDESC":"M090","CATEGORY":"Metaphorical Idiom","PUBLISHERID":"3409","PERDAYCHARGE":"15","AUTHORNAME":"Kalki Koechlin","PNAME":"SSR ENTERPRISES","PLACE":"NOIDA","BID":"01"},{"ISBN":"06","PID":"1197","BOOKTITLE":"The Christmas Pig","BOOKDESC":"N400","CATEGORY":"Novel","PUBLISHERID":"3409","PERDAYCHARGE":"10","AUTHORNAME":"JK Rowling","PNAME":"SSR ENTERPRISES","PLACE":"NOIDA","BID":"01"},{"ISBN":"07","PID":"1197","BOOKTITLE":"The Bench","BOOKDESC":"L277","CATEGORY":"Literature","PUBLISHERID":"3409","PERDAYCHARGE":"15","AUTHORNAME":"Meghan Markle","PNAME":"SSR ENTERPRISES","PLACE":"NOIDA","BID":"01"},{"ISBN":"09","PID":"1197","BOOKTITLE":"Home in the World","BOOKDESC":"A101","CATEGORY":"Autobiography","PUBLISHERID":"3409","PERDAYCHARGE":"10","AUTHORNAME":"Amartya Sen","PNAME":"SSR ENTERPRISES","PLACE":"NOIDA","BID":"01"}]
```

```
http://localhost:8000/misc/carddetails/201
```
```
{"MID":"1011","CID":"201","userid":"peterp","NAME":"PETER P","CARDSTATUS":"ACTIVE","CARDISSUEDATE":"01/01/2021","CARDEXPIRYDATE":"01/01/2025"}
```

```
http://localhost:8000/misc/overduebooks
```
```
[{"EMPNO":"3","CID":"203","ISBN":"03","ISSUEDATE":"10/09/2021","RETURNDATE":null,"BORROWER_NAME":"TARA E","ISSUER_NAME":"ASHWIN B","BOOKTITLE":"Life in the Clock Tower Valley","BOOKDESC":"F311","CATEGORY":"Fiction","AUTHORNAME":"Shakoor Rather"}]
```

```
http://localhost:8000/misc/librariancidsearch?CID=201
```
```
{"carddetails":{"MID":"1011","CID":"201","userid":"peterp","NAME":"PETER P","CARDSTATUS":"ACTIVE","CARDISSUEDATE":"01/01/2021","CARDEXPIRYDATE":"01/01/2025"},"checkedoutbooks":[{"EMPNO":"1","CID":"201","ISBN":"01","ISSUEDATE":"02/04/2021","RETURNDATE":"01/05/2021","ISSUER_NAME":"SHAWN M","BOOKTITLE":"I am No Messiah","BOOKDESC":"A101","CATEGORY":"Autobiography","AUTHORNAME":"Meena Iyer","ISSUERNAME":"SHAWN M"},{"EMPNO":"2","CID":"201","ISBN":"02","ISSUEDATE":"17/10/2021","RETURNDATE":"15/11/2021","ISSUER_NAME":"DAVID C","BOOKTITLE":"Elephant in the Womb","BOOKDESC":"M090","CATEGORY":"Metaphorical Idiom","AUTHORNAME":"Kalki Koechlin","ISSUERNAME":"DAVID C"}]}
```

```
http://localhost:8000/misc/getpublishers
```
```
[{"PID":"1197","PNAME":"SSR ENTERPRISES","PLACE":"NOIDA"},{"PID":"1297","PNAME":"ARNOLD GROUP","PLACE":"BANGALORE"},{"PID":"1650739380","PNAME":"Oreilly","PLACE":"USA"}]
```
