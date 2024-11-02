// src/components/admin/cardBoxes/CardBoxFormWrapper.jsx

import {
  cardBoxSchema,
  createCardBox,
  updateCardBox,
  getActiveCars,
  getCardBoxSections,
} from '@/actions/admin/cardBoxes'
import CardBoxForm from './CardBoxForm'

export default async function CardBoxFormWrapper({ cardBox }) {
  const [cars, sections] = await Promise.all([getActiveCars(), getCardBoxSections()])

  return <CardBoxForm cardBox={cardBox} cars={cars} sections={sections} />
}
