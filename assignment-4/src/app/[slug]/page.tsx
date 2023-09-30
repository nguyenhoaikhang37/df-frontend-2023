'use client'

import { useParams } from 'next/navigation'
import { Container } from '../../components/common'

export default function BookDetail() {
  const params = useParams()

  // Route -> /shop/[tag]/[item]
  // URL -> /shop/shoes/nike-air-max-97
  // `params` -> { tag: 'shoes', item: 'nike-air-max-97' }
  console.log(params)

  return (
    <main>
      <Container>
        <h1>BookDetail</h1>
      </Container>
    </main>
  )
}
