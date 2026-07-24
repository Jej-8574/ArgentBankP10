import Header from '../../components/Header/Header'
import Footer from '../../components/footer/Footer'
import FeatureItem from '../../components/FeatureItem/FeatureItem'
import Hero from '../../components/Hero/Hero'
import './Home.css'
import iconChat from '/img/icon-chat.png'
import iconMoney from '/img/icon-money.png'
import iconSecurity from '/img/icon-security.png'
import bankTree from '/img/bank-tree.jpeg'

function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero backgroundImage={bankTree} />

        <section className="features">
          <h2 className="sr-only">Features</h2>

          <FeatureItem
            icon={iconChat}
            alt="Chat Icon"
            title="You are our #1 priority"
          >
            Need to talk to a representative? You can get in touch through our
            24/7 chat or through a phone call in less than 5 minutes.
          </FeatureItem>

          <FeatureItem
            icon={iconMoney}
            alt="Money Icon"
            title="More savings means higher rates"
          >
            The more you save with us, the higher your interest rate will be!
          </FeatureItem>

          <FeatureItem
            icon={iconSecurity}
            alt="Security Icon"
            title="Security you can trust"
          >
            We use top of the line encryption to make sure your data and money
            is always safe.
          </FeatureItem>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Home