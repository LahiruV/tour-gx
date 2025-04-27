export const packages = {
  title: 'Explore Our Packages',
  subtitle: 'Discover our carefully curated travel packages for an unforgettable Sri Lankan experience',
  items: {
    culturalHeritage: {
      title: "Cultural Heritage Tour",
      description: "Explore ancient temples, historical sites, and traditional villages.",
      image: "https://images.pexels.com/photos/19759365/pexels-photo-19759365/free-photo-of-buddha-statues-at-gangaramaya-temple-in-colombo-sri-lanka.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1299,
      duration: "6 Days",
      groupSize: "Max 12 people",
      startDate: "Available year-round"
    },
    beachParadise: {
      title: "Beach Paradise Escape",
      description: "Relax on pristine beaches and enjoy water sports activities.",
      image: "https://images.pexels.com/photos/5549239/pexels-photo-5549239.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 999,
      duration: "5 Days",
      groupSize: "Max 10 people",
      startDate: "Available year-round"
    },
    wildlifeSafari: {
      title: "Wildlife Safari Adventure",
      description: "Encounter elephants, leopards, and exotic birds in their natural habitat.",
      image: "https://images.pexels.com/photos/17281950/pexels-photo-17281950/free-photo-of-elephants-among-trees.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      price: 1499,
      duration: "7 Days",
      groupSize: "Max 8 people",
      startDate: "Available year-round"
    }
  },
  filters: {
    duration: {
      label: 'Duration',
      all: 'All Durations',
      short: '1-3 Days',
      medium: '4-7 Days',
      long: '8+ Days'
    },
    price: {
      label: 'Price Range',
      all: 'All Prices',
      budget: '$0 - $1,000',
      standard: '$1,000 - $2,000',
      luxury: '$2,000+'
    }
  },
  booking: {
    title: 'Book Your Trip',
    form: {
      firstName: 'First Name',
      lastName: 'Last Name',
      email: 'Email',
      phone: 'Phone',
      travelDate: 'Travel Date',
      adults: 'Number of Adults',
      children: 'Number of Children',
      services: {
        title: 'Additional Services',
        meals: 'Include Meals',
        transport: 'Include Transport',
        accommodation: 'Include Accommodation'
      },
      specialRequests: {
        label: 'Special Requests',
        placeholder: 'Optional: Any dietary requirements or special accommodations'
      },
      submit: 'Book Now',
      perPerson: '/person'
    }
  }
};