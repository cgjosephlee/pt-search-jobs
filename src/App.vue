<script setup>
import { ref } from 'vue'
import { fetchJobData } from './fetchJobData'

const title = ref('物理治療師')
const year = ref('0')
const workplace = ref('')
const page = ref(1)
const data = ref([])
const totalPage = ref(1)
const isLoading = ref(false)

async function searchJobs(pageNum) {
  isLoading.value = true
  page.value = pageNum
  try {
    const result = await fetchJobData(title.value, year.value, workplace.value, page.value)
    data.value = result.data
    totalPage.value = result.totalPage
  } catch (error) {
    console.error('Error fetching job data:', error)
  } finally {
    isLoading.value = false
  }
}

function clearFilters() {
  title.value = '物理治療師'
  year.value = '0'
  workplace.value = ''
  page.value = 1
  data.value = []
  totalPage.value = 1
}
</script>

<template>
  <header>
    <div class="wrapper">PT search jobs</div>
  </header>

  <main>
    <div style="height: 1rem"></div>
    <div>
      Source:
      <a href="http://www.pt.org.tw/search_jobs.php" target="_blank"
        >http://www.pt.org.tw/search_jobs.php</a
      >
    </div>
    <div>
      <label for="title">招聘職務：</label>
      <select id="title" v-model="title">
        <option value="物理治療師">物理治療師</option>
        <option value="物理治療生">物理治療生</option>
        <option value="其他">其他</option>
      </select>
    </div>
    <div>
      <label for="year">工作經驗：</label>
      <select id="year" v-model="year">
        <option value="0">不拘</option>
        <option value="1">0-1年</option>
        <option value="2">1-2年</option>
        <option value="3">2-3年</option>
        <option value="4">3-4年</option>
        <option value="5">4-5年</option>
        <option value="6">5-6年</option>
        <option value="7">6-7年</option>
        <option value="8">7-8年</option>
        <option value="9">8-9年</option>
        <option value="10">10年以上</option>
      </select>
    </div>
    <div>
      <label for="workplace">上班地點：</label>
      <select id="workplace" v-model="workplace">
        <option value="">不拘</option>
        <option value="台北市">台北市</option>
        <option value="基隆市">基隆市</option>
        <option value="新北市">新北市</option>
        <option value="宜蘭縣">宜蘭縣</option>
        <option value="新竹市">新竹市</option>
        <option value="新竹縣">新竹縣</option>
        <option value="桃園縣">桃園縣</option>
        <option value="苗栗縣">苗栗縣</option>
        <option value="台中市">台中市</option>
        <option value="彰化縣">彰化縣</option>
        <option value="南投縣">南投縣</option>
        <option value="嘉義市">嘉義市</option>
        <option value="嘉義縣">嘉義縣</option>
        <option value="雲林縣">雲林縣</option>
        <option value="台南市">台南市</option>
        <option value="高雄市">高雄市</option>
        <option value="澎湖縣">澎湖縣</option>
        <option value="屏東縣">屏東縣</option>
        <option value="台東縣">台東縣</option>
        <option value="花蓮縣">花蓮縣</option>
        <option value="金門縣">金門縣</option>
        <option value="連江縣">連江縣</option>
        <option value="南海諸島">南海諸島</option>
        <option value="釣魚台列嶼">釣魚台列嶼</option>
        <option value="其它">其它</option>
      </select>
    </div>
    <button @click="searchJobs(1)" :disabled="isLoading" style="margin: 10px">
      <span v-if="isLoading" class="loader"></span>
      <span v-else>Search</span>
    </button>
    <button @click="clearFilters" style="margin: 10px">Clear</button>

    <table v-if="data.length" style="border-collapse: collapse; width: 100%">
      <thead>
        <tr>
          <th style="border: 1px solid #ddd; padding: 8px">單位名稱</th>
          <th style="border: 1px solid #ddd; padding: 8px">招募職缺</th>
          <th style="border: 1px solid #ddd; padding: 8px">人數</th>
          <th style="border: 1px solid #ddd; padding: 8px">登錄日期</th>
          <th style="border: 1px solid #ddd; padding: 8px">人氣</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="job in data" :key="job.link">
          <td style="border: 1px solid #ddd; padding: 8px">
            <a :href="job.link" target="_blank">{{ job.job_unit }}</a>
          </td>
          <td style="border: 1px solid #ddd; padding: 8px">{{ job.job_title }}</td>
          <td style="border: 1px solid #ddd; padding: 8px">{{ job.people_needed }}</td>
          <td style="border: 1px solid #ddd; padding: 8px">{{ job.date }}</td>
          <td style="border: 1px solid #ddd; padding: 8px">{{ job.popularity }}</td>
        </tr>
      </tbody>
    </table>

    <div v-if="totalPage > 1">
      <span
        v-for="pageNum in totalPage"
        :key="pageNum"
        @click="searchJobs(pageNum)"
        :style="{
          cursor: 'pointer',
          margin: '0 5px',
          textDecoration: pageNum === page ? 'underline' : 'none'
        }"
      >
        {{ pageNum }}
      </span>
    </div>
  </main>

  <footer>
    <p>© 2024 Joseph Lee, <a href="https://github.com/cgjosephlee/pt-search-jobs">GitHub</a></p>
  </footer>
</template>

<style scoped>
header {
  font-size: 2rem;
  font-weight: bold;
  line-height: 1.5;
}

.loader {
  width: 12px;
  height: 12px;
  border: 2px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
