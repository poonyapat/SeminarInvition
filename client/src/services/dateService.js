export default {
    firstDate: (seminar) => {
        let min = "9999-01-01T00:00:00.000"
        if (!seminar.dates) {
            return min
        }
        for (let i = 0; i < seminar.dates.length; i++) {
            if (seminar.dates[i] < min)
                min = seminar.dates[i]
        }
        return min
    },
    lastDate: (seminar) => {
        let max = "2000-01-01T00:00:00.000"
        if (!seminar.dates){
            return max
        }
        for (let i = 0; i < seminar.dates.length; i++){
            if (seminar.dates[i] > max)
                max = seminar.dates[i]
        }
        return max
    }
}