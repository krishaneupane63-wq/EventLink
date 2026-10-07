export const vendorDetail = {
  id: 1,
  name: 'Annapurna Catering Services',
  category: 'Catering',
  location: 'Kathmandu, Nepal',
  rating: 4.8,
  reviewCount: 124,
  priceRange: 'NPR 500–1,200 per plate',
  verified: true,
  badge: 'Top Rated',
  phone: '+977-98XXXXXXXX',
  email: 'info@annapurnacatering.np',
  website: 'annapurnacatering.np',
  established: '2015',
  teamSize: '15–20 staff',
  description: `Annapurna Catering Services has been delivering exceptional food experiences
    across Kathmandu Valley since 2015. We specialise in wedding feasts, corporate lunches,
    and birthday celebrations, blending traditional Nepali recipes with modern presentation.
    Our team of professional chefs and service staff ensures every event runs smoothly from
    setup to clean-up.`,
  services: [
    {
      name: 'Wedding Catering',
      price: 'From NPR 800/plate',
      description: 'Full-service wedding feast for 100–500 guests',
    },
    {
      name: 'Corporate Lunch',
      price: 'From NPR 500/plate',
      description: 'Buffet and plated options for office events',
    },
    {
      name: 'Birthday Catering',
      price: 'From NPR 600/plate',
      description: 'Customised menus for birthday celebrations',
    },
    {
      name: 'Live Counter Setup',
      price: 'NPR 15,000 flat',
      description: 'Pasta, chaat, or dessert live counters',
    },
  ],
  portfolio: [
    'https://images.unsplash.com/photo-1555244162-803834f70033?w=600',
    'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=600',
    'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?w=600',
    'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600',
    'https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=600',
  ],
  tags: ['Wedding', 'Corporate', 'Birthday', 'Buffet', 'Live Counter'],
  reviews: [
    {
      id: 1,
      customerName: 'Priya Shrestha',
      avatar: 'PS',
      rating: 5,
      date: 'August 2026',
      comment:
        "Absolutely amazing service! The food was delicious and the team was so professional. Our wedding guests couldn't stop complimenting the catering. Will definitely use them again.",
      event: 'Wedding · 300 guests',
    },
    {
      id: 2,
      customerName: 'Rohan Adhikari',
      avatar: 'RA',
      rating: 5,
      date: 'July 2026',
      comment:
        'We hired them for our company annual dinner. The buffet spread was incredible — so many options and everything was fresh. The staff were punctual and efficient.',
      event: 'Corporate Event · 80 guests',
    },
    {
      id: 3,
      customerName: 'Sujata Tamang',
      avatar: 'ST',
      rating: 4,
      date: 'June 2026',
      comment:
        'Very good food and presentation. The live pasta counter was a big hit. Minor delay in setup but everything was sorted before guests arrived. Would recommend.',
      event: 'Birthday Party · 60 guests',
    },
    {
      id: 4,
      customerName: 'Bikash Rai',
      avatar: 'BR',
      rating: 5,
      date: 'May 2026',
      comment:
        'Top-notch professionalism. They customised the entire menu to match our theme and dietary requirements. Excellent value for money.',
      event: 'Wedding · 150 guests',
    },
  ],
  similarVendors: [7, 10],
}
