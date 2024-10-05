import Image from 'next/image'
import Container from './Components/Container'
import HomeBanner from './Components/Home/HomeBanner'

export default function Home() {
  return (
    <div className='p-8'>
      <Container>
        <div>
          <HomeBanner></HomeBanner>
        </div>
      </Container>
    </div>
  )
}
