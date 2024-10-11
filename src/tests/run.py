import requests
from bs4 import BeautifulSoup
import pandas as pd

rows = []
for i in range(7):
    url = 'http://www.pt.org.tw/search_jobs_list.php'
    data = {
        'Title': '物理治療師',  # Select job title
        # 'Year': '2',            # Select work experience (e.g., 1-2 years)
        'Workplace': '新北市',   # Select workplace
        'p': i+1,
    }
    response = requests.post(url, data=data)
    soup = BeautifulSoup(response.text, 'html.parser')
    rows += soup.select("body > table:nth-child(3) > tr > td > table > tr:nth-child(2) > td:nth-child(2) > table > tr:nth-child(2) > td > div > table > tr:nth-child(2) > td > div > table > tr:nth-child(2) > td > table:nth-child(2) > tr:nth-child(2) > td > table > tr")

# Initialize an empty list to store the extracted data
table_data = []

# Iterate through each row and extract relevant data
for row in rows:
    # Find the job unit, job vacancy, number of people, date, popularity, and the href link
    link_tag = row.find('a')
    if link_tag:
        job_unit = link_tag.text.strip()
        href = "http://www.pt.org.tw/" + link_tag['href']
    else:
        job_unit = href = None

    columns = row.select('tr > td')
    if len(columns) > 1:
        job_title = columns[1].text.strip()
        people_needed = columns[2].text.strip()
        date = columns[3].text.strip()
        popularity = columns[4].text.strip()

        # Append the extracted data to the list
        table_data.append({
            'job_unit': job_unit,
            'job_title': job_title,
            'people_needed': people_needed,
            'date': date,
            'popularity': popularity,
            'link': href
        })

df = pd.DataFrame(table_data)
df.to_csv("data.csv", index=False)
