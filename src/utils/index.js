export const headers = () => {
    return {
        headers: {
            "Authorization": `Bearer ${window.localStorage.getItem("access_token")}`
        }
    }
}

export const mainFormatter = (text, currencyCode) => {
    text.toLocaleString("en-US", {
        style: "currency",
        currency: currencyCode,
    })
    var formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currencyCode,
        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        //maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });
    try {
        return formatter.format(text)
    }
    catch (err) {
        return null
    }
}

export const numberFormatter = (text, currecyCode, minimumFractionDigits = 0) => {
    return new Intl.NumberFormat(currecyCode, { minimumFractionDigits: minimumFractionDigits }).format(text)
}