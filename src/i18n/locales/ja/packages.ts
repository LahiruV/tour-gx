export const packages = {
  title: 'パッケージを探索',
  subtitle: '忘れられないスリランカ体験のために厳選されたツアーパッケージをご覧ください',
  items: {
    culturalHeritage: {
      title: "文化遺産ツアー",
      description: "古代寺院、歴史的遺跡、伝統的な村々を探訪。",
      image: "https://images.pexels.com/photos/19759365/pexels-photo-19759365/free-photo-of-buddha-statues-at-gangaramaya-temple-in-colombo-sri-lanka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1299,
      duration: "6日間",
      groupSize: "最大12名",
      startDate: "通年利用可能"
    },
    beachParadise: {
      title: "ビーチパラダイスツアー",
      description: "手つかずのビーチでリラックスし、マリンアクティビティを楽しむ。",
      image: "https://images.pexels.com/photos/5549239/pexels-photo-5549239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 999,
      duration: "5日間",
      groupSize: "最大10名",
      startDate: "通年利用可能"
    },
    wildlifeSafari: {
      title: "野生動物サファリツアー",
      description: "象、ヒョウ、エキゾチックな鳥類を自然の生息地で観察。",
      image: "https://images.pexels.com/photos/17281950/pexels-photo-17281950/free-photo-of-elephants-among-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1499,
      duration: "7日間",
      groupSize: "最大8名",
      startDate: "通年利用可能"
    }
  },
  filters: {
    duration: {
      label: '期間',
      all: 'すべての期間',
      short: '1-3日',
      medium: '4-7日',
      long: '8日以上'
    },
    price: {
      label: '価格帯',
      all: 'すべての価格',
      budget: '$0 - $1,000',
      standard: '$1,000 - $2,000',
      luxury: '$2,000+'
    }
  },
  booking: {
    title: 'ツアー予約',
    form: {
      firstName: '名',
      lastName: '姓',
      email: 'メールアドレス',
      phone: '電話番号',
      travelDate: '旅行日',
      adults: '大人の人数',
      children: '子供の人数',
      services: {
        title: '追加サービス',
        meals: '食事を含む',
        transport: '送迎を含む',
        accommodation: '宿泊を含む'
      },
      specialRequests: {
        label: '特別なご要望',
        placeholder: '任意：食事制限や特別な配慮が必要な場合はこちらにご記入ください'
      },
      submit: '今すぐ予約',
      perPerson: '/人'
    }
  }
};