console.log("Hello")
        const weatherForm = document.querySelector('form')
        const inputValue = document.querySelector('input')
        const messageOne = document.getElementById('message-1')
        const messageTwo = document.getElementById('message-2')


        weatherForm.addEventListener('submit', (e) => {
            e.preventDefault()
            const location = inputValue.value
            console.log(location)
            messageOne.textContent = 'Loading...'
            messageTwo.textContent = ''
        

            const url = 'http://localhost:3000/weather?address=' + location
            console.log(url)
            fetch(url).then((response) => {
                response.json().then((data) => {
                    if (data.error) {
                        console.log(data.error)
                        messageOne.textContent = data.error
                    }
                    else {
                     messageOne.textContent = data.location
                     messageTwo.textContent = data.forecast
                    }

                })
            })

        })