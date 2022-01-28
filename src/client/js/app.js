// Invoke POST request
const performAction = e => {
    e.preventDefault()

    let dest = document.getElementById('destination').value
    let travelDate = document.getElementById('date').value
    let todaysDate = Date.now()

    const data = {
        'destination': dest
    }

    postData(data)
    calcDays(todaysDate, travelDate)
}

// Add eventListener to submit button
document.getElementById('generate').addEventListener('click', performAction);

// POST request to server
const postData = async (data) => {
    const res = await fetch('http://localhost:3001/postData', {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
    try {
        const newData = await res.json();
        newData
        console.log('Client New Data:')
        console.log(newData)
    } catch(error) {
        console.log('error', error)
    }
}

const calcDays = (start, end) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    const days = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24) + 1)
    console.log('Days till departure:')
    console.log(days)
    return days
}

export { performAction }
