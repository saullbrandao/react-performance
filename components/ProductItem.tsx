import dynamic from 'next/dynamic'
import { AddProductToWishlistProps } from './AddProductToWishlist'
import { memo, useState } from 'react'

const AddProductToWishlist = dynamic<AddProductToWishlistProps>(
  () => {
    return import('./AddProductToWishlist').then(
      mod => mod.AddProductToWishlist,
    )
  },
  {
    loading: () => <span>Carregando...</span>,
  },
)

type ProductItemProps = {
  product: {
    id: number
    title: string
    price: number
    formattedPrice: string
  }
  onAddToWishlist: (id: number) => void
}

const ProductItemComponent = ({
  product,
  onAddToWishlist,
}: ProductItemProps) => {
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  return (
    <div>
      {product.title} - <strong>{product.formattedPrice}</strong>
      <button onClick={() => setIsAddingToWishlist(true)}>
        Adicionar aos favoritos
      </button>
      {isAddingToWishlist && (
        <AddProductToWishlist
          onAddToWishlist={() => onAddToWishlist(product.id)}
          onRequestClose={() => setIsAddingToWishlist(false)}
        />
      )}
    </div>
  )
}

export const ProductItem = memo(
  ProductItemComponent,
  (prevProps, nextProps) => {
    return Object.is(prevProps.product, nextProps.product)
  },
)
