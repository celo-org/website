import getConfig from 'next/config'

export async function wrenApi (){
    const { serverRuntimeConfig } = getConfig()
    const  res = await fetch(`https://www.wren.co/api/offset-orders`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${serverRuntimeConfig.WREN_API}`
        },
    })
    return res.json()
    
}