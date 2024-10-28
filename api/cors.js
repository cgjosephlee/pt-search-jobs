export const config = {
  runtime: 'edge'
}

// const allowedOrigins = []
const allowedTargets = ['www.pt.org.tw']

export default async function handler(req) {
  const oriUrl = new URL(req.url)
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
      method: req.method,
      headers: {
        'Content-Type': req.headers.get('Content-Type')
      },
      body: req.method === 'POST' ? await req.text() : undefined
    }
    // console.log(`req.method: ${fetchOptions.method}`)
    // for (const pair of req.headers.entries()) {
    //   console.log(`req.header: ${pair[0]}: ${pair[1]}`)
    // }
    // console.log(`req.body: ${fetchOptions.body}`)
    const response = await fetch(targetUrl, fetchOptions)

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
}
