# SEJMOMETR

## SejmometrService

### Methods
- `getAllDeputies()`: `Observable<Array<SingleDeputyDataHttpResponse>>`
- `getDeputiesIndexedByPP()`: `Observable<Array<DeputiesSortedByPPRow>>`
- `getMostExpensiveDeputies()`: `Observable<Array<DeputyExpenseArrayItem>>`
- `getMostExpensivePP()`: `Observable<Array<PPexpense>>`

### Interfaces
- `src/interfaces/sejmometr.ts`
- `src/interfaces/deputies.ts`

### Method examples:
- `getAllDeputies().subscribe(data => {})` data - list of all deputies
- `getDeputiesIndexedByPP().subscribe(data => {})` data - list of PP with their deputies as attribute
- `getMostExpensiveDeputies().subscribe(data => {})` data - list of all deputies (with expenses info included)
- `getMostExpensivePP().subscribe(data => {})` data - list of all PP (with expenses info included)
