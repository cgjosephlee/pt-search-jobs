export async function fetchJobData(title, year, workplace, page) {
  const payload = {
    Title: title,
    Year: year,
    Workplace: workplace,
    p: page
  }
  console.log('fetchJobData: payload:', payload)

  const text = await $fetch('/api/getPageContent', {
    method: 'POST',
    body: payload
  })

  const parser = new DOMParser()
  const doc = parser.parseFromString(text, 'text/html')

  const rows = doc.querySelectorAll(
    'body table:nth-child(3) tr td table tr:nth-child(2) td:nth-child(2) table tr:nth-child(2) td div table tr:nth-child(2) td div table tr:nth-child(2) td table:nth-child(2) tr:nth-child(2) td table tr'
  )
  const totalPage = doc.querySelectorAll('#page_n_form table tr td font:nth-child(2) b').length

  const data = []

  rows.forEach((row) => {
    const linkTag = row.querySelector('a')
    const jobUnit = linkTag ? linkTag.textContent.trim() : null
    const href = linkTag ? 'http://www.pt.org.tw/' + linkTag.getAttribute('href') : null

    const columns = row.querySelectorAll('tr > td')
    if (columns.length > 1) {
      const jobTitle = columns[1].textContent.trim()
      const peopleNeeded = columns[2].textContent.trim()
      const date = columns[3].textContent.trim()
      const popularity = columns[4].textContent.trim()

      data.push({
        job_unit: jobUnit,
        job_title: jobTitle,
        people_needed: peopleNeeded,
        date: date,
        popularity: popularity,
        link: href
      })
    }
  })

  console.log(`fetchJobData: rows size: ${rows.length}`)
  console.log(`fetchJobData: data size: ${data.length}`)
  console.log(`fetchJobData: totalPage size: ${totalPage}`)

  return {
    data: data,
    totalPage: totalPage
  }
}
