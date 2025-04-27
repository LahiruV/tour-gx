export const packages = {
  title: '探索我们的套餐',
  subtitle: '探索我们精心策划的旅游套餐，体验难忘的斯里兰卡之旅',
  items: {
    culturalHeritage: {
      title: "文化遗产之旅",
      description: "探索古寺、历史遗迹和传统村落。",
      image: "https://images.pexels.com/photos/19759365/pexels-photo-19759365/free-photo-of-buddha-statues-at-gangaramaya-temple-in-colombo-sri-lanka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1299,
      duration: "6天",
      groupSize: "最多12人",
      startDate: "全年可订"
    },
    beachParadise: {
      title: "海滩天堂之旅",
      description: "在原始海滩放松，享受水上运动活动。",
      image: "https://images.pexels.com/photos/5549239/pexels-photo-5549239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 999,
      duration: "5天",
      groupSize: "最多10人",
      startDate: "全年可订"
    },
    wildlifeSafari: {
      title: "野生动物探险之旅",
      description: "在自然栖息地邂逅大象、豹子和异国鸟类。",
      image: "https://images.pexels.com/photos/17281950/pexels-photo-17281950/free-photo-of-elephants-among-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1499,
      duration: "7天",
      groupSize: "最多8人",
      startDate: "全年可订"
    }
  },
  filters: {
    duration: {
      label: '行程天数',
      all: '所有天数',
      short: '1-3天',
      medium: '4-7天',
      long: '8天以上'
    },
    price: {
      label: '价格范围',
      all: '所有价格',
      budget: '$0 - $1,000',
      standard: '$1,000 - $2,000',
      luxury: '$2,000+'
    }
  },
  booking: {
    title: '预订行程',
    form: {
      firstName: '名',
      lastName: '姓',
      email: '电子邮件',
      phone: '电话',
      travelDate: '出行日期',
      adults: '成人人数',
      children: '儿童人数',
      services: {
        title: '附加服务',
        meals: '包含餐食',
        transport: '包含交通',
        accommodation: '包含住宿'
      },
      specialRequests: {
        label: '特殊要求',
        placeholder: '可选：任何饮食要求或特殊安排'
      },
      submit: '立即预订',
      perPerson: '/人'
    }
  }
}