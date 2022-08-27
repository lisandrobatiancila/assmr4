import { concatAll, count, distinct, from, groupBy, mergeMap, partition, reduce, zip } from "rxjs"
import { map } from "rxjs/internal/operators/map"

export function dashBoardBar(params) {
    let labelKey = []
    let posted = []
    let assumed = []

    from(params).pipe(map(data$ => labelKey.push(data$.key))).subscribe()//for label

    from(params)//used for posted
        .pipe(
            groupBy(data$ => data$.totalPosted),
            mergeMap(data$ => data$.pipe(
                reduce((acc, base) => [...acc, base.totalPosted], [])
            )),
            concatAll(),
            map(d => posted.push(d))
        )
        .subscribe()

    from(params)//used for assumed
        .pipe(
            groupBy(data$ => data$.totalPosted),
            mergeMap(data$ => data$.pipe(
                reduce((acc, base) => [...acc, base.assumed], [])
            )),
            concatAll(),
            map(d => assumed.push(d))
        )
        .subscribe()
        
    return{
        labels: labelKey,
        datasets: [
            {
                label: 'posted',
                data: posted,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ]
            },
            {
                label: 'assumed',
                data: assumed,
                backgroundColor: [
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                ]
            }
        ],
        
    }
}