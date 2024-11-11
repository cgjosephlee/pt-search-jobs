export default eventHandler(async (event) => {
  const targetUrl = 'http://www.pt.org.tw/search_jobs_list.php'
  try {
    const body = await readBody(event)
    console.log(`req.body: ${JSON.stringify(body)}`)

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(body)
    })
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
