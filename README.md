# SEJMOMETR
## SejmometrService
### Methods
- `getSubject(subjectName: string)`
- `sumDeputyExpenses(deputy: SingleDeputyDataHttpResponse)`
### Interface
`src/interfaces/sejmometrProvider.ts`
### Get subject method examples:
- `getSubject('deputiesHttpResponse')`: `Observable<DeputyDataHttpResponse>` - subscribe to it to get list of all deputies
- `getSubject('allDeputies')`: `Subject<Array<SingleDeputyDataHttpResponse>>` - subscribe to it to get list of all deputies (minus deputies with outdated ticket)
- `getSubject('deputiesIndexedByPP')`: `Subject<Array<Array<SingleDeputyDataHttpResponse>>>` - subscribe to it to get list of all deputies (minus deputies with outdated ticket) indexed by their Political Parties
- `getSubject('mostExpensiveDeputies')`: `Subject<Array<DeputyExpenseArrayItem>>` - subscribe to it to get list of all deputies (minus deputies with outdated ticket) sorted by their overall expenses