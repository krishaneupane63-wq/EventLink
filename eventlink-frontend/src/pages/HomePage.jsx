import HeroSection from '../components/HeroSection'
import CategoryCards from '../components/CategoryCards'
import HowItWorks from '../components/HowItWorks'
import TestimonialStrip from '../components/TestimonialStrip'
import VendorCTA from '../components/VendorCTA'
import Footer from '../components/Footer'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryCards />
      <HowItWorks />
      <TestimonialStrip />
      <VendorCTA />
      <Footer />
    </>
  )
}
