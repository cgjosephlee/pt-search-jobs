// import { defineEventHandler, getRequestURL, readBody } from 'h3'

// const allowedOrigins = []
const allowedTargets = ['www.pt.org.tw']

export default eventHandler(async (event) => {
  const oriUrl = getRequestURL(event)
  let targetUrl
  try {
    targetUrl = new URL(decodeURIComponent(oriUrl.search.substring(1)))
    // console.log(`targetUrl: ${targetUrl}`)

    // check if host is allowed
    const isAllowed = allowedTargets.some((pattern) => new RegExp(pattern).test(targetUrl.host))
    if (!isAllowed) {
      return new Response('Error: Host not allowed', { status: 403 })
    }
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 400 })
  }

  try {
    // forward request to target URL
    const fetchOptions = {
      method: event.method,
      headers: {
        'Content-Type': getHeader(event, 'Content-Type')
      },
      body: event.method === 'POST' ? await readRawBody(event, 'utf-8') : undefined
    }
    // console.log(`req.method: ${fetchOptions.method}`)
    // for (const pair of event.headers.entries()) {
    //   console.log(`req.header: ${pair[0]}: ${pair[1]}`)
    // }
    console.log(`req.body: ${decodeURIComponent(fetchOptions.body)}`)

    const response = await fetch(targetUrl, fetchOptions)
    // console.log(response)

    // Return unmodified response
    const responseBody = await response.text()
    const responseHeaders = new Headers(response.headers)
    responseHeaders.append('Cache-Control', 'max-age=60, s-maxage=600')
    // for (const pair of response.headers.entries()) {
    //   console.log(`response.header: ${pair[0]}: ${pair[1]}`)
    // }
    // console.log(`responseBody: ${responseBody}`)
    return new Response(responseBody, {
      status: response.status,
      headers: responseHeaders
    })
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 })
  }
})
