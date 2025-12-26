// const URL_curr = `https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`

const inputAmount = document.querySelector('#inputAmount')
const dropdowns = document.querySelectorAll(".dropdown select")
const from = document.querySelector('#from')
const fromImg = document.querySelector('#fromImg')
const to = document.querySelector('#to')
const toImg = document.querySelector('#toImg')
const convertBtn = document.querySelector('#convertBtn')
const msg = document.querySelector('.msg')


for (currCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.textContent = currCode;
    newOptions.value = currCode;
    to.append(newOptions);
}   

for (currCode in countryList) {
    let newOptions = document.createElement("option");
    newOptions.textContent = currCode;
    newOptions.value = currCode;
    from.append(newOptions);
}   

to.addEventListener('change', (event) => {
    var selectedValueTo = event.target.value;
    toImg.src=`https://flagsapi.com/${countryList[selectedValueTo]}/flat/64.png`
})

from.addEventListener('change', (event) => {
    var selectedValueFrom = event.target.value;
    fromImg.src=`https://flagsapi.com/${countryList[selectedValueFrom]}/flat/64.png`
})


let currency =async (x,y,z) => {
    try {
        let response = await fetch(`https://api.frankfurter.dev/v1/latest?base=${x}&symbols=${y}`)
        if (!response.ok) {
            throw new Error('API Request Failed')
        }
        let data = await response.json()
        console.log(data)
        msg.textContent = data.amount+data.base+' = '+data.rates[y]+y
        z.value = parseFloat(data.rates[y])*parseInt(z.value)
    }catch (error) {
        msg.textContent = 'Data not found or an error occured'
        z.value = ''
    }
}


convertBtn.addEventListener('click', (event) => {
    const x = from.value.trim()
    const y = to.value.trim()
    const z = inputAmount
    currency(x,y,z)
})
