export const packages = {
  title: 'हमारे पैकेज खोजें',
  subtitle: 'यादगार श्रीलंकाई अनुभव के लिए हमारे सावधानीपूर्वक चुने गए यात्रा पैकेज खोजें',
  items: {
    culturalHeritage: {
      title: "सांस्कृतिक विरासत टूर",
      description: "प्राचीन मंदिरों, ऐतिहासिक स्थलों और पारंपरिक गांवों की खोज करें।",
      image: "https://images.pexels.com/photos/19759365/pexels-photo-19759365/free-photo-of-buddha-statues-at-gangaramaya-temple-in-colombo-sri-lanka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1299,
      duration: "6 दिन",
      groupSize: "अधिकतम 12 लोग",
      startDate: "पूरे वर्ष उपलब्ध"
    },
    beachParadise: {
      title: "बीच पैराडाइज एस्केप",
      description: "अछूते समुद्र तटों पर आराम करें और जल क्रीड़ाओं का आनंद लें।",
      image: "https://images.pexels.com/photos/5549239/pexels-photo-5549239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 999,
      duration: "5 दिन",
      groupSize: "अधिकतम 10 लोग",
      startDate: "पूरे वर्ष उपलब्ध"
    },
    wildlifeSafari: {
      title: "वन्यजीव सफारी एडवेंचर",
      description: "हाथियों, तेंदुओं और दुर्लभ पक्षियों से उनके प्राकृतिक आवास में मिलें।",
      image: "https://images.pexels.com/photos/17281950/pexels-photo-17281950/free-photo-of-elephants-among-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1499,
      duration: "7 दिन",
      groupSize: "अधिकतम 8 लोग",
      startDate: "पूरे वर्ष उपलब्ध"
    }
  },
  filters: {
    duration: {
      label: 'अवधि',
      all: 'सभी अवधियां',
      short: '1-3 दिन',
      medium: '4-7 दिन',
      long: '8+ दिन'
    },
    price: {
      label: 'मूल्य श्रेणी',
      all: 'सभी मूल्य',
      budget: '$0 - $1,000',
      standard: '$1,000 - $2,000',
      luxury: '$2,000+'
    }
  },
  booking: {
    title: 'अपनी यात्रा बुक करें',
    form: {
      firstName: 'पहला नाम',
      lastName: 'अंतिम नाम',
      email: 'ईमेल',
      phone: 'फोन',
      travelDate: 'यात्रा की तिथि',
      adults: 'वयस्कों की संख्या',
      children: 'बच्चों की संख्या',
      services: {
        title: 'अतिरिक्त सेवाएं',
        meals: 'भोजन शामिल करें',
        transport: 'परिवहन शामिल करें',
        accommodation: 'आवास शामिल करें'
      },
      specialRequests: {
        label: 'विशेष अनुरोध',
        placeholder: 'वैकल्पिक: कोई आहार संबंधी आवश्यकताएं या विशेष व्यवस्था'
      },
      submit: 'अभी बुक करें',
      perPerson: '/व्यक्ति'
    }
  }
};