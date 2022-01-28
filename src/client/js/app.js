// Invoke POST request
const performAction = e => {
    e.preventDefault()

    let dest = document.getElementById('destination').value
    const data = {
        'destination': dest
    }

    postData(data)
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

export { performAction }
