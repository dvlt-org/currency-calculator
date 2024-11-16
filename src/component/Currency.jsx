import React from 'react'

export default function Currency(props) {
    const {
        currencyOptions,
        fromCurrency,
        toCurrency,
    } = props

    console.log(currencyOptions)
    return (
        <div>
            <input type="text" />
            <select>
                {
                    currencyOptions.map(item => {
                        return (
                            <option key={item}>{item}</option>
                        )
                    })
                }
            </select>
        </div>
    )
}
