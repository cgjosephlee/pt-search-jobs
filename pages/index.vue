<script setup>
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
    console.error('Failed to fetch data:', error)
    alert('Failed to fetch data!')
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
  <v-main>
    <v-container
      class="d-flex flex-column align-start justify-space-between"
      max-width="800px"
      min-height="100vh"
    >
      <v-container>
        <v-row justify="center">
          <v-col cols="auto">
            <div class="text-h3 font-weight-bold">PT search jobs</div>
          </v-col>
        </v-row>
        <v-row justify="center">
          <v-col class="text-center">
            Source:
            <a href="http://www.pt.org.tw/search_jobs.php" target="_blank">
              http://www.pt.org.tw/search_jobs.php
            </a>
          </v-col>
        </v-row>
        <v-row justify="center" dense>
          <v-col cols="auto">
            <v-select
              v-model="title"
              :items="['物理治療師', '物理治療生', '其他']"
              label="招聘職務"
              density="comfortable"
              class="select-box-width"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center" dense>
          <v-col cols="auto">
            <v-select
              v-model="year"
              :items="[
                { title: '不拘', value: '0' },
                { title: '0-1年', value: '1' },
                { title: '1-2年', value: '2' },
                { title: '2-3年', value: '3' },
                { title: '3-4年', value: '4' },
                { title: '4-5年', value: '5' },
                { title: '5-6年', value: '6' },
                { title: '6-7年', value: '7' },
                { title: '7-8年', value: '8' },
                { title: '8-9年', value: '9' },
                { title: '10年以上', value: '10' }
              ]"
              label="工作經驗"
              density="comfortable"
              class="select-box-width"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center" dense>
          <v-col cols="auto">
            <v-select
              v-model="workplace"
              :items="[
                { title: '不拘', value: '' },
                { title: '台北市', value: '台北市' },
                { title: '基隆市', value: '基隆市' },
                { title: '新北市', value: '新北市' },
                { title: '宜蘭縣', value: '宜蘭縣' },
                { title: '新竹市', value: '新竹市' },
                { title: '新竹縣', value: '新竹縣' },
                { title: '桃園縣', value: '桃園縣' },
                { title: '苗栗縣', value: '苗栗縣' },
                { title: '台中市', value: '台中市' },
                { title: '彰化縣', value: '彰化縣' },
                { title: '南投縣', value: '南投縣' },
                { title: '嘉義市', value: '嘉義市' },
                { title: '嘉義縣', value: '嘉義縣' },
                { title: '雲林縣', value: '雲林縣' },
                { title: '台南市', value: '台南市' },
                { title: '高雄市', value: '高雄市' },
                { title: '澎湖縣', value: '澎湖縣' },
                { title: '屏東縣', value: '屏東縣' },
                { title: '台東縣', value: '台東縣' },
                { title: '花蓮縣', value: '花蓮縣' },
                { title: '金門縣', value: '金門縣' },
                { title: '連江縣', value: '連江縣' },
                { title: '南海諸島', value: '南海諸島' },
                { title: '釣魚台列嶼', value: '釣魚台列嶼' },
                { title: '其它', value: '其它' }
              ]"
              label="上班地點"
              density="comfortable"
              class="select-box-width"
            ></v-select>
          </v-col>
        </v-row>
        <v-row justify="center" dense>
          <v-col cols="auto">
            <v-btn :loading="isLoading" color="primary" class="mr-4" @click="searchJobs(1)">
              Search
            </v-btn>
            <v-btn color="secondary" @click="clearFilters"> Clear </v-btn>
          </v-col>
        </v-row>
        <v-row v-if="data.length">
          <v-col>
            <v-table density="compact">
              <thead>
                <tr>
                  <th>單位名稱</th>
                  <th>招募職缺</th>
                  <th>人數</th>
                  <th>登錄日期</th>
                  <th>人氣</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="job in data" :key="job.link">
                  <td>
                    <a :href="job.link" target="_blank">{{ job.job_unit }}</a>
                  </td>
                  <td>{{ job.job_title }}</td>
                  <td>{{ job.people_needed }}</td>
                  <td>{{ job.date }}</td>
                  <td>{{ job.popularity }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-col>
        </v-row>
        <v-row v-if="totalPage > 1">
          <v-col>
            <v-pagination
              v-model="page"
              :length="totalPage"
              @update:model-value="searchJobs"
            ></v-pagination>
          </v-col>
        </v-row>
      </v-container>
      <v-container>
        <v-row>
          <v-col class="text-center">
            © 2024 Joseph Lee,
            <a href="https://github.com/cgjosephlee/pt-search-jobs" target="_blank"> GitHub</a>
          </v-col>
        </v-row>
      </v-container>
    </v-container>
  </v-main>
</template>

<style scoped>
.select-box-width {
  width: 300px;
}
</style>
