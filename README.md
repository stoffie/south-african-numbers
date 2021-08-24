# South African Numbers
by Damiano Stoffie

Per la realizzazione dell'esercizio ho impiegato nodejs v14.17.5. Ho scelto di realizzare una API, viste le possibili soluzioni proposte.

- Ho utilizzato Express per la realizzazione delle API.
- Sequelize con sqlite3 per la realizzazione del modello di persistenza.
- Per la lettura del file excel ho utilizzato la libreria "xlsx".
- Per la scrittura dei test ho impiegato Mocha, Chai, Sinon, e Supertest.

(Notare che il database viene cancellato una volta riavviato il programma come da configurazione nel file `src/sequelize.js`)

Per installare le dipendenze del progetto utilizzare
```
npm install
```
Per eseguire la test suite utilizzare
```
npm test
```
Per eseguire localmente il servizio utilizzare
```
npm run dev
```
Il servizio sarà avviato all'indirizzo http://localhost:8080

Utilizzare il seguente comando (da WLS, oppure usando una installazione di curl tipo cygwin) per verificare un singolo numero:
```
curl http://localhost:8080/validate_phone/27831234567
```
Per effettuare l'upload di un file excel utilizzare:
```
curl -X PUT -F xlsx=@assets/South_African_Mobile_Numbers.xlsx http://localhost:8080/upload_xlsx
```
A questo punto per scaricare i numeri estratti suddivisi per categoria (corretti, recuperati e incorretti):
```
curl http://localhost:8080/
```
Alternativamente se non si adopopera WLS è possibile utilizzare un programma come Postman per la verifica del funzionamento delle API.