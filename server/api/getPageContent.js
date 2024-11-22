export default eventHandler(async (event) => {
  const targetUrl = 'http://www.pt.org.tw/search_jobs_list.php'
  const query = getQuery(event)
  console.log(`req.body: ${JSON.stringify(query)}`)

  const responseText = await $fetch(targetUrl, {
    method: 'POST',
    body: new URLSearchParams(query)
  })

  appendResponseHeader(event, 'Cache-Control', 'max-age=60, s-maxage=600')

  return responseText
})
